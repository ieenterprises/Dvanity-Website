import React, { useEffect } from "react";
import { MapPin, Phone, Clock, Mail, MessageSquare } from "lucide-react";

// Add TypeScript interface for the Tawk global variables
declare global {
  interface Window {
    Tawk_API?: any;
    Tawk_LoadStart?: Date;
  }
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
    mapEmbed?: string;
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
  useEffect(() => {
    // Initialize Tawk.to chat widget
    window.Tawk_API = window.Tawk_API || {};
    window.Tawk_LoadStart = new Date();

    const s1 = document.createElement("script");
    const s0 = document.getElementsByTagName("script")[0];

    s1.async = true;
    s1.src = "https://embed.tawk.to/67dd45e522662b190d7b8c8c/1ims5i2gb";
    s1.charset = "UTF-8";
    s1.setAttribute("crossorigin", "*");

    if (s0 && s0.parentNode) {
      s0.parentNode.insertBefore(s1, s0);
    } else if (document.head) {
      document.head.appendChild(s1);
    }

    // Cleanup function
    return () => {
      // Remove the script if component unmounts
      if (s1 && s1.parentNode) {
        s1.parentNode.removeChild(s1);
      }
    };
  }, []);

  return (
    <section
      id="contact"
      className="bg-white dark:bg-black text-black dark:text-white py-20 px-4 md:px-8 lg:px-16"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-amber-600 dark:text-gold-500 bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-amber-700 dark:from-yellow-400 dark:to-yellow-600">
            Contact Us
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            Get in touch with us about bottle service, private events, or any
            questions about Dvanity Night Club.
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
                  <div className="text-gray-700 dark:text-gray-300 mb-4">
                    <div className="flex justify-between mb-1">
                      <span>Thursday - Sunday</span>
                      <span>10PM - 4AM</span>
                    </div>
                  </div>

                  {/* Google Maps Embed */}
                  <div className="mt-4 h-64 w-full rounded-lg overflow-hidden">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3975.5259108695736!2d6.9824023100838835!3d4.851136840315694!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1069cffe76437983%3A0x37593fa830d66a52!2sD'Vanity%20Premium%20Club!5e0!3m2!1sen!2sng!4v1742579318332!5m2!1sen!2sng"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Live Chat Information */}
          <div className="bg-gray-100 dark:bg-gray-900 p-8 rounded-lg border border-amber-600/30 dark:border-yellow-600/30 shadow-lg shadow-amber-600/10 dark:shadow-yellow-600/10">
            <h3 className="text-2xl font-bold mb-6 text-amber-600 dark:text-yellow-500">
              Live Chat Support
            </h3>

            <div className="flex items-start mb-6">
              <MessageSquare className="h-6 w-6 text-amber-600 dark:text-yellow-500 mr-4 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-lg">Chat With Us</h4>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Our team is available to assist you with reservations, bottle
                  service, private events, or any questions you might have about
                  Dvanity Night Club.
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  Use the chat widget in the corner of your screen to start a
                  conversation with our team.
                </p>
              </div>
            </div>

            <div className="bg-amber-100 dark:bg-amber-900/30 border border-amber-500 text-amber-700 dark:text-amber-300 p-4 rounded-md">
              <p className="font-medium">Looking for immediate assistance?</p>
              <p className="text-sm mt-1">
                Our live chat representatives are available during business
                hours to help with your inquiries.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
