export default function RegionalHubsChart() {
  const hubs = [
    {
      name: "Tashkent (HQ)",
      percentage: 65,
      count: "4 Operators",
      color: "bg-emerald-500",
    },
    {
      name: "Samarkand Hub",
      percentage: 20,
      count: "1 Supervisor",
      color: "bg-blue-500",
    },
    {
      name: "Fergana Valley",
      percentage: 15,
      count: "Outsource Team",
      color: "bg-purple-500",
    },
  ];

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm flex flex-col justify-between h-full">
      <div>
        <h2 className="text-sm font-bold text-gray-900">Regional Allocation</h2>
        <p className="text-[11px] text-gray-400">
          Distribution of company operations by sector
        </p>
      </div>

      {/* Visual Ring/Stack Segment */}
      <div className="my-6 space-y-4">
        <div className="h-3.5 w-full bg-gray-100 rounded-full flex overflow-hidden">
          {hubs.map((hub, i) => (
            <div
              key={i}
              style={{ width: `${hub.percentage}%` }}
              className={`${hub.color} transition-all duration-500`}
              title={`${hub.name}: ${hub.percentage}%`}
            />
          ))}
        </div>

        <div className="space-y-3">
          {hubs.map((hub, i) => (
            <div key={i} className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className={`w-2.5 h-2.5 rounded-full ${hub.color}`} />
                <span className="font-medium text-gray-700">{hub.name}</span>
              </div>
              <div className="text-right">
                <span className="font-semibold text-gray-900 block">
                  {hub.percentage}%
                </span>
                <span className="text-[10px] text-gray-400 block">
                  {hub.count}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-3 border-t border-gray-50 text-[11px] text-gray-400 text-center">
        Data realigned to current 2026 fiscal regional targets
      </div>
    </div>
  );
}
