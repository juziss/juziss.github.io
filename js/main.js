(function () {
  function startSparkleTrail() {
    var layer = document.getElementById('sparkle-layer');
    if (!layer) return;
    var glyphs = ['✦', '✧', '❊', '✿', '✩'];
    var colors = ['#C98BA3', '#A24C67', '#9FB694', '#E0B4C4'];
    var last = 0;
    window.addEventListener('mousemove', function (e) {
      var now = Date.now();
      if (now - last < 70) return;
      last = now;
      var s = document.createElement('span');
      s.className = 'sparkle-particle';
      s.textContent = glyphs[(Math.random() * glyphs.length) | 0];
      s.style.left = (e.clientX + (Math.random() * 18 - 9)) + 'px';
      s.style.top = (e.clientY + (Math.random() * 18 - 9)) + 'px';
      s.style.fontSize = (10 + Math.random() * 14) + 'px';
      s.style.color = colors[(Math.random() * colors.length) | 0];
      layer.appendChild(s);
      setTimeout(function () { s.remove(); }, 1000);
    }, { passive: true });
  }

  function setLang(lang) {
    document.body.classList.toggle('lang-is-en', lang === 'en');
    document.querySelectorAll('[data-langlabel]').forEach(function (el) {
      el.textContent = lang === 'pt' ? 'EN' : 'PT';
    });
    document.querySelectorAll('[data-pt-ph]').forEach(function (el) {
      el.placeholder = el.getAttribute(lang === 'pt' ? 'data-pt-ph' : 'data-en-ph');
    });
  }

  function initLangToggle() {
    var lang = 'pt';
    setLang(lang);
    document.querySelectorAll('[data-lang-toggle]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        lang = lang === 'pt' ? 'en' : 'pt';
        setLang(lang);
      });
    });
  }

  function initMobileMenu() {
    var menuBtn = document.querySelector('[data-menu-toggle]');
    var nav = document.querySelector('.site-nav');
    if (!menuBtn || !nav) return;
    menuBtn.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      document.querySelectorAll('[data-menulabel]').forEach(function (el) {
        el.textContent = open ? 'fechar' : 'menu';
      });
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) {
        nav.classList.remove('is-open');
        document.querySelectorAll('[data-menulabel]').forEach(function (el) {
          el.textContent = 'menu';
        });
      }
    });
  }

  function initContactForm() {
    var form = document.querySelector('.contact-form');
    if (!form) return;
    form.addEventListener('submit', function (e) { e.preventDefault(); });
  }

  document.addEventListener('DOMContentLoaded', function () {
    startSparkleTrail();
    initLangToggle();
    initMobileMenu();
    initContactForm();
  });
})();
