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


    function setMobileLang(btn) {
      document.querySelectorAll('.mobile-menu__lang-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const lang = btn.dataset.lang;
      const desktopOpts = document.querySelectorAll('#langDropdown .nav__lang-option');
      desktopOpts.forEach(b => b.classList.toggle('nav__lang-option--active', b.dataset.lang === lang));
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

    const translations = {
      pt: {
        'nav.back': '← Voltar ao início',
        'nav.projects': 'Projetos',
        'nav.about': 'Sobre mim',
        'nav.contact': 'Contato',
        'contact.label': 'Contato',
        'contact.heading': 'Vamos conversar sobre seu próximo projeto?',
        'contact.sub1': 'Atuo conectando pesquisa, estratégia e execução para estruturar experiências claras, eficientes e com impacto real.',
        'contact.sub2': 'Aberta a oportunidades, projetos e colaborações.',
        'contact.location': 'Maceió, Alagoas, Brasil',
        'contact.email': 'E-mail',
        'contact.email.desc': 'Para oportunidades, projetos ou conversas diretas',
        'contact.linkedin': 'LinkedIn',
        'contact.linkedin.desc': 'Mais sobre minha trajetória e experiências',
        'contact.whatsapp': 'WhatsApp',
        'contact.whatsapp.desc': 'Contato rápido para alinhamentos',
        'contact.cv': 'Currículo',
        'contact.cv.desc': 'Acesse meu currículo completo',
        'contact.form.title': 'Prefere escrever? Me manda uma mensagem.',
        'contact.form.btn': 'Enviar mensagem →',
        'footer.made': 'feito por uma humana 🤍',
      },
      en: {
        'nav.back': '← Back to home',
        'nav.projects': 'Projects',
        'nav.about': 'About me',
        'nav.contact': 'Contact',
        'contact.label': 'Contact',
        'contact.heading': "Let's talk about your next project?",
        'contact.sub1': 'I connect research, strategy and execution to build clear, efficient and impactful experiences.',
        'contact.sub2': 'Open to opportunities, projects and collaborations.',
        'contact.location': 'Maceió, Alagoas, Brazil',
        'contact.email': 'Email',
        'contact.email.desc': 'For opportunities, projects or direct conversations',
        'contact.linkedin': 'LinkedIn',
        'contact.linkedin.desc': 'More about my background and experience',
        'contact.whatsapp': 'WhatsApp',
        'contact.whatsapp.desc': 'Quick contact for alignment',
        'contact.cv': 'Resume',
        'contact.cv.desc': 'Access my full resume',
        'contact.form.title': 'Prefer to write? Send me a message.',
        'contact.form.btn': 'Send message →',
        'footer.made': 'made by a human 🤍',
      },
      es: {
        'nav.back': '← Volver al inicio',
        'nav.projects': 'Proyectos',
        'nav.about': 'Sobre mí',
        'nav.contact': 'Contacto',
        'contact.label': 'Contacto',
        'contact.heading': '¿Hablamos sobre tu próximo proyecto?',
        'contact.sub1': 'Conecto investigación, estrategia y ejecución para crear experiencias claras, eficientes e impactantes.',
        'contact.sub2': 'Abierta a oportunidades, proyectos y colaboraciones.',
        'contact.location': 'Maceió, Alagoas, Brasil',
        'contact.email': 'Email',
        'contact.email.desc': 'Para oportunidades, proyectos o conversas directas',
        'contact.linkedin': 'LinkedIn',
        'contact.linkedin.desc': 'Más sobre mi trayectoria y experiencias',
        'contact.whatsapp': 'WhatsApp',
        'contact.whatsapp.desc': 'Contacto rápido para alineamientos',
        'contact.cv': 'Currículum',
        'contact.cv.desc': 'Accede a mi currículum completo',
        'contact.form.title': '¿Prefieres escribir? Envíame un mensaje.',
        'contact.form.btn': 'Enviar mensaje →',
        'footer.made': 'hecho por una humana 🤍',
      }
    };

    let currentLang = 'pt';

    function applyLang(lang) {
      currentLang = lang;
      const t = translations[lang];
      if (!t) return;
      document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (t[key] !== undefined) el.innerHTML = t[key];
      });
      const flagMap = {
        pt: `<svg width="20" height="14" viewBox="0 0 20 14" xmlns="http://www.w3.org/2000/svg"><rect width="20" height="14" fill="#009c3b"/><polygon points="10,1.5 18.5,7 10,12.5 1.5,7" fill="#fedf00"/><circle cx="10" cy="7" r="3.2" fill="#002776"/></svg><span>PT</span>`,
        en: `<svg width="20" height="14" viewBox="0 0 24 16" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="16" fill="#012169"/><line x1="0" y1="0" x2="24" y2="16" stroke="white" stroke-width="2.5"/><line x1="24" y1="0" x2="0" y2="16" stroke="white" stroke-width="2.5"/><line x1="0" y1="0" x2="24" y2="16" stroke="#C8102E" stroke-width="1.5"/><line x1="24" y1="0" x2="0" y2="16" stroke="#C8102E" stroke-width="1.5"/><rect x="10" y="0" width="4" height="16" fill="white"/><rect x="0" y="6" width="24" height="4" fill="white"/><rect x="11" y="0" width="2" height="16" fill="#C8102E"/><rect x="0" y="7" width="24" height="2" fill="#C8102E"/></svg><span>EN</span>`,
        es: `<svg width="20" height="14" viewBox="0 0 24 16" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="16" fill="#c60b1e"/><rect y="3.5" width="24" height="9" fill="#ffc400"/></svg><span>ES</span>`
      };
      const current = document.querySelector('.nav__lang-current');
      if (current && flagMap[lang]) current.innerHTML = flagMap[lang];
      document.querySelectorAll('.nav__lang-option').forEach(btn => {
        btn.classList.toggle('nav__lang-option--active', btn.dataset.lang === lang);
      });
      document.querySelectorAll('.mobile-menu__lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
      });
      try { localStorage.setItem('joyce-lang', lang); } catch(e) {}
    }

    document.addEventListener('DOMContentLoaded', () => {
      let saved = 'pt';
      try { saved = localStorage.getItem('joyce-lang') || 'pt'; } catch(e) {}
      if (saved !== 'pt') applyLang(saved);
      document.querySelectorAll('.nav__lang-option').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          applyLang(btn.dataset.lang);
          document.getElementById('langToggle').classList.remove('open');
        });
      });
    });

    function setMobileLang(btn) { applyLang(btn.dataset.lang); }