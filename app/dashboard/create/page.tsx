import AnimatedDescription from '@/components/AnimatedDescription'
import CreateMealForm from '@/components/CreateMealForm'
import React from 'react'

type Props = {}

export default function page({ }: Props) {
  return (
    <main className="w-full">
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <AnimatedDescription
            title={'Create a New Recipe'}
            description={'Fill the form below to create a new recipe'}
          />
          <CreateMealForm />
        </div>
      </section>
    </main >
  )
}
