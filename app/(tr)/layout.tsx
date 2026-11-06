import '../globals.css';
import { metaFor } from '@/lib/meta';

export { viewport } from '@/lib/meta';
export const metadata = metaFor('tr');

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
