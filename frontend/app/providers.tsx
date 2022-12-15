'use client'

import { SessionProvider } from 'next-auth/react'
import { ReactNode } from 'react'
import { AnalyticsWrapper } from './components/analytics'

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <SessionProvider>
      {children}
      <AnalyticsWrapper />
    </SessionProvider>
  )
}
export default Providers
