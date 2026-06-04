'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export type Role = 'admin' | 'seller'

export function getStoredRole(): Role | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('role') as Role | null
}

export function setStoredRole(role: Role) {
  localStorage.setItem('role', role)
}

export function clearStoredRole() {
  localStorage.removeItem('role')
}

// Returns true while checking, false when done
export function useRequireRole(required: Role) {
  const router = useRouter()
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    const role = getStoredRole()

    if (!role) {
      router.replace('/login')
      return
    }

    if (role !== required) {
      router.replace(role === 'admin' ? '/dashboard' : '/shelf')
      return
    }

    // Role matches — allow render
    setChecking(false)
  }, [required, router])

  return checking
}