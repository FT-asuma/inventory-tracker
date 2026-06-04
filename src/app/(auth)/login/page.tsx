'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { setStoredRole, getStoredRole } from '@/hooks/useAuth'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // If already logged in, redirect away from login
  useEffect(() => {
    const role = getStoredRole()
    if (role === 'admin') router.replace('/dashboard')
    else if (role === 'seller') router.replace('/shelf')
  }, [router])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    await new Promise(r => setTimeout(r, 800))

    if (email === 'admin@test.com') {
      setStoredRole('admin')
      router.push('/dashboard')
    } else if (email === 'seller@test.com') {
      setStoredRole('seller')
      router.push('/shelf')
    } else {
      setError('Invalid email or password')
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-sidebar flex items-center justify-center p-4">

      {/* Background grid pattern */}
      <div
        className="fixed inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(#fff 1px, transparent 1px),
                            linear-gradient(90deg, #fff 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Glow blob */}
      <div
        className="fixed top-[-100px] left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full opacity-10 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, #F5A623 0%, transparent 70%)' }}
      />

      {/* Card */}
      <div className="relative w-full max-w-[420px] bg-surface border border-elevated rounded-2xl shadow-popup p-8">

        {/* Logo / Brand */}
        <div className="mb-8">
          <div className="flex items-center gap-2.5 mb-6">
            <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <rect x="1" y="1" width="6" height="6" rx="1.5" fill="#0F1117"/>
                <rect x="9" y="1" width="6" height="6" rx="1.5" fill="#0F1117"/>
                <rect x="1" y="9" width="6" height="6" rx="1.5" fill="#0F1117"/>
                <rect x="9" y="9" width="6" height="6" rx="1.5" fill="#0F1117" opacity="0.4"/>
              </svg>
            </div>
            <span className="text-white font-semibold text-base tracking-wide">
              Inventra
            </span>
          </div>
          <h1 className="text-white text-2xl font-bold leading-tight">
            Welcome back
          </h1>
          <p className="text-muted text-sm mt-1">
            Sign in to your store account
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Email */}
          <div>
            <label className="block text-sm text-muted font-medium mb-1.5">
              Email
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-hint">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2"/>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                </svg>
              </span>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@store.com"
                required
                className="input pl-10"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-sm text-muted font-medium">
                Password
              </label>
              <button
                type="button"
                className="text-xs text-accent hover:text-accent-hover transition-colors"
              >
                Forgot password?
              </button>
            </div>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-hint">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
              </span>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="input pl-10 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-hint hover:text-muted transition-colors"
              >
                {showPassword ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/>
                    <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/>
                    <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/>
                    <line x1="2" y1="2" x2="22" y2="22"/>
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="flex items-center gap-2 bg-stock-out/10 border border-stock-out/20 rounded-xl px-4 py-3">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              <span className="text-stock-out text-sm">{error}</span>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full flex items-center justify-center gap-2 mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
                </svg>
                Signing in...
              </>
            ) : (
              'Sign in'
            )}
          </button>
        </form>

        {/* Footer note */}
        <p className="text-center text-hint text-xs mt-6">
          Don't have an account?{' '}
          <span className="text-accent cursor-pointer hover:text-accent-hover transition-colors">
            Contact your administrator
          </span>
        </p>
      </div>
    </div>
  )
}