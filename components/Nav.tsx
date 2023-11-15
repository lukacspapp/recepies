'use client'

import Link from "next/link";
import { Button } from "./ui/button";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { NavigationMenuDemo } from "./Navigation";


export default function Nav() {

  const [isOpen, setIsOpen] = useState(false)

  return (
    <header>
    <nav className="bg-white dark:bg-gray-800 shadow w-full z-10 py-2 px-2 md:px-4 lg:px-6">
      <div className="container mx-auto flex items-center justify-between">
        <div>
          <Link href="/" className="text-xl font-bold text-gray-800 dark:text-white md:text-2xl hover:text-gray-700 dark:hover:text-gray-300">
            🥧
          </Link>
        </div>
        <div className="md:hidden">
          {/* Burger icon and dropdown menu for mobile */}
          <DropdownMenu>
            <DropdownMenuTrigger>
              <svg
                className="h-6 w-6 cursor-pointer"
                fill="none"
                height="24"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
                onClick={() => setIsOpen(!isOpen)}
              >
                <line x1="4" x2="20" y1="12" y2="12" />
                <line x1="4" x2="20" y1="6" y2="6" />
                <line x1="4" x2="20" y1="18" y2="18" />
              </svg>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Cuisines</DropdownMenuItem>
              <DropdownMenuItem>Favorites</DropdownMenuItem>
              <DropdownMenuItem>Vegan</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="hidden md:flex md:space-x-4">
        <NavigationMenuDemo />
        </div>
      </div>
    </nav>
    {isOpen && (
      <div className="md:flex md:space-x-4">
        <Button className="text-xs md:text-sm lg:text-base" variant="outline">
          About
        </Button>
        <Button className="text-xs md:text-sm lg:text-base" variant="outline">
          Services
        </Button>
        <Button className="text-xs md:text-sm lg:text-base" variant="outline">
          Contact
        </Button>
      </div>
    )}
  </header>
  )
}