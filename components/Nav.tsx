'use client'

import Link from "next/link";
import { Button } from "./ui/button";
import { useState } from "react";


export default function Nav() {

  const [isOpen, setIsOpen] = useState(false)

  return (
    <header>
      <nav className="bg-white dark:bg-gray-800 shadow w-full z-10 py-2 px-2 md:px-4 lg:px-6">
        <div className="container mx-auto flex items-center justify-between">
          <div>
          <Link href="/" className = "text-xl font-bold text-gray-800 dark:text-white md:text-2xl hover:text-gray-700 dark:hover:text-gray-300">
            🥧
          </Link>
          </div>
          <div
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Button className="text-xs md:text-sm lg:text-base" variant="outline">
              <svg
                className=" h-6 w-6"
                fill="none"
                height="24"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line x1="4" x2="20" y1="12" y2="12" />
                <line x1="4" x2="20" y1="6" y2="6" />
                <line x1="4" x2="20" y1="18" y2="18" />
              </svg>
            </Button>
          </div>
          <div className="hidden md:flex space-x-2 md:space-x-4">
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
        </div>
      </nav>
    </header>
  )
}