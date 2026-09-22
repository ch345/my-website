'use client'
import Image from 'next/image';
import Link from 'next/link';
import { entries, entrySlug } from '../data/entries';

function formatDate(date: Date): string {
  const mm = String(date.getUTCMonth() + 1).padStart(2, '0');
  const dd = String(date.getUTCDate()).padStart(2, '0');
  const yyyy = date.getUTCFullYear();
  return `${mm}.${dd}.${yyyy}`;
}

export default function ArchiveMobileGrid() {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '0.5rem',
    }}>
      {entries.map((entry, i) => (
        <Link
          key={entrySlug(entry.date)}
          href={i === 0 ? '/now' : `/archive/${entrySlug(entry.date)}`}
          style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', textDecoration: 'none', color: 'inherit' }}
        >
          <div style={{ position: 'relative', width: '100%', aspectRatio: '1 / 1' }}>
            <Image
              src={entry.image}
              alt={entry.caption}
              fill
              unoptimized
              className="pixelated"
              style={{ objectFit: 'cover' }}
            />
          </div>
          <span style={{ textAlign: 'left', color: 'var(--color-accent)', fontSize: '0.85rem' }}>
            {formatDate(entry.date)}
          </span>
        </Link>
      ))}
    </div>
  );
}
