'use client'

import { NextUIProvider } from '@nextui-org/react'
import Nav from './Nav'
import { usePathname } from 'next/navigation'
import { AuthProvider, useAuth } from '@/context/Auth'
import { useLikedMealStore } from '@/store/likedMealsStore'
import { useEffect } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export function Providers({ children, likedMealIds }: { children: React.ReactNode, likedMealIds: string[] }) {

  const supabase = createClientComponentClient()
  const pathname = usePathname()
  const { user } = useAuth()
  useLikedMealStore.setState({ likedMealIds: likedMealIds })

  async function getLikedMeals() {
    const { data: likedMeals } = await supabase
      .from('liked_meals')
      .select('meal_id')

    if (likedMeals) {
      const likedMealIds = likedMeals.map((meal: any) => meal.meal_id)
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  const nav = (pathname !== '/login' && pathname !== '/register') ? <Nav /> : null;

  return (
    <AuthProvider>
      <NextUIProvider>
        {nav}
        {children}
      </NextUIProvider>
    </AuthProvider>
  )
}