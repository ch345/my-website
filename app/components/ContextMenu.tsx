"use client"
import { useState, useEffect, useCallback, useRef } from 'react';
import { useAppearance, type AppearanceMode } from './AppearanceContext';
import AsciiOverlay from './AsciiOverlay';
import { dog } from '../assets/ascii/overlays';

const SURPRISE_DURATION = 1000;
const SURPRISE_FADE = 100;

type MenuPos = { x: number; y: number };

const APPEARANCE_OPTIONS: { label: string; value: AppearanceMode }[] = [
  { label: 'default appearance', value: 'default' },
  { label: 'light mode', value: 'light' },
  { label: 'dark mode', value: 'dark' },
];

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
  const { mode, setMode, triggerPreview } = useAppearance();

  const [surpriseArt, setSurpriseArt] = useState(false);
  const [surpriseVisible, setSurpriseVisible] = useState(false);
  const [surprisePos, setSurprisePos] = useState<MenuPos | null>(null);
  const surpriseTimeouts = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    if (!menu) return;
    window.addEventListener('click', close);
    window.addEventListener('keydown', close);
    return () => {
      window.removeEventListener('click', close);
      window.removeEventListener('keydown', close);
    };
  }, [menu, close]);

  useEffect(() => {
    return () => surpriseTimeouts.current.forEach(clearTimeout);
  }, []);

  const surprise = useCallback((pos: MenuPos) => {
    surpriseTimeouts.current.forEach(clearTimeout);
    triggerPreview('dark', SURPRISE_DURATION);
    setSurprisePos(pos);
    setSurpriseArt(true);
    setSurpriseVisible(false);
    surpriseTimeouts.current = [
      setTimeout(() => setSurpriseVisible(true), 20),
      setTimeout(() => setSurpriseVisible(false), SURPRISE_DURATION),
      setTimeout(() => setSurpriseArt(false), SURPRISE_DURATION + SURPRISE_FADE),
    ];
  }, [triggerPreview]);

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
            onClick={e => { surprise({ x: e.clientX, y: e.clientY }); close(); }}
          >
            surprise!
          </li>
          <li style={{ margin: '0.25rem 0', borderTop: '1px solid var(--color-bg-detail)' }} />
          {APPEARANCE_OPTIONS.map(opt => (
            <li
              key={opt.value}
              style={{ padding: '0.4rem 1rem', cursor: 'pointer', fontWeight: mode === opt.value ? 700 : 400 }}
              onMouseEnter={e => (e.currentTarget.style.background = 'var(--color-bg-detail)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              onClick={() => { setMode(opt.value); close(); }}
            >
              {mode === opt.value ? '✓ ' : '  '}{opt.label}
            </li>
          ))}
        </ul>
      )}
      {surpriseArt && surprisePos && (
        <div style={{
          position: 'fixed',
          top: surprisePos.y,
          left: surprisePos.x,
          zIndex: 90,
          pointerEvents: 'none',
          opacity: surpriseVisible ? 1 : 0,
          transition: `opacity ${SURPRISE_FADE}ms ease`,
        }}>
          <AsciiOverlay
            art={dog}
            charHover={false}
            color="var(--color-accent-muted)"
            style={{ position: 'static', transform: 'translate(-50%, -50%)' }}
          />
        </div>
      )}
    </div>
  );
}
