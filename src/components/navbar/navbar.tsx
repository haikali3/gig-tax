import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-react'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <nav className="bg-white border-b border-gray-200 fixed w-full z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center">
                <div className="h-8 w-10 rounded-md flex items-center justify-center mr-2">
                  <span className="text-white font-bold text-lg bg-purple-400 rounded-md py-1 px-3">
                    F
                  </span>
                </div>
                <span className="text-xl font-bold text-gray-800">FreeTax</span>
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                to="/dashboard"
                className="border-transparent text-gray-500 hover:border-brand-500 hover:text-brand-500 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Dashboard
              </Link>
              <Link
                to="/expenses"
                className="border-transparent text-gray-500 hover:border-brand-500 hover:text-brand-500 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Expenses
              </Link>
              <Link
                to="/reports"
                className="border-transparent text-gray-500 hover:border-brand-500 hover:text-brand-500 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Reports
              </Link>
            </div>
          </div>

          {/* <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <Button variant="outline" className="mr-2">
              Login
            </Button>
            <Button className="bg-brand-400 hover:bg-brand-500">Sign Up</Button>
          </div> */}

          <div className="-mr-2 flex items-center sm:hidden">
            <Button
              variant="ghost"
              onClick={toggleMenu}
              aria-label="Main menu"
              aria-expanded="false"
            >
              {isMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link
              to="/dashboard"
              className="text-gray-700 block pl-3 pr-4 py-2 text-base font-medium hover:bg-brand-50"
            >
              Dashboard
            </Link>
            <Link
              to="/expenses"
              className="text-gray-700 block pl-3 pr-4 py-2 text-base font-medium hover:bg-brand-50"
            >
              Expenses
            </Link>
            <Link
              to="/reports"
              className="text-gray-700 block pl-3 pr-4 py-2 text-base font-medium hover:bg-brand-50"
            >
              Reports
            </Link>
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="flex items-center px-4 space-x-2">
                <Button variant="outline" className="w-full">
                  Login
                </Button>
                <Button className="w-full bg-brand-400 hover:bg-brand-500">
                  Sign Up
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
