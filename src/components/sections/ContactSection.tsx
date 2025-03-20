import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { MapPin, Phone, Clock, Mail, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface ContactFormValues {
  name: string;
  email: string;
  phone: string;
  date: string;
  guests: string;
  message: string;
}

interface ContactSectionProps {
  contactInfo?: {
    address: string;
    phone: string;
    email: string;
    hours: {
      days: string;
      time: string;
    }[];
  };
}

const ContactSection = ({
  contactInfo = {
    address: "123 Nightclub Avenue, Los Angeles, CA 90001",
    phone: "+1 (555) 123-4567",
    email: "reservations@dvanity.com",
    hours: [
      { days: "Thursday - Friday", time: "10:00 PM - 2:00 AM" },
      { days: "Saturday", time: "10:00 PM - 3:00 AM" },
      { days: "Sunday", time: "9:00 PM - 1:00 AM" },
    ],
  },
}: ContactSectionProps) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const form = useForm<ContactFormValues>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      date: "",
      guests: "",
      message: "",
    },
  });

  const onSubmit = (data: ContactFormValues) => {
    console.log("Form submitted:", data);
    // Here you would typically send the data to your backend
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 5000);
    form.reset();
  };

  return (
    <section
      id="contact"
      className="bg-white dark:bg-black text-black dark:text-white py-20 px-4 md:px-8 lg:px-16"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-amber-600 dark:text-gold-500 bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-amber-700 dark:from-yellow-400 dark:to-yellow-600">
            Contact & Reservations
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            Reserve your table, bottle service, or inquire about private events
            at Dvanity Night Club.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="bg-gray-100 dark:bg-gray-900 p-8 rounded-lg border border-amber-600/30 dark:border-yellow-600/30 shadow-lg shadow-amber-600/10 dark:shadow-yellow-600/10">
            <h3 className="text-2xl font-bold mb-6 text-amber-600 dark:text-yellow-500">
              Club Information
            </h3>

            <div className="space-y-6">
              <div className="flex items-start">
                <MapPin className="h-6 w-6 text-amber-600 dark:text-yellow-500 mr-4 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-lg">Location</h4>
                  <p className="text-gray-700 dark:text-gray-300">
                    {contactInfo.address}
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <Phone className="h-6 w-6 text-amber-600 dark:text-yellow-500 mr-4 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-lg">Phone</h4>
                  <p className="text-gray-700 dark:text-gray-300">
                    {contactInfo.phone}
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <Mail className="h-6 w-6 text-amber-600 dark:text-yellow-500 mr-4 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-lg">Email</h4>
                  <p className="text-gray-700 dark:text-gray-300">
                    {contactInfo.email}
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <Clock className="h-6 w-6 text-amber-600 dark:text-yellow-500 mr-4 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-lg">Hours</h4>
                  <div className="text-gray-700 dark:text-gray-300">
                    {contactInfo.hours.map((item, index) => (
                      <div key={index} className="flex justify-between mb-1">
                        <span>{item.days}</span>
                        <span>{item.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="mt-8 h-64 bg-gray-200 dark:bg-gray-800 rounded-lg overflow-hidden">
              <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-800 text-gray-500">
                <p>Interactive Map Coming Soon</p>
                {/* In a real implementation, you would embed a Google Maps or similar here */}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-gray-100 dark:bg-gray-900 p-8 rounded-lg border border-amber-600/30 dark:border-yellow-600/30 shadow-lg shadow-amber-600/10 dark:shadow-yellow-600/10">
            <h3 className="text-2xl font-bold mb-6 text-amber-600 dark:text-yellow-500">
              Make a Reservation
            </h3>

            {isSubmitted ? (
              <div className="bg-green-100/30 dark:bg-green-900/30 border border-green-500 text-green-700 dark:text-green-300 p-4 rounded-md mb-6">
                <p className="font-medium">
                  Thank you for your reservation request!
                </p>
                <p className="text-sm mt-1">
                  Our team will contact you shortly to confirm your reservation.
                </p>
              </div>
            ) : null}

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-black dark:text-white">
                          Full Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="John Doe"
                            className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-black dark:text-white"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-black dark:text-white">
                          Email
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="you@example.com"
                            className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-black dark:text-white"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-black dark:text-white">
                          Phone Number
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="(555) 123-4567"
                            className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-black dark:text-white"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-black dark:text-white">
                          Preferred Date
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="date"
                            className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-black dark:text-white"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="guests"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-black dark:text-white">
                        Number of Guests
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="4"
                          className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-black dark:text-white"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-black dark:text-white">
                        Special Requests
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell us about any special requests or questions..."
                          className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-black dark:text-white min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-amber-500 to-amber-600 dark:from-yellow-500 dark:to-yellow-600 text-white dark:text-black font-bold py-3 rounded-md flex items-center justify-center"
                >
                  <Send className="mr-2 h-5 w-5" />
                  Submit Reservation Request
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
