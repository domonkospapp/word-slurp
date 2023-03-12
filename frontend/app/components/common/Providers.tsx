'use client'

import { SessionProvider } from 'next-auth/react'
import { ReactNode } from 'react'
import { AnalyticsWrapper } from './Analytics'

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <SessionProvider>
      {children}
      <AnalyticsWrapper />
    </SessionProvider>
  )
}
export default Providers
