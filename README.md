# alperenmanas.app

Alperen Manas'ın kişisel sitesi. Tek sayfa, statik (Next.js `output: 'export'`), istemci tarafında JavaScript gerektirmez.

- `/` Türkçe · `/en` English
- İçerik: `lib/content.ts` (iki dil tek dosyada)
- CV: `public/Alperen_Manas_CV.pdf`

```bash
npm install
npm run dev
npm run build   # statik çıktı: out/
```

`main` dalına gönderilen her değişiklik Vercel'de otomatik yayına alınır.
