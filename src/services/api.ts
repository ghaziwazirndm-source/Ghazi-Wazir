import { WorkspaceState, Lead, Booking, User } from '../types';

const TOKEN_KEY = 'gw_auth_token';

export const api = {
  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  },

  setToken(token: string) {
    localStorage.setItem(TOKEN_KEY, token);
  },

  clearToken() {
    localStorage.removeItem(TOKEN_KEY);
  },

  async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const token = this.getToken();
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string>),
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const res = await fetch(endpoint, {
      ...options,
      headers,
    });

    const data = await res.json();
    if (!res.ok) {
      if (res.status === 401) {
        this.clearToken();
      }
      throw new Error(data.error || 'Server request failed');
    }
    return data;
  },

  // Public Endpoints
  async getPublicSettings() {
    return this.request<{
      name: string;
      title: string;
      whatsapp: string;
      whatsappUrl: string;
      email: string;
      positioning: string;
      secondaryPositioning: string;
      companies: { name: string; location: string; scope: string }[];
      social: Record<string, string>;
      regulatoryDisclaimer: string;
    }>('/api/settings/public');
  },
  async submitLead(payload: {
    name: string;
    email: string;
    phone?: string;
    service?: string;
    message?: string;
    honeypot?: string;
    consent: boolean;
    abVariant?: string;
  }) {
    return this.request<{ success: boolean; message: string; leadId: string }>('/api/leads', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  async getAvailability(month?: string) {
    const q = month ? `?month=${month}` : '';
    return this.request<{
      timezone: string;
      workingDays: number[];
      standardHours: string[];
      bookedSlots: { date: string; time: string }[];
    }>(`/api/bookings/availability${q}`);
  },

  async bookConsultation(payload: {
    name: string;
    email: string;
    phone?: string;
    date: string;
    time: string;
    service?: string;
    notes?: string;
    abVariant?: string;
  }) {
    return this.request<{ success: boolean; booking: Booking; message: string }>('/api/bookings', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  async trackABTest(variant: string, event: 'impression' | 'lead' | 'booking') {
    return this.request<{ success: boolean }>('/api/ab-test/track', {
      method: 'POST',
      body: JSON.stringify({ variant, event }),
    });
  },

  async getABStats() {
    return this.request<any>('/api/ab-test/stats');
  },

  async chatWithAI(message: string, customerLanguage?: string) {
    return this.request<{
      reply: string;
      escalation?: boolean;
      escalationReason?: string;
      flagged?: boolean;
      configRequired?: boolean;
    }>('/api/ai/sales-agent', {
      method: 'POST',
      body: JSON.stringify({ message, customerLanguage }),
    });
  },

  // Auth Endpoints
  async setupCEO(name: string, email: string, password: string) {
    const res = await this.request<{ success: boolean; token: string; user: User }>('/api/auth/setup-ceo', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    });
    if (res.token) this.setToken(res.token);
    return res;
  },

  async login(email: string, password: string) {
    const res = await this.request<{ success: boolean; token: string; user: User }>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    if (res.token) this.setToken(res.token);
    return res;
  },

  async quickLogin(role: string = 'CEO', email?: string) {
    const res = await this.request<{ success: boolean; token: string; user: User }>('/api/auth/quick-login', {
      method: 'POST',
      body: JSON.stringify({ role, email }),
    });
    if (res.token) this.setToken(res.token);
    return res;
  },

  async resetPassword(email: string, newPassword: string) {
    return this.request<{ success: boolean; message: string }>('/api/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify({ email, newPassword }),
    });
  },

  async getSession() {
    return this.request<{ user: User }>('/api/auth/session');
  },

  async logout() {
    try {
      await this.request('/api/auth/logout', { method: 'POST' });
    } finally {
      this.clearToken();
    }
  },

  // Command Center Endpoints
  async getWorkspace(): Promise<WorkspaceState> {
    return this.request<WorkspaceState>('/api/admin/workspace');
  },

  async updateLead(data: {
    id: string;
    stage?: string;
    factors?: any;
    next?: string;
    resourceSent?: string;
    offer?: string;
    note?: string;
    value?: number;
  }) {
    return this.request<{ success: boolean; lead: Lead }>('/api/admin/leads/update', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async createProposal(data: { leadId: string; title: string; amount: number; disc: number }) {
    return this.request('/api/admin/proposals/create', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async sendProposal(id: string) {
    return this.request('/api/admin/proposals/send', {
      method: 'POST',
      body: JSON.stringify({ id }),
    });
  },

  async requestPayment(data: {
    leadId: string;
    itemIndex?: string;
    customAmount?: number;
    customDesc?: string;
  }) {
    return this.request('/api/admin/payments/request', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async decideApproval(id: string, decision: 'APPROVED' | 'REJECTED') {
    return this.request('/api/admin/approvals/decide', {
      method: 'POST',
      body: JSON.stringify({ id, decision }),
    });
  },

  async toggleEmergencyStop(enable: boolean) {
    return this.request('/api/admin/emergency-stop', {
      method: 'POST',
      body: JSON.stringify({ enable }),
    });
  },

  async inviteTeamMember(data: { name: string; email: string; role: string }) {
    return this.request<{ success: boolean; tempPassword: string; message: string }>('/api/admin/team/invite', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async toggleTeamMember(id: string) {
    return this.request('/api/admin/team/toggle', {
      method: 'POST',
      body: JSON.stringify({ id }),
    });
  },

  async saveKB(data: { id?: string; title: string; body: string; category?: string; state?: string }) {
    return this.request('/api/admin/kb/save', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async verifyAudit() {
    return this.request<{ valid: boolean; count: number; message: string; brokenEntryId?: number }>('/api/admin/audit/verify');
  },

  async createLeadManual(data: { name: string; email: string; phone?: string; svc?: string; value?: number; src?: string; notes?: string }) {
    return this.request<{ success: boolean; lead: Lead }>('/api/admin/leads/create', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async updateBooking(data: { id: string; status?: string; notes?: string }) {
    return this.request<{ success: boolean; booking: Booking }>('/api/admin/bookings/update', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async createBookingManual(data: { leadId?: string; date: string; time: string; service?: string; notes?: string }) {
    return this.request<{ success: boolean; booking: Booking }>('/api/admin/bookings/create', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async recordPayment(data: { leadId?: string; desc: string; amount: number; cur?: string; method?: string; reference?: string }) {
    return this.request<{ success: boolean; payment: any }>('/api/admin/payments/record', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async createTask(data: { leadId?: string; note: string; due?: string }) {
    return this.request<{ success: boolean; task: any }>('/api/admin/tasks/create', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async toggleTask(id: string) {
    return this.request<{ success: boolean; task: any }>('/api/admin/tasks/toggle', {
      method: 'POST',
      body: JSON.stringify({ id }),
    });
  },

  async updateAutomations(data: { scoring?: boolean; faq?: boolean; followups?: boolean; reminders?: boolean }) {
    return this.request<{ success: boolean; automations: any }>('/api/admin/automations/update', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async updateSettings(data: { hot?: number; warm?: number; discountMax?: number; highValue?: number; sessionMin?: number }) {
    return this.request<{ success: boolean; settings: any }>('/api/admin/settings/update', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async addResource(data: { title: string; url: string }) {
    return this.request<{ success: boolean; resource: any }>('/api/admin/resources/add', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};
