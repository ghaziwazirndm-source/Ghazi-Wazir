/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

// Layout & Global Components
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';
import { AIChatDrawer } from './components/AIChatDrawer';
import { CookieBanner } from './components/CookieBanner';
import { ProgressBar } from './components/ProgressBar';

// Pages
import { HomePage } from './pages/HomePage';
import { CompaniesPage } from './pages/CompaniesPage';
import { StartPage } from './pages/StartPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { BookPage } from './pages/BookPage';
import { PackagesPage } from './pages/PackagesPage';
import { BlogPage } from './pages/BlogPage';
import { GuideDetailPage } from './pages/GuideDetailPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { ThankYouPage } from './pages/ThankYouPage';
import { LoginPage } from './pages/LoginPage';
import { ContentStudioPage } from './pages/ContentStudioPage';

// Funnels
import { FunnelsIndexPage } from './pages/funnels/FunnelsIndexPage';
import { VSLServicePage } from './pages/funnels/VSLServicePage';

// Formation Funnel
import { FormationIndexPage } from './pages/formation/FormationIndexPage';
import { FormationBridgePage } from './pages/formation/FormationBridgePage';
import { FormationBlueprintPage } from './pages/formation/FormationBlueprintPage';
import { FormationOfferPage } from './pages/formation/FormationOfferPage';

// Legal Pages
import { PrivacyPolicyPage } from './pages/legal/PrivacyPolicyPage';
import { TermsPage } from './pages/legal/TermsPage';
import { DisclaimerPage } from './pages/legal/DisclaimerPage';
import { CookiePolicyPage } from './pages/legal/CookiePolicyPage';

// Admin Console
import { AdminConsole } from './pages/admin/AdminConsole';

import { ABThemeSwitcher } from './components/ABThemeSwitcher';
import { ToastProvider } from './context/ToastContext';
import { ABThemeProvider } from './context/ABThemeContext';

import { initAttributionTracking } from './services/attribution';
import { adTracker } from './services/adTracking';

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
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] font-sans antialiased selection:bg-[var(--accent)]/30 selection:text-[var(--text)] transition-colors duration-300">
      <ScrollToTop />
      {!isAdmin && <ProgressBar />}
      {!isAdmin && <Navbar />}

      <main className={!isAdmin ? 'pt-20 min-h-[calc(100vh-80px)]' : 'min-h-screen'}>
        <Routes>
          {/* Public Core Routes */}
          <Route path="/" element={<HomePage />} />
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
          <Route path="/login" element={<LoginPage />} />

          {/* Standalone All-Platform Content Studio & Autopilot */}
          <Route path="/content-studio" element={<ContentStudioPage />} />

          {/* CEO Command Center */}
          <Route path="/admin" element={<AdminConsole />} />

          {/* 404 Fallback */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      {!isAdmin && <Footer />}
      {!isAdmin && <WhatsAppButton />}
      {!isAdmin && <AIChatDrawer />}
      {!isAdmin && <CookieBanner />}
      {!isAdmin && <ABThemeSwitcher />}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <ABThemeProvider>
          <AppContent />
        </ABThemeProvider>
      </ToastProvider>
    </BrowserRouter>
  );
}

