'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import {
  ArrowLeft, Plus, Search, Pencil, Trash2,
  X, ChevronLeft, ChevronRight, Tag, Hash, PackagePlus
} from 'lucide-react'
import { categories, productsByCategory, type Product } from '@/data/products-data'

const PAGE_SIZE = 10

// ── Stock badge ──────────────────────────────────────────
function StockBadge({ current, initial }: { current: number; initial: number }) {
  const ratio = current / initial
  if (ratio <= 0.15) return <span className="inline-flex items-center gap-1 text-xs font-medium text-red-500 bg-red-50 px-2 py-0.5 rounded-full border border-red-100">{current} left</span>
  if (ratio <= 0.35) return <span className="inline-flex items-center gap-1 text-xs font-medium text-orange-500 bg-orange-50 px-2 py-0.5 rounded-full border border-orange-100">{current} left</span>
  return <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">{current} left</span>
}

// ── Refill Modal ─────────────────────────────────────────
function RefillModal({
  product,
  onClose,
}: {
  product: Product
  onClose: () => void
}) {
  const [addAmount, setAddAmount] = useState('')
  
  const added = parseInt(addAmount) || 0
  const newStock = product.currentStock + added

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 12 }}
        transition={{ duration: 0.18 }}
        className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-base font-semibold text-gray-900">Refill Stock</h2>
            <p className="text-xs text-gray-400 mt-0.5">{product.name}</p>
          </div>
          <button onClick={onClose} className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
            <X className="w-4 h-4 text-gray-500" />
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100">
            <span className="text-sm text-gray-600">Current Stock</span>
            <span className="text-sm font-semibold text-gray-900">{product.currentStock}</span>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1.5">Amount to Add</label>
            <input 
              type="number" 
              value={addAmount} 
              onChange={e => setAddAmount(e.target.value)} 
              placeholder="e.g. 50"
              className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm text-gray-900
                         placeholder:text-gray-400 focus:outline-none focus:border-accent transition-colors" 
            />
          </div>

          <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-xl border border-emerald-100">
            <span className="text-sm text-emerald-800">New Stock Level</span>
            <span className="text-sm font-bold text-emerald-600">{newStock}</span>
          </div>
        </div>

        <div className="flex items-center gap-3 mt-6">
          <button onClick={onClose}
            className="flex-1 py-2.5 text-sm font-medium text-gray-600 border border-gray-200
                       hover:bg-gray-50 rounded-xl transition-colors">
            Cancel
          </button>
          <button
            onClick={() => {
              // Add your actual backend/state update logic here
              onClose()
            }}
            disabled={added <= 0}
            className="flex-1 py-2.5 text-sm font-medium text-white bg-emerald-500
                       hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl transition-colors"
          >
            Confirm Refill
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ── Product Modal (Add / Edit) ───────────────────────────
function ProductModal({
  mode,
  initial,
  categoryName,
  onClose,
}: {
  mode: 'add' | 'edit'
  initial?: Product
  categoryName: string
  onClose: () => void
}) {
  const [form, setForm] = useState({
    name:         initial?.name ?? '',
    price:        initial?.price?.toString() ?? '',
    imageUrl:     initial?.imageUrl ?? '',
    initialStock: initial?.initialStock?.toString() ?? '',
    hashtags:     initial?.hashtags?.join(', ') ?? '',
    discount:     initial?.discount?.toString() ?? '',
    unit:         initial?.unit ?? 'pcs',
  })

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }))

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 12 }}
        transition={{ duration: 0.18 }}
        className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-base font-semibold text-gray-900">
              {mode === 'add' ? 'Add Product' : 'Edit Product'}
            </h2>
            <p className="text-xs text-gray-400 mt-0.5">Category: {categoryName}</p>
          </div>
          <button onClick={onClose} className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
            <X className="w-4 h-4 text-gray-500" />
          </button>
        </div>

        <div className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1.5">Product Name *</label>
            <input value={form.name} onChange={set('name')} placeholder="e.g. Coca-Cola 500ml"
              className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm text-gray-900
                         placeholder:text-gray-400 focus:outline-none focus:border-accent transition-colors" />
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1.5">Image URL</label>
            <input value={form.imageUrl} onChange={set('imageUrl')} placeholder="https://..."
              className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm text-gray-900
                         placeholder:text-gray-400 focus:outline-none focus:border-accent transition-colors" />
          </div>

          {/* Price + Unit */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">Price (UZS) *</label>
              <input value={form.price} onChange={set('price')} type="number" placeholder="e.g. 8000"
                className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm text-gray-900
                           placeholder:text-gray-400 focus:outline-none focus:border-accent transition-colors" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">Unit</label>
              <select value={form.unit} onChange={set('unit')}
                className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm text-gray-900
                           focus:outline-none focus:border-accent transition-colors bg-white">
                {['pcs', 'kg', 'litre', 'pack', 'box'].map(u => (
                  <option key={u} value={u}>{u}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Initial stock + Discount */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">Initial Stock *</label>
              <input value={form.initialStock} onChange={set('initialStock')} type="number" placeholder="e.g. 100"
                className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm text-gray-900
                           placeholder:text-gray-400 focus:outline-none focus:border-accent transition-colors" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">Discount %</label>
              <input value={form.discount} onChange={set('discount')} type="number" placeholder="e.g. 10"
                className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm text-gray-900
                           placeholder:text-gray-400 focus:outline-none focus:border-accent transition-colors" />
            </div>
          </div>

          {/* Hashtags */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1.5">Hashtags</label>
            <input value={form.hashtags} onChange={set('hashtags')} placeholder="cola, cold, popular (comma separated)"
              className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm text-gray-900
                         placeholder:text-gray-400 focus:outline-none focus:border-accent transition-colors" />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 mt-6">
          <button onClick={onClose}
            className="flex-1 py-2.5 text-sm font-medium text-gray-600 border border-gray-200
                       hover:bg-gray-50 rounded-xl transition-colors">
            Cancel
          </button>
          <button
            className="flex-1 py-2.5 text-sm font-medium text-white bg-accent
                       hover:bg-accent-hover rounded-xl transition-colors">
            {mode === 'add' ? 'Add Product' : 'Save Changes'}
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ── Delete Confirm ───────────────────────────────────────
function DeleteModal({ count, onClose }: { count: number; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.18 }}
        className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 rounded-xl bg-red-50">
            <Trash2 className="w-5 h-5 text-red-500" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-gray-900">Delete {count > 1 ? `${count} Products` : 'Product'}</h2>
            <p className="text-xs text-gray-500 mt-0.5">This action cannot be undone</p>
          </div>
        </div>
        <p className="text-sm text-gray-600 mb-5">
          Are you sure you want to delete <span className="font-semibold text-gray-900">{count} {count === 1 ? 'product' : 'products'}</span>?
        </p>
        <div className="flex gap-3">
          <button onClick={onClose}
            className="flex-1 py-2.5 text-sm font-medium text-gray-600 border border-gray-200
                       hover:bg-gray-50 rounded-xl transition-colors">
            Cancel
          </button>
          <button
            className="flex-1 py-2.5 text-sm font-medium text-white bg-red-500
                       hover:bg-red-600 rounded-xl transition-colors">
            Delete
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ── Main Page ────────────────────────────────────────────
export default function CategoryPage() {
  const params = useParams()
  const slug = params.category as string
  const category = categories.find(c => c.slug === slug)
  const allProducts: Product[] = productsByCategory[slug] ?? []

  const [search, setSearch]           = useState('')
  const [page, setPage]               = useState(1)
  const [selected, setSelected]       = useState<Set<string>>(new Set())
  const [modal, setModal]             = useState<null | 'add' | 'edit'>(null)
  const [editProduct, setEditProduct] = useState<Product | null>(null)
  const [refillProduct, setRefillProduct] = useState<Product | null>(null)
  const [showDelete, setShowDelete]   = useState(false)

  const filtered = useMemo(() =>
    allProducts.filter(p =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.id.toLowerCase().includes(search.toLowerCase()) ||
      p.hashtags.some(h => h.includes(search.toLowerCase()))
    ), [allProducts, search])

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)
  const paginated  = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const allChecked = paginated.length > 0 && paginated.every(p => selected.has(p.id))

  function toggleAll() {
    if (allChecked) {
      const next = new Set(selected)
      paginated.forEach(p => next.delete(p.id))
      setSelected(next)
    } else {
      const next = new Set(selected)
      paginated.forEach(p => next.add(p.id))
      setSelected(next)
    }
  }

  function toggleOne(id: string) {
    const next = new Set(selected)
    next.has(id) ? next.delete(id) : next.add(id)
    setSelected(next)
  }

  if (!category) {
    return (
      <div className="p-6">
        <p className="text-gray-500 text-sm">Category not found.</p>
        <Link href="/products" className="text-accent text-sm mt-2 inline-block">← Back to Products</Link>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-5">

      {/* Breadcrumb + header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <Link href="/products"
            className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors text-gray-500">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl">{category.icon}</span>
              <h1 className="text-lg font-bold text-gray-900">{category.name}</h1>
            </div>
            <p className="text-xs text-gray-400 mt-0.5">
              {filtered.length} products · {filtered.reduce((a, p) => a + p.currentStock, 0)} total stock
            </p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          {selected.size > 0 && (
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={() => setShowDelete(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium text-red-500
                         bg-red-50 border border-red-200 hover:bg-red-100 rounded-xl transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Delete ({selected.size})
            </motion.button>
          )}
          <button
            onClick={() => { setModal('add'); setEditProduct(null) }}
            className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white
                       bg-accent hover:bg-accent-hover rounded-xl transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            Add Product
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          value={search}
          onChange={e => { setSearch(e.target.value); setPage(1) }}
          placeholder="Search products, ID, hashtags..."
          className="w-full bg-white border border-gray-200 rounded-xl pl-9 pr-4 py-2
                     text-sm text-gray-900 placeholder:text-gray-400
                     focus:outline-none focus:border-accent transition-colors"
        />
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">

        {/* Table header */}
        <div className="grid grid-cols-12 items-center px-4 py-2.5 bg-gray-50 border-b border-gray-200 gap-2">
          <div className="col-span-1 flex items-center">
            <input type="checkbox" checked={allChecked} onChange={toggleAll}
              className="w-4 h-4 rounded border-gray-300 accent-accent cursor-pointer" />
          </div>
          <span className="col-span-1 text-xs font-medium text-gray-400">Image</span>
          <span className="col-span-3 text-xs font-medium text-gray-400">Name / ID</span>
          <span className="col-span-1 text-xs font-medium text-gray-400 text-right">Price</span>
          <span className="col-span-1 text-xs font-medium text-gray-400 text-center">Stock</span>
          <span className="col-span-1 text-xs font-medium text-gray-400 text-center">Initial</span>
          <span className="col-span-2 text-xs font-medium text-gray-400">Hashtags</span>
          <span className="col-span-1 text-xs font-medium text-gray-400 text-center">Disc.</span>
          <span className="col-span-1 text-xs font-medium text-gray-400 text-right">Actions</span>
        </div>

        {/* Rows */}
        <div className="divide-y divide-gray-50">
          {paginated.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-sm text-gray-400">No products found</p>
            </div>
          ) : (
            paginated.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.03 }}
                className={`grid grid-cols-12 items-center px-4 py-3 gap-2 transition-colors
                  ${selected.has(product.id) ? 'bg-accent/5' : 'hover:bg-gray-50'}`}
              >
                {/* Checkbox */}
                <div className="col-span-1">
                  <input type="checkbox" checked={selected.has(product.id)} onChange={() => toggleOne(product.id)}
                    className="w-4 h-4 rounded border-gray-300 accent-accent cursor-pointer" />
                </div>

                {/* Image */}
                <div className="col-span-1">
                  {product.imageUrl ? (
                    <img src={product.imageUrl} alt={product.name}
                      className="w-9 h-9 rounded-lg object-cover border border-gray-200" />
                  ) : (
                    <div className="w-9 h-9 rounded-lg bg-gray-100 border border-gray-200
                                    flex items-center justify-center text-lg">
                      {category.icon}
                    </div>
                  )}
                </div>

                {/* Name + ID */}
                <div className="col-span-3">
                  <p className="text-xs font-semibold text-gray-900 truncate">{product.name}</p>
                  <p className="text-xs text-gray-400 font-mono">{product.id}</p>
                </div>

                {/* Price */}
                <div className="col-span-1 text-right">
                  <span className="text-xs font-semibold text-gray-900">
                    {product.price.toLocaleString()} <span className="text-gray-400 font-normal">UZS</span>
                  </span>
                </div>

                {/* Stock (Clickable to Refill) */}
                <div 
                  className="col-span-1 flex justify-center cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={() => setRefillProduct(product)}
                  title="Click to refill stock"
                >
                  <StockBadge current={product.currentStock} initial={product.initialStock} />
                </div>

                {/* Initial stock */}
                <div className="col-span-1 text-center">
                  <span className="text-xs text-gray-400">{product.initialStock}</span>
                </div>

                {/* Hashtags */}
                <div className="col-span-2 flex flex-wrap gap-1">
                  {product.hashtags.slice(0, 2).map(tag => (
                    <span key={tag}
                      className="inline-flex items-center gap-0.5 text-xs text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded-md">
                      <Hash className="w-2.5 h-2.5" />{tag}
                    </span>
                  ))}
                  {product.hashtags.length > 2 && (
                    <span className="text-xs text-gray-400">+{product.hashtags.length - 2}</span>
                  )}
                </div>

                {/* Discount */}
                <div className="col-span-1 flex justify-center">
                  {product.discount ? (
                    <span className="inline-flex items-center gap-0.5 text-xs font-medium text-violet-600
                                     bg-violet-50 border border-violet-100 px-1.5 py-0.5 rounded-full">
                      <Tag className="w-2.5 h-2.5" />{product.discount}%
                    </span>
                  ) : (
                    <span className="text-xs text-gray-300">—</span>
                  )}
                </div>

                {/* Actions */}
                <div className="col-span-1 flex items-center justify-end gap-0.5">
                  <button
                    onClick={() => setRefillProduct(product)}
                    title="Refill Stock"
                    className="p-1.5 hover:bg-emerald-50 rounded-lg transition-colors text-gray-400 hover:text-emerald-500"
                  >
                    <PackagePlus className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => { setEditProduct(product); setModal('edit') }}
                    title="Edit Product"
                    className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors text-gray-400 hover:text-accent"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => { setSelected(new Set([product.id])); setShowDelete(true) }}
                    title="Delete Product"
                    className="p-1.5 hover:bg-red-50 rounded-lg transition-colors text-gray-400 hover:text-red-500"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100 bg-gray-50/50">
            <p className="text-xs text-gray-400">
              Showing {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length}
            </p>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="p-1.5 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-100
                           disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
                <button
                  key={n}
                  onClick={() => setPage(n)}
                  className={`w-7 h-7 rounded-lg text-xs font-medium transition-colors
                    ${page === n
                      ? 'bg-accent text-white'
                      : 'border border-gray-200 text-gray-600 hover:bg-gray-100'
                    }`}
                >
                  {n}
                </button>
              ))}
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="p-1.5 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-100
                           disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Bulk selection bar */}
      <AnimatePresence>
        {selected.size > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40
                       bg-gray-900 text-white rounded-2xl shadow-xl px-5 py-3
                       flex items-center gap-4"
          >
            <span className="text-sm font-medium">{selected.size} selected</span>
            <div className="w-px h-4 bg-white/20" />
            <button
              onClick={() => setShowDelete(true)}
              className="flex items-center gap-1.5 text-sm font-medium text-red-400 hover:text-red-300 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </button>
            <button
              onClick={() => setSelected(new Set())}
              className="flex items-center gap-1 text-sm text-white/50 hover:text-white transition-colors"
            >
              <X className="w-3.5 h-3.5" /> Clear
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modals */}
      <AnimatePresence>
        {refillProduct && (
          <RefillModal
            product={refillProduct}
            onClose={() => setRefillProduct(null)}
          />
        )}
        {(modal === 'add' || modal === 'edit') && (
          <ProductModal
            mode={modal}
            initial={modal === 'edit' ? editProduct ?? undefined : undefined}
            categoryName={category.name}
            onClose={() => { setModal(null); setEditProduct(null) }}
          />
        )}
        {showDelete && (
          <DeleteModal
            count={selected.size}
            onClose={() => setShowDelete(false)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}