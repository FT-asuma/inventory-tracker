'use client'

import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import {
  DollarSign, Package, Users, AlertTriangle,
  TrendingUp, TrendingDown, type LucideIcon,
} from 'lucide-react'

// ── Animated Counter ────────────────────────────────────
function AnimatedCounter({ value, prefix = '' }: { value: number; prefix?: string }) {
  const count = useMotionValue(0)
  const rounded = useTransform(count, (latest) =>
    `${prefix}${Math.round(latest).toLocaleString()}`
  )
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const controls = animate(count, value, { duration: 1.5, ease: 'easeOut' })
    const unsub = rounded.on('change', (v) => {
      if (ref.current) ref.current.textContent = v
    })
    return () => { controls.stop(); unsub() }
  }, [value, count, rounded])

  return <span ref={ref}>0</span>
}

interface Stat {
  title: string
  value: number
  prefix?: string
  change: string
  isPositive: boolean
  icon: LucideIcon
  iconBg: string
  iconColor: string
  changeColor: string
}

const stats: Stat[] = [
  {
    title: 'Total Revenue',
    value: 12458,
    prefix: '$',
    change: '+12.5%',
    isPositive: true,
    icon: DollarSign,
    iconBg: 'bg-emerald-50',
    iconColor: 'text-emerald-500',
    changeColor: 'text-emerald-500',
  },
  {
    title: 'Total Sales',
    value: 1234,
    change: '+8.2%',
    isPositive: true,
    icon: Package,
    iconBg: 'bg-blue-50',
    iconColor: 'text-blue-500',
    changeColor: 'text-blue-500',
  },
  {
    title: 'Active Sellers',
    value: 12,
    change: '+2 this week',
    isPositive: true,
    icon: Users,
    iconBg: 'bg-violet-50',
    iconColor: 'text-violet-500',
    changeColor: 'text-violet-500',
  },
  {
    title: 'Low Stock Items',
    value: 8,
    change: '3 critical',
    isPositive: false,
    icon: AlertTriangle,
    iconBg: 'bg-orange-50',
    iconColor: 'text-orange-400',
    changeColor: 'text-orange-400',
  },
]

export default function StatsOverview() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
      {stats.map((stat, index) => {
        const Icon = stat.icon
        return (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.07, duration: 0.35 }}
            whileHover={{ y: -1, transition: { duration: 0.15 } }}
            className="bg-white border border-gray-200 rounded-xl px-4 py-3.5 shadow-sm cursor-pointer group"
          >
            {/* Top row */}
            <div className="flex items-center justify-between mb-3">
              <div className={`p-2 rounded-lg ${stat.iconBg}`}>
                <Icon className={`w-4 h-4 ${stat.iconColor}`} />
              </div>
              <div className={`flex items-center gap-0.5 text-xs font-medium ${stat.changeColor}`}>
                {stat.isPositive
                  ? <TrendingUp className="w-3 h-3" />
                  : <TrendingDown className="w-3 h-3" />
                }
                {stat.change}
              </div>
            </div>

            {/* Value */}
            <p className="text-xl font-bold text-gray-900 mb-0.5">
              <AnimatedCounter value={stat.value} prefix={stat.prefix} />
            </p>
            <p className="text-xs text-gray-400">{stat.title}</p>
          </motion.div>
        )
      })}
    </div>
  )
}