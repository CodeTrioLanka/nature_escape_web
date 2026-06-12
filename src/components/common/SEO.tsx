import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
  canonical?: string;
  schema?: Record<string, any> | Record<string, any>[];
}

const SITE_NAME = "SL Nature Escape";
const DEFAULT_DOMAIN = "https://www.slnatureescape.com";
const DEFAULT_IMAGE = "https://www.slnatureescape.com/assets/og-default.jpg"; // Fallback image path

export const SEO = ({
  title,
  description,
  keywords,
  ogTitle,
  ogDescription,
  ogImage,
  ogType = "website",
  canonical,
  schema,
}: SEOProps) => {
  const { pathname } = useLocation();

  useEffect(() => {
    // 1. Update Title
    const formattedTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
    document.title = formattedTitle;

    // Helper to set/update a meta tag
    const setMetaTag = (attributeName: string, attributeValue: string, contentValue?: string) => {
      if (!contentValue) return;
      let element = document.querySelector(`meta[${attributeName}="${attributeValue}"]`);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attributeName, attributeValue);
        document.head.appendChild(element);
      }
      element.setAttribute("content", contentValue);
    };

    // Helper to remove a meta tag if not present
    const removeMetaTag = (attributeName: string, attributeValue: string) => {
      const element = document.querySelector(`meta[${attributeName}="${attributeValue}"]`);
      if (element) {
        element.remove();
      }
    };

    // 2. Set Meta Description
    if (description) {
      setMetaTag("name", "description", description);
      setMetaTag("property", "og:description", ogDescription || description);
      setMetaTag("name", "twitter:description", ogDescription || description);
    }

    // 3. Set Meta Keywords
    if (keywords) {
      setMetaTag("name", "keywords", keywords);
    } else {
      removeMetaTag("name", "keywords");
    }

    // 4. Set OpenGraph and Twitter title
    const activeOgTitle = ogTitle || title || SITE_NAME;
    setMetaTag("property", "og:title", activeOgTitle);
    setMetaTag("name", "twitter:title", activeOgTitle);

    // 5. Set URL
    const activeUrl = canonical || `${DEFAULT_DOMAIN}${pathname}`;
    setMetaTag("property", "og:url", activeUrl);

    // 6. Set OG Image
    const activeImage = ogImage || DEFAULT_IMAGE;
    setMetaTag("property", "og:image", activeImage);
    setMetaTag("name", "twitter:image", activeImage);

    // 7. Set OG Type
    setMetaTag("property", "og:type", ogType);

    // 8. Set Canonical Link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute("href", activeUrl);

    // 9. Structured Data (JSON-LD)
    const existingJsonLdScripts = document.querySelectorAll('script[type="application/ld+json"].seo-schema');
    existingJsonLdScripts.forEach((script) => script.remove());

    if (schema) {
      const script = document.createElement("script");
      script.setAttribute("type", "application/ld+json");
      script.classList.add("seo-schema");
      script.innerHTML = JSON.stringify(schema);
      document.head.appendChild(script);
    }

    // Cleanup: we don't strictly need to clear everything, but resetting metadata on unmount can avoid stale head tags
    return () => {
      // Keep title and essential tags, just clean up schema if unmounted
      const scripts = document.querySelectorAll('script[type="application/ld+json"].seo-schema');
      scripts.forEach((s) => s.remove());
    };
  }, [
    title,
    description,
    keywords,
    ogTitle,
    ogDescription,
    ogImage,
    ogType,
    canonical,
    schema,
    pathname,
  ]);

  return null; // This is a head-management utility component, it doesn't render any UI elements
};

export default SEO;
