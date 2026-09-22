import ContextMenu from './ContextMenu';
import TopNav from './TopNav';
import PixelWave from './PixelWave';
import FitBorder from './FitBorder';
import { morse } from '../assets/ascii/borders';

export default function PageLayout({
  children,
  overlay,
  defaultLightMode = true,
}: {
  children: React.ReactNode;
  overlay?: React.ReactNode;
  defaultLightMode?: boolean;
}) {
  const bg = defaultLightMode ? 'var(--color-bg)' : 'var(--color-bg-dark)';
  const bgDetail = defaultLightMode ? 'var(--color-bg-detail)' : 'var(--color-bg-dark-detail)';
  const text = defaultLightMode ? 'var(--color-text)' : 'var(--color-text-dark)';

  const themeOverrides: React.CSSProperties = defaultLightMode
    ? {}
    : ({
        '--color-bg': 'var(--color-bg-dark)',
        '--color-bg-detail': 'var(--color-bg-dark-detail)',
        '--color-text': 'var(--color-text-dark)',
      } as React.CSSProperties);

  return (
    <ContextMenu style={{
      position: 'relative',
      minHeight: '100vh',
      isolation: 'isolate',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: bg,
      color: text,
      ...themeOverrides,
    } as React.CSSProperties}>
      <div style={{ position: 'relative', zIndex: 4, overflow: 'visible' }}>
        <TopNav />
        <div style={{ position: 'absolute', top: '-9vh', left: 0, right: 0, zIndex: -1 }}>
          <PixelWave color={bgDetail} pixelSize={6} gap={3} shape='circle' sharpness={3} speed={0.5} />
        </div>
      </div>
      <main style={{ position: 'relative', zIndex: 4, flex: 1, padding: '2rem 8rem 0rem', pointerEvents: 'none' }}>
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
