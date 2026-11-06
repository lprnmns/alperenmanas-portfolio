import { NextResponse, type NextRequest } from 'next/server';

// Ana sayfaya ilk girişte dil seçimi:
//   1) ?lang=tr|en ile gelindiyse (dil düğmesi) tercihi çereze yaz
//   2) çerez varsa ona uy
//   3) yoksa tarayıcı dili Türkçe ise "/" (Türkçe), değilse "/en"
const COOKIE = 'lang';
const YEAR = 60 * 60 * 24 * 365;

function prefersTurkish(header: string | null): boolean {
  if (!header) return true; // dil bilgisi yoksa varsayılan Türkçe
  const first = header.split(',')[0]?.trim().toLowerCase() ?? '';
  return first.startsWith('tr');
}

export function proxy(req: NextRequest) {
  const { pathname, searchParams } = req.nextUrl;
  const asked = searchParams.get('lang');

  if (asked === 'tr' || asked === 'en') {
    const url = req.nextUrl.clone();
    url.searchParams.delete('lang');
    url.pathname = asked === 'en' ? '/en' : '/';
    const res = NextResponse.redirect(url);
    res.cookies.set(COOKIE, asked, { maxAge: YEAR, path: '/', sameSite: 'lax' });
    return res;
  }

  if (pathname === '/') {
    const saved = req.cookies.get(COOKIE)?.value;
    const wantEn = saved ? saved === 'en' : !prefersTurkish(req.headers.get('accept-language'));
    if (wantEn) {
      const url = req.nextUrl.clone();
      url.pathname = '/en';
      return NextResponse.redirect(url);
    }
  }
  return NextResponse.next();
}

export const config = { matcher: ['/', '/en'] };
