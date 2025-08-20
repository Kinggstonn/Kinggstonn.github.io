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
  const volume = document.getElementById('mp-volume');
  let userPaused = false;

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
      audio.play().then(() => {
        userPaused = false;
        syncPlayingClass(); // Sync UI after successful play
      }).catch(() => {
        syncPlayingClass(); // Sync UI even if play fails
      });
    } else {
      audio.pause();
      userPaused = true;
      syncPlayingClass(); // Sync UI after pause
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

  // Clicking the volume button only toggles the popup; no mute
  btnMute.addEventListener('click', () => {
    const open = player.classList.toggle('volume-open');
    if (player._volTimer) clearTimeout(player._volTimer);
    if (open) {
      player._volTimer = setTimeout(() => player.classList.remove('volume-open'), 1500);
    }
  });

  // Keep popup open while hovering over it; hide 1.5s after leave
  const volumePop = document.querySelector('.mp-volume-pop');
  if (volumePop) {
    volumePop.addEventListener('mouseenter', () => {
      if (player._volTimer) clearTimeout(player._volTimer);
      player.classList.add('volume-open');
    });
    volumePop.addEventListener('mouseleave', () => {
      if (player._volTimer) clearTimeout(player._volTimer);
      player._volTimer = setTimeout(() => player.classList.remove('volume-open'), 1500);
    });
  }

  // Volume control: 0..100 mapped to 0..1
  if (volume) {
    const applyVolume = () => {
      const raw = Number(volume.value);
      const clamped = Math.min(100, Math.max(0, isNaN(raw) ? 75 : raw));
      audio.volume = clamped / 100;
    };
    volume.addEventListener('input', applyVolume);
    volume.addEventListener('change', applyVolume);
    // set initial volume from slider value
    applyVolume();
  }

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
  // Autoplay on load (muted for browser policy)
  audio.muted = true;
  audio.play().then(() => {
    syncPlayingClass(); // Use sync function instead of manual class manipulation
  }).catch(() => {
    syncPlayingClass(); // Sync even if autoplay fails
  });

  // Robust autoplay attempts when media becomes ready/visible
  const tryPlayMuted = () => {
    if (document.visibilityState !== 'visible') return;
    if (!audio.paused || userPaused) return;
    audio.muted = true;
    audio.play().then(() => {
      syncPlayingClass(); // Use sync function instead of manual class manipulation
    }).catch(() => {
      syncPlayingClass(); // Sync even if autoplay fails
    });
  };
  document.addEventListener('visibilitychange', tryPlayMuted);
  audio.addEventListener('loadedmetadata', tryPlayMuted);
  audio.addEventListener('canplay', tryPlayMuted);
  setTimeout(tryPlayMuted, 600);

  // Unmute on first user interaction so sound can be heard
  const unmuteOnFirstInteract = () => {
    audio.muted = false;
    if (audio.paused && !userPaused) {
      audio.play().catch(() => {});
    }
    window.removeEventListener('pointerdown', unmuteOnFirstInteract);
    window.removeEventListener('keydown', unmuteOnFirstInteract);
    window.removeEventListener('touchstart', unmuteOnFirstInteract);
  };
  window.addEventListener('pointerdown', unmuteOnFirstInteract, { once: true, passive: true });
  window.addEventListener('keydown', unmuteOnFirstInteract, { once: true });
  window.addEventListener('touchstart', unmuteOnFirstInteract, { once: true, passive: true });
  
  // Keep UI icon in sync with real playback state
  const syncPlayingClass = () => {
    const isActuallyPlaying = !audio.paused && !audio.ended && !audio.muted;
    player.classList.toggle('playing', isActuallyPlaying);
    
    // Update play button icon to match actual state
    if (btnPlay) {
      btnPlay.innerHTML = isActuallyPlaying ? 
        '<i class="fas fa-pause"></i>' : 
        '<i class="fas fa-play"></i>';
    }
  };
  
  // Listen to all relevant audio events
  audio.addEventListener('play', syncPlayingClass);
  audio.addEventListener('pause', syncPlayingClass);
  audio.addEventListener('ended', syncPlayingClass);
  audio.addEventListener('seeking', syncPlayingClass);
  audio.addEventListener('ratechange', syncPlayingClass);
  audio.addEventListener('volumechange', syncPlayingClass);
  audio.addEventListener('loadedmetadata', syncPlayingClass);
  
  // Initial sync in case autoplay was blocked or delayed
  syncPlayingClass();
  
  // Also sync when user manually controls
  btnPlay.addEventListener('click', () => {
    setTimeout(syncPlayingClass, 50); // Small delay to ensure audio state has updated
  });
  
  // ===== Click to Enter Overlay (disabled) =====
  // const entryOverlay = document.getElementById('entry-overlay');
  // const enterBtn = document.getElementById('enter-btn');
  // const dismissOverlay = () => {
  //   if (entryOverlay) {
  //     entryOverlay.style.transition = 'opacity 300ms ease';
  //     entryOverlay.style.display = 'flex';
  //     requestAnimationFrame(() => {
  //       entryOverlay.style.opacity = '0';
  //       setTimeout(() => { entryOverlay.style.display = 'none'; }, 320);
  //     });
  //   }
  //   audio.muted = false;
  //   player.classList.remove('muted');
  //   audio.play().then(() => { player.classList.add('playing'); }).catch(() => {});
  // };
  // if (enterBtn) {
  //   enterBtn.addEventListener('click', () => { endSnowAndHide(); dismissOverlay(); });
  // }
  // if (entryOverlay) {
  //   const overlayClick = (e) => {
  //     if (entryOverlay._closing) return;
  //     entryOverlay._closing = true;
  //     endSnowAndHide();
  //     dismissOverlay();
  //   };
  //   entryOverlay.addEventListener('click', overlayClick);
  //   entryOverlay.addEventListener('keydown', (e) => {
  //     if (e.key === 'Enter' || e.key === ' ') overlayClick(e);
  //   });
  // }

  // ===== Snowfall Effect (disabled) =====
  // const snowCanvas = document.getElementById('snow-canvas');
  // let snowStop = null;
  // const startSnow = () => { /* ... */ };
  // if (entryOverlay && entryOverlay.style.display !== 'none') { startSnow(); }
  // function endSnowAndHide() { if (snowStop) snowStop(); }
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
