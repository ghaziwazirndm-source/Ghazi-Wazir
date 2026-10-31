import { Link } from 'react-router-dom';
import { SEOHead } from '../components/SEOHead';
import { ArrowLeft, Home, Compass } from 'lucide-react';

export function NotFoundPage() {
  return (
    <>
      <SEOHead
        title="404 — Page Not Found | Ghazi Wazir"
        description="The requested page could not be located."
        noindex={true}
      />

      <div className="py-24 sm:py-36 max-w-xl mx-auto px-4 text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-[#14141d] border border-[#2a2a38] flex items-center justify-center mx-auto text-[#e8c872]">
          <Compass className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="font-heading font-black text-6xl text-gold-gradient block">404</span>
          <h1 className="font-heading font-bold text-2xl text-[#f5f1e8]">Page Not Found</h1>
          <p className="text-sm text-[#a8a7b3] leading-relaxed">
            The page you are looking for does not exist or has been relocated to another section of the website.
          </p>
        </div>

        <div className="pt-4 flex flex-wrap justify-center gap-4">
          <Link
            to="/"
            className="btn-gold px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider text-[#16120a] flex items-center gap-2"
          >
            <Home className="w-4 h-4" />
            <span>Return to Homepage</span>
          </Link>
          <Link
            to="/packages"
            className="px-6 py-3 rounded-full border border-[#2a2a38] text-xs font-semibold text-[#f5f1e8] hover:border-[#e8c872] flex items-center gap-2"
          >
            <span>View Services</span>
          </Link>
        </div>
      </div>
    </>
  );
}
