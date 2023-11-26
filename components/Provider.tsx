'use client'

import { NextUIProvider } from '@nextui-org/react'
import Nav from './Nav'
import { useSessionStore } from '@/store/sessionStore'
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { useLikedMealStore } from '@/store/likedMealsStore'

export function Providers({children, session, likedMeals}: { children: React.ReactNode, session: any, likedMeals: any }) {

  const setSession = useSessionStore((state: any) => state.setSession)
  const setLikedMeals = useLikedMealStore((state: any) => state.setLikedMeals)
  const pathName = usePathname()

  useEffect(() => {
    setLikedMeals(likedMeals)
    setSession(session)
  }, [])

  const isAuthPage = pathName === '/login' || pathName === '/register'

  return (
    <NextUIProvider>
      {!isAuthPage && <Nav />}
      {children}
    </NextUIProvider>
  )
}