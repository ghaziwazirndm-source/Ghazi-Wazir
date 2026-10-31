/**
 * Ad Tracking & Conversion Dispatcher
 * Dispatches conversion events to Meta Pixel (Facebook Ads) and Google Ads / GA4.
 */

import { getStoredAttribution } from './attribution';

declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
    gtag?: (...args: any[]) => void;
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
   * Tracks a page view across Meta Pixel & Google Analytics/Ads
   */
  trackPageView(pagePath: string) {
    if (typeof window === 'undefined') return;

    // Meta Pixel
    if (typeof window.fbq === 'function') {
      window.fbq('track', 'PageView');
    }

    // Google Ads / GA4
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'page_view', {
        page_path: pagePath,
      });
    }
  },

  /**
   * Tracks a Funnel View Content event
   */
  trackViewContent(serviceName: string, company: string) {
    if (typeof window === 'undefined') return;

    if (typeof window.fbq === 'function') {
      window.fbq('track', 'ViewContent', {
        content_name: serviceName,
        content_category: company,
      });
    }

    if (typeof window.gtag === 'function') {
      window.gtag('event', 'view_item', {
        items: [{ item_name: serviceName, item_category: company }],
      });
    }
  },

  /**
   * Tracks a Lead conversion (Form submission or Sales Agent qualification)
   */
  trackLead(payload: ConversionPayload) {
    if (typeof window === 'undefined') return;
    const attr = getStoredAttribution();

    // Meta Pixel Lead event
    if (typeof window.fbq === 'function') {
      window.fbq('track', 'Lead', {
        content_name: payload.service || 'Executive Consultation',
        value: payload.value || 0,
        currency: payload.currency || 'BHD',
        lead_id: payload.leadId,
        utm_source: attr.utm_source,
        utm_campaign: attr.utm_campaign,
      });
    }

    // Google Ads / GA4 generate_lead event
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'generate_lead', {
        value: payload.value || 0,
        currency: payload.currency || 'BHD',
        transaction_id: payload.leadId,
        service: payload.service,
        campaign: attr.utm_campaign,
        source: attr.utm_source,
      });
    }

    // Send to Server-Side Conversion API (CAPI) logger/proxy
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

    if (typeof window.fbq === 'function') {
      window.fbq('track', 'Schedule', {
        content_name: service,
        booking_id: bookingId,
        date,
        time,
        currency: 'BHD',
      });
    }

    if (typeof window.gtag === 'function') {
      window.gtag('event', 'book_appointment', {
        appointment_date: date,
        appointment_time: time,
        service_name: service,
        booking_id: bookingId,
      });
    }

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
      window.fbq('track', 'Contact', {
        contact_channel: channel,
        context: context || 'General',
      });
    }

    if (typeof window.gtag === 'function') {
      window.gtag('event', 'contact', {
        method: channel,
        context: context || 'General',
      });
    }
  },
};
