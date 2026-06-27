(function () {
  const WHATSAPP_NUMBER = '94771234567';

  function buildWhatsAppUrl(message) {
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  }

  const header = document.getElementById('siteHeader');
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');
  const whatsappFloat = document.getElementById('whatsappFloat');
  const contactForm = document.getElementById('contactForm');
  const page = document.body.dataset.page;

  if (whatsappFloat) {
    whatsappFloat.href = buildWhatsAppUrl('Hi PrintCraft, I need help with a print order.');
  }

  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 24);
    });
  }

  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
      const open = mainNav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', open);
      navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });

    mainNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  document.querySelectorAll('[data-nav]').forEach((link) => {
    const key = link.getAttribute('data-nav');
    if (key === page) {
      link.classList.add('active');
    }
  });

  if (page === 'contact') {
    document.querySelectorAll('.header-cta, .mobile-only.btn-ghost').forEach((el) => {
      el.style.borderColor = 'var(--accent)';
      el.style.color = 'var(--accent)';
    });
  }

  if (page === 'home') {
    const heroLiquid = document.querySelector('.hero-liquid');
    const viewHitbox = document.getElementById('viewHitbox');
    const fluidCursor = document.getElementById('fluidCursor');
    const canvasTextLock = document.getElementById('canvasTextLock');
    const fluidMap = document.getElementById('fluidMap');

    if (heroLiquid && viewHitbox && fluidCursor && canvasTextLock && fluidMap) {
      let targetX = heroLiquid.clientWidth / 2;
      let targetY = heroLiquid.clientHeight / 2;
      let currentX = targetX;
      let currentY = targetY;
      let displacementScale = 0;
      let targetScale = 0;

      heroLiquid.addEventListener('mousemove', (e) => {
        const rect = heroLiquid.getBoundingClientRect();
        targetX = e.clientX - rect.left;
        targetY = e.clientY - rect.top;
      });

      heroLiquid.addEventListener('touchmove', (e) => {
        const touch = e.touches[0];
        if (touch) {
          const rect = heroLiquid.getBoundingClientRect();
          targetX = touch.clientX - rect.left;
          targetY = touch.clientY - rect.top;
        }
      }, { passive: true });

      heroLiquid.addEventListener('mouseleave', () => {
        fluidCursor.style.opacity = '0';
      });

      heroLiquid.addEventListener('mouseenter', () => {
        fluidCursor.style.opacity = '1';
      });

      document.querySelectorAll('.hero-actions a, .hero-actions button').forEach((button) => {
        button.addEventListener('mouseenter', () => {
          fluidCursor.style.opacity = '0';
        });
        button.addEventListener('mouseleave', () => {
          fluidCursor.style.opacity = '1';
        });
        button.addEventListener('focus', () => {
          fluidCursor.style.opacity = '0';
        });
        button.addEventListener('blur', () => {
          fluidCursor.style.opacity = '1';
        });
      });

      function pipelineRender() {
        currentX += (targetX - currentX) * 0.075;
        currentY += (targetY - currentY) * 0.075;

        fluidCursor.style.left = `${currentX}px`;
        fluidCursor.style.top = `${currentY}px`;

        const baseText = document.querySelector('.text-base');
        if (baseText) {
          const baseRect = baseText.getBoundingClientRect();
          const blobRect = fluidCursor.getBoundingClientRect();
          const dx = baseRect.left - blobRect.left;
          const dy = baseRect.top - blobRect.top;
          canvasTextLock.style.left = `${dx}px`;
          canvasTextLock.style.top = `${dy}px`;
          canvasTextLock.style.width = `${baseRect.width}px`;
          canvasTextLock.style.height = `${baseRect.height}px`;
        }

        targetScale = 72;
        displacementScale += (targetScale - displacementScale) * 0.08;
        const rippleWobble = displacementScale + (Math.sin(Date.now() * 0.004) * 8);
        fluidMap.setAttribute('scale', Math.max(0, rippleWobble));

        requestAnimationFrame(pipelineRender);
      }

      pipelineRender();
    }

    const launchLottie = document.getElementById('launchLottie');
    if (launchLottie && window.lottie) {
      lottie.loadAnimation({
        container: launchLottie,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: 'rocket.json'
      });
    }

    const showcaseSections = document.querySelectorAll('.custom-showcase .service');
    if (showcaseSections.length) {
      const showcaseObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle('active', entry.isIntersecting);
        });
      }, { root: null, threshold: 0.20, rootMargin: '0px 0px -40px 0px' });
      showcaseSections.forEach((section) => showcaseObserver.observe(section));
    }
  }

  document.querySelectorAll('.wa-order, .product-cta').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const product = btn.dataset.product || 'a print order';
      window.open(
        buildWhatsAppUrl(`Hi PrintCraft! I'd like a quote for: ${product}.`),
        '_blank',
        'noopener,noreferrer'
      );
    });
  });

  const filterBtns = document.querySelectorAll('.filter-btn');
  const catalogueCards = document.querySelectorAll('.product-card[data-category]');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;
      filterBtns.forEach((b) => b.classList.toggle('active', b === btn));
      catalogueCards.forEach((card) => {
        const match = filter === 'all' || card.dataset.category === filter;
        card.classList.toggle('hidden', !match);
      });
    });
  });

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const phone = document.getElementById('phone').value.trim();
      const message = document.getElementById('message').value.trim();
      const text = [
        'Hi PrintCraft!',
        `Name: ${name}`,
        `Email: ${email}`,
        phone ? `Phone: ${phone}` : '',
        '',
        'Project:',
        message,
      ]
        .filter(Boolean)
        .join('\n');
      window.open(buildWhatsAppUrl(text), '_blank', 'noopener,noreferrer');
      contactForm.reset();
    });
  }
})();
