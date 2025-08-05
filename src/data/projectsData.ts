// src/data/projectsData.ts
export interface Project {
  slug: string;
  title: string;
  shortDescription: string;
  coverImageUrl: string;
  liveUrl?: string;
  githubUrl: string;
  carouselImages: string[];
  purpose: string;
  subscriberCount?: string;
  techStack: { name: string, category: 'Frontend' | 'Backend' | 'Database' | 'AI & Tools' }[];
  apis: { name: string, description: string }[];
  evolution: {
    version: string;
    title: string;
    summary: string;
    imageUrls: string[];
  }[];
}

export const projectsData: Project[] = [
  {
    slug: 'lokaskor-ai-location-analysis',
    title: 'LokaSkor Pro',
    shortDescription: "KOBİ&apos;ler ve girişimciler için yapay zeka destekli, veri-odaklı lokasyon analizi ve skorlama platformu.",
    coverImageUrl: '/projects/lokaskor/cover.png',
    liveUrl: 'https://lokaskor.alperenmanas.app',
    githubUrl: 'https://github.com/lprnmns/lokaSkor',
    // There are 7 carousel images
    carouselImages: [
        '/projects/lokaskor/carousel-1.png',
        '/projects/lokaskor/carousel-2.png',
        '/projects/lokaskor/carousel-3.png',
        '/projects/lokaskor/carousel-4.png',
        '/projects/lokaskor/carousel-5.png',
        '/projects/lokaskor/carousel-6.png',
        '/projects/lokaskor/carousel-7.png'
    ],
    purpose: "Yeni bir işletme açmak isteyen kullanıcıların, rekabet analizi, demografik yapı, yaya trafiği ve erişilebilik gibi kritik metrikleri kullanarak, potansiyel konumlar arasından en yüksek başarı potansiyeline sahip olanı bilimsel verilerle bulmalarını sağlamak.",
    techStack: [
      { name: 'JavaScript', category: 'Frontend' }, { name: 'TypeScript', category: 'Frontend' }, { name: 'Tailwind CSS', category: 'Frontend' }, { name: 'HTML', category: 'Frontend' },
      { name: 'Python', category: 'Backend' }, { name: 'Flask', category: 'Backend' }, { name: 'Jupyter Notebook', category: 'Backend' },
      { name: 'SQLite', category: 'Database' },
      { name: 'Kimi K-2', category: 'AI & Tools' }, { name: 'Qwen3-Coder', category: 'AI & Tools' }, { name: 'Kiro Code', category: 'AI & Tools' }, { name: 'Roo Code', category: 'AI & Tools' }, { name: 'Claude 4 Sonnet', category: 'AI & Tools' }, { name: 'Prompt Engineering', category: 'AI & Tools' }
    ],
    apis: [
      { name: 'Google Street View Static API', description: 'For providing real-world imagery of locations.' },
      { name: 'OpenStreetMap API', description: 'For map infrastructure and geodata resolution.' }
    ],
    evolution: [
      // ORDER: V4 -> V3 -> V2 -> V1
      { version: 'V4', title: 'Profesyonel Analiz ve Optimizasyon', summary: "Önceki sürümdeki parametre geliştirme önerileri iyiydi ama sürekli değiştirme kısmı zorluyordu. Bunun için daha modern, esnek bir parametre düzenleme sayfası oluşturdum. Buradan 100 puanlık skorun bölümlere göre ağırlıklarını da kolayca ayarlayabildim.", imageUrls: ['/projects/lokaskor/v4-1.png', '/projects/lokaskor/v4-2.png', '/projects/lokaskor/v4-3.png']},
      { version: 'V3', title: 'Modern Karşılaştırma Arayüzü & AI Destekli Optimizasyon', summary: "Parametreleri kusursuza yaklaştırmak için, proje tarafından desteklenen bölgeden rastgele iki lokasyon seçilip, tüm verileriyle karşılaştırıldığı ve benim manuel puanlama yaptığım bir sistem geliştirdim. Bu verileri AI&apos;ya göndererek parametreler için yeni değer önerileri aldım ve sistemi mükemmele yaklaştırdım.", imageUrls: ['/projects/lokaskor/v3-1.png']},
      { version: 'V2', title: 'Veri Yönetim Altyapısı ve Kullanıcı Odaklı Arayüz', summary: "Arayüzü son kullanıcıya daha fazla hitap edecek şekilde geliştirdim. Bu noktada, parametreler işlevsel hale gelmiş ve hesaplanan skorların doğruluk oranı fikir verebilecek seviyeye ulaşmıştı.", imageUrls: ['/projects/lokaskor/v2-1.png', '/projects/lokaskor/v2-2.png']},
      { version: 'V1', title: 'Konseptin Kanıtlanması ve Backend Doğrulaması', summary: "Projenin temel skorlama mantığının ve harita görselleştirmesinin test edildiği ilk prototip. Amaç, backend tarafını kendini kanıtlayana kadar izlemek ve admin panelinden optimal parametreleri ayarlamaktı.", imageUrls: ['/projects/lokaskor/v1-1.png', '/projects/lokaskor/v1-2.png', '/projects/lokaskor/v1-3.png', '/projects/lokaskor/v1-4.png']}
    ]
  },
  {
    slug: 'not-bildirim-otomasyonu',
    title: 'Not Bildirim Otomasyonu',
    shortDescription: 'Kırıkkale Üniversitesi OBS\'i İçin Not Bildirim Otomasyonu',
    coverImageUrl: '/projects/not-bildirim-otomasyonu/cover.png',
    githubUrl: 'https://github.com/lprnmns/not-bildirim-otomasyonu',
    carouselImages: [
      '/projects/not-bildirim-otomasyonu/carousel-1.png',
      '/projects/not-bildirim-otomasyonu/carousel-2.png',
      '/projects/not-bildirim-otomasyonu/carousel-3.png',
      '/projects/not-bildirim-otomasyonu/carousel-4.png',
      '/projects/not-bildirim-otomasyonu/carousel-5.jpg',
      '/projects/not-bildirim-otomasyonu/carousel-6.jpg'
    ],
    purpose: "İlk olarak kendime üniversitenin obs sistemine 4 dakika bir giriş yapacak bir otomasyon oluşturdum.Her girişte id selector ile not tablosunu çekmeye çalıştım ama sanırım güvenlikten dolayı dinamik id&apos;ler tanımlandığı için bu yöntem başarısız oldu.Onun yerine not tablosunun sayfasına yine otomasyonla gelip, ekran görüntüsü aldırıp, onu görüntü işleme kütüphanesiyle tabloya ayırdım.Her not tablosundaki veriyi json formatında sakladım.Her kontrolde eski json ile yenisini karşılaştırıp farkları(yeni not girişlerini) bildirim olarak almayı amaçladım.Bu aşamada telegram botlarını kullandım ve bildirimleri onun aracılığıyla aldım.Talep olunca sonraki sınav dönemine kadar herkesin kullanabileceği bir telegram botu ve telegram kullanmayanlar için e-posta aboneliğini yaptım.Üst sınıf olup benim derslerimi alanlar da faydalanabilsin diye her abonelik kaydında ders seçimi ekledim.En büyük engel captcha-robot musun? tesleri oldu.Bunun için önce maliyetsiz olduğu için açık kaynaklı,derin öğrenme destekli modeller kullandım ama başarı oranı %60&apos;ı geçemedi.Onun yerie 2-captcha hizmetini alarak cüzi bir miktar ile %99'a kadar doğruluk oranı yakaladım.Özetle SADECE BENİM ALDIĞIM DERSLER için otomasyon kullanarak bir not bildirim sistemi oluşturdum.",
    subscriberCount: '+30',
    techStack: [
      { name: 'HTML', category: 'Frontend' }, { name: 'CSS', category: 'Frontend' }, { name: 'JavaScript', category: 'Frontend' }, { name: 'Jinja2', category: 'Frontend' },
      { name: 'Python', category: 'Backend' }, { name: 'Flask', category: 'Backend' }, { name: 'BeautifulSoup4', category: 'Backend' }, { name: 'Selenium', category: 'Backend' }, { name: 'Requests', category: 'Backend' },
      { name: 'JSON Storage', category: 'Database' },
      { name: 'QWEN3-coder', category: 'AI & Tools' }, { name: 'Kimi-K2', category: 'AI & Tools' }
    ],
    apis: [
      { name: 'Telegram Bot API', description: 'For user notifications and bot interactions' },
      { name: 'Google Gmail SMTP API', description: 'For email notifications' },
      { name: '2Captcha API', description: 'For bypassing CAPTCHA in the OBS system' }
    ],
    evolution: []
  },
  {
    slug: 'iran-airspace-monitor',
    title: 'İran Hava Sahası Monitör',
    shortDescription: 'İran-İsrail gerginliğinde, İran\'ın kapalı hava sahasına girip yardım getiren uçaklardan destek olan ülkeleri anlamak için hobi amaçlı geliştirilmiş bir web sitesi.',
    coverImageUrl: '/projects/iran-havasahasi-monitor/cover.png',
    githubUrl: 'https://github.com/lprnmns/iran_havasahasi_monitor',
    carouselImages: [
      '/projects/iran-havasahasi-monitor/carousel-1.png',
      '/projects/iran-havasahasi-monitor/carousel-2.png'
    ],
    purpose: 'İran-İsrail gerginliğinde, İran\'ın kapalı hava sahasına girip yardım getiren uçaklardan destek olan ülkeleri anlamak için hobi amaçlı geliştirilmiş bir web sitesi',
    techStack: [
      { name: 'HTML', category: 'Frontend' }, { name: 'CSS', category: 'Frontend' }, { name: 'JavaScript', category: 'Frontend' }, { name: 'Leaflet.js', category: 'Frontend' },
      { name: 'Python', category: 'Backend' }, { name: 'Flask', category: 'Backend' }, { name: 'Shapely', category: 'Backend' }, { name: 'pywebpush', category: 'Backend' }, { name: 'requests', category: 'Backend' },
      { name: 'In-memory storage', category: 'Database' },
      { name: 'QWEN3-coder', category: 'AI & Tools' }, { name: 'Kimi-K2', category: 'AI & Tools' }
    ],
    apis: [
      { name: 'OpenSky Network API', description: 'For retrieving real-time aircraft data.' },
      { name: 'Google AdSense API', description: 'For displaying advertisements on the website.' },
      { name: 'OpenStreetMap API', description: 'For providing map tiles and geospatial data.' },
      { name: 'Web Push API', description: 'For sending notifications to subscribed users.' }
    ],
    evolution: [] // This array is intentionally empty.
  }
];