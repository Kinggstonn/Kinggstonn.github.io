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
            top: target.offsetTop - 80, // Adjust for sticky header height
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

  // ===== Mini Music Player =====
  const audio = document.getElementById('mp-audio');
  const player = document.getElementById('music-player');
  const btnPlay = player.querySelector('.mp-play');
  const btnMute = player.querySelector('.mp-mute');
  const btnToggle = player.querySelector('.mp-toggle');
  const titleEl = document.getElementById('mp-title');
  const progress = document.getElementById('mp-progress');
  const volume = document.getElementById('mp-volume');

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

  btnMute.addEventListener('click', () => {
    audio.muted = !audio.muted;
    player.classList.toggle('muted', audio.muted);
  });

  // Update progress bar
  audio.addEventListener('timeupdate', () => {
    if (!isNaN(audio.duration)) {
      progress.value = (audio.currentTime / audio.duration) * 100;
    }
  });

  // Seek when user drags
  progress.addEventListener('input', () => {
    if (!isNaN(audio.duration)) {
      audio.currentTime = (progress.value / 100) * audio.duration;
    }
  });

  // Volume control
  if (volume) {
    volume.addEventListener('input', () => {
      const val = Math.min(100, Math.max(0, Number(volume.value)));
      audio.volume = val / 100;
    });
    audio.volume = Number(volume.value) / 100;
  }

  // loop handled by audio.loop = true

  // Initialize
  loadTrack(currentIndex);
  
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