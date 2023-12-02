import { Avatar, DropdownTrigger } from '@nextui-org/react'
import { UserCircle2 } from 'lucide-react'
import React from 'react'

type UserAvatarProps = {
  user: any
}

export default function UserAvatar({ user }: UserAvatarProps) {

  return (
    <DropdownTrigger>
      <Avatar
        isBordered
        as="button"
        className={`transition-transform ${!user ? '' : 'text-md text-white font-extrabold transform hover:scale-110'}`}
        color='secondary'
        name={!user ? 'profile' : user.email?.split(',').map((l: string) => l[0] + l[1]).join('').toUpperCase()}
        size='md'
        icon={!user ? <UserCircle2 /> : null}
        fallback={!user ? <UserCircle2 /> : null}
        classNames={{
          base: user ? 'bg-gradient-to-br from-[#8B7DFF] to-[#C7A3FF]' : null
        }}
      />
    </DropdownTrigger>
  )
}