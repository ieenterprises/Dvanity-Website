/**
 * Utility for handling image uploads
 * In a real application, this would connect to a storage service
 * For this demo, we'll use URL.createObjectURL to handle file uploads
 */

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
// In a real app, this would upload to a server/cloud storage
export const uploadImage = async (file: File): Promise<string> => {
  try {
    // For demo purposes, we'll just convert to a data URL
    // In a real app, you would upload to a server and get back a URL
    const dataUrl = await fileToDataUrl(file);
    return dataUrl;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw new Error("Failed to upload image");
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
