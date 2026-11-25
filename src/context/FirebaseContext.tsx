import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import {
  User as FirebaseUser,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import {
  auth,
  db,
  googleProvider,
  OperationType,
  handleFirestoreError,
} from '../firebase';
import { Role } from '../types';
import { api } from '../services/api';
import { useToast } from './ToastContext';

const BOOTSTRAPPED_CEO_EMAIL = 'ghaziwazirndm@gmail.com';
const VALID_STAFF_ROLES: Role[] = ['CEO', 'ADMIN', 'SALES', 'SUPPORT', 'FINANCE', 'VIEWER'];

interface FirebaseAuthContextValue {
  firebaseUser: FirebaseUser | null;
  authReady: boolean;
  verifying: boolean;
  role: Role | null;
  enabled: boolean;
  authError: string | null;
  signInWithGoogle: () => Promise<{ user: FirebaseUser; role: Role | null }>;
  signOutFirebase: () => Promise<void>;
  refreshUserRole: () => Promise<Role | null>;
}

const FirebaseAuthContext = createContext<FirebaseAuthContextValue | null>(null);

function sanitizeLength(value: string, maxLen: number): string {
  return String(value || '').trim().slice(0, maxLen);
}

export function FirebaseProvider({ children }: { children: React.ReactNode }) {
  const { error: errorToast, success: successToast } = useToast();

  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [authReady, setAuthReady] = useState(false);
  const [verifying, setVerifying] = useState(true);
  const [role, setRole] = useState<Role | null>(null);
  const [enabled, setEnabled] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const verifyFirebaseUserRole = useCallback(async (fbUser: FirebaseUser | null): Promise<Role | null> => {
    if (!fbUser) {
      setRole(null);
      setEnabled(false);
      setAuthError(null);
      return null;
    }

    setVerifying(true);
    setAuthError(null);

    const userPath = `users/${fbUser.uid}`;
    const adminPath = `admins/${fbUser.uid}`;
    const email = (fbUser.email || '').trim().toLowerCase();
    const isBootstrappedCeo = email === BOOTSTRAPPED_CEO_EMAIL && fbUser.emailVerified;

    try {
      let userData: { role?: string; enabled?: boolean } | null = null;
      try {
        const userSnap = await getDoc(doc(db, 'users', fbUser.uid));
        if (userSnap.exists()) {
          userData = userSnap.data() as { role?: string; enabled?: boolean };
        }
      } catch (err) {
        handleFirestoreError(err, OperationType.GET, userPath);
      }

      if (!userData && isBootstrappedCeo) {
        // Provision root CEO profile in Firestore conforming strictly to firebase-blueprint.json
        const safeName = sanitizeLength(fbUser.displayName || 'Ghazi Wazir', 120) || 'Ghazi Wazir';
        const safeEmail = sanitizeLength(email, 254);

        try {
          await setDoc(doc(db, 'users', fbUser.uid), {
            uid: fbUser.uid,
            name: safeName,
            email: safeEmail,
            role: 'CEO',
            enabled: true,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
          });
        } catch (err) {
          handleFirestoreError(err, OperationType.WRITE, userPath);
        }

        try {
          await setDoc(doc(db, 'admins', fbUser.uid), {
            uid: fbUser.uid,
            role: 'CEO',
            grantedBy: fbUser.uid,
            createdAt: serverTimestamp(),
          });
        } catch (err) {
          handleFirestoreError(err, OperationType.WRITE, adminPath);
        }

        userData = { role: 'CEO', enabled: true };
      }

      let resolvedRole: Role | null = null;
      let isEnabled = false;

      if (userData) {
        const candidateRole = String(userData.role || '').toUpperCase() as Role;
        isEnabled = userData.enabled !== false;
        if (VALID_STAFF_ROLES.includes(candidateRole)) {
          resolvedRole = candidateRole;
        }
      } else {
        // Fallback check on /admins/{uid} marker document
        try {
          const adminSnap = await getDoc(doc(db, 'admins', fbUser.uid));
          if (adminSnap.exists()) {
            const adminData = adminSnap.data() as { role?: string };
            const candidateRole = String(adminData.role || 'ADMIN').toUpperCase() as Role;
            if (VALID_STAFF_ROLES.includes(candidateRole)) {
              resolvedRole = candidateRole;
              isEnabled = true;
            }
          }
        } catch (err) {
          handleFirestoreError(err, OperationType.GET, adminPath);
        }
      }

      if (!resolvedRole) {
        setRole(null);
        setEnabled(false);
        setAuthError(
          `Access denied for ${email || 'this account'}: no authorized staff or admin role is assigned in Firestore.`
        );
        return null;
      }

      if (!isEnabled) {
        setRole(resolvedRole);
        setEnabled(false);
        setAuthError('Your account has been disabled by an administrator.');
        return null;
      }

      setRole(resolvedRole);
      setEnabled(true);
      setAuthError(null);

      // Sync verified Firebase ID token with backend Express workspace session if needed
      try {
        const idToken = await fbUser.getIdToken();
        if (idToken) {
          await api.firebaseExchange(idToken);
        }
      } catch (exchangeErr: any) {
        console.warn('Backend Firebase session sync note:', exchangeErr?.message || exchangeErr);
      }

      return resolvedRole;
    } catch (err: any) {
      let message = 'Firebase role verification failed.';
      if (err instanceof Error) {
        try {
          const parsed = JSON.parse(err.message);
          message = parsed?.error || message;
        } catch {
          message = err.message || message;
        }
      }
      setRole(null);
      setEnabled(false);
      setAuthError(message);
      return null;
    } finally {
      setVerifying(false);
    }
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
      setFirebaseUser(fbUser);
      await verifyFirebaseUserRole(fbUser);
      setAuthReady(true);
    });

    return () => unsubscribe();
  }, [verifyFirebaseUserRole]);

  const signInWithGoogle = useCallback(async () => {
    setVerifying(true);
    setAuthError(null);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const verifiedRole = await verifyFirebaseUserRole(result.user);
      if (!verifiedRole) {
        const denyMsg = `Authentication verified (${result.user.email}), but this account lacks an authorized Admin/Staff role.`;
        errorToast('Access Denied', denyMsg);
        throw new Error(denyMsg);
      }
      successToast(
        'Firebase Auth Verified',
        `Signed in as ${result.user.displayName || result.user.email} (${verifiedRole}).`
      );
      return { user: result.user, role: verifiedRole };
    } catch (err: any) {
      const msg =
        err?.code === 'auth/popup-closed-by-user'
          ? 'Sign-in popup was closed before completing authentication.'
          : err?.code === 'auth/popup-blocked'
          ? 'Sign-in popup was blocked by your browser. Please allow popups for this site.'
          : err?.message || 'Firebase authentication failed.';
      setAuthError(msg);
      errorToast('Authentication Failed', msg);
      setVerifying(false);
      throw err instanceof Error ? err : new Error(msg);
    }
  }, [verifyFirebaseUserRole, errorToast, successToast]);

  const signOutFirebase = useCallback(async () => {
    try {
      await signOut(auth);
    } finally {
      setFirebaseUser(null);
      setRole(null);
      setEnabled(false);
      setAuthError(null);
    }
  }, []);

  const refreshUserRole = useCallback(async () => {
    return verifyFirebaseUserRole(auth.currentUser);
  }, [verifyFirebaseUserRole]);

  return (
    <FirebaseAuthContext.Provider
      value={{
        firebaseUser,
        authReady,
        verifying,
        role,
        enabled,
        authError,
        signInWithGoogle,
        signOutFirebase,
        refreshUserRole,
      }}
    >
      {children}
    </FirebaseAuthContext.Provider>
  );
}

export function useFirebaseAuth(): FirebaseAuthContextValue {
  const ctx = useContext(FirebaseAuthContext);
  if (!ctx) {
    throw new Error('useFirebaseAuth must be used within a FirebaseProvider');
  }
  return ctx;
}
