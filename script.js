(() => {
  const root = document.documentElement;
  const themeToggle = document.getElementById('themeToggle');
  const menuToggle = document.getElementById('menuToggle');
  const mobileNav = document.getElementById('mobileNav');

  const savedTheme = localStorage.getItem('adama-theme');
  if (savedTheme === 'light') root.classList.add('light');

  const syncThemeButton = () => {
    const light = root.classList.contains('light');
    themeToggle.textContent = light ? '☾' : '☼';
    themeToggle.setAttribute(
      'aria-label',
      light ? 'Activer le thème sombre' : 'Activer le thème clair'
    );
    themeToggle.title = light
      ? 'Activer le thème sombre'
      : 'Activer le thème clair';
  };

  syncThemeButton();

  themeToggle.addEventListener('click', () => {
    root.classList.toggle('light');

    localStorage.setItem(
      'adama-theme',
      root.classList.contains('light') ? 'light' : 'dark'
    );

    syncThemeButton();
  });

  menuToggle.addEventListener('click', () => {
    const open = mobileNav.classList.toggle('open');

    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.textContent = open ? '×' : '☰';
  });

  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.textContent = '☰';
    });
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  document
    .querySelectorAll('.reveal')
    .forEach(el => observer.observe(el));

  document.getElementById('year').textContent = new Date().getFullYear();
})();
