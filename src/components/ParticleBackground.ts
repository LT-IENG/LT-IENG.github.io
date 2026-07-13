/**
 * Canvas Particle Network — Interactive background for Hero section.
 *
 * Particles drift slowly. Nearby particles are connected by translucent lines.
 * The mouse attracts particles within a radius, creating an interactive "pull" effect.
 */
export class ParticleNetwork {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private particles: Particle[] = [];
  private mouse = { x: -1000, y: -1000 };
  private animId = 0;
  private resizeObserver: ResizeObserver;

  private readonly maxParticles: number;
  private readonly connectionDist = 130;
  private readonly mouseRadius = 180;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;

    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Canvas 2D context not available');
    this.ctx = ctx;

    this.maxParticles = window.innerWidth < 768 ? 50 : 120;
    this.init();

    this.resizeObserver = new ResizeObserver(() => this.resize());
    this.resizeObserver.observe(canvas.parentElement ?? canvas);
  }

  private init() {
    this.resize();
    this.createParticles();
    this.bindEvents();
    this.animate();
  }

  private resize() {
    const rect = this.canvas.parentElement?.getBoundingClientRect() ?? {
      width: window.innerWidth,
      height: window.innerHeight,
    };
    const dpr = window.devicePixelRatio || 1;
    this.canvas.width = rect.width * dpr;
    this.canvas.height = rect.height * dpr;
    this.canvas.style.width = `${rect.width}px`;
    this.canvas.style.height = `${rect.height}px`;
    this.ctx.scale(dpr, dpr);
  }

  private createParticles() {
    const w = this.canvas.width / (window.devicePixelRatio || 1);
    const h = this.canvas.height / (window.devicePixelRatio || 1);
    this.particles = Array.from({ length: this.maxParticles }, () => new Particle(w, h));
  }

  private bindEvents() {
    const parent = this.canvas.parentElement ?? window;
    parent.addEventListener('mousemove', (e: Event) => {
      const me = e as MouseEvent;
      const rect = this.canvas.getBoundingClientRect();
      this.mouse.x = me.clientX - rect.left;
      this.mouse.y = me.clientY - rect.top;
    });
    parent.addEventListener('mouseleave', () => {
      this.mouse.x = -1000;
      this.mouse.y = -1000;
    });
  }

  private animate() {
    const w = this.canvas.width / (window.devicePixelRatio || 1);
    const h = this.canvas.height / (window.devicePixelRatio || 1);

    this.ctx.clearRect(0, 0, w, h);

    // Update & draw particles
    for (const p of this.particles) {
      p.update(w, h, this.mouse, this.mouseRadius);
    }

    // Draw connections
    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const dx = this.particles[i].x - this.particles[j].x;
        const dy = this.particles[i].y - this.particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < this.connectionDist) {
          const alpha = (1 - dist / this.connectionDist) * 0.15;
          this.ctx.beginPath();
          this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
          this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
          this.ctx.strokeStyle = `rgba(196, 168, 130, ${alpha})`;
          this.ctx.lineWidth = 0.6;
          this.ctx.stroke();
        }
      }
    }

    // Draw particles on top
    for (const p of this.particles) {
      p.draw(this.ctx);
    }

    this.animId = requestAnimationFrame(() => this.animate());
  }

  destroy() {
    cancelAnimationFrame(this.animId);
    this.resizeObserver.disconnect();
  }
}

class Particle {
  x: number;
  y: number;
  private vx: number;
  private vy: number;
  private radius: number;
  private baseRadius: number;

  constructor(w: number, h: number) {
    this.x = Math.random() * w;
    this.y = Math.random() * h;
    this.vx = (Math.random() - 0.5) * 0.35;
    this.vy = (Math.random() - 0.5) * 0.35;
    this.baseRadius = 0.8 + Math.random() * 2;
    this.radius = this.baseRadius;
  }

  update(w: number, h: number, mouse: { x: number; y: number }, mouseRadius: number) {
    // Mouse attraction
    const dx = mouse.x - this.x;
    const dy = mouse.y - this.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < mouseRadius) {
      const force = (1 - dist / mouseRadius) * 0.03;
      this.vx += dx * force;
      this.vy += dy * force;
      this.radius = this.baseRadius + (1 - dist / mouseRadius) * 1.5;
    } else {
      this.radius = this.baseRadius;
    }

    // Damping
    this.vx *= 0.999;
    this.vy *= 0.999;

    this.x += this.vx;
    this.y += this.vy;

    // Wrap around edges
    if (this.x < -10) this.x = w + 10;
    if (this.x > w + 10) this.x = -10;
    if (this.y < -10) this.y = h + 10;
    if (this.y > h + 10) this.y = -10;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    const isGold = Math.random() < 0.8;
    ctx.fillStyle = isGold
      ? 'rgba(196, 168, 130, 0.7)'
      : 'rgba(255, 255, 255, 0.55)';
    ctx.fill();
  }
}
