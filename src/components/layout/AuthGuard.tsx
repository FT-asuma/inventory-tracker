'use client'

export default function AuthGuard({ children, checking }: {
  children: React.ReactNode
  checking: boolean
}) {
  if (checking) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-sidebar">
        <div className="flex flex-col items-center gap-4">
          {/* Logo */}
          <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
              <rect x="1" y="1" width="6" height="6" rx="1.5" fill="#0F1117"/>
              <rect x="9" y="1" width="6" height="6" rx="1.5" fill="#0F1117"/>
              <rect x="1" y="9" width="6" height="6" rx="1.5" fill="#0F1117"/>
              <rect x="9" y="9" width="6" height="6" rx="1.5" fill="#0F1117" opacity="0.4"/>
            </svg>
          </div>
          {/* Spinner */}
          <div className="flex items-center gap-1.5">
            <span
              className="w-2 h-2 rounded-full bg-accent animate-bounce"
              style={{ animationDelay: '0ms' }}
            />
            <span
              className="w-2 h-2 rounded-full bg-accent animate-bounce"
              style={{ animationDelay: '150ms' }}
            />
            <span
              className="w-2 h-2 rounded-full bg-accent animate-bounce"
              style={{ animationDelay: '300ms' }}
            />
          </div>
        </div>
      </div>
    )
  }

  return <>{children}</>
}