document.addEventListener('DOMContentLoaded', function() {
  // Smooth scrolling for navigation links
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(function(link) {
    link.addEventListener('click', function(e) {
      const href = link.getAttribute('href');
      // Ensure it's an internal link
      if (href && href.startsWith('#')) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          window.scrollTo({
            top: target.offsetTop - 70, // Adjust for sticky header height
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // Neon mouse trail effect
  const body = document.querySelector('body');
  body.addEventListener('mousemove', (e) => {
    const trail = document.createElement('div');
    trail.className = 'trail';
    // Sử dụng pageX/pageY để tọa độ chính xác ngay cả khi cuộn trang
    trail.style.left = `${e.pageX}px`;
    trail.style.top = `${e.pageY}px`;

    body.appendChild(trail);

    // Xóa phần tử vệt sáng sau khi animation kết thúc (600ms)
    // để tránh làm chậm trang web.
    setTimeout(() => {
      trail.remove();
    }, 600);
  });
});