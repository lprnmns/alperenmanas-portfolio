// Satır içi SVG ikonlar: harici kütüphane yok, sayfa ağırlığı minimum.
type Name = 'trophy' | 'medal' | 'merge' | 'users' | 'github' | 'linkedin' | 'mail' | 'download' | 'globe' | 'star';

export function Icon({ name, className }: { name: Name; className?: string }) {
  const p = { className: `icon ${className ?? ''}`, 'aria-hidden': true as const, focusable: false as const };
  switch (name) {
    case 'trophy':
      return (
        <svg viewBox="0 0 24 24" {...p}>
          <path d="M7.5 4.5H4.2v1.6a3.6 3.6 0 0 0 3.6 3.6M16.5 4.5h3.3v1.6a3.6 3.6 0 0 1-3.6 3.6" fill="none" stroke="#c9900f" strokeWidth="1.7" />
          <path d="M6.8 2.5h10.4v4.6a5.2 5.2 0 0 1-10.4 0z" fill="#f2b81c" stroke="#c9900f" strokeWidth=".8" />
          <rect x="10.9" y="12" width="2.2" height="3.6" fill="#c9900f" />
          <rect x="8.2" y="15.4" width="7.6" height="2" rx=".6" fill="#f2b81c" />
          <rect x="6.6" y="17.8" width="10.8" height="3.7" rx=".8" fill="#7a5a12" />
        </svg>
      );
    case 'medal':
      return (
        <svg viewBox="0 0 24 24" {...p}>
          <path d="M6.2 1.5h4.6l2.4 7.2H8.6z" fill="#1f5fa8" />
          <path d="M17.8 1.5h-4.6l-2.4 7.2h4.6z" fill="#c8323c" />
          <circle cx="12" cy="15" r="6.8" fill="#c27c3e" stroke="#8a4d1d" strokeWidth="1" />
          <circle cx="12" cy="15" r="4.6" fill="none" stroke="#e7b07a" strokeWidth="1" />
          <path d="M12 11.9l.95 1.95 2.15.3-1.55 1.5.37 2.13L12 16.77l-1.92 1.01.37-2.13-1.55-1.5 2.15-.3z" fill="#f3cfa4" />
        </svg>
      );
    case 'merge':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" {...p}>
          <circle cx="6" cy="5" r="2.6" />
          <circle cx="6" cy="19" r="2.6" />
          <circle cx="18" cy="12" r="2.6" />
          <path d="M6 7.6v8.8M6 7.6c0 4 4.5 4.4 9.4 4.4" />
        </svg>
      );
    case 'users':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" {...p}>
          <circle cx="9" cy="8" r="3.5" />
          <path d="M2.5 20c.6-3.6 3.3-5.5 6.5-5.5s5.9 1.9 6.5 5.5" />
          <path d="M16 4.8a3.3 3.3 0 0 1 0 6.4M18.2 14.8c1.9.7 3 2.4 3.3 5.2" />
        </svg>
      );
    case 'github':
      return (
        <svg viewBox="0 0 16 16" fill="currentColor" {...p}>
          <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
        </svg>
      );
    case 'linkedin':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
          <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.75h4v11.5H3zM9.5 9.75h3.8v1.6h.06c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.77 2.65 4.77 6.1v5.85h-4v-5.2c0-1.24-.02-2.84-1.73-2.84-1.73 0-2 1.35-2 2.75v5.29h-4z" />
        </svg>
      );
    case 'mail':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" {...p}>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="M3.5 6.5 12 13l8.5-6.5" />
        </svg>
      );
    case 'download':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" {...p}>
          <path d="M12 3.5v11M7.5 10l4.5 4.5 4.5-4.5M4.5 19.5h15" />
        </svg>
      );
    case 'globe':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...p}>
          <circle cx="12" cy="12" r="9.5" />
          <path d="M2.5 12h19M12 2.5c3 3 3 16 0 19M12 2.5c-3 3-3 16 0 19" />
        </svg>
      );
    case 'star':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
          <path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.2l-5.7 3.1 1.2-6.4L2.8 9.5l6.4-.8z" />
        </svg>
      );
  }
}
