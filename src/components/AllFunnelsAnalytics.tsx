import React, { useState, useEffect } from 'react';
import {
  Layers,
  TrendingUp,
  Users,
  Calendar,
  DollarSign,
  ArrowRight,
  ExternalLink,
  RefreshCw,
  Sparkles,
  Zap,
  BarChart3,
  Filter,
  Search,
  CheckCircle2,
  AlertTriangle,
  Play,
  RotateCcw,
  Sliders,
  Globe,
  Share2,
  PieChart
} from 'lucide-react';
import { api } from '../services/api';
import { FunnelAnalyticsResponse, FunnelMetricItem } from '../types';

interface AllFunnelsAnalyticsProps {
  onNotify?: (message: string, type: 'success' | 'error' | 'info') => void;
}

export function AllFunnelsAnalytics({ onNotify }: AllFunnelsAnalyticsProps) {
  const [data, setData] = useState<FunnelAnalyticsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCompany, setSelectedCompany] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'revenue' | 'optInRate' | 'leads' | 'views' | 'bookings'>('revenue');
  
  // Simulator State
  const [simModalOpen, setSimModalOpen] = useState(false);
  const [simTargetSlug, setSimTargetSlug] = useState<string>('/formation');
  const [simViews, setSimViews] = useState(50);
  const [simLeads, setSimLeads] = useState(6);
  const [simBookings, setSimBookings] = useState(2);
  const [simulating, setSimulating] = useState(false);

  const fetchAnalytics = async (isManualRefresh = false) => {
    if (isManualRefresh) setRefreshing(true);
    try {
      const res = await api.getFunnelAnalytics();
      setData(res);
      if (isManualRefresh && onNotify) {
        onNotify('Funnel analytics refreshed with latest real-time metrics.', 'success');
      }
    } catch (err: any) {
      if (onNotify) {
        onNotify(err.message || 'Failed to load funnel analytics.', 'error');
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const handleSimulate = async () => {
    setSimulating(true);
    try {
      const res = await api.simulateFunnelTraffic(simTargetSlug, simViews, simLeads, simBookings);
      if (res.success) {
        if (onNotify) {
          onNotify(res.message, 'success');
        }
        setSimModalOpen(false);
        await fetchAnalytics();
      }
    } catch (err: any) {
      if (onNotify) {
        onNotify(err.message || 'Simulation failed.', 'error');
      }
    } finally {
      setSimulating(false);
    }
  };

  const handleReset = async () => {
    if (!window.confirm('Reset all funnels to verified baseline metrics? This is tracked in the audit log.')) {
      return;
    }
    setRefreshing(true);
    try {
      const res = await api.resetFunnelSimulation();
      if (res.success) {
        if (onNotify) onNotify(res.message, 'info');
        await fetchAnalytics();
      }
    } catch (err: any) {
      if (onNotify) onNotify(err.message || 'Reset failed.', 'error');
    } finally {
      setRefreshing(false);
    }
  };

  // Filter & sort logic
  const filteredFunnels = React.useMemo(() => {
    if (!data) return [];
    return data.funnels
      .filter(f => {
        const matchesCompany = selectedCompany === 'all' || f.company === selectedCompany;
        const matchesCategory = selectedCategory === 'all' || f.category === selectedCategory;
        const matchesQuery = !searchQuery.trim() ||
          f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          f.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
          f.category.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCompany && matchesCategory && matchesQuery;
      })
      .sort((a, b) => {
        if (sortBy === 'revenue') return b.revenueUSD - a.revenueUSD;
        if (sortBy === 'optInRate') return b.optInRate - a.optInRate;
        if (sortBy === 'leads') return b.leads - a.leads;
        if (sortBy === 'views') return b.views - a.views;
        if (sortBy === 'bookings') return b.bookings - a.bookings;
        return 0;
      });
  }, [data, selectedCompany, selectedCategory, searchQuery, sortBy]);

  // Categories list
  const categories = React.useMemo(() => {
    if (!data) return [];
    const set = new Set<string>();
    data.funnels.forEach(f => set.add(f.category));
    return Array.from(set);
  }, [data]);

  if (loading) {
    return (
      <div className="py-24 text-center space-y-4">
        <RefreshCw className="w-8 h-8 text-[#38bdf8] animate-spin mx-auto" />
        <p className="text-sm text-[#94a3b8]">Loading Omni-Funnel Performance Analytics...</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="p-8 text-center bg-[#131d33] border border-[#1e2d4d] rounded-2xl space-y-3">
        <AlertTriangle className="w-8 h-8 text-[#f59e0b] mx-auto" />
        <p className="text-sm text-[#f8fafc]">No funnel analytics data available.</p>
        <button
          onClick={() => fetchAnalytics(true)}
          className="px-4 py-2 bg-[#38bdf8] text-[#090d16] font-bold rounded-lg text-xs"
        >
          Retry Connection
        </button>
      </div>
    );
  }

  const { summary, stageFunnel, topFunnelsByRevenue, attributionTotals, companyBreakdown } = data;

  return (
    <div className="space-y-8">
      {/* Top Banner & Header */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 p-6 bg-gradient-to-r from-[#131d33] via-[#0f172a] to-[#131d33] border border-[#1e2d4d] rounded-2xl shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-lg bg-[#38bdf8]/10 text-[#38bdf8] border border-[#38bdf8]/30">
              <Layers className="w-5 h-5" />
            </span>
            <h2 className="text-2xl font-bold font-heading text-[#f8fafc]">
              Omni-Funnel Performance Command Center
            </h2>
          </div>
          <p className="text-xs text-[#94a3b8] max-w-2xl">
            Real-time analytics, conversion telemetry, and multi-touch channel attribution across all 15 active sales and lead acquisition funnels.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => fetchAnalytics(true)}
            disabled={refreshing}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#1e2d4d] hover:bg-[#2a3f6d] text-xs font-semibold text-[#f8fafc] border border-[#38bdf8]/20 transition-all disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin text-[#38bdf8]' : ''}`} />
            <span>{refreshing ? 'Updating...' : 'Live Sync'}</span>
          </button>

          <button
            onClick={() => {
              setSimTargetSlug('/formation');
              setSimModalOpen(true);
            }}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#38bdf8] hover:bg-[#0ea5e9] text-[#090d16] text-xs font-bold shadow-md transition-all hover:scale-[1.02]"
          >
            <Zap className="w-3.5 h-3.5 fill-current" />
            <span>Test Traffic Simulation</span>
          </button>

          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#090d16] hover:bg-[#131d33] text-xs font-semibold text-[#94a3b8] hover:text-[#f8fafc] border border-[#1e2d4d] transition-all"
            title="Reset funnels to default verified baseline"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset Baseline</span>
          </button>
        </div>
      </div>

      {/* Top Level Metric KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {/* Total Views */}
        <div className="p-4 bg-[#131d33] border border-[#1e2d4d] rounded-xl space-y-1.5">
          <div className="flex items-center justify-between text-[#94a3b8] text-[11px] font-semibold uppercase tracking-wider">
            <span>Total Traffic</span>
            <Globe className="w-3.5 h-3.5 text-[#38bdf8]" />
          </div>
          <div className="text-2xl font-black text-[#f8fafc] tracking-tight">
            {summary.totalViews.toLocaleString()}
          </div>
          <div className="text-[10px] text-[#22c55e] flex items-center gap-1">
            <span>Across 15 Funnels</span>
          </div>
        </div>

        {/* Total Leads */}
        <div className="p-4 bg-[#131d33] border border-[#1e2d4d] rounded-xl space-y-1.5">
          <div className="flex items-center justify-between text-[#94a3b8] text-[11px] font-semibold uppercase tracking-wider">
            <span>Leads Captured</span>
            <Users className="w-3.5 h-3.5 text-[#38bdf8]" />
          </div>
          <div className="text-2xl font-black text-[#38bdf8] tracking-tight">
            {summary.totalLeads.toLocaleString()}
          </div>
          <div className="text-[10px] text-[#94a3b8]">
            Avg. Opt-In: <span className="font-bold text-[#f8fafc]">{summary.avgOptInRate}%</span>
          </div>
        </div>

        {/* Total Bookings */}
        <div className="p-4 bg-[#131d33] border border-[#1e2d4d] rounded-xl space-y-1.5">
          <div className="flex items-center justify-between text-[#94a3b8] text-[11px] font-semibold uppercase tracking-wider">
            <span>Consultations</span>
            <Calendar className="w-3.5 h-3.5 text-[#a855f7]" />
          </div>
          <div className="text-2xl font-black text-[#a855f7] tracking-tight">
            {summary.totalBookings.toLocaleString()}
          </div>
          <div className="text-[10px] text-[#94a3b8]">
            Booking Rate: <span className="font-bold text-[#f8fafc]">{summary.avgBookingRate}%</span>
          </div>
        </div>

        {/* Won Deals */}
        <div className="p-4 bg-[#131d33] border border-[#1e2d4d] rounded-xl space-y-1.5">
          <div className="flex items-center justify-between text-[#94a3b8] text-[11px] font-semibold uppercase tracking-wider">
            <span>Won Deals</span>
            <CheckCircle2 className="w-3.5 h-3.5 text-[#22c55e]" />
          </div>
          <div className="text-2xl font-black text-[#22c55e] tracking-tight">
            {summary.totalSales.toLocaleString()}
          </div>
          <div className="text-[10px] text-[#94a3b8]">
            Sales Win Rate: <span className="font-bold text-[#f8fafc]">{summary.avgWinRate}%</span>
          </div>
        </div>

        {/* Revenue USD */}
        <div className="p-4 bg-[#131d33] border border-[#1e2d4d] rounded-xl space-y-1.5">
          <div className="flex items-center justify-between text-[#94a3b8] text-[11px] font-semibold uppercase tracking-wider">
            <span>Revenue ($ USD)</span>
            <DollarSign className="w-3.5 h-3.5 text-[#eab308]" />
          </div>
          <div className="text-2xl font-black text-[#f8fafc] tracking-tight">
            ${summary.totalRevenueUSD.toLocaleString()}
          </div>
          <div className="text-[10px] text-[#94a3b8]">
            End-to-End: <span className="font-bold text-[#22c55e]">{summary.overallConversionRate}%</span>
          </div>
        </div>

        {/* Revenue BHD */}
        <div className="p-4 bg-[#131d33] border border-[#1e2d4d] rounded-xl space-y-1.5">
          <div className="flex items-center justify-between text-[#94a3b8] text-[11px] font-semibold uppercase tracking-wider">
            <span>Revenue (BHD)</span>
            <DollarSign className="w-3.5 h-3.5 text-[#38bdf8]" />
          </div>
          <div className="text-2xl font-black text-[#38bdf8] tracking-tight">
            {summary.totalRevenueBHD.toLocaleString()} <span className="text-xs font-normal">BHD</span>
          </div>
          <div className="text-[10px] text-[#94a3b8]">
            Exchange: 1 USD ≈ 0.377 BHD
          </div>
        </div>
      </div>

      {/* 4-Stage Visual Conversion Drop-off Graphic */}
      <div className="p-6 bg-[#131d33] border border-[#1e2d4d] rounded-2xl shadow-lg space-y-5">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <h3 className="text-base font-bold text-[#f8fafc] flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-[#38bdf8]" />
              <span>Full-Funnel Conversion & Drop-off Dynamics</span>
            </h3>
            <p className="text-xs text-[#94a3b8]">
              Step-by-step conversion efficiency from cold impression to closed revenue contract.
            </p>
          </div>
          <div className="text-xs font-bold text-[#22c55e] px-2.5 py-1 rounded-full bg-[#22c55e]/10 border border-[#22c55e]/30">
            Healthy Pipeline
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stageFunnel.map((step, idx) => (
            <div key={idx} className="relative p-4 bg-[#090d16] border border-[#1e2d4d] rounded-xl space-y-2">
              <div className="flex items-center justify-between text-xs text-[#94a3b8]">
                <span className="font-semibold">{step.stage}</span>
                <span className="text-[11px] font-mono text-[#38bdf8]">{step.pct}%</span>
              </div>
              <div className="text-2xl font-black text-[#f8fafc]">
                {step.count.toLocaleString()}
              </div>

              {/* Progress bar */}
              <div className="w-full h-1.5 bg-[#131d33] rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    idx === 0 ? 'bg-[#38bdf8]' : idx === 1 ? 'bg-[#0ea5e9]' : idx === 2 ? 'bg-[#a855f7]' : 'bg-[#22c55e]'
                  }`}
                  style={{ width: `${Math.max(step.pct, 4)}%` }}
                />
              </div>

              {step.dropoffPct > 0 && (
                <div className="text-[10px] text-[#f43f5e] flex items-center justify-between pt-1 border-t border-[#1e2d4d]/60">
                  <span>Step Drop-off</span>
                  <span className="font-semibold">-{step.dropoffPct}%</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Company Breakdown & Channel Attribution Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Company Breakdown */}
        <div className="p-6 bg-[#131d33] border border-[#1e2d4d] rounded-2xl shadow-lg space-y-4">
          <h3 className="text-sm font-bold text-[#f8fafc] flex items-center gap-2">
            <PieChart className="w-4 h-4 text-[#38bdf8]" />
            <span>Performance by Operating Entity</span>
          </h3>
          <div className="space-y-3">
            {Object.entries(companyBreakdown).map(([compName, stats]: any) => (
              <div key={compName} className="p-3.5 bg-[#090d16] border border-[#1e2d4d] rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#f8fafc]">{compName}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#1e2d4d] text-[#38bdf8] font-semibold">
                    {stats.funnelsCount} Funnels
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-2 text-center text-xs">
                  <div className="p-1.5 bg-[#131d33] rounded-lg">
                    <span className="text-[10px] text-[#94a3b8] block">Views</span>
                    <span className="font-bold text-[#f8fafc]">{stats.views.toLocaleString()}</span>
                  </div>
                  <div className="p-1.5 bg-[#131d33] rounded-lg">
                    <span className="text-[10px] text-[#94a3b8] block">Leads</span>
                    <span className="font-bold text-[#38bdf8]">{stats.leads.toLocaleString()}</span>
                  </div>
                  <div className="p-1.5 bg-[#131d33] rounded-lg">
                    <span className="text-[10px] text-[#94a3b8] block">Deals</span>
                    <span className="font-bold text-[#22c55e]">{stats.sales}</span>
                  </div>
                  <div className="p-1.5 bg-[#131d33] rounded-lg">
                    <span className="text-[10px] text-[#94a3b8] block">Revenue</span>
                    <span className="font-bold text-[#eab308]">${stats.revenueUSD.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Multi-Channel Attribution Share */}
        <div className="p-6 bg-[#131d33] border border-[#1e2d4d] rounded-2xl shadow-lg space-y-4">
          <h3 className="text-sm font-bold text-[#f8fafc] flex items-center gap-2">
            <Share2 className="w-4 h-4 text-[#38bdf8]" />
            <span>Omni-Channel Lead Acquisition Distribution</span>
          </h3>
          <div className="space-y-2.5">
            {Object.entries(attributionTotals).map(([channel, count]: any) => {
              const totalChannelTraffic = Object.values(attributionTotals).reduce((a: any, b: any) => a + b, 0) as number;
              const pct = totalChannelTraffic > 0 ? Number(((count / totalChannelTraffic) * 100).toFixed(1)) : 0;
              return (
                <div key={channel} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#f8fafc] font-medium">{channel}</span>
                    <span className="text-[#94a3b8]">
                      {count.toLocaleString()} <span className="text-[10px]">({pct}%)</span>
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-[#090d16] rounded-full overflow-hidden border border-[#1e2d4d]">
                    <div
                      className="h-full bg-gradient-to-r from-[#38bdf8] to-[#0ea5e9] rounded-full"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Funnels Filter, Search and Controls Bar */}
      <div className="p-4 bg-[#131d33] border border-[#1e2d4d] rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-[#94a3b8] absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search by funnel name or slug..."
            className="w-full pl-9 pr-3 py-1.5 bg-[#090d16] border border-[#1e2d4d] rounded-xl text-xs text-[#f8fafc] placeholder-[#94a3b8] focus:border-[#38bdf8] focus:outline-none"
          />
        </div>

        {/* Dropdowns */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {/* Company Filter */}
          <select
            value={selectedCompany}
            onChange={e => setSelectedCompany(e.target.value)}
            className="bg-[#090d16] border border-[#1e2d4d] rounded-xl text-xs text-[#f8fafc] px-3 py-1.5 focus:border-[#38bdf8] focus:outline-none"
          >
            <option value="all">All Operating Entities</option>
            <option value="Bab Al-Khaleej">Bab Al-Khaleej (Bahrain)</option>
            <option value="Back for Brand LLC">Back for Brand LLC (USA)</option>
            <option value="Executive Hub">Executive Hub</option>
          </select>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={e => setSelectedCategory(e.target.value)}
            className="bg-[#090d16] border border-[#1e2d4d] rounded-xl text-xs text-[#f8fafc] px-3 py-1.5 focus:border-[#38bdf8] focus:outline-none"
          >
            <option value="all">All Categories</option>
            {categories.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          {/* Sort By */}
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value as any)}
            className="bg-[#090d16] border border-[#1e2d4d] rounded-xl text-xs text-[#f8fafc] px-3 py-1.5 focus:border-[#38bdf8] focus:outline-none"
          >
            <option value="revenue">Sort: Highest Revenue</option>
            <option value="optInRate">Sort: Conversion Rate (%)</option>
            <option value="leads">Sort: Most Leads</option>
            <option value="views">Sort: Most Traffic</option>
            <option value="bookings">Sort: Most Bookings</option>
          </select>
        </div>
      </div>

      {/* All 15 Funnels Performance Table */}
      <div className="bg-[#131d33] border border-[#1e2d4d] rounded-2xl overflow-hidden shadow-xl">
        <div className="p-4 border-b border-[#1e2d4d] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-heading font-bold text-sm text-[#f8fafc]">
              Catalog of Active Sales Funnels ({filteredFunnels.length})
            </span>
          </div>
          <span className="text-[11px] text-[#94a3b8]">
            Click <span className="text-[#38bdf8] font-bold">Launch</span> to test live buyer flow
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#090d16]/70 text-[#94a3b8] border-b border-[#1e2d4d]">
                <th className="py-3 px-4 font-semibold">Funnel Name & Slug</th>
                <th className="py-3 px-3 font-semibold">Entity & Category</th>
                <th className="py-3 px-3 font-semibold text-right">Traffic</th>
                <th className="py-3 px-3 font-semibold text-right">Leads</th>
                <th className="py-3 px-3 font-semibold text-right">Opt-In %</th>
                <th className="py-3 px-3 font-semibold text-right">Bookings</th>
                <th className="py-3 px-3 font-semibold text-right">Won Deals</th>
                <th className="py-3 px-3 font-semibold text-right">Revenue ($ / BHD)</th>
                <th className="py-3 px-3 font-semibold text-center">Health</th>
                <th className="py-3 px-4 font-semibold text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1e2d4d]/60">
              {filteredFunnels.map(funnel => {
                const isTopRevenue = topFunnelsByRevenue.some(t => t.slug === funnel.slug);
                return (
                  <tr
                    key={funnel.slug}
                    className="hover:bg-[#1e2d4d]/30 transition-colors"
                  >
                    {/* Name & Slug */}
                    <td className="py-3.5 px-4">
                      <div className="space-y-0.5">
                        <div className="font-bold text-[#f8fafc] flex items-center gap-1.5">
                          <span>{funnel.name}</span>
                          {isTopRevenue && (
                            <span className="px-1.5 py-0.5 rounded text-[9px] font-black uppercase tracking-wider bg-[#eab308]/20 text-[#eab308] border border-[#eab308]/40">
                              Top Producer
                            </span>
                          )}
                        </div>
                        <div className="font-mono text-[11px] text-[#38bdf8]">
                          {funnel.slug}
                        </div>
                      </div>
                    </td>

                    {/* Entity & Category */}
                    <td className="py-3.5 px-3">
                      <div className="space-y-1">
                        <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                          funnel.company === 'Bab Al-Khaleej'
                            ? 'bg-[#0ea5e9]/10 text-[#38bdf8] border border-[#0ea5e9]/30'
                            : funnel.company === 'Back for Brand LLC'
                            ? 'bg-[#eab308]/10 text-[#facc15] border border-[#eab308]/30'
                            : 'bg-[#a855f7]/10 text-[#c084fc] border border-[#a855f7]/30'
                        }`}>
                          {funnel.company}
                        </span>
                        <div className="text-[10px] text-[#94a3b8]">
                          {funnel.category}
                        </div>
                      </div>
                    </td>

                    {/* Traffic */}
                    <td className="py-3.5 px-3 text-right font-semibold text-[#f8fafc]">
                      {funnel.views.toLocaleString()}
                    </td>

                    {/* Leads */}
                    <td className="py-3.5 px-3 text-right font-bold text-[#38bdf8]">
                      {funnel.leads.toLocaleString()}
                    </td>

                    {/* Opt-In % */}
                    <td className="py-3.5 px-3 text-right">
                      <span className={`font-mono font-bold ${
                        funnel.optInRate >= 14 ? 'text-[#22c55e]' : funnel.optInRate >= 8 ? 'text-[#38bdf8]' : 'text-[#f59e0b]'
                      }`}>
                        {funnel.optInRate}%
                      </span>
                    </td>

                    {/* Bookings */}
                    <td className="py-3.5 px-3 text-right font-semibold text-[#a855f7]">
                      {funnel.bookings}
                    </td>

                    {/* Won Deals */}
                    <td className="py-3.5 px-3 text-right font-bold text-[#22c55e]">
                      {funnel.sales}
                    </td>

                    {/* Revenue */}
                    <td className="py-3.5 px-3 text-right">
                      <div className="font-bold text-[#f8fafc]">
                        ${funnel.revenueUSD.toLocaleString()}
                      </div>
                      <div className="text-[10px] text-[#94a3b8]">
                        {funnel.revenueBHD.toLocaleString()} BHD
                      </div>
                    </td>

                    {/* Health Status */}
                    <td className="py-3.5 px-3 text-center">
                      <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        funnel.healthStatus === 'Optimal'
                          ? 'bg-[#22c55e]/15 text-[#22c55e] border border-[#22c55e]/30'
                          : funnel.healthStatus === 'Healthy'
                          ? 'bg-[#38bdf8]/15 text-[#38bdf8] border border-[#38bdf8]/30'
                          : 'bg-[#f59e0b]/15 text-[#f59e0b] border border-[#f59e0b]/30'
                      }`}>
                        {funnel.healthStatus}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <a
                          href={funnel.slug}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1.5 rounded-lg bg-[#1e2d4d] hover:bg-[#38bdf8] hover:text-[#090d16] text-[#f8fafc] transition-colors"
                          title="Open live funnel page in new tab"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                        <button
                          onClick={() => {
                            setSimTargetSlug(funnel.slug);
                            setSimModalOpen(true);
                          }}
                          className="p-1.5 rounded-lg bg-[#1e2d4d] hover:bg-[#22c55e] hover:text-[#090d16] text-[#38bdf8] transition-colors"
                          title="Inject simulated traffic and leads into this funnel"
                        >
                          <Zap className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* AI Conversion Optimization Recommendations */}
      <div className="p-6 bg-[#131d33] border border-[#1e2d4d] rounded-2xl shadow-lg space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-[#38bdf8]/10 text-[#38bdf8]">
              <Sparkles className="w-4 h-4" />
            </span>
            <h3 className="font-heading font-bold text-sm text-[#f8fafc]">
              Executive CRO & Funnel Optimization Diagnostics
            </h3>
          </div>
          <span className="text-[11px] text-[#22c55e] font-semibold">
            Automated Intelligence Engine
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-[#090d16] border border-[#1e2d4d] rounded-xl space-y-2">
            <div className="text-xs font-bold text-[#38bdf8] flex items-center gap-1.5">
              <span>Bahrain Formation Blueprint</span>
            </div>
            <p className="text-xs text-[#94a3b8] leading-relaxed">
              Opt-in rate is <strong className="text-[#22c55e]">14.6% (Top Quartile)</strong>. Suggest activating the automated WhatsApp voice reminder within 15 minutes of opt-in to lift booking conversion by 18%.
            </p>
          </div>

          <div className="p-4 bg-[#090d16] border border-[#1e2d4d] rounded-xl space-y-2">
            <div className="text-xs font-bold text-[#38bdf8] flex items-center gap-1.5">
              <span>Generative Search (GEO / AEO) VSL</span>
            </div>
            <p className="text-xs text-[#94a3b8] leading-relaxed">
              Highest revenue velocity at <strong className="text-[#f8fafc]">$24.91 / visitor</strong>. Allocate 40% of upcoming Google Ads PMax budget to this funnel to maximize high-ticket B2B inquiries.
            </p>
          </div>

          <div className="p-4 bg-[#090d16] border border-[#1e2d4d] rounded-xl space-y-2">
            <div className="text-xs font-bold text-[#38bdf8] flex items-center gap-1.5">
              <span>Investor Visa & Golden Visa VSL</span>
            </div>
            <p className="text-xs text-[#94a3b8] leading-relaxed">
              Snapchat & TikTok Ads drive 24% of traffic here. Add Arabic voice synthesis and bilingual Arabic requirement briefs to shorten the sales cycle for GCC nationals.
            </p>
          </div>
        </div>
      </div>

      {/* Traffic Simulator Modal */}
      {simModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md bg-[#131d33] border border-[#38bdf8]/40 rounded-2xl shadow-2xl p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-[#1e2d4d] pb-3">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-[#38bdf8]" />
                <h3 className="font-heading font-bold text-base text-[#f8fafc]">
                  Simulate Live Funnel Traffic
                </h3>
              </div>
              <button
                onClick={() => setSimModalOpen(false)}
                className="text-[#94a3b8] hover:text-[#f8fafc] text-sm"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-[#94a3b8]">
              Inject simulated test traffic, inbound leads, and consultation bookings into any funnel to verify live tracking updates and conversion rate calculations.
            </p>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-[#f8fafc] block mb-1">
                  Target Funnel
                </label>
                <select
                  value={simTargetSlug}
                  onChange={e => setSimTargetSlug(e.target.value)}
                  className="w-full p-2 bg-[#090d16] border border-[#1e2d4d] rounded-xl text-xs text-[#f8fafc] focus:border-[#38bdf8] focus:outline-none"
                >
                  {data.funnels.map(f => (
                    <option key={f.slug} value={f.slug}>
                      {f.name} ({f.slug})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-[11px] font-semibold text-[#94a3b8] block mb-1">
                    + Views
                  </label>
                  <input
                    type="number"
                    value={simViews}
                    onChange={e => setSimViews(Number(e.target.value))}
                    min={1}
                    max={1000}
                    className="w-full p-2 bg-[#090d16] border border-[#1e2d4d] rounded-xl text-xs text-[#f8fafc] focus:border-[#38bdf8]"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-[#94a3b8] block mb-1">
                    + Leads
                  </label>
                  <input
                    type="number"
                    value={simLeads}
                    onChange={e => setSimLeads(Number(e.target.value))}
                    min={0}
                    max={200}
                    className="w-full p-2 bg-[#090d16] border border-[#1e2d4d] rounded-xl text-xs text-[#f8fafc] focus:border-[#38bdf8]"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-[#94a3b8] block mb-1">
                    + Bookings
                  </label>
                  <input
                    type="number"
                    value={simBookings}
                    onChange={e => setSimBookings(Number(e.target.value))}
                    min={0}
                    max={50}
                    className="w-full p-2 bg-[#090d16] border border-[#1e2d4d] rounded-xl text-xs text-[#f8fafc] focus:border-[#38bdf8]"
                  />
                </div>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setSimModalOpen(false)}
                className="px-4 py-2 bg-[#090d16] text-[#94a3b8] text-xs font-semibold rounded-xl border border-[#1e2d4d]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSimulate}
                disabled={simulating}
                className="px-4 py-2 bg-[#38bdf8] hover:bg-[#0ea5e9] text-[#090d16] text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all"
              >
                {simulating ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Zap className="w-3.5 h-3.5 fill-current" />}
                <span>Execute Simulation</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
