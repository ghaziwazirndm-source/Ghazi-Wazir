/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

// Layout & Global Components
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';
import { AIChatDrawer } from './components/AIChatDrawer';
import { CookieBanner } from './components/CookieBanner';
import { ProgressBar } from './components/ProgressBar';
import { MobileBottomBar } from './components/MobileBottomBar';
import { ErrorBoundary } from './components/ErrorBoundary';

import { ToastProvider } from './context/ToastContext';
import { ABThemeProvider } from './context/ABThemeContext';

import { initAttributionTracking } from './services/attribution';
import { adTracker } from './services/adTracking';

// Eager HomePage for instant LCP / FCP
import { HomePage } from './pages/HomePage';

// Lazy-loaded secondary routes (drastically improves Time to Interactive & bundle size)
const ArabicHomePage = lazy(() => import('./pages/ArabicHomePage').then(m => ({ default: m.ArabicHomePage })));
const CompaniesPage = lazy(() => import('./pages/CompaniesPage').then(m => ({ default: m.CompaniesPage })));
const StartPage = lazy(() => import('./pages/StartPage').then(m => ({ default: m.StartPage })));
const AboutPage = lazy(() => import('./pages/AboutPage').then(m => ({ default: m.AboutPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then(m => ({ default: m.ContactPage })));
const BookPage = lazy(() => import('./pages/BookPage').then(m => ({ default: m.BookPage })));
const PackagesPage = lazy(() => import('./pages/PackagesPage').then(m => ({ default: m.PackagesPage })));
const BlogPage = lazy(() => import('./pages/BlogPage').then(m => ({ default: m.BlogPage })));
const GuideDetailPage = lazy(() => import('./pages/GuideDetailPage').then(m => ({ default: m.GuideDetailPage })));
const ServiceDetailPage = lazy(() => import('./pages/ServiceDetailPage').then(m => ({ default: m.ServiceDetailPage })));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage').then(m => ({ default: m.NotFoundPage })));
const ThankYouPage = lazy(() => import('./pages/ThankYouPage').then(m => ({ default: m.ThankYouPage })));
const LoginPage = lazy(() => import('./pages/LoginPage').then(m => ({ default: m.LoginPage })));
const ContentStudioPage = lazy(() => import('./pages/ContentStudioPage').then(m => ({ default: m.ContentStudioPage })));

// Funnels
const FunnelsIndexPage = lazy(() => import('./pages/funnels/FunnelsIndexPage').then(m => ({ default: m.FunnelsIndexPage })));
const VSLServicePage = lazy(() => import('./pages/funnels/VSLServicePage').then(m => ({ default: m.VSLServicePage })));

// Formation Funnel
const FormationIndexPage = lazy(() => import('./pages/formation/FormationIndexPage').then(m => ({ default: m.FormationIndexPage })));
const FormationBridgePage = lazy(() => import('./pages/formation/FormationBridgePage').then(m => ({ default: m.FormationBridgePage })));
const FormationBlueprintPage = lazy(() => import('./pages/formation/FormationBlueprintPage').then(m => ({ default: m.FormationBlueprintPage })));
const FormationOfferPage = lazy(() => import('./pages/formation/FormationOfferPage').then(m => ({ default: m.FormationOfferPage })));

// Legal Pages
const PrivacyPolicyPage = lazy(() => import('./pages/legal/PrivacyPolicyPage').then(m => ({ default: m.PrivacyPolicyPage })));
const TermsPage = lazy(() => import('./pages/legal/TermsPage').then(m => ({ default: m.TermsPage })));
const DisclaimerPage = lazy(() => import('./pages/legal/DisclaimerPage').then(m => ({ default: m.DisclaimerPage })));
const CookiePolicyPage = lazy(() => import('./pages/legal/CookiePolicyPage').then(m => ({ default: m.CookiePolicyPage })));

// Heavy Admin & Firebase Auth Modules (strictly code-split from public bundle)
const FirebaseProvider = lazy(() => import('./context/FirebaseContext').then(m => ({ default: m.FirebaseProvider })));
const ProtectedAdminRoute = lazy(() => import('./components/ProtectedAdminRoute').then(m => ({ default: m.ProtectedAdminRoute })));
const AdminConsole = lazy(() => import('./pages/admin/AdminConsole').then(m => ({ default: m.AdminConsole })));

function RouteLoadingFallback() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center p-8">
      <div className="flex flex-col items-center gap-3 text-center">
        <div className="w-9 h-9 rounded-full border-2 border-[#e8c872]/25 border-t-[#e8c872] animate-spin" />
        <span className="text-xs font-mono text-[#a39f96] uppercase tracking-widest">
          Loading...
        </span>
      </div>
    </div>
  );
}

function ScrollToTop() {
  const { pathname, search } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    initAttributionTracking();
    adTracker.trackPageView(pathname);
  }, [pathname, search]);
  return null;
}

function AppContent() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen overflow-x-clip bg-[var(--bg)] text-[var(--text)] font-sans antialiased selection:bg-[var(--accent)]/30 selection:text-[var(--text)] transition-colors duration-300">
      <ScrollToTop />
      {!isAdmin && <ProgressBar />}
      {!isAdmin && <Navbar />}

      <main className={!isAdmin ? 'min-h-[calc(100vh-80px)]' : 'min-h-screen'}>
        <Suspense fallback={<RouteLoadingFallback />}>
          <Routes>
            {/* Public Core Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/ar" element={<ArabicHomePage />} />
            <Route path="/companies" element={<CompaniesPage />} />
            <Route path="/start" element={<StartPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/book" element={<BookPage />} />
            <Route path="/packages" element={<PackagesPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<GuideDetailPage />} />
            <Route path="/services/:serviceId" element={<ServiceDetailPage />} />

            {/* VSL Funnels */}
            <Route path="/funnels" element={<FunnelsIndexPage />} />
            <Route path="/funnels/:service" element={<VSLServicePage />} />

            {/* Russell Brunson Epiphany Bridge Formation Funnel */}
            <Route path="/formation" element={<FormationIndexPage />} />
            <Route path="/formation/bridge" element={<FormationBridgePage />} />
            <Route path="/formation/blueprint" element={<FormationBlueprintPage />} />
            <Route path="/formation/offer" element={<FormationOfferPage />} />
            <Route path="/thank-you" element={<ThankYouPage />} />

            {/* Legal Pages */}
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/terms-of-service" element={<TermsPage />} />
            <Route path="/disclaimer" element={<DisclaimerPage />} />
            <Route path="/cookie-policy" element={<CookiePolicyPage />} />

            {/* Dedicated Platform Login Portal */}
            <Route
              path="/login"
              element={
                <FirebaseProvider>
                  <LoginPage />
                </FirebaseProvider>
              }
            />

            {/* Standalone All-Platform Content Studio & Autopilot */}
            <Route path="/content-studio" element={<ContentStudioPage />} />

            {/* CEO Command Center (Protected by Firebase Auth & Role Verification) */}
            <Route
              path="/admin"
              element={
                <FirebaseProvider>
                  <ProtectedAdminRoute allowedRoles={['CEO', 'ADMIN', 'SALES', 'SUPPORT', 'FINANCE', 'VIEWER']}>
                    <AdminConsole />
                  </ProtectedAdminRoute>
                </FirebaseProvider>
              }
            />

            {/* 404 Fallback */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </main>

      {!isAdmin && <Footer />}
      {!isAdmin && <WhatsAppButton />}
      {!isAdmin && <AIChatDrawer />}
      {!isAdmin && <CookieBanner />}
      {!isAdmin && <MobileBottomBar />}
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <ToastProvider>
          <ABThemeProvider>
            <AppContent />
          </ABThemeProvider>
        </ToastProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}
