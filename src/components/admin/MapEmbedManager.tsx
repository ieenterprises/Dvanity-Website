import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useContent } from "@/context/ContentContext";
import { toast } from "@/components/ui/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const MapEmbedManager = () => {
  const { content, updateContact } = useContent();
  const [mapUrl, setMapUrl] = useState<string>(content.contact.mapUrl || "");
  const [isPreviewVisible, setIsPreviewVisible] = useState<boolean>(true);

  // Extract src URL from iframe code if needed
  useEffect(() => {
    if (mapUrl.includes('<iframe') && mapUrl.includes('src="')) {
      const srcMatch = mapUrl.match(/src=\"([^\"]+)\"/i);
      if (srcMatch && srcMatch[1]) {
        setMapUrl(srcMatch[1]);
      }
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    // If user pastes an iframe tag, extract the src URL
    if (value.includes('<iframe') && value.includes('src="')) {
      const srcMatch = value.match(/src=\"([^\"]+)\"/i);
      if (srcMatch && srcMatch[1]) {
        console.log("Extracted URL:", srcMatch[1]);
        setMapUrl(srcMatch[1]);
        return;
      }
    }
    
    setMapUrl(value);
  };

  const handleSave = () => {
    // Make sure the URL is properly formatted
    let finalUrl = mapUrl;
    
    // If it's not a complete URL with https://, add it
    if (finalUrl && !finalUrl.startsWith('http')) {
      finalUrl = 'https://' + finalUrl;
    }
    
    updateContact({
      ...content.contact,
      mapUrl: finalUrl,
    });
    toast({
      title: "Map URL updated",
      description: "The map URL has been updated successfully.",
    });
  };

  const handlePreviewToggle = () => {
    setIsPreviewVisible(!isPreviewVisible);
  };

  return (
    <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
      <CardHeader>
        <CardTitle className="text-amber-600 dark:text-gold">
          Google Maps Location
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="mapUrl">Google Maps URL or Embed Code</Label>
          <Input
            id="mapUrl"
            value={mapUrl}
            onChange={handleInputChange}
            placeholder="https://goo.gl/maps/example or paste iframe code"
            className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700"
          />
          <p className="text-sm text-gray-500 dark:text-gray-400">
            You can either:
            <br />1. Go to Google Maps, search for your location, click "Share" > "Embed a map" and paste the entire iframe code here.
            <br />2. Or just paste the Google Maps URL directly.
          </p>
        </div>

        <div className="flex space-x-2">
          <Button
            onClick={handleSave}
            className="bg-amber-600 dark:bg-gold text-white dark:text-black"
          >
            Save Map Location
          </Button>
          <Button
            variant="outline"
            onClick={handlePreviewToggle}
            className="border-amber-600/50 dark:border-gold/50 text-amber-600 dark:text-gold"
          >
            {isPreviewVisible ? "Hide Preview" : "Show Preview"}
          </Button>
        </div>

        {isPreviewVisible && (
          <div className="mt-4">
            <Label>Map Preview</Label>
            <div className="mt-2 h-64 w-full rounded-lg overflow-hidden border border-gray-300 dark:border-gray-700">
              {mapUrl ? (
                <iframe
                  src={mapUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              ) : (
                <div className="flex items-center justify-center h-full w-full bg-gray-200 dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                  <p>Enter a Google Maps URL to see preview</p>
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MapEmbedManager;
