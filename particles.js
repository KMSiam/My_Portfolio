/**
 * Interactive Particle Constellation Background Animation
 * Extracted and optimized from K.M. Siam's original portfolio (kmsiam.vercel.app)
 * Features:
 * - Fluid floating particle network with distance-based constellation lines
 * - Interactive mouse repulsion physics (150px proximity field)
 * - Luminous dual-tone aesthetic (Electric Indigo & Cyber Cyan)
 * - Viewport resize handling with device-density scaling
 * - Accessibility: respects prefers-reduced-motion
 */

export function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;

  // Respect user preference for reduced motion
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    canvas.style.display = 'none';
    return;
  }

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let particles = [];
  let animationId = null;
  let mouse = { x: null, y: null, radius: 150 };

  // Dual-tone color palette from original portfolio
  const particleColor = 'rgba(108, 99, 255, 0.45)';
  const accentParticleColor = 'rgba(0, 243, 255, 0.55)';
  const baseLineColor = 'rgba(108, 99, 255, ';

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  resize();
  window.addEventListener('resize', resize, { passive: true });

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  }, { passive: true });

  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  }, { passive: true });

  // Touch support for mobile devices
  window.addEventListener('touchmove', (e) => {
    if (e.touches && e.touches[0]) {
      mouse.x = e.touches[0].clientX;
      mouse.y = e.touches[0].clientY;
    }
  }, { passive: true });

  window.addEventListener('touchend', () => {
    mouse.x = null;
    mouse.y = null;
  }, { passive: true });

  // Responsive particle density
  const isMobile = window.innerWidth < 768;
  const baseDensity = isMobile ? 32000 : 16000;
  const maxParticles = isMobile ? 32 : 95;
  const particleCount = Math.min(
    Math.floor((window.innerWidth * window.innerHeight) / baseDensity),
    maxParticles
  );

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2.5 + 1.2;
      this.speedX = (Math.random() - 0.5) * 0.45;
      this.speedY = (Math.random() - 0.5) * 0.45;
      this.color = Math.random() > 0.8 ? accentParticleColor : particleColor;
    }

    update() {
      // Ambient drifting velocity
      this.x += this.speedX;
      this.y += this.speedY;

      // Smooth mouse repulsion
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouse.radius && distance > 0) {
          const force = (mouse.radius - distance) / mouse.radius;
          const directionX = dx / distance;
          const directionY = dy / distance;
          this.x -= directionX * force * 4.5;
          this.y -= directionY * force * 4.5;
        }
      }

      // Toroidal wrap-around boundaries
      if (this.x > canvas.width) this.x = 0;
      else if (this.x < 0) this.x = canvas.width;

      if (this.y > canvas.height) this.y = 0;
      else if (this.y < 0) this.y = canvas.height;
    }

    draw() {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();

      // Subtle atmospheric glow
      ctx.shadowBlur = 4;
      ctx.shadowColor = this.color;
    }
  }

  // Populate particles
  particles = [];
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function drawLines() {
    ctx.shadowBlur = 0; // Reset blur for sharp lines
    const count = particles.length;

    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 140) {
          const alpha = (1 - dist / 140) * 0.14;
          ctx.strokeStyle = `${baseLineColor}${alpha})`;
          ctx.lineWidth = 0.75;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
    }

    drawLines();
    animationId = requestAnimationFrame(animate);
  }

  animate();

  return () => {
    if (animationId) cancelAnimationFrame(animationId);
    window.removeEventListener('resize', resize);
  };
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initParticles);
  } else {
    initParticles();
  }
}
