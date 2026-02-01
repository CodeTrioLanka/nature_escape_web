# ✅ Navbar & Hero Design Updates

## **Objective**
Make the navbar transparent and float over the hero background image on every page, matching the reference "POVEDA" style, and ensure the "Escape" text in the logo is gold/yellow.

## **Changes Implemented**

### **1. 🌫️ Transparent Glassy Navbar**
- **File**: `src/components/layout/Header.tsx`
- **Background**: Changed from white to `bg-black/20` (transparent dark glass).
- **Text**: Changed to **White** for visibility on dark backgrounds.
- **Logo**: Restored `text-gold` for the "Escape" part (Nature**Escape**).
- **Hover Effects**: Added subtle white hover states.
- **Mobile Menu**: Updated toggle button to be white.

### **2. 🏔️ Hero Sections Behind Navbar**
Added negative top margin (`-mt-20`) to all hero sections to pull them up behind the fixed navbar.

- **Global Component**:
  - `src/components/common/PageHero.tsx` (Used by About, Services, etc.)

- **Custom Pages**:
  - `src/components/home/Hero.tsx` (Home Page)
  - `src/pages/Reviews.tsx`
  - `src/pages/Sustainability.tsx`
  - `src/pages/ThingsToDo.tsx`
  - `src/pages/Excursions.tsx`
  - `src/pages/Contact.tsx`

### **3. 📞 Contact Page Fix**
- Re-added the **Hero Section** to the Contact page.
- This ensures the transparent white navbar has a background image to sit over, instead of being invisible against a white page background.

---

## **Result**

- **Consistent Look**: The navbar is now transparent and consistent across the entire website.
- **Premium Feel**: The "background behind navbar" effect connects the navigation with the content smoothly.
- **Brand Colors**: The logo correctly uses the gold accent color.
- **Readability**: White text on dark/dimmed hero images ensures menu items are legible.

**Your website now matches the requested "Poveda-style" transparent header design!** 🚀
