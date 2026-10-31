import { useState, useEffect } from 'react';
import { api } from '../services/api';
import { useToast } from '../context/ToastContext';
import { useABTheme } from '../context/ABThemeContext';
import { Calendar as CalendarIcon, Clock, CheckCircle2, AlertCircle, ChevronLeft, ChevronRight, Phone, Download, ExternalLink } from 'lucide-react';

interface BookingWidgetProps {
  defaultService?: string;
}

export function BookingWidget({ defaultService = 'Free Strategic Consultation' }: BookingWidgetProps) {
  const { variantId, recordConversion } = useABTheme();
  const { success, error } = useToast();

  const [currentDate, setCurrentDate] = useState(() => new Date());
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [availableHours, setAvailableHours] = useState<string[]>([]);
  const [bookedSlots, setBookedSlots] = useState<{ date: string; time: string }[]>([]);
  const [workingDays, setWorkingDays] = useState<number[]>([0, 1, 2, 3, 4]);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState(defaultService);
  const [notes, setNotes] = useState('');

  const [loading, setLoading] = useState(false);
  const [bookingResult, setBookingResult] = useState<{ success: boolean; message: string; date: string; time: string } | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  // Fetch availability when month changes
  const monthStr = currentDate.toISOString().slice(0, 7);

  useEffect(() => {
    let isMounted = true;
    api.getAvailability(monthStr)
      .then(res => {
        if (!isMounted) return;
        setAvailableHours(res.standardHours || []);
        setBookedSlots(res.bookedSlots || []);
        setWorkingDays(res.workingDays || [0, 1, 2, 3, 4]);

        // Auto-advance if no free days are left in current month
        const today = new Date();
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        let hasFreeDay = false;

        for (let day = 1; day <= daysInMonth; day++) {
          const testDate = new Date(year, month, day);
          if (testDate >= new Date(today.getFullYear(), today.getMonth(), today.getDate())) {
            if (workingDays.includes(testDate.getDay())) {
              hasFreeDay = true;
              break;
            }
          }
        }

        if (!hasFreeDay && currentDate.getMonth() === today.getMonth()) {
          // Advance to next month
          setCurrentDate(new Date(year, month + 1, 1));
        }
      })
      .catch(err => {
        console.error('Failed to load calendar availability:', err);
      });

    return () => { isMounted = false; };
  }, [monthStr]);

  const handlePrevMonth = () => {
    const today = new Date();
    const prev = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
    if (prev.getMonth() >= today.getMonth() || prev.getFullYear() > today.getFullYear()) {
      setCurrentDate(prev);
    }
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handleDateClick = (dateStr: string) => {
    setSelectedDate(dateStr);
    setSelectedTime('');
    setErrorMessage('');
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime) {
      setErrorMessage('Please select a date and an available time slot.');
      return;
    }
    if (!name.trim() || !email.trim()) {
      setErrorMessage('Please enter your full name and email address.');
      return;
    }

    setLoading(true);
    setErrorMessage('');

    try {
      const res = await api.bookConsultation({
        name,
        email,
        phone,
        date: selectedDate,
        time: selectedTime,
        service,
        notes,
        abVariant: variantId
      });

      recordConversion('booking');
      success(
        'Strategic Consultation Reserved',
        `Executive session locked for ${selectedDate} at ${selectedTime} (Asia/Bahrain). Calendar invitation dispatched.`,
        'gold'
      );

      setBookingResult({
        success: true,
        message: res.message,
        date: selectedDate,
        time: selectedTime,
      });
    } catch (err: any) {
      setErrorMessage(err.message || 'Could not complete booking. Please try another slot.');
      error('Booking Alert', err.message || 'Could not complete booking. Please try another slot.', 'crimson');
    } finally {
      setLoading(false);
    }
  };

  // Render month calendar grid
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const monthName = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = new Date();
  const todayStr = today.toISOString().slice(0, 10);

  const days = [];
  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }
  for (let d = 1; d <= daysInMonth; d++) {
    const dStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    days.push(dStr);
  }

  if (bookingResult) {
    return (
      <div className="card-luxury p-8 text-center max-w-xl mx-auto border-gold-glow animate-in fade-in zoom-in duration-300">
        <div className="w-16 h-16 rounded-full bg-[#1c2e20] border border-[#4ade80] flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-8 h-8 text-[#4ade80]" />
        </div>
        <h3 className="font-heading font-bold text-2xl text-[#f5f1e8] mb-2">
          Consultation Request Registered
        </h3>
        <p className="text-sm text-[#a8a7b3] max-w-md mx-auto mb-6">
          Your slot for <strong className="text-[#e8c872]">{bookingResult.date} at {bookingResult.time} (Asia/Bahrain)</strong> has been server-locked.
        </p>

        <div className="p-4 bg-[#101018] rounded-xl border border-[#2a2a38] text-xs text-left mb-6 space-y-2">
          <div className="flex justify-between">
            <span className="text-[#a8a7b3]">Status:</span>
            <span className="font-bold text-[#e8c872]">REQUESTED / LOCKED</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#a8a7b3]">Consultant:</span>
            <span className="font-semibold text-[#f5f1e8]">Ghazi Wazir (Direct)</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#a8a7b3]">Service Scoping:</span>
            <span className="text-[#f5f1e8]">{service}</span>
          </div>
          <div className="pt-2 border-t border-[#2a2a38] text-[11px] text-[#a8a7b3]">
            *Google Calendar synchronization: <span className="text-[#ffa24d] font-semibold">CONFIGURATION REQUIRED</span>. Our team will verify and send the meeting link directly to your email or WhatsApp.
          </div>
        </div>

        {/* Calendar Integration Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
          <a
            href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(`Consultation: ${service} — Ghazi Wazir`)}&dates=${bookingResult.date.replace(/-/g, '')}T${bookingResult.time.replace(':', '')}00/${bookingResult.date.replace(/-/g, '')}T${String(Number(bookingResult.time.split(':')[0]) + 1).padStart(2, '0')}${bookingResult.time.split(':')[1]}00&ctz=Asia/Bahrain&details=${encodeURIComponent(`Executive Strategic Consultation with Ghazi Wazir (CEO of Bab Al-Khaleej & Back for Brand LLC).\n\nService: ${service}\nTimezone: Asia/Bahrain (GMT+3)\nWhatsApp: +973 3562 8353\nEmail: ghaziwazirndm@gmail.com\n\nGoogle Meet / WhatsApp Audio link will be dispatched prior to start.`)}&location=Google+Meet`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-xl border border-[#2a2a38] bg-[#14141d] hover:border-[#4285F4] hover:bg-[#1a1a26] text-xs font-semibold text-[#f5f1e8] flex items-center justify-center gap-2 transition-all"
          >
            <ExternalLink className="w-4 h-4 text-[#4285F4]" />
            <span>Add to Google Calendar</span>
          </a>

          <button
            type="button"
            onClick={() => {
              const startD = `${bookingResult.date.replace(/-/g, '')}T${bookingResult.time.replace(':', '')}00`;
              const endH = String(Number(bookingResult.time.split(':')[0]) + 1).padStart(2, '0');
              const endD = `${bookingResult.date.replace(/-/g, '')}T${endH}${bookingResult.time.split(':')[1]}00`;
              const ics = [
                'BEGIN:VCALENDAR',
                'VERSION:2.0',
                'PRODID:-//Ghazi Wazir//Consultation Engine//EN',
                'BEGIN:VEVENT',
                `UID:gw-${Date.now()}@ghaziwazir.com`,
                `DTSTART;TZID=Asia/Bahrain:${startD}`,
                `DTEND;TZID=Asia/Bahrain:${endD}`,
                `SUMMARY:Consultation: ${service} — Ghazi Wazir`,
                `DESCRIPTION:Executive advisory consultation with Ghazi Wazir. Contact: +973 3562 8353 / ghaziwazirndm@gmail.com`,
                'LOCATION:Google Meet / WhatsApp Audio',
                'END:VEVENT',
                'END:VCALENDAR'
              ].join('\r\n');
              const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = `ghazi-wazir-consultation-${bookingResult.date}.ics`;
              a.click();
            }}
            className="p-3 rounded-xl border border-[#2a2a38] bg-[#14141d] hover:border-[#e8c872] hover:bg-[#1a1a26] text-xs font-semibold text-[#f5f1e8] flex items-center justify-center gap-2 transition-all"
          >
            <Download className="w-4 h-4 text-[#e8c872]" />
            <span>Download .ICS Invite</span>
          </button>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href={`https://wa.me/97335628353?text=Hello%20Ghazi%2C%20I%20just%20booked%20an%20executive%20consultation%20for%20${bookingResult.date}%20at%20${bookingResult.time}%20(Asia%2FBahrain)%20regarding%20${encodeURIComponent(service)}.`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold w-full sm:w-auto px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2"
          >
            <Phone className="w-4 h-4" />
            <span>Notify Ghazi on WhatsApp</span>
          </a>
          <button
            type="button"
            onClick={() => {
              setBookingResult(null);
              setSelectedDate('');
              setSelectedTime('');
            }}
            className="w-full sm:w-auto px-6 py-3 rounded-full border border-[#2a2a38] text-xs font-semibold text-[#f5f1e8] hover:bg-[#1a1a26]"
          >
            Book Another Time
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="card-luxury p-6 sm:p-8 max-w-4xl mx-auto shadow-2xl">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#2a2a38]">
        <div>
          <h3 className="font-heading font-bold text-xl text-[#f5f1e8] flex items-center gap-2">
            <CalendarIcon className="w-5 h-5 text-[#e8c872]" />
            <span>Select Consultation Date & Time</span>
          </h3>
          <p className="text-xs text-[#a8a7b3] mt-1">
            Timezone: <strong className="text-[#e8c872]">Asia/Bahrain (GMT+3)</strong> &bull; Sunday to Thursday (Business Days)
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handlePrevMonth}
            className="p-2 rounded-lg border border-[#2a2a38] hover:border-[#e8c872] hover:text-[#e8c872] transition-colors"
            aria-label="Previous month"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-xs font-bold text-[#f5f1e8] min-w-[120px] text-center">
            {monthName}
          </span>
          <button
            type="button"
            onClick={handleNextMonth}
            className="p-2 rounded-lg border border-[#2a2a38] hover:border-[#e8c872] hover:text-[#e8c872] transition-colors"
            aria-label="Next month"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Calendar Picker */}
        <div className="lg:col-span-7">
          <div className="grid grid-cols-7 gap-1.5 text-center mb-2">
            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((d, i) => (
              <span
                key={d}
                className={`text-[11px] font-bold py-1 ${
                  workingDays.includes(i) ? 'text-[#e8c872]' : 'text-[#a8a7b3]/40'
                }`}
              >
                {d}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1.5 text-center">
            {days.map((dateStr, idx) => {
              if (!dateStr) {
                return <div key={`empty-${idx}`} className="aspect-square" />;
              }

              const dObj = new Date(dateStr);
              const dayOfWeek = dObj.getDay();
              const isPast = dateStr < todayStr;
              const isWorkingDay = workingDays.includes(dayOfWeek);
              const isDisabled = isPast || !isWorkingDay;
              const isSelected = selectedDate === dateStr;
              const dayNum = parseInt(dateStr.slice(8), 10);

              return (
                <button
                  key={dateStr}
                  type="button"
                  disabled={isDisabled}
                  onClick={() => handleDateClick(dateStr)}
                  className={`aspect-square rounded-xl text-xs font-semibold flex items-center justify-center transition-all ${
                    isSelected
                      ? 'bg-gradient-to-br from-[#e8c872] to-[#b8893a] text-[#16120a] font-black shadow-lg scale-105'
                      : isDisabled
                      ? 'opacity-20 text-[#a8a7b3] cursor-not-allowed'
                      : 'hover:border-[#e8c872] hover:bg-[#1a1a26] text-[#f5f1e8] border border-[#2a2a38]'
                  }`}
                >
                  {dayNum}
                </button>
              );
            })}
          </div>

          {/* Time Slot Picker */}
          {selectedDate && (
            <div className="mt-6 pt-5 border-t border-[#2a2a38] animate-in fade-in duration-200">
              <h4 className="text-xs font-bold text-[#e8c872] uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                <span>Available Slots for {selectedDate}</span>
              </h4>

              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                {availableHours.map(hour => {
                  const isBooked = bookedSlots.some(b => b.date === selectedDate && b.time === hour);
                  const isSelected = selectedTime === hour;

                  return (
                    <button
                      key={hour}
                      type="button"
                      disabled={isBooked}
                      onClick={() => setSelectedTime(hour)}
                      className={`py-2 px-1 text-xs rounded-lg border font-medium transition-all ${
                        isSelected
                          ? 'bg-[#e8c872] text-[#16120a] font-bold border-[#e8c872]'
                          : isBooked
                          ? 'border-[#2a2a38] bg-[#101018] text-[#a8a7b3]/30 line-through cursor-not-allowed'
                          : 'border-[#2a2a38] text-[#f5f1e8] hover:border-[#b8893a] hover:bg-[#1a1a26]'
                      }`}
                    >
                      {hour}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Lead Details Form */}
        <div className="lg:col-span-5 bg-[#101018] border border-[#2a2a38] rounded-2xl p-5 flex flex-col justify-between">
          <form onSubmit={handleBookingSubmit} className="space-y-4">
            <h4 className="text-sm font-bold text-[#f5f1e8] font-heading">
              Your Contact Details
            </h4>

            <div>
              <label className="block text-[11px] font-semibold text-[#a8a7b3] uppercase tracking-wider mb-1">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="e.g. Tariq Al-Hashimi"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#2a2a38] bg-[#14141d] text-sm text-[#f5f1e8] focus:outline-none focus:border-[#e8c872]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#a8a7b3] uppercase tracking-wider mb-1">
                Corporate Email *
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="tariq@company.com"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#2a2a38] bg-[#14141d] text-sm text-[#f5f1e8] focus:outline-none focus:border-[#e8c872]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#a8a7b3] uppercase tracking-wider mb-1">
                WhatsApp / Phone (Optional)
              </label>
              <input
                type="tel"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="+973 3xxx xxxx"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#2a2a38] bg-[#14141d] text-sm text-[#f5f1e8] focus:outline-none focus:border-[#e8c872]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#a8a7b3] uppercase tracking-wider mb-1">
                Primary Objective
              </label>
              <select
                value={service}
                onChange={e => setService(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#2a2a38] bg-[#14141d] text-sm text-[#f5f1e8] focus:outline-none focus:border-[#e8c872]"
              >
                <option value="Bahrain Business Registration (CR)">Bahrain Business Registration (CR)</option>
                <option value="Investor Visa & Residency">Investor Visa & Residency</option>
                <option value="Worker Visas & LMRA Quota">Worker Visas & LMRA Quota</option>
                <option value="GEO / AEO Engine Optimization">GEO / AEO Engine Optimization</option>
                <option value="Autonomous AI Sales Agents">Autonomous AI Sales Agents</option>
                <option value="Websites & High-Converting Funnels">Websites & High-Converting Funnels</option>
                <option value="Free Strategic Consultation">General Scoping Consultation</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#a8a7b3] uppercase tracking-wider mb-1">
                Brief Notes / Specific Needs
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={e => setNotes(e.target.value)}
                placeholder="Share any background on your business or timeline..."
                className="w-full px-3.5 py-2 rounded-xl border border-[#2a2a38] bg-[#14141d] text-xs text-[#f5f1e8] focus:outline-none focus:border-[#e8c872]"
              />
            </div>

            {errorMessage && (
              <div className="p-3 bg-[#2a1313] border border-[#ff5d5d] rounded-xl flex items-center gap-2 text-xs text-[#ffb3b3]">
                <AlertCircle className="w-4 h-4 flex-none" />
                <span>{errorMessage}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !selectedDate || !selectedTime}
              className="btn-gold w-full py-3.5 rounded-full text-xs font-bold uppercase tracking-wider disabled:opacity-30 disabled:cursor-not-allowed shadow-lg"
            >
              {loading ? 'Locking Slot...' : selectedDate && selectedTime ? `Confirm ${selectedDate} at ${selectedTime}` : 'Select Date & Time Above'}
            </button>
          </form>

          <p className="text-[11px] text-[#a8a7b3] mt-3 text-center">
            Private 1-on-1 consultation directly with Ghazi Wazir.
          </p>
        </div>
      </div>
    </div>
  );
}
