const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const header = document.querySelector('[data-header]');
const navToggle = document.querySelector('[data-nav-toggle]');
const nav = document.querySelector('[data-nav]');
const progressBar = document.querySelector('[data-scroll-progress]');

function closeNav() {
  if (!nav || !navToggle) return;
  nav.classList.remove('is-open');
  navToggle.setAttribute('aria-expanded', 'false');
  document.body.classList.remove('nav-open');
}

if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
    document.body.classList.toggle('nav-open', isOpen);
  });

  nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeNav));
  window.addEventListener('resize', () => {
    if (window.innerWidth > 920) closeNav();
  });
}

function updateScrollUI() {
  const y = window.scrollY;
  header?.classList.toggle('is-scrolled', y > 16);

  if (progressBar) {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const pct = scrollable > 0 ? Math.min(100, Math.max(0, (y / scrollable) * 100)) : 0;
    progressBar.style.width = `${pct}%`;
  }
}

window.addEventListener('scroll', updateScrollUI, { passive: true });
updateScrollUI();

const reveals = document.querySelectorAll('.reveal');
if (reduceMotion || !('IntersectionObserver' in window)) {
  reveals.forEach((item) => item.classList.add('is-visible'));
} else {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -30px' });

  reveals.forEach((item) => revealObserver.observe(item));
}

const sections = document.querySelectorAll('[data-section]');
const sectionLinks = [...document.querySelectorAll('.site-nav a[href^="#"]')];
if ('IntersectionObserver' in window && sections.length) {
  const sectionObserver = new IntersectionObserver((entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (!visible) return;
    const id = visible.target.id;
    sectionLinks.forEach((link) => {
      link.classList.toggle('is-active', link.getAttribute('href') === `#${id}`);
    });
  }, { threshold: [0.18, 0.35, 0.6], rootMargin: '-20% 0px -55%' });

  sections.forEach((section) => sectionObserver.observe(section));
}

const heroModes = {
  practice: {
    label: 'Practice Mode',
    carry: '248 yd',
    speed: '104 mph',
    result: '8 yd R',
    path: 'M75 265 C155 115 260 80 420 125'
  },
  league: {
    label: 'League Night',
    carry: '231 yd',
    speed: '99 mph',
    result: '1 Up',
    path: 'M75 265 C145 120 270 95 425 145'
  },
  event: {
    label: 'Group Event',
    carry: '219 yd',
    speed: '94 mph',
    result: 'Closest: 11 ft',
    path: 'M75 265 C175 105 300 105 428 152'
  }
};

const heroModeButtons = document.querySelectorAll('[data-hero-mode]');
const heroScreen = document.querySelector('[data-hero-screen]');
const heroLabel = document.querySelector('[data-hero-label]');
const carryStat = document.querySelector('[data-stat-carry]');
const speedStat = document.querySelector('[data-stat-speed]');
const resultStat = document.querySelector('[data-stat-result]');
const tracerPath = document.querySelector('[data-tracer-path]');
const tracerMotion = document.querySelector('.tracer-ball animateMotion');

function setHeroMode(mode) {
  const data = heroModes[mode];
  if (!data) return;
  heroModeButtons.forEach((button) => button.classList.toggle('is-active', button.dataset.heroMode === mode));
  if (heroScreen) heroScreen.dataset.heroScreen = mode;
  if (heroLabel) heroLabel.textContent = data.label;
  if (carryStat) carryStat.textContent = data.carry;
  if (speedStat) speedStat.textContent = data.speed;
  if (resultStat) resultStat.textContent = data.result;
  if (tracerPath) tracerPath.setAttribute('d', data.path);
  if (tracerMotion) {
    tracerMotion.setAttribute('path', data.path);
    tracerMotion.parentElement?.beginElement?.();
  }
}

heroModeButtons.forEach((button) => {
  button.addEventListener('click', () => setHeroMode(button.dataset.heroMode));
});

const experienceData = {
  practice: {
    kicker: 'Built for better golf',
    title: 'Useful practice without the weather, daylight, or driving-range pressure.',
    body: 'Work through a focused session with reliable technology, useful shot feedback, and a comfortable bay built for repetition.',
    list: ['Year-round repetition', 'Shot data and performance feedback', 'Comfortable individual or small-group practice'],
    ring: '76%',
    ringLabel: 'fairways',
    caption: 'Practice session snapshot',
    ringValue: 76
  },
  play: {
    kicker: 'Golf without intimidation',
    title: 'Play a full round, try a new course, or settle a friendly argument indoors.',
    body: 'Bring friends, share a bay, and enjoy golf at a pace that works for the group—whether everyone keeps score or not.',
    list: ['Per-bay social play', 'Beginner-friendly environment', 'Clubhouse seating and beverage service'],
    ring: '4',
    ringLabel: 'players',
    caption: 'Social round preview',
    ringValue: 62
  },
  league: {
    kicker: 'Competition with a weekly rhythm',
    title: 'Seasonal leagues and challenges that turn a first visit into a standing tee time.',
    body: 'Structured formats, leaderboards, member events, and recurring competition create energy through every season.',
    list: ['Seasonal and weekly formats', 'Leaderboards and special challenges', 'Options for different skill levels'],
    ring: '12',
    ringLabel: 'weeks',
    caption: 'League season preview',
    ringValue: 84
  },
  gather: {
    kicker: 'A better group event',
    title: 'A flexible indoor setting for teams, clients, celebrations, and local causes.',
    body: 'Combine simulator play with clubhouse hospitality for an event that feels organized, social, and easy to remember.',
    list: ['Corporate and private group formats', 'Fundraisers and community events', 'Beer, wine, and non-alcoholic hospitality'],
    ring: '6',
    ringLabel: 'event paths',
    caption: 'Group experience preview',
    ringValue: 70
  }
};

const experienceTabs = document.querySelectorAll('[data-experience]');
const experiencePanel = document.getElementById('experience-panel');
const experienceKicker = document.querySelector('[data-experience-kicker]');
const experienceTitle = document.querySelector('[data-experience-title]');
const experienceBody = document.querySelector('[data-experience-body]');
const experienceList = document.querySelector('[data-experience-list]');
const experienceVisual = document.querySelector('[data-experience-visual]');
const ringValue = document.querySelector('[data-ring-value]');
const ringLabel = document.querySelector('.data-ring small');
const visualCaption = document.querySelector('[data-visual-caption]');
const dataRing = document.querySelector('.data-ring');

function setExperience(key, focusPanel = false) {
  const data = experienceData[key];
  if (!data) return;
  experienceTabs.forEach((tab) => {
    const active = tab.dataset.experience === key;
    tab.classList.toggle('is-active', active);
    tab.setAttribute('aria-selected', String(active));
    if (active) experiencePanel?.setAttribute('aria-labelledby', tab.id);
  });
  if (experienceKicker) experienceKicker.textContent = data.kicker;
  if (experienceTitle) experienceTitle.textContent = data.title;
  if (experienceBody) experienceBody.textContent = data.body;
  if (experienceList) experienceList.innerHTML = data.list.map((item) => `<li>${item}</li>`).join('');
  if (experienceVisual) experienceVisual.dataset.experienceVisual = key;
  if (ringValue) ringValue.textContent = data.ring;
  if (ringLabel) ringLabel.textContent = data.ringLabel;
  if (visualCaption) visualCaption.textContent = data.caption;
  if (dataRing) dataRing.style.background = `conic-gradient(var(--gold) 0 ${data.ringValue}%, rgba(244,233,216,0.12) ${data.ringValue}% 100%)`;
  if (focusPanel) experiencePanel?.focus({ preventScroll: true });
}

experienceTabs.forEach((tab, index) => {
  tab.addEventListener('click', () => setExperience(tab.dataset.experience));
  tab.addEventListener('keydown', (event) => {
    if (!['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    let nextIndex = index;
    if (event.key === 'ArrowRight') nextIndex = (index + 1) % experienceTabs.length;
    if (event.key === 'ArrowLeft') nextIndex = (index - 1 + experienceTabs.length) % experienceTabs.length;
    if (event.key === 'Home') nextIndex = 0;
    if (event.key === 'End') nextIndex = experienceTabs.length - 1;
    experienceTabs[nextIndex].focus();
    setExperience(experienceTabs[nextIndex].dataset.experience);
  });
});

const membershipData = {
  social: {
    kicker: 'For the social side of golf',
    title: 'Be part of the clubhouse, even when you are not booking a bay every week.',
    body: 'Designed for guests who value community events, member opportunities, and an easy connection to the House.',
    list: ['Member communications and event access', 'Clubhouse community benefits', 'Opportunities to join leagues and special programs']
  },
  practice: {
    kicker: 'For golfers chasing better numbers',
    title: 'Build a regular practice rhythm with planned off-peak access and member advantages.',
    body: 'Designed for players who want more repetition, useful simulator time, and a reliable place to keep improving year-round.',
    list: ['Practice-focused access structure', 'Off-peak value and consistency', 'Performance and improvement programming']
  },
  club: {
    kicker: 'For frequent players',
    title: 'Make Hacker’s House part of your regular golf routine.',
    body: 'Designed for players who expect to use the bays, join leagues, attend events, and build relationships inside the clubhouse.',
    list: ['Included-access structure planned', 'Priority opportunities and league connection', 'Stronger clubhouse benefits']
  },
  founding: {
    kicker: 'For the first members in the House',
    title: 'Early recognition, priority opportunities, and first release of the controlled House Key program.',
    body: 'Designed for early supporters who want a deeper connection to the launch and a premium reservation-based access path.',
    list: ['Founding recognition and launch benefits', 'Priority access opportunities', 'Controlled House Key eligibility subject to final terms']
  },
  corporate: {
    kicker: 'For local businesses and teams',
    title: 'Use the clubhouse for recurring play, client entertainment, employee events, and community visibility.',
    body: 'Designed for businesses that want a flexible relationship with golf, hospitality, events, and local partnerships.',
    list: ['Corporate outing and event opportunities', 'Team and client entertainment', 'Sponsorship and local visibility options']
  }
};

const membershipOptions = document.querySelectorAll('[data-membership]');
const membershipKicker = document.querySelector('[data-membership-kicker]');
const membershipTitle = document.querySelector('[data-membership-title]');
const membershipBody = document.querySelector('[data-membership-body]');
const membershipList = document.querySelector('[data-membership-list]');

function setMembership(key) {
  const data = membershipData[key];
  if (!data) return;
  membershipOptions.forEach((option) => option.classList.toggle('is-active', option.dataset.membership === key));
  if (membershipKicker) membershipKicker.textContent = data.kicker;
  if (membershipTitle) membershipTitle.textContent = data.title;
  if (membershipBody) membershipBody.textContent = data.body;
  if (membershipList) membershipList.innerHTML = data.list.map((item) => `<li>${item}</li>`).join('');
}

membershipOptions.forEach((option) => option.addEventListener('click', () => setMembership(option.dataset.membership)));

const faqButtons = document.querySelectorAll('.faq-item button');
faqButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const expanded = button.getAttribute('aria-expanded') === 'true';
    const answer = button.closest('.faq-item')?.querySelector('.faq-answer');
    button.setAttribute('aria-expanded', String(!expanded));
    if (answer) answer.hidden = expanded;
  });
});

if (!reduceMotion && window.matchMedia('(pointer: fine)').matches) {
  document.querySelectorAll('.interactive-tilt').forEach((card) => {
    card.addEventListener('pointermove', (event) => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(900px) rotateX(${y * -5}deg) rotateY(${x * 6}deg) translateY(-2px)`;
    });
    card.addEventListener('pointerleave', () => {
      card.style.transform = '';
    });
  });
}

const year = document.querySelector('[data-year]');
if (year) year.textContent = new Date().getFullYear();

// HH cursor — a restrained desktop-only brand detail.
const cursorDot = document.querySelector('[data-cursor-dot]');
const cursorRing = document.querySelector('[data-cursor-ring]');
if (cursorDot && cursorRing && window.matchMedia('(pointer: fine)').matches && !reduceMotion) {
  let targetX = -100;
  let targetY = -100;
  let ringX = -100;
  let ringY = -100;

  window.addEventListener('pointermove', (event) => {
    targetX = event.clientX;
    targetY = event.clientY;
    cursorDot.style.transform = `translate3d(${targetX}px, ${targetY}px, 0)`;
    cursorDot.classList.add('is-visible');
    cursorRing.classList.add('is-visible');
  }, { passive: true });

  document.querySelectorAll('a, button, .interactive-tilt').forEach((item) => {
    item.addEventListener('pointerenter', () => cursorRing.classList.add('is-active'));
    item.addEventListener('pointerleave', () => cursorRing.classList.remove('is-active'));
  });

  const followCursor = () => {
    ringX += (targetX - ringX) * 0.14;
    ringY += (targetY - ringY) * 0.14;
    cursorRing.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
    requestAnimationFrame(followCursor);
  };
  followCursor();
}

// Scroll-driven club-face story. No external 3D library is required.
const impactLab = document.querySelector('[data-impact-lab]');
const clubFace = document.querySelector('[data-club-face]');
const impactBall = document.querySelector('[data-impact-ball]');
const impactProgress = document.querySelector('[data-impact-progress]');
const impactStep = document.querySelector('[data-impact-step]');
const impactPoint = document.querySelector('.impact-point');
const impactTrace = document.querySelector('.impact-trace path');
const impactSpeed = document.querySelector('[data-impact-speed]');
const impactFace = document.querySelector('[data-impact-face]');
const impactLaunch = document.querySelector('[data-impact-launch]');
const impactCarry = document.querySelector('[data-impact-carry]');
let impactTriggered = false;

function updateImpactLab() {
  if (!impactLab || !clubFace || reduceMotion) return;
  const rect = impactLab.getBoundingClientRect();
  const range = Math.max(1, rect.height - window.innerHeight);
  const progress = Math.min(1, Math.max(0, -rect.top / range));
  const eased = 1 - Math.pow(1 - progress, 3);
  const rotationY = -42 + eased * 116;
  const rotationX = 10 - Math.sin(progress * Math.PI) * 23;
  const rotationZ = -8 + progress * 18;
  clubFace.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg) rotateZ(${rotationZ}deg) translateZ(${Math.sin(progress * Math.PI) * 50}px)`;
  if (impactProgress) impactProgress.style.width = `${progress * 100}%`;

  const hitPhase = Math.min(1, Math.max(0, (progress - .36) / .25));
  if (impactBall) {
    const x = hitPhase * 360;
    const y = -Math.pow(hitPhase, .78) * 190;
    impactBall.style.transform = `translate3d(${x}px, ${y}px, ${hitPhase * 80}px) scale(${1 - hitPhase * .42})`;
    impactBall.style.opacity = String(1 - Math.max(0, (hitPhase - .72) / .28));
  }
  if (impactTrace) impactTrace.style.strokeDashoffset = String(620 - hitPhase * 620);

  if (progress < .28) {
    if (impactStep) impactStep.textContent = '01 / ADDRESS';
  } else if (progress < .48) {
    if (impactStep) impactStep.textContent = '02 / DELIVERY';
  } else if (progress < .67) {
    if (impactStep) impactStep.textContent = '03 / IMPACT';
  } else {
    if (impactStep) impactStep.textContent = '04 / FLIGHT';
  }

  if (progress > .47 && !impactTriggered) {
    impactTriggered = true;
    impactPoint?.classList.remove('is-hit');
    requestAnimationFrame(() => impactPoint?.classList.add('is-hit'));
  }
  if (progress < .4) impactTriggered = false;

  const speed = Math.round(82 + progress * 22);
  if (impactSpeed) impactSpeed.textContent = String(speed);
  if (impactFace) impactFace.textContent = `${(2.8 - progress * 2.1).toFixed(1) > 0 ? '+' : ''}${(2.8 - progress * 2.1).toFixed(1)}°`;
  if (impactLaunch) impactLaunch.textContent = `${(11.2 + progress * 3.4).toFixed(1)}°`;
  if (impactCarry) impactCarry.textContent = progress > .65 ? String(Math.round(188 + progress * 60)) : '—';
}

window.addEventListener('scroll', updateImpactLab, { passive: true });
window.addEventListener('resize', updateImpactLab);
updateImpactLab();
