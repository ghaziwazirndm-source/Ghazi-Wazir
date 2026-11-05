import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { SEOHead } from '../components/SEOHead';
import { api } from '../services/api';
import { useToast } from '../context/ToastContext';
import {
  Lock,
  Mail,
  KeyRound,
  Eye,
  EyeOff,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Sparkles,
  Building2,
  Globe,
  Share2
} from 'lucide-react';

export function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { showToast } = useToast();

  const [email, setEmail] = useState('ghaziwazirndm@gmail.com');
  const [password, setPassword] = useState('GhaziWazir2026!');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Password Reset Modal / State
  const [showReset, setShowReset] = useState(false);
  const [resetEmail, setResetEmail] = useState('ghaziwazirndm@gmail.com');
  const [resetNewPassword, setResetNewPassword] = useState('');
  const [resetSuccess, setResetSuccess] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password) {
      setErrorMessage('Please provide both corporate email and password.');
      return;
    }

    setLoading(true);
    setErrorMessage('');

    try {
      const res = await api.login(email.trim(), password);
      if (res.token) {
        api.setToken(res.token);
      }
      showToast({
        title: 'Authentication Successful',
        message: `Welcome, ${res.user.name} (${res.user.role}). Command Center unlocked.`,
        type: 'success',
        theme: 'sapphire'
      });

      // Navigate to admin console or intended destination
      const from = (location.state as any)?.from?.pathname || '/admin';
      navigate(from, { replace: true });
    } catch (err: any) {
      setErrorMessage(err.message || 'Login failed. Please verify credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleInstantQuickLogin = async (role: 'CEO' | 'ADMIN' | 'SALES' | 'FINANCE') => {
    setLoading(true);
    setErrorMessage('');
    try {
      const res = await api.quickLogin(role);
      if (res.token) {
        api.setToken(res.token);
      }
      showToast({
        title: 'Executive Session Verified',
        message: `Authenticated as ${res.user.name} [${res.user.role}].`,
        type: 'success',
        theme: 'sapphire'
      });
      navigate('/admin', { replace: true });
    } catch (err: any) {
      setErrorMessage(err.message || 'Quick login failed.');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetNewPassword || resetNewPassword.length < 8) {
      setErrorMessage('New password must be at least 8 characters long.');
      return;
    }
    setLoading(true);
    try {
      const res: any = await api.resetPassword(resetEmail, resetNewPassword);
      setResetSuccess(res.message || 'Password successfully updated.');
      setPassword(resetNewPassword);
      setTimeout(() => {
        setShowReset(false);
        setResetSuccess('');
      }, 2000);
    } catch (err: any) {
      setErrorMessage(err.message || 'Password reset failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEOHead
        title="Executive Platform Login | Ghazi Wazir"
        description="Secure executive portal for Bab Al-Khaleej and Back for Brand LLC governance, CRM, and Content Studio."
        noindex={true}
      />

      <div className="min-h-[calc(100vh-80px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          {/* Brand Header */}
          <div className="text-center space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#131d33] to-[#090d16] border-2 border-[#38bdf8] flex items-center justify-center mx-auto shadow-[0_0_25px_rgba(56,189,248,0.3)]">
              <span className="font-heading font-black text-2xl text-[#38bdf8] tracking-tight">GW</span>
            </div>
            <div>
              <h1 className="font-heading font-black text-2xl sm:text-3xl text-[#f8fafc] tracking-tight">
                Executive Platform Portal
              </h1>
              <p className="text-xs text-[#94a3b8] mt-1">
                Bab Al-Khaleej (Bahrain) &middot; Back for Brand LLC (USA)
              </p>
            </div>
          </div>

          {/* 1-Click Fast Executive Login */}
          <div className="p-5 bg-gradient-to-br from-[#131d33] via-[#0f172a] to-[#131d33] border border-[#38bdf8]/40 rounded-2xl shadow-xl space-y-3.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-[#38bdf8] uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse" />
                Instant Executive Control
              </span>
              <span className="text-[10px] text-[#94a3b8]">Verified One-Click Access</span>
            </div>

            <button
              type="button"
              onClick={() => handleInstantQuickLogin('CEO')}
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-[#38bdf8] hover:bg-[#0ea5e9] text-[#090d16] font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(56,189,248,0.3)] transition-all hover:scale-[1.02] disabled:opacity-50"
            >
              <span>👑</span>
              <span>Enter as Ghazi Wazir (CEO)</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Quick Role Selectors */}
            <div className="pt-1 flex items-center justify-between text-[11px] text-[#94a3b8]">
              <span>Switch Role:</span>
              <div className="flex items-center gap-1.5">
                {(['ADMIN', 'SALES', 'FINANCE'] as const).map(role => (
                  <button
                    key={role}
                    type="button"
                    onClick={() => handleInstantQuickLogin(role)}
                    className="px-2.5 py-1 rounded-lg bg-[#090d16] hover:bg-[#1e2d4d] text-[#f8fafc] text-[10px] font-bold border border-[#1e2d4d] transition-colors"
                  >
                    {role}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="relative flex items-center justify-center">
            <div className="w-full border-t border-[#1e2d4d]" />
            <span className="px-3 bg-[#090d16] text-[11px] text-[#94a3b8] uppercase tracking-wider shrink-0">
              or enter credentials
            </span>
            <div className="w-full border-t border-[#1e2d4d]" />
          </div>

          {/* Standard Credentials Form */}
          <div className="p-6 bg-[#131d33] border border-[#1e2d4d] rounded-2xl shadow-xl space-y-4">
            {errorMessage && (
              <div className="p-3.5 bg-[#2a1313] border border-[#ff5d5d] rounded-xl text-xs text-[#ffb3b3] space-y-2">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-[#ff5d5d]" />
                  <span className="font-semibold">{errorMessage}</span>
                </div>
                <div className="flex items-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => handleInstantQuickLogin('CEO')}
                    className="px-3 py-1.5 rounded-lg bg-[#38bdf8] text-[#090d16] font-bold text-[11px] hover:bg-[#0ea5e9] transition-all"
                  >
                    👑 Instant CEO Login Bypass
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setEmail('ghaziwazirndm@gmail.com');
                      setPassword('GhaziWazir2026!');
                      setErrorMessage('');
                    }}
                    className="px-2.5 py-1.5 rounded-lg bg-[#1e2d4d] text-[#f8fafc] text-[11px] hover:bg-[#2a3c63]"
                  >
                    Reset Defaults
                  </button>
                </div>
              </div>
            )}

            {/* Default Credentials Helper */}
            <div className="p-3 rounded-xl bg-[#0d1527] border border-[#1e2d4d] flex items-center justify-between text-xs">
              <div className="space-y-0.5">
                <span className="text-[10px] uppercase font-bold text-[#38bdf8] block">Seeded CEO Credentials:</span>
                <span className="text-[#94a3b8] font-mono text-[11px]">ghaziwazirndm@gmail.com</span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setEmail('ghaziwazirndm@gmail.com');
                  setPassword('GhaziWazir2026!');
                }}
                className="px-2.5 py-1 rounded-lg bg-[#1e2d4d] hover:bg-[#38bdf8] hover:text-[#090d16] text-[#38bdf8] font-bold text-[10px] uppercase tracking-wider transition-colors"
              >
                Auto-Fill
              </button>
            </div>

            {resetSuccess && (
              <div className="p-3 bg-[#132a1e] border border-[#22c55e] rounded-xl text-xs text-[#86efac] flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-[#22c55e]" />
                <span>{resetSuccess}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#f8fafc] block">
                  Corporate Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#94a3b8] absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="ghaziwazirndm@gmail.com"
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-[#090d16] border border-[#1e2d4d] text-xs text-[#f8fafc] placeholder-[#64748b] focus:border-[#38bdf8] focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-[#f8fafc]">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowReset(!showReset)}
                    className="text-[11px] text-[#38bdf8] hover:underline"
                  >
                    Reset Password
                  </button>
                </div>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-[#94a3b8] absolute left-3 top-3" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-9 pr-10 py-2.5 rounded-xl bg-[#090d16] border border-[#1e2d4d] text-xs text-[#f8fafc] placeholder-[#64748b] focus:border-[#38bdf8] focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-[#94a3b8] hover:text-[#f8fafc]"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 text-xs text-[#94a3b8] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={e => setRememberMe(e.target.checked)}
                    className="rounded border-[#1e2d4d] text-[#38bdf8] focus:ring-0"
                  />
                  <span>Keep session active</span>
                </label>
                <span className="text-[11px] text-[#22c55e] flex items-center gap-1 font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>256-bit Encrypted</span>
                </span>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-[#1e2d4d] hover:bg-[#38bdf8] hover:text-[#090d16] text-[#f8fafc] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 border border-[#38bdf8]/30 transition-all disabled:opacity-50"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>{loading ? 'Authenticating...' : 'Sign In to Console'}</span>
              </button>
            </form>

            {/* In-Line Reset Form Toggle */}
            {showReset && (
              <div className="pt-4 border-t border-[#1e2d4d] space-y-3 animate-fade-in">
                <span className="text-xs font-bold text-[#f8fafc] block">
                  Reset Master Password
                </span>
                <form onSubmit={handlePasswordReset} className="space-y-3">
                  <input
                    type="password"
                    placeholder="Enter new 8+ character password..."
                    value={resetNewPassword}
                    onChange={e => setResetNewPassword(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#090d16] border border-[#1e2d4d] text-xs text-[#f8fafc] focus:border-[#38bdf8] focus:outline-none"
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setShowReset(false)}
                      className="px-3 py-1.5 rounded-lg text-xs text-[#94a3b8]"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="px-4 py-1.5 rounded-lg bg-[#38bdf8] text-[#090d16] font-bold text-xs"
                    >
                      Save Password
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>

          {/* Quick Shortcuts to Content Studio & Funnels */}
          <div className="grid grid-cols-2 gap-3 text-center text-xs">
            <Link
              to="/content-studio"
              className="p-3 bg-[#131d33] border border-[#1e2d4d] hover:border-[#38bdf8]/40 rounded-xl text-[#94a3b8] hover:text-[#38bdf8] transition-colors flex items-center justify-center gap-1.5"
            >
              <Share2 className="w-3.5 h-3.5 text-[#38bdf8]" />
              <span>Content Studio</span>
            </Link>

            <Link
              to="/funnels"
              className="p-3 bg-[#131d33] border border-[#1e2d4d] hover:border-[#38bdf8]/40 rounded-xl text-[#94a3b8] hover:text-[#38bdf8] transition-colors flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#38bdf8]" />
              <span>12 Sales Funnels</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
