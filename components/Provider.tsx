'use client'

import { NextUIProvider } from '@nextui-org/react'
import Nav from './Nav'
import { usePathname } from 'next/navigation'
import { AuthProvider } from '@/context/Auth'

export function Providers({children}: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <NextUIProvider>
        {usePathname() === '/login' || '/register' ? <Nav /> : null}
        {children}
      </NextUIProvider>
    </AuthProvider>
  )
}