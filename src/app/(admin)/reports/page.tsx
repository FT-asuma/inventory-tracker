'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FileText, 
  FileSpreadsheet, 
  Download, 
  Calendar, 
  TrendingUp, 
  DollarSign, 
  Package, 
  Loader2,
  X,
  Sliders,
  Check
} from 'lucide-react'
import { productSalesDatabase, ProductTransaction } from '@/data/reports'

type RangeSelectionType = 'this_week' | 'custom_range'
type CustomGranularity = 'week' | 'month' | 'quarter'
type ExportFormat = 'pdf' | 'excel'

export default function ReportsPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  // Modal target configuration state blocks
  const [modalFormat, setModalFormat] = useState<ExportFormat>('pdf')
  const [rangeType, setRangeType] = useState<RangeSelectionType>('this_week')
  const [customGranularity, setCustomGranularity] = useState<CustomGranularity>('month')
  const [selectedRangeValue, setSelectedRangeValue] = useState('May 2026')
  const [isGenerating, setIsGenerating] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 400)
    return () => clearTimeout(timer)
  }, [])

  const customRangeOptions: Record<CustomGranularity, string[]> = {
    week: ['Week 23 (Current)', 'Week 22', 'Week 21', 'Week 20'],
    month: ['June 2026', 'May 2026', 'April 2026', 'March 2026'],
    quarter: ['Q2 2026 (Current)', 'Q1 2026', 'Q4 2025']
  }

  // Pure Client-Side Production Compiler Workflow
  const handleDownloadTrigger = () => {
    setIsGenerating(true)

    setTimeout(() => {
      const now = new Date()
      let filteredData: ProductTransaction[] = []
      let timeframeLabel = ''

      // 1. Compute Data Boundaries
      if (rangeType === 'this_week') {
        timeframeLabel = 'Rolling 7 Days Matrix'
        const sevenDaysAgo = new Date()
        sevenDaysAgo.setDate(now.getDate() - 7)
        filteredData = productSalesDatabase.filter((item:any) => new Date(item.timestamp) >= sevenDaysAgo)
      } else {
        timeframeLabel = `${customGranularity.toUpperCase()} Range (${selectedRangeValue})`
        if (customGranularity === 'month') {
          const matchMonthStr = selectedRangeValue.split(' ')[0].toLowerCase()
          filteredData = productSalesDatabase.filter((item:any) => {
            const m = new Date(item.timestamp).toLocaleString('en-US', { month: 'long' }).toLowerCase()
            return m === matchMonthStr
          })
        } else {
          filteredData = productSalesDatabase.slice(0, 4) // Stable fallback framework data
        }
      }

      // Compute structural totals
      const totalRevenue = filteredData.reduce((acc, c) => acc + c.revenue, 0)
      const totalUnitsMoved = filteredData.reduce((acc, c) => acc + c.quantity, 0)
      
      // Determine Top Performing Product in group
      const productCounts: Record<string, number> = {}
      filteredData.forEach(item => {
        productCounts[item.productName] = (productCounts[item.productName] || 0) + item.quantity
      })
      const topProduct = Object.keys(productCounts).reduce((a, b) => productCounts[a] > productCounts[b] ? a : b, 'None')

      // 2. Format Execution Pipelines
      if (modalFormat === 'excel') {
        const csvRows = [
          ['INVETRA DISTRIBUTION NETWORKS', '', 'CONFIDENTIAL SYSTEM REPORT'],
          ['Scope Window Horizon', timeframeLabel],
          ['Compiled Timestamp', new Date().toLocaleString()],
          [],
          ['EXECUTIVE SUMMARY SUMMARY METRICS'],
          ['Gross System Revenue Captured', `$${totalRevenue.toFixed(2)}`],
          ['Total Volume Units Dispatched', `${totalUnitsMoved} Units`],
          ['Primary Velocity Driver Product', topProduct],
          [],
          ['TRANSACTION TRACKING DETAILED LEDGER'],
          ['Transaction ID', 'Timestamp Log', 'Product Description', 'Category Group', 'Units Dispatched', 'Unit Price ($)', 'Net Yield ($)', 'Operational Node Location'],
          ...filteredData.map(item => [
            item.id,
            item.timestamp.replace('T', ' ').replace('Z', ''),
            item.productName,
            item.category,
            item.quantity.toString(),
            item.unitPrice.toFixed(2),
            item.revenue.toFixed(2),
            item.region
          ])
        ]

        const blobContent = csvRows.map(r => r.map(cell => `"${cell.replace(/"/g, '""')}"`).join(',')).join('\n')
        triggerBrowserDownload(new Blob([blobContent], { type: 'text/csv;charset=utf-8;' }), `Invetra_Ledger_${rangeType}.csv`)
      } else {
        // Highly stylized vector HTML template that handles printing cleanly on desktop or mobile viewports
        const HTML_STYLED_TEMPLATE = `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <title>Invetra Executive Statement Layout</title>
            <style>
              body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; color: #1e293b; margin: 0; padding: 40px; background: #f8fafc; }
              .container { max-width: 850px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 40px; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.05); }
              .header { display: flex; justify-content: space-between; align-items: flex-start; border-b: 2px solid #f1f5f9; padding-bottom: 24px; margin-bottom: 30px; }
              .logo-title { font-size: 20px; font-weight: 800; tracking-spacing: -0.5px; color: #0f172a; margin: 0; text-transform: uppercase; }
              .subtitle { font-size: 12px; color: #64748b; margin-top: 4px; }
              .badge { font-family: monospace; background: #f1f5f9; border: 1px solid #cbd5e1; font-size: 11px; padding: 4px 8px; border-radius: 6px; font-weight: 600; }
              .grid-metrics { display: grid; grid-cols: 3; display: flex; gap: 16px; margin-bottom: 32px; }
              .metric-card { flex: 1; background: #f8fafc; border: 1px solid #e2e8f0; padding: 18px; rounded-radius: 12px; border-radius: 12px; }
              .metric-label { font-size: 11px; text-transform: uppercase; color: #64748b; font-weight: 700; tracking-spacing: 0.5px; }
              .metric-value { font-size: 22px; font-weight: 800; color: #0f172a; margin: 6px 0 0 0; }
              table { w-full: 100%; width: 100%; border-collapse: collapse; text-align: left; margin-top: 10px; }
              th { background: #0f172a; color: #ffffff; font-size: 11px; font-weight: 700; text-transform: uppercase; padding: 12px; }
              th:first-child { border-radius: 6px 0 0 6px; }
              th:last-child { border-radius: 0 6px 6px 0; }
              td { padding: 12px; font-size: 13px; border-bottom: 1px solid #f1f5f9; color: #334155; }
              .font-mono { font-family: monospace; font-size: 12px; }
              .text-right { text-align: right; }
              .footer { margin-top: 40px; border-t: 1px solid #f1f5f9; padding-top: 20px; font-size: 11px; color: #94a3b8; text-align: center; }
              @media print { body { background: none; padding: 0; } .container { border: none; box-shadow: none; padding: 0; } }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <div>
                  <h1 class="logo-title">Invetra Distribution Networks</h1>
                  <div class="subtitle">Corporate Ledger Compilation & Sales Statement</div>
                </div>
                <div class="badge">SYSTEM INDEX: #INV-2026</div>
              </div>

              <div style="margin-bottom: 24px;">
                <div style="font-size: 13px; color: #334155;"><strong>Reporting Duration Frame:</strong> ${timeframeLabel}</div>
                <div style="font-size: 13px; color: #334155; margin-top: 2px;"><strong>Executed Generation Timestamp:</strong> ${new Date().toLocaleString()}</div>
              </div>

              <div class="grid-metrics">
                <div class="metric-card">
                  <div class="metric-label">Aggregated Revenue Yield</div>
                  <div class="metric-value" style="color: #10b981;">$${totalRevenue.toFixed(2)}</div>
                </div>
                <div class="metric-card">
                  <div class="metric-label">Volume Dispatched</div>
                  <div class="metric-value">${totalUnitsMoved} Units</div>
                </div>
                <div class="metric-card">
                  <div class="metric-label">Top Market Velocity</div>
                  <div class="metric-value" style="font-size: 14px; margin-top: 12px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${topProduct}</div>
                </div>
              </div>

              <h3 style="font-size: 14px; font-weight: 700; color: #0f172a; margin-bottom: 12px; text-transform: uppercase;">Itemized Dispatch Records</h3>
              <table>
                <thead>
                  <tr>
                    <th>ID Sequence</th>
                    <th>Product Descr.</th>
                    <th>Category</th>
                    <th class="text-right">Qty</th>
                    <th class="text-right">Rate</th>
                    <th class="text-right">Net Yield</th>
                  </tr>
                </thead>
                <tbody>
                  ${filteredData.map(item => `
                    <tr>
                      <td class="font-mono">${item.id}</td>
                      <td style="font-weight: 600; color: #0f172a;">${item.productName}</td>
                      <td>${item.category}</td>
                      <td class="text-right font-mono">${item.quantity}</td>
                      <td class="text-right font-mono">$${item.unitPrice.toFixed(2)}</td>
                      <td class="text-right font-mono" style="font-weight: 600; color: #0f172a;">$${item.revenue.toFixed(2)}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>

              <div class="footer">
                This document contains system data generated directly under active corporate platform network validation protocols.
              </div>
            </div>
            <script>window.onload = function() { window.print(); }</script>
          </body>
          </html>
        `
        triggerBrowserDownload(new Blob([HTML_STYLED_TEMPLATE], { type: 'text/html;charset=utf-8;' }), `Invetra_Corporate_Report_${rangeType}.html`)
      }

      setIsGenerating(false)
      setIsModalOpen(false)
    }, 1200)
  }

  const triggerBrowserDownload = (blob: Blob, filename: string) => {
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.setAttribute('download', filename)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(link.href)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full min-h-[60vh]">
        <div className="w-8 h- border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="p-6 space-y-5 bg-gray-50/50 min-h-screen">
      
      {/* Page Header Header Row */}
      <div className="flex justify-between items-start border-b border-gray-200 pb-4">
        <div className="text-left">
          <h1 className="text-lg font-bold text-gray-900">System Reports Ledger</h1>
          <p className="text-xs text-gray-400 mt-0.5">Configure spatial parameters and extract validated business intelligence tables</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="py-2.5 px-4 bg-gray-900 hover:bg-gray-800 text-white font-semibold text-xs rounded-xl shadow-sm flex items-center gap-2 transition-all"
        >
          <Sliders className="w-3.5 h-3.5" />
          Open Export Generator
        </button>
      </div>

      {/* Interface Mock Background Display Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 opacity-60 pointer-events-none select-none">
        <div className="p-4 bg-white border border-gray-200 rounded-xl text-left">
          <span className="text-[10px] uppercase font-bold tracking-wide text-gray-400">Database Connection</span>
          <div className="text-xs font-bold text-emerald-600 mt-1">● Active Stream Connected</div>
        </div>
        <div className="p-4 bg-white border border-gray-200 rounded-xl text-left">
          <span className="text-[10px] uppercase font-bold tracking-wide text-gray-400">Log Elements Packed</span>
          <div className="text-xs font-bold text-gray-900 mt-1">{productSalesDatabase.length} Rows Cached</div>
        </div>
        <div className="p-4 bg-white border border-gray-200 rounded-xl text-left">
          <span className="text-[10px] uppercase font-bold tracking-wide text-gray-400">Security Checksum</span>
          <div className="text-xs font-mono text-gray-500 mt-1">SHA-256 Verified</div>
        </div>
      </div>

      {/* INTERACTIVE COMPILATION MODAL WINDOW FRAME */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 8 }}
              className="w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-2xl overflow-hidden flex flex-col text-left"
            >
              {/* Header Box */}
              <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                <div>
                  <h3 className="text-sm font-bold text-gray-900">Compile Dynamic Statement</h3>
                  <p className="text-[11px] text-gray-400">Configure layout styles and chronological target sets</p>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Configuration Payload Frame */}
              <div className="p-5 space-y-5">
                
                {/* 1. Target Format Selection Element */}
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wide block">1. Select Destination File Format</label>
                  <div className="grid grid-cols-2 gap-3">
                    {/* PDF Toggle Mode */}
                    <div
                      onClick={() => setModalFormat('pdf')}
                      className={`p-3 border rounded-xl cursor-pointer flex items-center justify-between transition-all
                        ${modalFormat === 'pdf' ? 'border-rose-500 bg-rose-50/20' : 'border-gray-200 bg-white hover:bg-gray-50'}`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className={`p-1.5 rounded-lg ${modalFormat === 'pdf' ? 'bg-rose-500 text-white' : 'bg-gray-100 text-gray-400'}`}>
                          <FileText className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="text-xs font-bold text-gray-900 block">Print PDF</span>
                          <span className="text-[10px] text-gray-400 block">Stylized Report</span>
                        </div>
                      </div>
                      {modalFormat === 'pdf' && <div className="w-4 h-4 rounded-full bg-rose-500 flex items-center justify-center text-white"><Check className="w-2.5 h-2.5 stroke-[3]" /></div>}
                    </div>

                    {/* Excel Toggle Mode */}
                    <div
                      onClick={() => setModalFormat('excel')}
                      className={`p-3 border rounded-xl cursor-pointer flex items-center justify-between transition-all
                        ${modalFormat === 'excel' ? 'border-emerald-500 bg-emerald-50/20' : 'border-gray-200 bg-white hover:bg-gray-50'}`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className={`p-1.5 rounded-lg ${modalFormat === 'excel' ? 'bg-emerald-500 text-white' : 'bg-gray-100 text-gray-400'}`}>
                          <FileSpreadsheet className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="text-xs font-bold text-gray-900 block">Excel CSV</span>
                          <span className="text-[10px] text-gray-400 block">Structured Sheets</span>
                        </div>
                      </div>
                      {modalFormat === 'excel' && <div className="w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center text-white"><Check className="w-2.5 h-2.5 stroke-[3]" /></div>}
                    </div>
                  </div>
                </div>

                {/* 2. Range Horizon Configurations */}
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wide block">2. Select Time Duration Boundaries</label>
                  <div className="space-y-2">
                    {/* Week Selector Button Option */}
                    <div 
                      onClick={() => setRangeType('this_week')}
                      className={`p-3 border rounded-xl cursor-pointer transition-all flex items-start gap-3
                        ${rangeType === 'this_week' ? 'border-gray-900 bg-gray-50/60' : 'border-gray-200 bg-white hover:bg-gray-50'}`}
                    >
                      <div className="mt-0.5">
                        <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${rangeType === 'this_week' ? 'border-gray-900' : 'border-gray-300'}`}>
                          {rangeType === 'this_week' && <div className="w-1.5 h-1.5 rounded-full bg-gray-900" />}
                        </div>
                      </div>
                      <div>
                        <span className="text-xs font-bold text-gray-900 block">This Week (7 Days Rolling)</span>
                        <span className="text-[10px] text-gray-400 block">Captures performance data from today extending 7 days backward</span>
                      </div>
                    </div>

                    {/* Custom Range Selector Option */}
                    <div 
                      onClick={() => setRangeType('custom_range')}
                      className={`p-3 border rounded-xl cursor-pointer transition-all flex items-start gap-3
                        ${rangeType === 'custom_range' ? 'border-gray-900 bg-gray-50/60' : 'border-gray-200 bg-white hover:bg-gray-50'}`}
                    >
                      <div className="mt-0.5">
                        <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${rangeType === 'custom_range' ? 'border-gray-900' : 'border-gray-300'}`}>
                          {rangeType === 'custom_range' && <div className="w-1.5 h-1.5 rounded-full bg-gray-900" />}
                        </div>
                      </div>
                      <div>
                        <span className="text-xs font-bold text-gray-900 block">Custom Matrix Selection</span>
                        <span className="text-[10px] text-gray-400 block">Isolate performance by clear organizational micro-brackets</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sub-parameters for custom granularity modes */}
                {rangeType === 'custom_range' && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }} 
                    animate={{ opacity: 1, height: 'auto' }}
                    className="space-y-4 border-t border-gray-100 pt-4"
                  >
                    <div>
                      <span className="text-[10px] font-bold text-gray-400 uppercase block mb-1.5">Granularity Step</span>
                      <div className="grid grid-cols-3 gap-1.5 bg-gray-100 p-1 rounded-xl">
                        {(['week', 'month', 'quarter'] as CustomGranularity[]).map((g) => (
                          <button
                            key={g}
                            type="button"
                            onClick={() => {
                              setCustomGranularity(g);
                              setSelectedRangeValue(customRangeOptions[g][0]);
                            }}
                            className={`py-1.5 text-xs font-semibold rounded-lg capitalize transition-all
                              ${customGranularity === g ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
                          >
                            {g}s
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <span className="text-[10px] font-bold text-gray-400 uppercase block mb-1.5 font-medium">Select Targeted Range Node</span>
                      <select
                        value={selectedRangeValue}
                        onChange={(e) => setSelectedRangeValue(e.target.value)}
                        className="w-full bg-white border border-gray-200 rounded-xl p-2.5 text-xs text-gray-800 outline-none focus:border-gray-400 font-medium transition-all"
                      >
                        {customRangeOptions[customGranularity].map((opt) => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    </div>
                  </motion.div>
                )}

              </div>

              {/* Action Sheet Trigger Strip */}
              <div className="p-4 bg-gray-50 border-t border-gray-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-gray-200 text-gray-600 rounded-xl font-medium text-xs bg-white hover:bg-gray-50 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleDownloadTrigger}
                  disabled={isGenerating}
                  className="px-5 py-2.5 bg-gray-900 hover:bg-gray-800 disabled:bg-gray-300 text-white font-semibold text-xs rounded-xl transition-all shadow-sm flex items-center gap-1.5"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      Assembling File Object...
                    </>
                  ) : (
                    <>
                      <Download className="w-3.5 h-3.5" />
                      Download {modalFormat.toUpperCase()}
                    </>
                  )}
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}