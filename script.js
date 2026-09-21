// ---- Hero Image Fallback Handler ----
function handleHeroImgError(imgEl) {
  if (!imgEl) return;
  if (imgEl.src.includes('photos/hero_photo.jpg')) {
    imgEl.src = 'george_photo.jpg';
    return;
  }
  imgEl.style.display = 'none';
  const box = document.getElementById('heroPhotoBox');
  if (box) {
    box.classList.add('no-img');
    box.innerHTML = '<span class="hero-photo-initials">GJ</span>';
  }
}

// ---- Typewriter Effect ----
const roles = [
  "Frontend Developer",
  "Embedded Engineer",
  "IoT Innovator",
  "VLSI Designer",
  "App UI Designer",
  "Circuit Enthusiast",
  "Patent Holder (Filing)"
];
let roleIndex = 0, charIndex = 0, isDeleting = false;
function typeWriter() {
  const el = document.getElementById('typedText');
  if (!el) return;
  const currentRole = roles[roleIndex];
  if (!isDeleting) {
    el.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++;
    if (charIndex === currentRole.length) {
      isDeleting = true;
      setTimeout(typeWriter, 2000);
      return;
    }
  } else {
    el.textContent = currentRole.substring(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }
  setTimeout(typeWriter, isDeleting ? 60 : 100);
}

// ---- Animated Background Canvas ----
function initCanvas() {
  const canvas = document.getElementById('bgCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const stars = Array.from({ length: 120 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 1.5 + 0.3,
    a: Math.random(),
    speed: Math.random() * 0.008 + 0.002,
    phase: Math.random() * Math.PI * 2
  }));

  const orbs = [
    { x: canvas.width * 0.15, y: canvas.height * 0.3, r: 220, color: 'rgba(124,58,237,0.06)' },
    { x: canvas.width * 0.85, y: canvas.height * 0.7, r: 280, color: 'rgba(6,182,212,0.05)' },
    { x: canvas.width * 0.5, y: canvas.height * 0.5, r: 200, color: 'rgba(245,158,11,0.03)' }
  ];

  let t = 0;
  function drawFrame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Gradient background
    const bg = ctx.createRadialGradient(canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, canvas.width);
    bg.addColorStop(0, '#0a0f1e');
    bg.addColorStop(1, '#050816');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Glowing orbs
    orbs.forEach(o => {
      const g = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, o.r);
      g.addColorStop(0, o.color);
      g.addColorStop(1, 'transparent');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(o.x, o.y, o.r, 0, Math.PI * 2);
      ctx.fill();
    });

    // Twinkling stars
    stars.forEach(s => {
      const alpha = 0.2 + 0.4 * Math.sin(t * s.speed + s.phase);
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(167,139,250,${alpha})`;
      ctx.fill();
    });

    // Grid lines (subtle)
    ctx.strokeStyle = 'rgba(124,58,237,0.04)';
    ctx.lineWidth = 1;
    const gridSize = 80;
    for (let x = 0; x < canvas.width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }
    for (let y = 0; y < canvas.height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }

    t++;
    requestAnimationFrame(drawFrame);
  }
  drawFrame();

  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
}

// ---- Floating Particles ----
function createParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  const colors = ['rgba(124,58,237,0.8)', 'rgba(6,182,212,0.8)', 'rgba(245,158,11,0.6)', 'rgba(167,139,250,0.8)'];

  function spawnParticle() {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.left = Math.random() * 100 + 'vw';
    p.style.width = p.style.height = (Math.random() * 4 + 2) + 'px';
    p.style.background = colors[Math.floor(Math.random() * colors.length)];
    p.style.animationDuration = (Math.random() * 15 + 10) + 's';
    p.style.animationDelay = (Math.random() * 5) + 's';
    p.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
    container.appendChild(p);
    setTimeout(() => p.remove(), 25000);
  }

  for (let i = 0; i < 20; i++) setTimeout(spawnParticle, i * 400);
  setInterval(spawnParticle, 1500);
}

// ---- Scroll-triggered Animations (AOS) ----
function initScrollAnimations() {
  const elements = document.querySelectorAll('[data-aos]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        const delay = entry.target.getAttribute('data-aos-delay') || 0;
        setTimeout(() => {
          entry.target.classList.add('animated');
        }, parseInt(delay));
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  elements.forEach(el => observer.observe(el));
}

// ---- Skill Bar Animations ----
function initSkillBars() {
  const bars = document.querySelectorAll('.skill-fill');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const width = entry.target.getAttribute('data-width');
        entry.target.style.width = width + '%';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  bars.forEach(bar => observer.observe(bar));
}

// ---- Counter Animation ----
function initCounters() {
  const counters = document.querySelectorAll('.stat-number');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.getAttribute('data-count'));
        let count = 0;
        const step = target / 40;
        const interval = setInterval(() => {
          count += step;
          if (count >= target) {
            entry.target.textContent = target;
            clearInterval(interval);
          } else {
            entry.target.textContent = Math.floor(count);
          }
        }, 40);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => observer.observe(c));
}

// ---- Navbar Scroll Effect ----
function initNavbar() {
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
    updateActiveNavLink();
  });
}

function updateActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const scrollY = window.scrollY + 100;
  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    const link = document.querySelector(`.nav-link[href="#${id}"]`);
    if (link) {
      if (scrollY >= top && scrollY < top + height) {
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    }
  });
}

// ---- Mobile Menu ----
function initMobileMenu() {
  const toggle = document.getElementById('menuToggle');
  const menu = document.getElementById('mobileMenu');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('open');
      menu.classList.toggle('open');
      document.body.style.overflow = menu.classList.contains('open') ? 'hidden' : '';
    });
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        toggle.classList.remove('open');
        menu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }
}

// ---- Contact Form — Gmail Redirection & Prefilled Compose ----
function sendEmailJS(event) {
  if (event) event.preventDefault();
  const formEl  = document.getElementById('contactForm');
  const btn     = document.getElementById('sendMessageBtn');
  const success = document.getElementById('formSuccess');
  const error   = document.getElementById('formError');

  const senderName  = document.getElementById('senderName')?.value.trim() || 'Visitor';
  const senderEmail = document.getElementById('senderEmail')?.value.trim() || '';
  const subject     = document.getElementById('subject')?.value.trim() || 'Portfolio Inquiry';
  const message     = document.getElementById('message')?.value.trim() || '';

  if (!senderName || !senderEmail || !message) {
    if (error) {
      error.textContent = 'Please fill out all required fields (Name, Email, Message).';
      error.style.display = 'block';
    }
    return;
  }

  btn.disabled = true;
  btn.innerHTML = '<span>Opening Gmail Compose...</span>';
  btn.style.background = 'linear-gradient(135deg,#ea4335,#c5221f)';
  if (error) error.style.display = 'none';

  // Format the email subject and body with the user's filled-in details
  const formattedSubject = `[Portfolio Contact] ${subject} - from ${senderName}`;
  const formattedBody    = `Hi George,\n\nMy Name: ${senderName}\nMy Email: ${senderEmail}\n\nMessage:\n${message}\n\n---\nSent from George Joseph Portfolio Website`;

  // 1. Gmail Web Compose URL (opens directly in Gmail web)
  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=georgejoseph1239@gmail.com&su=${encodeURIComponent(formattedSubject)}&body=${encodeURIComponent(formattedBody)}`;

  // 2. Native mailto fallback URL (triggers native Gmail / mail app on phones and PCs)
  const mailtoUrl = `mailto:georgejoseph1239@gmail.com?subject=${encodeURIComponent(formattedSubject)}&body=${encodeURIComponent(formattedBody)}`;

  // Open Gmail web compose in a new tab
  window.open(gmailUrl, '_blank');

  // Also trigger mailto URL as fallback for mobile apps
  setTimeout(() => {
    window.location.href = mailtoUrl;
  }, 400);

  if (success) {
    success.innerHTML = '✔ <strong>Gmail opened!</strong> All details pre-filled. Simply click <strong>Send</strong> in Gmail to deliver your message to George.';
    success.style.display = 'block';
  }

  setTimeout(() => {
    btn.disabled = false;
    btn.innerHTML = '<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.272H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L12 9.545l8.073-6.052C21.69 2.279 24 3.434 24 5.457z"/></svg><span>SEND VIA GMAIL APP / WEB</span>';
    btn.style.background = '';
  }, 5000);
}

// Backwards compatibility for form actions
function handleFormSubmit(e) { sendEmailJS(e); }


// ---- Smooth Scroll ----
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

// ---- Cursor Glow Effect ----
function initCursorGlow() {
  const glow = document.createElement('div');
  glow.style.cssText = `
    position:fixed; pointer-events:none; z-index:9999;
    width:300px; height:300px; border-radius:50%;
    background:radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%);
    transform:translate(-50%,-50%); transition:opacity 0.3s;
    top:-200px; left:-200px;
  `;
  document.body.appendChild(glow);
  document.addEventListener('mousemove', e => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
  });
}

// ---- Patent Seal Hover ----
function initPatentSeal() {
  const seal = document.querySelector('.seal-outer');
  if (seal) {
    seal.addEventListener('mouseenter', () => {
      seal.style.transform = 'scale(1.1) rotate(10deg)';
      seal.style.transition = 'transform 0.4s ease';
    });
    seal.addEventListener('mouseleave', () => {
      seal.style.transform = 'scale(1) rotate(0deg)';
    });
  }
}

// ---- Card Tilt Effect ----
function initCardTilt() {
  document.querySelectorAll('.project-card, .achievement-card, .interest-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const rotX = (y - cy) / cy * -5;
      const rotY = (x - cx) / cx * 5;
      card.style.transform = `translateY(-8px) perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

// ---- Initialize Everything ----
document.addEventListener('DOMContentLoaded', () => {
  initCanvas();
  createParticles();
  typeWriter();
  initScrollAnimations();
  initSkillBars();
  initCounters();
  initNavbar();
  initMobileMenu();
  initSmoothScroll();
  initCursorGlow();
  initPatentSeal();
  initCardTilt();
});
