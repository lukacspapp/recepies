import { Button } from "./ui/button";


export default function Nav() {
  return (
    <header>
      <nav className="bg-white dark:bg-gray-800 shadow w-full z-10 py-2 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto flex items-center justify-evenly">
            <Button className="text-sm md:text-base" variant="outline">
              About
            </Button>
            <Button className="text-sm md:text-base" variant="outline">
              Services
            </Button>
            <Button className="text-sm md:text-base" variant="outline">
              Contact
            </Button>
        </div>
      </nav>
    </header>
  )
}