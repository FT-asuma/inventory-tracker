import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
// import { getToken } from 'next-auth/jwt'

export async function middleware(req: NextRequest) {
  // TODO: uncomment when NextAuth is ready
  // const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
  const token = null
  const { pathname } = req.nextUrl

  // ── Public routes — always allow ──────────────────────
  if (pathname.startsWith('/login')) {
    if (token) {
      return NextResponse.redirect(
        new URL((token as any).role === 'admin' ? '/dashboard' : '/shelf', req.url)
      )
    }
    return NextResponse.next()
  }

  // ── Auth disabled during UI development ───────────────
  // TODO: remove this line when NextAuth is ready
  return NextResponse.next()

  // ── Not logged in — send to login ─────────────────────
  // if (!token) {
  //   return NextResponse.redirect(new URL('/login', req.url))
  // }

  // ── Admin routes ──────────────────────────────────────
  // const adminRoutes = ['/dashboard', '/products', '/discounts', '/sellers', '/reports']
  // const isAdminRoute = adminRoutes.some(r => pathname.startsWith(r))
  // if (isAdminRoute && (token as any).role !== 'admin') {
  //   return NextResponse.redirect(new URL('/shelf', req.url))
  // }

  // ── Seller routes ─────────────────────────────────────
  // const sellerRoutes = ['/shelf', '/summary']
  // const isSellerRoute = sellerRoutes.some(r => pathname.startsWith(r))
  // if (isSellerRoute && (token as any).role !== 'seller') {
  //   return NextResponse.redirect(new URL('/dashboard', req.url))
  // }
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|public|api/auth).*)',
  ],
}