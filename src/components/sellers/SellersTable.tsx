import { usersList } from '@/data/users'
import { Shield, Briefcase, Truck, Award } from 'lucide-react'

export default function SellersTable() {
  const corporateTeam = usersList.filter(user => user.id.startsWith('invetra-'))

  const getSupervisorName = (id: string | null) => {
    if (!id) return null
    const supervisor = corporateTeam.find(u => u.id === id)
    return supervisor ? supervisor.name.split(' ')[0] : 'Unknown'
  }

  const sections = [
    {
      title: 'Executive Administration',
      description: 'Core system administrators and corporate directors',
      icon: Shield,
      color: 'text-purple-600 bg-purple-50 border-purple-100',
      members: corporateTeam.filter(u => u.role === 'executive')
    },
    {
      title: 'Operations & Management',
      description: 'Regional leads and direct team supervisors',
      icon: Briefcase,
      color: 'text-blue-600 bg-blue-50 border-blue-100',
      members: corporateTeam.filter(u => u.role === 'supervisor')
    },
    {
      title: 'Field Sales & Distribution',
      description: 'Account reps and logistics fulfillment personnel',
      icon: Truck,
      color: 'text-emerald-600 bg-emerald-50 border-emerald-100',
      members: corporateTeam.filter(u => u.role === 'agent' || u.role === 'logistics')
    }
  ]

  const formatPhone = (num: number) => {
    const s = num.toString()
    return s.length === 12 ? `+${s.slice(0, 3)} (${s.slice(3, 5)}) ${s.slice(5, 8)}-${s.slice(8, 10)}` : `+${num}`
  }

  return (
    <div className="bg-white border border-gray-100 rounded-2xl shadow-sm flex-1 flex flex-col overflow-hidden h-full">
      <div className="p-4 border-b border-gray-50">
        <h2 className="text-sm font-bold text-gray-900">Organizational Roster</h2>
        <p className="text-[11px] text-gray-400">Structural breakdown of roles and supervision lines</p>
      </div>

      <div className="flex-1 overflow-y-auto space-y-5 p-4">
        {sections.map((section, idx) => {
          if (section.members.length === 0) return null

          return (
            <div key={idx} className="space-y-2">
              {/* Section Sub-header */}
              <div className="flex items-start gap-2.5 pb-1 border-b border-gray-50/60">
                <div className={`p-1 rounded-lg border ${section.color}`}>
                  <section.icon className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-gray-800">{section.title}</h3>
                  <p className="text-[10px] text-gray-400">{section.description}</p>
                </div>
              </div>

              {/* Unified Full-Width List Stack */}
              <div className="space-y-1.5">
                {section.members.map((member) => {
                  const supervisorName = getSupervisorName(member.supervisorId)
                  
                  return (
                    <div 
                      key={member.id} 
                      className="p-3 border border-gray-100/70 rounded-xl hover:border-gray-200 hover:bg-gray-50/30 transition-all flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <img 
                          src={member.imageUrl} 
                          alt={member.name} 
                          className="w-9 h-9 rounded-full object-cover ring-2 ring-gray-50 shadow-sm"
                        />
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-gray-900">{member.name}</span>
                            <span className="text-[9px] font-mono px-1.5 py-0.2 bg-gray-50 border border-gray-200 rounded text-gray-400">
                              {member.id.replace('invetra-', '#')}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-[10px] text-gray-400">
                            <span className="font-medium text-gray-500">{member.label}</span>
                            <span>•</span>
                            <span>{member.email}</span>
                          </div>
                        </div>
                      </div>

                      <div className="text-right flex flex-col items-end gap-1">
                        <span className="text-[10px] font-medium text-gray-500">
                          {formatPhone(member.phone)}
                        </span>
                        
                        {supervisorName ? (
                          <span className="text-[9px] font-medium text-blue-600 bg-blue-50/60 border border-blue-100/70 px-2 py-0.5 rounded-md flex items-center gap-1">
                            <span className="w-1 h-1 rounded-full bg-blue-400" />
                            Reports to: <strong className="font-semibold">{supervisorName}</strong>
                          </span>
                        ) : (
                          <span className="text-[9px] font-medium text-amber-600 bg-amber-50/60 border border-amber-100/70 px-2 py-0.5 rounded-md flex items-center gap-1">
                            <Award className="w-2.5 h-2.5 text-amber-500" />
                            Top Tier
                          </span>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}