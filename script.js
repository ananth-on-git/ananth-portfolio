/* ───────────────────────────────────────────────────────────────
 * Anantha Sai K — Portfolio Site
 * Sidebar SPA: hash routing, section swap, theme toggle, animations
 * No build step, no framework — vanilla JS + Tailwind CDN
 * ─────────────────────────────────────────────────────────────── */

const VALID_SECTIONS = ['about', 'experience', 'skills', 'education'];
const SECTION_TITLES = {
  about: 'About',
  experience: 'Experience',
  skills: 'Skills',
  education: 'Education',
};

/* ──────────── Section swap + hash routing ──────────── */

function showSection(sectionId) {
  if (!VALID_SECTIONS.includes(sectionId)) sectionId = 'about';

  // Swap visible section
  document.querySelectorAll('.section').forEach((s) => {
    s.classList.toggle('active', s.id === sectionId);
  });

  // Update sidebar + mobile nav active states
  document.querySelectorAll('.nav-item, .mobile-nav-item').forEach((n) => {
    n.classList.toggle('active', n.dataset.section === sectionId);
  });

  // Reset main scroll to top so the new section starts at top
  const main = document.querySelector('main');
  if (main) main.scrollTop = 0;
  window.scrollTo({ top: 0, behavior: 'instant' });

  // Update document title for context
  document.title = `${SECTION_TITLES[sectionId]} · Anantha Sai K — CS Specialist · AI-Native Builder`;
}

function handleHashChange() {
  const hash = window.location.hash.slice(1) || 'about';
  showSection(hash);
}

// Intercept nav clicks: prevent default jump-scroll, swap section, update URL
function bindNav(selector) {
  document.querySelectorAll(selector).forEach((item) => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const section = item.dataset.section;
      if (!section) return;
      if (window.location.hash !== `#${section}`) {
        history.pushState(null, '', `#${section}`);
      }
      showSection(section);
    });
  });
}

bindNav('.nav-item');
bindNav('.mobile-nav-item');
window.addEventListener('hashchange', handleHashChange);
handleHashChange(); // run once on load

/* ──────────── Theme toggle (light/dark) ──────────── */

const html = document.documentElement;
const themeToggle = document.getElementById('theme-toggle');
const themeLabel = document.getElementById('theme-label');
const iconMoon = document.getElementById('icon-moon');
const iconSun = document.getElementById('icon-sun');

function setTheme(theme) {
  html.setAttribute('data-theme', theme);
  try { localStorage.setItem('theme', theme); } catch (_) {}

  if (themeLabel) themeLabel.textContent = theme === 'dark' ? 'Light mode' : 'Dark mode';
  if (iconMoon && iconSun) {
    iconMoon.classList.toggle('hidden', theme === 'dark');
    iconSun.classList.toggle('hidden', theme !== 'dark');
  }

  // Update meta theme-color for mobile browser chrome
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', theme === 'dark' ? '#09090B' : '#FAFAFA');
}

function initTheme() {
  let saved = null;
  try { saved = localStorage.getItem('theme'); } catch (_) {}
  if (saved === 'dark' || saved === 'light') {
    setTheme(saved);
  } else {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(prefersDark ? 'dark' : 'light');
  }
}
initTheme();

themeToggle?.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  setTheme(current === 'dark' ? 'light' : 'dark');
});

// Re-sync theme if the user changes OS-level preference and they haven't set one explicitly
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
  let saved = null;
  try { saved = localStorage.getItem('theme'); } catch (_) {}
  if (!saved) setTheme(e.matches ? 'dark' : 'light');
});

/* ──────────── Keyboard shortcuts (1–4 for sections) ──────────── */

document.addEventListener('keydown', (e) => {
  const tag = (e.target.tagName || '').toUpperCase();
  if (tag === 'INPUT' || tag === 'TEXTAREA') return;
  if (e.metaKey || e.ctrlKey || e.altKey) return;

  const num = parseInt(e.key, 10);
  if (num >= 1 && num <= VALID_SECTIONS.length) {
    const section = VALID_SECTIONS[num - 1];
    if (window.location.hash !== `#${section}`) {
      history.pushState(null, '', `#${section}`);
    }
    showSection(section);
  }
});

/* ──────────── Re-trigger entrance animations on section swap ──────────── */
/* The first paint runs CSS keyframes via .fade-up classes. When swapping
 * sections, we re-trigger them so each section feels alive on entry. */

function retriggerFadeUps() {
  document.querySelectorAll('.section.active .fade-up').forEach((el) => {
    el.style.animation = 'none';
    // force reflow
    void el.offsetWidth;
    el.style.animation = '';
  });
}

// Re-trigger after each section change
const originalShow = showSection;
window.showSection = (id) => {
  originalShow(id);
  retriggerFadeUps();
};
// Bind retrigger to hash changes too
window.addEventListener('hashchange', retriggerFadeUps);
