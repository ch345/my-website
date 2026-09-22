'use client';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import AsciiOverlay from '../../components/AsciiOverlay';
import PageLayout from '../../components/PageLayout';
import FitBorder from '../../components/FitBorder';
import { entries, entrySlug } from '../../data/entries';
import { whimsyLine, bannerLine } from '../../assets/ascii/borders';
import { ornament, sakura } from '../../assets/ascii/overlays';

function formatDate(date: Date): string {
  const mm = String(date.getMonth()).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  const yyyy = date.getFullYear();
  return `${mm}.${dd}.${yyyy}`;
}

const overlay = (
  <>
    <AsciiOverlay
      art={ornament}
      style={{ top: '0', right: '2%' }}
    />
    <AsciiOverlay
      art={sakura}
      style={{ top: '24%', left: '12%' }}
    />
  </>
);

export default function Archive() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const preRef = useRef<HTMLPreElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [preMaxWidth, setPreMaxWidth] = useState<number | undefined>(undefined);
  const [imageGapPct, setImageGapPct] = useState(16);

  useEffect(() => {
    const update = () => {
      if (!preRef.current) return;
      const footer = document.querySelector('footer');
      if (!footer) return;
      const top = preRef.current.getBoundingClientRect().top + window.scrollY;
      const footerBottom = footer.getBoundingClientRect().bottom + window.scrollY;
      setPreMaxWidth(footerBottom - top);

      if (containerRef.current) {
        const containerH = containerRef.current.offsetHeight;
        const imageH = 0.32 * window.innerHeight; // 32vh in px
        const needed = containerH > 0 ? (imageH / containerH) * 100 : 16;
        setImageGapPct(Math.max(needed, 4));
      }
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(document.body);
    return () => ro.disconnect();
  }, []);

  return (
    <PageLayout overlay={overlay}>
      <div ref={containerRef} style={{ position: 'relative' }}>

        <pre
          ref={preRef}
          className="ascii"
          style={{
            position: 'absolute',
            left: '0.2rem',
            top: 0,
            margin: 0,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            maxWidth: preMaxWidth ?? '100vh',
            minHeight: '4rem',
            transform: 'rotate(90deg)',
            transformOrigin: 'left top',
            color: 'var(--color-bg-detail)',
            userSelect: 'none',
            pointerEvents: 'none',
            fontSize: '2rem',
          }}
        >
          {whimsyLine[0]}
        </pre>

        <div style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: '20%',
          height: '100%',
          pointerEvents: 'none',
          overflow: 'hidden',
        }}>
          {entries.map((entry, i) => {
            const topPct = entries.length > 1
              ? (i / (entries.length - 1)) * (100 - imageGapPct)
              : 0;
            return (
              <div key={entrySlug(entry.date)} style={{
                position: 'absolute',
                top: `${topPct}%`,
                left: '50%',
                transform: 'translateX(-50%)',
                width: '32vh',
                height: '32vh',
              }}>
                <Image
                  src={entry.image}
                  alt={entry.caption}
                  fill
                  unoptimized
                  className="pixelated"
                  style={{
                    objectFit: 'cover',
                    opacity: hoveredIndex === i ? 1 : 0,
                    transition: hoveredIndex === i
                      ? 'opacity 0.1s ease'
                      : 'opacity 0.9s ease 0.15s',
                  }}
                />
              </div>
            );
          })}
        </div>



        <div style={{
          marginLeft: 'calc(20% + 1.5rem)',
          display: 'flex',
          flexDirection: 'column',
        }}>

          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            padding: '0 3rem',
            color: 'var(--color-accent-muted)',
          }}>
            <p>log</p>
            <h2 style={{ lineHeight: 1 }}>timeline</h2>
            <p>tldr</p>
          </div>

          <FitBorder
            borders={bannerLine}
            style={{ color: 'var(--color-bg-detail)', fontSize: '1rem', textAlign: 'center' }}
          />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', marginTop: '0.5rem' }}>
            {entries.map((entry, i) => (
              <Link
                key={entrySlug(entry.date)}
                href={i === 0 ? '/now' : `/archive/${entrySlug(entry.date)}`}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{
                  position: 'relative',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '2rem',
                  color: hoveredIndex === i ? 'var(--color-accent)' : 'var(--color-text)',
                  textDecoration: 'none',
                  minWidth: 0,
                }}
              >
                {hoveredIndex === i && (
                  <div
                    aria-hidden
                    style={{
                      position: 'absolute',
                      left: 0,
                      right: 0,
                      top: '50%',
                      height: '1px',
                      background: 'var(--color-accent)',
                      transform: 'translateY(-50%)',
                      pointerEvents: 'none',
                    }}
                  />
                )}
                <span style={{ flexShrink: 0 }}>
                  <span style={{ color: hoveredIndex === i ? 'var(--color-accent)' : 'var(--color-bg-detail)' }}>&gt;&nbsp;</span>
                  {formatDate(entry.date)}
                </span>
                <span style={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  textAlign: 'right',
                  minWidth: 0,
                  fontFamily: 'var(--font-title)',
                  fontSize: '1.1em',
                }}>
                  {entry.title}
                </span>
              </Link>
            ))}
          </div>

          <div style={{ marginTop: '4rem', color: 'var(--color-accent-muted)', textAlign: 'right' }}>
            website created March 3rd, 2026
          </div>

        </div>
      </div>
    </PageLayout>
  );
}
