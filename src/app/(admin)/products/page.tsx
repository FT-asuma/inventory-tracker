"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  X,
  AlertTriangle,
  Package,
} from "lucide-react";
import { categories, Category } from "@/data/products-data";

// ── Add / Edit Category Modal ────────────────────────────
function CategoryModal({
  mode,
  initial,
  onClose,
}: {
  mode: "add" | "edit";
  initial?: Category;
  onClose: () => void;
}) {
  const [name, setName] = useState(initial?.name ?? "");
  const [icon, setIcon] = useState(initial?.icon ?? "📦");

  const emojis = [
    "🥤",
    "🍿",
    "🥛",
    "🍞",
    "🥩",
    "🧊",
    "🏠",
    "🧴",
    "🍬",
    "🥫",
    "🌾",
    "🧹",
    "🍎",
    "🧃",
    "🫙",
    "🥚",
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 10 }}
        transition={{ duration: 0.18 }}
        className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-base font-semibold text-gray-900">
            {mode === "add" ? "Add Category" : "Edit Category"}
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-4 h-4 text-gray-500" />
          </button>
        </div>

        {/* Icon picker */}
        <div className="mb-4">
          <label className="block text-xs font-medium text-gray-600 mb-2">
            Icon
          </label>
          <div className="flex flex-wrap gap-2">
            {emojis.map((e) => (
              <button
                key={e}
                onClick={() => setIcon(e)}
                className={`w-9 h-9 rounded-lg text-lg flex items-center justify-center border-2 transition-all
                  ${icon === e ? "border-accent bg-accent/5" : "border-gray-200 hover:border-gray-300"}`}
              >
                {e}
              </button>
            ))}
          </div>
        </div>

        {/* Name */}
        <div className="mb-6">
          <label className="block text-xs font-medium text-gray-600 mb-1.5">
            Category Name
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Beverages"
            className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm text-gray-900
                       placeholder:text-gray-400 focus:outline-none focus:border-accent transition-colors"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 text-sm font-medium text-gray-600 border border-gray-200
                       hover:bg-gray-50 rounded-xl transition-colors"
          >
            Cancel
          </button>
          <button
            className="flex-1 py-2.5 text-sm font-medium text-white bg-accent
                       hover:bg-accent-hover rounded-xl transition-colors"
          >
            {mode === "add" ? "Create Category" : "Save Changes"}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── Delete Confirm Modal ─────────────────────────────────
function DeleteModal({ name, onClose }: { name: string; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 10 }}
        transition={{ duration: 0.18 }}
        className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 rounded-xl bg-red-50">
            <Trash2 className="w-5 h-5 text-red-500" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-gray-900">
              Delete Category
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              This will delete all products inside
            </p>
          </div>
        </div>
        <p className="text-sm text-gray-600 mb-5">
          Are you sure you want to delete{" "}
          <span className="font-semibold text-gray-900">"{name}"</span>? This
          action cannot be undone.
        </p>
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 text-sm font-medium text-gray-600 border border-gray-200
                       hover:bg-gray-50 rounded-xl transition-colors"
          >
            Cancel
          </button>
          <button
            className="flex-1 py-2.5 text-sm font-medium text-white bg-red-500
                       hover:bg-red-600 rounded-xl transition-colors"
          >
            Delete
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── Main Page ────────────────────────────────────────────
export default function ProductsPage() {
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState<null | "add" | "edit">(null);
  const [editTarget, setEditTarget] = useState<Category | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Category | null>(null);

  const filtered = categories.filter((c:any) =>
    c.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="p-6 space-y-5">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-gray-900">Products</h1>
          <p className="text-xs text-gray-400 mt-0.5">
            {categories.length} categories ·{" "}
            {categories.reduce((a:any, c:any) => a + c.productCount, 0)} products total
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setModal("add")}
          className="flex items-center gap-2 px-4 py-2 bg-accent hover:bg-accent-hover
                     text-white text-sm font-medium rounded-xl transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          New Category
        </motion.button>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search categories..."
          className="w-full bg-white border border-gray-200 rounded-xl pl-9 pr-4 py-2
                     text-sm text-gray-900 placeholder:text-gray-400
                     focus:outline-none focus:border-accent transition-colors"
        />
      </div>

      {/* Categories grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <AnimatePresence>
          {filtered.map((cat:any, index:any) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: index * 0.04 }}
              className="group relative bg-white border border-gray-200 rounded-xl shadow-sm
                         hover:shadow-md hover:border-gray-300 transition-all duration-200"
            >
              {/* Action buttons — show on hover */}
              <div className="absolute top-3 right-3 hidden group-hover:flex items-center gap-1 z-10">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setEditTarget(cat);
                    setModal("edit");
                  }}
                  className="p-1.5 bg-white border border-gray-200 rounded-lg hover:bg-gray-50
                             text-gray-500 hover:text-accent transition-colors shadow-sm"
                >
                  <Pencil className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setDeleteTarget(cat);
                  }}
                  className="p-1.5 bg-white border border-gray-200 rounded-lg hover:bg-red-50
                             text-gray-500 hover:text-red-500 transition-colors shadow-sm"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Card content — links to category page */}
              <Link href={`/products/${cat.slug}`} className="block p-5">
                {/* Icon + low stock badge */}
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`w-12 h-12 rounded-xl border-2 flex items-center justify-center text-2xl ${cat.color}`}
                  >
                    {cat.icon}
                  </div>
                  {cat.lowStockCount > 0 && (
                    <span className="flex items-center gap-1 text-xs font-medium text-orange-500 bg-orange-50 border border-orange-100 px-2 py-0.5 rounded-full">
                      <AlertTriangle className="w-3 h-3" />
                      {cat.lowStockCount} low
                    </span>
                  )}
                </div>

                {/* Name */}
                <h3 className="text-sm font-semibold text-gray-900 mb-1 group-hover:text-accent transition-colors">
                  {cat.name}
                </h3>

                {/* Stats row */}
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <div className="flex items-center gap-1">
                    <Package className="w-3.5 h-3.5" />
                    <span>{cat.productCount} products</span>
                  </div>
                  <span>{cat.totalStock} in stock</span>
                </div>

                {/* Stock bar */}
                <div className="mt-3 h-1 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${
                      cat.lowStockCount > 2 ? "bg-orange-400" : "bg-emerald-400"
                    }`}
                    style={{
                      width: `${Math.min((cat.totalStock / (cat.productCount * 30)) * 100, 100)}%`,
                    }}
                  />
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {(modal === "add" || modal === "edit") && (
          <CategoryModal
            mode={modal}
            initial={modal === "edit" ? (editTarget ?? undefined) : undefined}
            onClose={() => {
              setModal(null);
              setEditTarget(null);
            }}
          />
        )}
        {deleteTarget && (
          <DeleteModal
            name={deleteTarget.name}
            onClose={() => setDeleteTarget(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
