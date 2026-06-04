"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  TrendingUp, 
  Layers, 
  MinusCircle, 
  ArrowDownRight, 
  ShoppingBag, 
  Trash2,
  CheckCircle2,
  AlertTriangle
} from "lucide-react";

// ==========================================
// 1. DATA TYPES (From Your Schema)
// ==========================================
export type Category = {
  id: string;
  name: string;
  slug: string;
  icon: string;
  productCount: number;
  totalStock: number;
  lowStockCount: number;
  color: string;
};

export type Product = {
  id: string;
  name: string;
  categorySlug: string;
  price: number;
  imageUrl: string;
  initialStock: number;
  currentStock: number;
  hashtags: string[];
  discount: number | null; // percentage e.g. 10 = 10%
  unit: string; // 'pcs' | 'kg' | 'litre' | 'pack'
  createdAt: string;
};

// ==========================================
// 2. MOCK DATA (From Your Inventory)
// ==========================================
export const categories: Category[] = [
  { id: 'cat_01', name: 'Beverages',        slug: 'beverages',        icon: '🥤', productCount: 14, totalStock: 320, lowStockCount: 2, color: 'bg-blue-50 border-blue-200'     },
  { id: 'cat_02', name: 'Snacks',           slug: 'snacks',           icon: '🍿', productCount: 11, totalStock: 210, lowStockCount: 3, color: 'bg-yellow-50 border-yellow-200' },
  { id: 'cat_03', name: 'Dairy',            slug: 'dairy',            icon: '🥛', productCount: 8,  totalStock: 180, lowStockCount: 1, color: 'bg-sky-50 border-sky-200'       },
  { id: 'cat_04', name: 'Bakery',           slug: 'bakery',           icon: '🍞', productCount: 9,  totalStock: 95,  lowStockCount: 2, color: 'bg-orange-50 border-orange-200' },
  { id: 'cat_05', name: 'Meat & Poultry',   slug: 'meat',             icon: '🥩', productCount: 7,  totalStock: 60,  lowStockCount: 0, color: 'bg-red-50 border-red-200'       },
  { id: 'cat_06', name: 'Frozen Foods',     slug: 'frozen',           icon: '🧊', productCount: 6,  totalStock: 75,  lowStockCount: 1, color: 'bg-cyan-50 border-cyan-200'     },
  { id: 'cat_07', name: 'Household',        slug: 'household',        icon: '🏠', productCount: 12, totalStock: 140, lowStockCount: 0, color: 'bg-green-50 border-green-200'   },
  { id: 'cat_08', name: 'Personal Care',    slug: 'personal-care',    icon: '🧴', productCount: 10, totalStock: 200, lowStockCount: 1, color: 'bg-pink-50 border-pink-200'      },
  { id: 'cat_09', name: 'Confectionery',    slug: 'confectionery',    icon: '🍬', productCount: 15, totalStock: 300, lowStockCount: 4, color: 'bg-purple-50 border-purple-200' },
  { id: 'cat_10', name: 'Canned Goods',     slug: 'canned',           icon: '🥫', productCount: 9,  totalStock: 160, lowStockCount: 0, color: 'bg-amber-50 border-amber-200'   },
  { id: 'cat_11', name: 'Grains & Cereals', slug: 'grains',           icon: '🌾', productCount: 8,  totalStock: 190, lowStockCount: 1, color: 'bg-lime-50 border-lime-200'     },
  { id: 'cat_12', name: 'Cleaning',         slug: 'cleaning',         icon: '🧹', productCount: 7,  totalStock: 110, lowStockCount: 0, color: 'bg-teal-50 border-teal-200'     },
];

export const initialProductsByCategory: Record<string, Product[]> = {
  beverages: [
    { id: 'PRD-001', name: 'Coca-Cola 500ml',      categorySlug: 'beverages', price: 8000,  imageUrl: '', initialStock: 100, currentStock: 5,  hashtags: ['cola', 'cold', 'popular'], discount: 10,   unit: 'pcs',   createdAt: '2026-06-01' },
    { id: 'PRD-002', name: 'Pepsi 1.5L',           categorySlug: 'beverages', price: 12000, imageUrl: '', initialStock: 80,  currentStock: 34, hashtags: ['pepsi', 'large'],          discount: null, unit: 'pcs',   createdAt: '2026-06-01' },
    { id: 'PRD-003', name: 'Sprite 330ml',         categorySlug: 'beverages', price: 7000,  imageUrl: '', initialStock: 120, currentStock: 60, hashtags: ['sprite', 'cold'],          discount: null, unit: 'pcs',   createdAt: '2026-06-01' },
    { id: 'PRD-004', name: 'Mineral Water 1L',     categorySlug: 'beverages', price: 4000,  imageUrl: '', initialStock: 200, currentStock: 4,  hashtags: ['water', 'healthy'],        discount: null, unit: 'pcs',   createdAt: '2026-06-01' },
    { id: 'PRD-005', name: 'Orange Juice 1L',      categorySlug: 'beverages', price: 18000, imageUrl: '', initialStock: 50,  currentStock: 22, hashtags: ['juice', 'fresh'],          discount: 5,    unit: 'pcs',   createdAt: '2026-06-01' },
  ],
  snacks: [
    { id: 'PRD-015', name: 'Lays Classic 100g',    categorySlug: 'snacks', price: 9000,  imageUrl: '', initialStock: 80,  currentStock: 3,  hashtags: ['chips', 'popular'],  discount: null, unit: 'pcs', createdAt: '2026-06-01' },
    { id: 'PRD-016', name: 'Pringles Original',    categorySlug: 'snacks', price: 22000, imageUrl: '', initialStock: 40,  currentStock: 18, hashtags: ['chips', 'premium'],  discount: 5,    unit: 'pcs', createdAt: '2026-06-01' },
    { id: 'PRD-020', name: 'Doritos Nacho 100g',   categorySlug: 'snacks', price: 12000, imageUrl: '', initialStock: 45,  currentStock: 2,  hashtags: ['chips', 'spicy'],    discount: null, unit: 'pcs', createdAt: '2026-06-01' },
  ],
  dairy: [
    { id: 'PRD-026', name: 'Milk Full Fat 1L',     categorySlug: 'dairy', price: 12000, imageUrl: '', initialStock: 60,  currentStock: 7,  hashtags: ['milk', 'fresh'],       discount: null, unit: 'pcs', createdAt: '2026-06-01' },
    { id: 'PRD-027', name: 'Yogurt Natural 400g',  categorySlug: 'dairy', price: 9000,  imageUrl: '', initialStock: 40,  currentStock: 18, hashtags: ['yogurt', 'healthy'],   discount: null, unit: 'pcs', createdAt: '2026-06-01' },
    { id: 'PRD-033', name: 'Eggs Dozen',           categorySlug: 'dairy', price: 20000, imageUrl: '', initialStock: 80,  currentStock: 38, hashtags: ['eggs', 'fresh'],       discount: null, unit: 'pcs', createdAt: '2026-06-01' },
  ],
};

// ==========================================
// 3. MAIN COMPONENT
// ==========================================
export default function ShelfPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("beverages");
  const [inventory, setInventory] = useState<Record<string, Product[]>>(initialProductsByCategory);
  
  // Operational Metrics Logs
  const [dailySalesCount, setDailySalesCount] = useState<number>(0);
  const [dailyRevenue, setDailyRevenue] = useState<number>(0);
  const [dailyWasteCount, setDailyWasteCount] = useState<number>(0);

  // Rapid Stock Decrease Interaction Control States
  const [activeAdjustmentId, setActiveAdjustmentId] = useState<string | null>(null);
  const [decreaseQty, setDecreaseQty] = useState<number>(1);
  const [decreaseReason, setDecreaseReason] = useState<"sale" | "waste">("sale");

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 350);
    return () => clearTimeout(timer);
  }, []);

  // Handler execution for standard stock depletion operations
  const handleStockDecrease = (productId: string) => {
    if (decreaseQty <= 0) return;

    setInventory((prev) => {
      const currentCategoryProducts = prev[selectedCategory] || [];
      const updatedProducts = currentCategoryProducts.map((product) => {
        if (product.id === productId) {
          const actualAdjustmentVal = Math.min(decreaseQty, product.currentStock);
          const remainingStock = product.currentStock - actualAdjustmentVal;

          // Compute processing financial logic if adjustment maps directly to real customer sale
          if (decreaseReason === "sale") {
            const clearPrice = product.discount 
              ? product.price * (1 - product.discount / 100) 
              : product.price;

            setDailySalesCount((c) => c + actualAdjustmentVal);
            setDailyRevenue((r) => r + (clearPrice * actualAdjustmentVal));
          } else {
            setDailyWasteCount((w) => w + actualAdjustmentVal);
          }

          return { ...product, currentStock: remainingStock };
        }
        return product;
      });

      return { ...prev, [selectedCategory]: updatedProducts };
    });

    // Reset interaction scope
    setActiveAdjustmentId(null);
    setDecreaseQty(1);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full min-h-[60vh]">
        <div className="w-6 h-6 border-2 border-gray-900 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Safely look up currently mounted item lists or provide structural layout fallback array
  const activeProductsList = inventory[selectedCategory] || [];

  return (
    <div className="p-6 space-y-6 bg-gray-50/40 min-h-screen text-left">
      
      {/* Top Meta Header Strip */}
      <motion.div
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-gray-200 pb-4"
      >
        <div>
          <h1 className="text-xl font-bold text-gray-900 tracking-tight">Shelf Operations</h1>
          <h3 className="text-xs text-gray-400 mt-0.5">Quick logging for point-of-sale exits and product waste metrics</h3>
        </div>
        <div className="text-left sm:text-right bg-white px-3 py-1.5 border border-gray-200 rounded-xl shadow-sm">
          <span className="text-[9px] uppercase tracking-wider font-bold text-gray-400 block">System Date</span>
          <p className="text-xs font-semibold text-gray-700">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long", year: "numeric", month: "long", day: "numeric"
            })}
          </p>
        </div>
      </motion.div>

      {/* DAILY RUNNING COUNTER SUMMARY METRICS PANEL */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Real Revenue Card Tracking System */}
        <div className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Today's Net Revenue</span>
            <h2 className="text-lg font-black text-gray-900">{dailyRevenue.toLocaleString()} UZS</h2>
          </div>
          <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
            <TrendingUp className="w-4 h-4" />
          </div>
        </div>

        {/* Regular Sales Track Counter */}
        <div className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Units Sold Today</span>
            <h2 className="text-lg font-black text-gray-900">{dailySalesCount} items</h2>
          </div>
          <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
            <Layers className="w-4 h-4" />
          </div>
        </div>

        {/* Real Spoilage and Stock Discard Track Counter */}
        <div className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Logged Spoilage / Waste</span>
            <h2 className="text-lg font-black text-rose-600">{dailyWasteCount} items</h2>
          </div>
          <div className="p-2 bg-rose-50 text-rose-600 rounded-lg">
            <ArrowDownRight className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* HORIZONTAL CATEGORY SELECTION SHELF SEGMENT CONTROLLER */}
      <div className="space-y-2">
        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Select Shelf Section</label>
        <div className="flex gap-2 ml-2 overflow-x-auto pb-2 scrollbar-none snap-x">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.slug;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  setSelectedCategory(cat.slug);
                  setActiveAdjustmentId(null);
                }}
                className={`flex items-center gap-2 px-3 py-2 border rounded-xl whitespace-nowrap transition-all text-xs font-semibold snap-start ${
                  isSelected 
                    ? `${cat.color} border-gray-400 shadow-sm ring-1 ring-black/5 scale-[1.02]` 
                    : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* DYNAMIC PRODUCTS LAYOUT ALLOCATION LISTING */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
            Allocated Items ({activeProductsList.length})
          </h4>
        </div>

        {activeProductsList.length === 0 ? (
          <div className="bg-white border border-dashed border-gray-200 p-8 text-center rounded-xl">
            <p className="text-xs text-gray-400 font-medium">No demo products initialized for this specific shelf partition block.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeProductsList.map((product) => {
              const isLowStock = product.currentStock <= 5;
              const globalDiscountActive = product.discount !== null;

              return (
                <div 
                  key={product.id}
                  className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex flex-col justify-between transition-all hover:border-gray-300"
                >
                  {/* Top Product Information Layout Structure */}
                  <div className="flex justify-between items-start gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded font-mono font-medium">
                          {product.id}
                        </span>
                        {isLowStock && (
                          <span className="text-[9px] bg-amber-50 text-amber-700 border border-amber-200 px-1.5 py-0.5 rounded font-bold flex items-center gap-0.5 animate-pulse">
                            <AlertTriangle className="w-2.5 h-2.5" /> Low Stock
                          </span>
                        )}
                      </div>
                      <h3 className="text-sm font-bold text-gray-900">{product.name}</h3>
                      
                      {/* Pricing Meta Matrix Flag */}
                      <div className="flex items-center gap-1.5 text-[11px]">
                        {globalDiscountActive ? (
                          <>
                            <span className="line-through text-gray-400">
                              {product.price.toLocaleString()} UZS
                            </span>
                            <span className="font-bold text-emerald-600">
                              {((product.price) * (1 - (product.discount || 0) / 100)).toLocaleString()} UZS
                            </span>
                            <span className="bg-emerald-50 text-emerald-700 text-[9px] px-1 font-extrabold rounded">
                              -{product.discount}%
                            </span>
                          </>
                        ) : (
                          <span className="text-gray-600 font-medium">
                            {product.price.toLocaleString()} UZS / {product.unit}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Stock Display Counter Ring */}
                    <div className="text-right whitespace-nowrap bg-gray-50/80 border border-gray-100 px-2.5 py-1.5 rounded-lg min-w-[75px]">
                      <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider block">Available</span>
                      <span className={`text-sm font-black ${isLowStock ? 'text-rose-600' : 'text-gray-900'}`}>
                        {product.currentStock} <span className="text-[10px] font-normal text-gray-500">{product.unit}</span>
                      </span>
                    </div>
                  </div>

                  {/* ACTIVE ACTION PANEL BAR */}
                  <div className="mt-4 pt-3 border-t border-gray-100">
                    {activeAdjustmentId === product.id ? (
                      <motion.div 
                        initial={{ opacity: 0, y: 2 }} 
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-gray-50 p-2 rounded-lg space-y-2.5"
                      >
                        <div className="flex items-center justify-between gap-2 flex-wrap">
                          {/* Segmented control select tool for inventory shift category reasons */}
                          <div className="flex p-0.5 bg-white border border-gray-200 rounded-lg text-[11px]">
                            <button
                              type="button"
                              onClick={() => setDecreaseReason("sale")}
                              className={`px-2 py-1 rounded-md font-bold flex items-center gap-1 transition-all ${
                                decreaseReason === 'sale' ? 'bg-gray-900 text-white shadow-xs' : 'text-gray-500 hover:text-gray-900'
                              }`}
                            >
                              <ShoppingBag className="w-2.5 h-2.5" /> Dispatch Sale
                            </button>
                            <button
                              type="button"
                              onClick={() => setDecreaseReason("waste")}
                              className={`px-2 py-1 rounded-md font-bold flex items-center gap-1 transition-all ${
                                decreaseReason === 'waste' ? 'bg-rose-600 text-white shadow-xs' : 'text-gray-500 hover:text-rose-600'
                              }`}
                            >
                              <Trash2 className="w-2.5 h-2.5" /> Log Waste
                            </button>
                          </div>

                          {/* Numeric Step Handler input form entry */}
                          <div className="flex items-center gap-1">
                            <label className="text-[10px] font-bold text-gray-400 uppercase">Quantity:</label>
                            <input
                              type="number"
                              min="1"
                              max={product.currentStock}
                              value={decreaseQty}
                              onChange={(e) => setDecreaseQty(Math.min(product.currentStock, Math.max(1, parseInt(e.target.value) || 1)))}
                              className="w-14 p-1 bg-white border border-gray-200 rounded-md text-center text-xs font-bold outline-hidden focus:border-gray-400"
                            />
                          </div>
                        </div>

                        {/* Interactive Execution Triggers */}
                        <div className="flex justify-end gap-1.5 text-xs">
                          <button
                            type="button"
                            onClick={() => setActiveAdjustmentId(null)}
                            className="px-2.5 py-1 text-gray-500 hover:bg-gray-200 font-medium rounded-md transition-colors"
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            onClick={() => handleStockDecrease(product.id)}
                            className="px-3 py-1 bg-gray-900 text-white hover:bg-gray-800 font-semibold rounded-md flex items-center gap-1 transition-all shadow-xs"
                          >
                            <CheckCircle2 className="w-3 h-3" /> Commit Changes
                          </button>
                        </div>
                      </motion.div>
                    ) : (
                      <button
                        type="button"
                        disabled={product.currentStock === 0}
                        onClick={() => {
                          setActiveAdjustmentId(product.id);
                          setDecreaseQty(1);
                          setDecreaseReason("sale");
                        }}
                        className="w-full py-1.5 bg-gray-50 hover:bg-gray-100 disabled:bg-gray-50 disabled:text-gray-300 text-gray-700 font-bold text-xs rounded-lg flex items-center justify-center gap-1.5 transition-all border border-transparent hover:border-gray-200"
                      >
                        <MinusCircle className="w-3.5 h-3.5" />
                        Log Stock Departure ({product.unit})
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}