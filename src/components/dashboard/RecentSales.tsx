'use client'

import { motion } from 'framer-motion'
import { ShoppingCart, ChevronRight } from 'lucide-react'

const recentSales = [
  { id: 1, product: 'Coca-Cola 500ml', quantity: 3, total: '$15.00', seller: 'John D.',  time: '2m ago'  },
  { id: 2, product: 'Lays Chips',      quantity: 2, total: '$10.00', seller: 'Sarah M.', time: '5m ago'  },
  { id: 3, product: 'Bread Loaf',      quantity: 1, total: '$4.00',  seller: 'Mike R.',  time: '12m ago' },
  { id: 4, product: 'Milk 1L',         quantity: 2, total: '$10.00', seller: 'John D.',  time: '18m ago' },
  { id: 5, product: 'Eggs Dozen',      quantity: 1, total: '$4.00',  seller: 'Emma W.',  time: '25m ago' },
  { id: 6, product: 'Pepsi 1.5L',      quantity: 4, total: '$18.00', seller: 'Sarah M.', time: '31m ago' },
]

const sellerColors: Record<string, string> = {
  'John D.':  'bg-blue-50 text-blue-600',
  'Sarah M.': 'bg-violet-50 text-violet-600',
  'Mike R.':  'bg-emerald-50 text-emerald-600',
  'Emma W.':  'bg-pink-50 text-pink-600',
}

export default function RecentSales() {
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm h-full flex flex-col">

      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3.5 border-b border-gray-100">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-emerald-50">
            <ShoppingCart className="w-3.5 h-3.5 text-emerald-500" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-800">Recent Sales</h3>
            <p className="text-xs text-gray-400">Latest transactions today</p>
          </div>
        </div>
        <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
          {recentSales.length} today
        </span>
      </div>

      {/* Table header */}
      <div className="grid grid-cols-12 px-4 py-2 bg-gray-50/60 border-b border-gray-100">
        <span className="col-span-4 text-xs text-gray-400">Product</span>
        <span className="col-span-2 text-xs text-gray-400 text-center">Qty</span>
        <span className="col-span-2 text-xs text-gray-400">Seller</span>
        <span className="col-span-2 text-xs text-gray-400 text-right">Total</span>
        <span className="col-span-2 text-xs text-gray-400 text-right">Time</span>
      </div>

      {/* Rows */}
      <div className="flex-1 divide-y divide-gray-50 overflow-y-auto">
        {recentSales.map((sale, index) => (
          <motion.div
            key={sale.id}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.04 }}
            whileHover={{ backgroundColor: 'rgb(249 250 251)' }}
            className="grid grid-cols-12 items-center px-4 py-2 transition-colors"
          >
            <div className="col-span-4">
              <p className="text-xs font-medium text-gray-800 truncate pr-1">{sale.product}</p>
            </div>

            <div className="col-span-2 flex justify-center">
              <span className="text-xs text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded-full">
                ×{sale.quantity}
              </span>
            </div>

            <div className="col-span-2">
              <span className={`text-xs font-medium px-1.5 py-0.5 rounded-full ${sellerColors[sale.seller] ?? 'bg-gray-100 text-gray-500'}`}>
                {sale.seller}
              </span>
            </div>

            <div className="col-span-2 text-right">
              <span className="text-xs font-semibold text-gray-900">{sale.total}</span>
            </div>

            <div className="col-span-2 text-right">
              <span className="text-xs text-gray-400">{sale.time}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-gray-100">
        <button className="w-full flex items-center justify-center gap-1 text-xs text-gray-400 hover:text-accent transition-colors">
          View full report <ChevronRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  )
}