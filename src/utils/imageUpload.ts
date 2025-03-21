import { supabase } from "@/lib/supabase";

// Function to convert a File to a data URL
export const fileToDataUrl = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

// Function to upload an image and return a URL
export const uploadImage = async (file: File): Promise<string> => {
  try {
    // For production, use Supabase Storage
    if (import.meta.env.VITE_SUPABASE_URL) {
      // Create a unique file name
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
      const filePath = `business-logos/${fileName}`;

      // Upload the file to Supabase Storage
      const { data, error } = await supabase.storage
        .from("images")
        .upload(filePath, file);

      if (error) {
        console.error("Error uploading to Supabase Storage:", error);
        // Fall back to data URL method
        return fileToDataUrl(file);
      }

      // Get the public URL
      const { data: urlData } = supabase.storage
        .from("images")
        .getPublicUrl(filePath);
      return urlData.publicUrl;
    } else {
      // For demo purposes, we'll just convert to a data URL
      return fileToDataUrl(file);
    }
  } catch (error) {
    console.error("Error in uploadImage:", error);
    // Fall back to data URL method
    return fileToDataUrl(file);
  }
};

// Function to validate file before upload
export const validateImage = (file: File): boolean => {
  // Check file size (max 5MB)
  const maxSize = 5 * 1024 * 1024; // 5MB
  if (file.size > maxSize) {
    return false;
  }

  return true;
};

// Function to upload any file and return a URL
export const uploadFile = async (file: File): Promise<string> => {
  try {
    // For demo purposes, we'll just convert to a data URL
    // In a real app, you would upload to a server and get back a URL
    const dataUrl = await fileToDataUrl(file);
    return dataUrl;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw new Error("Failed to upload file");
  }
};
