'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { clearStoredRole } from '@/hooks/useAuth'

type NavItem = {
  label: string
  href: string
  icon: React.ReactNode
  badge?: number
}

type NavGroup = {
  title?: string
  items: NavItem[]
}

const Icons = {
  dashboard: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
      <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
    </svg>
  ),
  products: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
    </svg>
  ),
  discounts: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
    </svg>
  ),
  sellers: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ),
  reports: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/>
      <line x1="6" y1="20" x2="6" y2="14"/>
    </svg>
  ),
  shelf: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/>
      <line x1="12" y1="17" x2="12" y2="21"/>
    </svg>
  ),
  summary: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
    </svg>
  ),
  logout: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
      <polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
    </svg>
  ),
  chevron: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6"/>
    </svg>
  ),
}

const adminNav: NavGroup[] = [
  {
    items: [
      { label: 'Dashboard', href: '/dashboard', icon: Icons.dashboard },
      { label: 'Products',  href: '/products',  icon: Icons.products  },
      { label: 'Discounts', href: '/discounts',  icon: Icons.discounts },
    ],
  },
  {
    title: 'Manage',
    items: [
      { label: 'Sellers', href: '/sellers', icon: Icons.sellers },
      { label: 'Reports', href: '/reports', icon: Icons.reports },
    ],
  },
]

const sellerNav: NavGroup[] = [
  {
    items: [
      { label: 'Shelf',   href: '/shelf',   icon: Icons.shelf   },
      { label: 'Summary', href: '/summary', icon: Icons.summary },
    ],
  },
]

type SidebarProps = {
  role: 'admin' | 'seller'
  companyName?: string
  userName?: string
  userInitials?: string
  lowStockCount?: number
}

export default function Sidebar({
  role = 'admin',
  companyName = 'My Store',
  userName = 'User',
  userInitials = 'U',
  lowStockCount = 0,
}: SidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [collapsed, setCollapsed] = useState(false)

  const navGroups = role === 'admin' ? adminNav : sellerNav

  const groupsWithBadge = navGroups.map(group => ({
    ...group,
    items: group.items.map(item =>
      item.href === '/products' && lowStockCount > 0
        ? { ...item, badge: lowStockCount }
        : item
    ),
  }))

  function handleLogout() {
    clearStoredRole()
    router.push('/login')
  }

  return (
    <aside
      className="relative flex flex-col h-screen bg-sidebar border-r border-elevated transition-all duration-300"
      style={{ width: collapsed ? '72px' : '240px', minWidth: collapsed ? '72px' : '240px' }}
    >
      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute right-1 top-6 w-6 h-6 rounded-full bg-elevated border border-hint/20 z-40
                   flex items-center justify-center text-muted hover:text-white transition-all duration-200"
        style={{ transform: collapsed ? 'rotate(180deg)' : 'rotate(0deg)'}}
      >
        {Icons.chevron}
      </button>

      {/* Brand */}
      <div className="flex items-center gap-3 top-0 py-3 border-b border-elevated">
        <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center shrink-0">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <rect x="1" y="1" width="6" height="6" rx="1.5" fill="#0F1117"/>
            <rect x="9" y="1" width="6" height="6" rx="1.5" fill="#0F1117"/>
            <rect x="1" y="9" width="6" height="6" rx="1.5" fill="#0F1117"/>
            <rect x="9" y="9" width="6" height="6" rx="1.5" fill="#0F1117" opacity="0.4"/>
          </svg>
        </div>
        {!collapsed && (
          <div className="overflow-hidden">
            <p className="text-white font-semibold text-sm leading-tight truncate">Inventra</p>
            <p className="text-muted text-xs truncate">{companyName}</p>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-5">
        {groupsWithBadge.map((group, gi) => (
          <div key={gi}>
            {group.title && !collapsed && (
              <p className="text-hint text-xs font-semibold uppercase tracking-widest px-3 mb-2">
                {group.title}
              </p>
            )}
            <ul className="space-y-1">
              {group.items.map(item => {
                const isActive = pathname === item.href ||
                  (item.href !== '/dashboard' && pathname.startsWith(item.href))
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`nav-link ${isActive ? 'active' : ''} ${collapsed ? 'justify-center px-0' : ''}`}
                      title={collapsed ? item.label : undefined}
                    >
                      <span className="shrink-0">{item.icon}</span>
                      {!collapsed && (
                        <span className="flex-1 text-sm truncate">{item.label}</span>
                      )}
                      {!collapsed && item.badge ? (
                        <span className="ml-auto bg-stock-low/20 text-stock-low text-xs font-semibold px-1.5 py-0.5 rounded-full">
                          {item.badge}
                        </span>
                      ) : null}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* User footer */}
      <div className="border-t border-elevated p-3">
        <div className={`flex items-center gap-3 px-2 py-2 rounded-xl ${collapsed ? 'justify-center' : ''}`}>
          <div className="w-8 h-8 rounded-full bg-accent/20 border border-accent/30
                          flex items-center justify-center text-accent text-xs font-semibold shrink-0">
            {userInitials}
          </div>
          {!collapsed && (
            <div className="flex-1 overflow-hidden">
              <p className="text-white text-sm font-medium truncate">{userName}</p>
              <p className="text-hint text-xs capitalize">{role}</p>
            </div>
          )}
          {!collapsed && (
            <button
              className="text-hint hover:text-stock-out transition-colors ml-auto"
              title="Sign out"
              onClick={handleLogout}
            >
              {Icons.logout}
            </button>
          )}
        </div>
      </div>
    </aside>
  )
}