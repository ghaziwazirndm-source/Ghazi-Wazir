import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { SEOHead } from '../components/SEOHead';
import { api } from '../services/api';
import { useToast } from '../context/ToastContext';
import { useFirebaseAuth } from '../context/FirebaseContext';
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
  Share2
} from 'lucide-react';

export function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { showToast } = useToast();
  const { signInWithGoogle, firebaseUser, role: firebaseRole, enabled: firebaseEnabled } = useFirebaseAuth();

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

  useEffect(() => {
    const redirectedError = (location.state as any)?.authError;
    if (redirectedError) {
      setErrorMessage(redirectedError);
    }
  }, [location.state]);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setErrorMessage('');
    try {
      const { role } = await signInWithGoogle();
      if (role) {
        const from = (location.state as any)?.from?.pathname || '/admin';
        navigate(from, { replace: true });
      }
    } catch (err: any) {
      const msg = err?.message || 'Firebase Google authentication failed.';
      setErrorMessage(msg);
      showToast({
        title: 'Authentication Failed',
        message: msg,
        type: 'error',
        theme: 'crimson'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password) {
      const msg = 'Please provide both corporate email and password.';
      setErrorMessage(msg);
      showToast({ title: 'Authentication Failed', message: msg, type: 'error', theme: 'crimson' });
      return;
    }

    setLoading(true);
    setErrorMessage('');

    try {
      const res = await api.login(email.trim(), password);
      if (!res?.token || !res?.user) {
        throw new Error('Authentication did not return a valid user session.');
      }
      api.setToken(res.token);
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
      const msg = err.message || 'Login failed. Please verify credentials.';
      setErrorMessage(msg);
      showToast({
        title: 'Authentication Failed',
        message: msg,
        type: 'error',
        theme: 'crimson'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInstantQuickLogin = async (role: 'CEO' | 'ADMIN' | 'SALES' | 'FINANCE') => {
    setLoading(true);
    setErrorMessage('');
    try {
      const res = await api.quickLogin(role);
      if (!res?.token || !res?.user) {
        throw new Error('Quick login did not return a valid session.');
      }
      api.setToken(res.token);
      showToast({
        title: 'Executive Session Verified',
        message: `Authenticated as ${res.user.name} [${res.user.role}].`,
        type: 'success',
        theme: 'sapphire'
      });
      navigate('/admin', { replace: true });
    } catch (err: any) {
      const msg = err.message || 'Quick login failed.';
      setErrorMessage(msg);
      showToast({
        title: 'Authentication Failed',
        message: msg,
        type: 'error',
        theme: 'crimson'
      });
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
    setErrorMessage('');
    setLoading(true);
    try {
      const res: any = await api.resetPassword(resetEmail, resetNewPassword);
      setResetSuccess(res.message || 'Password successfully updated.');
      setEmail(resetEmail);
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

      <div className="min-h-[calc(100vh-80px)] flex items-center justify-center pt-10 pb-28 md:py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          {/* Brand Header */}
          <div className="text-center space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-[#14141b] border border-[#e8c872]/60 flex items-center justify-center mx-auto shadow-[0_14px_34px_-12px_rgba(232,200,114,0.22)]">
              <span className="font-heading font-bold text-2xl text-gold-gradient tracking-tight">GW</span>
            </div>
            <div>
              <h1 className="font-heading font-bold text-3xl sm:text-4xl text-[#f7f4ec] tracking-tight">
                Executive Platform Portal
              </h1>
              <p className="text-xs text-[#a39f96] mt-1">
                Bab Al-Khaleej (Bahrain) &middot; Back for Brand LLC (USA)
              </p>
            </div>
          </div>

          {/* Firebase Auth Google Sign-In (Required for Protected /admin Route) */}
          <div className="p-5 bg-[#14141b] border border-[#e8c872]/35 rounded-2xl shadow-xl space-y-3.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-[#e8c872] uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#4ade80]" />
                Firebase Role Verification
              </span>
              <span className="text-[10px] text-[#a39f96]">Protected /admin Gate</span>
            </div>

            {firebaseUser && firebaseRole && firebaseEnabled ? (
              <button
                type="button"
                onClick={() => navigate('/admin', { replace: true })}
                className="w-full py-3.5 rounded-xl bg-[#22c55e] hover:bg-[#16a34a] text-[#052e16] font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(34,197,94,0.25)] transition-all"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Enter Admin Console ({firebaseRole})</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={loading}
                className="btn-gold w-full py-3.5 rounded-xl text-[#0b0905] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all disabled:opacity-50"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>{loading ? 'Verifying Firebase Session...' : 'Sign In with Google (Firebase Auth)'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}

            {/* Quick Role Selectors */}
            <div className="pt-1 flex items-center justify-between text-[11px] text-[#a39f96]">
              <span>Workspace Demo Role:</span>
              <div className="flex items-center gap-1.5">
                {(['CEO', 'ADMIN', 'SALES', 'FINANCE'] as const).map(role => (
                  <button
                    key={role}
                    type="button"
                    onClick={() => handleInstantQuickLogin(role)}
                    className="px-2 py-1 rounded-lg bg-[#08080b] hover:bg-[#1b1b24] text-[#f7f4ec] text-[10px] font-bold border border-[#262633] hover:border-[#e8c872]/50 transition-colors"
                  >
                    {role}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="relative flex items-center justify-center">
            <div className="w-full border-t border-[#262633]" />
            <span className="px-3 bg-[#08080b] text-[11px] text-[#a39f96] uppercase tracking-wider shrink-0">
              or enter credentials
            </span>
            <div className="w-full border-t border-[#262633]" />
          </div>

          {/* Standard Credentials Form */}
          <div className="p-6 bg-[#14141b] border border-[#262633] rounded-2xl shadow-xl space-y-4">
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
                    className="btn-gold px-3 py-1.5 rounded-lg text-[#0b0905] font-bold text-[11px] transition-all"
                  >
                    Instant CEO Login Bypass
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setEmail('ghaziwazirndm@gmail.com');
                      setPassword('GhaziWazir2026!');
                      setErrorMessage('');
                    }}
                    className="px-2.5 py-1.5 rounded-lg bg-[#1b1b24] border border-[#262633] text-[#f7f4ec] text-[11px] hover:bg-[#262633]"
                  >
                    Reset Defaults
                  </button>
                </div>
              </div>
            )}

            {/* Default Credentials Helper */}
            <div className="p-3 rounded-xl bg-[#0e0e14] border border-[#262633] space-y-2 text-xs">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] uppercase font-bold text-[#e8c872]">Auto-Fill Credentials:</span>
                <div className="flex flex-wrap items-center gap-1">
                  {[
                    { label: 'CEO', email: 'ghaziwazirndm@gmail.com', pass: 'GhaziWazir2026!' },
                    { label: 'Admin', email: 'admin@babalkhaleej.com', pass: 'Admin2026!' },
                    { label: 'Sales', email: 'sales@backforbrand.com', pass: 'Sales2026!' },
                    { label: 'Finance', email: 'finance@babalkhaleej.com', pass: 'Finance2026!' }
                  ].map(preset => (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() => {
                        setEmail(preset.email);
                        setPassword(preset.pass);
                        setErrorMessage('');
                      }}
                      className="px-2 py-0.5 rounded-md bg-[#1b1b24] hover:bg-[#e8c872] hover:text-[#0b0905] text-[#e8c872] font-bold text-[10px] uppercase tracking-wider transition-colors"
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>
              <div className="text-[11px] text-[#a39f96] font-mono truncate">
                {email || 'ghaziwazirndm@gmail.com'}
              </div>
            </div>

            {resetSuccess && (
              <div className="p-3 bg-[#132a1e] border border-[#22c55e] rounded-xl text-xs text-[#86efac] flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-[#22c55e]" />
                <span>{resetSuccess}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#f7f4ec] block">
                  Corporate Email or Role Username
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#a39f96] absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    autoComplete="username"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="ghaziwazirndm@gmail.com or admin"
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-[#08080b] border border-[#262633] text-xs text-[#f7f4ec] placeholder-[#6b6860] focus:border-[#e8c872] focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-[#f7f4ec]">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowReset(!showReset)}
                    className="text-[11px] text-[#e8c872] hover:underline"
                  >
                    Reset Password
                  </button>
                </div>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-[#a39f96] absolute left-3 top-3" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-9 pr-10 py-2.5 rounded-xl bg-[#08080b] border border-[#262633] text-xs text-[#f7f4ec] placeholder-[#6b6860] focus:border-[#e8c872] focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-[#a39f96] hover:text-[#f7f4ec]"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 text-xs text-[#a39f96] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={e => setRememberMe(e.target.checked)}
                    className="rounded border-[#262633] accent-[#e8c872] focus:ring-0"
                  />
                  <span>Keep session active</span>
                </label>
                <span className="text-[11px] text-[#4ade80] flex items-center gap-1 font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>256-bit Encrypted</span>
                </span>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-[#1b1b24] hover:bg-[#e8c872] hover:text-[#0b0905] text-[#f7f4ec] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 border border-[#e8c872]/35 transition-all disabled:opacity-50"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>{loading ? 'Authenticating...' : 'Sign In to Console'}</span>
              </button>
            </form>

            {/* In-Line Reset Form Toggle */}
            {showReset && (
              <div className="pt-4 border-t border-[#262633] space-y-3 animate-fade-in">
                <span className="text-xs font-bold text-[#f7f4ec] block">
                  Reset Master Password
                </span>
                <form onSubmit={handlePasswordReset} className="space-y-3">
                  <input
                    type="password"
                    placeholder="Enter new 8+ character password..."
                    value={resetNewPassword}
                    onChange={e => setResetNewPassword(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#08080b] border border-[#262633] text-xs text-[#f7f4ec] focus:border-[#e8c872] focus:outline-none"
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setShowReset(false)}
                      className="px-3 py-1.5 rounded-lg text-xs text-[#a39f96]"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="btn-gold px-4 py-1.5 rounded-lg text-[#0b0905] font-bold text-xs"
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
              className="p-3 bg-[#14141b] border border-[#262633] hover:border-[#e8c872]/50 rounded-xl text-[#a39f96] hover:text-[#e8c872] transition-colors flex items-center justify-center gap-1.5"
            >
              <Share2 className="w-3.5 h-3.5 text-[#e8c872]" />
              <span>Content Studio</span>
            </Link>

            <Link
              to="/funnels"
              className="p-3 bg-[#14141b] border border-[#262633] hover:border-[#e8c872]/50 rounded-xl text-[#a39f96] hover:text-[#e8c872] transition-colors flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#e8c872]" />
              <span>12 Sales Funnels</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
