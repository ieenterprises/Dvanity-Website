import React from "react";
import {
  Facebook,
  Instagram,
  Twitter,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface FooterProps {
  logo?: string;
  socialLinks?: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
  };
  contactInfo?: {
    email?: string;
    phone?: string;
    address?: string;
  };
}

const Footer = ({
  logo = "/logo.png",
  socialLinks = {
    facebook: "https://facebook.com/dvanity",
    instagram: "https://instagram.com/dvanity",
    twitter: "https://twitter.com/dvanity",
  },
  contactInfo = {
    email: "info@dvanity.com",
    phone: "+1 (555) 123-4567",
    address: "123 Nightlife Ave, Los Angeles, CA 90001",
  },
}: FooterProps) => {
  return (
    <footer className="bg-black text-white border-t border-gold/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and About */}
          <div className="col-span-1">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-black border border-amber-500 flex items-center justify-center rounded-full mr-3">
                <span className="text-amber-500 font-bold text-xl">D</span>
              </div>
              <h3 className="text-2xl font-bold text-amber-500">DVANITY</h3>
            </div>
            <p className="text-gray-400 mb-4">
              Experience the ultimate nightlife at Dvanity. Luxury, excitement,
              and unforgettable memories await you.
            </p>
            <div className="flex space-x-4">
              <a
                href={socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-black border border-amber-500 flex items-center justify-center"
              >
                <Facebook size={18} />
              </a>
              <a
                href={socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-black border border-amber-500 flex items-center justify-center"
              >
                <Instagram size={18} />
              </a>
              <a
                href={socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-black border border-amber-500 flex items-center justify-center"
              >
                <Twitter size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h4 className="text-xl font-semibold mb-4 text-amber-500">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400">
                  Home
                </a>
              </li>
              <li>
                <a href="#events" className="text-gray-400">
                  Events
                </a>
              </li>
              <li>
                <a href="#gallery" className="text-gray-400">
                  Gallery
                </a>
              </li>
              <li>
                <a href="#about" className="text-gray-400">
                  About
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-400">
                  Contact
                </a>
              </li>
              <li>
                <a href="#bottle-service" className="text-gray-400">
                  Bottle Service
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-span-1">
            <h4 className="text-xl font-semibold mb-4 text-amber-500">
              Contact Us
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin
                  className="mr-2 text-amber-500 flex-shrink-0 mt-1"
                  size={18}
                />
                <span className="text-gray-400">{contactInfo.address}</span>
              </li>
              <li className="flex items-center">
                <Phone
                  className="mr-2 text-amber-500 flex-shrink-0"
                  size={18}
                />
                <a href={`tel:${contactInfo.phone}`} className="text-gray-400">
                  {contactInfo.phone}
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="mr-2 text-amber-500 flex-shrink-0" size={18} />
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="text-gray-400"
                >
                  {contactInfo.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-span-1">
            <h4 className="text-xl font-semibold mb-4 text-amber-500">
              Newsletter
            </h4>
            <p className="text-gray-400 mb-4">
              Subscribe to our newsletter for exclusive updates and offers.
            </p>
            <div className="flex flex-col space-y-3">
              <Input
                type="email"
                placeholder="Your email address"
                className="bg-gray-900 border-amber-500/30 focus-visible:ring-amber-500"
              />
              <Button className="bg-amber-500 text-black font-semibold">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-6 text-center">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Dvanity Night Club. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
