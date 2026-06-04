// src/components/dashboard/SalesChart.tsx
"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
} from "recharts";
import { ArrowLeft, Info, MousePointerClick, ChevronDown } from "lucide-react";

// ── Types ───────────────────────────────────────────────
type ViewMode = "week" | "month" | "year";
type DrillState =
  | { mode: "overview"; view: ViewMode }
  | { mode: "drilldown"; month: string };

// ── Pre-generated Daily Data for Each Month ─────────────
// This ensures data is consistent (not random on each render)
const monthlyDailyData: Record<
  string,
  Array<{ name: string; sales: number; revenue: number }>
> = {
  "Dec 2025": Array.from({ length: 31 }, (_, i) => ({
    name: `${i + 1}`,
    sales: Math.floor(100 + Math.random() * 150),
    revenue: Math.floor(2000 + Math.random() * 3500),
  })),
  "Jan 2026": Array.from({ length: 31 }, (_, i) => ({
    name: `${i + 1}`,
    sales: Math.floor(110 + Math.random() * 160),
    revenue: Math.floor(2200 + Math.random() * 3800),
  })),
  "Feb 2026": Array.from({ length: 28 }, (_, i) => ({
    name: `${i + 1}`,
    sales: Math.floor(120 + Math.random() * 170),
    revenue: Math.floor(2400 + Math.random() * 4000),
  })),
  "Mar 2026": Array.from({ length: 31 }, (_, i) => ({
    name: `${i + 1}`,
    sales: Math.floor(115 + Math.random() * 165),
    revenue: Math.floor(2300 + Math.random() * 3900),
  })),
  "Apr 2026": Array.from({ length: 30 }, (_, i) => ({
    name: `${i + 1}`,
    sales: Math.floor(130 + Math.random() * 180),
    revenue: Math.floor(2600 + Math.random() * 4200),
  })),
  "May 2026": Array.from({ length: 31 }, (_, i) => ({
    name: `${i + 1}`,
    sales: Math.floor(140 + Math.random() * 190),
    revenue: Math.floor(2800 + Math.random() * 4500),
  })),
};
// ── Mock Data ───────────────────────────────────────────
const weekData = [
  { name: "Mon", sales: 120, revenue: 2400 },
  { name: "Tue", sales: 98, revenue: 1960 },
  { name: "Wed", sales: 145, revenue: 2900 },
  { name: "Thu", sales: 132, revenue: 2640 },
  { name: "Fri", sales: 178, revenue: 3560 },
  { name: "Sat", sales: 210, revenue: 4200 },
  { name: "Sun", sales: 165, revenue: 3300 },
];

// Current month (June 2026) - 30 days
const monthData = Array.from({ length: 30 }, (_, i) => ({
  name: `${i + 1}`,
  sales: Math.floor(80 + Math.random() * 150),
  revenue: Math.floor(1600 + Math.random() * 3000),
}));

// 6-month overview data (with daily data reference)
const yearData = [
  { name: "Dec 2025", short: "Dec", sales: 3200, revenue: 64000 },
  { name: "Jan 2026", short: "Jan", sales: 3800, revenue: 76000 },
  { name: "Feb 2026", short: "Feb", sales: 4100, revenue: 82000 },
  { name: "Mar 2026", short: "Mar", sales: 3950, revenue: 79000 },
  { name: "Apr 2026", short: "Apr", sales: 4500, revenue: 90000 },
  { name: "May 2026", short: "May", sales: 4820, revenue: 96400 },
];

// ── Custom Tooltip ──────────────────────────────────────
function CustomTooltip({ active, payload, label, isYearView }: any) {
  if (!active || !payload || !payload.length) return null;

  const dataPoint = payload[0]?.payload;
  if (!dataPoint) return null;

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-lg">
      <p className="text-gray-900 font-semibold text-sm mb-2">{label}</p>

      <div className="space-y-1.5">
        <div className="flex items-center gap-2 text-xs">
          <div className="w-2 h-2 rounded-full bg-blue-500" />
          <span className="text-gray-600">Sales:</span>
          <span className="text-gray-900 font-mono font-semibold">
            {dataPoint.sales?.toLocaleString() || 0} items
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <div className="w-2 h-2 rounded-full bg-emerald-500" />
          <span className="text-gray-600">Revenue:</span>
          <span className="text-gray-900 font-mono font-semibold">
            ${dataPoint.revenue?.toLocaleString() || 0}
          </span>
        </div>
      </div>

      {isYearView && (
        <div className="mt-2 pt-2 border-t border-gray-200 flex items-center gap-1.5 text-xs text-blue-600">
          <MousePointerClick className="w-3 h-3" />
          Click to view daily breakdown
        </div>
      )}
    </div>
  );
}

// ── Main Component ──────────────────────────────────────
export default function SalesChart() {
  const [state, setState] = useState<DrillState>({
    mode: "overview",
    view: "week",
  });
  const [selectedMonth, setSelectedMonth] = useState("May 2026");

  const {
    currentData,
    isYearView,
    chartTitle,
    chartSubtitle,
    isDrilldown,
    drilldownMonth,
  } = useMemo(() => {
    if (state.mode === "drilldown") {
      const dailyData = monthlyDailyData[state.month] || [];
      return {
        currentData: dailyData,
        isYearView: false,
        chartTitle: state.month,
        chartSubtitle: `${dailyData.length} days of data — click "Back" to return`,
        isDrilldown: true,
        drilldownMonth: state.month,
      };
    }

    const view = state.view;
    let data;

    if (view === "week") {
      data = weekData;
    } else if (view === "month") {
      // Use selected month's daily data
      data = monthlyDailyData[selectedMonth] || monthData;
    } else {
      data = yearData;
    }

    const titles = {
      week: { t: "This Week", s: "Daily sales and revenue performance" },
      month: { t: selectedMonth, s: "Daily sales and revenue breakdown" },
      year: { t: "Last 6 Months", s: "Click any month to view daily data" },
    };

    return {
      currentData: data,
      isYearView: view === "year",
      chartTitle: titles[view].t,
      chartSubtitle: titles[view].s,
      isDrilldown: false,
      drilldownMonth: null,
    };
  }, [state, selectedMonth]);

  // Fixed click handler for year view bars
  const handleBarClick = (data: any) => {
    console.log("Bar clicked:", data);

    if (state.mode !== "overview" || state.view !== "year") return;

    // Recharts passes the data point directly in the payload
    const monthKey = data?.activeLabel;

    console.log("Month key:", data.activeLabel);

    if (!monthKey) return;

    // Check if we have daily data for this month
    const keys = Object.keys(monthlyDailyData);

    // Find the first key that includes your month string (e.g., "Dec")
    const matchingKey = keys.find((key) => key.startsWith(monthKey));
    if (matchingKey) {
      setState({ mode: 'drilldown', month: matchingKey });
    } else {
      console.log(`No keys match "${monthKey}"`);
    }
  };

  const handleViewChange = (view: ViewMode) => {
    setState({ mode: "overview", view });
  };

  const handleBack = () => {
    setState({ mode: "overview", view: "year" });
  };

  const handleMonthSelect = (month: string) => {
    setSelectedMonth(month);
  };

  const isBarChart = state.mode === "overview" && state.view === "year";
  const isMonthView = state.mode === "overview" && state.view === "month";

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-5 border-b border-gray-200">
        <div className="flex items-center gap-3">
          {isDrilldown && (
            <motion.button
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={handleBack}
              className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
              aria-label="Back to year view"
            >
              <ArrowLeft className="w-4 h-4 text-gray-700" />
            </motion.button>
          )}
          <div>
            <h3 className="text-base font-semibold text-gray-900">{chartTitle}</h3>
            <p className="text-xs text-gray-500 mt-0.5">{chartSubtitle}</p>
          </div>
        </div>

        {/* View Switcher & Month Selector */}
        <div className="flex items-center gap-3">
          {/* Month Selector - Only show in month view */}
          {isMonthView && (
            <div className="relative">
              <select
                value={selectedMonth}
                onChange={(e) => handleMonthSelect(e.target.value)}
                className="appearance-none bg-gray-50 border border-gray-200 rounded-lg 
                           px-3 py-1.5 pr-8 text-sm text-gray-900 font-medium
                           hover:bg-gray-100 transition-colors cursor-pointer
                           focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
              >
                {Object.keys(monthlyDailyData).map((month) => (
                  <option
                    key={month}
                    value={month}
                    className="bg-white"
                  >
                    {month}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          )}

          {/* View Switcher - Hide during drilldown */}
          {!isDrilldown && (
            <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
              {(["week", "month", "year"] as ViewMode[]).map((view) => (
                <button
                  key={view}
                  onClick={() => handleViewChange(view)}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium capitalize transition-all
                    ${
                    // @ts-ignore
                      state.view === view
                        ? "bg-white text-gray-900 shadow-sm"
                        : "text-gray-500 hover:text-gray-900"
                    }`}
                >
                  {view}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Hint Banners */}
      <AnimatePresence>
        {isYearView && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="px-5 pt-4 overflow-hidden"
          >
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-blue-50 border border-blue-200 text-sm">
              <Info className="w-4 h-4 text-blue-600 flex-shrink-0" />
              <span className="text-gray-700">
                <span className="text-blue-600 font-medium">Tip:</span> Click any
                month bar to view its daily sales and revenue breakdown.
              </span>
            </div>
          </motion.div>
        )}

        {isDrilldown && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="px-5 pt-4 overflow-hidden"
          >
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-sm">
              <Info className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span className="text-gray-700">
                Viewing daily data for{" "}
                <span className="text-emerald-600 font-medium">
                  {drilldownMonth}
                </span>
                . Click the back arrow to return.
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chart */}
      <div className="p-5">
        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            {isBarChart ? (
              <BarChart
                data={currentData}
                style={{ cursor: "pointer" }}
                onClick={handleBarClick}
              >
                <defs>
                  <linearGradient id="barSalesGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3B82F6" stopOpacity={1} />
                    <stop offset="100%" stopColor="#3B82F6" stopOpacity={0.6} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#F3F4F6"
                  vertical={false}
                />
                <XAxis
                  dataKey="short"
                  stroke="#9CA3AF"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#9CA3AF"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
                />
                <Tooltip
                  content={<CustomTooltip isYearView={true} />}
                  cursor={{ fill: "rgba(59, 130, 246, 0.1)" }}
                />
                <Bar
                  dataKey="revenue"
                  fill="url(#barSalesGrad)"
                  radius={[6, 6, 0, 0]}
                >
                  {currentData.map((entry, idx) => (
                    <Cell
                      key={idx}
                      className="hover:opacity-80 transition-opacity cursor-pointer"
                    />
                  ))}
                </Bar>
              </BarChart>
            ) : (
              <AreaChart data={currentData}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#F3F4F6"
                  vertical={false}
                />
                <XAxis
                  dataKey="name"
                  stroke="#9CA3AF"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#9CA3AF"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(v) =>
                    v >= 1000 ? `$${(v / 1000).toFixed(0)}k` : `$${v}`
                  }
                />
                <Tooltip content={<CustomTooltip isYearView={false} />} />
                <Area
                  type="monotone"
                  dataKey="sales"
                  stroke="#3B82F6"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorSales)"
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#10B981"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorRevenue)"
                />
              </AreaChart>
            )}
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-6 mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500" />
            <span className="text-xs text-gray-600">Sales (items sold)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-emerald-500" />
            <span className="text-xs text-gray-600">Revenue (money earned)</span>
          </div>
        </div>
      </div>
    </div>
  );
}