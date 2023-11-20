import AnimatedDescription from '@/components/AnimatedDescription'
import { DashboardNav } from '@/components/DashboardNav'
import React from 'react'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="container mt-11">
      <AnimatedDescription title={"Dashboard"} description={"Welcome to your dashboard"} />
      <div className='flex items-stretch'>
        <aside className="hidden w-[200px] flex-col md:flex">
          <DashboardNav />
        </aside>
        <h1>Hello</h1>
      </div>
    </main>

  )
}