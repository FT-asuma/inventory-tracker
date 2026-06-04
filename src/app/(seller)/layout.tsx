'use client'

import { useRequireRole } from '@/hooks/useAuth'
import Sidebar from '@/components/layout/Sidebar'
import AuthGuard from '@/components/layout/AuthGuard'

export default function SellerLayout({ children }: { children: React.ReactNode }) {
  const checking = useRequireRole('seller')

  return (
    <AuthGuard checking={checking}>
      <div className="flex h-screen overflow-hidden">
        <Sidebar
          role="seller"
          companyName="My Store"
          userName="Seller"
          userInitials="SL"
        />
        <main className="flex-1 overflow-y-auto bg-[#F4F6FA]">
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
    </AuthGuard>
  )
}