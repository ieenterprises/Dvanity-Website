import React, { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";

interface HeroSectionProps {
  videoSrc?: string;
  title?: string;
  tagline?: string;
  ctaText?: string;
  onCtaClick?: () => void;
}

const HeroSection = ({
  videoSrc = "https://www.youtube.com/embed/UzswywOA1qU?si=3ysTlaHhKToQonD9&autoplay=1&mute=1&loop=1&playlist=UzswywOA1qU&controls=0&showinfo=0&rel=0",
  title = "DVANITY",
  tagline = "LUXURY NIGHTLIFE EXPERIENCE",
  ctaText = "RESERVE NOW",
  onCtaClick = () => console.log("CTA clicked"),
}: HeroSectionProps) => {
  // Function to determine if the video source is a YouTube embed link
  const isYouTubeEmbed = useMemo(() => {
    return (
      typeof videoSrc === "string" &&
      (videoSrc.includes("youtube.com/embed/") ||
        (videoSrc.includes("<iframe") && videoSrc.includes("youtube.com")))
    );
  }, [videoSrc]);

  // Extract YouTube embed URL from iframe string if needed and ensure autoplay parameters
  const getYouTubeEmbedUrl = useMemo(() => {
    if (!videoSrc || typeof videoSrc !== "string") return null;

    let url = videoSrc;

    // If it's an iframe string, extract the src attribute
    if (url.includes("<iframe") && url.includes('src="')) {
      const srcMatch = url.match(/src=\"([^\"]+)\"/i);
      url = srcMatch ? srcMatch[1] : null;
      if (!url) return null;
    }

    // Ensure the URL has necessary parameters for autoplay and looping
    if (url.includes("youtube.com/embed/")) {
      // Parse the URL to separate the base and parameters
      const [baseUrl, existingParams] = url.split("?");
      const params = new URLSearchParams(existingParams || "");

      // Set required parameters if they don't exist
      if (!params.has("autoplay")) params.set("autoplay", "1");
      if (!params.has("mute")) params.set("mute", "1");
      if (!params.has("loop")) params.set("loop", "1");

      // For looping to work, we need the playlist parameter with the video ID
      if (!params.has("playlist")) {
        const videoId = baseUrl.split("/").pop();
        if (videoId) params.set("playlist", videoId);
      }

      // Additional parameters for better experience
      if (!params.has("controls")) params.set("controls", "0");
      if (!params.has("showinfo")) params.set("showinfo", "0");
      if (!params.has("rel")) params.set("rel", "0");

      // Add a timestamp to prevent caching issues
      params.set("_t", new Date().getTime().toString());

      return `${baseUrl}?${params.toString()}`;
    }

    return url;
  }, [videoSrc]);

  return (
    <section className="relative h-[800px] w-full overflow-hidden bg-black">
      {/* Video Background with Fallback */}
      <div className="absolute inset-0 z-0">
        {isYouTubeEmbed && getYouTubeEmbedUrl ? (
          <div className="relative w-full h-full">
            <iframe
              className="absolute top-0 left-0 w-full h-full object-cover"
              src={getYouTubeEmbedUrl}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              key={getYouTubeEmbedUrl} // Force re-render when URL changes
            ></iframe>
          </div>
        ) : videoSrc ? (
          <video
            className="h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            poster="https://images.unsplash.com/photo-1566737236500-c8ac43014a67?w=1200&q=80"
          >
            <source src={videoSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <div
            className="h-full w-full bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1566737236500-c8ac43014a67?w=1200&q=80')",
            }}
          />
        )}
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
        <div className="animate-fadeIn">
          <h1 className="mb-4 font-serif text-7xl font-bold tracking-wider text-white md:text-8xl lg:text-9xl">
            <span className="text-amber-400">{title}</span>
          </h1>
          <p className="mb-8 text-xl font-light tracking-widest text-white md:text-2xl">
            {tagline}
          </p>
          <div className="flex items-center justify-center space-x-4">
            <Button
              onClick={() => {
                const contactSection = document.getElementById("contact");
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: "smooth" });
                } else if (onCtaClick) {
                  onCtaClick();
                }
              }}
              className="border-2 border-amber-400 bg-amber-400 px-8 py-6 text-lg font-semibold text-black"
            >
              {ctaText}
            </Button>
            <Button
              variant="ghost"
              className="flex items-center space-x-2 text-amber-400"
              onClick={() => {
                // Extract video ID from the embed URL
                const videoIdMatch = videoSrc.match(/\/embed\/([^?]+)/);
                const videoId = videoIdMatch ? videoIdMatch[1] : "UzswywOA1qU";
                window.open(
                  `https://www.youtube.com/watch?v=${videoId}`,
                  "_blank",
                );
              }}
            >
              <Play className="h-5 w-5" />
              <span>Watch Teaser</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Animated scroll indicator */}
      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 animate-bounce">
        <div className="h-14 w-8 rounded-full border-2 border-amber-400">
          <div className="mt-2 h-3 w-3 animate-pulse rounded-full bg-amber-400 mx-auto" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
