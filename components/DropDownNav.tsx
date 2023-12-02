'use client'

import { useAuth } from '@/context/Auth'
import { DropdownItem, DropdownMenu } from '@nextui-org/react'
import Link from 'next/link'
import React from 'react'

export default function DropDownNav() {

  const { user } = useAuth()

  return (
    <DropdownMenu className={`${!user ? 'text-center' : null}`} aria-label="Profile Actions" variant="flat">
      {!user ? (
        <DropdownItem key="profile" className="h-10 gap-2">
          <Link href="/login">
          <p className="font-semibold">Login or Sign up</p>
          </Link>
        </DropdownItem>
      ) : (
          <DropdownItem key="profile" className="h-14 gap-2">
            <p className="font-semibold">Signed in as</p>
            <p className="font-semibold">{user.email}</p>
          </DropdownItem>
      )}
    </DropdownMenu>
  )
}