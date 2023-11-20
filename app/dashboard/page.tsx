import AnimatedDescription from '@/components/AnimatedDescription'
import { DashboardNav } from '@/components/DashboardNav'
import React from 'react'

export default function page() {
  return (
    <main className="w-full">
      <section className="w-full container py-12 md:py-24 lg:py-32">
        <AnimatedDescription title={"Dashboard"} description={"Welcome to your dashboard"}/>
      </section>
    </main>

  )
}