import {
  Product,
  Category,
  Collection,
  Order,
  Customer,
  Review,
  Coupon,
  StoreSettings,
  InventoryLog,
  AuditLog,
  StaffMember,
  AbandonedCart
} from '../types';

import bannerImg from '../assets/images/banner.png';
import clothImg from '../assets/images/cloth.webp';
import heroImg from '../assets/images/hero_luxury_pret_1790862593457.jpg';
import emeraldAnarkaliImg from '../assets/images/product_emerald_anarkali_1790862608324.jpg';
import sageCoordImg from '../assets/images/product_sage_coord_1790862622925.jpg';
import velvetSuitImg from '../assets/images/product_velvet_shawl_suit_1790862639133.jpg';

export const INITIAL_CATEGORIES: Category[] = [
  {
    id: 'cat-1',
    name: 'Shalwar Kameez',
    slug: 'shalwar-kameez',
    description: 'Timeless traditional silhouettes crafted in hand-spun cotton and pure organza.',
    image: emeraldAnarkaliImg,
    itemCount: 14,
    status: 'active',
    seoTitle: 'Designer Shalwar Kameez for Women | Comfort',
    seoDescription: 'Shop handcrafted Shalwar Kameez suits featuring intricate embroidery and opulent silk fabrics.'
  },
  {
    id: 'cat-2',
    name: 'Luxury Pret',
    slug: 'luxury-pret',
    description: 'Ready-to-wear haute couture tailored for evening galas and festive soirees.',
    image: clothImg,
    itemCount: 18,
    status: 'active',
    seoTitle: 'Pakistani Luxury Pret Collection | Comfort',
    seoDescription: 'Discover ready-to-wear luxury pret with regal tilla and zardozi embellishments.'
  },
  {
    id: 'cat-3',
    name: 'Kurti & Tunics',
    slug: 'kurti-tunics',
    description: 'Effortless single-piece tunics with modern cuts, tailored cuffs, and threadwork.',
    image: emeraldAnarkaliImg,
    itemCount: 12,
    status: 'active',
    seoTitle: 'Designer Kurtis & Tunics | Comfort',
    seoDescription: 'Sophisticated women’s kurtis in breathable pure linen, lawn, and raw silk.'
  },
  {
    id: 'cat-4',
    name: 'Co-Ord Sets',
    slug: 'co-ord-sets',
    description: 'Monochromatic relaxed luxury tailored sets combining comfort with runway chic.',
    image: sageCoordImg,
    itemCount: 9,
    status: 'active',
    seoTitle: 'Luxury Co-Ord Sets for Women | Comfort',
    seoDescription: 'Modern luxury two-piece and three-piece co-ords in soft sage, ivory, and olive tones.'
  },
  {
    id: 'cat-5',
    name: 'Velvet Edition',
    slug: 'velvet-edition',
    description: 'Sumptuous micro-velvet formal suits with heavily embroidered shawl dupattas.',
    image: velvetSuitImg,
    itemCount: 8,
    status: 'active',
    seoTitle: 'Royal Velvet Designer Collection | Comfort',
    seoDescription: 'Experience winter luxury with deep jewel-toned embroidered velvet ensembles.'
  },
  {
    id: 'cat-6',
    name: 'Dupattas & Shawls',
    slug: 'dupattas-shawls',
    description: 'Hand-painted organza, pure chiffon, and Pashmina embroidered heritage wraps.',
    image: emeraldAnarkaliImg,
    itemCount: 11,
    status: 'active',
    seoTitle: 'Artisanal Dupattas & Shawls | Comfort',
    seoDescription: 'Statement dupattas designed to complete your luxury ethnic wardrobe.'
  }
];

export const INITIAL_COLLECTIONS: Collection[] = [
  {
    id: 'col-1',
    name: 'Festive Pret 2026',
    slug: 'festive-pret-2026',
    description: 'Opulent gold zardozi, hand-stitched sequins, and pure raw silk creations.',
    image: clothImg,
    isFeatured: true,
    status: 'active'
  },
  {
    id: 'col-2',
    name: 'The Emerald Realm',
    slug: 'the-emerald-realm',
    description: 'Rooted in our signature Deep Forest, Deep Teal, and Emerald Green signature tones.',
    image: emeraldAnarkaliImg,
    isFeatured: true,
    status: 'active'
  },
  {
    id: 'col-3',
    name: 'Linen & Silk Co-Ords',
    slug: 'linen-silk-coords',
    description: 'Contemporary lounge and executive wear designed for all-day comfort.',
    image: sageCoordImg,
    isFeatured: true,
    status: 'active'
  },
  {
    id: 'col-4',
    name: 'Heritage Velvet',
    slug: 'heritage-velvet',
    description: 'Royal court-inspired silhouettes adorned with antique dabka and zari.',
    image: velvetSuitImg,
    isFeatured: false,
    status: 'active'
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-cloth-signature',
    title: 'Meher-o-Maha Embroidered Chiffon & Silk Ensemble',
    slug: 'meher-o-maha-embroidered-chiffon-silk-ensemble',
    sku: 'COM-SIG-001',
    barcode: '896400192801',
    description: 'The defining masterpiece of the Comfort 2026 Festive Collection. Features intricate multi-toned threadwork, antique gold tilla, and hand-placed sequins on pure diaphanous chiffon and raw silk. Accompanied by an embroidered scalloped organza dupatta and tailored silk cigarette trousers with matching embroidered cuffs. Designed for peerless comfort and head-turning elegance.',
    category: 'Luxury Pret',
    collection: 'Festive Pret 2026',
    tags: ['Signature', 'Chiffon', 'Raw Silk', 'Tilla Embroidery', 'Festive', 'Comfort Iconic'],
    price: 26500,
    compareAtPrice: 32000,
    costPrice: 13500,
    stock: 28,
    lowStockThreshold: 5,
    isPublished: true,
    badge: 'Bestseller',
    images: [clothImg, bannerImg, emeraldAnarkaliImg, heroImg],
    fabric: 'Pure Chiffon & 80g Hand-Spun Raw Silk with Silk Tissue Dupatta',
    style: 'A-Line Flared Tunic with Detailed Cuffs and Cigarette Trousers',
    length: 'Shirt Length: 48 inches, Pants: 38 inches',
    careInstructions: [
      'Dry clean only',
      'Do not bleach or wring',
      'Iron at low heat using a protective press cloth',
      'Store hanging inside the provided breathable garment bag'
    ],
    rating: 5.0,
    reviewCount: 36,
    seoTitle: 'Meher-o-Maha Signature Luxury Pret Suit | Comfort',
    seoDescription: 'Shop our signature Meher-o-Maha hand-embroidered chiffon and raw silk formal suit.',
    createdAt: '2026-09-12T10:00:00Z',
    updatedAt: '2026-09-30T16:00:00Z',
    variants: [
      {
        id: 'var-sig-xs',
        size: 'XS',
        color: 'Deep Teal',
        colorHex: '#12544F',
        sku: 'COM-SIG-001-XS',
        price: 26500,
        compareAtPrice: 32000,
        stock: 4,
        lowStockThreshold: 2
      },
      {
        id: 'var-sig-s',
        size: 'S',
        color: 'Deep Teal',
        colorHex: '#12544F',
        sku: 'COM-SIG-001-S',
        price: 26500,
        compareAtPrice: 32000,
        stock: 8,
        lowStockThreshold: 2
      },
      {
        id: 'var-sig-m',
        size: 'M',
        color: 'Deep Teal',
        colorHex: '#12544F',
        sku: 'COM-SIG-001-M',
        price: 26500,
        compareAtPrice: 32000,
        stock: 9,
        lowStockThreshold: 3
      },
      {
        id: 'var-sig-l',
        size: 'L',
        color: 'Deep Teal',
        colorHex: '#12544F',
        sku: 'COM-SIG-001-L',
        price: 26500,
        compareAtPrice: 32000,
        stock: 5,
        lowStockThreshold: 2
      },
      {
        id: 'var-sig-xl',
        size: 'XL',
        color: 'Deep Teal',
        colorHex: '#12544F',
        sku: 'COM-SIG-001-XL',
        price: 26500,
        compareAtPrice: 32000,
        stock: 2,
        lowStockThreshold: 2
      }
    ]
  },
  {
    id: 'prod-1',
    title: 'Noor-e-Kashmir Raw Silk Kalidar',
    slug: 'noor-e-kashmir-raw-silk-kalidar',
    sku: 'COM-LPR-001',
    barcode: '896400192831',
    description: 'An ethereal deep emerald kalidar silhouette crafted from pure 80g raw silk. Delicately hand-embroidered with tilla threadwork, floral vines along the neckline and hemline, paired with a sheer organza dupatta finished with scalloped border detailing and tailored silk cigarette trousers.',
    category: 'Luxury Pret',
    collection: 'The Emerald Realm',
    tags: ['Raw Silk', 'Kalidar', 'Emerald', 'Hand Embroidery', 'Formal'],
    price: 24500,
    compareAtPrice: 28500,
    costPrice: 13000,
    stock: 22,
    lowStockThreshold: 5,
    isPublished: true,
    badge: 'Bestseller',
    images: [emeraldAnarkaliImg, heroImg, velvetSuitImg],
    fabric: '100% Pure Raw Silk with Tissue Silk Dupatta',
    style: 'Flared A-line Kalidar with Churidar Trouser',
    length: 'Shirt Length: 52 inches',
    careInstructions: [
      'Dry clean only',
      'Do not bleach or tumble dry',
      'Iron at medium heat with protective cloth'
    ],
    rating: 4.9,
    reviewCount: 28,
    seoTitle: 'Noor-e-Kashmir Raw Silk Kalidar | Comfort Luxury Pret',
    seoDescription: 'Shop our signature Noor-e-Kashmir pure raw silk kalidar featuring antique tilla embroidery.',
    createdAt: '2026-08-15T10:00:00Z',
    updatedAt: '2026-09-28T14:30:00Z',
    variants: [
      {
        id: 'var-1-s',
        size: 'S',
        color: 'Deep Teal',
        colorHex: '#12544F',
        sku: 'COM-LPR-001-S-TEA',
        price: 24500,
        compareAtPrice: 28500,
        stock: 6,
        lowStockThreshold: 2
      },
      {
        id: 'var-1-m',
        size: 'M',
        color: 'Deep Teal',
        colorHex: '#12544F',
        sku: 'COM-LPR-001-M-TEA',
        price: 24500,
        compareAtPrice: 28500,
        stock: 8,
        lowStockThreshold: 3
      },
      {
        id: 'var-1-l',
        size: 'L',
        color: 'Deep Teal',
        colorHex: '#12544F',
        sku: 'COM-LPR-001-L-TEA',
        price: 24500,
        compareAtPrice: 28500,
        stock: 5,
        lowStockThreshold: 2
      },
      {
        id: 'var-1-xl',
        size: 'XL',
        color: 'Deep Teal',
        colorHex: '#12544F',
        sku: 'COM-LPR-001-XL-TEA',
        price: 24500,
        compareAtPrice: 28500,
        stock: 3,
        lowStockThreshold: 2
      }
    ]
  },
  {
    id: 'prod-2',
    title: 'Zehra Embroidered Sage Linen Co-Ord',
    slug: 'zehra-embroidered-sage-linen-coord',
    sku: 'COM-CRD-002',
    barcode: '896400192842',
    description: 'Understated elegance defined. Crafted from breezy organic high-count linen in soft sage, this relaxed fit tunic features subtle tonal thread embroidery across the lapel and sleeve hems, paired with wide-leg cropped trousers with deep functional pockets.',
    category: 'Co-Ord Sets',
    collection: 'Linen & Silk Co-Ords',
    tags: ['Linen', 'Sage Green', 'Co-Ord', 'Minimalist', 'Summer Luxury'],
    price: 13800,
    compareAtPrice: 16500,
    costPrice: 6500,
    stock: 18,
    lowStockThreshold: 4,
    isPublished: true,
    badge: 'Trending',
    images: [sageCoordImg, emeraldAnarkaliImg],
    fabric: 'Organic High-Count Linen & Slub Viscose',
    style: 'Relaxed Tunic with Wide-Leg Trousers',
    length: 'Shirt Length: 38 inches, Pants: 37 inches',
    careInstructions: [
      'Gentle hand wash in cold water or dry clean',
      'Line dry in shade',
      'Warm steam iron'
    ],
    rating: 4.8,
    reviewCount: 19,
    seoTitle: 'Zehra Sage Linen Co-Ord Set | Comfort Designer Wear',
    seoDescription: 'Modern Pakistani luxury lounge co-ord in soft sage linen with tonal hand embroidery.',
    createdAt: '2026-09-01T12:00:00Z',
    updatedAt: '2026-09-30T09:15:00Z',
    variants: [
      {
        id: 'var-2-s',
        size: 'S',
        color: 'Soft Sage',
        colorHex: '#8BBB92',
        sku: 'COM-CRD-002-S-SAG',
        price: 13800,
        compareAtPrice: 16500,
        stock: 5,
        lowStockThreshold: 2
      },
      {
        id: 'var-2-m',
        size: 'M',
        color: 'Soft Sage',
        colorHex: '#8BBB92',
        sku: 'COM-CRD-002-M-SAG',
        price: 13800,
        compareAtPrice: 16500,
        stock: 7,
        lowStockThreshold: 2
      },
      {
        id: 'var-2-l',
        size: 'L',
        color: 'Soft Sage',
        colorHex: '#8BBB92',
        sku: 'COM-CRD-002-L-SAG',
        price: 13800,
        compareAtPrice: 16500,
        stock: 4,
        lowStockThreshold: 2
      },
      {
        id: 'var-2-xl',
        size: 'XL',
        color: 'Soft Sage',
        colorHex: '#8BBB92',
        sku: 'COM-CRD-002-XL-SAG',
        price: 13800,
        compareAtPrice: 16500,
        stock: 2,
        lowStockThreshold: 2
      }
    ]
  },
  {
    id: 'prod-3',
    title: 'Gulrukh Micro-Velvet Tilla Suit',
    slug: 'gulrukh-micro-velvet-tilla-suit',
    sku: 'COM-VLV-003',
    barcode: '896400192853',
    description: 'An ode to Mughal royalty. Deep forest green 9000 pure micro-velvet shirt and trouser set, accented with antique burnished gold tilla embroidery along the daaman, neckline, and cuffs. Accompanied by a heavy Kashmiri tilla border organza dupatta with hand-finished kiran lace.',
    category: 'Velvet Edition',
    collection: 'Heritage Velvet',
    tags: ['Micro Velvet', 'Forest Green', 'Bridal Festive', 'Zari', 'Winter Couture'],
    price: 38500,
    compareAtPrice: 44000,
    costPrice: 21000,
    stock: 9,
    lowStockThreshold: 3,
    isPublished: true,
    badge: 'Limited Stock',
    images: [velvetSuitImg, heroImg, emeraldAnarkaliImg],
    fabric: 'Premium 9000 Pure Micro-Velvet with Embroidered Organza Shawl',
    style: 'Straight Cut Long Kurta with Velvet Izaar Trousers',
    length: 'Shirt Length: 48 inches',
    careInstructions: [
      'Strictly dry clean only',
      'Store in cotton muslin garment bag',
      'Do not spray perfume directly on tilla embroidery'
    ],
    rating: 5.0,
    reviewCount: 34,
    seoTitle: 'Gulrukh Micro-Velvet Tilla Suit | Comfort Winter Edition',
    seoDescription: 'Exquisite deep forest green micro-velvet formal suit with antique gold tilla craftsmanship.',
    createdAt: '2026-08-20T08:30:00Z',
    updatedAt: '2026-09-29T16:00:00Z',
    variants: [
      {
        id: 'var-3-s',
        size: 'S',
        color: 'Deep Forest',
        colorHex: '#092328',
        sku: 'COM-VLV-003-S-FOR',
        price: 38500,
        compareAtPrice: 44000,
        stock: 2,
        lowStockThreshold: 1
      },
      {
        id: 'var-3-m',
        size: 'M',
        color: 'Deep Forest',
        colorHex: '#092328',
        sku: 'COM-VLV-003-M-FOR',
        price: 38500,
        compareAtPrice: 44000,
        stock: 4,
        lowStockThreshold: 2
      },
      {
        id: 'var-3-l',
        size: 'L',
        color: 'Deep Forest',
        colorHex: '#092328',
        sku: 'COM-VLV-003-L-FOR',
        price: 38500,
        compareAtPrice: 44000,
        stock: 3,
        lowStockThreshold: 2
      }
    ]
  },
  {
    id: 'prod-4',
    title: 'Aura Embroidered Lawn Shalwar Kameez',
    slug: 'aura-embroidered-lawn-shalwar-kameez',
    sku: 'COM-SHK-004',
    barcode: '896400192864',
    description: 'Pure 100% combed supima lawn three-piece suit adorned with intricate resham embroidery, schiffli cutwork daman, printed pure silk medium dupatta, and tailored tulip shalwar.',
    category: 'Shalwar Kameez',
    collection: 'Festive Pret 2026',
    tags: ['Luxury Lawn', 'Schiffli', 'Silk Dupatta', 'Summer Festive'],
    price: 18500,
    compareAtPrice: 21000,
    costPrice: 9000,
    stock: 26,
    lowStockThreshold: 6,
    isPublished: true,
    badge: 'New',
    images: [heroImg, emeraldAnarkaliImg],
    fabric: 'Combed Supima Lawn with Pure Silk Dupatta',
    style: 'Traditional Kameez with Embroidered Tulip Shalwar',
    length: 'Shirt Length: 44 inches',
    careInstructions: [
      'Gentle hand wash in cold water',
      'Do not soak with whites',
      'Medium iron'
    ],
    rating: 4.7,
    reviewCount: 15,
    seoTitle: 'Aura Embroidered Lawn 3-Piece Suit | Comfort',
    seoDescription: 'Shop Comfort pure lawn with schiffli cutwork and digital printed silk dupatta.',
    createdAt: '2026-09-10T11:00:00Z',
    updatedAt: '2026-09-29T11:00:00Z',
    variants: [
      {
        id: 'var-4-xs',
        size: 'XS',
        color: 'Emerald Green',
        colorHex: '#2A835F',
        sku: 'COM-SHK-004-XS-EME',
        price: 18500,
        compareAtPrice: 21000,
        stock: 4,
        lowStockThreshold: 2
      },
      {
        id: 'var-4-s',
        size: 'S',
        color: 'Emerald Green',
        colorHex: '#2A835F',
        sku: 'COM-SHK-004-S-EME',
        price: 18500,
        compareAtPrice: 21000,
        stock: 8,
        lowStockThreshold: 2
      },
      {
        id: 'var-4-m',
        size: 'M',
        color: 'Emerald Green',
        colorHex: '#2A835F',
        sku: 'COM-SHK-004-M-EME',
        price: 18500,
        compareAtPrice: 21000,
        stock: 9,
        lowStockThreshold: 3
      },
      {
        id: 'var-4-l',
        size: 'L',
        color: 'Emerald Green',
        colorHex: '#2A835F',
        sku: 'COM-SHK-004-L-EME',
        price: 18500,
        compareAtPrice: 21000,
        stock: 5,
        lowStockThreshold: 2
      }
    ]
  },
  {
    id: 'prod-5',
    title: 'Meher Chikankari Raw Silk Kurti',
    slug: 'meher-chikankari-raw-silk-kurti',
    sku: 'COM-KRT-005',
    barcode: '896400192875',
    description: 'An artistic single tunic rendered in rich ivory and deep teal thread chikankari. Features intricate shadow work, organza inserts at the sleeves, and hand-wrapped pearl buttons along the placket.',
    category: 'Kurti & Tunics',
    collection: 'The Emerald Realm',
    tags: ['Chikankari', 'Tunic', 'Teal', 'Pearl Accents'],
    price: 9800,
    compareAtPrice: 12000,
    costPrice: 4800,
    stock: 14,
    lowStockThreshold: 4,
    isPublished: true,
    badge: 'Sale',
    images: [emeraldAnarkaliImg, sageCoordImg],
    fabric: 'Pure Raw Silk with Sheer Organza Sleeves',
    style: 'Straight Boxy Tunic with Side Slits',
    length: 'Shirt Length: 40 inches',
    careInstructions: ['Dry clean recommended', 'Steam iron only'],
    rating: 4.8,
    reviewCount: 22,
    seoTitle: 'Meher Chikankari Raw Silk Kurti | Comfort Designer Wear',
    seoDescription: 'Handcrafted Chikankari raw silk kurti with pearl accents and organza panelling.',
    createdAt: '2026-08-25T14:00:00Z',
    updatedAt: '2026-09-25T10:00:00Z',
    variants: [
      {
        id: 'var-5-s',
        size: 'S',
        color: 'Deep Teal',
        colorHex: '#12544F',
        sku: 'COM-KRT-005-S-TEA',
        price: 9800,
        compareAtPrice: 12000,
        stock: 4,
        lowStockThreshold: 2
      },
      {
        id: 'var-5-m',
        size: 'M',
        color: 'Deep Teal',
        colorHex: '#12544F',
        sku: 'COM-KRT-005-M-TEA',
        price: 9800,
        compareAtPrice: 12000,
        stock: 6,
        lowStockThreshold: 2
      },
      {
        id: 'var-5-l',
        size: 'L',
        color: 'Deep Teal',
        colorHex: '#12544F',
        sku: 'COM-KRT-005-L-TEA',
        price: 9800,
        compareAtPrice: 12000,
        stock: 4,
        lowStockThreshold: 2
      }
    ]
  },
  {
    id: 'prod-6',
    title: 'Shahzadi Zari Embroidered Organza Dupatta',
    slug: 'shahzadi-zari-embroidered-organza-dupatta',
    sku: 'COM-DUP-006',
    barcode: '896400192886',
    description: 'A regal statement drape crafted on pure diaphanous organza in deep emerald green, framed by a 4-sided antique gold zari jaal border and handmade hanging tassels.',
    category: 'Dupattas & Shawls',
    collection: 'Festive Pret 2026',
    tags: ['Dupatta', 'Organza', 'Zari Border', 'Festive Drape'],
    price: 7500,
    compareAtPrice: 9000,
    costPrice: 3200,
    stock: 15,
    lowStockThreshold: 3,
    isPublished: true,
    badge: 'Trending',
    images: [heroImg, velvetSuitImg],
    fabric: 'Pure Sheer Silk Organza',
    style: 'Full 2.75 Meter Festive Dupatta',
    length: '2.75 Yards',
    careInstructions: ['Dry clean only', 'Do not squeeze or wring'],
    rating: 4.9,
    reviewCount: 16,
    seoTitle: 'Shahzadi Zari Embroidered Dupatta | Comfort',
    seoDescription: 'Hand-finished 2.75m luxury organza dupatta with gold zari embroidery and tassels.',
    createdAt: '2026-09-05T09:00:00Z',
    updatedAt: '2026-09-28T09:00:00Z',
    variants: [
      {
        id: 'var-6-one',
        size: 'Custom',
        color: 'Emerald Green',
        colorHex: '#2A835F',
        sku: 'COM-DUP-006-STD-EME',
        price: 7500,
        compareAtPrice: 9000,
        stock: 15,
        lowStockThreshold: 3
      }
    ]
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'COM-2026-000412',
    customer: {
      name: 'Syeda Fatima Zahra',
      email: 'syediasyedia803@gmail.com',
      phone: '+92 300 8472911',
      isGuest: false,
      userId: 'cust-1'
    },
    shippingAddress: {
      street: 'House 42, Sector F-7/2',
      area: 'F-7',
      city: 'Islamabad',
      province: 'Federal Capital',
      country: 'Pakistan',
      postalCode: '44000',
      instructions: 'Please call before arriving, ring gate bell.'
    },
    items: [
      {
        productId: 'prod-1',
        variantId: 'var-1-m',
        title: 'Noor-e-Kashmir Raw Silk Kalidar',
        size: 'M',
        color: 'Deep Teal',
        price: 24500,
        quantity: 1,
        image: emeraldAnarkaliImg,
        sku: 'COM-LPR-001-M-TEA'
      },
      {
        productId: 'prod-2',
        variantId: 'var-2-m',
        title: 'Zehra Embroidered Sage Linen Co-Ord',
        size: 'M',
        color: 'Soft Sage',
        price: 13800,
        quantity: 1,
        image: sageCoordImg,
        sku: 'COM-CRD-002-M-SAG'
      }
    ],
    pricing: {
      subtotal: 38300,
      shipping: 0,
      discount: 3830,
      couponCode: 'COMFORT10',
      tax: 0,
      total: 34470
    },
    payment: {
      method: 'cod',
      status: 'pending',
      transactionId: 'COD-PKR-34470'
    },
    shipping: {
      provider: 'TCS Express Pakistan',
      trackingNumber: 'TCS-9281740921',
      trackingUrl: 'https://www.tcsexpress.com/tracking?track=TCS-9281740921',
      estimatedDelivery: 'Oct 04, 2026',
      method: 'Express Insured Courier'
    },
    status: 'Shipped',
    timeline: [
      {
        status: 'Pending',
        title: 'Order Placed',
        description: 'Order confirmed by customer with Cash on Delivery payment.',
        timestamp: '2026-09-30T10:15:00Z',
        updatedBy: 'Automated Checkout'
      },
      {
        status: 'Confirmed',
        title: 'Order Confirmed',
        description: 'Customer contact verified via phone. Order sent to atelier.',
        timestamp: '2026-09-30T11:30:00Z',
        updatedBy: 'Ayesha Khan (Store Manager)'
      },
      {
        status: 'Processing',
        title: 'Quality Check & Packaging',
        description: 'Hand inspection of zardozi embroidery and custom luxury box packing.',
        timestamp: '2026-09-30T16:00:00Z',
        updatedBy: 'Atelier QA Team'
      },
      {
        status: 'Packed',
        title: 'Dispatched to Dispatch Hub',
        description: 'Sealed in moisture-proof Comfort garment sheath with seal #CF-8821.',
        timestamp: '2026-10-01T08:00:00Z',
        updatedBy: 'Logistics Center Lahore'
      },
      {
        status: 'Shipped',
        title: 'In Transit via TCS Express',
        description: 'Package departed Lahore central transit hub destined for Islamabad Hub.',
        timestamp: '2026-10-01T12:45:00Z',
        updatedBy: 'TCS Express API'
      }
    ],
    notes: 'VIP customer. Include handwritten Comfort calligraphy thank you card.',
    createdAt: '2026-09-30T10:15:00Z',
    updatedAt: '2026-10-01T12:45:00Z'
  },
  {
    id: 'COM-2026-000411',
    customer: {
      name: 'Amina Tariq',
      email: 'amina.tariq@gmail.com',
      phone: '+92 321 4458922',
      isGuest: false,
      userId: 'cust-2'
    },
    shippingAddress: {
      street: 'Bungalow 18, Block 4, Clifton',
      area: 'Clifton',
      city: 'Karachi',
      province: 'Sindh',
      country: 'Pakistan',
      postalCode: '75600'
    },
    items: [
      {
        productId: 'prod-3',
        variantId: 'var-3-m',
        title: 'Gulrukh Micro-Velvet Tilla Suit',
        size: 'M',
        color: 'Deep Forest',
        price: 38500,
        quantity: 1,
        image: velvetSuitImg,
        sku: 'COM-VLV-003-M-FOR'
      }
    ],
    pricing: {
      subtotal: 38500,
      shipping: 0,
      discount: 2000,
      couponCode: 'ELEGANCE',
      tax: 0,
      total: 36500
    },
    payment: {
      method: 'bank_transfer',
      status: 'paid',
      bankReference: 'HBL-FT-99201481'
    },
    shipping: {
      provider: 'Leopard Courier Prime',
      trackingNumber: 'LEO-7729103841',
      trackingUrl: 'https://leopardscourier.com/track/LEO-7729103841',
      estimatedDelivery: 'Sep 29, 2026',
      method: 'Priority Next-Day Air'
    },
    status: 'Delivered',
    timeline: [
      {
        status: 'Order Placed',
        title: 'Order Placed',
        description: 'Payment receipt uploaded and verified.',
        timestamp: '2026-09-27T09:00:00Z'
      },
      {
        status: 'Processing',
        title: 'Order In Production',
        description: 'Tailoring customized sleeves to 22.5 inches.',
        timestamp: '2026-09-27T14:00:00Z'
      },
      {
        status: 'Shipped',
        title: 'Air Shipment Dispatched',
        description: 'Consigned to Leopard Air Freight.',
        timestamp: '2026-09-28T10:00:00Z'
      },
      {
        status: 'Delivered',
        title: 'Delivered to Customer',
        description: 'Signed and received by Amina Tariq at Clifton residence.',
        timestamp: '2026-09-29T15:30:00Z'
      }
    ],
    createdAt: '2026-09-27T09:00:00Z',
    updatedAt: '2026-09-29T15:30:00Z'
  },
  {
    id: 'COM-2026-000410',
    customer: {
      name: 'Mahnoor Bilal',
      email: 'mahnoor.bilal@outlook.com',
      phone: '+92 333 5521908',
      isGuest: true
    },
    shippingAddress: {
      street: 'House 192, Street 7, Phase 5 DHA',
      area: 'DHA Phase 5',
      city: 'Lahore',
      province: 'Punjab',
      country: 'Pakistan',
      postalCode: '54792'
    },
    items: [
      {
        productId: 'prod-4',
        variantId: 'var-4-s',
        title: 'Aura Embroidered Lawn Shalwar Kameez',
        size: 'S',
        color: 'Emerald Green',
        price: 18500,
        quantity: 1,
        image: heroImg,
        sku: 'COM-SHK-004-S-EME'
      }
    ],
    pricing: {
      subtotal: 18500,
      shipping: 0,
      discount: 0,
      tax: 0,
      total: 18500
    },
    payment: {
      method: 'cod',
      status: 'pending'
    },
    shipping: {
      provider: 'TCS Express Pakistan',
      estimatedDelivery: 'Oct 03, 2026',
      method: 'Standard Express'
    },
    status: 'Processing',
    timeline: [
      {
        status: 'Order Placed',
        title: 'Order Placed',
        description: 'Customer selected Cash on Delivery.',
        timestamp: '2026-10-01T07:20:00Z'
      },
      {
        status: 'Confirmed',
        title: 'Confirmed by Atelier',
        description: 'Stock reserved in Lahore Central Warehouse.',
        timestamp: '2026-10-01T08:10:00Z'
      }
    ],
    createdAt: '2026-10-01T07:20:00Z',
    updatedAt: '2026-10-01T08:10:00Z'
  }
];

export const INITIAL_CUSTOMERS: Customer[] = [
  {
    id: 'cust-1',
    name: 'Syeda Fatima Zahra',
    email: 'syediasyedia803@gmail.com',
    phone: '+92 300 8472911',
    role: 'admin',
    tier: 'VIP',
    totalSpent: 98400,
    orderCount: 4,
    wishlistIds: ['prod-1', 'prod-3'],
    createdAt: '2026-03-12T00:00:00Z',
    addresses: [
      {
        id: 'addr-1',
        title: 'Home',
        name: 'Syeda Fatima Zahra',
        phone: '+92 300 8472911',
        street: 'House 42, Sector F-7/2',
        area: 'F-7',
        city: 'Islamabad',
        province: 'Federal Capital',
        country: 'Pakistan',
        postalCode: '44000',
        isDefault: true
      },
      {
        id: 'addr-2',
        title: 'Office / Atelier',
        name: 'Syeda Fatima Zahra',
        phone: '+92 300 8472911',
        street: 'Blue Area Executive Suites 402',
        area: 'Blue Area',
        city: 'Islamabad',
        province: 'Federal Capital',
        country: 'Pakistan',
        postalCode: '44010',
        isDefault: false
      }
    ]
  },
  {
    id: 'cust-2',
    name: 'Amina Tariq',
    email: 'amina.tariq@gmail.com',
    phone: '+92 321 4458922',
    role: 'customer',
    tier: 'Gold',
    totalSpent: 62000,
    orderCount: 2,
    wishlistIds: ['prod-2'],
    createdAt: '2026-06-18T00:00:00Z',
    addresses: [
      {
        id: 'addr-3',
        title: 'Home',
        name: 'Amina Tariq',
        phone: '+92 321 4458922',
        street: 'Bungalow 18, Block 4, Clifton',
        area: 'Clifton',
        city: 'Karachi',
        province: 'Sindh',
        country: 'Pakistan',
        postalCode: '75600',
        isDefault: true
      }
    ]
  },
  {
    id: 'cust-3',
    name: 'Zara Rehman',
    email: 'zara.rehman@hotmail.com',
    phone: '+92 333 9821445',
    role: 'customer',
    tier: 'Silver',
    totalSpent: 28500,
    orderCount: 1,
    wishlistIds: ['prod-5'],
    createdAt: '2026-07-22T00:00:00Z',
    addresses: [
      {
        id: 'addr-4',
        title: 'Home',
        name: 'Zara Rehman',
        phone: '+92 333 9821445',
        street: 'Gulberg III, Main Boulevard',
        area: 'Gulberg',
        city: 'Lahore',
        province: 'Punjab',
        country: 'Pakistan',
        postalCode: '54000',
        isDefault: true
      }
    ]
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    productId: 'prod-3',
    productTitle: 'Gulrukh Micro-Velvet Tilla Suit',
    customerId: 'cust-2',
    customerName: 'Amina Tariq',
    orderId: 'COM-2026-000411',
    rating: 5,
    qualityRating: 5,
    fitRating: 5,
    comfortRating: 5,
    title: 'Breathtaking regal velvet — true luxury craftsmanship',
    comment: 'The quality of this micro-velvet is unmatched. The tilla work has that rich antique burnished shine rather than cheap sparkly gold. The drape is heavy, elegant, and the sizing is exact to the measurement chart. Wore it to a high-profile family wedding in Karachi and received countless compliments.',
    verifiedPurchase: true,
    status: 'approved',
    createdAt: '2026-09-30T10:00:00Z'
  },
  {
    id: 'rev-2',
    productId: 'prod-1',
    productTitle: 'Noor-e-Kashmir Raw Silk Kalidar',
    customerId: 'cust-1',
    customerName: 'Syeda Fatima Zahra',
    orderId: 'COM-2026-000389',
    rating: 5,
    qualityRating: 5,
    fitRating: 4.8,
    comfortRating: 5,
    title: 'Flawless raw silk and enchanting deep teal color',
    comment: 'Comfort truly lives up to its name. Even with rich formal embroidery, the inner lining is soft against the skin with zero itching. The scalloped organza dupatta completes the look with effortless grace.',
    verifiedPurchase: true,
    status: 'approved',
    createdAt: '2026-09-15T14:20:00Z'
  },
  {
    id: 'rev-3',
    productId: 'prod-2',
    productTitle: 'Zehra Embroidered Sage Linen Co-Ord',
    customerId: 'cust-3',
    customerName: 'Zara Rehman',
    orderId: 'COM-2026-000360',
    rating: 4.8,
    qualityRating: 5,
    fitRating: 4.6,
    comfortRating: 5,
    title: 'The ultimate airport and high-tea ensemble',
    comment: 'Softest breathable linen that breathes like a dream. The sage green is so soothing and chic. Functional pockets on the trousers make it my favorite travel wear.',
    verifiedPurchase: true,
    status: 'approved',
    createdAt: '2026-09-18T18:00:00Z'
  }
];

export const INITIAL_COUPONS: Coupon[] = [
  {
    id: 'coup-1',
    code: 'COMFORT10',
    type: 'percentage',
    value: 10,
    minOrderValue: 15000,
    usageLimit: 500,
    usedCount: 84,
    isActive: true,
    expiresAt: '2026-12-31T23:59:59Z',
    description: '10% discount on orders above Rs. 15,000 across all collections.'
  },
  {
    id: 'coup-2',
    code: 'ELEGANCE',
    type: 'fixed',
    value: 2000,
    minOrderValue: 25000,
    usageLimit: 200,
    usedCount: 39,
    isActive: true,
    expiresAt: '2026-11-30T23:59:59Z',
    description: 'Flat Rs. 2,000 instant discount on orders above Rs. 25,000.'
  },
  {
    id: 'coup-3',
    code: 'FREESHIP',
    type: 'free_shipping',
    value: 0,
    minOrderValue: 8000,
    usageLimit: 1000,
    usedCount: 215,
    isActive: true,
    expiresAt: '2026-12-31T23:59:59Z',
    description: 'Complimentary express nationwide shipping on all cart totals.'
  }
];

export const INITIAL_SETTINGS: StoreSettings = {
  storeName: 'Comfort',
  tagline: 'Elegance in Every Stitch',
  currency: 'PKR',
  currencySymbol: 'Rs.',
  exchangeRate: 1, // 1 PKR
  freeShippingThreshold: 12000, // Rs. 12,000
  defaultShippingFee: 450, // Rs. 450
  taxRate: 0, // In Pakistan, apparel retail prices typically include sales tax
  contactEmail: 'concierge@comfortgarments.pk',
  contactPhone: '+92 42 35789100',
  whatsappNumber: '+92 300 8472911',
  announcementText: 'Complimentary Insured Nationwide Express Shipping on Orders Above Rs. 12,000 | Worldwide DHL Express Available',
  storeLocations: [
    {
      city: 'Lahore',
      title: 'Comfort Flagship Atelier - Gulberg',
      address: 'Shop 12-14, Galleria Mall, Main Boulevard, Gulberg III, Lahore',
      phone: '+92 42 35789101',
      timing: 'Mon - Sat: 11:00 AM - 10:00 PM | Sun: 2:00 PM - 10:00 PM'
    },
    {
      city: 'Karachi',
      title: 'Comfort Couture Studio - Clifton',
      address: 'Plot 4-C, 7th Zamzama Commercial Lane, Clifton Block 5, Karachi',
      phone: '+92 21 35824100',
      timing: 'Mon - Sun: 12:00 PM - 11:00 PM'
    },
    {
      city: 'Islamabad',
      title: 'Comfort Boutique - Beverly Centre',
      address: 'Beverly Centre, Blue Area, Jinnah Avenue, Islamabad',
      phone: '+92 51 2814090',
      timing: 'Mon - Sat: 11:00 AM - 9:30 PM'
    }
  ],
  heroSlides: [
    {
      id: 'slide-banner',
      title: 'Comfort — Elegance in Every Stitch',
      subtitle: 'New Season 2026 Collection',
      description: 'Step into luxury with our handcrafted Pakistani women’s formal wear, combining pure fabrics with delicate hand-embroidery and modern tailoring.',
      image: bannerImg,
      ctaText: 'Shop New Arrivals',
      ctaLink: 'shop',
      isActive: true,
      order: 1
    },
    {
      id: 'slide-cloth',
      title: 'The Signature Handcrafted Pret',
      subtitle: 'Pure Chiffon & Raw Silk Organza',
      description: 'A tribute to artisanal heritage: intricate tilla needlework, pure diaphanous textures, and flowing silhouettes designed for poise and all-day comfort.',
      image: clothImg,
      ctaText: 'Explore Signature Suit',
      ctaLink: 'shop',
      isActive: true,
      order: 2
    },
    {
      id: 'slide-1',
      title: 'Where Fashion Meets Comfort',
      subtitle: 'Festive Pret 2026 Collection',
      description: 'Discover premium quality, stylish and comfortable women’s wear crafted from hand-spun raw silk, pure organza, and delicate zardozi embroidery.',
      image: heroImg,
      ctaText: 'Shop New Collection',
      ctaLink: 'shop',
      isActive: true,
      order: 3
    },
    {
      id: 'slide-2',
      title: 'The Art of Handwoven Silk',
      subtitle: 'The Emerald Realm Edition',
      description: 'Rooted in our signature Deep Forest and Emerald Green hues, celebrating timeless Pakistani royalty and contemporary silhouettes.',
      image: emeraldAnarkaliImg,
      ctaText: 'Explore Luxury Pret',
      ctaLink: 'shop',
      isActive: true,
      order: 4
    }
  ]
};

export const INITIAL_STAFF: StaffMember[] = [
  {
    id: 'staff-1',
    name: 'Syeda Fatima Zahra',
    email: 'syediasyedia803@gmail.com',
    role: 'Super Admin',
    status: 'Active',
    lastActive: 'Just now',
    permissions: {
      products: true,
      orders: true,
      inventory: true,
      customers: true,
      discounts: true,
      marketing: true,
      analytics: true,
      settings: true
    }
  },
  {
    id: 'staff-2',
    name: 'Ayesha Khan',
    email: 'ayesha.k@comfortgarments.pk',
    role: 'Store Manager',
    status: 'Active',
    lastActive: '25 minutes ago',
    permissions: {
      products: true,
      orders: true,
      inventory: true,
      customers: true,
      discounts: true,
      marketing: true,
      analytics: false,
      settings: false
    }
  },
  {
    id: 'staff-3',
    name: 'Hamza Malik',
    email: 'hamza.m@comfortgarments.pk',
    role: 'Order Manager',
    status: 'Active',
    lastActive: '1 hour ago',
    permissions: {
      products: false,
      orders: true,
      inventory: true,
      customers: false,
      discounts: false,
      marketing: false,
      analytics: false,
      settings: false
    }
  }
];

export const INITIAL_INVENTORY_LOGS: InventoryLog[] = [
  {
    id: 'inv-log-1',
    date: '2026-09-30T10:15:00Z',
    productId: 'prod-1',
    productTitle: 'Noor-e-Kashmir Raw Silk Kalidar',
    variantSku: 'COM-LPR-001-M-TEA',
    quantityChange: -1,
    previousStock: 9,
    newStock: 8,
    reason: 'Order Placed',
    adminUser: 'System (Order COM-2026-000412)'
  },
  {
    id: 'inv-log-2',
    date: '2026-09-30T10:15:00Z',
    productId: 'prod-2',
    productTitle: 'Zehra Embroidered Sage Linen Co-Ord',
    variantSku: 'COM-CRD-002-M-SAG',
    quantityChange: -1,
    previousStock: 8,
    newStock: 7,
    reason: 'Order Placed',
    adminUser: 'System (Order COM-2026-000412)'
  },
  {
    id: 'inv-log-3',
    date: '2026-09-29T11:00:00Z',
    productId: 'prod-4',
    productTitle: 'Aura Embroidered Lawn Shalwar Kameez',
    variantSku: 'COM-SHK-004-M-EME',
    quantityChange: 15,
    previousStock: 11,
    newStock: 26,
    reason: 'Restock',
    adminUser: 'Hamza Malik (Order Manager)'
  }
];

export const INITIAL_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'aud-1',
    adminName: 'Syeda Fatima Zahra',
    adminRole: 'Super Admin',
    action: 'Dispatched Order',
    objectType: 'Order',
    objectId: 'COM-2026-000412',
    details: 'Status changed from Packed to Shipped. Assigned TCS tracking TCS-9281740921.',
    timestamp: '2026-10-01T12:45:00Z'
  },
  {
    id: 'aud-2',
    adminName: 'Ayesha Khan',
    adminRole: 'Store Manager',
    action: 'Updated Inventory',
    objectType: 'Inventory',
    objectId: 'COM-SHK-004',
    details: 'Restocked Aura Embroidered Lawn Shalwar Kameez by +15 units.',
    timestamp: '2026-09-29T11:00:00Z'
  },
  {
    id: 'aud-3',
    adminName: 'Syeda Fatima Zahra',
    adminRole: 'Super Admin',
    action: 'Created Coupon',
    objectType: 'Discount',
    objectId: 'COMFORT10',
    details: 'Created 10% promotional coupon for Festive Pret launch with min order Rs. 15,000.',
    timestamp: '2026-09-25T14:10:00Z'
  },
  {
    id: 'aud-4',
    adminName: 'Hamza Malik',
    adminRole: 'Order Manager',
    action: 'Approved Review',
    objectType: 'Review',
    objectId: 'rev-1',
    details: 'Approved verified customer review from Amina Tariq for Gulrukh Micro-Velvet Tilla Suit.',
    timestamp: '2026-09-30T10:05:00Z'
  }
];

export const INITIAL_ABANDONED_CARTS: AbandonedCart[] = [
  {
    id: 'abn-1',
    customerName: 'Hina Pervez',
    email: 'hina.pervez@yahoo.com',
    phone: '+92 312 9014588',
    itemsCount: 1,
    cartTotal: 24500,
    items: [
      {
        id: 'cart-abn-1',
        productId: 'prod-1',
        variantId: 'var-1-s',
        productTitle: 'Noor-e-Kashmir Raw Silk Kalidar',
        variantTitle: 'Deep Teal / Small',
        size: 'S',
        color: 'Deep Teal',
        price: 24500,
        quantity: 1,
        image: emeraldAnarkaliImg,
        maxStock: 6,
        sku: 'COM-LPR-001-S-TEA'
      }
    ],
    abandonedAt: '2 hours ago',
    recoveryEmailSent: false
  },
  {
    id: 'abn-2',
    customerName: 'Samina Qureshi',
    email: 'samina.q@gmail.com',
    phone: '+92 345 7789012',
    itemsCount: 2,
    cartTotal: 23600,
    items: [
      {
        id: 'cart-abn-2',
        productId: 'prod-2',
        variantId: 'var-2-m',
        productTitle: 'Zehra Embroidered Sage Linen Co-Ord',
        variantTitle: 'Soft Sage / Medium',
        size: 'M',
        color: 'Soft Sage',
        price: 13800,
        quantity: 1,
        image: sageCoordImg,
        maxStock: 7,
        sku: 'COM-CRD-002-M-SAG'
      },
      {
        id: 'cart-abn-3',
        productId: 'prod-5',
        variantId: 'var-5-m',
        productTitle: 'Meher Chikankari Raw Silk Kurti',
        variantTitle: 'Deep Teal / Medium',
        size: 'M',
        color: 'Deep Teal',
        price: 9800,
        quantity: 1,
        image: emeraldAnarkaliImg,
        maxStock: 6,
        sku: 'COM-KRT-005-M-TEA'
      }
    ],
    abandonedAt: '5 hours ago',
    recoveryEmailSent: true
  }
];
