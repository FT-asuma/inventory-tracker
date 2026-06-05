'use client'

import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import { usersList } from '@/data/users'
import { Users, Building2, TrendingUp, ShieldCheck, type LucideIcon } from 'lucide-react'

// ── Animated Counter Component ────────────────────────────────────
interface CounterProps {
  value: number
  prefix?: string
  suffix?: string
  decimals?: number
}

function AnimatedCounter({ value, prefix = '', suffix = '', decimals = 0 }: CounterProps) {
  const count = useMotionValue(0)
  
  const rounded = useTransform(count, (latest) => {
    const formatted = latest.toFixed(decimals)
    const localized = Number(formatted).toLocaleString(undefined, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    })
    return `${prefix}${localized}${suffix}`
  })
  
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const controls = animate(count, value, { duration: 1.5, ease: 'easeOut' })
    const unsub = rounded.on('change', (v) => {
      if (ref.current) ref.current.textContent = v
    })
    return () => {
      controls.stop()
      unsub()
    }
  }, [value, count, rounded])

  return <span ref={ref}>0</span>
}

// ── Types & Component ─────────────────────────────────────────────
interface StatItem {
  title: string
  numericValue: number
  prefix?: string
  suffix?: string
  decimals?: number
  change: string
  isPositive: boolean
  icon: LucideIcon
  color: string
}

export default function TeamStatsOverview() {
  const internalTeam = usersList.filter(user => user.id.startsWith('invetra-'))
  const totalMembers = internalTeam.length

  const stats: StatItem[] = [
    {
      title: 'Total Active Team',
      numericValue: totalMembers,
      change: '+12% this month',
      isPositive: true,
      icon: Users,
      color: 'text-blue-500 bg-blue-50'
    },
    {
      title: 'Regional Hubs',
      numericValue: 3,
      suffix: ' Locations',
      change: 'Fully operational',
      isPositive: true,
      icon: Building2,
      color: 'text-emerald-500 bg-emerald-50'
    },
    {
      title: 'Team Dispatch Rate',
      numericValue: 94.2,
      suffix: '%',
      decimals: 1,
      change: '+2.1% vs last week',
      isPositive: true,
      icon: TrendingUp,
      color: 'text-purple-500 bg-purple-50'
    },
    {
      title: 'Verified Access',
      numericValue: totalMembers,
      suffix: `/${totalMembers}`,
      change: 'Security check clear',
      isPositive: true,
      icon: ShieldCheck,
      color: 'text-amber-500 bg-amber-50'
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
      {stats.map((stat, i) => {
        const Icon = stat.icon
        return (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07, duration: 0.35 }}
            whileHover={{ y: -2, transition: { duration: 0.15 } }}
            className="bg-white p-4 rounded-2xl border border-gray-100 flex items-center justify-between shadow-sm cursor-pointer"
          >
            <div className="space-y-1.5">
              <span className="text-xs font-medium text-gray-400 block">{stat.title}</span>
              <h3 className="text-xl font-bold text-gray-900">
                <AnimatedCounter 
                  value={stat.numericValue} 
                  prefix={stat.prefix} 
                  suffix={stat.suffix} 
                  decimals={stat.decimals} 
                />
              </h3>
              <span className={`text-[10px] font-medium block ${stat.isPositive ? 'text-emerald-500' : 'text-rose-500'}`}>
                {stat.change}
              </span>
            </div>
            <div className={`p-2.5 rounded-xl ${stat.color}`}>
              <Icon className="w-5 h-5" />
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}