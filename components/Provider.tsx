'use client'

import { NextUIProvider } from '@nextui-org/react'
import Nav from './Nav'
import { usePathname } from 'next/navigation'
import { AuthProvider, useAuth } from '@/context/Auth'
import { useLikedMealStore } from '@/store/likedMealsStore'
import { useEffect } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import Footer from './Footer'
import { TooltipProvider } from '@radix-ui/react-tooltip'
import { fetcher } from '@/lib/services'

type ProvidersProps = {
  children: React.ReactNode
  likedMealIds: string[]
}

export function Providers({
  children,
  likedMealIds
}: ProvidersProps) {

  const pathname = usePathname()
  const { user } = useAuth()
  useLikedMealStore.setState({ likedMealIds: likedMealIds })

  async function getLikedMeals() {
    const { likedMeals } = await fetcher(
      'POST',
      '/api/liked-meals',
    )

    if (likedMeals && likedMeals.length > 0) {
      useLikedMealStore.setState({ likedMealIds: likedMealIds })
    }
  }

  useEffect(() => {
    if (user) {
      getLikedMeals()
    }
    if (!user) {
      useLikedMealStore.setState({ likedMealIds: [] })
    }
  }, [user])

  return (
    <AuthProvider>
      <NextUIProvider>
        {pathname !== '/login' && pathname !== '/register' && <Nav />}
        {children}
        <TooltipProvider>
          <Footer />
        </TooltipProvider>
      </NextUIProvider>
    </AuthProvider>
  )
}