'use client'

import { NextUIProvider } from '@nextui-org/react'
import Nav from './Nav'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/context/Auth'

export function Providers({children}: { children: React.ReactNode }) {
  const { user , session} = useAuth()
  return (
    <NextUIProvider>
      {usePathname() === '/login' || '/register' ? <Nav /> : null}
      {children}
    </NextUIProvider>
  )
}