(function () {
  var banner = document.querySelector('.banner');
  if (!banner) return;
  var slides = Array.prototype.slice.call(banner.querySelectorAll('.slide'));
  var index = slides.findIndex(function (s) { return s.classList.contains('active'); });
  if (index < 0) index = 0;

  function show(i) {
    slides.forEach(function (s, idx) { s.classList.toggle('active', idx === i); });
    index = i;
  }

  function next() { show((index + 1) % slides.length); }
  function prev() { show((index - 1 + slides.length) % slides.length); }

  var nextBtn = banner.querySelector('.next');
  var prevBtn = banner.querySelector('.prev');
  if (nextBtn) nextBtn.addEventListener('click', next);
  if (prevBtn) prevBtn.addEventListener('click', prev);

  var timer = setInterval(next, 5000);
  banner.addEventListener('mouseenter', function () { clearInterval(timer); });
  banner.addEventListener('mouseleave', function () { timer = setInterval(next, 5000); });
})();



