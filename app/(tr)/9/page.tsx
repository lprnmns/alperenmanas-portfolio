import { KNav } from '@/components/k/KNav';
import { ForCompany } from './ForCompany';

export const metadata = { title: 'Konsept 9 · Firmaya Özel', robots: { index: false } };

export default function Page() {
  return (
    <>
      <ForCompany />
      <KNav n={9} />
    </>
  );
}
