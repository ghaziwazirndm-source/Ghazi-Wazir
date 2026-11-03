// Motion Studio Engine: Sound Synthesis, Media Presets, and After Effects VFX Generators

export interface MediaPreset {
  id: string;
  name: string;
  shortName: string;
  url: string;
  aspect: '9:16' | '16:9' | '1:1' | 'all';
  type: 'video_clip' | 'photo' | 'motion_loop';
  tag: string;
  category: string;
  description: string;
}

export const MEDIA_PRESETS: MediaPreset[] = [
  {
    id: 'bahrain_harbour',
    name: 'Bahrain Financial Harbour Twilight',
    shortName: 'Bahrain Towers',
    url: '/src/assets/images/bahrain_harbour_shorts_1793617591962.jpg',
    aspect: '9:16',
    type: 'video_clip',
    tag: '🇧🇭 9:16 Footage',
    category: 'Manama Skyline',
    description: 'Dusk illuminated twin towers & Arabian Gulf waterfront reflections'
  },
  {
    id: 'luxury_boardroom',
    name: 'Executive Boardroom at Sunset',
    shortName: 'Luxury Boardroom',
    url: '/src/assets/images/luxury_boardroom_office_1793617592714.jpg',
    aspect: '16:9',
    type: 'video_clip',
    tag: '🏢 16:9 Cinema',
    category: 'Corporate Luxury',
    description: 'Obsidian marble conference suite overlooking glowing sunset skyline'
  },
  {
    id: 'cyber_mesh',
    name: 'Cyber AI Neural Network Stream',
    shortName: 'AI Neural Matrix',
    url: '/src/assets/images/cyber_ai_network_mesh_1793617593219.jpg',
    aspect: '9:16',
    type: 'video_clip',
    tag: '⚡ 9:16 Motion',
    category: 'Autonomous AI',
    description: 'Dynamic cyan and gold neural stream with active data nodes'
  },
  {
    id: 'manama_skyline',
    name: 'Manama Financial District Aerial',
    shortName: 'Manama Skyline',
    url: '/src/assets/images/manama_skyline_square_1793617593135.jpg',
    aspect: '1:1',
    type: 'photo',
    tag: '🏙️ 1:1 Square',
    category: 'Architecture',
    description: 'Golden hour commercial district skyscrapers with water view'
  },
  {
    id: 'canvas_particles',
    name: 'After Effects Golden Cyber Vortex (60fps Canvas Loop)',
    shortName: 'AE Particle Loop',
    url: 'canvas_loop',
    aspect: 'all',
    type: 'motion_loop',
    tag: '✨ 60fps Loop',
    category: 'Motion Graphics',
    description: 'Procedural golden embers, cyber particles and depth-of-field vortex'
  }
];

// Web Audio API Synthesized Studio Sound FX (Zero external dependencies)
let globalAudioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!globalAudioCtx) {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioContextClass) {
      globalAudioCtx = new AudioContextClass();
    }
  }
  if (globalAudioCtx && globalAudioCtx.state === 'suspended') {
    globalAudioCtx.resume().catch(() => {});
  }
  return globalAudioCtx;
}

export function playMotionSoundFX(type: 'whoosh' | 'impact' | 'click' | 'shimmer'): void {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    if (type === 'whoosh') {
      // Cinematic After Effects Transition Whoosh (Bandpassed noise sweep)
      const bufferSize = Math.floor(ctx.sampleRate * 0.32);
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.Q.setValueAtTime(3.0, now);
      filter.frequency.setValueAtTime(280, now);
      filter.frequency.exponentialRampToValueAtTime(2600, now + 0.14);
      filter.frequency.exponentialRampToValueAtTime(320, now + 0.32);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.22, now + 0.14);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.32);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      noise.start(now);
    } else if (type === 'impact') {
      // Cinematic 808 Sub-Bass Impact Hit
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(130, now);
      osc.frequency.exponentialRampToValueAtTime(36, now + 0.28);

      gain.gain.setValueAtTime(0.38, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.35);
    } else if (type === 'click') {
      // Subtle mechanical tick for subtitle karaoke
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(900, now);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.04);
    } else if (type === 'shimmer') {
      // High sparkle shimmer for gold badges
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1800, now);
      osc.frequency.linearRampToValueAtTime(2600, now + 0.2);
      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.25);
    }
  } catch (err) {
    // Graceful fallback if audio is restricted by autoplay policies
  }
}

// Particle System for After Effects Particular effect
export class ParticleSimulation {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D | null;
  private particles: Array<{
    x: number;
    y: number;
    radius: number;
    vx: number;
    vy: number;
    alpha: number;
    color: string;
    pulseSpeed: number;
  }> = [];
  private animId: number = 0;
  private isRunning: boolean = false;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.initParticles();
  }

  private initParticles() {
    this.particles = [];
    const count = 35;
    const colors = ['#e8c872', '#d4af37', '#38bdf8', '#00f2fe', '#ffffff'];
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        radius: Math.random() * 2.5 + 0.8,
        vx: (Math.random() - 0.5) * 0.4,
        vy: -(Math.random() * 0.8 + 0.3), // Drifting upward like embers
        alpha: Math.random() * 0.6 + 0.2,
        color: colors[Math.floor(Math.random() * colors.length)],
        pulseSpeed: Math.random() * 0.03 + 0.01
      });
    }
  }

  public resize(width: number, height: number) {
    this.canvas.width = width;
    this.canvas.height = height;
    this.initParticles();
  }

  public start() {
    if (this.isRunning) return;
    this.isRunning = true;
    const loop = () => {
      this.draw();
      if (this.isRunning) {
        this.animId = requestAnimationFrame(loop);
      }
    };
    this.animId = requestAnimationFrame(loop);
  }

  public stop() {
    this.isRunning = false;
    cancelAnimationFrame(this.animId);
  }

  private draw() {
    if (!this.ctx) return;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (const p of this.particles) {
      p.x += p.vx;
      p.y += p.vy;
      p.alpha += Math.sin(Date.now() * p.pulseSpeed * 0.01) * 0.01;
      p.alpha = Math.max(0.15, Math.min(0.85, p.alpha));

      // Reset when particle floats off the top
      if (p.y < -10) {
        p.y = this.canvas.height + 10;
        p.x = Math.random() * this.canvas.width;
      }
      if (p.x < -10) p.x = this.canvas.width + 10;
      if (p.x > this.canvas.width + 10) p.x = -10;

      this.ctx.save();
      this.ctx.globalAlpha = p.alpha;
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = p.color;
      this.ctx.shadowColor = p.color;
      this.ctx.shadowBlur = 8;
      this.ctx.fill();
      this.ctx.restore();
    }
  }
}
