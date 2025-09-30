import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Alperen Manas - Yazılım Geliştirici & AI Mühendisi',
  description: 'Android işletim sistemi yazılımları ve yapay zeka projeleri ile inovatif çözümler üreten yazılım geliştirici.',
  keywords: ['Alperen Manas', 'Yazılım Geliştirici', 'AI Mühendisi', 'Android', 'Python', 'React'],
  authors: [{ name: 'Alperen Manas' }],
  openGraph: {
    title: 'Alperen Manas - Portfolio',
    description: 'Yazılım geliştirici ve AI mühendisi portfolyo sitesi',
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
      <body className={`${inter.className} bg-slate-900`}>{children}</body>
    </html>
  );
}
