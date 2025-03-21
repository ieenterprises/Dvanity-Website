import React, { useState, useEffect } from "react";
import { Calendar, Clock, MapPin, Users } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useContent } from "@/context/ContentContext";

interface Event {
  id: string;
  title: string;
  date: string;
  description: string;
  image: string;
  time?: string;
  location?: string;
  category?: string;
  capacity?: number;
}

interface EventsSectionProps {
  events?: Event[];
}

const defaultEvents: Event[] = [
  {
    id: "1",
    title: "DJ Midnight Sensation",
    date: "FRI, OCT 15",
    time: "10:00 PM - 3:00 AM",
    description:
      "Experience the electrifying beats of DJ Midnight Sensation as they take over our main floor for a night of unforgettable music.",
    image:
      "https://images.unsplash.com/photo-1571600097567-920df4a97ace?w=800&q=80",
    location: "Main Floor",
    category: "music",
    capacity: 300,
  },
  {
    id: "2",
    title: "VIP Bottle Service Night",
    date: "SAT, OCT 16",
    time: "9:00 PM - 3:00 AM",
    description:
      "Indulge in our premium bottle service experience with exclusive VIP treatment and the best views of the dance floor.",
    image:
      "https://images.unsplash.com/photo-1575444758702-4a6b9222336e?w=800&q=80",
    location: "VIP Lounge",
    category: "vip",
    capacity: 100,
  },
  {
    id: "3",
    title: "Industry Night",
    date: "MON, OCT 18",
    time: "8:00 PM - 2:00 AM",
    description:
      "A special night dedicated to our industry friends with exclusive drink specials and networking opportunities.",
    image:
      "https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?w=800&q=80",
    location: "Entire Venue",
    category: "special",
    capacity: 250,
  },
];

const EventsSection: React.FC<EventsSectionProps> = ({
  events = defaultEvents,
}) => {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [activeTab, setActiveTab] = useState("all");
  const { content } = useContent();

  // Use content from context if available
  const [displayEvents, setDisplayEvents] = useState<Event[]>(events);
  const [categories, setCategories] = useState<
    { id: string; name: string; slug: string }[]
  >([]);

  useEffect(() => {
    if (content?.events && content.events.length > 0) {
      setDisplayEvents(content.events);
    }

    if (content?.eventCategories && content.eventCategories.length > 0) {
      setCategories(content.eventCategories);
    }
  }, [content]);

  const filteredEvents =
    activeTab === "all"
      ? displayEvents
      : displayEvents.filter((event) => event.category === activeTab);

  return (
    <section className="py-16 bg-white dark:bg-black transition-colors duration-200">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-amber-600 dark:text-gold mb-4">
            Upcoming Events
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Join us for unforgettable nights featuring world-class DJs,
            exclusive parties, and premium experiences.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          <Button
            onClick={() => setActiveTab("all")}
            variant={activeTab === "all" ? "default" : "outline"}
            className={cn(
              "border-amber-600 dark:border-gold-500",
              activeTab === "all"
                ? "bg-amber-600 dark:bg-gold-500 text-white dark:text-black"
                : "text-amber-600 dark:text-gold-500 bg-amber-600/10 dark:bg-gold-500/10",
            )}
          >
            All Events
          </Button>
          <Button
            onClick={() => setActiveTab("music")}
            variant={activeTab === "music" ? "default" : "outline"}
            className={cn(
              "border-amber-600 dark:border-gold-500",
              activeTab === "music"
                ? "bg-amber-600 dark:bg-gold-500 text-white dark:text-black"
                : "text-amber-600 dark:text-gold-500 bg-amber-600/10 dark:bg-gold-500/10",
            )}
          >
            Music
          </Button>
          <Button
            onClick={() => setActiveTab("vip")}
            variant={activeTab === "vip" ? "default" : "outline"}
            className={cn(
              "border-amber-600 dark:border-gold-500",
              activeTab === "vip"
                ? "bg-amber-600 dark:bg-gold-500 text-white dark:text-black"
                : "text-amber-600 dark:text-gold-500 bg-amber-600/10 dark:bg-gold-500/10",
            )}
          >
            VIP
          </Button>
          <Button
            onClick={() => setActiveTab("special")}
            variant={activeTab === "special" ? "default" : "outline"}
            className={cn(
              "border-amber-600 dark:border-gold-500",
              activeTab === "special"
                ? "bg-amber-600 dark:bg-gold-500 text-white dark:text-black"
                : "text-amber-600 dark:text-gold-500 bg-amber-600/10 dark:bg-gold-500/10",
            )}
          >
            Special
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map((event) => (
            <Card
              key={event.id}
              className="overflow-hidden border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 transition-colors duration-200"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-amber-600 dark:text-gold">
                  {event.title}
                </CardTitle>
                <CardDescription className="flex items-center text-gray-600 dark:text-gray-400">
                  <Calendar className="h-4 w-4 mr-1" />
                  {event.date}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300 line-clamp-3">
                  {event.description}
                </p>

                {event.time && (
                  <div className="flex items-center mt-3 text-gray-600 dark:text-gray-400">
                    <Clock className="h-4 w-4 mr-2" />
                    <span className="text-sm">{event.time}</span>
                  </div>
                )}

                {event.location && (
                  <div className="flex items-center mt-2 text-gray-600 dark:text-gray-400">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span className="text-sm">{event.location}</span>
                  </div>
                )}

                {event.capacity && (
                  <div className="flex items-center mt-2 text-gray-600 dark:text-gray-400">
                    <Users className="h-4 w-4 mr-2" />
                    <span className="text-sm">Capacity: {event.capacity}</span>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      className="w-full bg-amber-600 hover:bg-amber-700 dark:bg-gold dark:hover:bg-gold/90 text-white dark:text-black"
                      onClick={() => setSelectedEvent(event)}
                    >
                      View Details
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 text-gray-800 dark:text-white">
                    <DialogHeader>
                      <DialogTitle className="text-amber-600 dark:text-gold text-2xl">
                        {selectedEvent?.title}
                      </DialogTitle>
                      <DialogDescription className="text-gray-600 dark:text-gray-400 flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {selectedEvent?.date}
                      </DialogDescription>
                    </DialogHeader>

                    <div className="mt-4">
                      <img
                        src={selectedEvent?.image}
                        alt={selectedEvent?.title}
                        className="w-full h-64 object-cover rounded-md"
                      />

                      <div className="mt-4 space-y-3">
                        <p className="text-gray-700 dark:text-gray-300">
                          {selectedEvent?.description}
                        </p>

                        <div className="grid grid-cols-2 gap-4 mt-4">
                          {selectedEvent?.time && (
                            <div className="flex items-center text-gray-600 dark:text-gray-400">
                              <Clock className="h-5 w-5 mr-2" />
                              <span>{selectedEvent.time}</span>
                            </div>
                          )}

                          {selectedEvent?.location && (
                            <div className="flex items-center text-gray-600 dark:text-gray-400">
                              <MapPin className="h-5 w-5 mr-2" />
                              <span>{selectedEvent.location}</span>
                            </div>
                          )}

                          {selectedEvent?.capacity && (
                            <div className="flex items-center text-gray-600 dark:text-gray-400">
                              <Users className="h-5 w-5 mr-2" />
                              <span>Capacity: {selectedEvent.capacity}</span>
                            </div>
                          )}

                          {selectedEvent?.category && (
                            <div className="flex items-center">
                              <span className="px-3 py-1 bg-amber-100 dark:bg-gold/20 text-amber-600 dark:text-gold rounded-full text-sm">
                                {categories.find(
                                  (c) => c.slug === selectedEvent.category,
                                )?.name || selectedEvent.category}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="mt-6">
                      <Button className="w-full bg-amber-600 hover:bg-amber-700 dark:bg-gold dark:hover:bg-gold/90 text-white dark:text-black">
                        Reserve Now
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
