import { usersList } from '@/data/sellers-list'

export default function SellersTable() {
  // Isolate your internal company users exclusively
  const corporateTeam = usersList.filter(user => user.id.startsWith('invetra-'))

  const formatPhone = (num: number) => {
    const s = num.toString()
    if (s.length === 12) {
      return `+${s.slice(0, 3)} (${s.slice(3, 5)}) ${s.slice(5, 8)}-${s.slice(8, 10)}-${s.slice(10, 12)}`
    }
    return `+${s}`
  }

  return (
    <div className="bg-white border border-gray-100 rounded-2xl shadow-sm flex-1 flex flex-col overflow-hidden">
      <div className="p-4 border-b border-gray-50 flex items-center justify-between">
        <div>
          <h2 className="text-sm font-bold text-gray-900">Personnel Directory</h2>
          <p className="text-[11px] text-gray-400">Managed company accounts under Invetra domain scope</p>
        </div>
        <span className="text-xs font-medium px-2.5 py-1 bg-gray-50 text-gray-600 rounded-lg border border-gray-100">
          {corporateTeam.length} Members
        </span>
      </div>

      <div className="overflow-x-auto flex-1">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-50 bg-gray-50/50">
              <th className="p-3.5 text-xs font-semibold text-gray-500">Member</th>
              <th className="p-3.5 text-xs font-semibold text-gray-500">System ID</th>
              <th className="p-3.5 text-xs font-semibold text-gray-500">Assignment</th>
              <th className="p-3.5 text-xs font-semibold text-gray-500">Contact Infomation</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 text-gray-700">
            {corporateTeam.map((member) => (
              <tr key={member.id} className="hover:bg-gray-50/70 transition-colors">
                <td className="p-3.5 flex items-center gap-3">
                  <img 
                    src={member.imageUrl} 
                    alt={member.name} 
                    className="w-8 h-8 rounded-full object-cover ring-2 ring-gray-100"
                  />
                  <div>
                    <span className="text-xs font-semibold text-gray-900 block">{member.name}</span>
                    <span className="text-[10px] text-gray-400 block">
                      Joined {new Date(member.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                    </span>
                  </div>
                </td>
                <td className="p-3.5">
                  <span className="font-mono text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-md border border-gray-200/60">
                    {member.id}
                  </span>
                </td>
                <td className="p-3.5">
                  <span className="text-xs font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-100">
                    {member.label}
                  </span>
                </td>
                <td className="p-3.5 space-y-0.5">
                  <span className="text-xs text-gray-600 block font-medium">{member.email}</span>
                  <span className="text-[11px] text-gray-400 block">{formatPhone(member.phone)}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}