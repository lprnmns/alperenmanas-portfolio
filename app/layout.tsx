import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import PreloaderClamp from '@/components/ui/preloader-clamp';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://www.alperenmanas.app'),
  title: 'Alperen Manas - Yazilim Gelistirici & AI Muhendisi',
  description:
    'Android isletim sistemi yazilimlari ve yapay zeka projeleri ile inovatif cozumler ureten yazilim gelistirici.',
  keywords: ['Alperen Manas', 'Yazilim Gelistirici', 'AI Muhendisi', 'Android', 'Python', 'React'],
  authors: [{ name: 'Alperen Manas' }],
  openGraph: {
    title: 'Alperen Manas - Portfolio',
    description: 'Yazilim gelistirici ve AI muhendisi portfolyo sitesi',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" className="dark">
      <body className={inter.className + ' bg-slate-900'}>
        <PreloaderClamp />
        {children}
      </body>
    </html>
  );
}
