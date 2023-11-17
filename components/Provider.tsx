'use client'

import {NextUIProvider} from '@nextui-org/react'
import Nav from './Nav'

export function Providers({children}: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <Nav />
      {children}
    </NextUIProvider>
  )
}