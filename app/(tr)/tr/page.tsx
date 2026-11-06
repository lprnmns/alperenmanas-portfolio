import { HomePage } from '@/components/h/Page';

export const revalidate = 3600;

export default function Page() {
  return <HomePage lang="tr" />;
}
