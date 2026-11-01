/**
 * Omni-Channel Ad Tracking & Conversion Dispatcher
 * Dispatches conversion events synchronously and asynchronously to:
 * - Meta Pixel (Facebook & Instagram Ads)
 * - Google Ads & Google Analytics 4 (GA4)
 * - TikTok Pixel (TikTok Ads)
 * - Snapchat Pixel (Snapchat Ads)
 * - LinkedIn Insight Tag (B2B Commercial Ads)
 * - Server-Side Conversion API (CAPI) & Offline Conversion Hub
 */

import { getStoredAttribution } from './attribution';

declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
    gtag?: (...args: any[]) => void;
    ttq?: {
      track: (eventName: string, params?: any) => void;
      page: () => void;
      load: (pixelId: string) => void;
      identify: (params: any) => void;
    };
    snaptr?: (...args: any[]) => void;
    lintrk?: (...args: any[]) => void;
    _fbq?: any;
  }
}

export interface ConversionPayload {
  eventName: 'Lead' | 'Schedule' | 'Contact' | 'ViewContent' | 'InitiateCheckout' | 'Purchase';
  value?: number;
  currency?: string;
  service?: string;
  leadId?: string;
  email?: string;
  phone?: string;
  funnelName?: string;
}

export const adTracker = {
  /**
   * Tracks a page view across Meta Pixel, Google Analytics/Ads, TikTok, and Snapchat
   */
  trackPageView(pagePath: string) {
    if (typeof window === 'undefined') return;

    // 1. Meta Pixel PageView
    if (typeof window.fbq === 'function') {
      try { window.fbq('track', 'PageView'); } catch {}
    }

    // 2. Google Ads / GA4 page_view
    if (typeof window.gtag === 'function') {
      try {
        window.gtag('event', 'page_view', {
          page_path: pagePath,
        });
      } catch {}
    }

    // 3. TikTok Pixel Page
    if (window.ttq && typeof window.ttq.page === 'function') {
      try { window.ttq.page(); } catch {}
    }

    // 4. Snapchat Pixel PAGE_VIEW
    if (typeof window.snaptr === 'function') {
      try { window.snaptr('track', 'PAGE_VIEW'); } catch {}
    }
  },

  /**
   * Tracks a Funnel View Content event across all ad platforms
   */
  trackViewContent(serviceName: string, company: string) {
    if (typeof window === 'undefined') return;

    // Meta Pixel ViewContent
    if (typeof window.fbq === 'function') {
      try {
        window.fbq('track', 'ViewContent', {
          content_name: serviceName,
          content_category: company,
        });
      } catch {}
    }

    // Google Ads / GA4 view_item
    if (typeof window.gtag === 'function') {
      try {
        window.gtag('event', 'view_item', {
          items: [{ item_name: serviceName, item_category: company }],
        });
      } catch {}
    }

    // TikTok Pixel ViewContent
    if (window.ttq && typeof window.ttq.track === 'function') {
      try {
        window.ttq.track('ViewContent', {
          content_name: serviceName,
          content_type: 'service',
        });
      } catch {}
    }

    // Snapchat Pixel VIEW_CONTENT
    if (typeof window.snaptr === 'function') {
      try {
        window.snaptr('track', 'VIEW_CONTENT', {
          item_category: company,
          description: serviceName,
        });
      } catch {}
    }
  },

  /**
   * Tracks a Lead conversion (Form submission or Sales Agent qualification)
   */
  trackLead(payload: ConversionPayload) {
    if (typeof window === 'undefined') return;
    const attr = getStoredAttribution();

    // 1. Meta Pixel Lead event
    if (typeof window.fbq === 'function') {
      try {
        window.fbq('track', 'Lead', {
          content_name: payload.service || 'Executive Consultation',
          value: payload.value || 0,
          currency: payload.currency || 'BHD',
          lead_id: payload.leadId,
          utm_source: attr.utm_source,
          utm_campaign: attr.utm_campaign,
        });
      } catch {}
    }

    // 2. Google Ads / GA4 generate_lead event
    if (typeof window.gtag === 'function') {
      try {
        window.gtag('event', 'generate_lead', {
          value: payload.value || 0,
          currency: payload.currency || 'BHD',
          transaction_id: payload.leadId,
          service: payload.service,
          campaign: attr.utm_campaign,
          source: attr.utm_source,
        });
      } catch {}
    }

    // 3. TikTok Pixel SubmitForm / CompleteRegistration
    if (window.ttq && typeof window.ttq.track === 'function') {
      try {
        window.ttq.track('SubmitForm', {
          content_name: payload.service || 'Bahrain Business Inquiry',
          value: payload.value || 0,
          currency: payload.currency || 'BHD',
        });
      } catch {}
    }

    // 4. Snapchat Pixel SIGN_UP
    if (typeof window.snaptr === 'function') {
      try {
        window.snaptr('track', 'SIGN_UP', {
          sign_up_method: 'funnel_form',
          description: payload.service,
        });
      } catch {}
    }

    // 5. LinkedIn Insight Tag Conversion
    if (typeof window.lintrk === 'function') {
      try {
        window.lintrk('track', { conversion_id: 12345678 });
      } catch {}
    }

    // 6. Send to Server-Side Conversion API (CAPI) & Offline Logger
    fetch('/api/ads/conversion', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...payload,
        attribution: attr,
        timestamp: Date.now(),
      }),
    }).catch(() => {
      // Non-blocking background sync
    });
  },

  /**
   * Tracks a Consultation Booking (Schedule event)
   */
  trackSchedule(bookingId: string, service: string, date: string, time: string) {
    if (typeof window === 'undefined') return;
    const attr = getStoredAttribution();

    // 1. Meta Pixel Schedule
    if (typeof window.fbq === 'function') {
      try {
        window.fbq('track', 'Schedule', {
          content_name: service,
          booking_id: bookingId,
          date,
          time,
          currency: 'BHD',
        });
      } catch {}
    }

    // 2. Google Ads / GA4 book_appointment
    if (typeof window.gtag === 'function') {
      try {
        window.gtag('event', 'book_appointment', {
          appointment_date: date,
          appointment_time: time,
          service_name: service,
          booking_id: bookingId,
        });
      } catch {}
    }

    // 3. TikTok Pixel Schedule
    if (window.ttq && typeof window.ttq.track === 'function') {
      try {
        window.ttq.track('Schedule', {
          content_name: service,
          value: 400,
          currency: 'BHD',
        });
      } catch {}
    }

    // 4. Snapchat Pixel RESERVE
    if (typeof window.snaptr === 'function') {
      try {
        window.snaptr('track', 'RESERVE', {
          description: service,
          booking_id: bookingId,
        });
      } catch {}
    }

    // 5. Server-Side Sync
    fetch('/api/ads/conversion', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        eventName: 'Schedule',
        bookingId,
        service,
        date,
        time,
        attribution: attr,
        timestamp: Date.now(),
      }),
    }).catch(() => {});
  },

  /**
   * Tracks direct WhatsApp or AI Sales Agent engagement
   */
  trackContact(channel: 'WhatsApp' | 'AI_Sales_Agent', context?: string) {
    if (typeof window === 'undefined') return;

    if (typeof window.fbq === 'function') {
      try {
        window.fbq('track', 'Contact', {
          contact_channel: channel,
          context: context || 'General',
        });
      } catch {}
    }

    if (typeof window.gtag === 'function') {
      try {
        window.gtag('event', 'contact', {
          method: channel,
          context: context || 'General',
        });
      } catch {}
    }

    if (window.ttq && typeof window.ttq.track === 'function') {
      try {
        window.ttq.track('Contact', {
          content_name: channel,
        });
      } catch {}
    }

    if (typeof window.snaptr === 'function') {
      try {
        window.snaptr('track', 'CUSTOM_EVENT_1', {
          description: `Contact via ${channel}`,
        });
      } catch {}
    }
  },
};
