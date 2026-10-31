import { Link } from 'react-router-dom';
import { SEOHead } from '../../components/SEOHead';
import { SERVICES_CATALOG } from '../ServiceDetailPage';
import { Play, ArrowRight, Video, Sparkles } from 'lucide-react';

export function FunnelsIndexPage() {
  const serviceList = Object.values(SERVICES_CATALOG);

  return (
    <>
      <SEOHead
        title="12 Video Sales Letter (VSL) Funnels | Ghazi Wazir"
        description="Catalog of our 12 direct-response VSL funnels covering Bahrain business setup and global AI marketing."
        noindex={true}
      />

      <div className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="tag inline-block">Direct-Response Hub</div>
          <h1 className="font-heading font-black text-4xl sm:text-5xl text-[#f5f1e8]">
            12 Service Video <span className="text-gold-gradient">Funnels</span>
          </h1>
          <p className="text-base text-[#a8a7b3] leading-relaxed">
            Select a specialized video presentation below to understand our exact deliverables, 3-step execution framework, and consultation booking.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {serviceList.map(svc => (
            <Link
              key={svc.id}
              to={`/funnels/${svc.id}`}
              className="card-luxury p-6 flex flex-col justify-between group hover:border-[#e8c872] transition-all"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-[11px] text-[#a8a7b3]">
                  <span className="font-bold text-[#e8c872] uppercase tracking-wider">{svc.company}</span>
                  <span className="flex items-center gap-1 text-[#ffa24d]">
                    <Video className="w-3.5 h-3.5" />
                    <span>VSL</span>
                  </span>
                </div>

                <h2 className="font-heading font-bold text-lg text-[#f5f1e8] group-hover:text-[#e8c872] transition-colors">
                  {svc.name}
                </h2>

                <p className="text-xs text-[#a8a7b3] leading-relaxed line-clamp-2">
                  {svc.headline}
                </p>
              </div>

              <div className="pt-6 mt-4 border-t border-[#2a2a38] flex items-center justify-between text-xs font-bold text-[#e8c872]">
                <span className="flex items-center gap-1.5">
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Launch Funnel</span>
                </span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
