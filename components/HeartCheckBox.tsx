'use client';

import { useAuth } from '@/context/Auth';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import React, { useState } from 'react';

const HeartCheckbox = () => {

  const supabase = createClientComponentClient();
  const { user } = useAuth();
  const [isChecked, setIsChecked] = useState(false);

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  async function addFavorite() {

    const { data, error } = await supabase
      .from('liked_meals')
      .insert([
        { some_column: 'someValue', other_column: 'otherValue' },
      ])
      .select()

  }

  return (
    <label className="flex items-center cursor-pointer m-1">
      <input
        type="checkbox"
        className="hidden"
        checked={isChecked}
        onChange={toggleCheckbox}
      />
      <div className="relative p-2 w-6 h-5">
        <svg
          viewBox="0 0 24 24"
          fill={isChecked ? 'red' : 'none'}
          stroke={isChecked ? 'red' : 'currentColor'}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`absolute top-0 left-0 w-full h-full transition-all duration-300 ${isChecked ? 'opacity-100' : 'opacity-0'
            }`}
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
          className={`absolute top-0 left-0 w-full h-full transition-all duration-300 ${isChecked ? 'opacity-0' : 'opacity-100'
            }`}
        >
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C15.09 3.81 16.76 3 18.5 3 21.58 3 24 5.42 24 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      </div>
    </label>
  );
};

export default HeartCheckbox;
