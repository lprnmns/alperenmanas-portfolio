import { HomePage } from '@/components/h/Page';
import { getSummary } from '@/lib/live';
import { metaFor } from '@/lib/meta';

export const revalidate = 600;

export async function generateMetadata() {
  const s = await getSummary();
  return metaFor('tr', s);
}

export default function Page() {
  return <HomePage lang="tr" />;
}
