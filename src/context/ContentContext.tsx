import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

// Define types for our content sections
type HeroContent = {
  title: string;
  subtitle: string;
  videoUrl: string;
  youtubeEmbed: string;
};

type EventCategory = {
  id: string;
  name: string;
  slug: string;
};

type EventContent = {
  id: string;
  title: string;
  date: string;
  description: string;
  image: string;
  category?: string;
};

type GalleryCategory = {
  id: string;
  name: string;
  slug: string;
};

type GalleryImage = {
  id: string;
  image: string;
  caption: string;
  category?: string;
};

type TeamMember = {
  id: string;
  name: string;
  role: string;
  image: string;
};

type AboutContent = {
  title: string;
  subtitle?: string;
  description: string;
  history?: string;
  mission?: string;
  teamMembers: TeamMember[];
};

type ContactContent = {
  address: string;
  phone: string;
  email: string;
  hours: string;
  mapUrl: string;
  mapEmbed?: string;
};

type BottleServicePackage = {
  id: string;
  name: string;
  price: string;
  description: string;
  image: string;
};

type NavLink = {
  id: string;
  name: string;
  path: string;
};

type NavbarContent = {
  links: NavLink[];
  adminButtonText: string;
  logo?: string;
};

type SocialLink = {
  id: string;
  platform: string;
  url: string;
};

type QuickLink = {
  id: string;
  name: string;
  path: string;
};

type FooterContent = {
  socialLinks: SocialLink[];
  quickLinks: QuickLink[];
  newsletterEnabled: boolean;
  copyrightText: string;
  logo?: string;
};

type ContentState = {
  hero: HeroContent;
  events: EventContent[];
  eventCategories: EventCategory[];
  gallery: GalleryImage[];
  galleryCategories: GalleryCategory[];
  about: AboutContent;
  contact: ContactContent;
  bottleService: BottleServicePackage[];
  navbar: NavbarContent;
  footer: FooterContent;
};

type ContentContextType = {
  content: ContentState;
  updateHero: (data: HeroContent) => void;
  updateEvents: (data: EventContent[]) => void;
  addEvent: (event: EventContent) => void;
  updateEvent: (id: string, event: Partial<EventContent>) => void;
  deleteEvent: (id: string) => void;
  updateEventCategories: (data: EventCategory[]) => void;
  addEventCategory: (category: EventCategory) => void;
  updateEventCategory: (id: string, category: Partial<EventCategory>) => void;
  deleteEventCategory: (id: string) => void;
  updateGallery: (data: GalleryImage[]) => void;
  addGalleryImage: (image: GalleryImage) => void;
  updateGalleryImage: (id: string, image: Partial<GalleryImage>) => void;
  deleteGalleryImage: (id: string) => void;
  updateGalleryCategories: (data: GalleryCategory[]) => void;
  addGalleryCategory: (category: GalleryCategory) => void;
  updateGalleryCategory: (
    id: string,
    category: Partial<GalleryCategory>,
  ) => void;
  deleteGalleryCategory: (id: string) => void;
  updateAbout: (data: AboutContent) => void;
  addTeamMember: (member: TeamMember) => void;
  updateTeamMember: (id: string, member: Partial<TeamMember>) => void;
  deleteTeamMember: (id: string) => void;
  updateContact: (data: ContactContent) => void;
  updateBottleService: (data: BottleServicePackage[]) => void;
  addBottlePackage: (pkg: BottleServicePackage) => void;
  updateBottlePackage: (id: string, pkg: Partial<BottleServicePackage>) => void;
  deleteBottlePackage: (id: string) => void;
  updateNavbar: (data: NavbarContent) => void;
  addNavLink: (link: NavLink) => void;
  updateNavLink: (id: string, link: Partial<NavLink>) => void;
  deleteNavLink: (id: string) => void;
  updateFooter: (data: FooterContent) => void;
  addSocialLink: (link: SocialLink) => void;
  updateSocialLink: (id: string, link: Partial<SocialLink>) => void;
  deleteSocialLink: (id: string) => void;
  addQuickLink: (link: QuickLink) => void;
  updateQuickLink: (id: string, link: Partial<QuickLink>) => void;
  deleteQuickLink: (id: string) => void;
};

// Initial state with default values
const initialContent: ContentState = {
  hero: {
    title: "Dvanity Night Club",
    subtitle: "Experience Luxury Nightlife",
    videoUrl: "https://example.com/video.mp4",
    youtubeEmbed:
      "https://www.youtube.com/embed/UzswywOA1qU?si=xHvwDqoyHS5ZCfhD&autoplay=1&mute=1&loop=1&playlist=UzswywOA1qU&controls=0&showinfo=0&rel=0",
  },
  eventCategories: [
    {
      id: "1",
      name: "Music",
      slug: "music",
    },
    {
      id: "2",
      name: "VIP",
      slug: "vip",
    },
    {
      id: "3",
      name: "Special",
      slug: "special",
    },
  ],
  events: [
    {
      id: "1",
      title: "Summer Vibes Party",
      date: "2023-07-15",
      description:
        "Join us for the hottest summer party with top DJs and exclusive bottle service.",
      image:
        "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=80",
    },
    {
      id: "2",
      title: "VIP Night",
      date: "2023-07-22",
      description:
        "Exclusive VIP night with celebrity guests and premium entertainment.",
      image:
        "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?w=800&q=80",
    },
  ],
  galleryCategories: [
    {
      id: "1",
      name: "Atmosphere",
      slug: "atmosphere",
    },
    {
      id: "2",
      name: "Event",
      slug: "event",
    },
    {
      id: "3",
      name: "VIP",
      slug: "vip",
    },
    {
      id: "4",
      name: "Bar",
      slug: "bar",
    },
  ],
  gallery: [
    {
      id: "1",
      image:
        "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?w=800&q=80",
      caption: "Club atmosphere",
      category: "atmosphere",
    },
    {
      id: "2",
      image:
        "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=80",
      caption: "DJ booth",
      category: "event",
    },
    {
      id: "3",
      image:
        "https://images.unsplash.com/photo-1545128485-c400ce7b6892?w=800&q=80",
      caption: "VIP section",
      category: "vip",
    },
    {
      id: "4",
      image:
        "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80",
      caption: "Dance floor",
      category: "bar",
    },
  ],
  about: {
    title: "About Dvanity",
    description:
      "Dvanity Night Club is the premier destination for luxury nightlife experiences. Established in 2010, we have been providing unforgettable nights with top-tier entertainment, exclusive bottle service, and a sophisticated atmosphere.",
    teamMembers: [
      {
        id: "1",
        name: "John Smith",
        role: "Owner",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
      },
      {
        id: "2",
        name: "Sarah Johnson",
        role: "Manager",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
      },
    ],
  },
  contact: {
    address: "no. 53 Kpakani Street Port Harcourt",
    phone: "+1 (555) 123-4567",
    email: "info@dvanity.com",
    hours: "Thursday - Sunday: 10PM - 4AM",
    mapUrl: "https://maps.example.com/dvanity",
    mapEmbed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3975.5508083469196!2d6.9807909999999995!3d4.8511082!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1069cf173bcc1951%3A0xda2ab1cc8bab4e45!2sG-throne%20Hotel%20and%20Suites!5e0!3m2!1sen!2sng!4v1716294000000!5m2!1sen!2sng",
  },
  bottleService: [
    {
      id: "1",
      name: "Silver Package",
      price: "$500",
      description: "1 premium bottle, mixers, VIP seating for up to 4 guests",
      image:
        "https://images.unsplash.com/photo-1605270012917-bf357a1fae9e?w=800&q=80",
    },
    {
      id: "2",
      name: "Gold Package",
      price: "$1000",
      description:
        "2 premium bottles, mixers, VIP seating for up to 8 guests, priority entry",
      image:
        "https://images.unsplash.com/photo-1605270012917-bf357a1fae9e?w=800&q=80",
    },
    {
      id: "3",
      name: "Platinum Package",
      price: "$2000",
      description:
        "4 premium bottles, mixers, exclusive VIP area for up to 12 guests, priority entry, personal server",
      image:
        "https://images.unsplash.com/photo-1605270012917-bf357a1fae9e?w=800&q=80",
    },
  ],
  navbar: {
    links: [
      { id: "1", name: "Home", path: "/" },
      { id: "2", name: "Events", path: "events" },
      { id: "3", name: "Gallery", path: "gallery" },
      { id: "4", name: "About", path: "about" },
      { id: "5", name: "Contact", path: "contact" },
      { id: "6", name: "Bottle Service", path: "bottle-service" },
    ],
    adminButtonText: "Admin",
    logo: "",
  },
  footer: {
    socialLinks: [
      {
        id: "1",
        platform: "Facebook",
        url: "https://web.facebook.com/DVanityPremiumClub/",
      },
      {
        id: "2",
        platform: "Instagram",
        url: "https://www.instagram.com/dvanity_premiumclub/",
      },
      { id: "3", platform: "Twitter", url: "https://x.com/DVanityPremClub" },
      {
        id: "4",
        platform: "LinkedIn",
        url: "https://www.linkedin.com/in/d-vanity-premium-club-077275357",
      },
      {
        id: "5",
        platform: "Google Business",
        url: "https://g.co/kgs/yQUJ3vP",
      },
    ],
    quickLinks: [
      { id: "1", name: "Home", path: "#" },
      { id: "2", name: "Events", path: "#events" },
      { id: "3", name: "Gallery", path: "#gallery" },
      { id: "4", name: "About", path: "#about" },
      { id: "5", name: "Contact", path: "#contact" },
      { id: "6", name: "Bottle Service", path: "#bottle-service" },
    ],
    newsletterEnabled: true,
    copyrightText: "© Dvanity Night Club. All rights reserved.",
    logo: "",
  },
};

// Create the context
const ContentContext = createContext<ContentContextType | undefined>(undefined);

// Generate a unique ID for new items
const generateId = () => Math.random().toString(36).substr(2, 9);

// Provider component
export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [content, setContent] = useState<ContentState>(() => {
    // Try to load content from localStorage, or use initial content
    const savedContent = localStorage.getItem("dvanityContent");
    return savedContent ? JSON.parse(savedContent) : initialContent;
  });

  // Save to localStorage whenever content changes
  useEffect(() => {
    localStorage.setItem("dvanityContent", JSON.stringify(content));
  }, [content]);

  // Update functions for each section
  const updateHero = (data: HeroContent) => {
    setContent((prev) => ({ ...prev, hero: data }));
  };

  const updateEvents = (data: EventContent[]) => {
    setContent((prev) => ({ ...prev, events: data }));
  };

  const addEvent = (event: EventContent) => {
    const newEvent = { ...event, id: generateId() };
    setContent((prev) => ({ ...prev, events: [...prev.events, newEvent] }));
  };

  const updateEvent = (id: string, event: Partial<EventContent>) => {
    setContent((prev) => ({
      ...prev,
      events: prev.events.map((e) => (e.id === id ? { ...e, ...event } : e)),
    }));
  };

  const deleteEvent = (id: string) => {
    setContent((prev) => ({
      ...prev,
      events: prev.events.filter((e) => e.id !== id),
    }));
  };

  const updateEventCategories = (data: EventCategory[]) => {
    setContent((prev) => ({ ...prev, eventCategories: data }));
  };

  const addEventCategory = (category: EventCategory) => {
    const newCategory = { ...category, id: generateId() };
    setContent((prev) => ({
      ...prev,
      eventCategories: [...(prev.eventCategories || []), newCategory],
    }));
  };

  const updateEventCategory = (
    id: string,
    category: Partial<EventCategory>,
  ) => {
    setContent((prev) => ({
      ...prev,
      eventCategories: prev.eventCategories.map((c) =>
        c.id === id ? { ...c, ...category } : c,
      ),
    }));
  };

  const deleteEventCategory = (id: string) => {
    setContent((prev) => ({
      ...prev,
      eventCategories: (prev.eventCategories || []).filter((c) => c.id !== id),
    }));
  };

  const updateGallery = (data: GalleryImage[]) => {
    setContent((prev) => ({ ...prev, gallery: data }));
  };

  const addGalleryImage = (image: GalleryImage) => {
    const newImage = { ...image, id: generateId() };
    setContent((prev) => ({ ...prev, gallery: [...prev.gallery, newImage] }));
  };

  const updateGalleryImage = (id: string, image: Partial<GalleryImage>) => {
    setContent((prev) => ({
      ...prev,
      gallery: prev.gallery.map((img) =>
        img.id === id ? { ...img, ...image } : img,
      ),
    }));
  };

  const deleteGalleryImage = (id: string) => {
    setContent((prev) => ({
      ...prev,
      gallery: prev.gallery.filter((img) => img.id !== id),
    }));
  };

  const updateGalleryCategories = (data: GalleryCategory[]) => {
    setContent((prev) => ({ ...prev, galleryCategories: data }));
  };

  const addGalleryCategory = (category: GalleryCategory) => {
    const newCategory = { ...category, id: generateId() };
    setContent((prev) => ({
      ...prev,
      galleryCategories: [...(prev.galleryCategories || []), newCategory],
    }));
  };

  const updateGalleryCategory = (
    id: string,
    category: Partial<GalleryCategory>,
  ) => {
    setContent((prev) => ({
      ...prev,
      galleryCategories: prev.galleryCategories.map((c) =>
        c.id === id ? { ...c, ...category } : c,
      ),
    }));
  };

  const deleteGalleryCategory = (id: string) => {
    setContent((prev) => ({
      ...prev,
      galleryCategories: (prev.galleryCategories || []).filter(
        (c) => c.id !== id,
      ),
    }));
  };

  const updateAbout = (data: AboutContent) => {
    setContent((prev) => ({ ...prev, about: data }));
  };

  const addTeamMember = (member: TeamMember) => {
    const newMember = { ...member, id: generateId() };
    setContent((prev) => ({
      ...prev,
      about: {
        ...prev.about,
        teamMembers: [...prev.about.teamMembers, newMember],
      },
    }));
  };

  const updateTeamMember = (id: string, member: Partial<TeamMember>) => {
    setContent((prev) => ({
      ...prev,
      about: {
        ...prev.about,
        teamMembers: prev.about.teamMembers.map((m) =>
          m.id === id ? { ...m, ...member } : m,
        ),
      },
    }));
  };

  const deleteTeamMember = (id: string) => {
    setContent((prev) => ({
      ...prev,
      about: {
        ...prev.about,
        teamMembers: prev.about.teamMembers.filter((m) => m.id !== id),
      },
    }));
  };

  const updateContact = (data: ContactContent) => {
    setContent((prev) => ({ ...prev, contact: data }));
  };

  const updateBottleService = (data: BottleServicePackage[]) => {
    setContent((prev) => ({ ...prev, bottleService: data }));
  };

  const addBottlePackage = (pkg: BottleServicePackage) => {
    const newPackage = { ...pkg, id: generateId() };
    setContent((prev) => ({
      ...prev,
      bottleService: [...prev.bottleService, newPackage],
    }));
  };

  const updateBottlePackage = (
    id: string,
    pkg: Partial<BottleServicePackage>,
  ) => {
    setContent((prev) => ({
      ...prev,
      bottleService: prev.bottleService.map((p) =>
        p.id === id ? { ...p, ...pkg } : p,
      ),
    }));
  };

  const deleteBottlePackage = (id: string) => {
    setContent((prev) => ({
      ...prev,
      bottleService: prev.bottleService.filter((p) => p.id !== id),
    }));
  };

  // Navbar functions
  const updateNavbar = (data: NavbarContent) => {
    setContent((prev) => ({ ...prev, navbar: data }));
  };

  const addNavLink = (link: NavLink) => {
    const newLink = { ...link, id: generateId() };
    setContent((prev) => ({
      ...prev,
      navbar: {
        ...prev.navbar,
        links: [...prev.navbar.links, newLink],
      },
    }));
  };

  const updateNavLink = (id: string, link: Partial<NavLink>) => {
    setContent((prev) => ({
      ...prev,
      navbar: {
        ...prev.navbar,
        links: prev.navbar.links.map((l) =>
          l.id === id ? { ...l, ...link } : l,
        ),
      },
    }));
  };

  const deleteNavLink = (id: string) => {
    setContent((prev) => ({
      ...prev,
      navbar: {
        ...prev.navbar,
        links: prev.navbar.links.filter((l) => l.id !== id),
      },
    }));
  };

  // Footer functions
  const updateFooter = (data: FooterContent) => {
    setContent((prev) => ({ ...prev, footer: data }));
  };

  const addSocialLink = (link: SocialLink) => {
    const newLink = { ...link, id: generateId() };
    setContent((prev) => ({
      ...prev,
      footer: {
        ...prev.footer,
        socialLinks: [...prev.footer.socialLinks, newLink],
      },
    }));
  };

  const updateSocialLink = (id: string, link: Partial<SocialLink>) => {
    setContent((prev) => ({
      ...prev,
      footer: {
        ...prev.footer,
        socialLinks: prev.footer.socialLinks.map((l) =>
          l.id === id ? { ...l, ...link } : l,
        ),
      },
    }));
  };

  const deleteSocialLink = (id: string) => {
    setContent((prev) => ({
      ...prev,
      footer: {
        ...prev.footer,
        socialLinks: prev.footer.socialLinks.filter((l) => l.id !== id),
      },
    }));
  };

  const addQuickLink = (link: QuickLink) => {
    const newLink = { ...link, id: generateId() };
    setContent((prev) => ({
      ...prev,
      footer: {
        ...prev.footer,
        quickLinks: [...prev.footer.quickLinks, newLink],
      },
    }));
  };

  const updateQuickLink = (id: string, link: Partial<QuickLink>) => {
    setContent((prev) => ({
      ...prev,
      footer: {
        ...prev.footer,
        quickLinks: prev.footer.quickLinks.map((l) =>
          l.id === id ? { ...l, ...link } : l,
        ),
      },
    }));
  };

  const deleteQuickLink = (id: string) => {
    setContent((prev) => ({
      ...prev,
      footer: {
        ...prev.footer,
        quickLinks: prev.footer.quickLinks.filter((l) => l.id !== id),
      },
    }));
  };

  const value = {
    content,
    updateHero,
    updateEvents,
    addEvent,
    updateEvent,
    deleteEvent,
    updateEventCategories,
    addEventCategory,
    updateEventCategory,
    deleteEventCategory,
    updateGallery,
    addGalleryImage,
    updateGalleryImage,
    deleteGalleryImage,
    updateGalleryCategories,
    addGalleryCategory,
    updateGalleryCategory,
    deleteGalleryCategory,
    updateAbout,
    addTeamMember,
    updateTeamMember,
    deleteTeamMember,
    updateContact,
    updateBottleService,
    addBottlePackage,
    updateBottlePackage,
    deleteBottlePackage,
    updateNavbar,
    addNavLink,
    updateNavLink,
    deleteNavLink,
    updateFooter,
    addSocialLink,
    updateSocialLink,
    deleteSocialLink,
    addQuickLink,
    updateQuickLink,
    deleteQuickLink,
  };

  return (
    <ContentContext.Provider value={value}>{children}</ContentContext.Provider>
  );
};

// Custom hook to use the content context
export const useContent = () => {
  const context = useContext(ContentContext);
  if (context === undefined) {
    throw new Error("useContent must be used within a ContentProvider");
  }
  return context;
};
