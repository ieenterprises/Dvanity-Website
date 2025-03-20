import React, { useState, useEffect } from "react";
import { Calendar, Clock, MapPin, Users } from "lucide-react";
import { format } from "date-fns";

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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
    location: "Main Floor",
    description:
      "Experience the electrifying beats of DJ Midnight Sensation as they take over our main floor for a night of unforgettable house music.",
    image:
      "https://images.unsplash.com/photo-1571397133301-3f1b6ae00227?w=800&q=80",
    category: "music",
    capacity: 300,
  },
  {
    id: "2",
    title: "VIP Bottle Service Night",
    date: "SAT, OCT 16",
    time: "9:00 PM - 2:00 AM",
    location: "VIP Lounge",
    description:
      "Indulge in our premium bottle service experience with exclusive access to our VIP lounge and personal service throughout the night.",
    image:
      "https://images.unsplash.com/photo-1575444758702-4a6b9222336e?w=800&q=80",
    category: "vip",
    capacity: 100,
  },
];

const EventsSection: React.FC<EventsSectionProps> = ({
  events = defaultEvents,
}) => {
  const { content } = useContent();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [categories, setCategories] = useState<
    { id: string; name: string; slug: string }[]
  >([]);

  useEffect(() => {
    if (content.eventCategories && content.eventCategories.length > 0) {
      setCategories(content.eventCategories);
    }
  }, [content.eventCategories]);

  // Add default properties to events if missing
  const processedEvents =
    events?.map((event) => ({
      ...event,
      time: event.time || "10:00 PM - 3:00 AM",
      location: event.location || "Main Floor",
      category: event.category || ("special" as "music" | "vip" | "special"),
      capacity: event.capacity || 250,
    })) || [];

  const filteredEvents =
    selectedCategory === "all"
      ? processedEvents
      : processedEvents.filter((event) => event.category === selectedCategory);

  return (
    <section className="py-16 bg-black text-white" id="events">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-gold">Upcoming Events</h2>
          <p className="text-lg max-w-2xl mx-auto text-gray-300">
            Experience unforgettable nights at Dvanity with our curated events
            featuring world-class DJs, exclusive parties, and special themed
            nights.
          </p>
        </div>

        <Tabs defaultValue="all" className="w-full mb-8">
          <div className="flex justify-center">
            <TabsList className="bg-gray-900 border border-gold/30">
              <TabsTrigger
                value="all"
                onClick={() => setSelectedCategory("all")}
                className="border-gold-500 text-gold-500 bg-gold-500/10 data-[state=active]:bg-gold-500 data-[state=active]:text-black"
              >
                All Events
              </TabsTrigger>
              {categories.map((category) => (
                <TabsTrigger
                  key={category.id}
                  value={category.slug}
                  onClick={() => setSelectedCategory(category.slug)}
                  className="border-gold-500 text-gold-500 bg-gold-500/10 data-[state=active]:bg-gold-500 data-[state=active]:text-black"
                >
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <TabsContent value="all" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredEvents.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  onClick={() => setSelectedEvent(event)}
                />
              ))}
            </div>
          </TabsContent>
          {categories.map((category) => (
            <TabsContent
              key={category.id}
              value={category.slug}
              className="mt-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredEvents.map((event) => (
                  <EventCard
                    key={event.id}
                    event={event}
                    onClick={() => setSelectedEvent(event)}
                  />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {selectedEvent && (
          <EventDetailsDialog
            event={selectedEvent}
            open={!!selectedEvent}
            onClose={() => setSelectedEvent(null)}
          />
        )}
      </div>
    </section>
  );
};

interface EventCardProps {
  event: Event;
  onClick: () => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, onClick = () => {} }) => {
  return (
    <Card className="bg-gray-900 border border-gold overflow-hidden">
      <div className="relative h-48 overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-0 right-0 bg-gold text-black px-3 py-1 text-sm font-semibold">
          {event.category?.toUpperCase() || "SPECIAL"}
        </div>
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl text-gold">{event.title}</CardTitle>
        <CardDescription className="text-gray-400 flex items-center gap-2">
          <Calendar className="h-4 w-4" /> {event.date}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-center gap-2 text-gray-300">
          <Clock className="h-4 w-4 text-gold/70" /> {event.time}
        </div>
        <div className="flex items-center gap-2 text-gray-300">
          <MapPin className="h-4 w-4 text-gold/70" /> {event.location}
        </div>
        <div className="flex items-center gap-2 text-gray-300">
          <Users className="h-4 w-4 text-gold/70" /> Capacity: {event.capacity}
        </div>
        <p className="text-gray-400 line-clamp-2 mt-2">{event.description}</p>
      </CardContent>
      <CardFooter>
        <Button onClick={onClick} className="w-full bg-gold text-black">
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};

interface EventDetailsDialogProps {
  event: Event;
  open: boolean;
  onClose: () => void;
}

const EventDetailsDialog: React.FC<EventDetailsDialogProps> = ({
  event,
  open = false,
  onClose = () => {},
}) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-gray-900 border border-gold/30 max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl text-gold">
            {event.title}
          </DialogTitle>
          <DialogDescription className="text-gray-300">
            {event.date} • {event.time}
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <div className="overflow-hidden rounded-lg">
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <h4 className="text-lg font-semibold text-gold">Location</h4>
              <p className="text-gray-300">{event.location}</p>
            </div>

            <div className="space-y-2">
              <h4 className="text-lg font-semibold text-gold">Capacity</h4>
              <p className="text-gray-300">{event.capacity} guests</p>
            </div>

            <div className="space-y-2">
              <h4 className="text-lg font-semibold text-gold">Description</h4>
              <p className="text-gray-300">{event.description}</p>
            </div>

            <Button className="w-full bg-gold text-black mt-4">
              Reserve Now
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EventsSection;
