
import Carousel from '@/components/Carousel'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import React from 'react'
import { cookies } from 'next/headers';
import { doRequest } from '@/lib/DoRequest';

export default async function page() {

  const supabase = createServerComponentClient({ cookies })


  let { data: likedMeals, error } = await supabase
  .from('liked_meals')
  .select('*')


  const {meals} =  await doRequest('GET', `${process.env.RECEPIES_API_10}`)

  return (
    <div className=''>
      {/* <Carousel>
      {Array.from({ length: 10 }).map((_, index) => (
          <li key={index} className="flex-0 w-44 h-44 bg-white m-4">SANDOR</li>
        ))}
      </Carousel> */}
    </div>
  )
}