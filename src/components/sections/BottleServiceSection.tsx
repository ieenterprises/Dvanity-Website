import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Wine, Star, Users, DollarSign, GlassWater } from "lucide-react";

interface BottlePackage {
  id: string;
  name: string;
  price: string;
  description: string;
  includes: string[];
  image: string;
  featured?: boolean;
}

interface BottleServiceSectionProps {
  title?: string;
  subtitle?: string;
  packages?: BottlePackage[];
}

const BottleServiceSection = ({
  title = "Exclusive Bottle Service",
  subtitle = "Elevate your night with our premium bottle service packages",
  packages = [
    {
      id: "silver",
      name: "Silver Package",
      price: "$350",
      description:
        "Perfect for small groups looking to enjoy premium spirits in style.",
      includes: [
        "1 Premium Bottle",
        "VIP Seating (4 guests)",
        "Mixers Included",
        "Dedicated Server",
      ],
      image:
        "https://images.unsplash.com/photo-1605270012917-bf157c5a9541?w=600&q=80",
    },
    {
      id: "gold",
      name: "Gold Package",
      price: "$650",
      description:
        "Our most popular package for those seeking the complete VIP experience.",
      includes: [
        "2 Premium Bottles",
        "VIP Booth (6 guests)",
        "Mixers & Garnishes",
        "Dedicated Server",
        "Priority Entry",
      ],
      image:
        "https://images.unsplash.com/photo-1605270012917-bf157c5a9541?w=600&q=80",
      featured: true,
    },
    {
      id: "platinum",
      name: "Platinum Package",
      price: "$1,200",
      description:
        "The ultimate luxury nightlife experience with exclusive perks and premium service.",
      includes: [
        "3 Premium Bottles",
        "Premium VIP Booth (8 guests)",
        "Mixers & Garnishes",
        "Dedicated Server & Security",
        "Priority Entry",
        "Complimentary Champagne Toast",
      ],
      image:
        "https://images.unsplash.com/photo-1605270012917-bf157c5a9541?w=600&q=80",
    },
    {
      id: "diamond",
      name: "Diamond Package",
      price: "$2,500",
      description:
        "For those who demand nothing but the absolute best. Our most exclusive offering.",
      includes: [
        "5 Premium Bottles",
        "Elite VIP Area (12 guests)",
        "Premium Mixers & Garnishes",
        "Personal Hostess & Security",
        "Express Entry",
        "Complimentary Champagne & Hors d'oeuvres",
      ],
      image:
        "https://images.unsplash.com/photo-1605270012917-bf157c5a9541?w=600&q=80",
    },
  ],
}: BottleServiceSectionProps) => {
  return (
    <section className="w-full py-20 bg-black text-white" id="bottle-service">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gold-500">
            {title}
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">{subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {packages.map((pkg) => (
            <Card
              key={pkg.id}
              className={cn(
                "bg-gray-900 border-gray-800 overflow-hidden h-full flex flex-col",
                pkg.featured ? "border-gold-500 ring-2 ring-gold-500/20" : "",
              )}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={pkg.image}
                  alt={pkg.name}
                  className="w-full h-full object-cover"
                />
                {pkg.featured && (
                  <div className="absolute top-4 right-4 bg-gold-500 text-black text-xs font-bold px-3 py-1 rounded-full flex items-center">
                    <Star className="w-3 h-3 mr-1" />
                    MOST POPULAR
                  </div>
                )}
              </div>

              <CardHeader className="border-b border-gray-800">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl text-gold-500">
                      {pkg.name}
                    </CardTitle>
                    <CardDescription className="text-gray-400 mt-1">
                      {pkg.description}
                    </CardDescription>
                  </div>
                  <div className="text-2xl font-bold text-gold-500">
                    {pkg.price}
                  </div>
                </div>
              </CardHeader>

              <CardContent className="flex-grow py-6">
                <h4 className="text-sm uppercase tracking-wider text-gray-400 mb-4 flex items-center">
                  <GlassWater className="w-4 h-4 mr-2" />
                  Package Includes:
                </h4>
                <ul className="space-y-3">
                  {pkg.includes.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <div className="mr-3 mt-1 text-gold-500">
                        {item.includes("Bottle") ? (
                          <Wine className="w-4 h-4" />
                        ) : item.includes("guests") ? (
                          <Users className="w-4 h-4" />
                        ) : (
                          <DollarSign className="w-4 h-4" />
                        )}
                      </div>
                      <span className="text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter className="pt-4 border-t border-gray-800">
                <Button className="w-full bg-gold-500 text-black">
                  Reserve Now
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
            All packages require advance reservation. Prices do not include tax
            and gratuity. Special requests and custom packages available upon
            inquiry.
          </p>
          <Button
            variant="outline"
            className="border-gold-500 text-gold-500 bg-gold-500/10"
          >
            Contact for Custom Packages
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BottleServiceSection;
