/**
 * Core Domain Types for Ghazi Wazir Web Application & Command Center
 */

export type Role = 'CEO' | 'ADMIN' | 'SALES' | 'SUPPORT' | 'FINANCE' | 'VIEWER';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  enabled: boolean;
  lastLogin?: number;
  failed?: number;
  lockUntil?: number;
}

export type LeadStage =
  | 'NEW'
  | 'CONTACTED'
  | 'QUALIFIED'
  | 'BOOKED'
  | 'CONSULTATION'
  | 'PROPOSAL'
  | 'NEGOTIATION'
  | 'PAYMENT_PENDING'
  | 'WON'
  | 'LOST'
  | 'NURTURE';

export type LeadHeat = 'HOT' | 'WARM' | 'COLD';

export interface LeadFactors {
  need?: number;      // 0 to 5
  budget?: number;    // 0 to 5
  timeline?: number;  // 0 to 5
  fit?: number;       // 0 to 5
  urgency?: number;   // 0 to 5
  authority?: number; // 0 to 5
  signals?: number;   // 0 to 5
}

export interface LeadNote {
  ts: number;
  by: string;
  t: string;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  svc: string;
  src: string;
  value: number;
  stage: LeadStage;
  factors: LeadFactors;
  score: number;
  owner?: string;
  next?: string;
  resourceSent?: string;
  offer?: string;
  notes: LeadNote[];
  created: number;
  updated: number;
}

export type BookingStatus = 'REQUESTED' | 'PENDING_CALENDAR' | 'CONFIRMED' | 'COMPLETED' | 'RESCHEDULED' | 'CANCELLED';

export interface Booking {
  id: string;
  leadId: string;
  leadName?: string;
  date: string;       // YYYY-MM-DD
  time: string;       // HH:mm
  service?: string;
  status: BookingStatus;
  by?: string;
  notes?: string;
  calendarEventId?: string;
  created: number;
}

export type ProposalStatus = 'DRAFT' | 'PENDING_APPROVAL' | 'MARKED_SENT' | 'ACCEPTED' | 'REJECTED';

export interface Proposal {
  id: string;
  leadId: string;
  title: string;
  amount: number;
  disc: number;
  status: ProposalStatus;
  by: string;
  byName?: string;
  created: number;
}

export type PaymentStatus = 'REQUESTED' | 'PENDING_APPROVAL' | 'VERIFIED' | 'CANCELLED';

export interface PaymentRecord {
  id: string;
  leadId: string;
  desc: string;
  amount: number;
  cur: string;
  status: PaymentStatus;
  custom?: boolean;
  by: string;
  providerTxId?: string;
  created: number;
}

export type KBState = 'DRAFT' | 'REVIEW' | 'APPROVED' | 'ARCHIVED';

export interface KBItem {
  id: string;
  title: string;
  body: string;
  category?: string;
  state: KBState;
  author: string;
  authorId: string;
  created: number;
  updated: number;
}

export interface ResourceItem {
  id: string;
  title: string;
  url: string;
  ok: boolean;
  by?: string;
}

export interface FollowupItem {
  id: string;
  leadId: string;
  note: string;
  due: string; // YYYY-MM-DD
  status: 'OPEN' | 'DONE';
}

export interface ApprovalItem {
  id: string;
  ts: number;
  type: string;
  amount: number;
  reason: string;
  risk: number;
  by: string;
  byName: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'CANCELLED' | 'EXPIRED' | 'EXECUTED';
  ref?: string;
  approver?: string;
  decidedAt?: number;
}

export interface AuditEntry {
  id: number;
  ts: string;
  actor: string;
  role: string;
  action: string;
  resource: string;
  detail: string;
  result: string;
  prev: string;
  hash: string;
}

export type WarningSeverity = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' | 'INFO';

export interface SecurityWarning {
  id: string;
  sev: WarningSeverity;
  type: string;
  detail: string;
  ts: number;
  status: 'OPEN' | 'ACK';
  by?: string;
}

export interface InboxMessage {
  id: string;
  ts: number;
  ch: string;
  from: string;
  text: string;
  flags: string[];
  lead?: string;
}

export interface PriceItem {
  name: string;
  price: number;
  cur: string;
}

export interface WorkspaceSettings {
  hot: number;
  warm: number;
  sessionMin: number;
  discountMax: number;
  highValue: number;
  financeLimit: number;
  approvalHours: number;
  weights: {
    need: number;
    budget: number;
    timeline: number;
    fit: number;
    urgency: number;
    authority: number;
    signals: number;
  };
  priceList: PriceItem[];
}

export interface WorkspaceState {
  users: User[];
  leads: Lead[];
  bookings: Booking[];
  proposals: Proposal[];
  payments: PaymentRecord[];
  kb: KBItem[];
  resources: ResourceItem[];
  followups: FollowupItem[];
  approvals: ApprovalItem[];
  audit: AuditEntry[];
  warnings: SecurityWarning[];
  inbox: InboxMessage[];
  stop: {
    on: boolean;
    by?: string;
    at?: number;
  };
  automations: {
    faq: boolean;
    followups: boolean;
    reminders: boolean;
    scoring: boolean;
  };
  settings: WorkspaceSettings;
}

// -------------------------------------------------------------
// A/B Testing & Theming System
// -------------------------------------------------------------
export type ABVariantId = 'variant_modern_azure' | 'variant_modern_emerald' | 'variant_modern_titanium';

export interface ABVariant {
  id: ABVariantId;
  name: string;
  badge: string;
  tagline: string;
  scope: string;
  colors: {
    bg: string;
    bgAlt: string;
    surface: string;
    border: string;
    accent: string;
    accentDark: string;
    glow: string;
  };
}

export interface ABVariantMetrics {
  name: string;
  badge: string;
  impressions: number;
  leads: number;
  bookings: number;
  convRate: number;
}

export interface ABTestStats {
  variants: Record<ABVariantId, ABVariantMetrics>;
  activeVariant: ABVariantId;
  winner: ABVariantId;
  liftPercentage: number;
  totalImpressions: number;
  totalConversions: number;
}

// -------------------------------------------------------------
// Toast Notification System
// -------------------------------------------------------------
export type ToastTheme = 'gold' | 'emerald' | 'sapphire' | 'crimson';
export type ToastType = 'success' | 'info' | 'warning' | 'error';

export interface ToastAction {
  label: string;
  onClick: () => void;
}

export interface ToastOptions {
  title: string;
  message?: string;
  theme?: ToastTheme;
  type?: ToastType;
  duration?: number;
  action?: ToastAction;
}

export interface ToastItem extends ToastOptions {
  id: string;
  createdAt: number;
}

// -------------------------------------------------------------
// Omni-Funnel Performance Analytics Types
// -------------------------------------------------------------
export interface FunnelMetricItem {
  slug: string;
  name: string;
  company: 'Bab Al-Khaleej' | 'Back for Brand LLC' | 'Executive Hub';
  category: string;
  views: number;
  leads: number;
  bookings: number;
  sales: number;
  revenueUSD: number;
  revenueBHD: number;
  sources: Record<string, number>;
  avgTimeOnPageSec: number;
  lastEventTs: number;
  optInRate: number;
  bookingRate: number;
  winRate: number;
  overallRate: number;
  topSource: string;
  healthStatus: 'Optimal' | 'Healthy' | 'Needs Attention';
}

export interface FunnelAnalyticsResponse {
  summary: {
    totalFunnels: number;
    totalViews: number;
    totalLeads: number;
    totalBookings: number;
    totalSales: number;
    totalRevenueUSD: number;
    totalRevenueBHD: number;
    avgOptInRate: number;
    avgBookingRate: number;
    avgWinRate: number;
    overallConversionRate: number;
  };
  funnels: FunnelMetricItem[];
  topFunnelsByRevenue: FunnelMetricItem[];
  topFunnelsByConversion: FunnelMetricItem[];
  attributionTotals: Record<string, number>;
  companyBreakdown: Record<string, {
    views: number;
    leads: number;
    bookings: number;
    sales: number;
    revenueUSD: number;
    revenueBHD: number;
    funnelsCount: number;
  }>;
  stageFunnel: {
    stage: string;
    count: number;
    pct: number;
    dropoffPct: number;
  }[];
}


