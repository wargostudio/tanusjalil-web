(function () {
  // Menú móvil
  var toggle = document.querySelector('.menu-toggle');
  if (toggle) {
    toggle.addEventListener('click', function () {
      var open = document.body.classList.toggle('nav-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    var closeNav = function () {
      document.body.classList.remove('nav-open');
      toggle.setAttribute('aria-expanded', 'false');
    };
    document.addEventListener('click', function (e) {
      if (document.body.classList.contains('nav-open') && !e.target.closest('.main-nav') && !e.target.closest('.menu-toggle')) {
        closeNav();
      }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeNav();
    });
    document.querySelectorAll('.main-nav a').forEach(function (a) {
      a.addEventListener('click', closeNav);
    });
  }

  // Slider principal
  var slides = document.querySelectorAll('.hero .slide');
  var dots = document.querySelectorAll('.hero .dot');
  if (slides.length) {
    var current = 0, timer;
    var go = function (i) {
      slides[current].classList.remove('is-active');
      dots[current].classList.remove('is-active');
      current = (i + slides.length) % slides.length;
      slides[current].classList.add('is-active');
      dots[current].classList.add('is-active');
    };
    var start = function () { clearInterval(timer); timer = setInterval(function () { go(current + 1); }, 6000); };
    dots.forEach(function (d, i) { d.addEventListener('click', function () { go(i); start(); }); });
    start();
  }

  // Carrusel de clientes (3 visibles, avanza de a uno, en bucle)
  document.querySelectorAll('.carousel').forEach(function (c) {
    var track = c.querySelector('.carousel-track');
    var items = Array.prototype.slice.call(track.children);
    if (!items.length) return;
    items.forEach(function (it) { track.appendChild(it.cloneNode(true)); });
    var idx = 0, delay = parseInt(c.dataset.autoplay, 10) || 2500;
    setInterval(function () {
      idx++;
      var w = track.children[0].getBoundingClientRect().width;
      track.style.transition = 'transform .8s ease';
      track.style.transform = 'translateX(' + (-idx * w) + 'px)';
      if (idx === items.length) {
        setTimeout(function () {
          track.style.transition = 'none';
          track.style.transform = 'translateX(0)';
          idx = 0;
        }, 850);
      }
    }, delay);
  });

  // Filtros de productos
  var filterBtns = document.querySelectorAll('.filters button');
  var cards = document.querySelectorAll('.prod-card');
  var applyFilter = function (cat) {
    filterBtns.forEach(function (b) { b.classList.toggle('is-active', b.dataset.filter === cat); });
    cards.forEach(function (card) { card.classList.toggle('is-hidden', cat !== '*' && card.dataset.cat !== cat); });
  };
  filterBtns.forEach(function (b) {
    b.addEventListener('click', function () {
      applyFilter(b.dataset.filter);
      history.replaceState(null, '', b.dataset.filter === '*' ? location.pathname : '#' + b.dataset.filter);
    });
  });
  if (filterBtns.length && location.hash) {
    var h = location.hash.slice(1);
    if (document.querySelector('.filters button[data-filter="' + h + '"]')) applyFilter(h);
  }

  // Contadores (página Nosotros)
  var countUp = function (el) {
    var target = parseInt(el.dataset.target, 10), t0 = null, dur = 3000;
    var step = function (ts) {
      if (!t0) t0 = ts;
      var p = Math.min((ts - t0) / dur, 1);
      el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  // Aparición al hacer scroll (comprueba la posición de cada bloque)
  var pending = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
  var ticking = false;
  var check = function () {
    ticking = false;
    var limit = window.innerHeight * 0.92;
    pending = pending.filter(function (el) {
      if (el.getBoundingClientRect().top > limit) return true;
      el.classList.add('is-in');
      el.querySelectorAll('.counter').forEach(countUp);
      return false;
    });
  };
  var onScroll = function () { if (!ticking) { ticking = true; requestAnimationFrame(check); } };
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  check();

  // Botón de WhatsApp (aparece a los 3 segundos, como en el original)
  var wa = document.querySelector('.whatsapp');
  if (wa) setTimeout(function () { wa.classList.add('is-visible'); }, 3000);
})();
