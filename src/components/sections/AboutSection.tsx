import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface TeamMemberProps {
  name: string;
  role: string;
  image: string;
  bio: string;
}

const TeamMember = ({
  name = "John Doe",
  role = "Club Manager",
  image = "https://api.dicebear.com/7.x/avataaars/svg?seed=nightclub",
  bio = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl.",
}: TeamMemberProps) => {
  return (
    <div className="flex flex-col items-center p-6 bg-white dark:bg-black border border-amber-600/20 dark:border-gold/20 rounded-lg shadow-md">
      <div className="w-32 h-32 mx-auto mb-4 overflow-hidden rounded-full border-2 border-amber-600 dark:border-gold">
        <img src={image} alt={name} className="w-full h-full object-cover" />
      </div>
      <h3 className="text-xl font-bold text-amber-600 dark:text-gold mb-1">
        {name}
      </h3>
      <p className="text-sm text-amber-600/70 dark:text-gold/70 mb-3">{role}</p>
      <p className="text-gray-700 dark:text-gray-300 text-center text-sm">
        {bio}
      </p>
    </div>
  );
};

interface AboutSectionProps {
  title?: string;
  subtitle?: string;
  description?: string;
  history?: string;
  mission?: string;
  teamMembers?: TeamMemberProps[];
}

const AboutSection = ({
  title = "About Dvanity",
  subtitle = "The Premier Nightlife Experience",
  description = "Dvanity Night Club is the epitome of luxury nightlife, offering an unparalleled experience in the heart of the city. Our venue combines elegant design, state-of-the-art sound systems, and exceptional service to create unforgettable nights.",
  history = "Founded in 2015, Dvanity quickly established itself as the go-to destination for celebrities, influencers, and nightlife enthusiasts. Our journey began with a vision to create a space where luxury meets entertainment, and we've been setting the standard for nightlife excellence ever since.",
  mission = "Our mission is to provide an extraordinary nightlife experience that transcends the ordinary. We are committed to creating a safe, inclusive environment where guests can enjoy premium entertainment, exceptional service, and unforgettable moments.",
  teamMembers = [
    {
      name: "Alexander Reynolds",
      role: "Founder & CEO",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex",
      bio: "With over 15 years in the hospitality industry, Alex has transformed the nightlife scene with his innovative approach and commitment to excellence.",
    },
    {
      name: "Sophia Martinez",
      role: "Creative Director",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=sophia",
      bio: "Sophia brings her artistic vision and industry expertise to create immersive experiences that define Dvanity's unique atmosphere.",
    },
    {
      name: "Marcus Johnson",
      role: "Head of Operations",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=marcus",
      bio: "Marcus ensures that every night at Dvanity runs flawlessly, overseeing all operational aspects with precision and care.",
    },
    {
      name: "Olivia Chen",
      role: "Events Manager",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=olivia",
      bio: "Olivia curates our exceptional event lineup, bringing the hottest DJs and most exciting performances to our venue.",
    },
  ],
}: AboutSectionProps) => {
  return (
    <section
      id="about"
      className="py-20 bg-black dark:bg-black bg-white text-black dark:text-white"
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-amber-600 dark:text-gold mb-4">
            {title}
          </h2>
          <p className="text-xl text-amber-600/70 dark:text-gold/70 mb-8">
            {subtitle}
          </p>
          <div className="w-24 h-1 bg-amber-600 dark:bg-gold mx-auto"></div>
        </div>

        {/* Main Description */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            {description}
          </p>
        </div>

        {/* History and Mission */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          <div className="bg-gray-100/80 dark:bg-gray-900/50 p-8 rounded-lg border border-amber-600/20 dark:border-gold/20">
            <h3 className="text-2xl font-bold text-amber-600 dark:text-gold mb-4">
              Our History
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {history}
            </p>
          </div>
          <div className="bg-gray-100/80 dark:bg-gray-900/50 p-8 rounded-lg border border-amber-600/20 dark:border-gold/20">
            <h3 className="text-2xl font-bold text-amber-600 dark:text-gold mb-4">
              Our Mission
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {mission}
            </p>
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-amber-600 dark:text-gold text-center mb-12">
            Meet Our Team
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <TeamMember key={index} {...member} />
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="text-xl text-gray-700 dark:text-gray-300 mb-6">
            Experience the luxury and excitement of Dvanity Night Club
          </p>
          <Button
            variant="outline"
            className="border-amber-600 dark:border-gold text-amber-600 dark:text-gold bg-amber-600/10 dark:bg-gold/10 text-lg px-8 py-3"
          >
            Reserve Your Table
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
