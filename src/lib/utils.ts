import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function optimizeImage(url: string | undefined | null, width = 800) {
  if (!url) return "";
  if (!url.includes("cloudinary.com")) return url;

  // Start with auto format and quality
  let params = "f_auto,q_auto";

  if (width) {
    params += `,w_${width}`;
  }

  // Insert params after /upload/ if not already present (basic check)
  if (url.includes("/upload/") && !url.includes("f_auto")) {
    return url.replace("/upload/", `/upload/${params}/`);
  }

  return url;
}
