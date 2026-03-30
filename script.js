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
    const totalCases = 4;

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
    // ── Mobile menu ──

    function setMobileLang(btn) {
      // Update mobile buttons
      document.querySelectorAll('.mobile-menu__lang-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      // Sync with desktop lang toggle
      const lang = btn.dataset.lang;
      const desktopOpts = document.querySelectorAll('#langDropdown .nav__lang-option');
      desktopOpts.forEach(b => {
        b.classList.toggle('nav__lang-option--active', b.dataset.lang === lang);
      });
      const current = document.querySelector('.nav__lang-current');
      const matched = document.querySelector('#langDropdown [data-lang="' + lang + '"]');
      if (current && matched) current.innerHTML = matched.innerHTML;
    }

    function toggleMobileMenu() {
      const menu = document.getElementById('mobileMenu');
      const btn = document.getElementById('navHamburger');
      const isOpen = menu.classList.toggle('open');
      btn.classList.toggle('open', isOpen);
      document.body.classList.toggle('menu-open', isOpen);
    }
    function closeMobileMenu() {
      document.getElementById('mobileMenu').classList.remove('open');
      document.getElementById('navHamburger').classList.remove('open');
      document.body.classList.remove('menu-open');
    }

    // ══════════════════════════════════════════
    // i18n — Traduções PT / EN / ES
    // ══════════════════════════════════════════
    const translations = {
      pt: {
        'nav.greeting': 'Boas vindas ao meu portfólio',
        'nav.projects': 'Projetos',
        'nav.about': 'Sobre mim',
        'nav.contact': 'Contato',
        'hero.label': 'OLÁ, EU SOU',
        'hero.sub': 'Trabalho na interseção entre design, tecnologia e negócios.<br>Valores que me movem: empatia, inclusão, colaboração e inovação.',
        'section.projects': 'Projetos',
        'projects.heading': 'Alguns projetos que tenho orgulho em ter trabalhado',
        'card.cta': 'Ver case →',
        'section.about': 'Sobre mim',
        'about.heading': 'Quem sou além do design',
        'about.history.title': 'Minha história',
        'interests.heading': 'Interesses',
        'cta.heading': 'Vamos conversar?',
        'cta.sub': 'Projetos, colaborações e outras ideias, dentro ou fora do design!',
        'cta.btn': 'Fale comigo ↗',
        'footer.made': 'feito por uma humana 🤍',
        'mobile.back': '← Início',
      },
      en: {
        'nav.greeting': 'Welcome to my portfolio',
        'nav.projects': 'Projects',
        'nav.about': 'About me',
        'nav.contact': 'Contact',
        'hero.label': 'HI, I AM',
        'hero.sub': 'I work at the intersection of design, technology and business.<br>Values that drive me: empathy, inclusion, collaboration and innovation.',
        'section.projects': 'Projects',
        'projects.heading': 'Some projects I am proud to have worked on',
        'card.cta': 'View case →',
        'section.about': 'About me',
        'about.heading': 'Who I am beyond design',
        'about.history.title': 'My story',
        'interests.heading': 'Interests',
        'cta.heading': "Let's talk?",
        'cta.sub': 'Projects, collaborations and other ideas — inside or outside design!',
        'cta.btn': 'Get in touch ↗',
        'footer.made': 'made by a human 🤍',
        'mobile.back': '← Home',
      },
      es: {
        'nav.greeting': 'Bienvenido a mi portafolio',
        'nav.projects': 'Proyectos',
        'nav.about': 'Sobre mí',
        'nav.contact': 'Contacto',
        'hero.label': 'HOLA, SOY',
        'hero.sub': 'Trabajo en la intersección entre diseño, tecnología y negocios.<br>Valores que me mueven: empatía, inclusión, colaboración e innovación.',
        'section.projects': 'Proyectos',
        'projects.heading': 'Algunos proyectos de los que me enorgullezco',
        'card.cta': 'Ver caso →',
        'section.about': 'Sobre mí',
        'about.heading': 'Quién soy más allá del diseño',
        'about.history.title': 'Mi historia',
        'interests.heading': 'Intereses',
        'cta.heading': '¿Hablamos?',
        'cta.sub': '¡Proyectos, colaboraciones y otras ideas, dentro o fuera del diseño!',
        'cta.btn': 'Contáctame ↗',
        'footer.made': 'hecho por una humana 🤍',
        'mobile.back': '← Inicio',
      }
    };

    let currentLang = 'pt';

    function applyLang(lang) {
      currentLang = lang;
      const t = translations[lang];
      if (!t) return;

      // Update all data-i18n elements
      document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (t[key] !== undefined) {
          el.innerHTML = t[key];
        }
      });

      // Update desktop lang toggle display
      const current = document.querySelector('.nav__lang-current');
      const flagMap = {
        pt: `<svg width="20" height="14" viewBox="0 0 20 14" xmlns="http://www.w3.org/2000/svg"><rect width="20" height="14" fill="#009c3b"/><polygon points="10,1.5 18.5,7 10,12.5 1.5,7" fill="#fedf00"/><circle cx="10" cy="7" r="3.2" fill="#002776"/></svg><span>PT</span>`,
        en: `<svg width="20" height="14" viewBox="0 0 24 16" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="16" fill="#012169"/><line x1="0" y1="0" x2="24" y2="16" stroke="white" stroke-width="2.5"/><line x1="24" y1="0" x2="0" y2="16" stroke="white" stroke-width="2.5"/><line x1="0" y1="0" x2="24" y2="16" stroke="#C8102E" stroke-width="1.5"/><line x1="24" y1="0" x2="0" y2="16" stroke="#C8102E" stroke-width="1.5"/><rect x="10" y="0" width="4" height="16" fill="white"/><rect x="0" y="6" width="24" height="4" fill="white"/><rect x="11" y="0" width="2" height="16" fill="#C8102E"/><rect x="0" y="7" width="24" height="2" fill="#C8102E"/></svg><span>EN</span>`,
        es: `<svg width="20" height="14" viewBox="0 0 24 16" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="16" fill="#c60b1e"/><rect y="3.5" width="24" height="9" fill="#ffc400"/></svg><span>ES</span>`
      };
      if (current && flagMap[lang]) current.innerHTML = flagMap[lang];

      // Update desktop lang option active state
      document.querySelectorAll('.nav__lang-option').forEach(btn => {
        btn.classList.toggle('nav__lang-option--active', btn.dataset.lang === lang);
      });

      // Update mobile lang buttons
      document.querySelectorAll('.mobile-menu__lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
      });

      // Save preference
      try { localStorage.setItem('joyce-lang', lang); } catch(e) {}
    }

    // Override lang toggle click to use applyLang
    document.addEventListener('DOMContentLoaded', () => {
      // Try restore saved lang
      let saved = 'pt';
      try { saved = localStorage.getItem('joyce-lang') || 'pt'; } catch(e) {}
      if (saved !== 'pt') applyLang(saved);

      // Desktop lang options
      document.querySelectorAll('.nav__lang-option').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          applyLang(btn.dataset.lang);
          document.getElementById('langToggle').classList.remove('open');
        });
      });
    });

    function setMobileLang(btn) {
      applyLang(btn.dataset.lang);
      // Keep menu open so user sees the change
    }