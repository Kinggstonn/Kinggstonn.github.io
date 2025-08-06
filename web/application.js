// Hiệu ứng nhỏ: Thông báo khi click vào nút

document.addEventListener('DOMContentLoaded', function() {
  var orgBtn = document.querySelector('.btn:not(.secondary)');
  var projBtn = document.querySelector('.btn.secondary');

  if (orgBtn) {
    orgBtn.addEventListener('click', function(e) {
      e.preventDefault();
      alert('Tạo trang cho tổ chức! (Demo)');
    });
  }
  if (projBtn) {
    projBtn.addEventListener('click', function(e) {
      e.preventDefault();
      alert('Tạo trang cho dự án! (Demo)');
    });
  }

  // Hiệu ứng scroll mượt cho navbar
  var navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(function(link) {
    link.addEventListener('click', function(e) {
      var href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        var target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });
});