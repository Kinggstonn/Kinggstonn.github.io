document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu functionality
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', function() {
      navLinks.classList.toggle('active');
      mobileMenuToggle.classList.toggle('active');
    });
  }

  // Smooth scrolling for navigation links
  const allNavLinks = document.querySelectorAll('.nav-link');
  allNavLinks.forEach(function(link) {
    link.addEventListener('click', function(e) {
      const href = link.getAttribute('href');
      // Ensure it's an internal link
      if (href && href.startsWith('#')) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          
          // Close mobile menu if open
          if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
          }
          
          window.scrollTo({
            top: target.offsetTop - 80, 
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // Header scroll effect
  const header = document.querySelector('.main-header');
  let lastScrollTop = 0;
  
  window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
      header.style.background = 'rgba(10, 10, 10, 0.98)';
      header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
    } else {
      header.style.background = 'rgba(10, 10, 10, 0.95)';
      header.style.boxShadow = 'none';
    }
    
    lastScrollTop = scrollTop;
  });

  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
      }
    });
  }, observerOptions);

  // Observe all sections and cards
  const sections = document.querySelectorAll('section');
  const projectCards = document.querySelectorAll('.project-card');
  const skillItems = document.querySelectorAll('.skill-item');
  
  sections.forEach(section => observer.observe(section));
  projectCards.forEach(card => observer.observe(card));
  skillItems.forEach(item => observer.observe(item));

  // Enhanced neon mouse trail effect
  const body = document.querySelector('body');
  let trailCount = 0;
  const maxTrails = 20;
  
  body.addEventListener('mousemove', (e) => {
    if (trailCount >= maxTrails) return;
    
    const trail = document.createElement('div');
    trail.className = 'trail';
    trail.style.left = `${e.pageX}px`;
    trail.style.top = `${e.pageY}px`;
    
    // Random trail color
    const colors = ['#4a90e2', '#64b5f6', '#ff6b6b', '#4ecdc4'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    trail.style.background = randomColor;
    
    body.appendChild(trail);
    trailCount++;

    setTimeout(() => {
      trail.remove();
      trailCount--;
    }, 800);
  });

  // Disable parallax to keep background fixed

  // Typing effect for hero title
  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle) {
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    
    let i = 0;
    const typeWriter = () => {
      if (i < text.length) {
        heroTitle.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
      }
    };
    
    // Start typing after a delay
    setTimeout(typeWriter, 1500);
  }

  // Add hover effects to buttons
  const buttons = document.querySelectorAll('.btn');
  buttons.forEach(button => {
    button.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-3px) scale(1.05)';
    });
    
    button.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });

  // Add click ripple effect to buttons
  buttons.forEach(button => {
    button.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      ripple.classList.add('ripple');
      
      this.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });

  // Smooth reveal animation for project cards
  const revealCards = () => {
    const cards = document.querySelectorAll('.project-card');
    cards.forEach((card, index) => {
      setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, index * 200);
    });
  };

  // Initialize card animations
  setTimeout(revealCards, 1000);

  // Add scroll progress indicator
  const progressBar = document.createElement('div');
  progressBar.className = 'scroll-progress';
  document.body.appendChild(progressBar);

  window.addEventListener('scroll', () => {
    const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    progressBar.style.width = scrolled + '%';
  });

  const audio = document.getElementById('mp-audio');
  const player = document.getElementById('music-player');
  const btnPlay = player.querySelector('.mp-play');
  const btnMute = player.querySelector('.mp-mute');
  const btnToggle = player.querySelector('.mp-toggle');
  const titleEl = document.getElementById('mp-title');
  const progress = document.getElementById('mp-progress');
  const timeEl = document.getElementById('mp-time');

  // Local track list
  const tracks = [
    { title: 'Euphoria', src: 'icon/music/Euphoria.mp3' }
  ];
  let currentIndex = 0;

  function loadTrack(index) {
    const track = tracks[index];
    if (!track) return;
    audio.src = track.src;
    audio.loop = true;
    titleEl.textContent = track.title;
    progress.value = 0;
  }

  function playPause() {
    if (audio.paused) {
      audio.play();
      player.classList.add('playing');
      
    } else {
      audio.pause();
      player.classList.remove('playing');
      
    }
  }

  function nextTrack() {
    currentIndex = (currentIndex + 1) % tracks.length;
    loadTrack(currentIndex);
    audio.play();
    player.classList.add('playing');
  }

  function prevTrack() {
    currentIndex = (currentIndex - 1 + tracks.length) % tracks.length;
    loadTrack(currentIndex);
    audio.play();
    player.classList.add('playing');
  }

  btnPlay.addEventListener('click', playPause);
  // removed next/prev controls
  btnToggle && btnToggle.addEventListener('click', () => {
    player.classList.toggle('collapsed');
  });

  // Simple mute/unmute functionality
  let isMuted = false;
  const originalVolume = 0.5; // Default volume 50%
  
  btnMute.addEventListener('click', () => {
    if (isMuted) {
      // Unmute
      audio.volume = originalVolume;
      btnMute.innerHTML = `<svg class="icon-volume" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path fill="currentColor" d="M3 10v4h4l5 5V5L7 10H3zm13.5 2a4.5 4.5 0 00-2.25-3.91v7.82A4.5 4.5 0 0016.5 12zm0-9v2a9 9 0 010 14v2c6-2.25 8-9 0-18z"/></svg>`;
      isMuted = false;
    } else {
      // Mute
      audio.volume = 0;
      btnMute.innerHTML = `<svg class="icon-volume-off" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path fill="currentColor" d="M16.5 12c0-1.77-1.02-3.31-2.5-4.04v2.21l2.45 2.45c.03-.2.05-.41.05-.62zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/></svg>`;
      isMuted = true;
    }
  });
  
  // Set initial volume
  audio.volume = originalVolume;

  // Format time helper
  const fmt = (sec) => {
    if (!isFinite(sec)) return '--:--';
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  // Update progress bar and time
  const updateProgress = () => {
    if (!isNaN(audio.duration) && isFinite(audio.duration)) {
      progress.value = (audio.currentTime / audio.duration) * 100;
      if (timeEl) timeEl.textContent = `${fmt(audio.currentTime)} / ${fmt(audio.duration)}`;
    } else {
      if (timeEl) timeEl.textContent = `${fmt(audio.currentTime)} / --:--`;
    }
  };
  audio.addEventListener('timeupdate', updateProgress);
  audio.addEventListener('loadedmetadata', updateProgress);

  // Seek when user drags
  progress.addEventListener('input', () => {
    if (!isNaN(audio.duration)) {
      audio.currentTime = (progress.value / 100) * audio.duration;
    }
  });

  loadTrack(currentIndex);

  // ===== Click to Enter Overlay =====
  const entryOverlay = document.getElementById('entry-overlay');
  
  // Ensure entry overlay is visible by default
  if (entryOverlay) {
    entryOverlay.style.display = 'flex';
    entryOverlay.style.opacity = '1';
  }
  
  const dismissOverlay = () => {
    console.log('Dismissing overlay...');
    if (entryOverlay) {
      entryOverlay.style.transition = 'opacity 300ms ease';
      entryOverlay.style.opacity = '0';
      setTimeout(() => { 
        entryOverlay.style.display = 'none'; 
        console.log('Overlay hidden');
      }, 320);
    }
    // Start playback after entry
    if (!isMuted) {
      audio.volume = originalVolume;
    }
    audio.muted = false;
    player.classList.remove('muted');
    audio.play().then(() => {
      player.classList.add('playing');
    }).catch(() => {});
  };
  
  if (entryOverlay) {
    const overlayClick = (e) => {
      // Prevent multiple rapid triggers
      if (entryOverlay._closing) return;
      entryOverlay._closing = true;
      endSnowAndHide();
      dismissOverlay();
    };
    entryOverlay.addEventListener('click', overlayClick);
    entryOverlay.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') overlayClick(e);
    });
  }

  // ===== Snowfall Effect =====
  // Snow only while overlay is visible
  const snowCanvas = document.getElementById('snow-canvas');
  let snowStop = null;
  const startSnow = () => {
    console.log('Starting snow effect...');
    if (!snowCanvas) {
      console.log('Snow canvas not found!');
      return;
    }
    
    const ctx = snowCanvas.getContext('2d');
    if (!ctx) {
      console.log('Could not get 2D context!');
      return;
    }
    
    const flakes = [];
    let width = window.innerWidth;
    let height = window.innerHeight;
    
    // Set canvas size with device pixel ratio for crisp rendering
    const dpr = window.devicePixelRatio || 1;
    snowCanvas.width = width * dpr;
    snowCanvas.height = height * dpr;
    snowCanvas.style.width = width + 'px';
    snowCanvas.style.height = height + 'px';
    ctx.scale(dpr, dpr);
    
    const numFlakes = Math.min(160, Math.floor(width / 10));
    const rand = (min, max) => Math.random() * (max - min) + min;
    const createFlake = () => ({ 
      x: rand(0, width), 
      y: rand(-height, 0), 
      r: rand(1, 3.5), 
      d: rand(0.5, 1.5), 
      a: rand(0, Math.PI * 2), 
      sway: rand(0.5, 2.0) 
    });
    
    for (let i = 0; i < numFlakes; i++) {
      flakes.push(createFlake());
    }

    let rafId;
    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = 'rgba(255,255,255,0.9)';
      ctx.beginPath();
      
      for (const f of flakes) { 
        ctx.moveTo(f.x, f.y); 
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2); 
      }
      ctx.fill();
      
      for (const f of flakes) { 
        f.y += f.d; 
        f.a += 0.01 * f.sway; 
        f.x += Math.sin(f.a) * 0.6; 
        if (f.y > height + 5) { 
          f.x = rand(0, width); 
          f.y = -5; 
        } 
        if (f.x > width + 5) f.x = -5; 
        if (f.x < -5) f.x = width + 5; 
      }
      
      rafId = requestAnimationFrame(draw);
    };
    
    const onResize = () => { 
      width = window.innerWidth;
      height = window.innerHeight;
      snowCanvas.width = width * dpr;
      snowCanvas.height = height * dpr;
      snowCanvas.style.width = width + 'px';
      snowCanvas.style.height = height + 'px';
      ctx.scale(dpr, dpr);
    };
    
    window.addEventListener('resize', onResize);
    draw();
    
    snowStop = () => { 
      cancelAnimationFrame(rafId); 
      window.removeEventListener('resize', onResize); 
      ctx.clearRect(0, 0, width, height); 
    };
  };

  // Start snow effect immediately when page loads
  if (entryOverlay) {
    console.log('Entry overlay found, starting snow effect...');
    startSnow();
  } else {
    console.log('Entry overlay not found!');
  }
  
  function endSnowAndHide() { 
    if (snowStop) snowStop(); 
  }
});

// Add CSS for new features
const style = document.createElement('style');
style.textContent = `
  .scroll-progress {
    position: fixed;
    top: 0;
    left: 0;
    width: 0%;
    height: 3px;
    background: linear-gradient(90deg, #4a90e2, #64b5f6);
    z-index: 10000;
    transition: width 0.1s ease;
  }

  .ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    transform: scale(0);
    animation: ripple-animation 0.6s linear;
    pointer-events: none;
  }

  @keyframes ripple-animation {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }

  .animate-in {
    animation: slideInUp 0.8s ease forwards;
  }

  @keyframes slideInUp {
    from {
      opacity: 0;
      transform: translateY(50px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .mobile-menu-toggle.active span:nth-child(1) {
    transform: rotate(45deg) translate(5px, 5px);
  }

  .mobile-menu-toggle.active span:nth-child(2) {
    opacity: 0;
  }

  .mobile-menu-toggle.active span:nth-child(3) {
    transform: rotate(-45deg) translate(7px, -6px);
  }

  @media (max-width: 768px) {
    .nav-links {
      display: none;
    }
    
    .nav-links.active {
      display: flex;
      flex-direction: column;
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      background: rgba(10, 10, 10, 0.98);
      backdrop-filter: blur(20px);
      border-top: 1px solid var(--border-color);
      padding: 20px;
      gap: 20px;
    }
  }
`;
document.head.appendChild(style);
