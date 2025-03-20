import React from "react";
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
  videoSrc = "/club-video-background.mp4",
  title = "DVANITY",
  tagline = "LUXURY NIGHTLIFE EXPERIENCE",
  ctaText = "RESERVE NOW",
  onCtaClick = () => console.log("CTA clicked"),
}: HeroSectionProps) => {
  return (
    <section className="relative h-[800px] w-full overflow-hidden bg-black">
      {/* Video Background with Fallback */}
      <div className="absolute inset-0 z-0">
        {videoSrc ? (
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
              onClick={onCtaClick}
              className="border-2 border-amber-400 bg-amber-400 px-8 py-6 text-lg font-semibold text-black"
            >
              {ctaText}
            </Button>
            <Button
              variant="ghost"
              className="flex items-center space-x-2 text-amber-400"
              onClick={() => console.log("Watch video clicked")}
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
