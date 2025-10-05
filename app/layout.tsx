import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { LanguageProvider } from '@/components/providers/LanguageProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://www.alperenmanas.app'),
  title: 'Alperen Manas – Software Engineer & AI Specialist',
  description:
    'Software engineer building Android system experiences and AI-powered products that deliver measurable results.',
  keywords: ['Alperen Manas', 'Software Engineer', 'AI Specialist', 'Android', 'Python', 'React'],
  authors: [{ name: 'Alperen Manas' }],
  openGraph: {
    title: 'Alperen Manas – Portfolio',
    description: 'Software engineer and AI specialist portfolio site',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className + ' bg-slate-900'}>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}

