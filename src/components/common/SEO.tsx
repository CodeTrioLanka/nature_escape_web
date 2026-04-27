import { useEffect } from "react";

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogType?: string;
  ogImage?: string;
}

const SEO = ({ 
  title, 
  description, 
  canonical, 
  ogType = "website", 
  ogImage = "/src/assets/nature-escape-logo.png" 
}: SEOProps) => {
  const siteName = "Nature Escape";
  const fullTitle = title ? `${title} | ${siteName}` : siteName;
  const defaultDescription = "Discover pristine beaches, ancient rainforests, and exotic wildlife with Nature Escape. Your adventure into Sri Lanka and Maldives nature begins here.";

  useEffect(() => {
    // Update title
    document.title = fullTitle;

    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", description || defaultDescription);
    } else {
      metaDescription = document.createElement("meta");
      metaDescription.setAttribute("name", "description");
      metaDescription.setAttribute("content", description || defaultDescription);
      document.head.appendChild(metaDescription);
    }

    // Update Open Graph tags
    const updateOgTag = (property: string, content: string) => {
      let tag = document.querySelector(`meta[property="${property}"]`);
      if (tag) {
        tag.setAttribute("content", content);
      } else {
        tag = document.createElement("meta");
        tag.setAttribute("property", property);
        tag.setAttribute("content", content);
        document.head.appendChild(tag);
      }
    };

    updateOgTag("og:title", fullTitle);
    updateOgTag("og:description", description || defaultDescription);
    updateOgTag("og:type", ogType);
    updateOgTag("og:image", ogImage);

    // Update Canonical link
    if (canonical) {
      let linkCanonical = document.querySelector('link[rel="canonical"]');
      if (linkCanonical) {
        linkCanonical.setAttribute("href", canonical);
      } else {
        linkCanonical = document.createElement("link");
        linkCanonical.setAttribute("rel", "canonical");
        linkCanonical.setAttribute("href", canonical);
        document.head.appendChild(linkCanonical);
      }
    }
  }, [fullTitle, description, ogType, ogImage, canonical]);

  return null;
};

export default SEO;
