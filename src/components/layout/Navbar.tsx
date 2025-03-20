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

interface NavbarProps {
  transparent?: boolean;
}

const Navbar = ({ transparent = false }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Events", path: "events" },
    { name: "Gallery", path: "gallery" },
    { name: "About", path: "about" },
    { name: "Contact", path: "contact" },
    { name: "Bottle Service", path: "bottle-service" },
  ];

  const navbarClasses = cn("fixed w-full z-50 transition-all duration-300", {
    "bg-black/90 backdrop-blur-sm shadow-lg": !transparent || scrolled,
    "bg-transparent": transparent && !scrolled,
  });

  return (
    <nav className={navbarClasses}>
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-gold-500 bg-gradient-to-r from-amber-400 to-yellow-600 bg-clip-text text-transparent">
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
                className="text-white font-medium"
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
                className="border-amber-400 text-amber-400 bg-amber-400/10"
              >
                <User className="mr-2 h-4 w-4" />
                Admin
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
          <div className="md:hidden bg-black/95 absolute left-0 right-0 top-16 p-4 border-t border-amber-900/30">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={
                    link.path === "/" ? "/" : `#${link.path.replace("/", "")}`
                  }
                  className="text-white py-2 font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <Link
                to="/admin"
                className="text-amber-400 py-2 font-medium flex items-center"
                onClick={() => setIsOpen(false)}
              >
                <User className="mr-2 h-4 w-4" />
                Admin Login
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
