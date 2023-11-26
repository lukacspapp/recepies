'use client'

import React from "react";
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
  DropdownTrigger,
  DropdownMenu,
  Avatar,
  DropdownItem,
} from "@nextui-org/react";
import { usePathname } from "next/navigation";
import DropDownNav from "./DropDownNav";
import { useSessionStore } from "@/store/sessionStore";
import { UserCircle2 } from "lucide-react";

export default function Nav() {

  const session = useSessionStore((state: any) => state.session)
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
console.log('====================================');
console.log(session);
console.log('====================================');
  const avatarImage = session && session.session && session.session.user.user_metadata.avatar_url




  const menuItems = [
    "Categories",
    "Cuisines"
  ];

  const pathname = usePathname();

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
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color='secondary'
              name="profile"
              size="sm"
              icon={avatarImage}
              fallback={<UserCircle2/>}
            />
          </DropdownTrigger>
          <DropDownNav session={session} />
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
