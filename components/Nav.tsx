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

export default function Nav() {

  const session = useSessionStore((state: any) => state.session)
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);


  const menuItems = [
    "Categories",
    "Cuisines"

  ];

  const icon = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user-circle-2"><path d="M18 20a6 6 0 0 0-12 0"/><circle cx="12" cy="10" r="4"/><circle cx="12" cy="12" r="10"/></svg>

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
              name=""
              size="sm"
              icon={!session ? icon : null} // Profile image comes here
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
