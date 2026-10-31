import { useMemo } from 'react';
import { ExternalLink } from 'lucide-react';

export interface SocialLinksConfig {
  linkedin?: string;
  facebook?: string;
  instagram?: string;
  x?: string;
  youtube?: string;
  tiktok?: string;
  whatsapp?: string;
  telegram?: string;
  snapchat?: string;
  pinterest?: string;
  threads?: string;
  medium?: string;
  github?: string;
  google?: string;
  fiverr?: string;
  upwork?: string;
  freelancer?: string;
  pph?: string;
  clutch?: string;
  trustpilot?: string;
}

interface SocialLinksProps {
  config?: SocialLinksConfig;
  hideEmpty?: boolean;
}

export function SocialLinks({ config, hideEmpty = false }: SocialLinksProps) {
  // Default values matching config.js in prototype
  const activeConfig = useMemo(() => {
    return {
      whatsapp: 'https://wa.me/97335628353',
      linkedin: 'https://linkedin.com/in/ghaziwazir',
      facebook: 'https://facebook.com/ghaziwazirndm',
      instagram: 'https://instagram.com/ghaziwazir',
      x: 'https://x.com/ghaziwazir',
      youtube: 'https://youtube.com/@ghaziwazir',
      tiktok: 'https://tiktok.com/@ghaziwazir',
      telegram: 'https://t.me/ghaziwazir',
      snapchat: 'https://snapchat.com/add/ghaziwazir',
      pinterest: 'https://pinterest.com/ghaziwazir',
      threads: 'https://threads.net/@ghaziwazir',
      medium: 'https://medium.com/@ghaziwazir',
      github: 'https://github.com/ghaziwazir',
      google: 'https://maps.google.com/?q=Bab+Al-Khaleej+Manama+Bahrain',
      fiverr: 'https://fiverr.com/ghaziwazir',
      upwork: 'https://upwork.com/freelancers/~01ghaziwazir',
      freelancer: 'https://freelancer.com/u/ghaziwazir',
      pph: 'https://peopleperhour.com/freelancer/ghaziwazir',
      clutch: 'https://clutch.co/profile/back-brand-llc',
      trustpilot: 'https://trustpilot.com/review/babal-khaleej.com',
      ...config,
    };
  }, [config]);

  const platforms = [
    { key: 'whatsapp', name: 'WhatsApp', color: '#25D366', icon: '💬', url: activeConfig.whatsapp },
    { key: 'linkedin', name: 'LinkedIn', color: '#0A66C2', icon: 'in', url: activeConfig.linkedin },
    { key: 'facebook', name: 'Facebook', color: '#1877F2', icon: 'f', url: activeConfig.facebook },
    { key: 'instagram', name: 'Instagram', color: '#E4405F', icon: '📷', url: activeConfig.instagram },
    { key: 'x', name: 'X / Twitter', color: '#000000', icon: '𝕏', url: activeConfig.x },
    { key: 'youtube', name: 'YouTube', color: '#FF0000', icon: '▶', url: activeConfig.youtube },
    { key: 'tiktok', name: 'TikTok', color: '#000000', icon: '🎵', url: activeConfig.tiktok },
    { key: 'telegram', name: 'Telegram', color: '#229ED9', icon: '✈', url: activeConfig.telegram },
    { key: 'threads', name: 'Threads', color: '#000000', icon: '@', url: activeConfig.threads },
    { key: 'snapchat', name: 'Snapchat', color: '#FFFC00', icon: '👻', url: activeConfig.snapchat },
    { key: 'medium', name: 'Medium', color: '#000000', icon: 'M', url: activeConfig.medium },
    { key: 'github', name: 'GitHub', color: '#24292e', icon: '🐙', url: activeConfig.github },
    { key: 'google', name: 'Google Business', color: '#4285F4', icon: 'G', url: activeConfig.google },
    { key: 'upwork', name: 'Upwork', color: '#14A800', icon: 'Up', url: activeConfig.upwork },
    { key: 'fiverr', name: 'Fiverr', color: '#1DBF73', icon: 'fi', url: activeConfig.fiverr },
    { key: 'freelancer', name: 'Freelancer', color: '#29B2FE', icon: 'fl', url: activeConfig.freelancer },
    { key: 'pph', name: 'PeoplePerHour', color: '#FF5722', icon: 'P', url: activeConfig.pph },
    { key: 'clutch', name: 'Clutch', color: '#1B365D', icon: 'C', url: activeConfig.clutch },
    { key: 'trustpilot', name: 'Trustpilot', color: '#00B67A', icon: '★', url: activeConfig.trustpilot },
    { key: 'pinterest', name: 'Pinterest', color: '#BD081C', icon: 'P', url: activeConfig.pinterest },
  ];

  const visiblePlatforms = hideEmpty
    ? platforms.filter(p => !!p.url)
    : platforms;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5">
      {visiblePlatforms.map(p => {
        const hasUrl = !!p.url;
        return (
          <a
            key={p.key}
            href={hasUrl ? p.url : '#'}
            target={hasUrl ? '_blank' : undefined}
            rel={hasUrl ? 'noopener noreferrer' : undefined}
            className={`flex items-center gap-3 p-3 rounded-xl border border-[#2a2a38] bg-[#14141d] transition-all duration-200 group ${
              hasUrl
                ? 'hover:border-[#e8c872] hover:bg-[#1a1a26] hover:-translate-y-0.5 cursor-pointer shadow-sm'
                : 'opacity-40 cursor-not-allowed'
            }`}
            title={hasUrl ? `Visit Ghazi Wazir on ${p.name}` : `${p.name} (CONFIGURATION REQUIRED)`}
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold font-mono text-white shadow-sm flex-none"
              style={{ backgroundColor: p.color }}
            >
              {p.icon}
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-xs font-semibold text-[#f5f1e8] truncate group-hover:text-[#e8c872] transition-colors">
                {p.name}
              </div>
              <div className="text-[10px] text-[#a8a7b3] truncate">
                {hasUrl ? 'Verified Link' : 'Configuration Req.'}
              </div>
            </div>
            {hasUrl && <ExternalLink className="w-3.5 h-3.5 text-[#a8a7b3] group-hover:text-[#e8c872] flex-none" />}
          </a>
        );
      })}
    </div>
  );
}
