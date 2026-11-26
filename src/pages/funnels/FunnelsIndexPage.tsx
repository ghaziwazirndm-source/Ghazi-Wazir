import { Link } from 'react-router-dom';
import { SEOHead } from '../../components/SEOHead';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { SERVICES_CATALOG } from '../ServiceDetailPage';
import { Play, ArrowRight, Video } from 'lucide-react';

export function FunnelsIndexPage() {
  const serviceList = Object.values(SERVICES_CATALOG);

  return (
    <>
      <SEOHead
        title="Bahrain Setup & AI Growth Video Briefings | Ghazi Wazir"
        description="Explore 12 focused video briefings covering Bahrain company setup, investor visas, GEO, AEO, and AI sales agents. Watch a briefing today."
        canonical="https://ghaziwazir.com/funnels"
        breadcrumbs={[
          { name: 'Home', item: '/' },
          { name: 'Video Briefings', item: '/funnels' },
        ]}
      />

      <div className="py-12 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        <Breadcrumbs
          items={[
            { label: 'Home', to: '/' },
            { label: '12 Video Briefings' },
          ]}
        />
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
