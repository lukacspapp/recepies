import AnimatedDescription from '@/components/AnimatedDescription'
import { DashboardNav } from '@/components/DashboardNav'
import React from 'react'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="container mt-11">
      <AnimatedDescription title={"Dashboard"} description={"Welcome to your dashboard"} />
      <div className='flex items-stretch'>
        <aside className="w-[200px] min-w-[200px] flex-shrink-0 hidden md:flex">
          <DashboardNav />
        </aside>
        {children}
      </div>
    </main>

  )
}