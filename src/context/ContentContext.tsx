import React, { createContext, useContext, useState, useEffect } from "react";

// Define types for our content sections
type HeroContent = {
  title: string;
  subtitle: string;
  videoUrl: string;
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
  description: string;
  teamMembers: TeamMember[];
};

type ContactContent = {
  address: string;
  phone: string;
  email: string;
  hours: string;
  mapUrl: string;
};

type BottleServicePackage = {
  id: string;
  name: string;
  price: string;
  description: string;
  image: string;
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
};

// Initial state with default values
const initialContent: ContentState = {
  hero: {
    title: "Dvanity Night Club",
    subtitle: "Experience Luxury Nightlife",
    videoUrl: "https://example.com/video.mp4",
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
    address: "123 Nightlife Ave, Los Angeles, CA 90001",
    phone: "+1 (555) 123-4567",
    email: "info@dvanity.com",
    hours: "Thursday - Sunday: 10PM - 4AM",
    mapUrl: "https://maps.example.com/dvanity",
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
};

// Create the context
const ContentContext = createContext<ContentContextType | undefined>(undefined);

// Generate a unique ID for new items
const generateId = () => Math.random().toString(36).substr(2, 9);

// Provider component
export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Try to load content from localStorage, or use initial content
  const [content, setContent] = useState<ContentState>(() => {
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
