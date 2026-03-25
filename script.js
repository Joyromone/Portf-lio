    // ── Nav scroll ──
    const nav = document.getElementById('nav');
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 20);
    });

    // ── Reveal on scroll ──
    const reveals = document.querySelectorAll('.reveal');
    const ro = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); ro.unobserve(e.target); } });
    }, { threshold: 0.12 });
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
