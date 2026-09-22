'use client'
import ContextMenu from './ContextMenu';
import TopNav from './TopNav';
import PixelWave from './PixelWave';
import FitBorder from './FitBorder';
import { useAppearance } from './AppearanceContext';
import { morse } from '../assets/ascii/borders';

const DEFAULT_WAVE_PROPS = {
  pixelSize: 6,
  gap: 3,
  shape: 'circle' as const,
  sharpness: 3,
  speed: 0.5,
};

export default function PageLayout({
  children,
  overlay,
  defaultLightMode = true,
  waveProps,
}: {
  children: React.ReactNode;
  overlay?: React.ReactNode;
  defaultLightMode?: boolean;
  waveProps?: Partial<React.ComponentProps<typeof PixelWave>>;
}) {
  const { effectiveMode } = useAppearance();
  const isLight = effectiveMode === 'default' ? defaultLightMode : effectiveMode === 'light';

  const bg = isLight ? 'var(--color-bg)' : 'var(--color-bg-dark)';
  const bgDetail = isLight ? 'var(--color-bg-detail)' : 'var(--color-bg-dark-detail)';
  const text = isLight ? 'var(--color-text)' : 'var(--color-text-dark)';

  const themeOverrides: React.CSSProperties = isLight
    ? {}
    : ({
        '--color-bg': 'var(--color-bg-dark)',
        '--color-bg-detail': 'var(--color-bg-dark-detail)',
        '--color-text': 'var(--color-text-dark)',
      } as React.CSSProperties);

  return (
    <ContextMenu style={{
      position: 'relative',
      minHeight: '100dvh',
      isolation: 'isolate',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: bg,
      color: text,
      transition: 'background-color 0.4s ease, color 0.4s ease',
      ...themeOverrides,
    } as React.CSSProperties}>
      <div style={{ position: 'relative', zIndex: 4, overflow: 'visible' }}>
        <TopNav />
      </div>
      <div style={{ position: 'absolute', top: '-9vh', left: 0, right: 0, zIndex: -1 }}>
        <PixelWave color={bgDetail} {...DEFAULT_WAVE_PROPS} {...waveProps} />
      </div>
      <main className="page-main" style={{ position: 'relative', zIndex: 4, flex: 1, pointerEvents: 'none' }}>
        {children}
      </main>
      <footer style={{ position: 'relative', zIndex: 2, overflow: 'hidden', padding: '1rem' }}>
        <FitBorder
          borders={morse}
          style={{ flex: 1, fontSize: '1.5rem', textAlign: 'center', color: 'var(--color-accent-muted)' }}
        />
      </footer>
      {overlay && (
        <div style={{
          position: 'absolute',
          inset: 0,
          zIndex: 3,
          pointerEvents: 'none',
          overflow: 'hidden',
        }}>
          {overlay}
        </div>
      )}
    </ContextMenu>
  );
}
