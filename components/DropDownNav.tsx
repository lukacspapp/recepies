'use client'

import { DropdownItem, DropdownMenu } from '@nextui-org/react'
import Link from 'next/link'
import React from 'react'

export default function DropDownNav({ session }: { session: any }) {

  const user = session?.session

  return (
    <DropdownMenu className={`${!user ? 'text-center' : ''}`} aria-label="Profile Actions" variant="flat">
      {!user ? (
        <DropdownItem key="profile" className="h-10 gap-2">
          <Link href="/login">
          <p className="font-semibold">Login or Sign up</p>
          </Link>
        </DropdownItem>
      ) : (
        <>
          <DropdownItem key="profile" className="h-14 gap-2">
            <p className="font-semibold">Signed in as</p>
            <p className="font-semibold">zoey@example.com</p>
          </DropdownItem><DropdownItem key="settings">My Settings</DropdownItem><DropdownItem key="team_settings">Team Settings</DropdownItem><DropdownItem key="analytics">Analytics</DropdownItem><DropdownItem key="system">System</DropdownItem><DropdownItem key="configurations">Configurations</DropdownItem><DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem><DropdownItem key="logout" color="danger">
            Log Out
          </DropdownItem>
        </>
      )}
    </DropdownMenu>
  )
}