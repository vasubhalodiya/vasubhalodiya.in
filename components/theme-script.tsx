function initializeTheme() {
  try {
    const stored = localStorage.getItem('theme');
    const theme = stored || 'dark';
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  } catch {}
}

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: `(${initializeTheme.toString()})();` }} />;
}
