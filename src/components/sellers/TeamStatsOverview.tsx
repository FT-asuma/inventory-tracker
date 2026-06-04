import { usersList } from '@/data/sellers-list' // Adjust path if needed
import { Users, Building2, TrendingUp, ShieldCheck } from 'lucide-react'

export default function TeamStatsOverview() {
  const internalTeam = usersList.filter(user => user.id.startsWith('invetra-'))
  const totalMembers = internalTeam.length

  const stats = [
    {
      title: 'Total Active Team',
      value: totalMembers,
      change: '+12% this month',
      isPositive: true,
      icon: Users,
      color: 'text-blue-500 bg-blue-50'
    },
    {
      title: 'Regional Hubs',
      value: '3 Location', // e.g., Tashkent, Samarkand, Fergana
      change: 'Fully operational',
      isPositive: true,
      icon: Building2,
      color: 'text-emerald-500 bg-emerald-50'
    },
    {
      title: 'Team Dispatch Rate',
      value: '94.2%',
      change: '+2.1% vs last week',
      isPositive: true,
      icon: TrendingUp,
      color: 'text-purple-500 bg-purple-50'
    },
    {
      title: 'Verified Access',
      value: `${totalMembers}/${totalMembers}`,
      change: 'Security check clear',
      isPositive: true,
      icon: ShieldCheck,
      color: 'text-amber-500 bg-amber-50'
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
      {stats.map((stat, i) => (
        <div key={i} className="bg-white p-4 rounded-2xl border border-gray-100 flex items-center justify-between shadow-sm">
          <div className="space-y-1.5">
            <span className="text-xs font-medium text-gray-400 block">{stat.title}</span>
            <h3 className="text-xl font-bold text-gray-900">{stat.value}</h3>
            <span className={`text-[10px] font-medium block ${stat.isPositive ? 'text-emerald-500' : 'text-rose-500'}`}>
              {stat.change}
            </span>
          </div>
          <div className={`p-2.5 rounded-xl ${stat.color}`}>
            <stat.icon className="w-5 h-5" />
          </div>
        </div>
      ))}
    </div>
  )
}