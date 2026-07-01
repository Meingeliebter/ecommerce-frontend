export const CATEGORIES = [
  { id: "skincare", name: "Skincare", icon: "✨", slug: "skincare" },
  { id: "makeup", name: "Maquillaje", icon: "💄", slug: "makeup" },
  { id: "hair", name: "Cabello", icon: "💇", slug: "hair" },
  { id: "fragrance", name: "Fragancias", icon: "🌸", slug: "fragrance" },
  { id: "offers", name: "Ofertas", icon: "🏷️", slug: "offers" },
];

export const BRANDS = [
  "Beauty Lab",
  "Glow Co",
  "Pure Skin",
  "Luxe Beauty",
  "Nature Glow",
];

export const SKIN_TONES = [
  "Muy claro",
  "Claro",
  "Medio",
  "Medio oscuro",
  "Oscuro",
];

export const SKIN_TYPES = [
  "Normal",
  "Seca",
  "Grasa",
  "Mixta",
  "Sensible",
];

export const PRODUCTS = [
  {
    id: "1",
    slug: "serum-vitamina-c",
    name: "Sérum Vitamina C Iluminador",
    brand: "Glow Co",
    category: "skincare",
    price: 34.9,
    originalPrice: 42.0,
    description:
      "Sérum concentrado con vitamina C pura al 15% que ilumina, unifica el tono y combate los signos del envejecimiento. Textura ligera de rápida absorción.",
    ingredients:
      "Aqua, Ascorbic Acid, Sodium Hyaluronate, Glycerin, Tocopherol, Ferulic Acid, Phenoxyethanol.",
    howToUse:
      "Aplicar 3-4 gotas sobre rostro limpio por la mañana, antes del protector solar. Evitar contacto con ojos.",
    imageUrl:
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1570194065650-d99fb4b3c1a2?w=600&h=600&fit=crop",
    ],
    rating: 4.8,
    reviewCount: 234,
    skinType: ["Normal", "Seca", "Mixta"],
    skinTone: ["Claro", "Medio", "Medio oscuro"],
    stock: 45,
    isNew: true,
    isBestseller: true,
    variants: [{ id: "1-30", label: "30ml", price: 34.9, stock: 45 }],
    reviews: [
      {
        id: "r1",
        author: "Laura M.",
        rating: 5,
        text: "Mi piel brilla desde la primera semana. Textura perfecta.",
        date: "2025-05-12",
      },
      {
        id: "r2",
        author: "Ana P.",
        rating: 4,
        text: "Buen producto, aunque el olor es un poco fuerte al principio.",
        date: "2025-04-28",
      },
    ],
  },
  {
    id: "2",
    slug: "base-mate-larga-duracion",
    name: "Base Mate Larga Duración",
    brand: "Luxe Beauty",
    category: "makeup",
    price: 28.5,
    description:
      "Base de cobertura media-alta con acabado mate natural. Hasta 16 horas de duración sin transferencia.",
    ingredients:
      "Aqua, Cyclopentasiloxane, Titanium Dioxide, Dimethicone, Glycerin, Iron Oxides.",
    howToUse:
      "Aplicar con brocha o esponja sobre la piel hidratada. Construir cobertura según preferencia.",
    imageUrl:
      "https://images.unsplash.com/photo-1596462502278-27bfdd403348?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1596462502278-27bfdd403348?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&h=600&fit=crop",
    ],
    rating: 4.6,
    reviewCount: 189,
    skinType: ["Normal", "Grasa", "Mixta"],
    skinTone: ["Muy claro", "Claro", "Medio", "Medio oscuro", "Oscuro"],
    stock: 8,
    isBestseller: true,
    variants: [
      { id: "2-n1", label: "N1 Porcelana", color: "#f5e6d3", price: 28.5, stock: 12 },
      { id: "2-n3", label: "N3 Beige", color: "#d4a574", price: 28.5, stock: 8 },
      { id: "2-n5", label: "N5 Caramelo", color: "#a67c52", price: 28.5, stock: 15 },
    ],
    reviews: [
      {
        id: "r3",
        author: "Sofía R.",
        rating: 5,
        text: "El tono N3 es perfecto para mi piel. No se transfiere.",
        date: "2025-06-01",
      },
    ],
  },
  {
    id: "3",
    slug: "labial-velvet-rose",
    name: "Labial Velvet Rose",
    brand: "Luxe Beauty",
    category: "makeup",
    price: 18.9,
    description:
      "Labial cremoso de larga duración con acabado aterciopelado. Enriquecido con manteca de karité.",
    ingredients:
      "Ricinus Communis Seed Oil, Shea Butter, Cera Alba, Tocopherol, CI 77491.",
    howToUse: "Aplicar directamente desde el bullet o con pincel labial.",
    imageUrl:
      "https://images.unsplash.com/photo-1586495777744-4413c210a989?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1586495777744-4413c210a989?w=600&h=600&fit=crop",
    ],
    rating: 4.7,
    reviewCount: 312,
    skinType: ["Normal", "Seca"],
    skinTone: ["Muy claro", "Claro", "Medio"],
    stock: 67,
    isNew: true,
    variants: [
      { id: "3-rose", label: "Rose Nude", color: "#c4727a", price: 18.9, stock: 67 },
      { id: "3-berry", label: "Berry Kiss", color: "#8b2252", price: 18.9, stock: 42 },
      { id: "3-coral", label: "Coral Sunset", color: "#e8705a", price: 18.9, stock: 55 },
    ],
    reviews: [],
  },
  {
    id: "4",
    slug: "crema-hidratante-acido-hialuronico",
    name: "Crema Hidratante Ácido Hialurónico",
    brand: "Pure Skin",
    category: "skincare",
    price: 24.0,
    description:
      "Crema hidratante intensiva con triple ácido hialurónico. 72h de hidratación para todo tipo de piel.",
    ingredients:
      "Aqua, Hyaluronic Acid, Squalane, Ceramide NP, Panthenol, Allantoin.",
    howToUse: "Aplicar mañana y noche sobre rostro y cuello limpios.",
    imageUrl:
      "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600&h=600&fit=crop",
    ],
    rating: 4.9,
    reviewCount: 456,
    skinType: ["Normal", "Seca", "Sensible"],
    skinTone: ["Claro", "Medio", "Medio oscuro", "Oscuro"],
    stock: 120,
    isBestseller: true,
    variants: [{ id: "4-50", label: "50ml", price: 24.0, stock: 120 }],
    reviews: [],
  },
  {
    id: "5",
    slug: "mascara-volumen-extremo",
    name: "Máscara Volumen Extremo",
    brand: "Luxe Beauty",
    category: "makeup",
    price: 16.5,
    description:
      "Máscara de pestañas con fórmula resistente al agua. Volumen y longitud sin grumos.",
    ingredients: "Aqua, Beeswax, Carnauba Wax, Iron Oxides, Acacia Senegal Gum.",
    howToUse: "Aplicar de la raíz a las puntas con movimiento en zigzag.",
    imageUrl:
      "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=600&h=600&fit=crop",
    ],
    rating: 4.5,
    reviewCount: 98,
    skinType: ["Normal"],
    skinTone: ["Muy claro", "Claro", "Medio", "Medio oscuro", "Oscuro"],
    stock: 34,
    variants: [{ id: "5-black", label: "Negro", price: 16.5, stock: 34 }],
    reviews: [],
  },
  {
    id: "6",
    slug: "aceite-capilar-argan",
    name: "Aceite Capilar de Argán",
    brand: "Nature Glow",
    category: "hair",
    price: 19.9,
    originalPrice: 26.0,
    description:
      "Aceite nutritivo de argán marroquí puro. Repara puntas, aporta brillo y suavidad sin apelmazar.",
    ingredients: "Argania Spinosa Kernel Oil, Tocopherol, Parfum.",
    howToUse: "Aplicar 2-3 gotas en medios y puntas sobre cabello húmedo o seco.",
    imageUrl:
      "https://images.unsplash.com/photo-1608248543803-ba4f4c4aeafb?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1608248543803-ba4f4c4aeafb?w=600&h=600&fit=crop",
    ],
    rating: 4.7,
    reviewCount: 167,
    skinType: [],
    skinTone: [],
    stock: 89,
    variants: [{ id: "6-100", label: "100ml", price: 19.9, stock: 89 }],
    reviews: [],
  },
  {
    id: "7",
    slug: "perfume-floral-essence",
    name: "Perfume Floral Essence",
    brand: "Beauty Lab",
    category: "fragrance",
    price: 59.0,
    description:
      "Eau de parfum con notas de jazmín, rosa y sándalo. Elegancia floral con proyección duradera.",
    ingredients: "Alcohol Denat, Parfum, Aqua, Benzyl Salicylate, Linalool.",
    howToUse: "Vaporizar a 20cm sobre puntos de pulso: muñecas, cuello, detrás de orejas.",
    imageUrl:
      "https://images.unsplash.com/photo-1541643600914-8b841e7fd3eb?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1541643600914-8b841e7fd3eb?w=600&h=600&fit=crop",
    ],
    rating: 4.8,
    reviewCount: 78,
    skinType: [],
    skinTone: [],
    stock: 25,
    isNew: true,
    variants: [
      { id: "7-50", label: "50ml", price: 59.0, stock: 25 },
      { id: "7-100", label: "100ml", price: 89.0, stock: 12 },
    ],
    reviews: [],
  },
  {
    id: "8",
    slug: "contorno-ojos-cafeina",
    name: "Contorno de Ojos con Cafeína",
    brand: "Glow Co",
    category: "skincare",
    price: 22.0,
    description:
      "Tratamiento descongestionante con cafeína y péptidos. Reduce ojeras y bolsas visiblemente.",
    ingredients: "Aqua, Caffeine, Peptide Complex, Niacinamide, Hyaluronic Acid.",
    howToUse: "Aplicar con suave toque en contorno de ojos mañana y noche.",
    imageUrl:
      "https://images.unsplash.com/photo-1570194065650-d99fb4b3c1a2?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1570194065650-d99fb4b3c1a2?w=600&h=600&fit=crop",
    ],
    rating: 4.4,
    reviewCount: 143,
    skinType: ["Normal", "Sensible", "Mixta"],
    skinTone: ["Claro", "Medio"],
    stock: 56,
    variants: [{ id: "8-15", label: "15ml", price: 22.0, stock: 56 }],
    reviews: [],
  },
];

export const BLOG_POSTS = [
  {
    id: "b1",
    slug: "rutina-skincare-manana",
    title: "La rutina de skincare matutina perfecta en 5 pasos",
    excerpt:
      "Descubre cómo construir una rutina AM eficaz que proteja e ilumine tu piel durante todo el día.",
    category: "Skincare",
    imageUrl:
      "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=800&h=500&fit=crop",
    date: "2025-06-15",
    readTime: "5 min",
    content: `Una buena rutina matutina es la base de una piel saludable. Empieza con una limpieza suave, aplica un sérum con vitamina C, hidrata con crema ligera y nunca olvides el SPF 50.

El orden importa: de texturas más ligeras a más densas. Espera 30 segundos entre cada paso para una mejor absorción.`,
    productIds: ["1", "4"],
  },
  {
    id: "b2",
    slug: "como-elegir-base-maquillaje",
    title: "Cómo elegir la base de maquillaje ideal para tu tono de piel",
    excerpt:
      "Guía completa para encontrar tu match perfecto sin probar 20 tonos diferentes.",
    category: "Maquillaje",
    imageUrl:
      "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800&h=500&fit=crop",
    date: "2025-06-08",
    readTime: "7 min",
    content: `Identifica tu subtono (cálido, frío o neutro) observando las venas de tu muñeca y cómo reacciona tu piel al sol.

Prueba la base en la mandíbula, no en el dorso de la mano. El tono correcto desaparece sobre tu piel sin dejar línea de demarcación.`,
    productIds: ["2"],
  },
  {
    id: "b3",
    slug: "tendencias-belleza-2025",
    title: "Tendencias de belleza 2025: glass skin y skincare minimalista",
    excerpt:
      "Lo que viene este año en el mundo de la belleza: menos es más y piel luminosa.",
    category: "Tendencias",
    imageUrl:
      "https://images.unsplash.com/photo-1596755389378-d907176be8a3?w=800&h=500&fit=crop",
    date: "2025-05-28",
    readTime: "4 min",
    content: `La tendencia glass skin sigue fuerte en 2025. Capas finas de hidratación y sérum iluminador son la clave.

El skincare minimalista gana adeptos: menos productos, pero de mayor calidad e ingredientes activos concentrados.`,
    productIds: ["1", "4", "8"],
  },
];

export const HERO_SLIDES = [
  {
    id: "h1",
    title: "Belleza que te define",
    subtitle: "Nueva colección de skincare con vitamina C",
    cta: "Descubrir",
    link: "/productos/skincare",
    image:
      "https://images.unsplash.com/photo-1596755389378-d907176be8a3?w=1400&h=600&fit=crop",
  },
  {
    id: "h2",
    title: "Maquillaje de lujo accesible",
    subtitle: "Hasta 30% en labiales y bases",
    cta: "Ver ofertas",
    link: "/productos?category=makeup",
    image:
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1400&h=600&fit=crop",
  },
  {
    id: "h3",
    title: "Rutina completa",
    subtitle: "Bundles con 20% de descuento",
    cta: "Comprar bundles",
    link: "/productos",
    image:
      "https://images.unsplash.com/photo-1570194065650-d99fb4b3c1a2?w=1400&h=600&fit=crop",
  },
];

export const POPULAR_SEARCHES = [
  "vitamina c",
  "base mate",
  "labial",
  "hidratante",
  "máscara pestañas",
];
