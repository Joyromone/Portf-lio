// ── Nav scroll ──
    const nav = document.getElementById('nav');
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 20);
    });

    // ── Reveal on scroll ──
    const reveals = document.querySelectorAll('.reveal');
    const ro = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          ro.unobserve(e.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(el => ro.observe(el));

    // ── Modal ──
    let currentCase = 0;
    const totalCases = 3;

    function openModal(index) {
      currentCase = index;
      document.querySelectorAll('.modal__case').forEach((c, i) => {
        c.classList.toggle('active', i === index);
      });
      document.getElementById('modalCounter').textContent = `${index + 1} / ${totalCases}`;
      document.getElementById('modalBody').scrollTop = 0;
      document.getElementById('modalOverlay').classList.add('active');
      document.body.style.overflow = 'hidden';
      updateNavBtns();
    }

    function closeModal() {
      document.getElementById('modalOverlay').classList.remove('active');
      document.body.style.overflow = '';
    }

    function navigateModal(dir) {
      const next = (currentCase + dir + totalCases) % totalCases;
      openModal(next);
    }

    function updateNavBtns() {
      document.getElementById('modalPrev').style.opacity = currentCase === 0 ? '.3' : '1';
      document.getElementById('modalNext').style.opacity = currentCase === totalCases - 1 ? '.3' : '1';
    }

    function handleOverlayClick(e) {
      if (e.target === document.getElementById('modalOverlay')) closeModal();
    }

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowRight') navigateModal(1);
      if (e.key === 'ArrowLeft') navigateModal(-1);
    });

    // ── Language dropdown ──
    const langToggle = document.getElementById('langToggle');
    if (langToggle) {
      langToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        langToggle.classList.toggle('open');
      });
      document.addEventListener('click', () => langToggle.classList.remove('open'));
      langToggle.querySelectorAll('.nav__lang-option').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          langToggle.querySelectorAll('.nav__lang-option').forEach(b => b.classList.remove('nav__lang-option--active'));
          btn.classList.add('nav__lang-option--active');
          langToggle.querySelector('.nav__lang-current').innerHTML = btn.innerHTML;
          langToggle.classList.remove('open');
          // TODO: implement translation when content is ready
        });
      });
    }
    // ── Rotating hero role ──
    const roles = ['Product Designer', 'UX/UI Designer', 'Chapter Leader · Ladies That UX Maceió'];
    let roleIndex = 0;
    const roleEl = document.getElementById('heroRole');
    if (roleEl) {
      roleEl.classList.add('fade-in');
      setInterval(() => {
        roleEl.classList.add('fade-out');
        roleEl.classList.remove('fade-in');
        setTimeout(() => {
          roleIndex = (roleIndex + 1) % roles.length;
          roleEl.textContent = roles[roleIndex];
          roleEl.classList.remove('fade-out');
          roleEl.classList.add('fade-in');
        }, 380);
      }, 2800);
    }
    // ── Personas carousel ──
    let personasIdx = 0;
    function slidePersonas(dir) {
      const track = document.getElementById('personasTrack');
      const dots = document.querySelectorAll('#personasDots .personas-carousel__dot');
      if (!track) return;
      const total = track.children.length;
      personasIdx = (personasIdx + dir + total) % total;
      track.style.transform = `translateX(-${personasIdx * 100}%)`;
      dots.forEach((d, i) => d.classList.toggle('active', i === personasIdx));
    }