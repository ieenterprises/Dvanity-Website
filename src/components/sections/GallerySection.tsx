import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useContent } from "@/context/ContentContext";

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category?: string;
}

interface GallerySectionProps {
  title?: string;
  description?: string;
  images?: GalleryImage[];
  categories?: string[];
}

const GallerySection = ({
  title = "Photo Gallery",
  description = "Experience the electrifying atmosphere of Dvanity Night Club through our gallery.",
  images = [
    {
      id: "1",
      src: "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?w=800&q=80",
      alt: "Nightclub atmosphere with colorful lights",
      category: "Atmosphere",
    },
    {
      id: "2",
      src: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=80",
      alt: "DJ performing at night club",
      category: "Events",
    },
    {
      id: "3",
      src: "https://images.unsplash.com/photo-1545128485-c400ce7b6892?w=800&q=80",
      alt: "Crowd dancing at night club",
      category: "Events",
    },
    {
      id: "4",
      src: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80",
      alt: "VIP section with bottle service",
      category: "VIP",
    },
    {
      id: "5",
      src: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80",
      alt: "Bartender mixing cocktails",
      category: "Bar",
    },
    {
      id: "6",
      src: "https://images.unsplash.com/photo-1556035511-3168381ea4d4?w=800&q=80",
      alt: "Night club interior design",
      category: "Atmosphere",
    },
    {
      id: "7",
      src: "https://images.unsplash.com/photo-1438557068880-c5f474830377?w=800&q=80",
      alt: "Special event with performers",
      category: "Events",
    },
    {
      id: "8",
      src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80",
      alt: "Guests enjoying VIP experience",
      category: "VIP",
    },
    {
      id: "9",
      src: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=800&q=80",
      alt: "Nightclub lighting and effects",
      category: "Atmosphere",
    },
  ],
  categories = ["All", "Atmosphere", "Events", "VIP", "Bar"],
}: GallerySectionProps) => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const { content } = useContent();
  const [dynamicCategories, setDynamicCategories] = useState<string[]>(["All"]);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>(images);

  useEffect(() => {
    if (content.galleryCategories && content.galleryCategories.length > 0) {
      // Create array with "All" as first option, then add all category names
      const cats = ["All", ...content.galleryCategories.map((cat) => cat.name)];
      setDynamicCategories(cats);
    } else {
      setDynamicCategories(categories);
    }

    // Map content gallery images to the format expected by this component
    if (content.gallery && content.gallery.length > 0) {
      const mappedImages = content.gallery.map((img) => ({
        id: img.id,
        src: img.image,
        alt: img.caption,
        category: img.category
          ? content.galleryCategories.find((cat) => cat.slug === img.category)
              ?.name || img.category
          : undefined,
      }));
      setGalleryImages(mappedImages);
    }
  }, [content.galleryCategories, content.gallery, categories, images]);

  const filteredImages =
    selectedCategory === "All"
      ? galleryImages
      : galleryImages.filter((image) => image.category === selectedCategory);

  return (
    <section
      className="w-full py-16 bg-white dark:bg-black text-black dark:text-white"
      id="gallery"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-amber-600 dark:text-gold-500">
            {title}
          </h2>
          <p className="text-lg max-w-3xl mx-auto text-gray-700 dark:text-gray-300">
            {description}
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {dynamicCategories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className={cn(
                "border-amber-600 dark:border-gold-500",
                selectedCategory === category
                  ? "bg-amber-600 dark:bg-gold-500 text-white dark:text-black"
                  : "text-amber-600 dark:text-gold-500 bg-amber-600/10 dark:bg-gold-500/10",
              )}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredImages.map((image) => (
            <Dialog key={image.id}>
              <DialogTrigger asChild>
                <div
                  className="relative overflow-hidden rounded-lg cursor-pointer h-64 shadow-md"
                  onClick={() => setSelectedImage(image)}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-end justify-start p-4">
                    <span className="text-white text-sm font-medium">
                      {image.alt}
                    </span>
                  </div>
                </div>
              </DialogTrigger>
              <DialogContent className="max-w-4xl bg-white dark:bg-black border border-amber-600 dark:border-gold-500 p-0">
                <div className="relative">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-auto max-h-[80vh] object-contain"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-white dark:bg-black bg-opacity-70 dark:bg-opacity-70 p-4">
                    <p className="text-black dark:text-white text-lg">
                      {image.alt}
                    </p>
                    {image.category && (
                      <span className="inline-block mt-2 px-3 py-1 bg-amber-600 dark:bg-gold-500 text-white dark:text-black text-xs font-medium rounded-full">
                        {image.category}
                      </span>
                    )}
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>

        {filteredImages.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400">
              No images found in this category.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default GallerySection;
