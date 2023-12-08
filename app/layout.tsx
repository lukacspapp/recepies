import type { Metadata } from 'next'
import { Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/Provider'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { AuthProvider } from '@/context/Auth';
import { DatabaseMealID } from '@/lib/types'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL("https://pite.lukacsjpapp.com/"),
  title: {
    default: "Pite",
    template: "%s | Recipes from Around the World",
  },
  description:
    "Delicious Recipes Hub is your go-to destination for discovering and searching a diverse range of recipes. Find inspiration for your next culinary creation as you search, cook, and share delightful meals from around the world. Elevate your cooking experience and satisfy your taste buds with our extensive collection of recipes. Start your flavorful journey today!",
  keywords: [
    'pite',
    "recipes",
    "cooking",
    "food",
    "culinary",
    "cooking ideas",
    "meal ideas",
    "gourmet",
    "homemade",
    "recipe search",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://pite.lukacsjpapp.com/",
    title: "Pite",
    description: "Delicious Recipes Hub is your go-to destination for discovering and searching a diverse range of recipes. Find inspiration for your next culinary creation as you search, cook, and share delightful meals from around the world. Elevate your cooking experience and satisfy your taste buds with our extensive collection of recipes. Start your flavorful journey today!",
    siteName: "Pite",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/android-chrome-192x192.png",
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#ffffff",
}


export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  let likedMealIds: string[] = []

  const supabase = createServerComponentClient({ cookies })

  const { data } = await supabase.auth.getUser()

  if (data && data.user) {
    const { data: likedMeals } = await supabase
      .from('liked_meals')
      .select('meal_id');

    if (likedMeals) likedMealIds = likedMeals.map((meal: DatabaseMealID) => meal.meal_id)
  }

  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <AuthProvider>
          <Providers likedMealIds={likedMealIds}>
            {children}
          </Providers>
        </AuthProvider>
      </body>
    </html>
  )
}