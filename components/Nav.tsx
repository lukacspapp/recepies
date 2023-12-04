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


export default function Nav() {

  const menuItems = ["Categories", "Cuisines"];
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
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Link color="foreground" href="/">
            <h1 className="font-bold text-xl">Rece🥧s</h1>
          </Link>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem
          isActive={pathname === "/categories"}
        >
          <Link
            className="text-green-500"
            href="/categories"
          >
            Category
          </Link>
        </NavbarItem>
        <NavbarItem
          isActive={pathname === "/cuisines"}
        >
          <Link
            className="text-blue-500"
            href="/cuisines"
            aria-current="page"
          >
            Cusinies
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <Dropdown placement="bottom-end">
          <UserAvatar user={user} />
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
      <NavbarMenu
        className="pt-5"
      >
        {menuItems.map((item, i) => (
          <NavbarMenuItem
            key={`${item}-${i}`}
            isActive={pathname === `/${item.toLowerCase()}`}
          >
            <Link
              className={`w-full ${i === 0 ? 'text-green-500' : 'text-blue-500'}`}
              href={`/${item.toLowerCase()}`}
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
