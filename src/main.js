import Swup from 'swup';

const swup = new Swup();

let heroStartTimeoutId = null;
let heroIntervalId = null;
let numbersStartTimeoutId = null;
let numbersIntervalId = null;
let activeObservers = [];

window.toggleMobileMenu = function () {
  const nav = document.getElementById('mobileNav');
  const btn = document.querySelector('.mobile-menu-btn');

  if (nav) {
    nav.classList.toggle('open');
  }

  if (btn) {
    btn.classList.toggle('open');
  }
};

function cleanup() {
  if (heroStartTimeoutId) {
    clearTimeout(heroStartTimeoutId);
    heroStartTimeoutId = null;
  }

  if (heroIntervalId) {
    clearInterval(heroIntervalId);
    heroIntervalId = null;
  }

  if (numbersStartTimeoutId) {
    clearTimeout(numbersStartTimeoutId);
    numbersStartTimeoutId = null;
  }

  if (numbersIntervalId) {
    clearInterval(numbersIntervalId);
    numbersIntervalId = null;
  }

  activeObservers.forEach((observer) => {
    if (observer && typeof observer.disconnect === 'function') {
      observer.disconnect();
    }
  });
  activeObservers = [];

  document.body.classList.remove('nav-open');

  const nav = document.getElementById('mobileNav');
  const btn = document.querySelector('.mobile-menu-btn');
  if (nav) {
    nav.classList.remove('open');
  }
  if (btn) {
    btn.classList.remove('open');
  }
}

function initCanvas() {
  // Video background replaces canvas. No initialization needed here.
}

function initReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('in');
      });
    },
    { threshold: 0.08 }
  );

  activeObservers.push(observer);
  document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
}

function initDigits() {
  const digits = ['d1', 'd2', 'd3', 'd4', 'd5', 'd6', 'd7'];
  const targets = [7, 4, 9, 5, 2, 2, 7];

  function animateDigits() {
    digits.forEach((id, index) => {
      const element = document.getElementById(id);
      if (!element) return;

      let steps = 0;
      const max = 20 + index * 5;
      const intervalId = setInterval(() => {
        element.textContent = Math.floor(Math.random() * 10);
        steps += 1;
        if (steps > max) {
          element.textContent = targets[index];
          clearInterval(intervalId);
        }
      }, 60);
    });
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateDigits();
          observer.disconnect();
        }
      });
    },
    { threshold: 0.3 }
  );

  activeObservers.push(observer);
  const capCard = document.querySelector('.dk-card.capital');
  if (capCard) observer.observe(capCard);
}

function initForm() {
  const contactForm = document.getElementById('contactForm');
  if (!contactForm || contactForm.dataset.initialized) return;

  contactForm.dataset.initialized = 'true';
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    alert('Thank you! Your message has been sent. We will contact you shortly.');
    contactForm.reset();
  });
}

function initHeroCard() {
  const heroCard = document.getElementById('hero-revenue-card');
  if (!heroCard || heroIntervalId || heroStartTimeoutId) return;

  const cardData = [
    { title: 'Experience', amount: '10+ Years', period: 'in Web & App Development', pct: '100%', label: 'Satisfaction' },
    { title: 'Delivery', amount: '500+', period: 'Global Projects Completed', pct: '24/7', label: 'Support' },
    { title: 'Growth', amount: '10x', period: 'Average Client Traffic Growth', pct: '#1', label: 'Rankings' },
  ];

  let currentIndex = 0;
  const titleEl = document.getElementById('rc-title');
  const amountEl = document.getElementById('rc-amount');
  const periodEl = document.getElementById('rc-period');
  const badgeEl = document.getElementById('rc-badge');
  const pctEl = document.getElementById('rc-pct');
  const labelEl = document.getElementById('rc-badge-label');
  const dots = document.querySelectorAll('#rc-dots .rc-dot');
  const animElements = [titleEl, amountEl, periodEl, badgeEl];

  const triggerHeroAnim = () => {
    animElements.forEach((element) => {
      if (element) element.classList.add('fade-out');
    });

    setTimeout(() => {
      currentIndex = (currentIndex + 1) % cardData.length;
      const data = cardData[currentIndex];

      if (titleEl) titleEl.innerText = data.title;
      if (amountEl) amountEl.innerText = data.amount;
      if (periodEl) periodEl.innerText = data.period;
      if (pctEl) pctEl.innerText = data.pct;
      if (labelEl) labelEl.innerText = data.label;

      dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
      });

      animElements.forEach((element) => {
        if (element) {
          element.classList.remove('fade-out');
          element.classList.add('fade-in-pre');
        }
      });

      if (titleEl) void titleEl.offsetWidth;

      animElements.forEach((element) => {
        if (element) element.classList.remove('fade-in-pre');
      });
    }, 500);
  };

  heroStartTimeoutId = setTimeout(() => {
    heroStartTimeoutId = null;
    if (!document.body.contains(heroCard)) return;
    triggerHeroAnim();
    heroIntervalId = setInterval(triggerHeroAnim, 2000);
  }, 2500);
}

function initNumbersAnimation() {
  const numSection = document.getElementById('num-section');
  if (!numSection || numbersIntervalId || numbersStartTimeoutId) return;

  const numData = [
    { num: '10', label: 'Years of Excellence' },
    { num: '500+', label: 'Projects Completed' },
    { num: '100%', label: 'Satisfaction Guarantee' },
  ];

  let currentIndex = 0;
  const numEl = document.getElementById('big-num');
  const labelEl = document.getElementById('num-label');
  const dots = document.querySelectorAll('#num-dots-container .num-dot');
  const animElements = [numEl, labelEl];

  const triggerNumAnim = () => {
    animElements.forEach((element) => {
      if (element) element.classList.add('fade-out');
    });

    setTimeout(() => {
      currentIndex = (currentIndex + 1) % numData.length;
      const data = numData[currentIndex];

      if (numEl) numEl.innerText = data.num;
      if (labelEl) labelEl.innerText = data.label;

      dots.forEach((dot, index) => {
        dot.classList.toggle('on', index === currentIndex);
      });

      animElements.forEach((element) => {
        if (element) {
          element.classList.remove('fade-out');
          element.classList.add('fade-in-pre');
        }
      });

      if (numEl) void numEl.offsetWidth;

      animElements.forEach((element) => {
        if (element) element.classList.remove('fade-in-pre');
      });
    }, 500);
  };

  numbersStartTimeoutId = setTimeout(() => {
    numbersStartTimeoutId = null;
    if (!document.body.contains(numSection)) return;
    triggerNumAnim();
    numbersIntervalId = setInterval(triggerNumAnim, 2000);
  }, 2000);
}

function init() {
  cleanup();
  initCanvas();
  initReveal();
  initDigits();
  initForm();
  initHeroCard();
  initNumbersAnimation();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

swup.hooks.on('page:view', init);
swup.hooks.on('visit:start', cleanup);
