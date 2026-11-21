/* Initialize saved theme before React hydrates. */
(function () {
  try {
    document.documentElement.setAttribute(
      'data-theme',
      localStorage.getItem('elalimy-theme') === 'light' ? 'light' : 'dark'
    );
  } catch (_error) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
})();
