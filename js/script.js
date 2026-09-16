/**
 * AWS EC2 Web Server Portfolio Project
 * Vanilla JavaScript interactions: Theme Toggle, Mobile Menu, Scroll Spy, Copy Commands & Animations
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initMobileMenu();
  initScrollSpy();
  initScrollAnimations();
  initCopyButtons();
  initBackToTop();
});

/* ==========================================================================
   1. Theme Toggle (Dark / Light Mode)
   ========================================================================== */
function initThemeToggle() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  if (!themeToggleBtn) return;

  const currentTheme = localStorage.getItem('ec2_portfolio_theme') || 
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

  setTheme(currentTheme);

  themeToggleBtn.addEventListener('click', () => {
    const activeTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    showToast(`Switched to ${newTheme} mode`);
  });
}

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('ec2_portfolio_theme', theme);
  
  const icon = document.getElementById('theme-icon');
  if (icon) {
    if (theme === 'dark') {
      // Show Sun icon for switching to light
      icon.innerHTML = `<path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`;
      icon.setAttribute('aria-label', 'Switch to light mode');
    } else {
      // Show Moon icon for switching to dark
      icon.innerHTML = `<path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`;
      icon.setAttribute('aria-label', 'Switch to dark mode');
    }
  }
}

/* ==========================================================================
   2. Mobile Navigation Menu
   ========================================================================== */
function initMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const navLinks = document.getElementById('nav-links');
  if (!menuBtn || !navLinks) return;

  menuBtn.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  // Close menu when clicking on any link
  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !menuBtn.contains(e.target) && navLinks.classList.contains('open')) {
      navLinks.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
    }
  });
}

/* ==========================================================================
   3. Active Navigation State & Smooth Scroll Spy
   ========================================================================== */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, {
    rootMargin: '-20% 0px -70% 0px'
  });

  sections.forEach(section => observer.observe(section));
}

/* ==========================================================================
   4. Scroll Reveal Animations
   ========================================================================== */
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('.fade-in-section');
  if (!animatedElements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15
  });

  animatedElements.forEach(el => observer.observe(el));
}

/* ==========================================================================
   5. Interactive Code Copy Snippets
   ========================================================================== */
function initCopyButtons() {
  const copyButtons = document.querySelectorAll('.copy-btn');

  copyButtons.forEach(btn => {
    btn.addEventListener('click', async () => {
      const codeTarget = btn.getAttribute('data-code');
      const textToCopy = codeTarget ? codeTarget : btn.closest('.code-box')?.querySelector('code')?.innerText;

      if (!textToCopy) return;

      try {
        await navigator.clipboard.writeText(textToCopy.trim());
        const originalText = btn.innerHTML;
        btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg> Copied!`;
        showToast('Command copied to clipboard');

        setTimeout(() => {
          btn.innerHTML = originalText;
        }, 2000);
      } catch (err) {
        showToast('Failed to copy command');
      }
    });
  });
}

/* ==========================================================================
   6. Back to Top Button
   ========================================================================== */
function initBackToTop() {
  const backToTopBtn = document.getElementById('back-to-top');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  }, { passive: true });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* ==========================================================================
   7. Toast Notification Utility
   ========================================================================== */
let toastTimeout;
function showToast(message) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg> <span>${message}</span>`;
  toast.classList.add('show');

  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 2500);
}


/* ==========================================================================
   8. 3D & Parallax Interactivity
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (isReducedMotion) return;

  // 1. Hero Parallax
  const heroSection = document.getElementById('hero');
  const heroVisual = document.getElementById('hero-3d-visual');
  const stackLayers = document.querySelectorAll('.stack-layer, .stack-connector');

  if (heroSection && heroVisual) {
    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;

    heroSection.addEventListener('mousemove', (e) => {
      if (window.innerWidth <= 768) {
        mouseX = 0; mouseY = 0; return;
      }
      const rect = heroSection.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      // Map to roughly -5deg to +5deg
      mouseX = (x / rect.width) * 10;
      mouseY = -(y / rect.height) * 10;
    });

    heroSection.addEventListener('mouseleave', () => {
      mouseX = 0;
      mouseY = 0;
    });

    const animateParallax = () => {
      currentX += (mouseX - currentX) * 0.1;
      currentY += (mouseY - currentY) * 0.1;

      heroVisual.style.transform = 
otateX(deg) rotateY(deg);
      
      stackLayers.forEach(layer => {
        const depth = parseFloat(layer.getAttribute('data-parallax-depth')) || 0;
        
        let baseZ = layer.classList.contains('layer-terminal') ? 40 : 20;
        if(layer.classList.contains('stack-connector')) baseZ = 0;
        
        layer.style.transform = 	ranslateZ(px) translateX(px) translateY(px);
      });

      requestAnimationFrame(animateParallax);
    };
    requestAnimationFrame(animateParallax);
  }

  // 2. 3D Card Tilt Effect
  const cards = document.querySelectorAll('.card, .service-card, .arch-node, .status-milestone, .tech-card');
  
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      if (window.innerWidth <= 768) return;
      
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -6;
      const rotateY = ((x - centerX) / centerX) * 6;
      
      card.style.transform = perspective(1000px) rotateX(deg) rotateY(deg) scale3d(1.02, 1.02, 1.02);
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1);
    });
  });

  // 3. Floating Background Elements
  const bgContainer = document.getElementById('floating-bg');
  if (bgContainer) {
    const numNodes = 12;
    for (let i = 0; i < numNodes; i++) {
      const node = document.createElement('div');
      node.className = 'floating-node';
      
      const size = Math.random() * 60 + 20;
      const posX = Math.random() * 100;
      const posY = Math.random() * 100;
      const delay = Math.random() * 10;
      const duration = Math.random() * 15 + 15;
      
      node.style.width = ${size}px;
      node.style.height = ${size}px;
      node.style.left = ${posX}%;
      node.style.top = ${posY}%;
      node.style.animationDelay = -s;
      node.style.animationDuration = ${duration}s;
      
      bgContainer.appendChild(node);
    }
  }
});
