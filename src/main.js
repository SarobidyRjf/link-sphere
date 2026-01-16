import './style.css'

// ========================================
// CONFIGURATION
// ========================================

const links = [
  { 
    name: "🚀 Portfolio", 
    url: "https://portfolio.example.com", 
    featured: true,
    icon: "🎨"
  },
  { 
    name: "GitHub", 
    url: "https://github.com/tonpseudo",
    icon: "💻"
  },
  { 
    name: "LinkedIn", 
    url: "https://linkedin.com/in/yourprofile",
    icon: "💼"
  },
  { 
    name: "Twitter", 
    url: "https://twitter.com/yourhandle",
    icon: "🐦"
  },
  { 
    name: "YouTube", 
    url: "https://youtube.com/@yourchannel",
    icon: "📺"
  },
  { 
    name: "Contact Me", 
    url: "mailto:contact@example.com",
    icon: "✉️"
  }
];

// ========================================
// PARTICLE ANIMATION SYSTEM
// ========================================

class ParticleSystem {
  constructor() {
    this.canvas = document.getElementById('particle-canvas');
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.particleCount = 50;
    this.mouse = { x: null, y: null, radius: 150 };
    
    this.init();
  }
  
  init() {
    this.resize();
    this.createParticles();
    this.animate();
    
    window.addEventListener('resize', () => this.resize());
    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.x;
      this.mouse.y = e.y;
    });
  }
  
  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }
  
  createParticles() {
    this.particles = [];
    for (let i = 0; i < this.particleCount; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        size: Math.random() * 3 + 1,
        speedX: Math.random() * 0.5 - 0.25,
        speedY: Math.random() * 0.5 - 0.25,
        opacity: Math.random() * 0.5 + 0.2
      });
    }
  }
  
  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Get current theme
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const particleColor = isDark ? '255, 255, 255' : '15, 23, 42';
    
    this.particles.forEach((particle, index) => {
      // Update position
      particle.x += particle.speedX;
      particle.y += particle.speedY;
      
      // Wrap around edges
      if (particle.x > this.canvas.width) particle.x = 0;
      if (particle.x < 0) particle.x = this.canvas.width;
      if (particle.y > this.canvas.height) particle.y = 0;
      if (particle.y < 0) particle.y = this.canvas.height;
      
      // Mouse interaction
      const dx = this.mouse.x - particle.x;
      const dy = this.mouse.y - particle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < this.mouse.radius) {
        const force = (this.mouse.radius - distance) / this.mouse.radius;
        const angle = Math.atan2(dy, dx);
        particle.x -= Math.cos(angle) * force * 2;
        particle.y -= Math.sin(angle) * force * 2;
      }
      
      // Draw particle
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(${particleColor}, ${particle.opacity})`;
      this.ctx.fill();
      
      // Draw connections
      this.particles.slice(index + 1).forEach(otherParticle => {
        const dx = particle.x - otherParticle.x;
        const dy = particle.y - otherParticle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 100) {
          this.ctx.beginPath();
          this.ctx.strokeStyle = `rgba(${particleColor}, ${0.1 * (1 - distance / 100)})`;
          this.ctx.lineWidth = 0.5;
          this.ctx.moveTo(particle.x, particle.y);
          this.ctx.lineTo(otherParticle.x, otherParticle.y);
          this.ctx.stroke();
        }
      });
    });
    
    requestAnimationFrame(() => this.animate());
  }
}

// ========================================
// THEME TOGGLE
// ========================================

class ThemeManager {
  constructor() {
    this.themeToggle = document.getElementById('theme-toggle');
    this.currentTheme = localStorage.getItem('theme') || 'dark';
    
    this.init();
  }
  
  init() {
    this.setTheme(this.currentTheme);
    this.themeToggle.addEventListener('click', () => this.toggleTheme());
  }
  
  setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    this.currentTheme = theme;
  }
  
  toggleTheme() {
    const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
    this.setTheme(newTheme);
  }
}

// ========================================
// MAGNETIC HOVER EFFECT
// ========================================

class MagneticEffect {
  constructor(elements) {
    this.elements = elements;
    this.init();
  }
  
  init() {
    this.elements.forEach(element => {
      element.addEventListener('mousemove', (e) => this.handleMouseMove(e, element));
      element.addEventListener('mouseleave', () => this.handleMouseLeave(element));
    });
  }
  
  handleMouseMove(e, element) {
    const rect = element.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    const moveX = x * 0.15;
    const moveY = y * 0.15;
    
    element.style.transform = `translate(${moveX}px, ${moveY}px) translateY(-8px) scale(1.02)`;
  }
  
  handleMouseLeave(element) {
    element.style.transform = '';
  }
}

// ========================================
// LINK CARD GENERATOR
// ========================================

function generateLinkCards() {
  const container = document.getElementById('links-container');
  
  links.forEach((link, index) => {
    const card = document.createElement('a');
    card.href = link.url;
    card.target = '_blank';
    card.rel = 'noopener noreferrer';
    card.className = 'link-card';
    
    if (link.featured) {
      card.classList.add('featured');
    }
    
    // Create card content
    const content = document.createElement('div');
    content.className = 'link-card-content';
    
    if (link.icon) {
      const icon = document.createElement('span');
      icon.className = 'link-card-icon';
      icon.textContent = link.icon;
      icon.style.fontSize = link.featured ? '2.5rem' : '1.5rem';
      content.appendChild(icon);
    }
    
    const name = document.createElement('span');
    name.textContent = link.name.replace(/^[^\w\s]+\s*/, ''); // Remove emoji from name if icon exists
    content.appendChild(name);
    
    card.appendChild(content);
    container.appendChild(card);
  });
}

// ========================================
// SCROLL REVEAL ANIMATION
// ========================================

function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  document.querySelectorAll('.link-card').forEach(card => {
    observer.observe(card);
  });
}

// ========================================
// INITIALIZATION
// ========================================

document.addEventListener('DOMContentLoaded', () => {
  // Generate link cards
  generateLinkCards();
  
  // Initialize particle system
  new ParticleSystem();
  
  // Initialize theme manager
  new ThemeManager();
  
  // Initialize magnetic hover effect on cards
  setTimeout(() => {
    const cards = document.querySelectorAll('.link-card');
    new MagneticEffect(cards);
  }, 100);
  
  // Initialize scroll reveal
  initScrollReveal();
  
  // Add smooth scroll behavior
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
  
  console.log('🚀 LinkSphere initialized successfully!');
});
