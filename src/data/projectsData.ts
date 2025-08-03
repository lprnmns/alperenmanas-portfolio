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
    shortDescription: "KOBİ'ler ve girişimciler için yapay zeka destekli, veri-odaklı lokasyon analizi ve skorlama platformu.",
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
    purpose: "Yeni bir işletme açmak isteyen kullanıcıların, rekabet analizi, demografik yapı, yaya trafiği ve erişilebilirlik gibi kritik metrikleri kullanarak, potansiyel konumlar arasından en yüksek başarı potansiyeline sahip olanı bilimsel verilerle bulmalarını sağlamak.",
    techStack: [
      { name: 'JavaScript', category: 'Frontend' }, { name: 'TypeScript', category: 'Frontend' }, { name: 'Tailwind CSS', category: 'Frontend' }, { name: 'HTML', category: 'Frontend' },
      { name: 'Python', category: 'Backend' }, { name: 'Flask', category: 'Backend' }, { name: 'Jupyter Notebook', category: 'Backend' },
      { name: 'SQL', category: 'Database' },
      { name: 'Kimi K-2', category: 'AI & Tools' }, { name: 'Qwen3-Coder', category: 'AI & Tools' }, { name: 'Kiro Code', category: 'AI & Tools' }, { name: 'Roo Code', category: 'AI & Tools' }, { name: 'Claude 4 Sonnet', category: 'AI & Tools' }, { name: 'Prompt Engineering', category: 'AI & Tools' }
    ],
    apis: [
      { name: 'Google Street View Static API', description: 'For providing real-world imagery of locations.' },
      { name: 'OpenStreetMap API', description: 'For map infrastructure and geodata resolution.' }
    ],
    evolution: [
      // ORDER: V4 -> V3 -> V2 -> V1
      { version: 'V4', title: 'Profesyonel Analiz ve Optimizasyon', summary: "Önceki sürümdeki parametre geliştirme önerileri iyiydi ama sürekli değiştirme kısmı zorluyordu. Bunun için daha modern, esnek bir parametre düzenleme sayfası oluşturdum. Buradan 100 puanlık skorun bölümlere göre ağırlıklarını da kolayca ayarlayabildim.", imageUrls: ['/projects/lokaskor/v4-1.png', '/projects/lokaskor/v4-2.png', '/projects/lokaskor/v4-3.png']},
      { version: 'V3', title: 'Modern Karşılaştırma Arayüzü & AI Destekli Optimizasyon', summary: "Parametreleri kusursuza yaklaştırmak için, proje tarafından desteklenen bölgeden rastgele iki lokasyon seçilip, tüm verileriyle karşılaştırıldığı ve benim manuel puanlama yaptığım bir sistem geliştirdim. Bu verileri AI'ya göndererek parametreler için yeni değer önerileri aldım ve sistemi mükemmele yaklaştırdım.", imageUrls: ['/projects/lokaskor/v3-1.png']},
      { version: 'V2', title: 'Veri Yönetim Altyapısı ve Kullanıcı Odaklı Arayüz', summary: "Arayüzü son kullanıcıya daha fazla hitap edecek şekilde geliştirdim. Bu noktada, parametreler işlevsel hale gelmiş ve hesaplanan skorların doğruluk oranı fikir verebilecek seviyeye ulaşmıştı.", imageUrls: ['/projects/lokaskor/v2-1.png', '/projects/lokaskor/v2-2.png']},
      { version: 'V1', title: 'Konseptin Kanıtlanması ve Backend Doğrulaması', summary: "Projenin temel skorlama mantığının ve harita görselleştirmesinin test edildiği ilk prototip. Amaç, backend tarafını kendini kanıtlayana kadar izlemek ve admin panelinden optimal parametreleri ayarlamaktı.", imageUrls: ['/projects/lokaskor/v1-1.png', '/projects/lokaskor/v1-2.png', '/projects/lokaskor/v1-3.png', '/projects/lokaskor/v1-4.png']}
    ]
  }
];