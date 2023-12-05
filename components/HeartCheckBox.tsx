'use client';

import { useAuth } from '@/context/Auth';
import { useLikedMealStore } from '@/store/likedMealsStore';
import { Spinner } from '@nextui-org/react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import React, { useEffect, useState } from 'react';
import uuid from 'react-uuid';

const HeartCheckbox = ({ mealId }: { mealId: string }) => {

  const supabase = createClientComponentClient();
  const { user } = useAuth();
  const liked = ((useLikedMealStore.getState() as { likedMealIds: string[] }).likedMealIds);
  console.log('====================================');
  console.log(liked);
  console.log('====================================');
  const [isChecked, setIsChecked] = useState(liked.includes(mealId));
  const [loading, setLoading] = useState(false);

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  async function addFavorite() {
    setLoading(true);
    const { data, error } = await supabase
      .from('liked_meals')
      .insert([
        {
          id: uuid(),
          created_at: new Date(),
          user_id: user?.id,
          meal_id: mealId
        }
      ])
      .select()

    useLikedMealStore.setState({ likedMealIds: [...liked, mealId] })

    setLoading(false);
  }

  async function removeFavorite() {
    setLoading(true);
    const { error } = await supabase
      .from('liked_meals')
      .delete()
      .eq('meal_id', mealId)

    useLikedMealStore.setState({ likedMealIds: liked.filter((id: string) => id !== mealId) })

    setLoading(false);
  }

  return (
    <label className="flex items-center cursor-pointer m-1">
      {!loading ?
        <>
          <input
            onClick={isChecked ? removeFavorite : addFavorite}
            type="checkbox"
            className="hidden"
            checked={isChecked}
            onChange={toggleCheckbox} /><div className="relative p-2 w-6 h-5">
            <svg
              viewBox="0 0 24 24"
              fill={isChecked ? 'red' : 'none'}
              stroke={isChecked ? 'red' : 'currentColor'}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`absolute top-0 left-0 w-full h-full transition-all duration-300 ${isChecked ? 'opacity-100' : 'opacity-0'}`}
            >
              <path d="M12 21.35l-1.45-1.32C5.5 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C15.09 3.81 16.76 3 18.5 3 21.58 3 24 5.42 24 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`absolute top-0 left-0 w-full h-full transition-all duration-300 ${isChecked ? 'opacity-0' : 'opacity-100'}`}
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C15.09 3.81 16.76 3 18.5 3 21.58 3 24 5.42 24 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>
        </>
        :
        <Spinner color='danger' size='sm' />
      }
    </label>
  );
};

export default HeartCheckbox;
