'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { AlertTriangle, Package, ArrowRight, Plus } from 'lucide-react'
import Link from 'next/link'

const lowStockItems = [
  { id: 1, name: 'Coca-Cola 500ml', stock: 5,  threshold: 20, category: 'Beverages' },
  { id: 2, name: 'Lays Chips',      stock: 3,  threshold: 15, category: 'Snacks'    },
  { id: 3, name: 'Bread Loaf',      stock: 2,  threshold: 10, category: 'Bakery'    },
  { id: 4, name: 'Milk 1L',         stock: 7,  threshold: 20, category: 'Dairy'     },
  { id: 5, name: 'Mineral Water',   stock: 4,  threshold: 15, category: 'Beverages' },
]

function getStockColor(stock: number, threshold: number) {
  const ratio = stock / threshold
  if (ratio <= 0.2) return { bar: 'bg-red-400',    text: 'text-red-500',    bg: 'bg-red-50/60',    border: 'border-red-100'    }
  if (ratio <= 0.4) return { bar: 'bg-orange-300', text: 'text-orange-500', bg: 'bg-orange-50/60', border: 'border-orange-100' }
  return               { bar: 'bg-yellow-300',  text: 'text-yellow-600', bg: 'bg-yellow-50/60', border: 'border-yellow-100' }
}

export default function LowStockAlerts() {
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm h-full flex flex-col">

      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3.5 border-b border-gray-100">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-red-50">
            <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-800">Low Stock</h3>
            <p className="text-xs text-gray-400">{lowStockItems.length} items need restocking</p>
          </div>
        </div>
        <Link
          href="/products"
          className="flex items-center gap-1 text-xs text-gray-400 hover:text-accent transition-colors"
        >
          Manage <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        <AnimatePresence>
          {lowStockItems.map((item, index) => {
            const colors = getStockColor(item.stock, item.threshold)
            const pct = Math.round((item.stock / item.threshold) * 100)

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.06 }}
                className={`p-2.5 rounded-lg border ${colors.bg} ${colors.border}`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <Package className={`w-3 h-3 shrink-0 ${colors.text}`} />
                    <span className="text-xs font-medium text-gray-800 truncate">{item.name}</span>
                    <span className="text-xs text-gray-400 shrink-0">{item.category}</span>
                  </div>
                  <span className={`text-xs font-bold shrink-0 ml-2 ${colors.text}`}>{item.stock}</span>
                </div>

                {/* Progress bar */}
                <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ delay: 0.3 + index * 0.06, duration: 0.4 }}
                    className={`h-full rounded-full ${colors.bar}`}
                  />
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>

      {/* Footer — admin restocks, not notifies himself */}
      <div className="p-3 border-t border-gray-100">
        <Link
          href="/products"
          className="w-full flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-medium
                     text-gray-600 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          Restock Products
        </Link>
      </div>
    </div>
  )
}