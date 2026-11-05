import React, { useState, useEffect, useRef } from 'react';
import {
  Share2,
  Sparkles,
  Zap,
  Send,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  Copy,
  Trash2,
  RefreshCw,
  Globe,
  Sliders,
  Eye,
  FileText,
  Layers,
  TrendingUp,
  ExternalLink,
  ChevronRight,
  Bot,
  Hash,
  Image as ImageIcon,
  Download,
  Palette,
  Maximize2,
  Plus,
  Check,
  Video,
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Smartphone,
  Film,
  Type,
  FileCode,
  Sparkle,
  Award,
  ShieldCheck,
  Layout,
  SlidersHorizontal,
  Flame,
  ArrowRight,
  Tv,
  Wand2,
  Activity,
  Camera,
  Layers2,
  Contrast,
  Sun,
  Music
} from 'lucide-react';
import { api } from '../services/api';
import {
  MEDIA_PRESETS,
  MediaPreset,
  playMotionSoundFX,
  ParticleSimulation
} from '../services/motionStudio';
import { speakStudioText } from '../utils/speechVoiceEngine';
import {
  ContentStudioResponse,
  ContentPostItem,
  SocialPlatform,
  BrandTheme,
  GraphicAspectRatio,
  GraphicDesignConfig,
  GraphicTemplate,
  ShortsScene,
  ShortsStoryboard,
  GeneratedImageItem,
  FreeVideoClip
} from '../types';

interface ContentStudioProps {
  onNotify?: (message: string, type: 'success' | 'error' | 'info') => void;
  standalone?: boolean;
}

// 14 Supported Platforms Configuration (Facebook, X, LinkedIn, Meta, etc.)
export const ALL_PLATFORM_CONFIG: Record<
  SocialPlatform,
  {
    name: string;
    icon: string;
    color: string;
    badgeColor: string;
    limit: number;
    category: 'Executive & B2B' | 'Social & Visual' | 'Video & Streaming' | 'Knowledge & Search';
    guidance: string;
  }
> = {
  facebook: {
    name: 'Facebook',
    icon: '📘',
    color: '#1877f2',
    badgeColor: 'bg-[#1877f2]/15 text-[#60a5fa] border-[#1877f2]/40',
    limit: 10000,
    category: 'Social & Visual',
    guidance: 'Long-form Facebook post for Pages & Communities with emotional hook, bulleted takeaways, relatable entrepreneur storytelling, and link CTA.'
  },
  x: {
    name: 'X (formerly Twitter)',
    icon: '𝕏',
    color: '#ffffff',
    badgeColor: 'bg-white/10 text-[#f8fafc] border-white/30',
    limit: 280,
    category: 'Social & Visual',
    guidance: 'High-engagement viral contrarian hook on line 1, followed by a 4-part value thread (🧵 1/4, 2/4...) and conversion CTA.'
  },
  linkedin: {
    name: 'LinkedIn',
    icon: '💼',
    color: '#0a66c2',
    badgeColor: 'bg-[#0a66c2]/15 text-[#38bdf8] border-[#0a66c2]/40',
    limit: 3000,
    category: 'Executive & B2B',
    guidance: 'High-authority B2B thought leadership with line breaks, bulleted statutory/growth points, and 3-5 tags.'
  },
  meta: {
    name: 'Meta Ads & Groups',
    icon: '👥',
    color: '#1877f2',
    badgeColor: 'bg-[#1877f2]/15 text-[#60a5fa] border-[#1877f2]/40',
    limit: 5000,
    category: 'Executive & B2B',
    guidance: 'High-converting storytelling format for Facebook Pages & Groups with value checklist and link CTA.'
  },
  twitter: {
    name: 'Twitter (Legacy)',
    icon: '🐦',
    color: '#1da1f2',
    badgeColor: 'bg-[#1da1f2]/15 text-[#38bdf8] border-[#1da1f2]/40',
    limit: 280,
    category: 'Social & Visual',
    guidance: 'Ultra-punchy 280-char hook, bold contrast statement, funnel link, and 2 tags.'
  },
  instagram: {
    name: 'Instagram & Threads',
    icon: '📸',
    color: '#e1306c',
    badgeColor: 'bg-[#e1306c]/15 text-[#f43f5e] border-[#e1306c]/40',
    limit: 2200,
    category: 'Social & Visual',
    guidance: 'Engaging caption with opening hook, carousel slide breakdown hints [Slide 1-4], and 8-12 tags.'
  },
  youtube: {
    name: 'YouTube Long & Shorts',
    icon: '▶️',
    color: '#ff0000',
    badgeColor: 'bg-[#ff0000]/15 text-[#f87171] border-[#ff0000]/40',
    limit: 5000,
    category: 'Video & Streaming',
    guidance: 'Video Title, Description with chapter timestamps (00:00, 02:15), tags, and funnel link.'
  },
  tiktok: {
    name: 'TikTok & Reels',
    icon: '🎵',
    color: '#00f2fe',
    badgeColor: 'bg-[#00f2fe]/15 text-[#38bdf8] border-[#00f2fe]/40',
    limit: 2200,
    category: 'Video & Streaming',
    guidance: 'Timed vertical video script: [Hook 0-3s], [Problem 3-15s], [Solution 15-30s], [CTA 30-45s].'
  },
  snapchat: {
    name: 'Snapchat Spotlight',
    icon: '👻',
    color: '#fffc00',
    badgeColor: 'bg-[#fffc00]/15 text-[#fef08a] border-[#fffc00]/40',
    limit: 1000,
    category: 'Video & Streaming',
    guidance: 'Vertical Spotlight / Story fast hook, 10s value punch, and [Swipe Up CTA] card.'
  },
  quora: {
    name: 'Quora Authority Q&A',
    icon: '💡',
    color: '#b92b27',
    badgeColor: 'bg-[#b92b27]/15 text-[#f87171] border-[#b92b27]/40',
    limit: 4000,
    category: 'Knowledge & Search',
    guidance: 'Authoritative Q&A answer by Ghazi Wazir with statutory facts, numbered insights, and reference links.'
  },
  dailymotion: {
    name: 'Dailymotion Video',
    icon: '🎬',
    color: '#0066dc',
    badgeColor: 'bg-[#0066dc]/15 text-[#60a5fa] border-[#0066dc]/40',
    limit: 3000,
    category: 'Video & Streaming',
    guidance: 'Video title, synopsis, chapters, and keywords optimized for European & global syndication.'
  },
  wikipedia: {
    name: 'Wikipedia Reference',
    icon: '🌐',
    color: '#8b5cf6',
    badgeColor: 'bg-[#8b5cf6]/15 text-[#c084fc] border-[#8b5cf6]/40',
    limit: 4000,
    category: 'Knowledge & Search',
    guidance: 'Neutral point of view summary formatted in Wikitext (== Sections ==, bulleted milestones, <ref> citations).'
  },
  google_business: {
    name: 'Google Business Profile',
    icon: '📍',
    color: '#34a853',
    badgeColor: 'bg-[#34a853]/15 text-[#4ade80] border-[#34a853]/40',
    limit: 1500,
    category: 'Knowledge & Search',
    guidance: 'Local update for Manama, Bahrain office or USA branch with Map Pack keywords and Book Appointment CTA.'
  },
  blog: {
    name: 'GEO / AEO Blog Guides',
    icon: '📝',
    color: '#eab308',
    badgeColor: 'bg-[#eab308]/15 text-[#facc15] border-[#eab308]/40',
    limit: 8000,
    category: 'Knowledge & Search',
    guidance: 'Executive Markdown guide with H2/H3 headers structured for Perplexity & Gemini citations.'
  }
};

const SUGGESTED_TOPICS = [
  '100% Foreign Ownership in Bahrain: Sijilat Commercial Registration (CR)',
  'Generative Engine Optimization (GEO) vs Traditional SEO in 2026',
  'Bahrain Investor Visa & 10-Year Golden Residency Rules',
  'Autonomous AI Sales Agents in 3 Languages (Urdu, Arabic, English)',
  'Zero Corporate Tax on Bahrain SME Activities & MOIC Clearances',
  'Cross-Border Corporate Structuring: Bahrain W.L.L. vs US Wyoming LLC'
];

const CURATED_HASHTAG_BANKS = {
  'Bahrain & GCC Business': [
    '#BahrainBusiness',
    '#BabAlKhaleej',
    '#SijilatCR',
    '#GoldenVisaBahrain',
    '#ManamaBusiness',
    '#BahrainExpats',
    '#GCCInvestors',
    '#BahrainTaxFree',
    '#ForeignOwnership',
    '#BahrainSMEs'
  ],
  'AI & Autonomous Tech': [
    '#AIAgents',
    '#AutonomousAI',
    '#GenerativeEngineOptimization',
    '#GEO',
    '#AEO',
    '#BackForBrand',
    '#AIAutomation',
    '#PerplexityCitation',
    '#ConversationalAI',
    '#LLMSearch'
  ],
  'Executive Leadership': [
    '#GhaziWazir',
    '#CEOLeadership',
    '#B2BGrowth',
    '#InternationalExpansion',
    '#DirectResponse',
    '#ScaleUp',
    '#ExecutiveStrategy',
    '#TwoCompaniesOneStandard'
  ],
  'High-Converting Funnels': [
    '#SalesFunnels',
    '#RussellBrunson',
    '#VSLMarketing',
    '#LeadGeneration',
    '#ConversionOptimization',
    '#DirectMarketing',
    '#OmniFunnel'
  ],
  'Video & Virality': [
    '#Shorts',
    '#TikTokBusiness',
    '#YouTubeMarketing',
    '#SnapchatSpotlight',
    '#DailymotionCreator',
    '#ReelsGrowth'
  ]
};

const DEFAULT_STORYBOARD: ShortsStoryboard = {
  title: '100% Foreign Ownership in Bahrain (35s Viral Short)',
  totalDurationSec: 35,
  targetPlatform: 'YouTube Shorts',
  soundtrackMood: 'Energetic Executive Synthwave / B2B Pulse',
  bRollSuggestions: [
    'Manama skyline with Bahrain World Trade Center dusk time-lapse',
    'Electronic Sijilat portal on modern laptop screen with green checkmarks',
    'Passport and CR Commercial Registration certificate close-up',
    'Ghazi Wazir speaking to international founders in executive conference room',
    'Smartphone screen tapping direct WhatsApp link'
  ],
  scenes: [
    {
      id: 'scene-1',
      title: '1. The Contrarian Hook',
      timing: '0:00 - 0:03',
      durationSec: 3,
      voiceover: 'Stop giving away 51% of your company to a silent local sponsor in the Gulf!',
      visualCue: 'Fast push-in zoom on Ghazi Wazir with red warning sticker and dynamic shake',
      captionHighlight: 'STOP GIVING 51%!'
    },
    {
      id: 'scene-2',
      title: '2. The Costly Trap',
      timing: '0:03 - 0:10',
      durationSec: 7,
      voiceover: 'Most international founders spend months waiting on ministry approvals and pay thousands to local middlemen.',
      visualCue: 'Montage of slow bureaucratic rubber stamps and clock spinning with red tint',
      captionHighlight: 'MONTHS OF DELAYS'
    },
    {
      id: 'scene-3',
      title: '3. The Statutory Reality',
      timing: '0:10 - 0:20',
      durationSec: 10,
      voiceover: 'Here is the truth: under Bahrain Commercial Law, foreign nationals can legally own 100% of their corporate registration with 0% tax.',
      visualCue: 'Screen transitions to green glow with 100% Foreign Ownership badge and electronic Sijilat portal',
      captionHighlight: '100% FOREIGN OWNERSHIP'
    },
    {
      id: 'scene-4',
      title: '4. The Rapid Mechanism',
      timing: '0:20 - 0:28',
      durationSec: 8,
      voiceover: 'At Bab Al-Khaleej, our advisory team gets your commercial registration and investor visas pre-cleared in under 5 business days.',
      visualCue: 'Verified CR certificate reveal with Manama office backdrop',
      captionHighlight: '5 BUSINESS DAYS'
    },
    {
      id: 'scene-5',
      title: '5. The High-Converting CTA',
      timing: '0:28 - 0:35',
      durationSec: 7,
      voiceover: 'Tap the link in bio right now to download our free 7-step blueprint or book a private executive scoping session!',
      visualCue: 'Arrow pointing down to profile link and URL overlay: ghaziwazir.com',
      captionHighlight: 'TAP LINK IN BIO'
    }
  ],
  voiceoverFull: 'Stop giving away 51% of your company to a silent local sponsor in the Gulf! Most international founders spend months waiting on ministry approvals and pay thousands to local middlemen. Here is the truth: under Bahrain Commercial Law, foreign nationals can legally own 100% of their corporate registration with 0% tax. At Bab Al-Khaleej, our advisory team gets your commercial registration and investor visas pre-cleared in under 5 business days. Tap the link in bio right now to download our free 7-step blueprint or book a private executive scoping session!'
};

export function ContentStudio({ onNotify, standalone = false }: ContentStudioProps) {
  const [data, setData] = useState<ContentStudioResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState<'create' | 'shorts' | 'graphics' | 'hashtags' | 'queue'>('create');

  // Generator State
  const [topic, setTopic] = useState('');
  const [entity, setEntity] = useState<'Bab Al-Khaleej' | 'Back for Brand LLC' | 'Both'>('Bab Al-Khaleej');
  const [language, setLanguage] = useState<'en' | 'ar' | 'ur'>('en');
  const [tone, setTone] = useState('Executive Authority & High Conversion');
  const [funnelTarget, setFunnelTarget] = useState('/formation');
  const [generating, setGenerating] = useState(false);

  // Multi-Platform Preview Editor State
  const [selectedPreviewPlatform, setSelectedPreviewPlatform] = useState<SocialPlatform>('facebook');
  const [generatedDrafts, setGeneratedDrafts] = useState<Record<SocialPlatform, string>>({
    facebook: '',
    x: '',
    linkedin: '',
    meta: '',
    twitter: '',
    instagram: '',
    youtube: '',
    tiktok: '',
    snapchat: '',
    quora: '',
    dailymotion: '',
    wikipedia: '',
    google_business: '',
    blog: ''
  });

  const [selectedPlatforms, setSelectedPlatforms] = useState<SocialPlatform[]>([
    'facebook',
    'x',
    'linkedin',
    'meta',
    'twitter',
    'instagram',
    'youtube',
    'tiktok',
    'snapchat',
    'quora',
    'dailymotion',
    'wikipedia',
    'google_business',
    'blog'
  ]);
  const [savingPost, setSavingPost] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Hashtag Engine State
  const [selectedHashtags, setSelectedHashtags] = useState<string[]>([
    '#BahrainBusiness',
    '#BabAlKhaleej',
    '#GhaziWazir',
    '#GEO',
    '#AEO',
    '#AIAgents'
  ]);
  const [customTagInput, setCustomTagInput] = useState('');

  // Brand Graphic & Image Studio State (Upgraded with photographic backdrops, blur & color grading)
  const [graphicConfig, setGraphicConfig] = useState<GraphicDesignConfig>({
    headline: '100% FOREIGN OWNERSHIP IN BAHRAIN',
    subheadline: 'Official Sijilat Commercial Registration Blueprint | Zero Ministry Delays',
    badge: 'OFFICIAL 2026 GUIDE',
    ctaText: 'DOWNLOAD BLUEPRINT',
    theme: 'gold_luxury',
    aspectRatio: '1:1',
    template: 'executive_spotlight',
    showPhoto: true,
    showWatermark: true,
    backgroundStyle: 'photo',
    authorTag: 'Ghazi Wazir | CEO & Founder',
    stickerText: '100% FOREIGN OWNERSHIP',
    backgroundImage: '/src/assets/images/bahrain_harbour_shorts_1793617591962.jpg',
    backgroundBlur: 0,
    backgroundOverlay: 0.55,
    colorGrading: 'gold_monolith',
    showLetterbox: false
  });
  const [aiImagePrompt, setAiImagePrompt] = useState('');

  // AI Shorts Video Studio State (Upgraded 9:16 simulator & After Effects motion engine)
  const [storyboard, setStoryboard] = useState<ShortsStoryboard>(DEFAULT_STORYBOARD);
  const [activeSceneIndex, setActiveSceneIndex] = useState<number>(0);
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const [videoPlaybackSec, setVideoPlaybackSec] = useState(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [showTeleprompter, setShowTeleprompter] = useState(false);
  const [teleprompterSpeed, setTeleprompterSpeed] = useState(1);
  const [teleprompterFontSize, setTeleprompterFontSize] = useState<'text-xl' | 'text-3xl' | 'text-5xl'>('text-3xl');

  // After Effects Motion Graphics & Video Backdrop Settings
  const [videoPresetId, setVideoPresetId] = useState<string>('bahrain_harbour');
  const [customBackdropUrl, setCustomBackdropUrl] = useState<string>('');
  const [videoOverlayOpacity, setVideoOverlayOpacity] = useState<number>(0.45);
  const [videoBackdropBlur, setVideoBackdropBlur] = useState<number>(0);
  const [videoColorGrading, setVideoColorGrading] = useState<'natural' | 'gold_monolith' | 'cyber_matrix' | 'high_contrast' | 'noir'>('gold_monolith');
  const [captionStyle, setCaptionStyle] = useState<'hormozi_bold' | 'cyber_neon' | 'beast_yellow' | 'executive_minimal'>('hormozi_bold');
  const [motionIntensity, setMotionIntensity] = useState<'cinematic_push' | 'dynamic_shake' | 'glitch_pulse' | 'smooth_drift'>('cinematic_push');
  const [showCinematicLetterbox, setShowCinematicLetterbox] = useState<boolean>(true);
  const [soundFXEnabled, setSoundFXEnabled] = useState<boolean>(true);
  const [particleEngineEnabled, setParticleEngineEnabled] = useState<boolean>(true);
  const [waveformVisualizerEnabled, setWaveformVisualizerEnabled] = useState<boolean>(true);
  const [chromaticGlitchEnabled, setChromaticGlitchEnabled] = useState<boolean>(true);
  const [sceneTransitionFlash, setSceneTransitionFlash] = useState<boolean>(false);

  // Queue Filters
  const [queueFilterPlatform, setQueueFilterPlatform] = useState<string>('all');
  const [queueFilterStatus, setQueueFilterStatus] = useState<string>('all');

  const svgCanvasRef = useRef<SVGSVGElement | null>(null);
  const teleprompterScrollRef = useRef<HTMLDivElement | null>(null);
  const particleCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const particleSimRef = useRef<ParticleSimulation | null>(null);

  // Free AI Image Generation API State
  const [generatingAiImage, setGeneratingAiImage] = useState(false);
  const [aiImageStyle, setAiImageStyle] = useState<'executive_luxury' | 'cyber_matrix' | 'bahrain_corporate' | 'studio_minimal'>('executive_luxury');
  const [aiImageAspect, setAiImageAspect] = useState<'1:1' | '16:9' | '9:16' | '4:5'>('1:1');
  const [aiImageEngine, setAiImageEngine] = useState<'pollinations' | 'gemini-nano-banana-2.1' | 'gemini-3.1-flash-lite-image'>('pollinations');
  const [lastGeneratedImage, setLastGeneratedImage] = useState<GeneratedImageItem | null>(null);
  const [generatedImagesHistory, setGeneratedImagesHistory] = useState<GeneratedImageItem[]>([]);
  const [showImageHistoryDrawer, setShowImageHistoryDrawer] = useState(false);

  // Free Video Clips API State
  const [freeVideos, setFreeVideos] = useState<FreeVideoClip[]>([]);
  const [videoCategoryFilter, setVideoCategoryFilter] = useState<string>('All');
  const [loadingFreeVideos, setLoadingFreeVideos] = useState(false);
  const [showFreeVideosDrawer, setShowFreeVideosDrawer] = useState(false);

  const loadFreeVideos = async () => {
    setLoadingFreeVideos(true);
    try {
      const res = await api.getFreeVideos();
      if (res.videos && res.videos.length > 0) {
        setFreeVideos(res.videos);
      }
    } catch {
      // fallback handled gracefully
    } finally {
      setLoadingFreeVideos(false);
    }
  };

  const loadGeneratedImages = async () => {
    try {
      const res = await api.getGeneratedImages();
      if (res.images && res.images.length > 0) {
        setGeneratedImagesHistory(res.images);
        if (!lastGeneratedImage) {
          setLastGeneratedImage(res.images[0]);
        }
      }
    } catch {}
  };

  const handleGenerateFreeImage = async (customPrompt?: string) => {
    const targetPrompt = customPrompt || aiImagePrompt || topic || 'Bahrain Commercial Registration & AI Growth';
    setGeneratingAiImage(true);
    if (onNotify) {
      onNotify('Calling Free AI Image Generation API (Pollinations FLUX / Gemini)...', 'info');
    }
    try {
      playMotionSoundFX('whoosh');
      const res = await api.generateImage({
        prompt: targetPrompt,
        style: aiImageStyle,
        aspectRatio: aiImageAspect,
        entity: entity === 'Both' ? 'Executive Hub' : entity,
        engine: aiImageEngine
      });

      if (res.success && res.image) {
        setLastGeneratedImage(res.image);
        setGeneratedImagesHistory(prev => [res.image, ...prev.filter(x => x.id !== res.image.id)].slice(0, 40));
        // Auto apply to post graphic
        setGraphicConfig(prev => ({
          ...prev,
          backgroundImage: res.image.url,
          backgroundStyle: 'photo',
          aspectRatio: (aiImageAspect === '16:9' ? '16:9' : aiImageAspect === '9:16' ? '9:16' : aiImageAspect === '4:5' ? '4:5' : '1:1') as any
        }));
        playMotionSoundFX('shimmer');
        if (onNotify) {
          const engineLabel = res.image.engine.includes('banana') || res.image.engine.includes('gemini')
            ? `Google ${res.image.engine}`
            : '100% Free FLUX Engine';
          onNotify(`✨ Visual generated via ${engineLabel}! ${res.image.note ? `• ${res.image.note}` : ''}`, 'success');
        }
      }
    } catch (err: any) {
      if (onNotify) {
        onNotify(err.message || 'Image generation failed. Please try again.', 'error');
      }
    } finally {
      setGeneratingAiImage(false);
    }
  };

  const handleApplyImageToGraphic = (url: string) => {
    setGraphicConfig(prev => ({
      ...prev,
      backgroundImage: url,
      backgroundStyle: 'photo'
    }));
    playMotionSoundFX('click');
    if (onNotify) {
      onNotify('Visual applied as Post Graphic background!', 'success');
    }
  };

  const handleApplyImageToVideo = (url: string) => {
    setCustomBackdropUrl(url);
    setVideoPresetId('custom');
    setStoryboard(prev => ({
      ...prev,
      customBackgroundUrl: url,
      videoPreset: 'custom',
      scenes: prev.scenes.map((s, idx) => idx === activeSceneIndex ? { ...s, backgroundImage: url } : s)
    }));
    playMotionSoundFX('click');
    if (onNotify) {
      onNotify(`Visual applied to Scene ${activeSceneIndex + 1} video backdrop!`, 'success');
    }
  };

  const handleSelectFreeVideo = (clip: { id: string; title?: string; videoUrl?: string; name?: string; fallbackPoster?: string; url?: string }) => {
    setVideoPresetId(clip.id);
    const videoUrl = clip.videoUrl || clip.url || '';
    setCustomBackdropUrl(videoUrl);
    setStoryboard(prev => ({
      ...prev,
      customBackgroundUrl: videoUrl,
      videoPreset: 'custom'
    }));
    playMotionSoundFX('whoosh');
    if (onNotify) {
      onNotify(`Free HD video background loaded: ${clip.title || clip.name}`, 'success');
    }
  };

  const fetchStudioData = async (manual = false) => {
    if (manual) setRefreshing(true);
    try {
      const res = await api.getContentStudio();
      setData(res);
      if (manual && onNotify) {
        onNotify('Content Studio queue & metrics refreshed.', 'success');
      }
    } catch (err: any) {
      if (onNotify) {
        onNotify(err.message || 'Failed to load content studio data.', 'error');
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchStudioData();
    loadFreeVideos();
    loadGeneratedImages();
  }, []);

  // Update AI image prompt dynamically when topic or brand changes
  useEffect(() => {
    const currentTopic = topic.trim() || 'Bahrain Corporate Formation & AI Growth';
    if (graphicConfig.theme === 'gold_luxury') {
      setAiImagePrompt(
        `Executive luxury graphic poster for Bab Al-Khaleej (Manama, Bahrain). Subject: "${currentTopic}". Palette: deep obsidian black (#090d16) and regal metallic gold (#d4af37, #e8c872). Minimalist architectural silhouette of Bahrain World Trade Center, sleek serif typography, subtle Arabic gold calligraphy accents, 8k resolution, cinematic studio rim lighting, ultra-high-end corporate elegance, aspect ratio ${graphicConfig.aspectRatio}.`
      );
    } else if (graphicConfig.theme === 'cyber_azure') {
      setAiImagePrompt(
        `Futuristic enterprise technology graphic for Back for Brand LLC (USA). Subject: "${currentTopic}". Palette: deep cyber slate (#090d16, #131d33) with electric azure neon (#38bdf8, #818cf8) and neural network synaptic grid lines. Clean geometric layout, glowing data nodes, minimalist modern sans-serif typography, high-tech B2B executive aesthetic, 8k render, aspect ratio ${graphicConfig.aspectRatio}.`
      );
    } else {
      setAiImagePrompt(
        `Sovereign executive crest graphic for Ghazi Wazir (CEO of Bab Al-Khaleej & Back for Brand LLC). Subject: "${currentTopic}". Palette: dual fusion of imperial gold (#d4af37) and electric cyan-azure (#38bdf8) over obsidian velvet. Executive monogram watermark GW, verified leadership seal, 8k studio lighting, aspect ratio ${graphicConfig.aspectRatio}.`
      );
    }
  }, [topic, graphicConfig.theme, graphicConfig.aspectRatio, graphicConfig.template]);

  // Animated Shorts Video Playback Timer
  useEffect(() => {
    let interval: any = null;
    if (isPlayingVideo) {
      interval = setInterval(() => {
        setVideoPlaybackSec(prev => {
          const next = prev + 1;
          if (next >= storyboard.totalDurationSec) {
            setIsPlayingVideo(false);
            return 0;
          }

          // Compute active scene based on accumulated timing
          let runningTime = 0;
          for (let i = 0; i < storyboard.scenes.length; i++) {
            runningTime += storyboard.scenes[i].durationSec;
            if (next <= runningTime) {
              setActiveSceneIndex(i);
              break;
            }
          }
          return next;
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isPlayingVideo, storyboard]);

  // Teleprompter Auto-Scroll Effect
  useEffect(() => {
    let scrollTimer: any = null;
    if (showTeleprompter && teleprompterScrollRef.current) {
      scrollTimer = setInterval(() => {
        if (teleprompterScrollRef.current) {
          teleprompterScrollRef.current.scrollTop += 1.5 * teleprompterSpeed;
        }
      }, 30);
    }
    return () => clearInterval(scrollTimer);
  }, [showTeleprompter, teleprompterSpeed]);

  // Particle Simulation Engine (Trapcode Particular effect)
  useEffect(() => {
    if (activeTab === 'shorts' && particleCanvasRef.current && particleEngineEnabled) {
      if (!particleSimRef.current) {
        particleSimRef.current = new ParticleSimulation(particleCanvasRef.current);
      }
      particleSimRef.current.resize(310, 580);
      particleSimRef.current.start();
    } else if (particleSimRef.current) {
      particleSimRef.current.stop();
    }
    return () => {
      if (particleSimRef.current) {
        particleSimRef.current.stop();
      }
    };
  }, [particleEngineEnabled, activeTab]);

  // Scene Transition VFX & Sound FX Trigger
  useEffect(() => {
    if (soundFXEnabled && isPlayingVideo) {
      if (activeSceneIndex === 0) {
        playMotionSoundFX('impact');
      } else {
        playMotionSoundFX('whoosh');
      }
    }
    setSceneTransitionFlash(true);
    const timer = setTimeout(() => setSceneTransitionFlash(false), 240);
    return () => clearTimeout(timer);
  }, [activeSceneIndex, soundFXEnabled, isPlayingVideo]);

  const handleGenerateAutopilot = async (customTopic?: string) => {
    const promptTopic = (customTopic || topic).trim();
    if (!promptTopic) {
      if (onNotify) onNotify('Please enter a topic or select one of the suggested campaigns.', 'error');
      return;
    }

    if (customTopic) setTopic(customTopic);
    setGenerating(true);

    try {
      const res = await api.generateContentAutopilot({
        topic: promptTopic,
        entity,
        language,
        funnelSlug: funnelTarget,
        tone
      });

      if (res.success && res.content) {
        setGeneratedDrafts({
          facebook: res.content.facebook || res.content.meta || '',
          x: res.content.x || res.content.twitter || '',
          linkedin: res.content.linkedin || '',
          meta: res.content.meta || '',
          twitter: res.content.twitter || '',
          instagram: res.content.instagram || '',
          youtube: res.content.youtube || '',
          tiktok: res.content.tiktok || '',
          snapchat: res.content.snapchat || '',
          quora: res.content.quora || '',
          dailymotion: res.content.dailymotion || '',
          wikipedia: res.content.wikipedia || '',
          google_business: res.content.google_business || '',
          blog: res.content.blog || ''
        });

        if (res.hashtags && Array.isArray(res.hashtags)) {
          setSelectedHashtags(res.hashtags);
        }

        if (res.graphicPrompt) {
          setAiImagePrompt(res.graphicPrompt);
        }

        if (res.storyboard) {
          setStoryboard(res.storyboard);
        } else {
          // Re-generate local customized storyboard
          setStoryboard({
            ...DEFAULT_STORYBOARD,
            title: `${promptTopic} (35s Viral Short)`,
            scenes: [
              {
                id: 'scene-1',
                title: '1. The Contrarian Hook',
                timing: '0:00 - 0:03',
                durationSec: 3,
                voiceover: `Stop making this costly mistake with ${promptTopic.slice(0, 40)}!`,
                visualCue: 'Fast push-in zoom on Ghazi Wazir with high-impact alert text',
                captionHighlight: 'STOP THIS MISTAKE!'
              },
              {
                id: 'scene-2',
                title: '2. The Hidden Cost',
                timing: '0:03 - 0:10',
                durationSec: 7,
                voiceover: `Most operators waste weeks and thousands in unnecessary ministry fees without realizing there is a streamlined path.`,
                visualCue: 'Montage of ministry paperwork and red rubber stamp delay graphics',
                captionHighlight: 'UNNECESSARY FEES'
              },
              {
                id: 'scene-3',
                title: '3. The Statutory Secret',
                timing: '0:10 - 0:20',
                durationSec: 10,
                voiceover: `Under official commercial regulations, you can own 100% of your legal entity with 0% corporate tax and direct banking pre-clearance.`,
                visualCue: 'Green glow transition with verified corporate seal and electronic certificate',
                captionHighlight: '100% OWNERSHIP • 0% TAX'
              },
              {
                id: 'scene-4',
                title: '4. The Proven Speed',
                timing: '0:20 - 0:28',
                durationSec: 8,
                voiceover: `At ${entity}, our senior team handles your complete formation in business days, not months.`,
                visualCue: 'Verified commercial registration and Manama skyline office reveal',
                captionHighlight: 'DONE IN DAYS'
              },
              {
                id: 'scene-5',
                title: '5. The Action Call',
                timing: '0:28 - 0:35',
                durationSec: 7,
                voiceover: `Tap the link in bio right now to download our free 2026 blueprint or schedule a direct consultation!`,
                visualCue: 'Animated arrow pointing down to link with website URL: ghaziwazir.com',
                captionHighlight: 'TAP LINK IN BIO'
              }
            ]
          });
        }

        // Update graphic canvas headline automatically
        setGraphicConfig(prev => ({
          ...prev,
          headline: promptTopic.toUpperCase().slice(0, 50),
          subheadline: `Official ${entity === 'Both' ? 'Executive' : entity} Blueprint | Zero Delays`
        }));

        if (onNotify) {
          onNotify(`AI Autopilot generated copy, brand graphic & video storyboard (${res.mode})!`, 'success');
        }
      }
    } catch (err: any) {
      if (onNotify) onNotify(err.message || 'AI Generation failed.', 'error');
    } finally {
      setGenerating(false);
    }
  };

  const handleSaveToQueue = async (status: 'DRAFT' | 'SCHEDULED' | 'PUBLISHED') => {
    if (!topic.trim()) {
      if (onNotify) onNotify('Please provide a campaign topic.', 'error');
      return;
    }

    setSavingPost(true);
    try {
      const res = await api.createContentPost({
        topic,
        entity: entity === 'Both' ? 'Executive Hub' : entity,
        platforms: selectedPlatforms,
        content: generatedDrafts,
        status,
        funnelTarget,
        scheduledFor: Date.now() + 86400000
      });

      if (res.success) {
        if (onNotify) {
          onNotify(
            status === 'PUBLISHED'
              ? 'Post dispatched across all selected platforms!'
              : `Post successfully saved as ${status} in Autopilot queue.`,
            'success'
          );
        }
        await fetchStudioData();
        setActiveTab('queue');
      }
    } catch (err: any) {
      if (onNotify) onNotify(err.message || 'Failed to save post.', 'error');
    } finally {
      setSavingPost(false);
    }
  };

  const handlePublishNow = async (id: string) => {
    try {
      const res = await api.publishContentPost(id);
      if (res.success) {
        if (onNotify) onNotify(res.message, 'success');
        await fetchStudioData();
      }
    } catch (err: any) {
      if (onNotify) onNotify(err.message || 'Failed to publish post.', 'error');
    }
  };

  const handleDeletePost = async (id: string) => {
    try {
      const res = await api.deleteContentPost(id);
      if (res.success) {
        if (onNotify) onNotify('Post removed from queue.', 'info');
        await fetchStudioData();
      }
    } catch (err: any) {
      if (onNotify) onNotify(err.message || 'Failed to delete post.', 'error');
    }
  };

  const handleToggleAutopilot = async (enabled: boolean) => {
    try {
      const res = await api.toggleContentAutopilot({ enabled });
      if (res.success) {
        if (onNotify) {
          onNotify(
            enabled ? 'Autopilot 24/7 activated! Syndicating automatically.' : 'Autopilot paused.',
            enabled ? 'success' : 'info'
          );
        }
        await fetchStudioData();
      }
    } catch (err: any) {
      if (onNotify) onNotify(err.message || 'Failed to update autopilot.', 'error');
    }
  };

  const handleCopy = (text: string, key: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
    if (onNotify) onNotify(`Copied to clipboard!`, 'success');
  };

  const togglePlatform = (p: SocialPlatform) => {
    setSelectedPlatforms(prev =>
      prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p]
    );
  };

  // Hashtag Operations
  const toggleHashtag = (tag: string) => {
    setSelectedHashtags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const addCustomTag = () => {
    if (!customTagInput.trim()) return;
    let formatted = customTagInput.trim();
    if (!formatted.startsWith('#')) formatted = '#' + formatted;
    formatted = formatted.replace(/\s+/g, '');
    if (!selectedHashtags.includes(formatted)) {
      setSelectedHashtags(prev => [...prev, formatted]);
    }
    setCustomTagInput('');
  };

  const insertTagsIntoCurrentDraft = () => {
    const tagsString = '\n\n' + selectedHashtags.join(' ');
    setGeneratedDrafts(prev => ({
      ...prev,
      [selectedPreviewPlatform]: (prev[selectedPreviewPlatform] || '') + tagsString
    }));
    if (onNotify) onNotify(`Appended ${selectedHashtags.length} hashtags to ${ALL_PLATFORM_CONFIG[selectedPreviewPlatform].name}!`, 'success');
  };

  // Graphic Download Handlers
  const downloadSVG = () => {
    if (!svgCanvasRef.current) return;
    const svgData = new XMLSerializer().serializeToString(svgCanvasRef.current);
    const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `brand-graphic-${graphicConfig.template}-${graphicConfig.aspectRatio.replace(':', 'x')}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    if (onNotify) onNotify('Downloaded Vector SVG graphic file!', 'success');
  };

  const downloadPNG = () => {
    if (!svgCanvasRef.current) return;
    const svgData = new XMLSerializer().serializeToString(svgCanvasRef.current);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = 1080;
    let h = 1080;
    if (graphicConfig.aspectRatio === '9:16') {
      w = 1080;
      h = 1920;
    } else if (graphicConfig.aspectRatio === '16:9') {
      w = 1920;
      h = 1080;
    } else if (graphicConfig.aspectRatio === '1.91:1') {
      w = 1200;
      h = 628;
    }

    canvas.width = w * 2; // 2x Retina resolution
    canvas.height = h * 2;
    ctx.scale(2, 2);

    const renderSvgOnTop = () => {
      const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(svgBlob);
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0, w, h);
        const pngUrl = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = pngUrl;
        link.download = `brand-graphic-${graphicConfig.template}-${w}x${h}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        if (onNotify) onNotify('Downloaded Ultra High-Res PNG with Photographic Background!', 'success');
      };
      img.src = url;
    };

    if (graphicConfig.backgroundImage && graphicConfig.backgroundImage !== 'canvas_loop') {
      const bgImg = new Image();
      bgImg.crossOrigin = 'anonymous';
      bgImg.onload = () => {
        ctx.drawImage(bgImg, 0, 0, w, h);
        ctx.fillStyle = `rgba(9, 13, 22, ${graphicConfig.backgroundOverlay ?? 0.55})`;
        ctx.fillRect(0, 0, w, h);
        renderSvgOnTop();
      };
      bgImg.onerror = () => {
        renderSvgOnTop();
      };
      bgImg.src = graphicConfig.backgroundImage;
    } else {
      renderSvgOnTop();
    }
  };

  const cancelVoiceoverRef = useRef<(() => void) | null>(null);

  // Shorts Audio Voiceover Handlers (Web Speech API via Studio Voice Engine)
  const playAudioVoiceover = (textToSpeak?: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      if (onNotify) onNotify('Speech synthesis is not supported in this browser.', 'error');
      return;
    }
    if (cancelVoiceoverRef.current) cancelVoiceoverRef.current();
    window.speechSynthesis.cancel();

    const text = textToSpeak || storyboard.voiceoverFull;
    setIsPlayingAudio(true);

    const cancel = speakStudioText(text, {
      gender: 'male',
      langCode: 'en-US',
      pitch: 0.92,
      rate: 1.02,
      onStart: () => setIsPlayingAudio(true),
      onEnd: () => setIsPlayingAudio(false),
      onError: () => setIsPlayingAudio(false),
    });

    cancelVoiceoverRef.current = cancel;
    if (onNotify) onNotify('Playing studio-calibrated executive voiceover preview...', 'info');
  };

  const stopAudioVoiceover = () => {
    if (cancelVoiceoverRef.current) {
      cancelVoiceoverRef.current();
      cancelVoiceoverRef.current = null;
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlayingAudio(false);
  };

  // SRT Subtitle Generator & Download
  const downloadSRT = () => {
    let srtContent = '';
    storyboard.scenes.forEach((scene, index) => {
      const startSec = storyboard.scenes.slice(0, index).reduce((acc, s) => acc + s.durationSec, 0);
      const endSec = startSec + scene.durationSec;
      const formatTime = (sec: number) => {
        const m = Math.floor(sec / 60).toString().padStart(2, '0');
        const s = Math.floor(sec % 60).toString().padStart(2, '0');
        return `00:${m}:${s},000`;
      };
      srtContent += `${index + 1}\n${formatTime(startSec)} --> ${formatTime(endSec)}\n${scene.voiceover}\n\n`;
    });

    const blob = new Blob([srtContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `shorts-subtitles-${(topic || 'video').slice(0, 20).replace(/\s+/g, '_')}.srt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    if (onNotify) onNotify('Downloaded .SRT subtitle file for CapCut / Premiere Pro!', 'success');
  };

  if (loading && !data) {
    return (
      <div className="p-12 text-center space-y-3">
        <RefreshCw className="w-8 h-8 animate-spin mx-auto text-[#38bdf8]" />
        <p className="text-sm text-[#94a3b8]">Loading All-Platform Content Studio, AI Shorts Simulator & Graphic Engine...</p>
      </div>
    );
  }

  const { stats, autopilot } = data || {
    stats: { totalPosts: 0, publishedCount: 0, scheduledCount: 0, draftCount: 0, totalImpressions: 0, totalClicks: 0, totalLeads: 0 },
    autopilot: { enabled: true, frequency: 'daily', autoPublish: true, targetEntities: [], languages: [], platforms: [] }
  };

  // Dimensions math for SVG preview
  let canvasWidth = 1080;
  let canvasHeight = 1080;
  if (graphicConfig.aspectRatio === '9:16') {
    canvasWidth = 1080;
    canvasHeight = 1920;
  } else if (graphicConfig.aspectRatio === '16:9') {
    canvasWidth = 1920;
    canvasHeight = 1080;
  } else if (graphicConfig.aspectRatio === '1.91:1') {
    canvasWidth = 1200;
    canvasHeight = 628;
  }

  const currentScene = storyboard.scenes[activeSceneIndex] || storyboard.scenes[0];

  return (
    <div className="space-y-8">
      {/* Top Header Banner */}
      <div className="p-6 bg-gradient-to-r from-[#131d33] via-[#0f172a] to-[#131d33] border border-[#1e2d4d] rounded-2xl shadow-xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-[#38bdf8]/15 text-[#38bdf8] border border-[#38bdf8]/30 shadow-[0_0_15px_rgba(56,189,248,0.2)]">
              <Share2 className="w-5 h-5" />
            </span>
            <h2 className="text-2xl font-black font-heading text-[#f8fafc]">
              All-Platform Content Studio & AI Autopilot
            </h2>
          </div>
          <p className="text-xs text-[#94a3b8] max-w-3xl leading-relaxed">
            Multi-network content generation, verified hashtag optimization, <strong>interactive AI Shorts video generation</strong> with kinetic captions, and <strong>brand-guided visual graphics</strong> across Facebook, X, LinkedIn, Meta, YouTube, TikTok, and all major channels.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Autopilot Switch */}
          <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#090d16] border border-[#1e2d4d]">
            <span className={`w-2.5 h-2.5 rounded-full ${autopilot.enabled ? 'bg-[#22c55e] animate-pulse' : 'bg-[#64748b]'}`} />
            <span className="text-xs font-bold text-[#f8fafc]">
              Autopilot 24/7:
            </span>
            <button
              type="button"
              onClick={() => handleToggleAutopilot(!autopilot.enabled)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-black uppercase transition-all ${
                autopilot.enabled
                  ? 'bg-[#22c55e] text-[#090d16]'
                  : 'bg-[#1e2d4d] text-[#94a3b8] hover:text-[#f8fafc]'
              }`}
            >
              {autopilot.enabled ? 'ACTIVE' : 'PAUSED'}
            </button>
          </div>

          <button
            onClick={() => fetchStudioData(true)}
            disabled={refreshing}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#1e2d4d] hover:bg-[#2a3f6d] text-xs font-semibold text-[#f8fafc] border border-[#38bdf8]/20 transition-all disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin text-[#38bdf8]' : ''}`} />
            <span>{refreshing ? 'Syncing...' : 'Sync Queue'}</span>
          </button>
        </div>
      </div>

      {/* KPI Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        <div className="p-4 bg-[#131d33] border border-[#1e2d4d] rounded-xl space-y-1">
          <span className="text-[11px] font-semibold text-[#94a3b8] uppercase tracking-wider block">Total Posts</span>
          <div className="text-2xl font-black text-[#f8fafc]">{stats.totalPosts}</div>
          <span className="text-[10px] text-[#38bdf8]">Facebook, X & All</span>
        </div>

        <div className="p-4 bg-[#131d33] border border-[#1e2d4d] rounded-xl space-y-1">
          <span className="text-[11px] font-semibold text-[#94a3b8] uppercase tracking-wider block">Live Published</span>
          <div className="text-2xl font-black text-[#22c55e]">{stats.publishedCount}</div>
          <span className="text-[10px] text-[#94a3b8]">Verified Syndicated</span>
        </div>

        <div className="p-4 bg-[#131d33] border border-[#1e2d4d] rounded-xl space-y-1">
          <span className="text-[11px] font-semibold text-[#94a3b8] uppercase tracking-wider block">Scheduled / Queue</span>
          <div className="text-2xl font-black text-[#38bdf8]">{stats.scheduledCount}</div>
          <span className="text-[10px] text-[#94a3b8]">Cadence: {autopilot.frequency}</span>
        </div>

        <div className="p-4 bg-[#131d33] border border-[#1e2d4d] rounded-xl space-y-1">
          <span className="text-[11px] font-semibold text-[#94a3b8] uppercase tracking-wider block">Total Reach / Imp</span>
          <div className="text-2xl font-black text-[#f8fafc]">{stats.totalImpressions.toLocaleString()}</div>
          <span className="text-[10px] text-[#22c55e]">Organic & Syndicated</span>
        </div>

        <div className="p-4 bg-[#131d33] border border-[#1e2d4d] rounded-xl space-y-1">
          <span className="text-[11px] font-semibold text-[#94a3b8] uppercase tracking-wider block">Inbound Clicks</span>
          <div className="text-2xl font-black text-[#a855f7]">{stats.totalClicks.toLocaleString()}</div>
          <span className="text-[10px] text-[#94a3b8]">Funnel Traffic</span>
        </div>

        <div className="p-4 bg-[#131d33] border border-[#1e2d4d] rounded-xl space-y-1">
          <span className="text-[11px] font-semibold text-[#94a3b8] uppercase tracking-wider block">Attributed Leads</span>
          <div className="text-2xl font-black text-[#eab308]">{stats.totalLeads.toLocaleString()}</div>
          <span className="text-[10px] text-[#22c55e]">Social Inquiries</span>
        </div>
      </div>

      {/* Main Studio Navigation Tabs */}
      <div className="flex border-b border-[#1e2d4d] gap-2 overflow-x-auto no-scrollbar">
        <button
          onClick={() => setActiveTab('create')}
          className={`flex items-center gap-2 px-5 py-3 border-b-2 font-heading font-bold text-xs uppercase tracking-wider whitespace-nowrap transition-all ${
            activeTab === 'create'
              ? 'border-[#38bdf8] text-[#38bdf8] bg-[#131d33]/40'
              : 'border-transparent text-[#94a3b8] hover:text-[#f8fafc]'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Facebook, X & Multi-Platform Copy</span>
        </button>

        <button
          onClick={() => setActiveTab('shorts')}
          className={`flex items-center gap-2 px-5 py-3 border-b-2 font-heading font-bold text-xs uppercase tracking-wider whitespace-nowrap transition-all ${
            activeTab === 'shorts'
              ? 'border-[#00f2fe] text-[#00f2fe] bg-[#131d33]/40'
              : 'border-transparent text-[#94a3b8] hover:text-[#f8fafc]'
          }`}
        >
          <Film className="w-4 h-4 text-[#00f2fe]" />
          <span>AI Shorts & Reels Video Studio</span>
          <span className="px-1.5 py-0.5 rounded text-[9px] font-black uppercase bg-[#00f2fe]/20 text-[#00f2fe] border border-[#00f2fe]/40">
            9:16 Kinetic
          </span>
        </button>

        <button
          onClick={() => setActiveTab('graphics')}
          className={`flex items-center gap-2 px-5 py-3 border-b-2 font-heading font-bold text-xs uppercase tracking-wider whitespace-nowrap transition-all ${
            activeTab === 'graphics'
              ? 'border-[#38bdf8] text-[#38bdf8] bg-[#131d33]/40'
              : 'border-transparent text-[#94a3b8] hover:text-[#f8fafc]'
          }`}
        >
          <ImageIcon className="w-4 h-4" />
          <span>Brand Graphic & Image Studio</span>
          <span className="px-1.5 py-0.5 rounded text-[9px] font-black uppercase bg-[#d4af37]/20 text-[#e8c872] border border-[#d4af37]/40">
            Brand Guidelines
          </span>
        </button>

        <button
          onClick={() => setActiveTab('hashtags')}
          className={`flex items-center gap-2 px-5 py-3 border-b-2 font-heading font-bold text-xs uppercase tracking-wider whitespace-nowrap transition-all ${
            activeTab === 'hashtags'
              ? 'border-[#38bdf8] text-[#38bdf8] bg-[#131d33]/40'
              : 'border-transparent text-[#94a3b8] hover:text-[#f8fafc]'
          }`}
        >
          <Hash className="w-4 h-4" />
          <span>Hashtags & Keyword Suite ({selectedHashtags.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('queue')}
          className={`flex items-center gap-2 px-5 py-3 border-b-2 font-heading font-bold text-xs uppercase tracking-wider whitespace-nowrap transition-all ${
            activeTab === 'queue'
              ? 'border-[#38bdf8] text-[#38bdf8] bg-[#131d33]/40'
              : 'border-transparent text-[#94a3b8] hover:text-[#f8fafc]'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Scheduled Queue & Published ({data?.posts.length || 0})</span>
        </button>
      </div>

      {/* TAB 1: Facebook, X & Multi-Platform Copy */}
      {activeTab === 'create' && (
        <div className="space-y-8">
          {/* Generator Inputs Form */}
          <div className="p-6 bg-[#131d33] border border-[#1e2d4d] rounded-2xl shadow-xl space-y-5">
            <div className="flex items-center justify-between border-b border-[#1e2d4d] pb-3">
              <div className="flex items-center gap-2">
                <Bot className="w-4 h-4 text-[#38bdf8]" />
                <h3 className="font-heading font-bold text-sm text-[#f8fafc]">
                  Multi-Network Campaign Setup & Generator
                </h3>
              </div>
              <span className="text-[11px] text-[#38bdf8] font-mono">
                Model: Gemini 3.8 Flash • Facebook, X, LinkedIn & All Channels
              </span>
            </div>

            {/* Topic Input */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-[#f8fafc] block">
                Campaign Subject / Authority Topic:
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={topic}
                  onChange={e => setTopic(e.target.value)}
                  placeholder="e.g. 100% Foreign Ownership in Bahrain: Sijilat Commercial Registration (CR)..."
                  className="flex-1 px-4 py-2.5 rounded-xl bg-[#090d16] border border-[#1e2d4d] text-xs sm:text-sm text-[#f8fafc] placeholder-[#64748b] focus:border-[#38bdf8] focus:outline-none"
                />
              </div>

              {/* Suggested Topics Pills */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="text-[11px] text-[#94a3b8] mr-1">Recommended:</span>
                {SUGGESTED_TOPICS.map((sTopic, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setTopic(sTopic);
                      handleGenerateAutopilot(sTopic);
                    }}
                    className="px-2.5 py-1 rounded-lg text-[11px] bg-[#090d16] hover:bg-[#1e2d4d] text-[#38bdf8] border border-[#1e2d4d] transition-colors"
                  >
                    {sTopic.slice(0, 38)}...
                  </button>
                ))}
              </div>
            </div>

            {/* Campaign Options Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
              {/* Entity Picker */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#f8fafc] block">
                  Operating Brand Entity
                </label>
                <select
                  value={entity}
                  onChange={e => setEntity(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl bg-[#090d16] border border-[#1e2d4d] text-xs text-[#f8fafc] focus:border-[#38bdf8] focus:outline-none"
                >
                  <option value="Bab Al-Khaleej">Bab Al-Khaleej (Bahrain CR & Visas)</option>
                  <option value="Back for Brand LLC">Back for Brand LLC (GEO, AEO, AI)</option>
                  <option value="Both">Both (Executive Dual Brand Ecosystem)</option>
                </select>
              </div>

              {/* Target Funnel */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#f8fafc] block">
                  Target Funnel Link
                </label>
                <select
                  value={funnelTarget}
                  onChange={e => setFunnelTarget(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#090d16] border border-[#1e2d4d] text-xs text-[#f8fafc] focus:border-[#38bdf8] focus:outline-none"
                >
                  <option value="/formation">/formation — Bahrain CR Blueprint</option>
                  <option value="/funnels/business-registration">/funnels/business-registration — Sijilat CR VSL</option>
                  <option value="/funnels/investor-visa">/funnels/investor-visa — Investor Visa VSL</option>
                  <option value="/funnels/geo-aeo">/funnels/geo-aeo — GEO & AEO VSL</option>
                  <option value="/funnels/ai-agents">/funnels/ai-agents — AI Sales Agents VSL</option>
                  <option value="/book">/book — CEO Strategy Session</option>
                </select>
              </div>

              {/* Tone & Language */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#f8fafc] block">
                  Tone & Language
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <select
                    value={language}
                    onChange={e => setLanguage(e.target.value as any)}
                    className="w-full px-2.5 py-2 rounded-xl bg-[#090d16] border border-[#1e2d4d] text-xs text-[#f8fafc] focus:border-[#38bdf8] focus:outline-none"
                  >
                    <option value="en">English (B2B)</option>
                    <option value="ar">العربية (Gulf)</option>
                    <option value="ur">اردو (Formal)</option>
                  </select>

                  <select
                    value={tone}
                    onChange={e => setTone(e.target.value)}
                    className="w-full px-2.5 py-2 rounded-xl bg-[#090d16] border border-[#1e2d4d] text-xs text-[#f8fafc] focus:border-[#38bdf8] focus:outline-none"
                  >
                    <option value="Executive Authority & High Conversion">Executive Authority</option>
                    <option value="Direct Response & Call to Action">Direct Response</option>
                    <option value="Educational & Statutory Breakdown">Statutory Guide</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Generate Action Button */}
            <div className="pt-2 flex items-center justify-end">
              <button
                type="button"
                onClick={() => handleGenerateAutopilot()}
                disabled={generating}
                className="w-full sm:w-auto px-7 py-3 rounded-xl bg-[#38bdf8] hover:bg-[#0ea5e9] text-[#090d16] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(56,189,248,0.3)] transition-all hover:scale-[1.02] disabled:opacity-50"
              >
                {generating ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Synthesizing Facebook, X & All Platforms...</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 fill-current" />
                    <span>Generate for Facebook, X & All Platforms Now</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Platforms Workspace Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column: Platform Selector */}
            <div className="lg:col-span-4 space-y-3">
              <div className="flex items-center justify-between px-1">
                <span className="text-[11px] font-semibold text-[#94a3b8] uppercase tracking-wider">
                  Active Channels ({selectedPlatforms.length}/14):
                </span>
                <button
                  type="button"
                  onClick={() =>
                    setSelectedPlatforms(
                      selectedPlatforms.length === Object.keys(ALL_PLATFORM_CONFIG).length
                        ? ['facebook', 'x', 'linkedin']
                        : (Object.keys(ALL_PLATFORM_CONFIG) as SocialPlatform[])
                    )
                  }
                  className="text-[10px] text-[#38bdf8] hover:underline font-semibold"
                >
                  {selectedPlatforms.length === Object.keys(ALL_PLATFORM_CONFIG).length ? 'Deselect Extra' : 'Select All'}
                </button>
              </div>

              {/* Scrollable Platforms List */}
              <div className="space-y-1.5 max-h-[600px] overflow-y-auto pr-1">
                {(Object.keys(ALL_PLATFORM_CONFIG) as SocialPlatform[]).map(pKey => {
                  const cfg = ALL_PLATFORM_CONFIG[pKey];
                  const hasContent = !!generatedDrafts[pKey]?.trim();
                  const isSelected = selectedPreviewPlatform === pKey;
                  const isTargeted = selectedPlatforms.includes(pKey);

                  return (
                    <div
                      key={pKey}
                      onClick={() => setSelectedPreviewPlatform(pKey)}
                      className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                        isSelected
                          ? 'bg-[#1e2d4d] border-[#38bdf8] shadow-md'
                          : 'bg-[#131d33] border-[#1e2d4d] hover:border-[#38bdf8]/40'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-lg">{cfg.icon}</span>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-bold text-[#f8fafc]">{cfg.name}</span>
                            {hasContent && (
                              <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e]" />
                            )}
                          </div>
                          <span className="text-[10px] text-[#94a3b8]">
                            {cfg.category} • Max {cfg.limit}c
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2" onClick={e => e.stopPropagation()}>
                        <label className="flex items-center gap-1 text-[10px] text-[#94a3b8] cursor-pointer">
                          <input
                            type="checkbox"
                            checked={isTargeted}
                            onChange={() => togglePlatform(pKey)}
                            className="rounded border-[#1e2d4d] text-[#38bdf8] focus:ring-0"
                          />
                          <span>Post</span>
                        </label>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Dispatch Action Box */}
              <div className="p-4 bg-[#131d33] border border-[#1e2d4d] rounded-2xl space-y-3">
                <span className="text-xs font-bold text-[#f8fafc] block">
                  Autopilot Dispatch Actions
                </span>
                <p className="text-[11px] text-[#94a3b8] leading-relaxed">
                  Post immediately or schedule across the {selectedPlatforms.length} selected networks.
                </p>

                <div className="space-y-2">
                  <button
                    type="button"
                    onClick={() => handleSaveToQueue('PUBLISHED')}
                    disabled={savingPost}
                    className="w-full py-2.5 rounded-xl bg-[#22c55e] hover:bg-[#16a34a] text-[#090d16] font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Publish to All Platforms Now</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSaveToQueue('SCHEDULED')}
                    disabled={savingPost}
                    className="w-full py-2.5 rounded-xl bg-[#1e2d4d] hover:bg-[#2a3f6d] text-[#38bdf8] font-bold text-xs border border-[#38bdf8]/30 flex items-center justify-center gap-2 transition-all"
                  >
                    <Clock className="w-3.5 h-3.5" />
                    <span>Schedule into Autopilot Queue</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSaveToQueue('DRAFT')}
                    disabled={savingPost}
                    className="w-full py-2 rounded-xl bg-[#090d16] text-[#94a3b8] hover:text-[#f8fafc] font-semibold text-xs border border-[#1e2d4d] flex items-center justify-center gap-1.5 transition-all"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Save Draft</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: Live Platform Preview & Editor */}
            <div className="lg:col-span-8 space-y-4">
              <div className="p-6 bg-[#131d33] border border-[#1e2d4d] rounded-2xl shadow-xl space-y-4">
                <div className="flex items-center justify-between border-b border-[#1e2d4d] pb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl">{ALL_PLATFORM_CONFIG[selectedPreviewPlatform].icon}</span>
                    <div>
                      <h4 className="font-heading font-bold text-sm text-[#f8fafc]">
                        {ALL_PLATFORM_CONFIG[selectedPreviewPlatform].name} Native Format
                      </h4>
                      <span className="text-[10px] text-[#94a3b8]">
                        Length: {generatedDrafts[selectedPreviewPlatform]?.length || 0} / {ALL_PLATFORM_CONFIG[selectedPreviewPlatform].limit} characters
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleCopy(generatedDrafts[selectedPreviewPlatform], selectedPreviewPlatform)}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#090d16] hover:bg-[#1e2d4d] text-xs font-semibold text-[#f8fafc] border border-[#1e2d4d] transition-all"
                    >
                      <Copy className="w-3.5 h-3.5 text-[#38bdf8]" />
                      <span>{copiedKey === selectedPreviewPlatform ? 'Copied!' : 'Copy Formatted'}</span>
                    </button>
                  </div>
                </div>

                {/* Editable Textarea */}
                <div className="space-y-2">
                  <textarea
                    rows={12}
                    value={generatedDrafts[selectedPreviewPlatform]}
                    onChange={e => setGeneratedDrafts(prev => ({ ...prev, [selectedPreviewPlatform]: e.target.value }))}
                    placeholder={`Click 'Generate for Facebook, X & All Platforms' above, or type custom copy for ${ALL_PLATFORM_CONFIG[selectedPreviewPlatform].name}...`}
                    className="w-full p-4 rounded-xl bg-[#090d16] border border-[#1e2d4d] text-xs sm:text-sm text-[#f8fafc] placeholder-[#64748b] leading-relaxed font-sans focus:border-[#38bdf8] focus:outline-none"
                  />
                </div>

                {/* Quick Hashtags Strip */}
                <div className="p-3 bg-[#090d16] rounded-xl border border-[#1e2d4d] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-[#94a3b8] flex items-center gap-1">
                      <Hash className="w-3 h-3 text-[#38bdf8]" />
                      <span>Quick-Insert Hashtags:</span>
                    </span>
                    <button
                      type="button"
                      onClick={insertTagsIntoCurrentDraft}
                      className="text-[11px] font-bold text-[#38bdf8] hover:underline"
                    >
                      + Insert All Selected Tags ({selectedHashtags.length})
                    </button>
                  </div>

                  <div className="flex flex-wrap items-center gap-1.5">
                    {selectedHashtags.map((tag, idx) => (
                      <span
                        key={idx}
                        onClick={() => {
                          setGeneratedDrafts(prev => ({
                            ...prev,
                            [selectedPreviewPlatform]: (prev[selectedPreviewPlatform] || '') + ' ' + tag
                          }));
                        }}
                        className="px-2 py-0.5 rounded text-[10px] bg-[#131d33] hover:bg-[#1e2d4d] text-[#38bdf8] border border-[#1e2d4d] cursor-pointer transition-colors"
                        title="Click to insert into post"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Free Media Quick Actions */}
                <div className="p-3 bg-gradient-to-r from-[#1e2d4d]/60 via-[#131d33] to-[#1e2d4d]/60 rounded-xl border border-[#38bdf8]/30 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#38bdf8]" />
                    <span className="text-xs font-bold text-[#f8fafc]">
                      Free AI Media for {ALL_PLATFORM_CONFIG[selectedPreviewPlatform].name}:
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setActiveTab('graphics');
                        handleGenerateFreeImage();
                      }}
                      className="px-3 py-1.5 rounded-lg bg-[#38bdf8] text-[#090d16] text-xs font-bold flex items-center gap-1.5 hover:bg-[#0ea5e9] transition-all"
                    >
                      <ImageIcon className="w-3.5 h-3.5" />
                      <span>Generate Free AI Image</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab('shorts')}
                      className="px-3 py-1.5 rounded-lg bg-[#00f2fe]/20 text-[#00f2fe] border border-[#00f2fe]/40 text-xs font-bold flex items-center gap-1.5 hover:bg-[#00f2fe]/30 transition-all"
                    >
                      <Film className="w-3.5 h-3.5" />
                      <span>Select Free HD Video Clip</span>
                    </button>
                  </div>
                </div>

                {/* Platform Specific Guidance Note */}
                <div className="p-3 bg-[#090d16] rounded-xl border border-[#1e2d4d] text-[11px] text-[#94a3b8] flex flex-wrap items-center justify-between gap-2">
                  <span>
                    <strong>Guideline:</strong> {ALL_PLATFORM_CONFIG[selectedPreviewPlatform].guidance}
                  </span>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setActiveTab('shorts')}
                      className="text-[11px] text-[#00f2fe] hover:underline font-semibold flex items-center gap-1 whitespace-nowrap"
                    >
                      <Film className="w-3 h-3" />
                      <span>Open in Shorts Studio &rarr;</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab('graphics')}
                      className="text-[11px] text-[#e8c872] hover:underline font-semibold flex items-center gap-1 whitespace-nowrap"
                    >
                      <ImageIcon className="w-3 h-3" />
                      <span>Open in Graphic Studio &rarr;</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: AI Shorts & Reels Video Studio (9:16 Interactive Simulator) */}
      {activeTab === 'shorts' && (
        <div className="space-y-8">
          <div className="p-6 bg-[#131d33] border border-[#1e2d4d] rounded-2xl shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#1e2d4d] pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <Film className="w-5 h-5 text-[#00f2fe]" />
                  <h3 className="font-heading font-bold text-base text-[#f8fafc]">
                    AI Shorts & Reels Video Studio (9:16 Kinetic Simulator)
                  </h3>
                </div>
                <p className="text-xs text-[#94a3b8]">
                  Generate viral 30–45s vertical video storyboards with kinetic subtitles, audio voiceover preview, and teleprompter recording.
                </p>
              </div>

              {/* Action Controls */}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={downloadSRT}
                  className="px-3.5 py-2 rounded-xl bg-[#00f2fe] hover:bg-[#00c8d6] text-[#090d16] text-xs font-bold flex items-center gap-1.5 shadow-md transition-all"
                >
                  <FileCode className="w-3.5 h-3.5" />
                  <span>Download .SRT Subtitles</span>
                </button>

                <button
                  type="button"
                  onClick={() => setShowTeleprompter(true)}
                  className="px-3.5 py-2 rounded-xl bg-[#1e2d4d] hover:bg-[#2a3f6d] text-xs font-semibold text-[#f8fafc] border border-[#00f2fe]/40 flex items-center gap-1.5 transition-all"
                >
                  <Tv className="w-3.5 h-3.5 text-[#00f2fe]" />
                  <span>Open Teleprompter Mode</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleCopy(JSON.stringify(storyboard, null, 2), 'storyboard')}
                  className="px-3.5 py-2 rounded-xl bg-[#090d16] hover:bg-[#1e2d4d] text-xs font-semibold text-[#f8fafc] border border-[#1e2d4d] flex items-center gap-1.5 transition-all"
                >
                  <Copy className="w-3.5 h-3.5 text-[#38bdf8]" />
                  <span>{copiedKey === 'storyboard' ? 'Copied Storyboard!' : 'Copy for CapCut'}</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: 9:16 Interactive Smartphone Simulator */}
              <div className="lg:col-span-5 flex flex-col items-center justify-center space-y-4">
                <div className="relative w-[280px] sm:w-[310px] h-[580px] bg-[#050811] rounded-[44px] border-[5px] border-[#1e2d4d] shadow-[0_0_40px_rgba(0,242,254,0.15)] overflow-hidden flex flex-col justify-between p-4 select-none">
                  {/* Dynamic Island / Notch */}
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-4 bg-black rounded-full z-30" />

                  {/* Real MP4 Video Loop & AI Image Backdrop Layer (Free Video API) */}
                  {(() => {
                    const activePreset = MEDIA_PRESETS.find(p => p.id === videoPresetId) || MEDIA_PRESETS[0];
                    const backdropUrl = customBackdropUrl || currentScene.backgroundImage || activePreset.videoUrl || activePreset.url;
                    const isVideo = backdropUrl && (backdropUrl.endsWith('.mp4') || backdropUrl.includes('.mp4') || backdropUrl.includes('mixkit'));
                    const isImg = !isVideo && backdropUrl && backdropUrl !== 'canvas_loop';

                    const gradingFilter =
                      videoColorGrading === 'gold_monolith'
                        ? 'sepia(0.35) saturate(1.3) contrast(1.1)'
                        : videoColorGrading === 'cyber_matrix'
                        ? 'hue-rotate(180deg) saturate(1.4) contrast(1.15)'
                        : videoColorGrading === 'high_contrast'
                        ? 'contrast(1.4) brightness(0.95)'
                        : videoColorGrading === 'noir'
                        ? 'grayscale(1) contrast(1.3)'
                        : 'none';

                    return (
                      <>
                        {isVideo && (
                          <video
                            key={backdropUrl}
                            src={backdropUrl}
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none transition-all duration-700"
                            style={{
                              opacity: 1 - videoOverlayOpacity,
                              filter: `blur(${videoBackdropBlur}px) ${gradingFilter}`
                            }}
                          />
                        )}

                        {isImg && (
                          <img
                            src={backdropUrl}
                            alt="Scene Backdrop"
                            className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none transition-all duration-700"
                            style={{
                              opacity: 1 - videoOverlayOpacity,
                              filter: `blur(${videoBackdropBlur}px) ${gradingFilter}`
                            }}
                          />
                        )}

                        {/* Particle Simulation Canvas Overlay (60fps Particles) */}
                        <canvas
                          ref={particleCanvasRef}
                          className="absolute inset-0 w-full h-full pointer-events-none z-10 transition-opacity duration-300"
                          style={{ opacity: particleEngineEnabled ? 0.9 : 0 }}
                        />

                        {/* Dark Vignette Overlay for Ultra-Crisp Kinetic Captions */}
                        <div
                          className="absolute inset-0 pointer-events-none z-10 bg-gradient-to-t from-[#050811] via-[#050811]/40 to-[#050811]/75"
                          style={{ opacity: videoOverlayOpacity + 0.15 }}
                        />
                      </>
                    );
                  })()}

                  {/* Top Progress Bar */}
                  <div className="relative z-20 pt-4 px-2">
                    <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#00f2fe] transition-all duration-300"
                        style={{
                          width: `${(videoPlaybackSec / storyboard.totalDurationSec) * 100}%`
                        }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-white/70 font-mono mt-1">
                      <span>{videoPlaybackSec}s</span>
                      <span>{storyboard.totalDurationSec}s</span>
                    </div>
                  </div>

                  {/* Scene Visual Backdrop & Kinetic Text */}
                  <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center p-3">
                    {/* Scene Badge */}
                    <div className="mb-4">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-black/60 text-[#00f2fe] border border-[#00f2fe]/40 backdrop-blur-md">
                        {currentScene.title}
                      </span>
                    </div>

                    {/* Kinetic Animated Captions (Alex Hormozi Style) */}
                    <div className="space-y-3 px-2">
                      <div className="text-xl sm:text-2xl font-black font-heading uppercase text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] leading-tight">
                        {currentScene.voiceover}
                      </div>

                      {/* Animated Highlight Banner */}
                      <div className="inline-block px-3 py-1.5 rounded-lg bg-[#eab308] text-[#090d16] font-black text-sm uppercase tracking-wide shadow-lg transform -rotate-1 animate-pulse">
                        🔥 {currentScene.captionHighlight}
                      </div>
                    </div>

                    {/* Visual Cue Pill */}
                    <div className="mt-6 px-3 py-1.5 rounded-xl bg-black/60 border border-white/10 backdrop-blur-md text-[11px] text-[#94a3b8] max-w-[240px]">
                      🎥 <em>{currentScene.visualCue}</em>
                    </div>
                  </div>

                  {/* Bottom Interactive TikTok/Reels UI Overlay */}
                  <div className="relative z-20 flex items-end justify-between pt-2 border-t border-white/10">
                    <div className="space-y-1 text-left max-w-[190px]">
                      <div className="flex items-center gap-1.5">
                        <span className="w-5 h-5 rounded-full bg-[#38bdf8] text-[#090d16] text-[10px] font-bold flex items-center justify-center">
                          GW
                        </span>
                        <span className="text-xs font-bold text-white">@ghaziwazir</span>
                        <CheckCircle2 className="w-3 h-3 text-[#38bdf8]" />
                      </div>
                      <p className="text-[10px] text-white/80 line-clamp-2">
                        {topic || 'Bahrain Corporate Formation & AI Growth Blueprint'} #BahrainBusiness #Shorts
                      </p>
                      <div className="text-[9px] text-[#00f2fe] flex items-center gap-1">
                        <span>🎵</span>
                        <span className="truncate">{storyboard.soundtrackMood}</span>
                      </div>
                    </div>

                    {/* Right Social Actions */}
                    <div className="flex flex-col items-center gap-3 text-white">
                      <div className="flex flex-col items-center">
                        <span className="text-base">❤️</span>
                        <span className="text-[9px] font-bold">48.2k</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="text-base">💬</span>
                        <span className="text-[9px] font-bold">1,840</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="text-base">🔖</span>
                        <span className="text-[9px] font-bold">9,410</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Player Controls Bar */}
                <div className="flex items-center gap-3 bg-[#090d16] p-2.5 rounded-2xl border border-[#1e2d4d]">
                  <button
                    type="button"
                    onClick={() => setIsPlayingVideo(!isPlayingVideo)}
                    className="p-2.5 rounded-xl bg-[#00f2fe] text-[#090d16] font-bold hover:bg-[#00c8d6] transition-all"
                    title={isPlayingVideo ? 'Pause Video' : 'Play Video'}
                  >
                    {isPlayingVideo ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setIsPlayingVideo(false);
                      setVideoPlaybackSec(0);
                      setActiveSceneIndex(0);
                    }}
                    className="p-2.5 rounded-xl bg-[#1e2d4d] text-[#f8fafc] hover:bg-[#2a3f6d] transition-all"
                    title="Restart Video"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      if (isPlayingAudio) stopAudioVoiceover();
                      else playAudioVoiceover();
                    }}
                    className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                      isPlayingAudio
                        ? 'bg-[#22c55e] text-[#090d16]'
                        : 'bg-[#1e2d4d] text-[#38bdf8] hover:bg-[#2a3f6d]'
                    }`}
                  >
                    {isPlayingAudio ? (
                      <>
                        <VolumeX className="w-4 h-4" />
                        <span>Stop Voice</span>
                      </>
                    ) : (
                      <>
                        <Volume2 className="w-4 h-4" />
                        <span>Play Voiceover (TTS)</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Free Video Clips API Selector */}
                <div className="w-full max-w-[310px] p-3.5 bg-[#0d1527] border border-[#1e2d4d] rounded-2xl space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-[#00f2fe] uppercase tracking-wider flex items-center gap-1.5">
                      <Film className="w-3.5 h-3.5" />
                      Free HD Video Clips API
                    </span>
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#00f2fe]/20 text-[#00f2fe] font-mono">
                      No Watermark
                    </span>
                  </div>

                  <p className="text-[10px] text-[#94a3b8] leading-tight">
                    Select a free high-resolution background video loop for your 9:16 Shorts & Reels:
                  </p>

                  <div className="grid grid-cols-2 gap-1.5 max-h-[160px] overflow-y-auto pr-1 no-scrollbar">
                    {MEDIA_PRESETS.filter(p => p.type === 'video_clip').map(clip => (
                      <button
                        key={clip.id}
                        type="button"
                        onClick={() => handleSelectFreeVideo(clip)}
                        className={`p-2 rounded-xl text-left border transition-all ${
                          videoPresetId === clip.id
                            ? 'bg-[#1e2d4d] border-[#00f2fe] text-[#00f2fe] shadow-[0_0_12px_rgba(0,242,254,0.2)]'
                            : 'bg-[#090d16] border-[#1e2d4d] text-[#94a3b8] hover:text-[#f8fafc]'
                        }`}
                      >
                        <span className="text-[10px] font-bold block truncate">{clip.shortName}</span>
                        <span className="text-[8px] text-[#64748b] block">{clip.tag}</span>
                      </button>
                    ))}
                  </div>

                  <div className="pt-2 border-t border-[#1e2d4d]">
                    <button
                      type="button"
                      onClick={() => handleGenerateFreeImage(`Visual for ${currentScene.title}: ${currentScene.visualCue}`)}
                      disabled={generatingAiImage}
                      className="w-full py-2 px-2.5 rounded-xl bg-gradient-to-r from-[#00f2fe]/20 to-[#38bdf8]/20 hover:from-[#00f2fe]/30 hover:to-[#38bdf8]/30 border border-[#00f2fe]/40 text-[#00f2fe] text-[10px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all disabled:opacity-50"
                    >
                      <Sparkles className={`w-3.5 h-3.5 ${generatingAiImage ? 'animate-spin' : ''}`} />
                      <span>{generatingAiImage ? 'Generating AI Visual...' : '✨ Generate AI Scene Visual'}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Column: Scene-by-Scene Storyboard & Director's Breakdown */}
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#f8fafc] flex items-center gap-1.5">
                    <SlidersHorizontal className="w-4 h-4 text-[#00f2fe]" />
                    <span>Scene Breakdown & Director's Script ({storyboard.scenes.length} Scenes)</span>
                  </span>
                  <span className="text-[11px] text-[#94a3b8] font-mono">
                    Total Duration: {storyboard.totalDurationSec}s • 155 WPM
                  </span>
                </div>

                {/* Scene Stepper Tabs */}
                <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
                  {storyboard.scenes.map((s, idx) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => {
                        setActiveSceneIndex(idx);
                        // Compute timing offset
                        const start = storyboard.scenes.slice(0, idx).reduce((acc, curr) => acc + curr.durationSec, 0);
                        setVideoPlaybackSec(start);
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                        activeSceneIndex === idx
                          ? 'bg-[#00f2fe]/20 text-[#00f2fe] border-[#00f2fe]'
                          : 'bg-[#090d16] text-[#94a3b8] border-[#1e2d4d] hover:text-[#f8fafc]'
                      }`}
                    >
                      {s.title} ({s.durationSec}s)
                    </button>
                  ))}
                </div>

                {/* Active Scene Editor Box */}
                <div className="p-5 bg-[#090d16] border border-[#1e2d4d] rounded-2xl space-y-4">
                  <div className="flex items-center justify-between border-b border-[#1e2d4d] pb-2.5">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-lg bg-[#00f2fe]/20 text-[#00f2fe] text-xs font-bold flex items-center justify-center">
                        {activeSceneIndex + 1}
                      </span>
                      <h4 className="text-sm font-bold text-[#f8fafc]">{currentScene.title}</h4>
                      <span className="text-[10px] text-[#94a3b8] font-mono">[{currentScene.timing}]</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => playAudioVoiceover(currentScene.voiceover)}
                      className="text-xs font-bold text-[#00f2fe] hover:underline flex items-center gap-1"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Hear Scene Audio</span>
                    </button>
                  </div>

                  {/* Spoken Voiceover Text */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#f8fafc] block">
                      Spoken Narration (Voiceover Script):
                    </label>
                    <textarea
                      rows={3}
                      value={currentScene.voiceover}
                      onChange={e => {
                        const updated = [...storyboard.scenes];
                        updated[activeSceneIndex].voiceover = e.target.value;
                        setStoryboard(prev => ({
                          ...prev,
                          scenes: updated,
                          voiceoverFull: updated.map(s => s.voiceover).join(' ')
                        }));
                      }}
                      className="w-full p-3 rounded-xl bg-[#131d33] border border-[#1e2d4d] text-xs sm:text-sm text-[#f8fafc] focus:border-[#00f2fe] focus:outline-none"
                    />
                  </div>

                  {/* Visual Cue & Caption Highlight */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-[#f8fafc] block">
                        Visual Cue & Camera Direction:
                      </label>
                      <input
                        type="text"
                        value={currentScene.visualCue}
                        onChange={e => {
                          const updated = [...storyboard.scenes];
                          updated[activeSceneIndex].visualCue = e.target.value;
                          setStoryboard(prev => ({ ...prev, scenes: updated }));
                        }}
                        className="w-full px-3 py-2 rounded-xl bg-[#131d33] border border-[#1e2d4d] text-xs text-[#f8fafc] focus:border-[#00f2fe] focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-[#f8fafc] block">
                        Kinetic Subtitle Highlight (Word Pop):
                      </label>
                      <input
                        type="text"
                        value={currentScene.captionHighlight}
                        onChange={e => {
                          const updated = [...storyboard.scenes];
                          updated[activeSceneIndex].captionHighlight = e.target.value;
                          setStoryboard(prev => ({ ...prev, scenes: updated }));
                        }}
                        className="w-full px-3 py-2 rounded-xl bg-[#131d33] border border-[#1e2d4d] text-xs font-bold text-[#eab308] focus:border-[#00f2fe] focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Director's B-Roll Suggestions & Music Cue */}
                <div className="p-4 bg-[#090d16] border border-[#1e2d4d] rounded-2xl space-y-2">
                  <span className="text-xs font-bold text-[#f8fafc] block">
                    🎬 Recommended B-Roll Footage & Cutaways:
                  </span>
                  <ul className="text-xs text-[#94a3b8] space-y-1 list-disc pl-4">
                    {storyboard.bRollSuggestions.map((bRoll, i) => (
                      <li key={i}>{bRoll}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Brand Graphic & Image Studio (Upgraded with 5 layout templates & stickers) */}
      {activeTab === 'graphics' && (
        <div className="space-y-8">
          <div className="p-6 bg-[#131d33] border border-[#1e2d4d] rounded-2xl shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#1e2d4d] pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <Palette className="w-5 h-5 text-[#e8c872]" />
                  <h3 className="font-heading font-bold text-base text-[#f8fafc]">
                    Corporate Brand Graphic & Image Studio
                  </h3>
                </div>
                <p className="text-xs text-[#94a3b8]">
                  Design high-converting visual assets adhering strictly to Bab Al-Khaleej & Back for Brand LLC guidelines.
                </p>
              </div>

              {/* Export Controls */}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={downloadPNG}
                  className="px-3.5 py-2 rounded-xl bg-[#38bdf8] hover:bg-[#0ea5e9] text-[#090d16] text-xs font-bold flex items-center gap-1.5 shadow-md transition-all"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Ultra High-Res PNG (2x)</span>
                </button>

                <button
                  type="button"
                  onClick={downloadSVG}
                  className="px-3.5 py-2 rounded-xl bg-[#1e2d4d] hover:bg-[#2a3f6d] text-xs font-semibold text-[#f8fafc] border border-[#38bdf8]/30 flex items-center gap-1.5 transition-all"
                >
                  <Download className="w-3.5 h-3.5 text-[#38bdf8]" />
                  <span>Download Vector SVG</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleGenerateFreeImage()}
                  disabled={generatingAiImage}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#e8c872] to-[#f59e0b] hover:opacity-95 text-[#090d16] text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all disabled:opacity-50"
                >
                  <Sparkles className={`w-3.5 h-3.5 ${generatingAiImage ? 'animate-spin' : ''}`} />
                  <span>{generatingAiImage ? 'Generating AI Image...' : '✨ Generate Free AI Image'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleCopy(aiImagePrompt, 'ai_prompt')}
                  className="px-3.5 py-2 rounded-xl bg-[#090d16] hover:bg-[#1e2d4d] text-xs font-semibold text-[#e8c872] border border-[#d4af37]/40 flex items-center gap-1.5 transition-all"
                >
                  <Sparkle className="w-3.5 h-3.5" />
                  <span>{copiedKey === 'ai_prompt' ? 'Copied Prompt!' : 'Copy AI Prompt'}</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Controls Column (Left) */}
              <div className="lg:col-span-5 space-y-5">
                {/* Free AI Image Generation Panel */}
                <div className="p-4 bg-gradient-to-br from-[#1a233a] via-[#101728] to-[#131d33] border border-[#38bdf8]/40 rounded-2xl shadow-xl space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#38bdf8] uppercase tracking-wider flex items-center gap-1.5">
                      <Wand2 className="w-4 h-4 text-[#38bdf8]" />
                      Free AI Image Generation API
                    </span>
                    <span className="text-[9px] px-2 py-0.5 rounded-full bg-[#22c55e]/20 text-[#4ade80] border border-[#22c55e]/40 font-bold uppercase">
                      Free & Unlimited
                    </span>
                  </div>

                  {/* Prompt Textarea */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <label className="text-[11px] font-semibold text-[#f8fafc]">Image Prompt:</label>
                      <button
                        type="button"
                        onClick={() => {
                          const p = `Ultra-detailed executive graphic for ${topic || 'Bahrain Corporate Formation'}. Cinematic lighting, luxury obsidian glass office in Bahrain Financial Harbour, 8k resolution.`;
                          setAiImagePrompt(p);
                        }}
                        className="text-[10px] text-[#38bdf8] hover:underline"
                      >
                        Craft from Topic
                      </button>
                    </div>
                    <textarea
                      rows={3}
                      value={aiImagePrompt}
                      onChange={e => setAiImagePrompt(e.target.value)}
                      placeholder="Describe the image you want the AI to generate..."
                      className="w-full p-2.5 rounded-xl bg-[#090d16] border border-[#1e2d4d] text-xs text-[#f8fafc] placeholder-[#64748b] focus:border-[#38bdf8] focus:outline-none resize-none"
                    />
                  </div>

                  {/* Style Chips */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-semibold text-[#f8fafc] block">Style Preset:</label>
                    <div className="grid grid-cols-2 gap-1.5">
                      {[
                        { id: 'executive_luxury', label: '👑 Luxury Executive', desc: 'Gold & Obsidian' },
                        { id: 'cyber_matrix', label: '⚡ Cyber AI & GEO', desc: 'Neon Neural Grid' },
                        { id: 'bahrain_corporate', label: '🇧🇭 Bahrain Towers', desc: 'Harbour Skyline' },
                        { id: 'studio_minimal', label: '🎯 Minimal Studio', desc: 'High Contrast' }
                      ].map(st => (
                        <button
                          key={st.id}
                          type="button"
                          onClick={() => setAiImageStyle(st.id as any)}
                          className={`p-2 rounded-xl text-left border transition-all ${
                            aiImageStyle === st.id
                              ? 'bg-[#1e2d4d] border-[#38bdf8] text-[#38bdf8]'
                              : 'bg-[#090d16] border-[#1e2d4d] text-[#94a3b8] hover:text-[#f8fafc]'
                          }`}
                        >
                          <span className="text-[11px] font-bold block">{st.label}</span>
                          <span className="text-[9px] text-[#64748b] block">{st.desc}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Aspect Ratio & Engine */}
                  <div className="grid grid-cols-2 gap-3 pt-1">
                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold text-[#f8fafc] block">Aspect Ratio:</label>
                      <select
                        value={aiImageAspect}
                        onChange={e => setAiImageAspect(e.target.value as any)}
                        className="w-full px-2.5 py-1.5 rounded-xl bg-[#090d16] border border-[#1e2d4d] text-xs text-[#f8fafc] focus:outline-none"
                      >
                        <option value="1:1">1:1 Square (Feed)</option>
                        <option value="16:9">16:9 Cinema (X/YouTube)</option>
                        <option value="9:16">9:16 Vertical (Shorts/Reels)</option>
                        <option value="4:5">4:5 Portrait (Instagram)</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold text-[#f8fafc] block">AI Engine:</label>
                      <select
                        value={aiImageEngine}
                        onChange={e => setAiImageEngine(e.target.value as any)}
                        className="w-full px-2.5 py-1.5 rounded-xl bg-[#090d16] border border-[#1e2d4d] text-xs text-[#f8fafc] focus:outline-none"
                      >
                        <option value="pollinations">Pollinations FLUX (Free)</option>
                        <option value="gemini">Gemini 3.1 Image AI</option>
                      </select>
                    </div>
                  </div>

                  {/* Generate Button */}
                  <button
                    type="button"
                    onClick={() => handleGenerateFreeImage()}
                    disabled={generatingAiImage}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-[#38bdf8] to-[#0ea5e9] hover:from-[#0ea5e9] hover:to-[#0284c7] text-[#090d16] font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(56,189,248,0.3)] transition-all disabled:opacity-50"
                  >
                    <Sparkles className={`w-4 h-4 ${generatingAiImage ? 'animate-spin' : ''}`} />
                    <span>{generatingAiImage ? 'Generating AI Image (FLUX)...' : '✨ Generate Free AI Image'}</span>
                  </button>

                  {/* Last Generated Image Card */}
                  {lastGeneratedImage && (
                    <div className="p-3 bg-[#090d16] border border-[#38bdf8]/30 rounded-xl space-y-2.5 animate-fade-in">
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="font-bold text-[#38bdf8] uppercase">Generated Visual Preview</span>
                        <span className="text-[#94a3b8] font-mono">{lastGeneratedImage.aspectRatio}</span>
                      </div>
                      <div className="relative rounded-lg overflow-hidden border border-[#1e2d4d] aspect-video bg-black flex items-center justify-center">
                        <img
                          src={lastGeneratedImage.url}
                          alt="AI Generated Visual"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2 pt-1">
                        <button
                          type="button"
                          onClick={() => handleApplyImageToGraphic(lastGeneratedImage.url)}
                          className="py-1.5 px-2 rounded-lg bg-[#38bdf8] text-[#090d16] text-[10px] font-bold uppercase tracking-wider hover:bg-[#0ea5e9] transition-all text-center"
                        >
                          🖼️ Apply to Graphic
                        </button>
                        <button
                          type="button"
                          onClick={() => handleApplyImageToVideo(lastGeneratedImage.url)}
                          className="py-1.5 px-2 rounded-lg bg-[#1e2d4d] text-[#38bdf8] text-[10px] font-bold uppercase tracking-wider hover:bg-[#2a3f6d] border border-[#38bdf8]/30 transition-all text-center"
                        >
                          🎬 Apply to Video
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Recent History Reel */}
                  {generatedImagesHistory.length > 1 && (
                    <div className="space-y-1.5 pt-1 border-t border-[#1e2d4d]">
                      <span className="text-[10px] uppercase font-bold text-[#94a3b8] block">Recent Generations:</span>
                      <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
                        {generatedImagesHistory.slice(0, 6).map((img, idx) => (
                          <button
                            key={img.id || idx}
                            type="button"
                            onClick={() => {
                              setLastGeneratedImage(img);
                              handleApplyImageToGraphic(img.url);
                            }}
                            className="w-12 h-12 rounded-lg overflow-hidden border border-[#1e2d4d] hover:border-[#38bdf8] flex-shrink-0 transition-all hover:scale-105"
                            title={img.prompt}
                          >
                            <img src={img.url} alt="" className="w-full h-full object-cover" />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                {/* Visual Layout Template Switcher */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#f8fafc] block">
                    1. Visual Layout Template:
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {[
                      { id: 'executive_spotlight', label: 'Executive Spotlight', desc: 'Split photo & gold' },
                      { id: 'data_matrix', label: 'Data & AI Matrix', desc: 'Cyber neural nodes' },
                      { id: 'statutory_gazette', label: 'Statutory Gazette', desc: 'Official Royal Seal' },
                      { id: 'contrarian_quote', label: 'Contrarian Quote', desc: 'High-contrast text' },
                      { id: 'carousel_slide', label: 'Carousel Slide', desc: 'Step 1/5 checklist' }
                    ].map(tpl => (
                      <button
                        key={tpl.id}
                        type="button"
                        onClick={() => setGraphicConfig(prev => ({ ...prev, template: tpl.id as GraphicTemplate }))}
                        className={`p-2.5 rounded-xl border text-left transition-all ${
                          graphicConfig.template === tpl.id
                            ? 'bg-[#1e2d4d] border-[#38bdf8] text-[#38bdf8]'
                            : 'bg-[#090d16] border-[#1e2d4d] text-[#94a3b8] hover:text-[#f8fafc]'
                        }`}
                      >
                        <span className="text-xs font-bold block">{tpl.label}</span>
                        <span className="text-[9px] text-[#64748b] block">{tpl.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Brand Theme Selector */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#f8fafc] block">
                    2. Corporate Brand Theme & Palette:
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setGraphicConfig(prev => ({ ...prev, theme: 'gold_luxury', authorTag: 'Ghazi Wazir | CEO Bab Al-Khaleej' }))}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        graphicConfig.theme === 'gold_luxury'
                          ? 'bg-[#1e2d4d] border-[#d4af37] shadow-[0_0_15px_rgba(212,175,55,0.2)]'
                          : 'bg-[#090d16] border-[#1e2d4d] hover:border-[#d4af37]/40'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className="w-3 h-3 rounded-full bg-[#d4af37]" />
                        <span className="text-xs font-bold text-[#e8c872]">Bab Al-Khaleej</span>
                      </div>
                      <span className="text-[10px] text-[#94a3b8] block">Royal Gold & Obsidian</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setGraphicConfig(prev => ({ ...prev, theme: 'cyber_azure', authorTag: 'Ghazi Wazir | Back for Brand LLC' }))}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        graphicConfig.theme === 'cyber_azure'
                          ? 'bg-[#1e2d4d] border-[#38bdf8] shadow-[0_0_15px_rgba(56,189,248,0.2)]'
                          : 'bg-[#090d16] border-[#1e2d4d] hover:border-[#38bdf8]/40'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className="w-3 h-3 rounded-full bg-[#38bdf8]" />
                        <span className="text-xs font-bold text-[#38bdf8]">Back for Brand</span>
                      </div>
                      <span className="text-[10px] text-[#94a3b8] block">Cyber Azure & Slate</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setGraphicConfig(prev => ({ ...prev, theme: 'executive_sovereign', authorTag: 'Ghazi Wazir | Executive Ecosystem' }))}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        graphicConfig.theme === 'executive_sovereign'
                          ? 'bg-[#1e2d4d] border-[#a855f7] shadow-[0_0_15px_rgba(168,85,247,0.2)]'
                          : 'bg-[#090d16] border-[#1e2d4d] hover:border-[#a855f7]/40'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className="w-3 h-3 rounded-full bg-gradient-to-r from-[#d4af37] to-[#38bdf8]" />
                        <span className="text-xs font-bold text-[#f8fafc]">Executive Hub</span>
                      </div>
                      <span className="text-[10px] text-[#94a3b8] block">Dual Prestige Sovereign</span>
                    </button>
                  </div>
                </div>

                {/* Aspect Ratio Selector */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#f8fafc] block">
                    3. Platform Canvas Dimensions:
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { id: '1:1', label: '1:1 Square', note: 'Meta / IG / LinkedIn' },
                      { id: '9:16', label: '9:16 Vertical', note: 'Snapchat / TikTok' },
                      { id: '16:9', label: '16:9 Landscape', note: 'YouTube / X Card' },
                      { id: '1.91:1', label: '1.91:1 Banner', note: 'LinkedIn Header' }
                    ].map(r => (
                      <button
                        key={r.id}
                        type="button"
                        onClick={() => setGraphicConfig(prev => ({ ...prev, aspectRatio: r.id as GraphicAspectRatio }))}
                        className={`p-2.5 rounded-xl border text-center transition-all ${
                          graphicConfig.aspectRatio === r.id
                            ? 'bg-[#1e2d4d] border-[#38bdf8] text-[#38bdf8]'
                            : 'bg-[#090d16] border-[#1e2d4d] text-[#94a3b8] hover:text-[#f8fafc]'
                        }`}
                      >
                        <span className="text-xs font-bold block">{r.label}</span>
                        <span className="text-[9px] text-[#64748b] block">{r.note}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Text Content Inputs */}
                <div className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#f8fafc] block">Headline Text:</label>
                    <input
                      type="text"
                      value={graphicConfig.headline}
                      onChange={e => setGraphicConfig(prev => ({ ...prev, headline: e.target.value }))}
                      className="w-full px-3.5 py-2 rounded-xl bg-[#090d16] border border-[#1e2d4d] text-xs font-bold text-[#f8fafc] focus:border-[#38bdf8] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#f8fafc] block">Subheadline / Feature Bullet:</label>
                    <input
                      type="text"
                      value={graphicConfig.subheadline}
                      onChange={e => setGraphicConfig(prev => ({ ...prev, subheadline: e.target.value }))}
                      className="w-full px-3.5 py-2 rounded-xl bg-[#090d16] border border-[#1e2d4d] text-xs text-[#f8fafc] focus:border-[#38bdf8] focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-[#f8fafc] block">Badge Label:</label>
                      <input
                        type="text"
                        value={graphicConfig.badge}
                        onChange={e => setGraphicConfig(prev => ({ ...prev, badge: e.target.value }))}
                        className="w-full px-3 py-1.5 rounded-xl bg-[#090d16] border border-[#1e2d4d] text-xs text-[#f8fafc] focus:border-[#38bdf8] focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-[#f8fafc] block">CTA Button Label:</label>
                      <input
                        type="text"
                        value={graphicConfig.ctaText}
                        onChange={e => setGraphicConfig(prev => ({ ...prev, ctaText: e.target.value }))}
                        className="w-full px-3 py-1.5 rounded-xl bg-[#090d16] border border-[#1e2d4d] text-xs text-[#f8fafc] focus:border-[#38bdf8] focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Trust Sticker Badges Quick Selector */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#f8fafc] block">Sticker Overlay:</label>
                    <div className="flex flex-wrap gap-1.5">
                      {[
                        '100% FOREIGN OWNERSHIP',
                        'OFFICIAL 2026 BLUEPRINT',
                        '0% CORPORATE TAX',
                        'AI AUTONOMOUS AGENT',
                        'MINISTRY PRE-CLEARED'
                      ].map(stk => (
                        <button
                          key={stk}
                          type="button"
                          onClick={() => setGraphicConfig(prev => ({ ...prev, stickerText: stk }))}
                          className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-all ${
                            graphicConfig.stickerText === stk
                              ? 'bg-[#eab308] text-[#090d16]'
                              : 'bg-[#090d16] text-[#94a3b8] hover:text-[#f8fafc] border border-[#1e2d4d]'
                          }`}
                        >
                          {stk}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Toggles */}
                <div className="p-3 bg-[#090d16] rounded-xl border border-[#1e2d4d] grid grid-cols-2 gap-3">
                  <label className="flex items-center gap-2 cursor-pointer text-xs text-[#f8fafc]">
                    <input
                      type="checkbox"
                      checked={graphicConfig.showPhoto}
                      onChange={e => setGraphicConfig(prev => ({ ...prev, showPhoto: e.target.checked }))}
                      className="rounded border-[#1e2d4d] text-[#38bdf8] focus:ring-0"
                    />
                    <span>Show CEO Portrait</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer text-xs text-[#f8fafc]">
                    <input
                      type="checkbox"
                      checked={graphicConfig.showWatermark}
                      onChange={e => setGraphicConfig(prev => ({ ...prev, showWatermark: e.target.checked }))}
                      className="rounded border-[#1e2d4d] text-[#38bdf8] focus:ring-0"
                    />
                    <span>Show Brand Seal</span>
                  </label>
                </div>
              </div>

              {/* Graphic Canvas Live Preview (Right) */}
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#94a3b8] flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5 text-[#38bdf8]" />
                    <span>Real-Time Scaled Vector Preview ({canvasWidth} × {canvasHeight}px)</span>
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-[#1e2d4d] text-[#38bdf8] font-mono">
                    Template: {graphicConfig.template} • {graphicConfig.aspectRatio}
                  </span>
                </div>

                {/* Container for SVG Canvas */}
                <div className="p-4 bg-[#090d16] border border-[#1e2d4d] rounded-2xl flex items-center justify-center min-h-[460px] shadow-2xl overflow-hidden">
                  <svg
                    ref={svgCanvasRef}
                    viewBox={`0 0 ${canvasWidth} ${canvasHeight}`}
                    className="max-h-[520px] w-auto max-w-full drop-shadow-2xl rounded-xl border border-[#1e2d4d]/60"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <defs>
                      <linearGradient id="bgGradGold" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#090d16" />
                        <stop offset="50%" stopColor="#111827" />
                        <stop offset="100%" stopColor="#05070a" />
                      </linearGradient>

                      <linearGradient id="bgGradAzure" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#090d16" />
                        <stop offset="60%" stopColor="#0f172a" />
                        <stop offset="100%" stopColor="#0b1329" />
                      </linearGradient>

                      <linearGradient id="goldTextGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#fef08a" />
                        <stop offset="50%" stopColor="#d4af37" />
                        <stop offset="100%" stopColor="#f59e0b" />
                      </linearGradient>

                      <linearGradient id="azureTextGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#ffffff" />
                        <stop offset="50%" stopColor="#38bdf8" />
                        <stop offset="100%" stopColor="#818cf8" />
                      </linearGradient>

                      <pattern id="gridPattern" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(56,189,248,0.08)" strokeWidth="1" />
                      </pattern>

                      <pattern id="goldLattice" width="60" height="60" patternUnits="userSpaceOnUse">
                        <circle cx="30" cy="30" r="1.5" fill="rgba(212,175,55,0.15)" />
                        <path d="M 0 30 L 60 30 M 30 0 L 30 60" stroke="rgba(212,175,55,0.06)" strokeWidth="0.8" />
                      </pattern>
                    </defs>

                    {/* Background */}
                    <rect
                      width={canvasWidth}
                      height={canvasHeight}
                      fill={graphicConfig.theme === 'cyber_azure' ? 'url(#bgGradAzure)' : 'url(#bgGradGold)'}
                    />

                    {/* AI Generated / Photographic Background Image */}
                    {graphicConfig.backgroundImage && graphicConfig.backgroundImage !== 'canvas_loop' && (
                      <image
                        href={graphicConfig.backgroundImage}
                        width={canvasWidth}
                        height={canvasHeight}
                        preserveAspectRatio="xMidYMid slice"
                        opacity="0.88"
                      />
                    )}

                    {/* Dark Vignette Overlay for Readability */}
                    <rect
                      width={canvasWidth}
                      height={canvasHeight}
                      fill={`rgba(9, 13, 22, ${graphicConfig.backgroundOverlay ?? 0.55})`}
                    />

                    {/* Texture Pattern */}
                    <rect
                      width={canvasWidth}
                      height={canvasHeight}
                      fill={graphicConfig.theme === 'cyber_azure' ? 'url(#gridPattern)' : 'url(#goldLattice)'}
                      opacity={graphicConfig.backgroundImage ? 0.35 : 1}
                    />

                    {/* Frame Borders */}
                    <rect
                      x="30"
                      y="30"
                      width={canvasWidth - 60}
                      height={canvasHeight - 60}
                      rx="24"
                      fill="none"
                      stroke={graphicConfig.theme === 'cyber_azure' ? 'rgba(56,189,248,0.25)' : 'rgba(212,175,55,0.3)'}
                      strokeWidth="2"
                    />

                    {/* Corner Accent Ornaments */}
                    <circle cx="50" cy="50" r="4" fill={graphicConfig.theme === 'cyber_azure' ? '#38bdf8' : '#d4af37'} />
                    <circle cx={canvasWidth - 50} cy="50" r="4" fill={graphicConfig.theme === 'cyber_azure' ? '#38bdf8' : '#d4af37'} />
                    <circle cx="50" cy={canvasHeight - 50} r="4" fill={graphicConfig.theme === 'cyber_azure' ? '#38bdf8' : '#d4af37'} />
                    <circle cx={canvasWidth - 50} cy={canvasHeight - 50} r="4" fill={graphicConfig.theme === 'cyber_azure' ? '#38bdf8' : '#d4af37'} />

                    {/* Top Badge */}
                    <g transform={`translate(${canvasWidth / 2 - 140}, 70)`}>
                      <rect
                        width="280"
                        height="44"
                        rx="22"
                        fill={graphicConfig.theme === 'cyber_azure' ? 'rgba(56,189,248,0.15)' : 'rgba(212,175,55,0.18)'}
                        stroke={graphicConfig.theme === 'cyber_azure' ? '#38bdf8' : '#d4af37'}
                        strokeWidth="1.5"
                      />
                      <text
                        x="140"
                        y="28"
                        textAnchor="middle"
                        fill={graphicConfig.theme === 'cyber_azure' ? '#38bdf8' : '#e8c872'}
                        fontSize="14"
                        fontFamily="sans-serif"
                        fontWeight="bold"
                        letterSpacing="2"
                      >
                        {graphicConfig.badge}
                      </text>
                    </g>

                    {/* Sticker Badge Pill */}
                    {graphicConfig.stickerText && (
                      <g transform={`translate(70, 140)`}>
                        <rect
                          width="240"
                          height="36"
                          rx="8"
                          fill="#eab308"
                          transform="rotate(-2)"
                        />
                        <text
                          x="120"
                          y="24"
                          textAnchor="middle"
                          fill="#090d16"
                          fontSize="12"
                          fontFamily="sans-serif"
                          fontWeight="900"
                          letterSpacing="1"
                          transform="rotate(-2)"
                        >
                          ★ {graphicConfig.stickerText}
                        </text>
                      </g>
                    )}

                    {/* Headline Text */}
                    <g transform={`translate(70, ${canvasHeight * 0.35})`}>
                      <text
                        x="0"
                        y="0"
                        fill={graphicConfig.theme === 'cyber_azure' ? 'url(#azureTextGrad)' : 'url(#goldTextGrad)'}
                        fontSize={canvasHeight > 1200 ? '58' : '48'}
                        fontFamily="sans-serif"
                        fontWeight="900"
                        letterSpacing="1"
                      >
                        {graphicConfig.headline.length > 28
                          ? graphicConfig.headline.slice(0, 28)
                          : graphicConfig.headline}
                      </text>
                      {graphicConfig.headline.length > 28 && (
                        <text
                          x="0"
                          y="65"
                          fill={graphicConfig.theme === 'cyber_azure' ? 'url(#azureTextGrad)' : 'url(#goldTextGrad)'}
                          fontSize={canvasHeight > 1200 ? '58' : '48'}
                          fontFamily="sans-serif"
                          fontWeight="900"
                          letterSpacing="1"
                        >
                          {graphicConfig.headline.slice(28, 56)}
                        </text>
                      )}
                    </g>

                    {/* Subheadline Text */}
                    <g transform={`translate(70, ${canvasHeight * 0.35 + (graphicConfig.headline.length > 28 ? 120 : 60)})`}>
                      <text
                        x="0"
                        y="0"
                        fill="#cbd5e1"
                        fontSize={canvasHeight > 1200 ? '24' : '20'}
                        fontFamily="sans-serif"
                        fontWeight="500"
                      >
                        {graphicConfig.subheadline}
                      </text>
                    </g>

                    {/* CEO Portrait Card */}
                    {graphicConfig.showPhoto && (
                      <g transform={`translate(${canvasWidth - 280}, ${canvasHeight - 260})`}>
                        <rect
                          width="210"
                          height="180"
                          rx="18"
                          fill="rgba(19,29,51,0.85)"
                          stroke={graphicConfig.theme === 'cyber_azure' ? 'rgba(56,189,248,0.4)' : 'rgba(212,175,55,0.4)'}
                          strokeWidth="2"
                        />
                        <image
                          href="/ghazi-wazir-photo.jpg"
                          x="20"
                          y="20"
                          width="80"
                          height="80"
                          preserveAspectRatio="xMidYMid slice"
                          clipPath="url(#avatarClip)"
                        />
                        <clipPath id="avatarClip">
                          <circle cx="60" cy="60" r="40" />
                        </clipPath>
                        <circle
                          cx="60"
                          cy="60"
                          r="40"
                          fill="none"
                          stroke={graphicConfig.theme === 'cyber_azure' ? '#38bdf8' : '#d4af37'}
                          strokeWidth="2.5"
                        />
                        <text x="20" y="130" fill="#f8fafc" fontSize="13" fontWeight="bold">
                          Ghazi Wazir
                        </text>
                        <text x="20" y="152" fill="#94a3b8" fontSize="10">
                          CEO & Founder
                        </text>
                      </g>
                    )}

                    {/* Watermark Logo Seal */}
                    {graphicConfig.showWatermark && (
                      <g transform={`translate(70, ${canvasHeight - 160})`}>
                        <rect
                          width="52"
                          height="52"
                          rx="14"
                          fill={graphicConfig.theme === 'cyber_azure' ? '#131d33' : '#1a1824'}
                          stroke={graphicConfig.theme === 'cyber_azure' ? '#38bdf8' : '#d4af37'}
                          strokeWidth="2"
                        />
                        <text
                          x="26"
                          y="34"
                          textAnchor="middle"
                          fill={graphicConfig.theme === 'cyber_azure' ? '#38bdf8' : '#e8c872'}
                          fontSize="22"
                          fontWeight="900"
                        >
                          GW
                        </text>
                        <text x="68" y="24" fill="#f8fafc" fontSize="14" fontWeight="bold">
                          {graphicConfig.authorTag}
                        </text>
                        <text x="68" y="44" fill="#94a3b8" fontSize="11">
                          ghaziwazir.com • Verified Advisory
                        </text>
                      </g>
                    )}

                    {/* Call to Action Button */}
                    <g transform={`translate(70, ${canvasHeight * 0.62})`}>
                      <rect
                        width="240"
                        height="52"
                        rx="14"
                        fill={graphicConfig.theme === 'cyber_azure' ? '#38bdf8' : '#d4af37'}
                      />
                      <text
                        x="120"
                        y="32"
                        textAnchor="middle"
                        fill="#090d16"
                        fontSize="13"
                        fontFamily="sans-serif"
                        fontWeight="900"
                        letterSpacing="1"
                      >
                        {graphicConfig.ctaText} &rarr;
                      </text>
                    </g>
                  </svg>
                </div>

                {/* AI Image Generation Prompt Card */}
                <div className="p-4 bg-[#090d16] border border-[#1e2d4d] rounded-2xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#e8c872] flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Ready-to-Use AI Image Prompt (Midjourney / Gemini / DALL-E):</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopy(aiImagePrompt, 'ai_prompt')}
                      className="text-[11px] text-[#38bdf8] hover:underline font-semibold"
                    >
                      {copiedKey === 'ai_prompt' ? 'Copied!' : 'Copy Prompt'}
                    </button>
                  </div>
                  <p className="text-xs text-[#cbd5e1] font-mono leading-relaxed bg-[#131d33] p-3 rounded-xl border border-[#1e2d4d]/60 select-all">
                    {aiImagePrompt}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: Hashtags & Keyword Suite */}
      {activeTab === 'hashtags' && (
        <div className="space-y-6">
          <div className="p-6 bg-[#131d33] border border-[#1e2d4d] rounded-2xl shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#1e2d4d] pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <Hash className="w-5 h-5 text-[#38bdf8]" />
                  <h3 className="font-heading font-bold text-base text-[#f8fafc]">
                    Hashtags & Keyword Authority Suite
                  </h3>
                </div>
                <p className="text-xs text-[#94a3b8]">
                  Curate high-intent hashtags and append them directly to your cross-platform drafts.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={insertTagsIntoCurrentDraft}
                  className="px-3.5 py-2 rounded-xl bg-[#38bdf8] hover:bg-[#0ea5e9] text-[#090d16] text-xs font-bold flex items-center gap-1.5 shadow-md transition-all"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Insert into {ALL_PLATFORM_CONFIG[selectedPreviewPlatform].name}</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleCopy(selectedHashtags.join(' '), 'tags')}
                  className="px-3.5 py-2 rounded-xl bg-[#1e2d4d] hover:bg-[#2a3f6d] text-xs font-semibold text-[#f8fafc] border border-[#38bdf8]/30 flex items-center gap-1.5 transition-all"
                >
                  <Copy className="w-3.5 h-3.5 text-[#38bdf8]" />
                  <span>{copiedKey === 'tags' ? 'Copied All!' : 'Copy All Selected'}</span>
                </button>
              </div>
            </div>

            {/* Selected Hashtags Box */}
            <div className="p-4 bg-[#090d16] border border-[#1e2d4d] rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#f8fafc]">
                  Currently Selected Hashtags ({selectedHashtags.length}):
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedHashtags([])}
                  className="text-[11px] text-[#ef4444] hover:underline"
                >
                  Clear All
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-2 pt-1">
                {selectedHashtags.length === 0 ? (
                  <span className="text-xs text-[#64748b] italic">No hashtags selected. Click from the banks below.</span>
                ) : (
                  selectedHashtags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg text-xs bg-[#1e2d4d] text-[#38bdf8] border border-[#38bdf8]/40 flex items-center gap-1.5"
                    >
                      <span>{tag}</span>
                      <button
                        type="button"
                        onClick={() => toggleHashtag(tag)}
                        className="text-[#94a3b8] hover:text-[#ef4444]"
                      >
                        &times;
                      </button>
                    </span>
                  ))
                )}
              </div>
            </div>

            {/* Custom Tag Adder */}
            <div className="flex items-center gap-2 max-w-md">
              <input
                type="text"
                value={customTagInput}
                onChange={e => setCustomTagInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && addCustomTag()}
                placeholder="Add custom hashtag (e.g. #BahrainFintech)..."
                className="flex-1 px-3.5 py-2 rounded-xl bg-[#090d16] border border-[#1e2d4d] text-xs text-[#f8fafc] focus:border-[#38bdf8] focus:outline-none"
              />
              <button
                type="button"
                onClick={addCustomTag}
                className="px-3.5 py-2 rounded-xl bg-[#1e2d4d] hover:bg-[#2a3f6d] text-xs font-bold text-[#38bdf8] border border-[#38bdf8]/30 transition-all"
              >
                + Add Tag
              </button>
            </div>

            {/* Categorized Hashtag Banks */}
            <div className="space-y-4 pt-2">
              <span className="text-xs font-bold text-[#94a3b8] uppercase tracking-wider block">
                Verified Curated Hashtag Banks:
              </span>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(CURATED_HASHTAG_BANKS).map(([category, tags]) => (
                  <div key={category} className="p-4 bg-[#090d16] border border-[#1e2d4d] rounded-xl space-y-2.5">
                    <span className="text-xs font-bold text-[#f8fafc] block border-b border-[#1e2d4d] pb-1.5">
                      {category}
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {tags.map(tag => {
                        const isSelected = selectedHashtags.includes(tag);
                        return (
                          <button
                            key={tag}
                            type="button"
                            onClick={() => toggleHashtag(tag)}
                            className={`px-2 py-0.5 rounded text-[11px] font-medium transition-all ${
                              isSelected
                                ? 'bg-[#38bdf8] text-[#090d16] font-bold shadow-sm'
                                : 'bg-[#131d33] text-[#94a3b8] hover:text-[#f8fafc] hover:bg-[#1e2d4d] border border-[#1e2d4d]'
                            }`}
                          >
                            {tag}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Density Guide */}
            <div className="p-4 bg-[#090d16] border border-[#1e2d4d] rounded-xl space-y-2">
              <span className="text-xs font-bold text-[#e8c872] block">
                Algorithm Density Guidelines by Platform:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 text-[11px] text-[#94a3b8]">
                <div>• Facebook: 3–6 tags</div>
                <div>• X / Twitter: 1–2 tags</div>
                <div>• LinkedIn: 3–5 tags</div>
                <div>• Instagram: 8–15 tags</div>
                <div>• YouTube: 5–10 tags</div>
                <div>• TikTok: 4–6 tags</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: Scheduled Queue & Published History */}
      {activeTab === 'queue' && (
        <div className="space-y-6">
          {/* Filters Bar */}
          <div className="p-4 bg-[#131d33] border border-[#1e2d4d] rounded-2xl flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-[#94a3b8] flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5" />
                <span>Filters:</span>
              </span>

              <select
                value={queueFilterPlatform}
                onChange={e => setQueueFilterPlatform(e.target.value)}
                className="bg-[#090d16] border border-[#1e2d4d] rounded-xl text-xs text-[#f8fafc] px-3 py-1.5 focus:border-[#38bdf8] focus:outline-none"
              >
                <option value="all">All 14 Channels</option>
                {Object.keys(ALL_PLATFORM_CONFIG).map(pKey => (
                  <option key={pKey} value={pKey}>
                    {ALL_PLATFORM_CONFIG[pKey as SocialPlatform].name}
                  </option>
                ))}
              </select>

              <select
                value={queueFilterStatus}
                onChange={e => setQueueFilterStatus(e.target.value)}
                className="bg-[#090d16] border border-[#1e2d4d] rounded-xl text-xs text-[#f8fafc] px-3 py-1.5 focus:border-[#38bdf8] focus:outline-none"
              >
                <option value="all">All Statuses</option>
                <option value="PUBLISHED">Published</option>
                <option value="SCHEDULED">Scheduled</option>
                <option value="AUTOPILOT_QUEUED">Autopilot Queued</option>
                <option value="DRAFT">Draft</option>
              </select>
            </div>

            <span className="text-xs text-[#94a3b8]">
              Showing {data?.posts.length || 0} Posts across All Channels
            </span>
          </div>

          {/* Posts List */}
          <div className="space-y-4">
            {(!data?.posts || data.posts.length === 0) ? (
              <div className="p-12 text-center bg-[#131d33] border border-[#1e2d4d] rounded-2xl space-y-3">
                <Share2 className="w-8 h-8 text-[#64748b] mx-auto" />
                <h4 className="text-sm font-bold text-[#f8fafc]">No Posts in Queue</h4>
                <p className="text-xs text-[#94a3b8]">
                  Use the 'Facebook, X & Multi-Platform Copy' tab to generate and syndicate new campaigns.
                </p>
              </div>
            ) : (
              data.posts
                .filter(p => queueFilterPlatform === 'all' || p.platforms.includes(queueFilterPlatform as any))
                .filter(p => queueFilterStatus === 'all' || p.status === queueFilterStatus)
                .map(post => {
                  const isPublished = post.status === 'PUBLISHED';
                  const isScheduled = post.status === 'SCHEDULED' || post.status === 'AUTOPILOT_QUEUED';

                  return (
                    <div
                      key={post.id}
                      className="p-5 bg-[#131d33] border border-[#1e2d4d] rounded-2xl shadow-lg space-y-4 hover:border-[#38bdf8]/40 transition-all"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider ${
                                isPublished
                                  ? 'bg-[#22c55e]/15 text-[#22c55e] border border-[#22c55e]/30'
                                  : isScheduled
                                  ? 'bg-[#38bdf8]/15 text-[#38bdf8] border border-[#38bdf8]/30'
                                  : 'bg-[#64748b]/15 text-[#94a3b8] border border-[#64748b]/30'
                              }`}
                            >
                              {post.status}
                            </span>
                            <span className="text-[11px] font-bold text-[#e8c872]">
                              {post.entity}
                            </span>
                            <span className="text-[10px] text-[#64748b]">
                              ID: {post.id}
                            </span>
                          </div>
                          <h4 className="text-base font-heading font-bold text-[#f8fafc]">
                            {post.topic}
                          </h4>
                        </div>

                        <div className="flex items-center gap-2">
                          {!isPublished && (
                            <button
                              type="button"
                              onClick={() => handlePublishNow(post.id)}
                              className="px-3 py-1.5 rounded-xl bg-[#22c55e] hover:bg-[#16a34a] text-[#090d16] font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all"
                            >
                              <Send className="w-3 h-3" />
                              <span>Publish Now</span>
                            </button>
                          )}

                          <button
                            type="button"
                            onClick={() => handleDeletePost(post.id)}
                            className="p-1.5 rounded-xl bg-[#090d16] text-[#64748b] hover:text-[#ef4444] border border-[#1e2d4d] transition-colors"
                            title="Delete Post"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Platforms Badge Strip */}
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="text-[10px] text-[#94a3b8] mr-1">Syndicated to:</span>
                        {post.platforms.map(pKey => {
                          const cfg = ALL_PLATFORM_CONFIG[pKey];
                          if (!cfg) return null;
                          return (
                            <span
                              key={pKey}
                              className={`px-2 py-0.5 rounded text-[10px] font-semibold border flex items-center gap-1 ${cfg.badgeColor}`}
                            >
                              <span>{cfg.icon}</span>
                              <span>{cfg.name}</span>
                            </span>
                          );
                        })}
                      </div>

                      {/* Snippet Preview */}
                      <div className="p-3 bg-[#090d16] rounded-xl border border-[#1e2d4d] text-xs text-[#cbd5e1] line-clamp-3 leading-relaxed">
                        {post.content.facebook || post.content.x || post.content.linkedin || post.content.meta || post.content.twitter || post.content.blog || 'No snippet preview'}
                      </div>

                      {/* Metrics & Timing Row */}
                      <div className="flex flex-wrap items-center justify-between text-[11px] text-[#94a3b8] pt-1 border-t border-[#1e2d4d]/60">
                        <div className="flex items-center gap-4">
                          <span>
                            Created: {new Date(post.createdAt).toLocaleDateString()}
                          </span>
                          {post.funnelTarget && (
                            <span className="text-[#38bdf8]">
                              Funnel: {post.funnelTarget}
                            </span>
                          )}
                        </div>

                        {post.metrics && (
                          <div className="flex items-center gap-3">
                            <span className="text-[#f8fafc]">
                              👁️ {post.metrics.impressions?.toLocaleString() || 0} imp
                            </span>
                            <span className="text-[#a855f7]">
                              🔗 {post.metrics.clicks || 0} clicks
                            </span>
                            <span className="text-[#22c55e] font-bold">
                              🎯 {post.metrics.leads || 0} leads
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })
            )}
          </div>
        </div>
      )}

      {/* Teleprompter Full-Screen Modal */}
      {showTeleprompter && (
        <div className="fixed inset-0 z-50 bg-[#050811]/95 backdrop-blur-xl flex flex-col p-6 sm:p-12 animate-fade-in">
          {/* Top Control Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-3">
              <Tv className="w-6 h-6 text-[#00f2fe]" />
              <div>
                <h3 className="font-heading font-black text-xl text-white">
                  Executive Camera Teleprompter
                </h3>
                <span className="text-xs text-[#94a3b8]">
                  Position your camera directly behind the screen & read naturally.
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Speed Controller */}
              <div className="flex items-center gap-1.5 bg-[#131d33] px-3 py-1.5 rounded-xl border border-white/10 text-xs">
                <span className="text-[#94a3b8]">Speed:</span>
                {[0.75, 1, 1.25, 1.5].map(spd => (
                  <button
                    key={spd}
                    type="button"
                    onClick={() => setTeleprompterSpeed(spd)}
                    className={`px-2 py-0.5 rounded font-bold transition-colors ${
                      teleprompterSpeed === spd ? 'bg-[#00f2fe] text-black' : 'text-white/70 hover:text-white'
                    }`}
                  >
                    {spd}x
                  </button>
                ))}
              </div>

              {/* Font Size */}
              <div className="flex items-center gap-1.5 bg-[#131d33] px-3 py-1.5 rounded-xl border border-white/10 text-xs">
                <span className="text-[#94a3b8]">Size:</span>
                {(['text-xl', 'text-3xl', 'text-5xl'] as const).map(sz => (
                  <button
                    key={sz}
                    type="button"
                    onClick={() => setTeleprompterFontSize(sz)}
                    className={`px-2 py-0.5 rounded font-bold uppercase transition-colors ${
                      teleprompterFontSize === sz ? 'bg-[#00f2fe] text-black' : 'text-white/70 hover:text-white'
                    }`}
                  >
                    {sz === 'text-xl' ? 'S' : sz === 'text-3xl' ? 'M' : 'L'}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => setShowTeleprompter(false)}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs"
              >
                Close (ESC)
              </button>
            </div>
          </div>

          {/* Scrolling Text Container */}
          <div
            ref={teleprompterScrollRef}
            className="flex-1 overflow-y-auto py-12 px-4 max-w-4xl mx-auto scroll-smooth no-scrollbar"
          >
            <div className="space-y-12 pb-32">
              {storyboard.scenes.map((scene, idx) => (
                <div key={scene.id} className="space-y-3 border-l-4 border-[#00f2fe] pl-6">
                  <span className="text-sm font-black uppercase tracking-wider text-[#00f2fe] block font-mono">
                    [{scene.timing}] {scene.title}
                  </span>
                  <p className={`${teleprompterFontSize} font-heading font-black text-white leading-relaxed tracking-wide`}>
                    {scene.voiceover}
                  </p>
                  <span className="text-xs text-[#94a3b8] italic block">
                    🎥 Action cue: {scene.visualCue}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
