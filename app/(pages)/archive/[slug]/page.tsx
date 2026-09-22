import { notFound } from 'next/navigation';
import { entries, entrySlug } from '../../../data/entries';
import EntryPage from '../../../components/EntryPage';
import Link from 'next/dist/client/link';

export function generateStaticParams() {
  return entries.map(entry => ({ slug: entrySlug(entry.date) }));
}

export default async function ArchiveEntry({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = entries.find(e => entrySlug(e.date) === slug);
  if (!entry) notFound();
  return <EntryPage entry={entry} footer={
    <div style={{ display: 'flex', flexDirection: 'row', gap: '0.5rem' }}>
      <Link href="/archive/random" style={{ fontFamily: 'var(--font-title)' }}>[<u>random entry</u>]</Link>
      <Link href="/archive" style={{ fontFamily: 'var(--font-title)' }}>[<u>return</u>]</Link>
    </div>
  } />;
}
