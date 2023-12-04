'use client'

import { NextUIProvider } from '@nextui-org/react'
import Nav from './Nav'
import { usePathname } from 'next/navigation'
import { AuthProvider } from '@/context/Auth'
import { useLikedMealStore } from '@/store/likedMealsStore'

export function Providers({children, likedMealIds}: { children: React.ReactNode, likedMealIds: string[] }) {

  useLikedMealStore.setState({ likedMealIds: likedMealIds })

  return (
    <AuthProvider>
      <NextUIProvider>
        {usePathname() === '/login' || '/register' ? <Nav /> : null}
        {children}
      </NextUIProvider>
    </AuthProvider>
  )
}