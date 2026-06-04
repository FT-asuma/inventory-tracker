'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import SalesChart from '@/components/dashboard/SalesChart'
import LowStockAlerts from '@/components/dashboard/LowStockAlerts'
import TopProducts from '@/components/dashboard/TopProducts'
import RecentSales from '@/components/dashboard/RecentSales'
import StatsOverview from '@/components/dashboard/StatsOverview'

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full min-h-[60vh]">
        <div className="w-7 h-7 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="p-6 space-y-5">

      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-lg font-bold text-gray-900">Overview</h1>
        <p className="text-xs text-gray-400 mt-0.5">
          {new Date().toLocaleDateString('en-US', {
            weekday: 'long', year: 'numeric',
            month: 'long', day: 'numeric',
          })}
        </p>
      </motion.div>

      {/* Stats Row */}
      <StatsOverview />

      {/* Chart + Low Stock — equal height */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-stretch">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="lg:col-span-2"
        >
          <SalesChart />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col"
        >
          <LowStockAlerts />
        </motion.div>
      </div>

      {/* Top Products + Recent Sales — equal height */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-stretch">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="flex flex-col"
        >
          <TopProducts />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col"
        >
          <RecentSales />
        </motion.div>
      </div>

    </div>
  )
}