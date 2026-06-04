import { usersList } from '@/data/sellers-list'
import { Award } from 'lucide-react'

export default function TopPerformers() {
  // Grab top 3 users for a mock leaderboard performance
  const topThree = usersList.filter(user => user.id.startsWith('invetra-')).slice(0, 3)
  
  // Custom metrics to show performance detail
  const mockMetrics = [
    { volume: '1,420 units ordered', growth: '+14.2%' },
    { volume: '980 units sorted', growth: '+8.6%' },
    { volume: '840 units dispatched', growth: '+11.1%' }
  ]

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm flex flex-col h-full">
      <div className="mb-4">
        <h2 className="text-sm font-bold text-gray-900">Top Corporate Producers</h2>
        <p className="text-[11px] text-gray-400">Highest handling velocities recorded this cycle</p>
      </div>

      <div className="divide-y divide-gray-50 flex-1 flex flex-col justify-center">
        {topThree.map((user, index) => (
          <div key={user.id} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img 
                  src={user.imageUrl} 
                  alt={user.name} 
                  className="w-9 h-9 rounded-full object-cover"
                />
                {index === 0 && (
                  <div className="absolute -top-1.5 -right-1.5 bg-amber-400 text-white p-0.5 rounded-full ring-2 ring-white">
                    <Award className="w-3 h-3" />
                  </div>
                )}
              </div>
              <div>
                <span className="text-xs font-bold text-gray-900 block">{user.name}</span>
                <span className="text-[10px] text-gray-400 block">{user.label}</span>
              </div>
            </div>

            <div className="text-right">
              <span className="text-xs font-semibold text-gray-900 block">{mockMetrics[index].volume}</span>
              <span className="text-[10px] font-medium text-emerald-500 block">{mockMetrics[index].growth}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}