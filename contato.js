const nav = document.getElementById('nav');
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 20);
    });
    const reveals = document.querySelectorAll('.reveal');
    const ro = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); ro.unobserve(e.target); } });
    }, { threshold: 0.08 });
    reveals.forEach(el => ro.observe(el));
    const langToggle = document.getElementById('langToggle');
    if (langToggle) {
      langToggle.addEventListener('click', e => { e.stopPropagation(); langToggle.classList.toggle('open'); });
      document.addEventListener('click', () => langToggle.classList.remove('open'));
      langToggle.querySelectorAll('.nav__lang-option').forEach(btn => {
        btn.addEventListener('click', e => {
          e.stopPropagation();
          langToggle.querySelectorAll('.nav__lang-option').forEach(b => b.classList.remove('nav__lang-option--active'));
          btn.classList.add('nav__lang-option--active');
          langToggle.querySelector('.nav__lang-current').textContent = btn.dataset.lang.toUpperCase();
          langToggle.classList.remove('open');
        });
      });
    }