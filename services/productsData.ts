// Powered by OnSpace.AI
export type Category = 'All' | 'Living Room' | 'Bedroom' | 'Kitchen & Dining' | 'Office';

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: Category;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  description: string;
  features: string[];
  colors: string[];
  dimensions: string;
  material: string;
  imageUri: string;
  images: string[];
  badge?: 'New' | 'Sale' | 'Popular' | 'Premium';
  inStock: boolean;
}

const UNSPLASH_BASE = 'https://images.unsplash.com';

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Vela Lounge Sofa',
    brand: 'ArteNord',
    category: 'Living Room',
    price: 2899,
    originalPrice: 3499,
    rating: 4.8,
    reviewCount: 214,
    description: 'A masterpiece of Scandinavian craftsmanship. The Vela Lounge Sofa blends plush comfort with timeless minimalism, featuring hand-stitched cushions and a solid walnut frame.',
    features: ['Hand-stitched cushions', 'Solid walnut legs', 'Stain-resistant fabric', '10-year warranty'],
    colors: ['#8B7355', '#C8B8A2', '#2C2C2C'],
    dimensions: '240W × 90D × 80H cm',
    material: 'Bouclé Fabric, Solid Walnut',
    imageUri: `${UNSPLASH_BASE}/photo-1555041469-a586c61ea9bc?w=600&q=80`,
    images: [
      `${UNSPLASH_BASE}/photo-1555041469-a586c61ea9bc?w=600&q=80`,
      `${UNSPLASH_BASE}/photo-1493663284031-b7e3aefcae8e?w=600&q=80`,
      `${UNSPLASH_BASE}/photo-1567016432779-094069958ea5?w=600&q=80`,
    ],
    badge: 'Sale',
    inStock: true,
  },
  {
    id: '2',
    name: 'Noir Executive Desk',
    brand: 'Forma Studio',
    category: 'Office',
    price: 1450,
    rating: 4.9,
    reviewCount: 87,
    description: 'Command your workspace with the Noir Executive Desk. Engineered for productivity with hidden cable management, premium leather inlays, and a sleek matte-black finish.',
    features: ['Cable management system', 'Leather desktop inlay', 'Adjustable height legs', 'USB-A/C ports built-in'],
    colors: ['#1A1A1A', '#2C2416', '#3D3024'],
    dimensions: '180W × 80D × 76H cm',
    material: 'Black Oak Veneer, Leather Inlay',
    imageUri: `${UNSPLASH_BASE}/photo-1593359677879-a4bb92f829d1?w=600&q=80`,
    images: [
      `${UNSPLASH_BASE}/photo-1593359677879-a4bb92f829d1?w=600&q=80`,
      `${UNSPLASH_BASE}/photo-1518455027359-f3f8164ba6bd?w=600&q=80`,
    ],
    badge: 'Premium',
    inStock: true,
  },
  {
    id: '3',
    name: 'Lumina Bed Frame',
    brand: 'SleepCraft',
    category: 'Bedroom',
    price: 1890,
    originalPrice: 2200,
    rating: 4.7,
    reviewCount: 156,
    description: 'Elevate your sleep sanctuary. The Lumina Bed Frame features an upholstered headboard with integrated LED backlighting and solid oak slat base for lasting support.',
    features: ['LED ambient headboard', 'Solid oak slat base', 'Under-bed storage drawers', 'Fits king/queen'],
    colors: ['#4A3728', '#2C2416', '#C8B8A2'],
    dimensions: '210W × 220D × 130H cm (King)',
    material: 'Velvet Upholstery, Solid Oak',
    imageUri: `${UNSPLASH_BASE}/photo-1505693416388-ac5ce068fe85?w=600&q=80`,
    images: [
      `${UNSPLASH_BASE}/photo-1505693416388-ac5ce068fe85?w=600&q=80`,
      `${UNSPLASH_BASE}/photo-1540518614846-7eded433c457?w=600&q=80`,
    ],
    badge: 'Sale',
    inStock: true,
  },
  {
    id: '4',
    name: 'Marble Dining Table',
    brand: 'StoneAge Co.',
    category: 'Kitchen & Dining',
    price: 3200,
    rating: 4.6,
    reviewCount: 63,
    description: 'Carve out unforgettable dining moments. Crafted from natural Calacatta marble with a brushed brass base, this table is a sculptural centerpiece for modern homes.',
    features: ['Calacatta marble top', 'Brushed brass base', 'Seats 6–8 people', 'Sealed & stain-protected'],
    colors: ['#E8E4DC', '#C9A84C'],
    dimensions: '200W × 100D × 76H cm',
    material: 'Calacatta Marble, Brass',
    imageUri: `${UNSPLASH_BASE}/photo-1617806118233-18e1de247200?w=600&q=80`,
    images: [
      `${UNSPLASH_BASE}/photo-1617806118233-18e1de247200?w=600&q=80`,
      `${UNSPLASH_BASE}/photo-1604578762246-41134e37f9cc?w=600&q=80`,
    ],
    badge: 'Premium',
    inStock: true,
  },
  {
    id: '5',
    name: 'Arc Floor Lamp',
    brand: 'LumoDesign',
    category: 'Living Room',
    price: 420,
    rating: 4.5,
    reviewCount: 312,
    description: 'Sculptural lighting that transforms any corner. The Arc Floor Lamp features a dimmable warm LED with a brushed gold finish and a heavy marble base for stability.',
    features: ['Dimmable LED', 'Brushed gold finish', 'Marble base', '360° adjustable arm'],
    colors: ['#C9A84C', '#1A1A1A'],
    dimensions: '45Ø × 185H cm',
    material: 'Steel, Marble Base',
    imageUri: `${UNSPLASH_BASE}/photo-1507003211169-0a1dd7228f2d?w=600&q=80`,
    images: [
      `${UNSPLASH_BASE}/photo-1507003211169-0a1dd7228f2d?w=600&q=80`,
    ],
    badge: 'Popular',
    inStock: true,
  },
  {
    id: '6',
    name: 'Haven Accent Chair',
    brand: 'ArteNord',
    category: 'Living Room',
    price: 760,
    rating: 4.8,
    reviewCount: 198,
    description: 'Sink into serenity. The Haven Accent Chair wraps you in deep-cushioned comfort with a timeless barrel silhouette and tapered solid-oak legs.',
    features: ['Deep-cushioned seat', 'Barrel silhouette', 'Solid oak legs', 'Eco-certified fabric'],
    colors: ['#7B5E3A', '#3D3D3D', '#C8B8A2'],
    dimensions: '85W × 80D × 85H cm',
    material: 'Linen Blend, Solid Oak',
    imageUri: `${UNSPLASH_BASE}/photo-1586023492125-27b2c045efd7?w=600&q=80`,
    images: [
      `${UNSPLASH_BASE}/photo-1586023492125-27b2c045efd7?w=600&q=80`,
      `${UNSPLASH_BASE}/photo-1549187774-b4e9b0445b41?w=600&q=80`,
    ],
    badge: 'New',
    inStock: true,
  },
  {
    id: '7',
    name: 'Zephyr Bookshelf',
    brand: 'Forma Studio',
    category: 'Office',
    price: 890,
    rating: 4.6,
    reviewCount: 74,
    description: 'A modern library staple. The Zephyr Bookshelf combines open shelving with closed cabinets in a sleek smoked-oak finish, keeping your space organized and elegant.',
    features: ['Open + closed storage', 'Smoked oak finish', 'Anti-tip wall mount', 'Adjustable shelves'],
    colors: ['#4A3728', '#1A1A1A'],
    dimensions: '100W × 35D × 200H cm',
    material: 'Smoked Oak Veneer',
    imageUri: `${UNSPLASH_BASE}/photo-1594620302200-9a762244a156?w=600&q=80`,
    images: [
      `${UNSPLASH_BASE}/photo-1594620302200-9a762244a156?w=600&q=80`,
    ],
    badge: 'Popular',
    inStock: true,
  },
  {
    id: '8',
    name: 'Drift Dining Chair',
    brand: 'StoneAge Co.',
    category: 'Kitchen & Dining',
    price: 310,
    rating: 4.4,
    reviewCount: 445,
    description: 'Effortless style meets everyday durability. The Drift Dining Chair features a sculpted shell seat and slender powder-coated steel legs in a matte finish.',
    features: ['Sculpted shell seat', 'Powder-coated steel legs', 'Stackable', 'Easy-clean surface'],
    colors: ['#2C2C2C', '#C8B8A2', '#8B7355'],
    dimensions: '48W × 52D × 80H cm',
    material: 'Molded Polypropylene, Steel',
    imageUri: `${UNSPLASH_BASE}/photo-1592078615290-033ee584e267?w=600&q=80`,
    images: [
      `${UNSPLASH_BASE}/photo-1592078615290-033ee584e267?w=600&q=80`,
    ],
    badge: 'Popular',
    inStock: true,
  },
  {
    id: '9',
    name: 'Obsidian Wardrobe',
    brand: 'SleepCraft',
    category: 'Bedroom',
    price: 2400,
    rating: 4.7,
    reviewCount: 91,
    description: 'A wardrobe that defines the room. The Obsidian Wardrobe offers flush-panel doors with recessed gold handles, interior LED lighting, and soft-close hinges throughout.',
    features: ['Soft-close hinges', 'Interior LED strip', 'Recessed gold handles', 'Full-length mirror option'],
    colors: ['#1A1A1A', '#2C2C2C'],
    dimensions: '200W × 60D × 220H cm',
    material: 'MDF, Black Lacquer, Brass',
    imageUri: `${UNSPLASH_BASE}/photo-1558997519-83ea9252edf8?w=600&q=80`,
    images: [
      `${UNSPLASH_BASE}/photo-1558997519-83ea9252edf8?w=600&q=80`,
    ],
    badge: 'Premium',
    inStock: true,
  },
  {
    id: '10',
    name: 'Pebble Coffee Table',
    brand: 'ArteNord',
    category: 'Living Room',
    price: 680,
    originalPrice: 820,
    rating: 4.5,
    reviewCount: 127,
    description: 'Inspired by the organic forms of nature. The Pebble Coffee Table features a free-form travertine top and slim brass legs for a sophisticated living room focal point.',
    features: ['Natural travertine top', 'Brass-plated legs', 'Organic free-form shape', 'Non-slip foot pads'],
    colors: ['#C8B8A2', '#C9A84C'],
    dimensions: '110W × 70D × 42H cm',
    material: 'Travertine, Brass-plated Steel',
    imageUri: `${UNSPLASH_BASE}/photo-1616486338812-3dadae4b4ace?w=600&q=80`,
    images: [
      `${UNSPLASH_BASE}/photo-1616486338812-3dadae4b4ace?w=600&q=80`,
    ],
    badge: 'Sale',
    inStock: true,
  },
  {
    id: '11',
    name: 'Ergon Pro Chair',
    brand: 'Forma Studio',
    category: 'Office',
    price: 995,
    rating: 4.9,
    reviewCount: 302,
    description: 'Your back will thank you. The Ergon Pro Chair delivers clinical-grade lumbar support, 4D armrests, and a breathable mesh back in a sleek all-black executive design.',
    features: ['4D adjustable armrests', 'Lumbar support system', 'Breathable mesh back', '8hr comfort tested'],
    colors: ['#1A1A1A', '#2C2C2C'],
    dimensions: '68W × 70D × 110–120H cm',
    material: 'Mesh, Aluminum, Nylon',
    imageUri: `${UNSPLASH_BASE}/photo-1580480055273-228ff5388ef8?w=600&q=80`,
    images: [
      `${UNSPLASH_BASE}/photo-1580480055273-228ff5388ef8?w=600&q=80`,
    ],
    badge: 'Popular',
    inStock: true,
  },
  {
    id: '12',
    name: 'Garden Bistro Set',
    brand: 'OutdoorLux',
    category: 'Kitchen & Dining',
    price: 540,
    rating: 4.3,
    reviewCount: 88,
    description: 'Bring café culture home. The Garden Bistro Set includes a round zinc-top table and two folding chairs in a classic French bistro style with a powder-coated iron frame.',
    features: ['Zinc table top', 'Folding chairs', 'Powder-coated iron', 'Weather-resistant'],
    colors: ['#1A1A1A', '#2C5F2E'],
    dimensions: 'Table: 60Ø × 72H | Chairs: 43W × 45D × 88H cm',
    material: 'Zinc, Powder-coated Iron',
    imageUri: `${UNSPLASH_BASE}/photo-1533090481720-856c6e3c1fdc?w=600&q=80`,
    images: [
      `${UNSPLASH_BASE}/photo-1533090481720-856c6e3c1fdc?w=600&q=80`,
    ],
    badge: 'New',
    inStock: true,
  },
];

export const CATEGORIES: Category[] = ['All', 'Living Room', 'Bedroom', 'Kitchen & Dining', 'Office'];

export const FEATURED_COLLECTIONS = [
  { id: 'c1', title: 'New Arrivals', subtitle: '12 pieces', imageUri: `${UNSPLASH_BASE}/photo-1555041469-a586c61ea9bc?w=400&q=80` },
  { id: 'c2', title: 'Best Sellers', subtitle: '8 pieces', imageUri: `${UNSPLASH_BASE}/photo-1493663284031-b7e3aefcae8e?w=400&q=80` },
  { id: 'c3', title: 'Office Essentials', subtitle: '6 pieces', imageUri: `${UNSPLASH_BASE}/photo-1593359677879-a4bb92f829d1?w=400&q=80` },
];
