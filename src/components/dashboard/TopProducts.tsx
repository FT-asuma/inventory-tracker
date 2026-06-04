'use client'

import { motion } from 'framer-motion'
import { Trophy, TrendingUp } from 'lucide-react'

const topProducts = [
  { id: 1, name: 'Coca-Cola 500ml',    sales: 234, revenue: '$1,170', growth: '+15%' },
  { id: 2, name: 'Lays Chips Classic', sales: 189, revenue: '$945',   growth: '+8%'  },
  { id: 3, name: 'Bread Whole Wheat',  sales: 156, revenue: '$624',   growth: '+12%' },
  { id: 4, name: 'Milk Full Fat 1L',   sales: 143, revenue: '$715',   growth: '+5%'  },
  { id: 5, name: 'Eggs Dozen',         sales: 128, revenue: '$512',   growth: '+20%' },
]

const medalColors = [
  'bg-yellow-400 text-white',
  'bg-gray-300 text-white',
  'bg-orange-400 text-white',
]

export default function TopProducts() {
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm h-full flex flex-col">

      {/* Header */}
      <div className="flex items-center gap-2.5 px-4 py-3.5 border-b border-gray-100">
        <div className="p-1.5 rounded-lg bg-amber-50">
          <Trophy className="w-3.5 h-3.5 text-amber-500" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-gray-800">Top Selling Products</h3>
          <p className="text-xs text-gray-400">This week's best performers</p>
        </div>
      </div>

      {/* Table header */}
      <div className="grid grid-cols-12 px-4 py-2 bg-gray-50/60 border-b border-gray-100">
        <span className="col-span-1 text-xs text-gray-400">#</span>
        <span className="col-span-5 text-xs text-gray-400">Product</span>
        <span className="col-span-2 text-xs text-gray-400 text-right">Sales</span>
        <span className="col-span-2 text-xs text-gray-400 text-right">Revenue</span>
        <span className="col-span-2 text-xs text-gray-400 text-right">Growth</span>
      </div>

      {/* Rows */}
      <div className="flex-1 divide-y divide-gray-50 overflow-y-auto">
        {topProducts.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.06 }}
            whileHover={{ backgroundColor: 'rgb(249 250 251)' }}
            className="grid grid-cols-12 items-center px-4 py-2.5 transition-colors group cursor-pointer"
          >
            <div className="col-span-1">
              <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold
                ${index < 3 ? medalColors[index] : 'bg-gray-100 text-gray-400'}`}>
                {index + 1}
              </div>
            </div>

            <div className="col-span-5">
              <p className="text-xs font-medium text-gray-800 group-hover:text-accent transition-colors truncate pr-2">
                {product.name}
              </p>
            </div>

            <div className="col-span-2 text-right">
              <span className="text-xs text-gray-500">{product.sales}</span>
            </div>

            <div className="col-span-2 text-right">
              <span className="text-xs font-semibold text-gray-900">{product.revenue}</span>
            </div>

            <div className="col-span-2 text-right">
              <span className="inline-flex items-center justify-end gap-0.5 text-xs font-medium text-emerald-500">
                <TrendingUp className="w-3 h-3" />
                {product.growth}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Spacer footer to match RecentSales height */}
      <div className="px-4 py-3 border-t border-gray-100">
        <p className="text-xs text-gray-300 text-center">Top 5 this week</p>
      </div>
    </div>
  )
}