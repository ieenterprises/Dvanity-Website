import React from "react";
import {
  Facebook,
  Instagram,
  Twitter,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Youtube,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useTheme } from "@/context/ThemeContext";
import { useContent } from "@/context/ContentContext";

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
  const { theme } = useTheme();
  const { content } = useContent();

  // Get footer content from context
  const footerContent = content?.footer;
  const footerSocialLinks = footerContent?.socialLinks || [];
  const quickLinks = footerContent?.quickLinks || [];
  const newsletterEnabled = footerContent?.newsletterEnabled !== false;
  const copyrightText =
    footerContent?.copyrightText ||
    `&copy; ${new Date().getFullYear()} D'Vanity Premium Club. All rights reserved, Powered by ieEnterprises`;

  return (
    <footer
      className={cn(
        "border-t border-amber-500/30",
        theme === "dark" ? "bg-black text-white" : "bg-white text-gray-800",
      )}
    >
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and About */}
          <div className="col-span-1">
            <div className="flex items-center mb-4">
              {footerContent?.logo ? (
                <img
                  src={footerContent.logo}
                  alt="Dvanity"
                  className="h-12 w-auto object-contain mr-3"
                />
              ) : (
                <>
                  <img
                    src="/logo.ico"
                    alt="D'Vanity"
                    className="h-12 w-auto object-contain mr-3"
                  />
                  <h3 className="text-2xl font-bold text-amber-500">
                    D'VANITY
                  </h3>
                </>
              )}
            </div>
            <p
              className={cn(
                "mb-4",
                theme === "dark" ? "text-gray-400" : "text-gray-600",
              )}
            >
              Experience the ultimate nightlife at D'Vanity. Luxury, excitement,
              and unforgettable memories await you.
            </p>
            <div className="flex space-x-4">
              {footerSocialLinks.length > 0 ? (
                footerSocialLinks.map((link) => (
                  <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "w-10 h-10 rounded-full border border-amber-500 flex items-center justify-center",
                      theme === "dark" ? "bg-black" : "bg-amber-50",
                    )}
                  >
                    {link.platform.toLowerCase() === "facebook" && (
                      <Facebook size={18} />
                    )}
                    {link.platform.toLowerCase() === "instagram" && (
                      <Instagram size={18} />
                    )}
                    {link.platform.toLowerCase() === "twitter" && (
                      <Twitter size={18} />
                    )}
                    {link.platform.toLowerCase() === "linkedin" && (
                      <Linkedin size={18} />
                    )}
                    {link.platform.toLowerCase() === "youtube" && (
                      <Youtube size={18} />
                    )}
                    {![
                      "facebook",
                      "instagram",
                      "twitter",
                      "linkedin",
                      "youtube",
                    ].includes(link.platform.toLowerCase()) && (
                      <ExternalLink size={18} />
                    )}
                  </a>
                ))
              ) : (
                <>
                  <a
                    href={socialLinks.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "w-10 h-10 rounded-full border border-amber-500 flex items-center justify-center",
                      theme === "dark" ? "bg-black" : "bg-amber-50",
                    )}
                  >
                    <Facebook size={18} />
                  </a>
                  <a
                    href={socialLinks.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "w-10 h-10 rounded-full border border-amber-500 flex items-center justify-center",
                      theme === "dark" ? "bg-black" : "bg-amber-50",
                    )}
                  >
                    <Instagram size={18} />
                  </a>
                  <a
                    href={socialLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "w-10 h-10 rounded-full border border-amber-500 flex items-center justify-center",
                      theme === "dark" ? "bg-black" : "bg-amber-50",
                    )}
                  >
                    <Twitter size={18} />
                  </a>
                </>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h4 className="text-xl font-semibold mb-4 text-amber-500">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {quickLinks.length > 0 ? (
                quickLinks.map((link) => (
                  <li key={link.id}>
                    <a
                      href={link.path}
                      className={
                        theme === "dark" ? "text-gray-400" : "text-gray-600"
                      }
                    >
                      {link.name}
                    </a>
                  </li>
                ))
              ) : (
                <>
                  <li>
                    <a
                      href="#"
                      className={
                        theme === "dark" ? "text-gray-400" : "text-gray-600"
                      }
                    >
                      Home
                    </a>
                  </li>
                  <li>
                    <a
                      href="#events"
                      className={
                        theme === "dark" ? "text-gray-400" : "text-gray-600"
                      }
                    >
                      Events
                    </a>
                  </li>
                  <li>
                    <a
                      href="#gallery"
                      className={
                        theme === "dark" ? "text-gray-400" : "text-gray-600"
                      }
                    >
                      Gallery
                    </a>
                  </li>
                  <li>
                    <a
                      href="#about"
                      className={
                        theme === "dark" ? "text-gray-400" : "text-gray-600"
                      }
                    >
                      About
                    </a>
                  </li>
                  <li>
                    <a
                      href="#contact"
                      className={
                        theme === "dark" ? "text-gray-400" : "text-gray-600"
                      }
                    >
                      Contact
                    </a>
                  </li>
                  <li>
                    <a
                      href="#bottle-service"
                      className={
                        theme === "dark" ? "text-gray-400" : "text-gray-600"
                      }
                    >
                      Bottle Service
                    </a>
                  </li>
                </>
              )}
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
                <span
                  className={
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  }
                >
                  {contactInfo.address}
                </span>
              </li>
              <li className="flex items-center">
                <Phone
                  className="mr-2 text-amber-500 flex-shrink-0"
                  size={18}
                />
                <a
                  href={`tel:${contactInfo.phone}`}
                  className={
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  }
                >
                  {contactInfo.phone}
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="mr-2 text-amber-500 flex-shrink-0" size={18} />
                <a
                  href={`mailto:${contactInfo.email}`}
                  className={
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  }
                >
                  {contactInfo.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          {newsletterEnabled && (
            <div className="col-span-1">
              <h4 className="text-xl font-semibold mb-4 text-amber-500">
                Newsletter
              </h4>
              <p
                className={cn(
                  "mb-4",
                  theme === "dark" ? "text-gray-400" : "text-gray-600",
                )}
              >
                Subscribe to our newsletter for exclusive updates and offers.
              </p>
              <div className="flex flex-col space-y-3">
                <Input
                  type="email"
                  placeholder="Your email address"
                  className={cn(
                    "border-amber-500/30 focus-visible:ring-amber-500",
                    theme === "dark" ? "bg-gray-900" : "bg-gray-100",
                  )}
                />
                <Button className="bg-amber-500 text-black font-semibold">
                  Subscribe
                </Button>
              </div>
            </div>
          )}
        </div>

        <div
          className={cn(
            "border-t mt-12 pt-6 text-center",
            theme === "dark" ? "border-gray-800" : "border-gray-200",
          )}
        >
          <p
            className={cn(
              "text-sm",
              theme === "dark" ? "text-gray-500" : "text-gray-400",
            )}
          >
            {copyrightText.replace(
              "{new Date().getFullYear()}",
              new Date().getFullYear().toString(),
            )}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
