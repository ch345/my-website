import Image from 'next/image';
import Link from 'next/link';
import PageLayout from './PageLayout';
import FitBorder from './FitBorder';
import type { ArchiveEntry } from '../data/entries';

export default function EntryPage({ entry, footer }: { entry: ArchiveEntry; footer?: React.ReactNode }) {
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
            {entry.date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
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
            <p>{entry.caption}</p>
          </div>
        </div>

        <div style={{ paddingTop: '1.2rem' }}>
          {footer ?? <Link href="https://nownownow.com/" target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'var(--font-title)' }}>[<u>https://nownownow.com/</u>]</Link>}
        </div>
      </div>
    </PageLayout>
  );
}
