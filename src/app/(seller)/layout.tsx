"use client";

import { useRequireRole } from "@/hooks/useAuth";
import Sidebar from "@/components/layout/Sidebar";
import AuthGuard from "@/components/layout/AuthGuard";
import Header from "@/components/layout/Header";
export default function SellerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const checking = useRequireRole("seller");
  const role = "user";
  return (
    <AuthGuard checking={checking}>
      <div className="flex h-screen overflow-hidden">
        <Sidebar
          role="seller"
          companyName="My Store"
          userName="Seller"
          userInitials="SL"
        />
        {/* Right side: header + scrollable content */}
        <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
          <Header props={{ role }} />
          <main className="flex-1 overflow-y-auto bg-white">{children}</main>
        </div>
      </div>
    </AuthGuard>
  );
}
