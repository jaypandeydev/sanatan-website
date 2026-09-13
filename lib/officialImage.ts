// lib/officialImage.ts

export const officialPlaceholderImg = "/images/officials/placeholder.png";

/**
 * imagePath is either a full Cloudinary URL (uploads made after the Vercel
 * migration) or a bare filename left over from when uploads were written to
 * public/images/officials on the old VPS.
 */
export function officialImageSrc(imagePath?: string | null) {
  if (!imagePath) return officialPlaceholderImg;
  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) return imagePath;
  return `/images/officials/${imagePath}`;
}
