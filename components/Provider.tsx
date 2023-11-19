'use client'

import {NextUIProvider} from '@nextui-org/react'
import Nav from './Nav'
import { useSessionStore } from '@/store/sessionStore'
import { useEffect } from 'react'

export function Providers({children, session}: { children: React.ReactNode, session: any }) {

  const setSession = useSessionStore((state: any) => state.setSession)

  useEffect(() => {
    setSession(session)
  }, [session])

  return (
    <NextUIProvider>
      <Nav />
      {children}
    </NextUIProvider>
  )
}