import { entries } from '../../data/entries';
import EntryPage from '../../components/EntryPage';

export default function Now() {
  return <EntryPage entry={entries[0]} />;
}
