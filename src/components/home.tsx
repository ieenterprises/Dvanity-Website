import React from "react";
import EventsSection from "./sections/EventsSection";
import GallerySection from "./sections/GallerySection";
import AboutSection from "./sections/AboutSection";
import ContactSection from "./sections/ContactSection";
import BottleServiceSection from "./sections/BottleServiceSection";
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";
import { useContent } from "@/context/ContentContext";
import YouTubeHeroDemo from "@/tempobook/storyboards/15d92a90-f680-4787-9d7a-23419d9e3195";

const Home = () => {
  // Get content from context
  const { content } = useContent();

  return (
    <div className="bg-black min-h-screen">
      {/* Navbar */}
      <Navbar transparent={true} />

      {/* YouTube Hero Section */}
      <YouTubeHeroDemo />

      {/* Events Calendar Section */}
      <EventsSection events={content.events} />

      {/* Photo Gallery Section */}
      <GallerySection images={content.gallery} />

      {/* About Section */}
      <AboutSection
        title={content.about.title}
        description={content.about.description}
        teamMembers={content.about.teamMembers.map((member) => ({
          name: member.name,
          role: member.role,
          image: member.image,
          bio: "Team member at Dvanity Night Club",
        }))}
      />

      {/* Contact & Reservation Section */}
      <ContactSection
        contactInfo={{
          address: content.contact.address,
          phone: content.contact.phone,
          email: content.contact.email,
          hours: [
            {
              days: content.contact.hours.split(":")[0] || "Thursday - Sunday",
              time: content.contact.hours.split(":")[1] || "10:00 PM - 3:00 AM",
            },
          ],
        }}
      />

      {/* Bottle Service Section */}
      <BottleServiceSection
        packages={content.bottleService.map((pkg) => ({
          id: pkg.id,
          name: pkg.name,
          price: pkg.price,
          description: pkg.description,
          image: pkg.image,
          includes: pkg.description.split(",").map((item) => item.trim()),
        }))}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
