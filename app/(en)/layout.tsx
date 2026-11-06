import '../globals.css';
import { metaFor } from '@/lib/meta';

export { viewport } from '@/lib/meta';
export const metadata = metaFor('en');

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
