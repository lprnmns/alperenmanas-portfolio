'use client';
import { useState } from 'react';
import s from './s.module.css';

type Item = { t: string; d: string; url?: string };
type Domain = { k: string; t: string; plain: string; x: number; y: number; color: string; items: Item[] };

const DOMAINS: Domain[] = [
  {
    k: 'dogruluk', t: 'Kodun doğruluğu', x: 190, y: 130, color: '#2563eb',
    plain: 'Başka programların güvendiği temel yazılımlarda kural hatalarını bulup testle kanıtlayarak düzeltmek.',
    items: [
      { t: 'meriyah · 23 düzeltme', d: 'Ayda 43 milyon indirilen JavaScript parser’ında dil kuralı hataları', url: 'https://github.com/meriyah/meriyah/pulls?q=is%3Apr+author%3Alprnmns+is%3Amerged' },
      { t: 'minijinja · 15 düzeltme', d: 'Flask’ın yaratıcısının şablon motorunda Go ve Rust sürümlerini eşitlemek', url: 'https://github.com/mitsuhiko/minijinja/pulls?q=is%3Apr+author%3Alprnmns+is%3Amerged' },
      { t: 'marked · KaTeX', d: 'Markdown ve matematik formülü kütüphanelerinde spesifikasyona uyum', url: 'https://github.com/markedjs/marked/pull/4159' },
    ],
  },
  {
    k: 'ai', t: 'Yapay zekâ sistemleri', x: 610, y: 130, color: '#7c3aed',
    plain: 'Yapay zekâyı gerçek bir işin içine güvenilir şekilde yerleştirmek ve ne kadar doğru çalıştığını ölçmek.',
    items: [
      { t: 'BGTS stajı · belge soru-cevap servisi', d: 'Doğru belgeyi %92 oranında ilk 5 sonuçta buluyor; 239 test', url: 'https://github.com/lprnmns/document-intelligence' },
      { t: 'Klinik Akış AI', d: 'WhatsApp’tan gelen randevu taleplerini anlayan asistan', url: 'https://klinikakis.com' },
      { t: 'Microsoft Semantic Kernel', d: 'Boş fonksiyon sonucunda çökmeyi düzelttim', url: 'https://github.com/microsoft/semantic-kernel/pull/14375' },
    ],
  },
  {
    k: 'urun', t: 'Canlı ürünler', x: 190, y: 430, color: '#059669',
    plain: 'Fikri gerçek kullanıcıların kullandığı bir ürüne dönüştürmek: arayüz, sunucu, entegrasyon, yayına alma.',
    items: [
      { t: 'Zenith Trader · 100+ kullanıcı', d: 'Kripto işlemlerini kullanıcı hesaplarına kopyalayan platform', url: 'https://zenithtrader.alperenmanas.app' },
      { t: 'Klinik Akış AI', d: 'Kliniklerin randevu akışını otomatikleştiren ürün', url: 'https://klinikakis.com' },
      { t: 'Monad Blitz · birincilik', d: 'Hackathon süresince ürün fikri geliştirip sundum' },
    ],
  },
  {
    k: 'sistem', t: 'Sistem ve altyapı', x: 610, y: 430, color: '#ea580c',
    plain: 'Yazılımı donanımla, sunucuyla ve diğer sistemlerle güvenilir şekilde konuşturmak.',
    items: [
      { t: 'TEKNOFEST 2026 · finalist', d: 'Taretin takip, atış kontrolü, seri haberleşme ve operatör konsolu', url: 'https://github.com/lprnmns/target-tracking-engagement-system' },
      { t: 'PTT · DevOps stajı', d: 'Docker, Linux, sanallaştırma, deployment' },
      { t: 'Node.js undici · Vite', d: 'Dünyanın en çok indirilen altyapı araçlarında düzeltmeler', url: 'https://github.com/nodejs/undici/pull/6031' },
    ],
  },
];

const C = { x: 400, y: 280 };

export function Atlas() {
  const [k, setK] = useState('dogruluk');
  const d = DOMAINS.find((x) => x.k === k)!;
  return (
    <div className={s.atlas}>
      <div className={s.mapWrap}>
        <svg viewBox="0 0 800 560" className={s.map} role="img" aria-label="Dört çalışma alanı haritası">
          {DOMAINS.map((x) => (
            <g key={x.k}>
              <line x1={C.x} y1={C.y} x2={x.x} y2={x.y} stroke={x.k === k ? x.color : '#cbd5e1'} strokeWidth={x.k === k ? 3 : 1.5} strokeDasharray={x.k === k ? '0' : '5 6'} />
              {x.items.map((it, i) => {
                const ang = (x.x < C.x ? Math.PI : 0) + (i - 1) * 0.62 + (x.y < C.y ? -0.35 : 0.35) * (x.x < C.x ? -1 : 1);
                const lx = x.x + Math.cos(ang) * 120;
                const ly = x.y + Math.sin(ang) * 95;
                return (
                  <g key={it.t} opacity={x.k === k ? 1 : 0.35}>
                    <line x1={x.x} y1={x.y} x2={lx} y2={ly} stroke={x.color} strokeWidth="1.2" />
                    <circle cx={lx} cy={ly} r="7" fill="#fff" stroke={x.color} strokeWidth="2.5" />
                  </g>
                );
              })}
            </g>
          ))}
          <circle cx={C.x} cy={C.y} r="54" fill="#111827" />
          <text x={C.x} y={C.y - 4} textAnchor="middle" fill="#fff" fontSize="17" fontWeight="800">Alperen</text>
          <text x={C.x} y={C.y + 16} textAnchor="middle" fill="#9ca3af" fontSize="12">4. sınıf · Bilg. Müh.</text>
          {DOMAINS.map((x) => (
            <g key={x.k} className={s.node} onClick={() => setK(x.k)} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && setK(x.k)} aria-pressed={x.k === k}>
              <circle cx={x.x} cy={x.y} r={x.k === k ? 50 : 44} fill={x.k === k ? x.color : '#fff'} stroke={x.color} strokeWidth="3" />
              {x.t.split(' ').map((w, i, arr) => (
                <text key={w} x={x.x} y={x.y + (i - (arr.length - 1) / 2) * 16 + 5} textAnchor="middle" fontSize="14" fontWeight="800" fill={x.k === k ? '#fff' : x.color}>
                  {w}
                </text>
              ))}
            </g>
          ))}
        </svg>
        <p className={s.hint}>Bir alana tıklayın</p>
        <div className={s.mobileTabs}>
          {DOMAINS.map((x) => (
            <button key={x.k} onClick={() => setK(x.k)} style={{ borderColor: x.color, background: x.k === k ? x.color : '#fff', color: x.k === k ? '#fff' : x.color }}>
              {x.t}
            </button>
          ))}
        </div>
      </div>
      <div className={s.panel} style={{ borderTopColor: d.color }}>
        <p className={s.panelK} style={{ color: d.color }}>Alan</p>
        <h2>{d.t}</h2>
        <p className={s.panelPlain}>{d.plain}</p>
        <ul>
          {d.items.map((it) => (
            <li key={it.t} style={{ borderLeftColor: d.color }}>
              {it.url ? <a href={it.url} target="_blank" rel="noopener noreferrer"><b>{it.t}</b></a> : <b>{it.t}</b>}
              <span>{it.d}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
