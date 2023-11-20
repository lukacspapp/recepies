import AnimatedDescription from '@/components/AnimatedDescription'
import { DashboardNav } from '@/components/DashboardNav'
import React from 'react'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container">
        <aside className="hidden w-[200px] flex-col md:flex">
          <DashboardNav  />
        </aside>
        {children}
      </div>

  )
}