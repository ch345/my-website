'use client'
import Image from 'next/image';
import Link from 'next/link';
import PageLayout from './PageLayout';
import FitBorder from './FitBorder';
import { useIsMobile } from './useIsMobile';
import type { ArchiveEntry } from '../data/entries';

export default function EntryPage({ entry, footer }: { entry: ArchiveEntry; footer?: React.ReactNode }) {
  const isMobile = useIsMobile();
  const defaultFooter = <Link href="https://nownownow.com/" target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'var(--font-title)' }}>[<u>https://nownownow.com/</u>]</Link>;

  if (isMobile) {
    return (
      <PageLayout overlay={entry.overlay} defaultLightMode={entry.defaultLightMode}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <h2>{entry.title}</h2>

          <p style={{ fontSize: '0.85rem' }}>
            {entry.date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' })}
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <div style={{ position: 'relative', width: '100%', aspectRatio: '4 / 3' }}>
              <Image src={entry.image} alt={entry.caption} fill unoptimized className="pixelated" style={{ objectFit: 'cover' }} />
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-accent-muted)' }}>{entry.caption}</p>
          </div>

          {entry.body && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {entry.body}
            </div>
          )}

          <div style={{ paddingTop: '0.5rem' }}>
            {footer ?? defaultFooter}
          </div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout overlay={entry.overlay} defaultLightMode={entry.defaultLightMode} >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxWidth: '100vw' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '1rem' }}>
          <h2 style={{ maxWidth: '54vw' }}>{entry.title}</h2>
          <FitBorder
            borders={entry.borders}
            style={{ flex: 1, fontSize: '2rem', color: 'var(--color-accent-muted)' }}
          />
          <h2 style={{ fontWeight: '400', whiteSpace: 'nowrap' }}>
            {entry.date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' })}
          </h2>
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '4rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
            {entry.body}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1, alignItems: 'flex-end' }}>
            <div style={{ position: 'relative', width: '100%', height: '54vh' }}>
              <Image src={entry.image} alt={entry.caption} fill unoptimized className="pixelated" style={{ objectFit: 'cover' }} />
            </div>
            <p style={{ color: 'var(--color-accent-muted)' }}>{entry.caption}</p>
          </div>
        </div>

        <div style={{ paddingTop: '1.2rem' }}>
          {footer ?? defaultFooter}
        </div>
      </div>
    </PageLayout>
  );
}
