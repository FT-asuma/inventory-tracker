export type Category = {
  id: string
  name: string
  slug: string
  icon: string
  productCount: number
  totalStock: number
  lowStockCount: number
  color: string
}

export type Product = {
  id: string
  name: string
  categorySlug: string
  price: number
  imageUrl: string
  initialStock: number
  currentStock: number
  hashtags: string[]
  discount: number | null // percentage e.g. 10 = 10%
  unit: string // 'pcs' | 'kg' | 'litre' | 'pack'
  createdAt: string
}

export const categories: Category[] = [
  { id: 'cat_01', name: 'Beverages',        slug: 'beverages',        icon: '🥤', productCount: 14, totalStock: 320, lowStockCount: 2, color: 'bg-blue-50 border-blue-200'     },
  { id: 'cat_02', name: 'Snacks',           slug: 'snacks',           icon: '🍿', productCount: 11, totalStock: 210, lowStockCount: 3, color: 'bg-yellow-50 border-yellow-200' },
  { id: 'cat_03', name: 'Dairy',            slug: 'dairy',            icon: '🥛', productCount: 8,  totalStock: 180, lowStockCount: 1, color: 'bg-sky-50 border-sky-200'       },
  { id: 'cat_04', name: 'Bakery',           slug: 'bakery',           icon: '🍞', productCount: 9,  totalStock: 95,  lowStockCount: 2, color: 'bg-orange-50 border-orange-200' },
  { id: 'cat_05', name: 'Meat & Poultry',   slug: 'meat',             icon: '🥩', productCount: 7,  totalStock: 60,  lowStockCount: 0, color: 'bg-red-50 border-red-200'       },
  { id: 'cat_06', name: 'Frozen Foods',     slug: 'frozen',           icon: '🧊', productCount: 6,  totalStock: 75,  lowStockCount: 1, color: 'bg-cyan-50 border-cyan-200'     },
  { id: 'cat_07', name: 'Household',        slug: 'household',        icon: '🏠', productCount: 12, totalStock: 140, lowStockCount: 0, color: 'bg-green-50 border-green-200'   },
  { id: 'cat_08', name: 'Personal Care',    slug: 'personal-care',    icon: '🧴', productCount: 10, totalStock: 200, lowStockCount: 1, color: 'bg-pink-50 border-pink-200'     },
  { id: 'cat_09', name: 'Confectionery',    slug: 'confectionery',    icon: '🍬', productCount: 15, totalStock: 300, lowStockCount: 4, color: 'bg-purple-50 border-purple-200' },
  { id: 'cat_10', name: 'Canned Goods',     slug: 'canned',           icon: '🥫', productCount: 9,  totalStock: 160, lowStockCount: 0, color: 'bg-amber-50 border-amber-200'   },
  { id: 'cat_11', name: 'Grains & Cereals', slug: 'grains',           icon: '🌾', productCount: 8,  totalStock: 190, lowStockCount: 1, color: 'bg-lime-50 border-lime-200'     },
  { id: 'cat_12', name: 'Cleaning',         slug: 'cleaning',         icon: '🧹', productCount: 7,  totalStock: 110, lowStockCount: 0, color: 'bg-teal-50 border-teal-200'     },
]

// Products per category (10 per category for pagination demo)
export const productsByCategory: Record<string, Product[]> = {
  beverages: [
    { id: 'PRD-001', name: 'Coca-Cola 500ml',      categorySlug: 'beverages', price: 8000,  imageUrl: '', initialStock: 100, currentStock: 5,  hashtags: ['cola', 'cold', 'popular'], discount: 10,  unit: 'pcs',   createdAt: '2026-06-01' },
    { id: 'PRD-002', name: 'Pepsi 1.5L',           categorySlug: 'beverages', price: 12000, imageUrl: '', initialStock: 80,  currentStock: 34, hashtags: ['pepsi', 'large'],          discount: null, unit: 'pcs',   createdAt: '2026-06-01' },
    { id: 'PRD-003', name: 'Sprite 330ml',         categorySlug: 'beverages', price: 7000,  imageUrl: '', initialStock: 120, currentStock: 60, hashtags: ['sprite', 'cold'],          discount: null, unit: 'pcs',   createdAt: '2026-06-01' },
    { id: 'PRD-004', name: 'Mineral Water 1L',     categorySlug: 'beverages', price: 4000,  imageUrl: '', initialStock: 200, currentStock: 4,  hashtags: ['water', 'healthy'],        discount: null, unit: 'pcs',   createdAt: '2026-06-01' },
    { id: 'PRD-005', name: 'Orange Juice 1L',      categorySlug: 'beverages', price: 18000, imageUrl: '', initialStock: 50,  currentStock: 22, hashtags: ['juice', 'fresh'],          discount: 5,    unit: 'pcs',   createdAt: '2026-06-01' },
    { id: 'PRD-006', name: 'Green Tea 500ml',      categorySlug: 'beverages', price: 9000,  imageUrl: '', initialStock: 60,  currentStock: 31, hashtags: ['tea', 'healthy'],          discount: null, unit: 'pcs',   createdAt: '2026-06-01' },
    { id: 'PRD-007', name: 'Energy Drink 250ml',   categorySlug: 'beverages', price: 15000, imageUrl: '', initialStock: 40,  currentStock: 18, hashtags: ['energy', 'sport'],         discount: null, unit: 'pcs',   createdAt: '2026-06-01' },
    { id: 'PRD-008', name: 'Ayran 250ml',          categorySlug: 'beverages', price: 5000,  imageUrl: '', initialStock: 90,  currentStock: 45, hashtags: ['ayran', 'dairy', 'cold'],  discount: null, unit: 'pcs',   createdAt: '2026-06-01' },
    { id: 'PRD-009', name: 'Lipton Ice Tea 500ml', categorySlug: 'beverages', price: 10000, imageUrl: '', initialStock: 70,  currentStock: 33, hashtags: ['tea', 'cold', 'lipton'],   discount: 15,   unit: 'pcs',   createdAt: '2026-06-01' },
    { id: 'PRD-010', name: 'Fanta Orange 330ml',   categorySlug: 'beverages', price: 7000,  imageUrl: '', initialStock: 100, currentStock: 50, hashtags: ['fanta', 'cold'],           discount: null, unit: 'pcs',   createdAt: '2026-06-01' },
    { id: 'PRD-011', name: 'Milkshake Chocolate',  categorySlug: 'beverages', price: 14000, imageUrl: '', initialStock: 30,  currentStock: 12, hashtags: ['milk', 'sweet'],           discount: null, unit: 'pcs',   createdAt: '2026-06-01' },
    { id: 'PRD-012', name: 'Pomegranate Juice 1L', categorySlug: 'beverages', price: 22000, imageUrl: '', initialStock: 25,  currentStock: 10, hashtags: ['juice', 'premium'],        discount: null, unit: 'pcs',   createdAt: '2026-06-01' },
    { id: 'PRD-013', name: 'Sparkling Water 500ml',categorySlug: 'beverages', price: 6000,  imageUrl: '', initialStock: 80,  currentStock: 40, hashtags: ['water', 'sparkling'],      discount: null, unit: 'pcs',   createdAt: '2026-06-01' },
    { id: 'PRD-014', name: 'Coffee Latte 250ml',   categorySlug: 'beverages', price: 16000, imageUrl: '', initialStock: 35,  currentStock: 16, hashtags: ['coffee', 'ready'],         discount: 10,   unit: 'pcs',   createdAt: '2026-06-01' },
  ],
  snacks: [
    { id: 'PRD-015', name: 'Lays Classic 100g',    categorySlug: 'snacks', price: 9000,  imageUrl: '', initialStock: 80,  currentStock: 3,  hashtags: ['chips', 'popular'],  discount: null, unit: 'pcs', createdAt: '2026-06-01' },
    { id: 'PRD-016', name: 'Pringles Original',    categorySlug: 'snacks', price: 22000, imageUrl: '', initialStock: 40,  currentStock: 18, hashtags: ['chips', 'premium'],  discount: 5,    unit: 'pcs', createdAt: '2026-06-01' },
    { id: 'PRD-017', name: 'Crackers Salted',      categorySlug: 'snacks', price: 7000,  imageUrl: '', initialStock: 60,  currentStock: 28, hashtags: ['crackers'],          discount: null, unit: 'pcs', createdAt: '2026-06-01' },
    { id: 'PRD-018', name: 'Popcorn Sweet 80g',    categorySlug: 'snacks', price: 6000,  imageUrl: '', initialStock: 50,  currentStock: 22, hashtags: ['popcorn', 'sweet'],  discount: null, unit: 'pcs', createdAt: '2026-06-01' },
    { id: 'PRD-019', name: 'Nuts Mix 150g',        categorySlug: 'snacks', price: 18000, imageUrl: '', initialStock: 35,  currentStock: 14, hashtags: ['nuts', 'healthy'],   discount: null, unit: 'pcs', createdAt: '2026-06-01' },
    { id: 'PRD-020', name: 'Doritos Nacho 100g',   categorySlug: 'snacks', price: 12000, imageUrl: '', initialStock: 45,  currentStock: 2,  hashtags: ['chips', 'spicy'],    discount: null, unit: 'pcs', createdAt: '2026-06-01' },
    { id: 'PRD-021', name: 'Sunflower Seeds 200g', categorySlug: 'snacks', price: 8000,  imageUrl: '', initialStock: 70,  currentStock: 35, hashtags: ['seeds', 'local'],    discount: null, unit: 'pcs', createdAt: '2026-06-01' },
    { id: 'PRD-022', name: 'Raisins 100g',         categorySlug: 'snacks', price: 10000, imageUrl: '', initialStock: 30,  currentStock: 12, hashtags: ['dried', 'healthy'],  discount: 10,   unit: 'pcs', createdAt: '2026-06-01' },
    { id: 'PRD-023', name: 'Chocolate Wafer',      categorySlug: 'snacks', price: 5000,  imageUrl: '', initialStock: 100, currentStock: 55, hashtags: ['wafer', 'sweet'],    discount: null, unit: 'pcs', createdAt: '2026-06-01' },
    { id: 'PRD-024', name: 'Pretzel Sticks 150g',  categorySlug: 'snacks', price: 11000, imageUrl: '', initialStock: 25,  currentStock: 9,  hashtags: ['pretzel', 'salted'], discount: null, unit: 'pcs', createdAt: '2026-06-01' },
    { id: 'PRD-025', name: 'Corn Puffs 90g',       categorySlug: 'snacks', price: 6500,  imageUrl: '', initialStock: 60,  currentStock: 30, hashtags: ['puffs', 'kids'],     discount: null, unit: 'pcs', createdAt: '2026-06-01' },
  ],
  dairy: [
    { id: 'PRD-026', name: 'Milk Full Fat 1L',     categorySlug: 'dairy', price: 12000, imageUrl: '', initialStock: 60,  currentStock: 7,  hashtags: ['milk', 'fresh'],      discount: null, unit: 'pcs', createdAt: '2026-06-01' },
    { id: 'PRD-027', name: 'Yogurt Natural 400g',  categorySlug: 'dairy', price: 9000,  imageUrl: '', initialStock: 40,  currentStock: 18, hashtags: ['yogurt', 'healthy'],  discount: null, unit: 'pcs', createdAt: '2026-06-01' },
    { id: 'PRD-028', name: 'Butter 200g',          categorySlug: 'dairy', price: 18000, imageUrl: '', initialStock: 30,  currentStock: 14, hashtags: ['butter'],             discount: null, unit: 'pcs', createdAt: '2026-06-01' },
    { id: 'PRD-029', name: 'Cheese Sliced 150g',   categorySlug: 'dairy', price: 22000, imageUrl: '', initialStock: 25,  currentStock: 10, hashtags: ['cheese'],             discount: 5,    unit: 'pcs', createdAt: '2026-06-01' },
    { id: 'PRD-030', name: 'Sour Cream 200g',      categorySlug: 'dairy', price: 8000,  imageUrl: '', initialStock: 50,  currentStock: 25, hashtags: ['cream'],              discount: null, unit: 'pcs', createdAt: '2026-06-01' },
    { id: 'PRD-031', name: 'Kefir 1L',             categorySlug: 'dairy', price: 11000, imageUrl: '', initialStock: 40,  currentStock: 20, hashtags: ['kefir', 'healthy'],   discount: null, unit: 'pcs', createdAt: '2026-06-01' },
    { id: 'PRD-032', name: 'Cream Cheese 200g',    categorySlug: 'dairy', price: 25000, imageUrl: '', initialStock: 20,  currentStock: 8,  hashtags: ['cheese', 'premium'],  discount: null, unit: 'pcs', createdAt: '2026-06-01' },
    { id: 'PRD-033', name: 'Eggs Dozen',           categorySlug: 'dairy', price: 20000, imageUrl: '', initialStock: 80,  currentStock: 38, hashtags: ['eggs', 'fresh'],      discount: null, unit: 'pcs', createdAt: '2026-06-01' },
  ],
}