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


    // ══════════════════════════════════════════════════════════════════
    // i18n · Sistema completo de traduções PT / EN / ES
    // Para adicionar novo texto: 1) adicione data-i18n="chave" no HTML
    //                            2) adicione a string nas 3 línguas aqui
    // ══════════════════════════════════════════════════════════════════
    const translations = {
      pt: {
        // NAV
        'nav.greeting': 'Boas vindas ao meu portfólio',
        'nav.projects': 'Projetos',
        'nav.about': 'Sobre mim',
        'nav.contact': 'Contato',
        'nav.back': '← Voltar ao início',
        // HERO
        'hero.label': 'OLÁ, EU SOU',
        'hero.role': 'Product Designer',
        'hero.sub': 'Trabalho na interseção entre design, tecnologia e negócios.<br>Valores que me movem: empatia, inclusão, colaboração e inovação.',
        // PROJECTS
        'section.projects.label': 'Projetos',
        'projects.heading': 'Alguns projetos que tenho orgulho em ter trabalhado',
        'card.cta': 'Ver case →',
        'card0.title': 'Melhorando o fluxo de criação de eventos para organizações',
        'card0.summary': 'A maior plataforma de gestão de eventos cristãos do Brasil. Conduzi a reestruturação do fluxo core de ponta a ponta, da pesquisa ao pós-lançamento, com IA aplicada ao processo.',
        'card1.title': 'Como capacitamos revendedores do Grupo Boticário para dominar as redes sociais',
        'card1.summary': 'Programa de capacitação exclusivo para ensinar revendedores a usar redes sociais e potencializar vendas.',
        'card2.title': 'Aumentando a taxa de formações com gamificação',
        'card2.summary': 'Profissionais da beleza que desejam se qualificar no mercado ou empreender no setor precisavam de motivação para concluir suas formações.',
        'card3.title': 'Humanizando a gestão cultural no Governo Federal',
        'card3.summary': 'Plataforma do Ministério da Cultura para operacionalizar a Política Nacional Aldir Blanc. Conduzi a pesquisa com gestores, wireframes e testes de usabilidade do sistema CultBR.',
        // ABOUT
        'section.about.label': 'Sobre mim',
        'about.heading': 'Quem sou além do design',
        'about.history.title': 'Minha história',
        'about.p1': 'Nascida no interior de Alagoas, tenho 30 anos e moro em Maceió, Alagoas, Brasil. Sou tutora de duas huskies que são a razão dos meus chinelos mordidos.',
        'about.p2': 'Graduanda em Marketing. Apaixonada em experiência, design e negócios com mais de 5 anos como Product Designer, me destaco pela colaboração, curiosidade e busca constante por aprendizado.',
        'about.p3': 'Acredito que a reflexão sobre desafios, seja no trabalho, nos relacionamentos ou nas questões pessoais, é essencial para o crescimento contínuo. Tenho um compromisso genuíno com meu desenvolvimento, sempre em busca de ser a melhor versão de mim mesma.',
        // INTERESTS
        'interests.heading': 'Interesses',
        'interests.text': 'Gosto de me envolver em comunidades, participar de eventos e explorar novas formas de colaboração. Também me interesso por comportamento humano e entender diferentes perspectivas. Além disso, a fotografia, as viagens e a cultura coreana são algumas das minhas paixões. Nos momentos livres, busco experiências que me inspirem, seja por meio de boas conversas, descobertas culturais ou novos desafios.',
        // CTA
        'cta.heading': 'Vamos conversar?',
        'cta.sub': 'Projetos, colaborações e outras ideias, dentro ou fora do design!',
        'cta.btn': 'Fale comigo ↗',
        // FOOTER
        'footer.made': 'feito por uma humana 🤍',
        // CONTACT PAGE
        'contact.label': 'Contato',
        'contact.heading': 'Vamos conversar sobre seu próximo projeto?',
        'contact.sub1': 'Atuo conectando pesquisa, estratégia e execução para estruturar experiências claras, eficientes e com impacto real.',
        'contact.sub2': 'Aberta a oportunidades, projetos e colaborações.',
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
      },

      en: {
        // NAV
        'nav.greeting': 'Welcome to my portfolio',
        'nav.projects': 'Projects',
        'nav.about': 'About me',
        'nav.contact': 'Contact',
        'nav.back': '← Back to home',
        // HERO
        'hero.label': 'HI, I AM',
        'hero.role': 'Product Designer',
        'hero.sub': 'I work at the intersection of design, technology and business.<br>Values that drive me: empathy, inclusion, collaboration and innovation.',
        // PROJECTS
        'section.projects.label': 'Projects',
        'projects.heading': 'Some projects I am proud to have worked on',
        'card.cta': 'View case →',
        'card0.title': 'Improving the event creation flow for organizations',
        'card0.summary': 'The largest Christian events management platform in Brazil. I led the restructuring of the core flow end-to-end, from research to post-launch, with AI applied throughout the process.',
        'card1.title': 'How we trained Grupo Boticário resellers to master social media',
        'card1.summary': 'An exclusive training program to teach resellers how to use social media as a sales channel and boost their results.',
        'card2.title': 'Increasing course completion rates with gamification',
        'card2.summary': 'Beauty professionals who wanted to qualify in the market or start a business needed motivation to complete their courses.',
        'card3.title': 'Humanizing cultural management in the Federal Government',
        'card3.summary': 'Ministry of Culture platform to operationalize the Aldir Blanc National Policy. I led research with managers, wireframes and usability tests for the CultBR system.',
        // ABOUT
        'section.about.label': 'About me',
        'about.heading': 'Who I am beyond design',
        'about.history.title': 'My story',
        'about.p1': 'Born in the interior of Alagoas, I am 30 years old and live in Maceió. I take care of two huskies who are the reason my slippers are always chewed up.',
        'about.p2': 'Marketing student. Passionate about experience, design and business with over 5 years as a Product Designer, I stand out for my collaboration, curiosity and constant pursuit of learning.',
        'about.p3': 'I believe that reflecting on challenges, at work, in relationships or in personal matters, is essential for continuous growth. I have a genuine commitment to my development, always striving to be the best version of myself.',
        // INTERESTS
        'interests.heading': 'Interests',
        'interests.text': 'I enjoy getting involved in communities, attending events and exploring new ways to collaborate. I am also interested in human behavior and understanding different perspectives. Photography, travel and Korean culture are some of my passions. In my free time, I seek experiences that inspire me, through great conversations, cultural discoveries or new challenges.',
        // CTA
        'cta.heading': "Let's talk?",
        'cta.sub': 'Projects, collaborations and other ideas · inside or outside design!',
        'cta.btn': 'Get in touch ↗',
        // FOOTER
        'footer.made': 'made by a human 🤍',
        // CONTACT PAGE
        'contact.label': 'Contact',
        'contact.heading': "Let's talk about your next project?",
        'contact.sub1': 'I connect research, strategy and execution to build clear, efficient and impactful experiences.',
        'contact.sub2': 'Open to opportunities, projects and collaborations.',
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
      },

      es: {
        // NAV
        'nav.greeting': 'Bienvenido a mi portafolio',
        'nav.projects': 'Proyectos',
        'nav.about': 'Sobre mí',
        'nav.contact': 'Contacto',
        'nav.back': '← Volver al inicio',
        // HERO
        'hero.label': 'HOLA, SOY',
        'hero.role': 'Product Designer',
        'hero.sub': 'Trabajo en la intersección entre diseño, tecnología y negocios.<br>Valores que me mueven: empatía, inclusión, colaboración e innovación.',
        // PROJECTS
        'section.projects.label': 'Proyectos',
        'projects.heading': 'Algunos proyectos de los que me enorgullezco haber trabajado',
        'card.cta': 'Ver caso →',
        'card0.title': 'Mejorando el flujo de creación de eventos para organizaciones',
        'card0.summary': 'La mayor plataforma de gestión de eventos cristianos de Brasil. Lideré la reestructuración del flujo principal de principio a fin, desde la investigación hasta el post-lanzamiento, con IA aplicada al proceso.',
        'card1.title': 'Cómo capacitamos a los revendedores de Grupo Boticário para dominar las redes sociales',
        'card1.summary': 'Programa de capacitación exclusivo para enseñar a los revendedores a usar las redes sociales y potenciar sus ventas.',
        'card2.title': 'Aumentando la tasa de formaciones con gamificación',
        'card2.summary': 'Los profesionales de la belleza que querían cualificarse en el mercado o emprender necesitaban motivación para completar sus formaciones.',
        'card3.title': 'Humanizando la gestión cultural en el Gobierno Federal',
        'card3.summary': 'Plataforma del Ministerio de Cultura para operacionalizar la Política Nacional Aldir Blanc. Lideré la investigación con gestores, wireframes y pruebas de usabilidad del sistema CultBR.',
        // ABOUT
        'section.about.label': 'Sobre mí',
        'about.heading': 'Quién soy más allá del diseño',
        'about.history.title': 'Mi historia',
        'about.p1': 'Nacida en el interior de Alagoas, tengo 30 años y vivo en Maceió. Cuido de dos huskies que son la razón de mis pantuflas mordidas.',
        'about.p2': 'Estudiante de Marketing. Apasionada por la experiencia, el diseño y los negocios con más de 5 años como Product Designer, me destaco por la colaboración, la curiosidad y la búsqueda constante de aprendizaje.',
        'about.p3': 'Creo que la reflexión sobre los desafíos · en el trabajo, en las relaciones o en las cuestiones personales · es esencial para el crecimiento continuo. Tengo un compromiso genuino con mi desarrollo, siempre buscando ser la mejor versión de mí misma.',
        // INTERESTS
        'interests.heading': 'Intereses',
        'interests.text': 'Me gusta involucrarme en comunidades, participar en eventos y explorar nuevas formas de colaboración. También me interesa el comportamiento humano y entender diferentes perspectivas. La fotografía, los viajes y la cultura coreana son algunas de mis pasiones. En mis momentos libres, busco experiencias que me inspiren, ya sea a través de buenas conversaciones, descubrimientos culturales o nuevos desafíos.',
        // CTA
        'cta.heading': '¿Hablamos?',
        'cta.sub': '¡Proyectos, colaboraciones y otras ideas, dentro o fuera del diseño!',
        'cta.btn': 'Contáctame ↗',
        // FOOTER
        'footer.made': 'hecho por una humana 🤍',
        // CONTACT PAGE
        'contact.label': 'Contacto',
        'contact.heading': '¿Hablamos sobre tu próximo proyecto?',
        'contact.sub1': 'Conecto investigación, estrategia y ejecución para crear experiencias claras, eficientes e impactantes.',
        'contact.sub2': 'Abierta a oportunidades, proyectos y colaboraciones.',
        'contact.email': 'Email',
        'contact.email.desc': 'Para oportunidades, proyectos o conversaciones directas',
        'contact.linkedin': 'LinkedIn',
        'contact.linkedin.desc': 'Más sobre mi trayectoria y experiencias',
        'contact.whatsapp': 'WhatsApp',
        'contact.whatsapp.desc': 'Contacto rápido para alineamientos',
        'contact.cv': 'Currículum',
        'contact.cv.desc': 'Accede a mi currículum completo',
        'contact.form.title': '¿Prefieres escribir? Envíame un mensaje.',
        'contact.form.btn': 'Enviar mensaje →',
      }
    };

    let currentLang = 'pt';

    function applyLang(lang) {
      if (!translations[lang]) return;
      currentLang = lang;
      const t = translations[lang];

      // Apply all data-i18n elements
      document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (t[key] !== undefined) el.innerHTML = t[key];
      });

      // Update desktop lang toggle
      const flagMap = {
        pt: `<svg width="20" height="14" viewBox="0 0 20 14" xmlns="http://www.w3.org/2000/svg"><rect width="20" height="14" fill="#009c3b"/><polygon points="10,1.5 18.5,7 10,12.5 1.5,7" fill="#fedf00"/><circle cx="10" cy="7" r="3.2" fill="#002776"/></svg><span>PT</span>`,
        en: `<svg width="20" height="14" viewBox="0 0 24 16" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="16" fill="#012169"/><line x1="0" y1="0" x2="24" y2="16" stroke="white" stroke-width="2.5"/><line x1="24" y1="0" x2="0" y2="16" stroke="white" stroke-width="2.5"/><line x1="0" y1="0" x2="24" y2="16" stroke="#C8102E" stroke-width="1.5"/><line x1="24" y1="0" x2="0" y2="16" stroke="#C8102E" stroke-width="1.5"/><rect x="10" y="0" width="4" height="16" fill="white"/><rect x="0" y="6" width="24" height="4" fill="white"/><rect x="11" y="0" width="2" height="16" fill="#C8102E"/><rect x="0" y="7" width="24" height="2" fill="#C8102E"/></svg><span>EN</span>`,
        es: `<svg width="20" height="14" viewBox="0 0 24 16" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="16" fill="#c60b1e"/><rect y="3.5" width="24" height="9" fill="#ffc400"/></svg><span>ES</span>`
      };
      const current = document.querySelector('.nav__lang-current');
      if (current && flagMap[lang]) current.innerHTML = flagMap[lang];

      // Sync desktop + mobile active states
      document.querySelectorAll('.nav__lang-option').forEach(btn => {
        btn.classList.toggle('nav__lang-option--active', btn.dataset.lang === lang);
      });
      document.querySelectorAll('.mobile-menu__lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
      });

      // Update html lang attribute
      document.documentElement.lang = lang === 'pt' ? 'pt-BR' : lang;

      // Save preference (shared across pages)
      try { localStorage.setItem('joyce-lang', lang); } catch(e) {}
    }

    function setMobileLang(btn) { applyLang(btn.dataset.lang); }


    document.addEventListener('DOMContentLoaded', () => {
      // Restore saved language preference
      let saved = 'pt';
      try { saved = localStorage.getItem('joyce-lang') || 'pt'; } catch(e) {}
      if (saved !== 'pt') applyLang(saved);

      // Wire desktop lang dropdown options
      document.querySelectorAll('.nav__lang-option').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          applyLang(btn.dataset.lang);
          document.getElementById('langToggle').classList.remove('open');
        });
      });
    });