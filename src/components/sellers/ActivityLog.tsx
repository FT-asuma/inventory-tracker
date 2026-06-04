import { CheckCircle2, RefreshCw, AlertCircle } from 'lucide-react'

export default function ActivityLog() {
  const activities = [
    {
      id: 1,
      operator: 'Anvar Alimov',
      action: 'Refilled stock batch',
      target: 'Coca-Cola 500ml (+50)',
      time: '12 mins ago',
      icon: RefreshCw,
      iconColor: 'text-blue-500 bg-blue-50'
    },
    {
      id: 2,
      operator: 'Malika Karimova',
      action: 'Authorized system onboarding',
      target: 'Seller Node invetra-006',
      time: '1 hour ago',
      icon: CheckCircle2,
      iconColor: 'text-emerald-500 bg-emerald-50'
    },
    {
      id: 3,
      operator: 'System Log',
      action: 'Critical Threshold Alert',
      target: 'Fanta Orange low stock',
      time: '3 hours ago',
      icon: AlertCircle,
      iconColor: 'text-rose-500 bg-rose-50'
    }
  ]

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm flex flex-col h-full">
      <div className="mb-4">
        <h2 className="text-sm font-bold text-gray-900">System Activity Log</h2>
        <p className="text-[11px] text-gray-400">Live operational events matching internal accounts</p>
      </div>

      <div className="relative pl-4 border-l border-gray-100 space-y-5 flex-1 flex flex-col justify-center my-2">
        {activities.map((item) => (
          <div key={item.id} className="relative text-xs">
            {/* Timeline Dot Icon Anchor */}
            <div className={`absolute -left-[27px] top-0.5 p-1 rounded-full ring-4 ring-white ${item.iconColor}`}>
              <item.icon className="w-3 h-3" />
            </div>

            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-gray-900 font-medium">
                  <span className="font-semibold text-gray-900 mr-1">{item.operator}</span> 
                  {item.action}
                </p>
                <span className="text-[11px] font-mono text-gray-400 block mt-0.5">{item.target}</span>
              </div>
              <span className="text-[10px] text-gray-400 shrink-0 whitespace-nowrap">{item.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}