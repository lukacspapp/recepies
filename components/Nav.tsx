'use client'

import { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  NavbarContent,
  NavbarItem,
  Link,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  DropdownSection,
} from "@nextui-org/react";
import { usePathname, useRouter } from "next/navigation";
import { Citrus, LogInIcon, LogOut, UserPlus2 } from "lucide-react";
import { useAuth } from "@/context/Auth";
import UserAvatar from "./UserAvatar";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import React from 'react';
import Logo from "./Logo";

const listTypes = [
  { name: 'Category', href: '/categories', color: 'bg-orange-400' },
  { name: 'Cusinies', href: '/cuisines', color: 'bg-lime-400' },
]


export default function Nav() {

  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClientComponentClient();

  const { user } = useAuth()

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  async function handleLogout() {
    const { error } = await supabase.auth.signOut();
    if (!error) router.push('/')
  }

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} className="sm:hidden" />
      <NavbarMenu>
        {listTypes.map((item) => (
          <NavbarMenuItem
            key={item.name}
            isActive={pathname === item.href}
          >
            <Link
              className={`text-sm w-[90px] mb-1 font-semibold px-4 py-2  text-gray-700 ${item.color} transform transition-transform hover:scale-105  dark:text-gray-200 rounded-md`}
              href={item.href}
            >
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
      <NavbarBrand>
        <Logo />
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {listTypes.map((item) => (
          <NavbarItem
            key={item.name}
            isActive={pathname === item.href}
          >
            <Link
              className={`text-sm w-[90px] m-1 font-semibold px-4 py-2  text-gray-700 ${item.color} transform transition-transform hover:scale-105  dark:text-gray-200 rounded-md`}
              href={item.href}
            >
              {item.name}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarContent as="div" justify="end">
        <Dropdown placement="bottom-end">
          <UserAvatar />
          {!user ? (
            <DropdownMenu className="text-center" aria-label="Profile Actions" variant="flat">
              <DropdownSection showDivider>
                <DropdownItem key="profile">
                  <Link className='p-1' href="/login">
                    <LogInIcon className="mr-2 h-6 w-6" />
                    <p className="font-semibold">Login</p>
                  </Link>
                </DropdownItem>
              </DropdownSection>
              <DropdownSection className="m-0">
                <DropdownItem key="profile">
                  <Link className="p-1" href="/register">
                    <UserPlus2 className="mr-2 h-6 w-6" />
                    <p className="font-semibold">Sign Up</p>
                  </Link>
                </DropdownItem>
              </DropdownSection>
            </DropdownMenu>
          ) : (
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">{user.email}</p>
              </DropdownItem>
              <DropdownItem key="help_and_feedback" color="warning" className="py-2">
                <div className="flex">
                  <Citrus className="mr-2 h-6 w-6" />
                  <Link href="/dashboard">
                    Dashboard
                  </Link>
                </div>
              </DropdownItem>
              <DropdownItem key="logout" color="danger" className="py-2">
                <div className="flex">
                  <LogOut className="mr-2 h-6 w-6" />
                  <Link onClick={() => handleLogout()}>
                    Logout
                  </Link>
                </div>
              </DropdownItem>
            </DropdownMenu>
          )}
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
}
