import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import ThemeToggle from "./ThemeToggle";
import { useAuth } from "@/context/AuthContext";
import {
  Home,
  Video,
  Calendar,
  Image,
  Info,
  Phone,
  Wine,
  LogOut,
  Navigation,
  LayoutGrid,
  User,
} from "lucide-react";

interface SidebarProps {
  onLogout?: () => void;
}

const Sidebar = ({
  onLogout = () => console.log("Logout clicked"),
}: SidebarProps) => {
  const location = useLocation();
  const currentPath = location.pathname;
  const { profile } = useAuth();
  const businessName = profile?.businesses?.name || "Business";

  const menuItems = [
    {
      name: "Dashboard",
      icon: <Home className="mr-2 h-5 w-5" />,
      path: "/admin/dashboard",
    },
    {
      name: "Hero Section",
      icon: <Video className="mr-2 h-5 w-5" />,
      path: "/admin/dashboard?section=hero",
    },
    {
      name: "Events",
      icon: <Calendar className="mr-2 h-5 w-5" />,
      path: "/admin/dashboard?section=events",
    },
    {
      name: "Gallery",
      icon: <Image className="mr-2 h-5 w-5" />,
      path: "/admin/dashboard?section=gallery",
    },
    {
      name: "About",
      icon: <Info className="mr-2 h-5 w-5" />,
      path: "/admin/dashboard?section=about",
    },
    {
      name: "Contact",
      icon: <Phone className="mr-2 h-5 w-5" />,
      path: "/admin/dashboard?section=contact",
    },
    {
      name: "Bottle Service",
      icon: <Wine className="mr-2 h-5 w-5" />,
      path: "/admin/dashboard?section=bottle-service",
    },
    {
      name: "Navigation Bar",
      icon: <Navigation className="mr-2 h-5 w-5" />,
      path: "/admin/dashboard?section=navbar",
    },
    {
      name: "Footer",
      icon: <LayoutGrid className="mr-2 h-5 w-5" />,
      path: "/admin/dashboard?section=footer",
    },
  ];

  const isActive = (path: string) => {
    if (path.includes("?")) {
      const [basePath, queryString] = path.split("?");
      return currentPath === basePath && location.search.includes(queryString);
    }
    return currentPath === path;
  };

  return (
    <div className="h-full w-[280px] bg-white dark:bg-black border-r border-gray-200 dark:border-gold/20 flex flex-col p-4 text-gray-800 dark:text-white transition-colors duration-200">
      <div className="flex items-center justify-center py-6">
        {profile?.businesses?.logo ? (
          <img
            src={profile.businesses.logo}
            alt={businessName}
            className="h-10 w-auto object-contain mr-2"
          />
        ) : null}
        <h1 className="text-2xl font-bold text-gold dark:text-gold text-amber-600">
          {businessName} Admin
        </h1>
      </div>

      <div className="flex items-center justify-center mb-4">
        <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
          <User className="h-4 w-4" />
          <span>{profile?.id ? profile.id.split("-")[0] : "Admin"}</span>
        </div>
      </div>

      <Separator className="my-4 bg-gold/20" />

      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => (
          <Link to={item.path} key={item.name}>
            <Button
              variant={isActive(item.path) ? "default" : "ghost"}
              className={`w-full justify-start ${isActive(item.path) ? "bg-amber-600 dark:bg-gold text-white dark:text-black" : "text-amber-600 dark:text-gold bg-gray-100 dark:bg-black/40 hover:bg-gray-200 dark:hover:bg-black/60"}`}
            >
              {item.icon}
              {item.name}
            </Button>
          </Link>
        ))}
      </nav>

      <Separator className="my-4 bg-gold/20" />

      <div className="flex items-center justify-between mt-auto mb-4">
        <ThemeToggle />
        <Button
          variant="outline"
          className="border-amber-600/30 text-amber-600 bg-white hover:bg-gray-100 dark:bg-black/40 dark:border-gold/30 dark:text-gold"
          onClick={onLogout}
        >
          <LogOut className="mr-2 h-5 w-5" />
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
