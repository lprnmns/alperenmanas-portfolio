import { getSummary } from '@/lib/live';
import type { Lang } from '@/lib/tl';
import { Home } from './Home';

const FONTS = 'https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500&display=swap';

export async function HomePage({ lang }: { lang: Lang }) {
  const sum = await getSummary();
  return (
    <>
      {/* React 19: <link> gövdede de olsa <head>'e taşınır */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link rel="stylesheet" href={FONTS} precedence="default" />
      <link rel="preload" as="image" href="/img/name-sprite.webp" />
      <div style={{ ['--font-archivo' as string]: 'Archivo', ['--font-mono' as string]: "'JetBrains Mono'" }}>
        <Home lang={lang} sum={sum} />
      </div>
    </>
  );
}
