/**
 * Attribution & Campaign Tracking Service
 * Captures and persists UTM parameters, Google Click ID (gclid),
 * and Meta Click ID (fbclid) across the entire visitor journey.
 */

export interface AttributionData {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  fbclid?: string;
  gclid?: string;
  ttclid?: string;
  sc_click_id?: string;
  li_fat_id?: string;
  twclid?: string;
  referrer?: string;
  landingPage?: string;
  firstTouchTs?: number;
}

const ATTRIBUTION_STORAGE_KEY = 'gw_ad_attribution';

export function getStoredAttribution(): AttributionData {
  try {
    const raw = sessionStorage.getItem(ATTRIBUTION_STORAGE_KEY) || localStorage.getItem(ATTRIBUTION_STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch {
    // Ignore storage errors
  }
  return {};
}

export function initAttributionTracking(): AttributionData {
  if (typeof window === 'undefined') return {};

  const current = getStoredAttribution();
  const urlParams = new URLSearchParams(window.location.search);

  const utm_source = urlParams.get('utm_source') || undefined;
  const utm_medium = urlParams.get('utm_medium') || undefined;
  const utm_campaign = urlParams.get('utm_campaign') || undefined;
  const utm_content = urlParams.get('utm_content') || undefined;
  const utm_term = urlParams.get('utm_term') || undefined;
  const fbclid = urlParams.get('fbclid') || undefined;
  const gclid = urlParams.get('gclid') || undefined;
  const ttclid = urlParams.get('ttclid') || undefined;
  const sc_click_id = urlParams.get('sc_click_id') || urlParams.get('sclid') || undefined;
  const li_fat_id = urlParams.get('li_fat_id') || undefined;
  const twclid = urlParams.get('twclid') || undefined;

  const hasNewParams = utm_source || utm_medium || utm_campaign || fbclid || gclid || ttclid || sc_click_id || li_fat_id || twclid;

  if (hasNewParams || !current.landingPage) {
    let deducedSource = current.utm_source;
    if (utm_source) {
      deducedSource = utm_source;
    } else if (fbclid) {
      deducedSource = 'meta';
    } else if (gclid) {
      deducedSource = 'google_ads';
    } else if (ttclid) {
      deducedSource = 'tiktok';
    } else if (sc_click_id) {
      deducedSource = 'snapchat';
    } else if (li_fat_id) {
      deducedSource = 'linkedin';
    } else if (twclid) {
      deducedSource = 'twitter';
    }

    const updated: AttributionData = {
      ...current,
      utm_source: deducedSource,
      utm_medium: utm_medium || current.utm_medium || (fbclid || gclid || ttclid || sc_click_id || li_fat_id || twclid ? 'cpc' : undefined),
      utm_campaign: utm_campaign || current.utm_campaign,
      utm_content: utm_content || current.utm_content,
      utm_term: utm_term || current.utm_term,
      fbclid: fbclid || current.fbclid,
      gclid: gclid || current.gclid,
      ttclid: ttclid || current.ttclid,
      sc_click_id: sc_click_id || current.sc_click_id,
      li_fat_id: li_fat_id || current.li_fat_id,
      twclid: twclid || current.twclid,
      referrer: current.referrer || document.referrer || 'direct',
      landingPage: current.landingPage || window.location.pathname,
      firstTouchTs: current.firstTouchTs || Date.now(),
    };

    try {
      sessionStorage.setItem(ATTRIBUTION_STORAGE_KEY, JSON.stringify(updated));
      localStorage.setItem(ATTRIBUTION_STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // Storage might be restricted
    }

    return updated;
  }

  return current;
}

export function formatAttributionSource(attr: AttributionData): string {
  if (attr.utm_source) {
    let src = attr.utm_source;
    if (attr.utm_campaign) src += ` (${attr.utm_campaign})`;
    return src;
  }
  if (attr.fbclid) return 'Meta Ads (Click)';
  if (attr.gclid) return 'Google Ads (Click)';
  if (attr.ttclid) return 'TikTok Ads (Click)';
  if (attr.sc_click_id) return 'Snapchat Ads (Click)';
  if (attr.li_fat_id) return 'LinkedIn Ads (Click)';
  if (attr.twclid) return 'Twitter / X Ads (Click)';
  if (attr.referrer && attr.referrer !== 'direct') {
    try {
      const url = new URL(attr.referrer);
      return `Referral: ${url.hostname}`;
    } catch {
      return `Referral: ${attr.referrer}`;
    }
  }
  return 'Website Direct / Organic';
}
