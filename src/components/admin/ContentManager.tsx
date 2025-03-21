import React, { useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Upload,
  Image,
  Video,
  FileText,
  Calendar,
  Users,
  GlassWater,
  Eye,
  Save,
  Plus,
  Trash,
  Edit,
  Navigation,
  LayoutGrid,
  Facebook,
  Instagram,
  Twitter,
  Link as LinkIcon,
  ExternalLink,
  Mail,
  Switch,
} from "lucide-react";
import { useContent } from "@/context/ContentContext";
import { uploadImage, uploadFile, validateImage } from "@/utils/imageUpload";
import { toast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";

interface ContentManagerProps {
  selectedSection?: string;
  onPreview?: () => void;
  onPublish?: () => void;
}

const ContentManager = ({
  selectedSection = "hero",
  onPreview = () => {},
  onPublish = () => {},
}: ContentManagerProps) => {
  const [activeTab, setActiveTab] = useState(selectedSection);
  const [showPreview, setShowPreview] = useState(false);
  const [isAddingEvent, setIsAddingEvent] = useState(false);
  const [isAddingEventCategory, setIsAddingEventCategory] = useState(false);
  const [isAddingGalleryImage, setIsAddingGalleryImage] = useState(false);
  const [isAddingGalleryCategory, setIsAddingGalleryCategory] = useState(false);
  const [isAddingTeamMember, setIsAddingTeamMember] = useState(false);
  const [isAddingBottlePackage, setIsAddingBottlePackage] = useState(false);
  const [isAddingNavLink, setIsAddingNavLink] = useState(false);
  const [isAddingSocialLink, setIsAddingSocialLink] = useState(false);
  const [isAddingQuickLink, setIsAddingQuickLink] = useState(false);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);

  // Get content and update functions from context
  const {
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
  } = useContent();

  // Local state for form data
  const [heroContent, setHeroContent] = useState(content.hero);
  const [eventsContent, setEventsContent] = useState(content.events);
  const [eventCategoriesContent, setEventCategoriesContent] = useState(
    content.eventCategories,
  );
  const [galleryContent, setGalleryContent] = useState(content.gallery);
  const [galleryCategoriesContent, setGalleryCategoriesContent] = useState(
    content.galleryCategories,
  );
  const [aboutContent, setAboutContent] = useState(content.about);
  const [contactContent, setContactContent] = useState(content.contact);
  const [bottleServiceContent, setBottleServiceContent] = useState(
    content.bottleService,
  );
  const [navbarContent, setNavbarContent] = useState(content.navbar);
  const [footerContent, setFooterContent] = useState(content.footer);

  // New item form states
  const [newEvent, setNewEvent] = useState({
    title: "",
    date: "",
    description: "",
    image: "",
    category: "",
  });

  const [newEventCategory, setNewEventCategory] = useState({
    name: "",
    slug: "",
  });

  const [newGalleryImage, setNewGalleryImage] = useState({
    image: "",
    caption: "",
    category: "",
  });

  const [newGalleryCategory, setNewGalleryCategory] = useState({
    name: "",
    slug: "",
  });

  const [newTeamMember, setNewTeamMember] = useState({
    name: "",
    role: "",
    image: "",
  });

  const [newBottlePackage, setNewBottlePackage] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
  });

  const [newNavLink, setNewNavLink] = useState({
    name: "",
    path: "",
  });

  const [newSocialLink, setNewSocialLink] = useState({
    platform: "",
    url: "",
  });

  const [newQuickLink, setNewQuickLink] = useState({
    name: "",
    path: "",
  });

  // Update local state when context content changes
  useEffect(() => {
    if (content) {
      setHeroContent(content.hero || { title: "", subtitle: "", videoUrl: "" });
      setEventsContent(content.events || []);
      setEventCategoriesContent(content.eventCategories || []);
      setGalleryContent(content.gallery || []);
      setGalleryCategoriesContent(content.galleryCategories || []);
      setAboutContent(
        content.about || { title: "", description: "", teamMembers: [] },
      );
      setContactContent(
        content.contact || {
          address: "",
          phone: "",
          email: "",
          hours: "",
          mapUrl: "",
        },
      );
      setBottleServiceContent(content.bottleService || []);
      setNavbarContent(
        content.navbar || { links: [], adminButtonText: "Admin" },
      );
      setFooterContent(
        content.footer || {
          socialLinks: [],
          quickLinks: [],
          newsletterEnabled: true,
          copyrightText: "",
        },
      );
    }
  }, [content]);

  // Update active tab when selectedSection prop changes
  useEffect(() => {
    // Handle the case where selectedSection has dashes
    if (selectedSection === "bottle-service") {
      setActiveTab("bottleService");
    } else if (selectedSection === "navbar") {
      setActiveTab("navbar");
    } else if (selectedSection === "footer") {
      setActiveTab("footer");
    } else {
      setActiveTab(selectedSection);
    }
    console.log("Selected section changed to:", selectedSection);
  }, [selectedSection]);

  // Debug log to check active tab
  useEffect(() => {
    console.log("Active tab changed to:", activeTab);
  }, [activeTab]);

  // Handle file upload (any file type)
  const handleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    callback: (url: string) => void,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const fileUrl = await uploadFile(file);
      callback(fileUrl);
      toast({
        title: "File uploaded",
        description: `${file.name} has been uploaded successfully.`,
      });
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "Failed to upload file. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Handle image upload
  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    callback: (url: string) => void,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!validateImage(file)) {
      toast({
        title: "Invalid file",
        description: "Please upload a file under 5MB",
        variant: "destructive",
      });
      return;
    }

    try {
      const imageUrl = await uploadImage(file);
      callback(imageUrl);
      toast({
        title: "File uploaded",
        description: `${file.name} has been uploaded successfully.`,
      });
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "Failed to upload file. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Handle preview
  const handlePreview = () => {
    setShowPreview(true);
    onPreview();
  };

  // Handle publish
  const handlePublish = () => {
    // Save all content to context
    updateHero(heroContent);
    updateEvents(eventsContent);
    updateEventCategories(eventCategoriesContent);
    updateGallery(galleryContent);
    updateAbout(aboutContent);
    updateContact(contactContent);
    updateBottleService(bottleServiceContent);
    updateNavbar(navbarContent);
    updateFooter(footerContent);

    toast({
      title: "Changes published",
      description: "Your changes have been published to the website.",
    });

    onPublish();
  };

  // Add new event
  const handleAddEvent = () => {
    if (!newEvent.title || !newEvent.date || !newEvent.image) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    addEvent({
      id: "", // Will be generated by the context
      ...newEvent,
    });

    setNewEvent({
      title: "",
      date: "",
      description: "",
      image: "",
      category: "",
    });

    setIsAddingEvent(false);
    toast({
      title: "Event added",
      description: "New event has been added successfully.",
    });
  };

  // Add new event category
  const handleAddEventCategory = () => {
    if (!newEventCategory.name || !newEventCategory.slug) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    try {
      addEventCategory({
        id: "", // Will be generated by the context
        ...newEventCategory,
      });

      setNewEventCategory({
        name: "",
        slug: "",
      });

      setIsAddingEventCategory(false);
      toast({
        title: "Category added",
        description: "New event category has been added successfully.",
      });
    } catch (error) {
      console.error("Error adding category:", error);
      toast({
        title: "Error adding category",
        description:
          "There was a problem adding the category. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Add new gallery image
  const handleAddGalleryImage = () => {
    if (!newGalleryImage.image || !newGalleryImage.caption) {
      toast({
        title: "Missing information",
        description: "Please provide both an image and a caption.",
        variant: "destructive",
      });
      return;
    }

    addGalleryImage({
      id: "", // Will be generated by the context
      ...newGalleryImage,
    });

    setNewGalleryImage({
      image: "",
      caption: "",
      category: "",
    });

    setIsAddingGalleryImage(false);
    toast({
      title: "Image added",
      description: "New gallery image has been added successfully.",
    });
  };

  // Add new gallery category
  const handleAddGalleryCategory = () => {
    if (!newGalleryCategory.name || !newGalleryCategory.slug) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    try {
      addGalleryCategory({
        id: "", // Will be generated by the context
        ...newGalleryCategory,
      });

      setNewGalleryCategory({
        name: "",
        slug: "",
      });

      setIsAddingGalleryCategory(false);
      toast({
        title: "Category added",
        description: "New gallery category has been added successfully.",
      });
    } catch (error) {
      console.error("Error adding category:", error);
      toast({
        title: "Error adding category",
        description:
          "There was a problem adding the category. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Add new team member
  const handleAddTeamMember = () => {
    if (!newTeamMember.name || !newTeamMember.role || !newTeamMember.image) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    addTeamMember({
      id: "", // Will be generated by the context
      ...newTeamMember,
    });

    setNewTeamMember({
      name: "",
      role: "",
      image: "",
    });

    setIsAddingTeamMember(false);
    toast({
      title: "Team member added",
      description: "New team member has been added successfully.",
    });
  };

  // Add new bottle package
  const handleAddBottlePackage = () => {
    if (
      !newBottlePackage.name ||
      !newBottlePackage.price ||
      !newBottlePackage.description ||
      !newBottlePackage.image
    ) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    addBottlePackage({
      id: "", // Will be generated by the context
      ...newBottlePackage,
    });

    setNewBottlePackage({
      name: "",
      price: "",
      description: "",
      image: "",
    });

    setIsAddingBottlePackage(false);
    toast({
      title: "Package added",
      description: "New bottle service package has been added successfully.",
    });
  };

  // Add new nav link
  const handleAddNavLink = () => {
    if (!newNavLink.name || !newNavLink.path) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    addNavLink({
      id: "", // Will be generated by the context
      ...newNavLink,
    });

    setNewNavLink({
      name: "",
      path: "",
    });

    setIsAddingNavLink(false);
    toast({
      title: "Navigation link added",
      description: "New navigation link has been added successfully.",
    });
  };

  // Add new social link
  const handleAddSocialLink = () => {
    if (!newSocialLink.platform || !newSocialLink.url) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    addSocialLink({
      id: "", // Will be generated by the context
      ...newSocialLink,
    });

    setNewSocialLink({
      platform: "",
      url: "",
    });

    setIsAddingSocialLink(false);
    toast({
      title: "Social link added",
      description: "New social media link has been added successfully.",
    });
  };

  // Add new quick link
  const handleAddQuickLink = () => {
    if (!newQuickLink.name || !newQuickLink.path) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    addQuickLink({
      id: "", // Will be generated by the context
      ...newQuickLink,
    });

    setNewQuickLink({
      name: "",
      path: "",
    });

    setIsAddingQuickLink(false);
    toast({
      title: "Quick link added",
      description: "New quick link has been added successfully.",
    });
  };

  return (
    <div className="w-full h-full bg-white dark:bg-black text-gray-800 dark:text-white p-6 overflow-auto transition-colors duration-200">
      <Toaster />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-amber-600 dark:text-gold">
          Content Manager
        </h1>
        <div className="flex space-x-4">
          <Button
            variant="outline"
            className="border-amber-600 text-amber-600 bg-white/40 dark:border-gold dark:text-gold dark:bg-black/40"
            onClick={handlePreview}
          >
            <Eye className="mr-2 h-4 w-4" />
            Preview
          </Button>
          <Button
            className="bg-amber-600 dark:bg-gold text-white dark:text-black"
            onClick={handlePublish}
          >
            <Save className="mr-2 h-4 w-4" />
            Publish
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full bg-gray-100 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 mb-6">
          <TabsTrigger
            value="hero"
            className="data-[state=active]:bg-amber-600 data-[state=active]:text-white dark:data-[state=active]:bg-gold dark:data-[state=active]:text-black bg-white dark:bg-gray-800"
          >
            <Video className="mr-2 h-4 w-4" />
            Hero Section
          </TabsTrigger>
          <TabsTrigger
            value="events"
            className="data-[state=active]:bg-amber-600 data-[state=active]:text-white dark:data-[state=active]:bg-gold dark:data-[state=active]:text-black bg-white dark:bg-gray-800"
          >
            <Calendar className="mr-2 h-4 w-4" />
            Events
          </TabsTrigger>
          <TabsTrigger
            value="gallery"
            className="data-[state=active]:bg-amber-600 data-[state=active]:text-white dark:data-[state=active]:bg-gold dark:data-[state=active]:text-black bg-white dark:bg-gray-800"
          >
            <Image className="mr-2 h-4 w-4" />
            Gallery
          </TabsTrigger>
          <TabsTrigger
            value="about"
            className="data-[state=active]:bg-amber-600 data-[state=active]:text-white dark:data-[state=active]:bg-gold dark:data-[state=active]:text-black bg-white dark:bg-gray-800"
          >
            <FileText className="mr-2 h-4 w-4" />
            About
          </TabsTrigger>
          <TabsTrigger
            value="contact"
            className="data-[state=active]:bg-amber-600 data-[state=active]:text-white dark:data-[state=active]:bg-gold dark:data-[state=active]:text-black bg-white dark:bg-gray-800"
          >
            <Users className="mr-2 h-4 w-4" />
            Contact
          </TabsTrigger>
          <TabsTrigger
            value="bottleService"
            className="data-[state=active]:bg-amber-600 data-[state=active]:text-white dark:data-[state=active]:bg-gold dark:data-[state=active]:text-black bg-white dark:bg-gray-800"
          >
            <GlassWater className="mr-2 h-4 w-4" />
            Bottle Service
          </TabsTrigger>
          <TabsTrigger
            value="navbar"
            className="data-[state=active]:bg-amber-600 data-[state=active]:text-white dark:data-[state=active]:bg-gold dark:data-[state=active]:text-black bg-white dark:bg-gray-800"
          >
            <Navigation className="mr-2 h-4 w-4" />
            Navigation Bar
          </TabsTrigger>
          <TabsTrigger
            value="footer"
            className="data-[state=active]:bg-amber-600 data-[state=active]:text-white dark:data-[state=active]:bg-gold dark:data-[state=active]:text-black bg-white dark:bg-gray-800"
          >
            <LayoutGrid className="mr-2 h-4 w-4" />
            Footer
          </TabsTrigger>
        </TabsList>

        {/* Hero Section Content */}
        <TabsContent value="hero" className="space-y-6">
          <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
            <h2 className="text-xl font-bold mb-4 text-amber-600 dark:text-gold">
              Hero Section
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <Input
                  value={heroContent.title}
                  onChange={(e) =>
                    setHeroContent({ ...heroContent, title: e.target.value })
                  }
                  className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Subtitle
                </label>
                <Input
                  value={heroContent.subtitle}
                  onChange={(e) =>
                    setHeroContent({ ...heroContent, subtitle: e.target.value })
                  }
                  className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Background Video
                </label>
                <div className="flex items-center space-x-4">
                  <Input
                    value={heroContent.videoUrl}
                    onChange={(e) =>
                      setHeroContent({
                        ...heroContent,
                        videoUrl: e.target.value,
                      })
                    }
                    className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                    placeholder="Video URL"
                  />
                  <label className="cursor-pointer">
                    <Button
                      variant="outline"
                      className="border-amber-600 text-amber-600 bg-white/40 dark:border-gold dark:text-gold dark:bg-black/40"
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        const input = e.currentTarget
                          .nextElementSibling as HTMLInputElement;
                        if (input) input.click();
                      }}
                    >
                      <Upload className="mr-2 h-4 w-4" />
                      Upload
                    </Button>
                    <input
                      type="file"
                      className="hidden"
                      onChange={(e) =>
                        handleFileUpload(e, (url) =>
                          setHeroContent({
                            ...heroContent,
                            videoUrl: url,
                          }),
                        )
                      }
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Events Content */}
        <TabsContent value="events" className="space-y-6">
          <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-amber-600 dark:text-gold">
                Event Categories
              </h2>
              <Button
                className="bg-amber-600 dark:bg-gold text-white dark:text-black"
                onClick={() => setIsAddingEventCategory(true)}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Category
              </Button>
            </div>
            <div className="space-y-4 mb-8">
              {(eventCategoriesContent || []).map((category) => (
                <div
                  key={category.id}
                  className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 flex justify-between items-center"
                >
                  <div>
                    <h3 className="font-bold text-amber-600 dark:text-gold">
                      {category.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Slug: {category.slug}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      className="text-white bg-blue-600"
                      onClick={() => {
                        setEditingItemId(category.id);
                        setNewEventCategory({
                          name: category.name,
                          slug: category.slug,
                        });
                        setIsAddingEventCategory(true);
                      }}
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      className="text-white bg-red-600"
                      onClick={() => {
                        deleteEventCategory(category.id);
                        toast({
                          title: "Category deleted",
                          description:
                            "Category has been removed successfully.",
                        });
                      }}
                    >
                      <Trash className="h-4 w-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center mb-4 mt-8 pt-4 border-t border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold text-amber-600 dark:text-gold">
                Events
              </h2>
              <Button
                className="bg-amber-600 dark:bg-gold text-white dark:text-black"
                onClick={() => setIsAddingEvent(true)}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Event
              </Button>
            </div>
            <div className="space-y-4">
              {(eventsContent || []).map((event) => (
                <div
                  key={event.id}
                  className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 flex"
                >
                  <div className="w-24 h-24 mr-4 overflow-hidden rounded-md">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-amber-600 dark:text-gold">
                      {event.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {event.date}
                    </p>
                    <p className="text-sm mt-1">{event.description}</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      className="text-white bg-blue-600"
                      onClick={() => {
                        setEditingItemId(event.id);
                        setNewEvent({
                          title: event.title,
                          date: event.date,
                          description: event.description,
                          image: event.image,
                          category: event.category || "",
                        });
                        setIsAddingEvent(true);
                      }}
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      className="text-white bg-red-600"
                      onClick={() => {
                        deleteEvent(event.id);
                        toast({
                          title: "Event deleted",
                          description: "Event has been removed successfully.",
                        });
                      }}
                    >
                      <Trash className="h-4 w-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Add/Edit Event Category Dialog */}
          <Dialog
            open={isAddingEventCategory}
            onOpenChange={setIsAddingEventCategory}
          >
            <DialogContent className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-800 dark:text-white">
              <DialogHeader>
                <DialogTitle className="text-amber-600 dark:text-gold">
                  {editingItemId
                    ? "Edit Event Category"
                    : "Add New Event Category"}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Category Name
                  </label>
                  <Input
                    value={newEventCategory.name}
                    onChange={(e) =>
                      setNewEventCategory({
                        ...newEventCategory,
                        name: e.target.value,
                      })
                    }
                    className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Category Slug
                  </label>
                  <Input
                    value={newEventCategory.slug}
                    onChange={(e) =>
                      setNewEventCategory({
                        ...newEventCategory,
                        slug: e.target.value,
                      })
                    }
                    className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                    placeholder="e.g., vip, music, special"
                  />
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    Used for filtering events. Use lowercase letters without
                    spaces.
                  </p>
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  className="border-gray-200 dark:border-gray-700"
                  onClick={() => {
                    setIsAddingEventCategory(false);
                    setEditingItemId(null);
                    setNewEventCategory({
                      name: "",
                      slug: "",
                    });
                  }}
                >
                  Cancel
                </Button>
                <Button
                  className="bg-amber-600 dark:bg-gold text-white dark:text-black"
                  onClick={() => {
                    if (editingItemId) {
                      updateEventCategory(editingItemId, newEventCategory);
                      toast({
                        title: "Category updated",
                        description:
                          "Event category has been updated successfully.",
                      });
                    } else {
                      handleAddEventCategory();
                    }
                    setEditingItemId(null);
                  }}
                >
                  {editingItemId ? "Update" : "Add"} Category
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Add/Edit Event Dialog */}
          <Dialog open={isAddingEvent} onOpenChange={setIsAddingEvent}>
            <DialogContent className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-800 dark:text-white">
              <DialogHeader>
                <DialogTitle className="text-amber-600 dark:text-gold">
                  {editingItemId ? "Edit Event" : "Add New Event"}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Title
                  </label>
                  <Input
                    value={newEvent.title}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, title: e.target.value })
                    }
                    className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Date</label>
                  <Input
                    value={newEvent.date}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, date: e.target.value })
                    }
                    className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                    placeholder="e.g., FRI, OCT 15"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Description
                  </label>
                  <Textarea
                    value={newEvent.description}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, description: e.target.value })
                    }
                    className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                    rows={3}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Category
                  </label>
                  <Select
                    value={newEvent.category}
                    onValueChange={(value) =>
                      setNewEvent({ ...newEvent, category: value })
                    }
                  >
                    <SelectTrigger className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700">
                      {(eventCategoriesContent || []).map((category) => (
                        <SelectItem key={category.id} value={category.slug}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Image
                  </label>
                  <div className="flex items-center space-x-4">
                    <Input
                      value={newEvent.image}
                      onChange={(e) =>
                        setNewEvent({ ...newEvent, image: e.target.value })
                      }
                      className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                      placeholder="Image URL"
                    />
                    <label className="cursor-pointer">
                      <Button
                        variant="outline"
                        className="border-amber-600 text-amber-600 bg-white/40 dark:border-gold dark:text-gold dark:bg-black/40"
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          const input = e.currentTarget
                            .nextElementSibling as HTMLInputElement;
                          if (input) input.click();
                        }}
                      >
                        <Upload className="mr-2 h-4 w-4" />
                        Upload
                      </Button>
                      <input
                        type="file"
                        className="hidden"
                        onChange={(e) =>
                          handleFileUpload(e, (url) =>
                            setNewEvent({ ...newEvent, image: url }),
                          )
                        }
                      />
                    </label>
                  </div>
                  {newEvent.image && (
                    <div className="mt-2">
                      <img
                        src={newEvent.image}
                        alt="Preview"
                        className="h-20 w-auto rounded-md object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  className="border-gray-200 dark:border-gray-700"
                  onClick={() => {
                    setIsAddingEvent(false);
                    setEditingItemId(null);
                    setNewEvent({
                      title: "",
                      date: "",
                      description: "",
                      image: "",
                      category: "",
                    });
                  }}
                >
                  Cancel
                </Button>
                <Button
                  className="bg-amber-600 dark:bg-gold text-white dark:text-black"
                  onClick={() => {
                    if (editingItemId) {
                      updateEvent(editingItemId, newEvent);
                      toast({
                        title: "Event updated",
                        description: "Event has been updated successfully.",
                      });
                    } else {
                      handleAddEvent();
                    }
                    setEditingItemId(null);
                  }}
                >
                  {editingItemId ? "Update" : "Add"} Event
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </TabsContent>

        {/* Gallery Content */}
        <TabsContent value="gallery" className="space-y-6">
          <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-amber-600 dark:text-gold">
                Gallery Categories
              </h2>
              <Button
                className="bg-amber-600 dark:bg-gold text-white dark:text-black"
                onClick={() => setIsAddingGalleryCategory(true)}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Category
              </Button>
            </div>
            <div className="space-y-4 mb-8">
              {(galleryCategoriesContent || []).map((category) => (
                <div
                  key={category.id}
                  className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 flex justify-between items-center"
                >
                  <div>
                    <h3 className="font-bold text-amber-600 dark:text-gold">
                      {category.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Slug: {category.slug}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      className="text-white bg-blue-600"
                      onClick={() => {
                        setEditingItemId(category.id);
                        setNewGalleryCategory({
                          name: category.name,
                          slug: category.slug,
                        });
                        setIsAddingGalleryCategory(true);
                      }}
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      className="text-white bg-red-600"
                      onClick={() => {
                        deleteGalleryCategory(category.id);
                        toast({
                          title: "Category deleted",
                          description:
                            "Category has been removed successfully.",
                        });
                      }}
                    >
                      <Trash className="h-4 w-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center mb-4 mt-8 pt-4 border-t border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold text-amber-600 dark:text-gold">
                Photo Gallery
              </h2>
              <Button
                className="bg-amber-600 dark:bg-gold text-white dark:text-black"
                onClick={() => setIsAddingGalleryImage(true)}
              >
                <Upload className="mr-2 h-4 w-4" />
                Upload Photos
              </Button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {galleryContent?.map((photo) => (
                <div key={photo.id} className="relative">
                  <img
                    src={photo.image}
                    alt={photo.caption}
                    className="w-full h-40 object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center space-x-2 rounded-lg">
                    <Button
                      variant="secondary"
                      size="sm"
                      className="text-white bg-blue-600"
                      onClick={() => {
                        setEditingItemId(photo.id);
                        setNewGalleryImage({
                          image: photo.image,
                          caption: photo.caption,
                          category: photo.category || "",
                        });
                        setIsAddingGalleryImage(true);
                      }}
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      className="text-white bg-red-600"
                      onClick={() => {
                        deleteGalleryImage(photo.id);
                        toast({
                          title: "Image deleted",
                          description:
                            "Gallery image has been removed successfully.",
                        });
                      }}
                    >
                      <Trash className="h-4 w-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                  <div className="mt-1 flex justify-between items-center">
                    <p className="text-sm truncate">{photo.caption}</p>
                    {photo.category && (
                      <span className="text-xs bg-amber-600/20 dark:bg-gold/20 text-amber-600 dark:text-gold px-2 py-0.5 rounded">
                        {photo.category}
                      </span>
                    )}
                  </div>
                </div>
              )) || []}
            </div>
          </div>

          {/* Add/Edit Gallery Category Dialog */}
          <Dialog
            open={isAddingGalleryCategory}
            onOpenChange={setIsAddingGalleryCategory}
          >
            <DialogContent className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-800 dark:text-white">
              <DialogHeader>
                <DialogTitle className="text-amber-600 dark:text-gold">
                  {editingItemId
                    ? "Edit Gallery Category"
                    : "Add New Gallery Category"}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Category Name
                  </label>
                  <Input
                    value={newGalleryCategory.name}
                    onChange={(e) =>
                      setNewGalleryCategory({
                        ...newGalleryCategory,
                        name: e.target.value,
                      })
                    }
                    className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Category Slug
                  </label>
                  <Input
                    value={newGalleryCategory.slug}
                    onChange={(e) =>
                      setNewGalleryCategory({
                        ...newGalleryCategory,
                        slug: e.target.value,
                      })
                    }
                    className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                    placeholder="e.g., vip, atmosphere, bar"
                  />
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    Used for filtering gallery images. Use lowercase letters
                    without spaces.
                  </p>
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  className="border-gray-200 dark:border-gray-700"
                  onClick={() => {
                    setIsAddingGalleryCategory(false);
                    setEditingItemId(null);
                    setNewGalleryCategory({
                      name: "",
                      slug: "",
                    });
                  }}
                >
                  Cancel
                </Button>
                <Button
                  className="bg-amber-600 dark:bg-gold text-white dark:text-black"
                  onClick={() => {
                    if (editingItemId) {
                      updateGalleryCategory(editingItemId, newGalleryCategory);
                      toast({
                        title: "Category updated",
                        description:
                          "Gallery category has been updated successfully.",
                      });
                    } else {
                      handleAddGalleryCategory();
                    }
                    setEditingItemId(null);
                  }}
                >
                  {editingItemId ? "Update" : "Add"} Category
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Add/Edit Gallery Image Dialog */}
          <Dialog
            open={isAddingGalleryImage}
            onOpenChange={setIsAddingGalleryImage}
          >
            <DialogContent className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-800 dark:text-white">
              <DialogHeader>
                <DialogTitle className="text-amber-600 dark:text-gold">
                  {editingItemId
                    ? "Edit Gallery Image"
                    : "Add New Gallery Image"}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Image
                  </label>
                  <div className="flex items-center space-x-4">
                    <Input
                      value={newGalleryImage.image}
                      onChange={(e) =>
                        setNewGalleryImage({
                          ...newGalleryImage,
                          image: e.target.value,
                        })
                      }
                      className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                      placeholder="Image URL"
                    />
                    <label className="cursor-pointer">
                      <Button
                        variant="outline"
                        className="border-amber-600 text-amber-600 bg-white/40 dark:border-gold dark:text-gold dark:bg-black/40"
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          const input = e.currentTarget
                            .nextElementSibling as HTMLInputElement;
                          if (input) input.click();
                        }}
                      >
                        <Upload className="mr-2 h-4 w-4" />
                        Upload
                      </Button>
                      <input
                        type="file"
                        className="hidden"
                        onChange={(e) =>
                          handleFileUpload(e, (url) =>
                            setNewGalleryImage({
                              ...newGalleryImage,
                              image: url,
                            }),
                          )
                        }
                      />
                    </label>
                  </div>
                  {newGalleryImage.image && (
                    <div className="mt-2">
                      <img
                        src={newGalleryImage.image}
                        alt="Preview"
                        className="h-40 w-auto rounded-md object-cover"
                      />
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Caption
                  </label>
                  <Input
                    value={newGalleryImage.caption}
                    onChange={(e) =>
                      setNewGalleryImage({
                        ...newGalleryImage,
                        caption: e.target.value,
                      })
                    }
                    className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Category
                  </label>
                  <Select
                    value={newGalleryImage.category}
                    onValueChange={(value) =>
                      setNewGalleryImage({
                        ...newGalleryImage,
                        category: value,
                      })
                    }
                  >
                    <SelectTrigger className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700">
                      {(galleryCategoriesContent || []).map((category) => (
                        <SelectItem key={category.id} value={category.slug}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  className="border-gray-200 dark:border-gray-700"
                  onClick={() => {
                    setIsAddingGalleryImage(false);
                    setEditingItemId(null);
                    setNewGalleryImage({
                      image: "",
                      caption: "",
                      category: "",
                    });
                  }}
                >
                  Cancel
                </Button>
                <Button
                  className="bg-amber-600 dark:bg-gold text-white dark:text-black"
                  onClick={() => {
                    if (editingItemId) {
                      // Update existing image
                      updateGalleryImage(editingItemId, newGalleryImage);
                      toast({
                        title: "Image updated",
                        description:
                          "Gallery image has been updated successfully.",
                      });
                    } else {
                      handleAddGalleryImage();
                    }
                    setEditingItemId(null);
                    setIsAddingGalleryImage(false);
                  }}
                >
                  {editingItemId ? "Update" : "Add"} Image
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </TabsContent>

        {/* About Content */}
        <TabsContent value="about" className="space-y-6">
          <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
            <h2 className="text-xl font-bold mb-4 text-amber-600 dark:text-gold">
              About Section
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <Input
                  value={aboutContent.title}
                  onChange={(e) =>
                    setAboutContent({ ...aboutContent, title: e.target.value })
                  }
                  className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Description
                </label>
                <Textarea
                  value={aboutContent.description}
                  onChange={(e) =>
                    setAboutContent({
                      ...aboutContent,
                      description: e.target.value,
                    })
                  }
                  className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                  rows={5}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-4">
                  Team Members
                </label>
                <div className="space-y-4">
                  {aboutContent?.teamMembers?.map((member) => (
                    <div
                      key={member.id}
                      className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center"
                    >
                      <div className="w-12 h-12 mr-4 overflow-hidden rounded-full">
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-amber-600 dark:text-gold">
                          {member.name}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {member.role}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          variant="secondary"
                          size="sm"
                          className="text-white bg-blue-600"
                          onClick={() => {
                            setEditingItemId(member.id);
                            setNewTeamMember({
                              name: member.name,
                              role: member.role,
                              image: member.image,
                            });
                            setIsAddingTeamMember(true);
                          }}
                        >
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                        <Button
                          variant="secondary"
                          size="sm"
                          className="text-white bg-red-600"
                          onClick={() => {
                            deleteTeamMember(member.id);
                            toast({
                              title: "Team member deleted",
                              description:
                                "Team member has been removed successfully.",
                            });
                          }}
                        >
                          <Trash className="h-4 w-4 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  )) || []}
                  <Button
                    variant="outline"
                    className="w-full border-dashed border-amber-600/50 dark:border-gold/50 bg-white/40 dark:bg-black/40"
                    onClick={() => setIsAddingTeamMember(true)}
                  >
                    <Users className="mr-2 h-4 w-4" />
                    Add Team Member
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Add/Edit Team Member Dialog */}
          <Dialog
            open={isAddingTeamMember}
            onOpenChange={setIsAddingTeamMember}
          >
            <DialogContent className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-800 dark:text-white">
              <DialogHeader>
                <DialogTitle className="text-amber-600 dark:text-gold">
                  {editingItemId ? "Edit Team Member" : "Add New Team Member"}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Name</label>
                  <Input
                    value={newTeamMember.name}
                    onChange={(e) =>
                      setNewTeamMember({
                        ...newTeamMember,
                        name: e.target.value,
                      })
                    }
                    className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Role</label>
                  <Input
                    value={newTeamMember.role}
                    onChange={(e) =>
                      setNewTeamMember({
                        ...newTeamMember,
                        role: e.target.value,
                      })
                    }
                    className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Profile Image
                  </label>
                  <div className="flex items-center space-x-4">
                    <Input
                      value={newTeamMember.image}
                      onChange={(e) =>
                        setNewTeamMember({
                          ...newTeamMember,
                          image: e.target.value,
                        })
                      }
                      className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                      placeholder="Image URL or Avatar URL"
                    />
                    <label className="cursor-pointer">
                      <Button
                        variant="outline"
                        className="border-amber-600 text-amber-600 bg-white/40 dark:border-gold dark:text-gold dark:bg-black/40"
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          const input = e.currentTarget
                            .nextElementSibling as HTMLInputElement;
                          if (input) input.click();
                        }}
                      >
                        <Upload className="mr-2 h-4 w-4" />
                        Upload
                      </Button>
                      <input
                        type="file"
                        className="hidden"
                        onChange={(e) =>
                          handleFileUpload(e, (url) =>
                            setNewTeamMember({ ...newTeamMember, image: url }),
                          )
                        }
                      />
                    </label>
                  </div>
                  {newTeamMember.image && (
                    <div className="mt-2 flex justify-center">
                      <div className="w-20 h-20 rounded-full overflow-hidden">
                        <img
                          src={newTeamMember.image}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  className="border-gray-200 dark:border-gray-700"
                  onClick={() => {
                    setIsAddingTeamMember(false);
                    setEditingItemId(null);
                    setNewTeamMember({
                      name: "",
                      role: "",
                      image: "",
                    });
                  }}
                >
                  Cancel
                </Button>
                <Button
                  className="bg-amber-600 dark:bg-gold text-white dark:text-black"
                  onClick={() => {
                    if (editingItemId) {
                      updateTeamMember(editingItemId, newTeamMember);
                      toast({
                        title: "Team member updated",
                        description:
                          "Team member has been updated successfully.",
                      });
                    } else {
                      handleAddTeamMember();
                    }
                    setEditingItemId(null);
                    setIsAddingTeamMember(false);
                  }}
                >
                  {editingItemId ? "Update" : "Add"} Team Member
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </TabsContent>

        {/* Contact Content */}
        <TabsContent value="contact" className="space-y-6">
          <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
            <h2 className="text-xl font-bold mb-4 text-amber-600 dark:text-gold">
              Contact Information
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Address
                </label>
                <Input
                  value={contactContent.address}
                  onChange={(e) =>
                    setContactContent({
                      ...contactContent,
                      address: e.target.value,
                    })
                  }
                  className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Phone</label>
                <Input
                  value={contactContent.phone}
                  onChange={(e) =>
                    setContactContent({
                      ...contactContent,
                      phone: e.target.value,
                    })
                  }
                  className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <Input
                  value={contactContent.email}
                  onChange={(e) =>
                    setContactContent({
                      ...contactContent,
                      email: e.target.value,
                    })
                  }
                  className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                  type="email"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Hours</label>
                <Input
                  value={contactContent.hours}
                  onChange={(e) =>
                    setContactContent({
                      ...contactContent,
                      hours: e.target.value,
                    })
                  }
                  className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Map URL
                </label>
                <Input
                  value={contactContent.mapUrl}
                  onChange={(e) =>
                    setContactContent({
                      ...contactContent,
                      mapUrl: e.target.value,
                    })
                  }
                  className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                />
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Bottle Service Content */}
        <TabsContent value="bottleService" className="space-y-6">
          <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-amber-600 dark:text-gold">
                Bottle Service Packages
              </h2>
              <Button
                className="bg-amber-600 dark:bg-gold text-white dark:text-black"
                onClick={() => setIsAddingBottlePackage(true)}
              >
                <GlassWater className="mr-2 h-4 w-4" />
                Add Package
              </Button>
            </div>
            <div className="space-y-4">
              {bottleServiceContent?.map((package_) => (
                <div
                  key={package_.id}
                  className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 flex"
                >
                  <div className="w-24 h-24 mr-4 overflow-hidden rounded-md">
                    <img
                      src={package_.image}
                      alt={package_.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h3 className="font-bold text-amber-600 dark:text-gold">
                        {package_.name}
                      </h3>
                      <span className="text-amber-600 dark:text-gold font-bold">
                        {package_.price}
                      </span>
                    </div>
                    <p className="text-sm mt-1">{package_.description}</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      className="text-white bg-blue-600"
                      onClick={() => {
                        setEditingItemId(package_.id);
                        setNewBottlePackage({
                          name: package_.name,
                          price: package_.price,
                          description: package_.description,
                          image: package_.image,
                        });
                        setIsAddingBottlePackage(true);
                      }}
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      className="text-white bg-red-600"
                      onClick={() => {
                        deleteBottlePackage(package_.id);
                        toast({
                          title: "Package deleted",
                          description:
                            "Bottle service package has been removed successfully.",
                        });
                      }}
                    >
                      <Trash className="h-4 w-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
              )) || []}
            </div>
          </div>

          {/* Add/Edit Bottle Package Dialog */}
          <Dialog
            open={isAddingBottlePackage}
            onOpenChange={setIsAddingBottlePackage}
          >
            <DialogContent className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-800 dark:text-white">
              <DialogHeader>
                <DialogTitle className="text-amber-600 dark:text-gold">
                  {editingItemId
                    ? "Edit Bottle Package"
                    : "Add New Bottle Package"}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Package Name
                  </label>
                  <Input
                    value={newBottlePackage.name}
                    onChange={(e) =>
                      setNewBottlePackage({
                        ...newBottlePackage,
                        name: e.target.value,
                      })
                    }
                    className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Price
                  </label>
                  <Input
                    value={newBottlePackage.price}
                    onChange={(e) =>
                      setNewBottlePackage({
                        ...newBottlePackage,
                        price: e.target.value,
                      })
                    }
                    className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                    placeholder="e.g., $500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Description
                  </label>
                  <Textarea
                    value={newBottlePackage.description}
                    onChange={(e) =>
                      setNewBottlePackage({
                        ...newBottlePackage,
                        description: e.target.value,
                      })
                    }
                    className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                    rows={3}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Image
                  </label>
                  <div className="flex items-center space-x-4">
                    <Input
                      value={newBottlePackage.image}
                      onChange={(e) =>
                        setNewBottlePackage({
                          ...newBottlePackage,
                          image: e.target.value,
                        })
                      }
                      className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                      placeholder="Image URL"
                    />
                    <label className="cursor-pointer">
                      <Button
                        variant="outline"
                        className="border-amber-600 text-amber-600 bg-white/40 dark:border-gold dark:text-gold dark:bg-black/40"
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          const input = e.currentTarget
                            .nextElementSibling as HTMLInputElement;
                          if (input) input.click();
                        }}
                      >
                        <Upload className="mr-2 h-4 w-4" />
                        Upload
                      </Button>
                      <input
                        type="file"
                        className="hidden"
                        onChange={(e) =>
                          handleFileUpload(e, (url) =>
                            setNewBottlePackage({
                              ...newBottlePackage,
                              image: url,
                            }),
                          )
                        }
                      />
                    </label>
                  </div>
                  {newBottlePackage.image && (
                    <div className="mt-2">
                      <img
                        src={newBottlePackage.image}
                        alt="Preview"
                        className="h-20 w-auto rounded-md object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  className="border-gray-200 dark:border-gray-700"
                  onClick={() => {
                    setIsAddingBottlePackage(false);
                    setEditingItemId(null);
                    setNewBottlePackage({
                      name: "",
                      price: "",
                      description: "",
                      image: "",
                    });
                  }}
                >
                  Cancel
                </Button>
                <Button
                  className="bg-amber-600 dark:bg-gold text-white dark:text-black"
                  onClick={() => {
                    if (editingItemId) {
                      updateBottlePackage(editingItemId, newBottlePackage);
                      toast({
                        title: "Package updated",
                        description:
                          "Bottle service package has been updated successfully.",
                      });
                    } else {
                      handleAddBottlePackage();
                    }
                    setEditingItemId(null);
                    setIsAddingBottlePackage(false);
                  }}
                >
                  {editingItemId ? "Update" : "Add"} Package
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </TabsContent>

        {/* Navigation Bar Content */}
        <TabsContent value="navbar" className="space-y-6">
          <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-amber-600 dark:text-gold">
                Navigation Links
              </h2>
              <Button
                className="bg-amber-600 dark:bg-gold text-white dark:text-black"
                onClick={() => setIsAddingNavLink(true)}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Navigation Link
              </Button>
            </div>
            <div className="space-y-4">
              {navbarContent?.links?.map((link) => (
                <div
                  key={link.id}
                  className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 flex justify-between items-center"
                >
                  <div>
                    <h3 className="font-bold text-amber-600 dark:text-gold">
                      {link.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Path: {link.path}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      className="text-white bg-blue-600"
                      onClick={() => {
                        setEditingItemId(link.id);
                        setNewNavLink({
                          name: link.name,
                          path: link.path,
                        });
                        setIsAddingNavLink(true);
                      }}
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      className="text-white bg-red-600"
                      onClick={() => {
                        deleteNavLink(link.id);
                        toast({
                          title: "Navigation link deleted",
                          description: "Link has been removed successfully.",
                        });
                      }}
                    >
                      <Trash className="h-4 w-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
              )) || []}
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold mb-4 text-amber-600 dark:text-gold">
                Logo & Admin Button Settings
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Business Logo
                  </label>
                  <div className="flex items-center space-x-4">
                    <Input
                      value={navbarContent?.logo || ""}
                      onChange={(e) =>
                        setNavbarContent({
                          ...navbarContent,
                          logo: e.target.value,
                        })
                      }
                      className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                      placeholder="Logo URL"
                    />
                    <label className="cursor-pointer">
                      <Button
                        variant="outline"
                        className="border-amber-600 text-amber-600 bg-white/40 dark:border-gold dark:text-gold dark:bg-black/40"
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          const input = e.currentTarget
                            .nextElementSibling as HTMLInputElement;
                          if (input) input.click();
                        }}
                      >
                        <Upload className="mr-2 h-4 w-4" />
                        Upload
                      </Button>
                      <input
                        type="file"
                        className="hidden"
                        onChange={(e) =>
                          handleImageUpload(e, (url) =>
                            setNavbarContent({
                              ...navbarContent,
                              logo: url,
                            }),
                          )
                        }
                      />
                    </label>
                  </div>
                  {navbarContent?.logo && (
                    <div className="mt-2">
                      <img
                        src={navbarContent.logo}
                        alt="Logo Preview"
                        className="h-12 w-auto rounded-md object-contain bg-gray-100 dark:bg-gray-800 p-2"
                      />
                    </div>
                  )}
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    This logo will appear in the navigation bar. Recommended
                    size: 150x50px.
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Admin Button Text
                  </label>
                  <Input
                    value={navbarContent?.adminButtonText || "Admin"}
                    onChange={(e) =>
                      setNavbarContent({
                        ...navbarContent,
                        adminButtonText: e.target.value,
                      })
                    }
                    className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Add/Edit Navigation Link Dialog */}
          <Dialog open={isAddingNavLink} onOpenChange={setIsAddingNavLink}>
            <DialogContent className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-800 dark:text-white">
              <DialogHeader>
                <DialogTitle className="text-amber-600 dark:text-gold">
                  {editingItemId
                    ? "Edit Navigation Link"
                    : "Add New Navigation Link"}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Link Text
                  </label>
                  <Input
                    value={newNavLink.name}
                    onChange={(e) =>
                      setNewNavLink({
                        ...newNavLink,
                        name: e.target.value,
                      })
                    }
                    className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Link Path
                  </label>
                  <Input
                    value={newNavLink.path}
                    onChange={(e) =>
                      setNewNavLink({
                        ...newNavLink,
                        path: e.target.value,
                      })
                    }
                    className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                    placeholder="e.g., / or #about"
                  />
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    Use "/" for home page or "#section-name" for page sections
                  </p>
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  className="border-gray-200 dark:border-gray-700"
                  onClick={() => {
                    setIsAddingNavLink(false);
                    setEditingItemId(null);
                    setNewNavLink({
                      name: "",
                      path: "",
                    });
                  }}
                >
                  Cancel
                </Button>
                <Button
                  className="bg-amber-600 dark:bg-gold text-white dark:text-black"
                  onClick={() => {
                    if (editingItemId) {
                      updateNavLink(editingItemId, newNavLink);
                      toast({
                        title: "Navigation link updated",
                        description: "Link has been updated successfully.",
                      });
                    } else {
                      handleAddNavLink();
                    }
                    setEditingItemId(null);
                  }}
                >
                  {editingItemId ? "Update" : "Add"} Link
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </TabsContent>

        {/* Footer Content */}
        <TabsContent value="footer" className="space-y-6">
          <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-amber-600 dark:text-gold">
                Social Media Links
              </h2>
              <Button
                className="bg-amber-600 dark:bg-gold text-white dark:text-black"
                onClick={() => setIsAddingSocialLink(true)}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Social Link
              </Button>
            </div>
            <div className="space-y-4 mb-8">
              {footerContent?.socialLinks?.map((link) => (
                <div
                  key={link.id}
                  className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 flex justify-between items-center"
                >
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full border border-amber-500 flex items-center justify-center mr-4">
                      {link.platform.toLowerCase() === "facebook" && (
                        <Facebook className="h-5 w-5 text-amber-600 dark:text-gold" />
                      )}
                      {link.platform.toLowerCase() === "instagram" && (
                        <Instagram className="h-5 w-5 text-amber-600 dark:text-gold" />
                      )}
                      {link.platform.toLowerCase() === "twitter" && (
                        <Twitter className="h-5 w-5 text-amber-600 dark:text-gold" />
                      )}
                      {!["facebook", "instagram", "twitter"].includes(
                        link.platform.toLowerCase(),
                      ) && (
                        <ExternalLink className="h-5 w-5 text-amber-600 dark:text-gold" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-bold text-amber-600 dark:text-gold">
                        {link.platform}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {link.url}
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      className="text-white bg-blue-600"
                      onClick={() => {
                        setEditingItemId(link.id);
                        setNewSocialLink({
                          platform: link.platform,
                          url: link.url,
                        });
                        setIsAddingSocialLink(true);
                      }}
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      className="text-white bg-red-600"
                      onClick={() => {
                        deleteSocialLink(link.id);
                        toast({
                          title: "Social link deleted",
                          description: "Link has been removed successfully.",
                        });
                      }}
                    >
                      <Trash className="h-4 w-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
              )) || []}
            </div>

            <div className="flex justify-between items-center mb-4 mt-8 pt-4 border-t border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold text-amber-600 dark:text-gold">
                Quick Links
              </h2>
              <Button
                className="bg-amber-600 dark:bg-gold text-white dark:text-black"
                onClick={() => setIsAddingQuickLink(true)}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Quick Link
              </Button>
            </div>
            <div className="space-y-4 mb-8">
              {footerContent?.quickLinks?.map((link) => (
                <div
                  key={link.id}
                  className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 flex justify-between items-center"
                >
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full border border-amber-500 flex items-center justify-center mr-4">
                      <LinkIcon className="h-4 w-4 text-amber-600 dark:text-gold" />
                    </div>
                    <div>
                      <h3 className="font-bold text-amber-600 dark:text-gold">
                        {link.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Path: {link.path}
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      className="text-white bg-blue-600"
                      onClick={() => {
                        setEditingItemId(link.id);
                        setNewQuickLink({
                          name: link.name,
                          path: link.path,
                        });
                        setIsAddingQuickLink(true);
                      }}
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      className="text-white bg-red-600"
                      onClick={() => {
                        deleteQuickLink(link.id);
                        toast({
                          title: "Quick link deleted",
                          description: "Link has been removed successfully.",
                        });
                      }}
                    >
                      <Trash className="h-4 w-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
              )) || []}
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold mb-4 text-amber-600 dark:text-gold">
                Footer Settings
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Footer Logo
                  </label>
                  <div className="flex items-center space-x-4">
                    <Input
                      value={footerContent?.logo || ""}
                      onChange={(e) =>
                        setFooterContent({
                          ...footerContent,
                          logo: e.target.value,
                        })
                      }
                      className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                      placeholder="Logo URL"
                    />
                    <label className="cursor-pointer">
                      <Button
                        variant="outline"
                        className="border-amber-600 text-amber-600 bg-white/40 dark:border-gold dark:text-gold dark:bg-black/40"
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          const input = e.currentTarget
                            .nextElementSibling as HTMLInputElement;
                          if (input) input.click();
                        }}
                      >
                        <Upload className="mr-2 h-4 w-4" />
                        Upload
                      </Button>
                      <input
                        type="file"
                        className="hidden"
                        onChange={(e) =>
                          handleImageUpload(e, (url) =>
                            setFooterContent({
                              ...footerContent,
                              logo: url,
                            }),
                          )
                        }
                      />
                    </label>
                  </div>
                  {footerContent?.logo && (
                    <div className="mt-2">
                      <img
                        src={footerContent.logo}
                        alt="Logo Preview"
                        className="h-12 w-auto rounded-md object-contain bg-gray-100 dark:bg-gray-800 p-2"
                      />
                    </div>
                  )}
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    This logo will appear in the footer. Recommended size:
                    150x50px.
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">
                    Enable Newsletter Signup
                  </label>
                  <div
                    className={`w-12 h-6 rounded-full flex items-center p-1 cursor-pointer transition-colors ${footerContent?.newsletterEnabled ? "bg-amber-600 dark:bg-gold" : "bg-gray-300 dark:bg-gray-700"}`}
                    onClick={() =>
                      setFooterContent({
                        ...footerContent,
                        newsletterEnabled: !footerContent?.newsletterEnabled,
                      })
                    }
                  >
                    <div
                      className={`w-4 h-4 rounded-full bg-white transform transition-transform ${footerContent?.newsletterEnabled ? "translate-x-6" : "translate-x-0"}`}
                    ></div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Copyright Text
                  </label>
                  <Input
                    value={footerContent?.copyrightText || ""}
                    onChange={(e) =>
                      setFooterContent({
                        ...footerContent,
                        copyrightText: e.target.value,
                      })
                    }
                    className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                    placeholder="© 2023 Dvanity Night Club. All rights reserved."
                  />
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    Use {new Date().getFullYear()} for the current year
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Add/Edit Social Link Dialog */}
          <Dialog
            open={isAddingSocialLink}
            onOpenChange={setIsAddingSocialLink}
          >
            <DialogContent className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-800 dark:text-white">
              <DialogHeader>
                <DialogTitle className="text-amber-600 dark:text-gold">
                  {editingItemId
                    ? "Edit Social Media Link"
                    : "Add New Social Media Link"}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Platform
                  </label>
                  <Select
                    value={newSocialLink.platform}
                    onValueChange={(value) =>
                      setNewSocialLink({
                        ...newSocialLink,
                        platform: value,
                      })
                    }
                  >
                    <SelectTrigger className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                      <SelectValue placeholder="Select a platform" />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700">
                      <SelectItem value="Facebook">Facebook</SelectItem>
                      <SelectItem value="Instagram">Instagram</SelectItem>
                      <SelectItem value="Twitter">Twitter</SelectItem>
                      <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                      <SelectItem value="YouTube">YouTube</SelectItem>
                      <SelectItem value="TikTok">TikTok</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">URL</label>
                  <Input
                    value={newSocialLink.url}
                    onChange={(e) =>
                      setNewSocialLink({
                        ...newSocialLink,
                        url: e.target.value,
                      })
                    }
                    className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                    placeholder="https://"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  className="border-gray-200 dark:border-gray-700"
                  onClick={() => {
                    setIsAddingSocialLink(false);
                    setEditingItemId(null);
                    setNewSocialLink({
                      platform: "",
                      url: "",
                    });
                  }}
                >
                  Cancel
                </Button>
                <Button
                  className="bg-amber-600 dark:bg-gold text-white dark:text-black"
                  onClick={() => {
                    if (editingItemId) {
                      updateSocialLink(editingItemId, newSocialLink);
                      toast({
                        title: "Social link updated",
                        description: "Link has been updated successfully.",
                      });
                    } else {
                      handleAddSocialLink();
                    }
                    setEditingItemId(null);
                  }}
                >
                  {editingItemId ? "Update" : "Add"} Link
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Add/Edit Quick Link Dialog */}
          <Dialog open={isAddingQuickLink} onOpenChange={setIsAddingQuickLink}>
            <DialogContent className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-800 dark:text-white">
              <DialogHeader>
                <DialogTitle className="text-amber-600 dark:text-gold">
                  {editingItemId ? "Edit Quick Link" : "Add New Quick Link"}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Link Text
                  </label>
                  <Input
                    value={newQuickLink.name}
                    onChange={(e) =>
                      setNewQuickLink({
                        ...newQuickLink,
                        name: e.target.value,
                      })
                    }
                    className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Link Path
                  </label>
                  <Input
                    value={newQuickLink.path}
                    onChange={(e) =>
                      setNewQuickLink({
                        ...newQuickLink,
                        path: e.target.value,
                      })
                    }
                    className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                    placeholder="e.g., #about"
                  />
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    Use "#section-name" for page sections
                  </p>
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  className="border-gray-200 dark:border-gray-700"
                  onClick={() => {
                    setIsAddingQuickLink(false);
                    setEditingItemId(null);
                    setNewQuickLink({
                      name: "",
                      path: "",
                    });
                  }}
                >
                  Cancel
                </Button>
                <Button
                  className="bg-amber-600 dark:bg-gold text-white dark:text-black"
                  onClick={() => {
                    if (editingItemId) {
                      updateQuickLink(editingItemId, newQuickLink);
                      toast({
                        title: "Quick link updated",
                        description: "Link has been updated successfully.",
                      });
                    } else {
                      handleAddQuickLink();
                    }
                    setEditingItemId(null);
                  }}
                >
                  {editingItemId ? "Update" : "Add"} Link
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </TabsContent>
      </Tabs>

      {/* Preview Dialog */}
      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="bg-white dark:bg-black border border-gray-200 dark:border-gold text-gray-800 dark:text-white max-w-4xl max-h-[80vh] overflow-auto">
          <DialogHeader>
            <DialogTitle className="text-amber-600 dark:text-gold">
              Content Preview
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
              <h3 className="text-lg font-bold text-amber-600 dark:text-gold mb-2">
                Preview of{" "}
                {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Section
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                This is a preview of how your content will appear on the
                website.
              </p>

              {/* Preview content based on active tab */}
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 min-h-[300px]">
                {activeTab === "hero" && (
                  <div className="text-center">
                    <h1 className="text-3xl font-bold text-amber-600 dark:text-gold mb-2">
                      {heroContent.title}
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300 mb-4">
                      {heroContent.subtitle}
                    </p>
                    {heroContent.videoUrl && (
                      <div className="mt-4 bg-gray-50 dark:bg-gray-900 p-2 rounded">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Video URL: {heroContent.videoUrl}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === "events" && (
                  <div className="space-y-4">
                    {eventsContent?.map((event) => (
                      <div
                        key={event.id}
                        className="flex items-center space-x-4 border-b border-gray-200 dark:border-gray-700 pb-4"
                      >
                        <img
                          src={event.image}
                          alt={event.title}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div>
                          <h3 className="font-bold text-amber-600 dark:text-gold">
                            {event.title}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {event.date}
                          </p>
                          <p className="text-sm text-gray-700 dark:text-gray-300">
                            {event.description}
                          </p>
                        </div>
                      </div>
                    )) || []}
                  </div>
                )}

                {activeTab === "gallery" && (
                  <div className="grid grid-cols-3 gap-2">
                    {galleryContent?.map((image) => (
                      <div key={image.id} className="">
                        <img
                          src={image.image}
                          alt={image.caption}
                          className="w-full h-24 object-cover rounded"
                        />
                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 truncate">
                          {image.caption}
                        </p>
                      </div>
                    )) || []}
                  </div>
                )}

                {activeTab === "about" && (
                  <div>
                    <h2 className="text-xl font-bold text-amber-600 dark:text-gold mb-2">
                      {aboutContent.title}
                    </h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      {aboutContent.description}
                    </p>
                    <h3 className="text-lg font-semibold text-amber-600 dark:text-gold mb-2">
                      Team
                    </h3>
                    <div className="flex space-x-4">
                      {aboutContent?.teamMembers?.map((member) => (
                        <div key={member.id} className="text-center">
                          <img
                            src={member.image}
                            alt={member.name}
                            className="w-12 h-12 rounded-full mx-auto"
                          />
                          <p className="text-sm font-medium text-gray-800 dark:text-white mt-1">
                            {member.name}
                          </p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            {member.role}
                          </p>
                        </div>
                      )) || []}
                    </div>
                  </div>
                )}

                {activeTab === "contact" && (
                  <div className="space-y-3">
                    <div>
                      <h3 className="font-semibold text-amber-600 dark:text-gold">
                        Address:
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300">
                        {contactContent.address}
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-amber-600 dark:text-gold">
                        Phone:
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300">
                        {contactContent.phone}
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-amber-600 dark:text-gold">
                        Email:
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300">
                        {contactContent.email}
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-amber-600 dark:text-gold">
                        Hours:
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300">
                        {contactContent.hours}
                      </p>
                    </div>
                  </div>
                )}

                {activeTab === "bottleService" && (
                  <div className="space-y-4">
                    {bottleServiceContent?.map((pkg) => (
                      <div
                        key={pkg.id}
                        className="flex items-center space-x-4 border-b border-gray-200 dark:border-gray-700 pb-4"
                      >
                        <img
                          src={pkg.image}
                          alt={pkg.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <h3 className="font-bold text-amber-600 dark:text-gold">
                              {pkg.name}
                            </h3>
                            <span className="text-amber-600 dark:text-gold">
                              {pkg.price}
                            </span>
                          </div>
                          <p className="text-sm text-gray-700 dark:text-gray-300">
                            {pkg.description}
                          </p>
                        </div>
                      </div>
                    )) || []}
                  </div>
                )}

                {activeTab === "navbar" && (
                  <div className="space-y-4">
                    {navbarContent?.logo && (
                      <div className="mb-4">
                        <span className="font-medium">Logo:</span>
                        <div className="mt-2 bg-gray-100 dark:bg-gray-800 p-2 rounded flex justify-center">
                          <img
                            src={navbarContent.logo}
                            alt="Logo"
                            className="h-10 object-contain"
                          />
                        </div>
                      </div>
                    )}
                    <div className="flex items-center justify-between bg-gray-100 dark:bg-gray-800 p-2 rounded">
                      <span className="font-medium">Navigation Links:</span>
                      <span className="text-sm">
                        {navbarContent?.links?.length || 0} links
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {navbarContent?.links?.map((link) => (
                        <div
                          key={link.id}
                          className="bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 px-3 py-1 rounded-full text-sm"
                        >
                          {link.name}
                        </div>
                      )) || []}
                    </div>
                    <div className="mt-2">
                      <span className="font-medium">Admin Button:</span>
                      <span className="ml-2 bg-amber-600 dark:bg-gold text-white dark:text-black px-2 py-1 rounded text-xs">
                        {navbarContent?.adminButtonText || "Admin"}
                      </span>
                    </div>
                  </div>
                )}

                {activeTab === "footer" && (
                  <div className="space-y-4">
                    {footerContent?.logo && (
                      <div className="mb-4">
                        <span className="font-semibold text-amber-600 dark:text-gold mb-2">
                          Logo:
                        </span>
                        <div className="mt-2 bg-gray-100 dark:bg-gray-800 p-2 rounded flex justify-center">
                          <img
                            src={footerContent.logo}
                            alt="Footer Logo"
                            className="h-10 object-contain"
                          />
                        </div>
                      </div>
                    )}
                    <div>
                      <h3 className="font-semibold text-amber-600 dark:text-gold mb-2">
                        Social Links:
                      </h3>
                      <div className="flex gap-2">
                        {footerContent?.socialLinks?.map((link) => (
                          <div
                            key={link.id}
                            className="w-8 h-8 rounded-full bg-amber-600/20 dark:bg-gold/20 flex items-center justify-center"
                          >
                            {link.platform.toLowerCase() === "facebook" && (
                              <Facebook className="h-4 w-4 text-amber-600 dark:text-gold" />
                            )}
                            {link.platform.toLowerCase() === "instagram" && (
                              <Instagram className="h-4 w-4 text-amber-600 dark:text-gold" />
                            )}
                            {link.platform.toLowerCase() === "twitter" && (
                              <Twitter className="h-4 w-4 text-amber-600 dark:text-gold" />
                            )}
                            {!["facebook", "instagram", "twitter"].includes(
                              link.platform.toLowerCase(),
                            ) && (
                              <ExternalLink className="h-4 w-4 text-amber-600 dark:text-gold" />
                            )}
                          </div>
                        )) || []}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-amber-600 dark:text-gold mb-2">
                        Quick Links:
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {footerContent?.quickLinks?.map((link) => (
                          <div
                            key={link.id}
                            className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-xs"
                          >
                            {link.name}
                          </div>
                        )) || []}
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div>
                        <span className="font-medium">Newsletter:</span>
                        <span
                          className={`ml-2 px-2 py-0.5 rounded text-xs ${footerContent?.newsletterEnabled ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"}`}
                        >
                          {footerContent?.newsletterEnabled
                            ? "Enabled"
                            : "Disabled"}
                        </span>
                      </div>
                      <div>
                        <span className="font-medium">Copyright:</span>
                        <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                          {footerContent?.copyrightText ||
                            "© All rights reserved."}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              className="border-amber-600 text-amber-600 bg-white/40 dark:border-gold dark:text-gold dark:bg-black/40"
              onClick={() => setShowPreview(false)}
            >
              Close
            </Button>
            <Button
              className="bg-amber-600 dark:bg-gold text-white dark:text-black"
              onClick={handlePublish}
            >
              Publish Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ContentManager;
