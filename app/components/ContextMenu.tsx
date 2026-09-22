"use client"
import { useState, useEffect, useCallback } from 'react';

type MenuPos = { x: number; y: number };

export default function ContextMenu({
  children,
  style,
  className,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}) {
  const [menu, setMenu] = useState<MenuPos | null>(null);
  const close = useCallback(() => setMenu(null), []);

  useEffect(() => {
    if (!menu) return;
    window.addEventListener('click', close);
    window.addEventListener('keydown', close);
    return () => {
      window.removeEventListener('click', close);
      window.removeEventListener('keydown', close);
    };
  }, [menu, close]);

  return (
    <div
      style={style}
      className={className}
      onContextMenu={e => {
        e.preventDefault();
        setMenu({ x: e.clientX, y: e.clientY });
      }}
    >
      {children}
      {menu && (
        <ul style={{
          position: 'fixed',
          top: menu.y,
          left: menu.x,
          zIndex: 99,
          margin: 0,
          padding: '0.25rem 0',
          listStyle: 'none',
          background: 'var(--color-bg)',
          border: '1px solid var(--color-bg-detail)',
          fontFamily: 'var(--font-body), monospace',
          fontSize: '0.8rem',
          color: 'var(--color-text)',
          minWidth: '10rem',
        }}>
          <li
            style={{ padding: '0.4rem 1rem', cursor: 'pointer' }}
            onMouseEnter={e => (e.currentTarget.style.background = 'var(--color-bg-detail)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
            onClick={close}
          >
            surprise!
          </li>
        </ul>
      )}
    </div>
  );
}
