(function () {
  function $(selector, scope) { return (scope || document).querySelector(selector); }
  function $all(selector, scope) { return Array.from((scope || document).querySelectorAll(selector)); }

  // Theme handling
  const themeToggle = $('#themeToggle');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const storedTheme = localStorage.getItem('theme');
  const isDark = storedTheme ? storedTheme === 'dark' : prefersDark;
  if (isDark) document.documentElement.classList.add('dark');
  updateThemeButton();

  themeToggle && themeToggle.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark');
    const currentlyDark = document.documentElement.classList.contains('dark');
    localStorage.setItem('theme', currentlyDark ? 'dark' : 'light');
    updateThemeButton();
  });

  function updateThemeButton() {
    const dark = document.documentElement.classList.contains('dark');
    if (themeToggle) themeToggle.textContent = dark ? '🌞' : '🌙';
    // Adjust CSS variables if using class-based theming
    if (dark) {
      document.documentElement.style.setProperty('--bg', '#0b1220');
      document.documentElement.style.setProperty('--panel', '#0f172a');
      document.documentElement.style.setProperty('--text', '#e5e7eb');
      document.documentElement.style.setProperty('--muted', '#94a3b8');
      document.documentElement.style.setProperty('--border', '#1f2937');
      document.documentElement.style.setProperty('--card', '#111827');
    } else {
      document.documentElement.style.setProperty('--bg', '#f7fafc');
      document.documentElement.style.setProperty('--panel', '#ffffff');
      document.documentElement.style.setProperty('--text', '#0f172a');
      document.documentElement.style.setProperty('--muted', '#475569');
      document.documentElement.style.setProperty('--border', '#e2e8f0');
      document.documentElement.style.setProperty('--card', '#ffffff');
    }
  }

  // Year in footer
  const yearEl = $('#year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // Scroll reveal
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.15 });
  $all('.reveal').forEach((el) => observer.observe(el));

  // Link placeholders: update these with your real profiles
  const GH = '#';
  const LI = '#';
  const RESUME = '#';
  const linkTargets = [ ['#ghLink', GH], ['#liLink', LI], ['#ghLink2', GH], ['#liLink2', LI], ['#resumeLink', RESUME] ];
  linkTargets.forEach(([sel, href]) => { const a = $(sel); if (a && href && href !== '#') a.setAttribute('href', href); });

  // Copy helpers
  function copy(text) {
    navigator.clipboard.writeText(text).then(() => {
      // simple visual feedback
      const note = document.createElement('div');
      note.textContent = 'Copied to clipboard';
      note.style.position = 'fixed';
      note.style.bottom = '18px';
      note.style.left = '50%';
      note.style.transform = 'translateX(-50%)';
      note.style.background = 'rgba(0,0,0,.8)';
      note.style.color = 'white';
      note.style.padding = '8px 12px';
      note.style.borderRadius = '8px';
      note.style.zIndex = '9999';
      document.body.appendChild(note);
      setTimeout(() => note.remove(), 900);
    });
  }
  const emailBtn = $('#copyEmail');
  const phoneBtn = $('#copyPhone');
  emailBtn && emailBtn.addEventListener('click', () => copy('slee3321@gatech.edu'));
  phoneBtn && phoneBtn.addEventListener('click', () => copy('+1 470-952-2212'));

  // Project filtering and search
  const filterButtons = $all('.filter-tag');
  const searchInput = $('#projectSearch');
  const cards = $all('.project-card');

  function applyFilters() {
    const active = (filterButtons.find(b => b.classList.contains('active'))?.dataset.tag) || 'all';
    const q = (searchInput?.value || '').trim().toLowerCase();
    cards.forEach((card) => {
      const tags = (card.getAttribute('data-tags') || '').toLowerCase();
      const text = card.textContent.toLowerCase();
      const matchesTag = active === 'all' || tags.includes(active);
      const matchesText = q === '' || text.includes(q);
      card.style.display = matchesTag && matchesText ? '' : 'none';
    });
  }

  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      applyFilters();
    });
  });
  searchInput && searchInput.addEventListener('input', applyFilters);
  applyFilters();
})();


