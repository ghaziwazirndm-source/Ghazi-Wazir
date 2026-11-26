import React, { useEffect, useRef } from 'react';
import { Navigate, useLocation, Link } from 'react-router-dom';
import { ShieldAlert, RefreshCw, LogOut, ArrowLeft, Lock } from 'lucide-react';
import { useFirebaseAuth } from '../context/FirebaseContext';
import { useToast } from '../context/ToastContext';
import { Role } from '../types';

interface ProtectedAdminRouteProps {
  children: React.ReactNode;
  allowedRoles?: Role[];
}

const DEFAULT_ADMIN_ROLES: Role[] = [
  'CEO',
  'ADMIN',
  'SALES',
  'SUPPORT',
  'FINANCE',
  'VIEWER',
];

export function ProtectedAdminRoute({
  children,
  allowedRoles = DEFAULT_ADMIN_ROLES,
}: ProtectedAdminRouteProps) {
  const {
    firebaseUser,
    authReady,
    verifying,
    role,
    enabled,
    authError,
    signInWithGoogle,
    signOutFirebase,
    refreshUserRole,
  } = useFirebaseAuth();
  const { error: errorToast } = useToast();
  const location = useLocation();
  const toastedKeyRef = useRef<string | null>(null);

  const isAuthorized =
    Boolean(firebaseUser) &&
    enabled &&
    Boolean(role) &&
    allowedRoles.includes(role as Role) &&
    !authError;

  useEffect(() => {
    if (!authReady || verifying) return;

    if (isAuthorized) {
      toastedKeyRef.current = null;
      return;
    }

    const reason =
      authError ||
      (!firebaseUser
        ? 'Firebase authentication is required to access the Admin Console.'
        : !enabled
        ? 'Your account is currently disabled.'
        : `Role "${role || 'NONE'}" is not authorized for /admin access.`);

    const dedupeKey = `${firebaseUser?.uid || 'anon'}:${reason}`;
    if (toastedKeyRef.current !== dedupeKey) {
      toastedKeyRef.current = dedupeKey;
      errorToast('Authentication Failed', reason);
    }
  }, [authReady, verifying, isAuthorized, firebaseUser, enabled, role, authError, errorToast]);

  if (!authReady || verifying) {
    return (
      <div className="min-h-screen bg-[#08080b] flex items-center justify-center p-4">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="w-12 h-12 rounded-2xl bg-[#14141b] border border-[#e8c872]/50 flex items-center justify-center text-[#e8c872] shadow-[0_0_25px_rgba(232,200,114,0.15)]">
            <RefreshCw className="w-6 h-6 animate-spin" />
          </div>
          <div className="space-y-1">
            <p className="text-xs font-mono text-[#f7f4ec] tracking-widest uppercase">
              Verifying Firebase Role Access...
            </p>
            <p className="text-[11px] text-[#a39f96]">
              Validating Firebase Auth identity &amp; Firestore permissions
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Unauthenticated -> redirect cleanly to /login with original path & error context
  if (!firebaseUser) {
    return (
      <Navigate
        to="/login"
        replace
        state={{
          from: location,
          authError:
            authError ||
            'Firebase Auth verification is required before accessing /admin.',
        }}
      />
    );
  }

  // Authenticated via Firebase, but role/permissions failed verification
  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-[#08080b] flex items-center justify-center p-4">
        <div className="w-full max-w-md p-8 rounded-2xl bg-[#14141b] border border-red-500/40 shadow-2xl space-y-6 text-center">
          <div className="w-14 h-14 rounded-2xl bg-red-500/15 border border-red-500/40 flex items-center justify-center mx-auto text-red-400">
            <ShieldAlert className="w-7 h-7" />
          </div>

          <div className="space-y-2">
            <h1 className="font-heading font-bold text-2xl text-[#f7f4ec]">
              Admin Access Denied
            </h1>
            <p className="text-xs text-[#a39f96] leading-relaxed">
              {authError ||
                `Signed in as ${firebaseUser.email}, which does not hold an authorized role (${allowedRoles.join(', ')}).`}
            </p>
          </div>

          <div className="p-3 rounded-xl bg-[#0e0e14] border border-[#262633] text-left text-[11px] text-[#a39f96] space-y-1">
            <div className="flex items-center justify-between">
              <span>Account:</span>
              <span className="font-mono text-[#f7f4ec] truncate max-w-[220px]">
                {firebaseUser.email || firebaseUser.uid}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span>Verified Role:</span>
              <span className="font-bold text-red-400">{role || 'UNASSIGNED'}</span>
            </div>
          </div>

          <div className="space-y-2.5">
            <button
              type="button"
              onClick={() => void signInWithGoogle().catch(() => undefined)}
              className="btn-gold w-full py-3 rounded-xl text-[#0b0905] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
            >
              <Lock className="w-4 h-4" />
              <span>Switch Google Account</span>
            </button>

            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => void refreshUserRole()}
                className="py-2.5 rounded-xl bg-[#1b1b24] hover:bg-[#262633] border border-[#262633] text-[#f7f4ec] font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5 text-[#e8c872]" />
                <span>Re-Verify Role</span>
              </button>

              <button
                type="button"
                onClick={() => void signOutFirebase()}
                className="py-2.5 rounded-xl bg-[#2a1313] hover:bg-[#3a1919] border border-red-500/30 text-red-300 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>

          <div className="pt-2 border-t border-[#262633]">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-xs text-[#a39f96] hover:text-[#e8c872] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to Public Site</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
