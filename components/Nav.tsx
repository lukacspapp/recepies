import { Button } from "./ui/button";


export default function Nav() {
  return (
    <header>
      <nav className="w-full z-10 py-2 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto flex items-center justify-between">
          <div>
            <Button className="text-sm md:text-base" variant="outline">
              Home
            </Button>
          </div>
          <div className="flex space-x-4">
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
        </div>
      </nav>
    </header>
  )
}