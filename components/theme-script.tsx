function initializeTheme() {
  // Theme switching disabled for now - site is dark-only. Keeping the old
  // localStorage-based logic here for future re-enable.
  // try {
  //   const stored = localStorage.getItem('theme');
  //   const theme = stored || 'dark';
  //   if (theme === 'dark') {
  //     document.documentElement.classList.add('dark');
  //   } else {
  //     document.documentElement.classList.remove('dark');
  //   }
  // } catch {}
  document.documentElement.classList.add('dark');
}

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: `(${initializeTheme.toString()})();` }} />;
}
