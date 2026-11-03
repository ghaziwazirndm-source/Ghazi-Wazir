import { SEOHead } from '../components/SEOHead';
import { ContentStudio } from '../components/ContentStudio';
import { useToast } from '../context/ToastContext';
import { Link } from 'react-router-dom';
import { Activity, ArrowRight, ShieldCheck } from 'lucide-react';

export function ContentStudioPage() {
  const { showToast } = useToast();

  const handleNotify = (msg: string, type: 'success' | 'error' | 'info') => {
    showToast({
      title: type === 'success' ? 'Content Autopilot' : type === 'error' ? 'Autopilot Error' : 'Autopilot Update',
      message: msg,
      type: type === 'error' ? 'error' : 'success',
      theme: 'sapphire'
    });
  };

  return (
    <>
      <SEOHead
        title="All-Platform Content Studio & AI Autopilot | Ghazi Wazir"
        description="Cross-platform content management, AI generation, and autonomous syndication across LinkedIn, X/Twitter, Instagram, TikTok, Google Business, and GEO blogs."
        noindex={true}
      />

      <div className="py-10 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top Breadcrumb Bar */}
        <div className="flex items-center justify-between text-xs text-[#94a3b8]">
          <div className="flex items-center gap-2">
            <Link to="/" className="hover:text-[#f8fafc]">Home</Link>
            <span>/</span>
            <span className="text-[#38bdf8] font-bold">Content Studio & AI Autopilot</span>
          </div>

          <Link
            to="/admin"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#131d33] hover:bg-[#1e2d4d] border border-[#1e2d4d] text-xs font-semibold text-[#f8fafc] transition-colors"
          >
            <Activity className="w-3.5 h-3.5 text-[#38bdf8]" />
            <span>Open CEO Command Center &rarr;</span>
          </Link>
        </div>

        {/* Dedicated Content Studio & Autopilot Interface */}
        <ContentStudio onNotify={handleNotify} standalone={true} />
      </div>
    </>
  );
}
