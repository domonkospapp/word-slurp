'use client'

import { SessionProvider } from 'next-auth/react'
import { ReactNode } from 'react'
import { AnalyticsWrapper } from './components/common/Analytics'

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <SessionProvider>
      {children}
      <AnalyticsWrapper />
    </SessionProvider>
  )
}
export default Providers
