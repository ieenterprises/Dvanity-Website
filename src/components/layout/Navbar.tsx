import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useContent } from "@/context/ContentContext";

interface NavbarProps {
  transparent?: boolean;
}

const Navbar = ({ transparent = false }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { content } = useContent();

  // Handle scroll effect for transparent navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    if (transparent) {
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [transparent]);

  const toggleMenu = () => setIsOpen(!isOpen);

  // Use navigation links from content context, or fallback to defaults
  const navLinks = content?.navbar?.links || [
    { id: "1", name: "Home", path: "/" },
    { id: "2", name: "Events", path: "events" },
    { id: "3", name: "Gallery", path: "gallery" },
    { id: "4", name: "About", path: "about" },
    { id: "5", name: "Contact", path: "contact" },
    { id: "6", name: "Bottle Service", path: "bottle-service" },
  ];

  // Get admin button text from content context
  const adminButtonText = content?.navbar?.adminButtonText || "Admin";

  const navbarClasses = cn("fixed w-full z-50 transition-all duration-300", {
    "bg-white/90 dark:bg-black/90 backdrop-blur-sm shadow-lg":
      !transparent || scrolled,
    "bg-transparent": transparent && !scrolled,
  });

  return (
    <nav className={navbarClasses}>
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-gold-500 bg-gradient-to-r from-amber-500 to-yellow-700 dark:from-amber-400 dark:to-yellow-600 bg-clip-text text-transparent">
              DVANITY
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={
                  link.path === "/" ? "/" : `#${link.path.replace("/", "")}`
                }
                className="text-gray-800 dark:text-white font-medium hover:text-amber-600 dark:hover:text-amber-500"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Admin Login Button (Desktop) */}
          <div className="hidden md:block">
            <Link to="/admin">
              <Button
                variant="outline"
                className="border-amber-600 dark:border-amber-400 text-amber-600 dark:text-amber-400 bg-amber-600/10 dark:bg-amber-400/10 hover:bg-amber-600/20 dark:hover:bg-amber-400/20"
              >
                <User className="mr-2 h-4 w-4" />
                {adminButtonText}
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-white focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden bg-white/95 dark:bg-black/95 absolute left-0 right-0 top-16 p-4 border-t border-amber-600/30 dark:border-amber-900/30 transition-colors duration-200">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={
                    link.path === "/" ? "/" : `#${link.path.replace("/", "")}`
                  }
                  className="text-gray-800 dark:text-white py-2 font-medium hover:text-amber-600 dark:hover:text-amber-500"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <Link
                to="/admin"
                className="text-amber-600 dark:text-amber-400 py-2 font-medium flex items-center hover:text-amber-700 dark:hover:text-amber-500"
                onClick={() => setIsOpen(false)}
              >
                <User className="mr-2 h-4 w-4" />
                {adminButtonText}
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
