import { redirect } from 'next/navigation';
import { entries, entrySlug } from '../../../data/entries';

export function GET() {
  const entry = entries[Math.floor(Math.random() * (entries.length - 1) + 1)];
  const slug = entrySlug(entry.date);
  redirect(`/archive/${slug}`);
}
