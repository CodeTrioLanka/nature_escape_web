# PageHero Component - Wavy Hero Sections for All Pages

## Overview

The `PageHero` component provides a consistent, professional hero section design across all pages with:
- ✅ Centered content layout
- ✅ Parallax scroll effects
- ✅ Wavy bottom edge (SVG)
- ✅ Customizable title, subtitle, and background
- ✅ Support for custom children content
- ✅ Responsive design

## Component Location

```
src/components/common/PageHero.tsx
```

## Usage

### Basic Usage

```tsx
import PageHero from "@/components/common/PageHero";
import backgroundImage from "@/assets/your-image.jpg";

<PageHero
  title="Your Page Title"
  subtitle="Your page description goes here"
  backgroundImage={backgroundImage}
/>
```

### Advanced Usage with Custom Content

```tsx
import PageHero from "@/components/common/PageHero";
import { Link } from "react-router-dom";

<PageHero
  title="Explore Sri Lanka"
  subtitle="Discover the wonders of nature"
  backgroundImage={heroImage}
  height="h-screen min-h-[700px]"
>
  {/* Custom buttons or content */}
  <Link
    to="/tours"
    className="px-10 py-4 bg-white text-forest font-bold rounded-lg"
  >
    View Tours
  </Link>
</PageHero>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | **Required** | Main heading text |
| `subtitle` | `string` | `undefined` | Optional subtitle/description |
| `backgroundImage` | `string` | **Required** | URL or import path to background image |
| `height` | `string` | `"h-[70vh] min-h-[500px]"` | Tailwind height classes |
| `children` | `ReactNode` | `undefined` | Custom content (buttons, etc.) |
| `showWave` | `boolean` | `true` | Show/hide wavy bottom edge |

## Examples for Different Pages

### 1. About Page ✅ (Already Updated)

```tsx
<PageHero
  title="We Create Memories"
  subtitle="Your trusted partner in discovering Sri Lanka's natural wonders since 2010"
  backgroundImage={sigiriya}
  height="h-[70vh] min-h-[500px]"
/>
```

### 2. Services Page

```tsx
<PageHero
  title="Our Services"
  subtitle="Tailored experiences for every traveler"
  backgroundImage={servicesImage}
/>
```

### 3. Tours Page

```tsx
<PageHero
  title="Sri Lanka Tours"
  subtitle="Explore the pearl of the Indian Ocean"
  backgroundImage={toursImage}
  height="h-[80vh] min-h-[600px]"
>
  <div className="flex gap-4">
    <Link to="/tours/wildlife" className="btn-primary">
      Wildlife Tours
    </Link>
    <Link to="/tours/cultural" className="btn-secondary">
      Cultural Tours
    </Link>
  </div>
</PageHero>
```

### 4. Contact Page

```tsx
<PageHero
  title="Get in Touch"
  subtitle="Let's plan your perfect Sri Lankan adventure"
  backgroundImage={contactImage}
  height="h-[60vh] min-h-[400px]"
  showWave={false}  // No wave if content follows immediately
/>
```

### 5. Sustainability Page

```tsx
<PageHero
  title="Sustainable Tourism"
  subtitle="Protecting paradise for future generations"
  backgroundImage={sustainabilityImage}
/>
```

## Features

### Parallax Effects
- Background image moves slower than scroll (parallax)
- Smooth scale animation on scroll
- Text fades out as you scroll down

### Wavy Bottom Edge
- Professional SVG wave shape
- Responsive height (60px mobile → 100px desktop)
- Seamless transition to next section
- Can be disabled with `showWave={false}`

### Responsive Design
- Mobile-first approach
- Text sizes scale appropriately
- Wave height adjusts for screen size

### Animations
- Title fades in from below
- Subtitle fades in with delay
- Custom children content animates last
- Smooth, professional timing

## Styling

### Text Shadows
All text has shadows for readability over images:
- Title: `0 4px 20px rgba(0,0,0,0.7)`
- Subtitle: `0 2px 10px rgba(0,0,0,0.5)`

### Background Overlay
Dark overlay (50% black) ensures text is always readable

### Font Sizes
- **Title**: 
  - Mobile: `text-5xl` (48px)
  - Tablet: `text-6xl` (60px)
  - Desktop: `text-7xl` (72px)
- **Subtitle**:
  - Mobile: `text-lg` (18px)
  - Desktop: `text-xl` (20px)

## Migration Guide

### Replacing Old Hero Sections

**Before:**
```tsx
<section className="hero-section">
  <div className="background-image">...</div>
  <div className="content">
    <h1>{title}</h1>
    <p>{subtitle}</p>
  </div>
</section>
```

**After:**
```tsx
<PageHero
  title={title}
  subtitle={subtitle}
  backgroundImage={backgroundImage}
/>
```

### Benefits of Migration
1. ✅ **Consistency** - Same design across all pages
2. ✅ **Less Code** - Reusable component
3. ✅ **Easier Maintenance** - Update once, applies everywhere
4. ✅ **Better Performance** - Optimized animations
5. ✅ **Modern Design** - Wavy edge, parallax effects

## Pages to Update

### Priority 1 (Main Pages)
- [x] About Page - ✅ **Done**
- [ ] Services Page
- [ ] Tours Page (SriLankaTours.tsx)
- [ ] Contact Page

### Priority 2 (Secondary Pages)
- [ ] Sustainability Page
- [ ] Reviews Page
- [ ] MICE Page
- [ ] Things To Do Page
- [ ] Excursions Page

### Priority 3 (Detail Pages)
- [ ] Service Detail
- [ ] Tour Detail
- [ ] Tour Category
- [ ] Destination Detail
- [ ] Excursion Detail

## Customization

### Different Wave Colors

To match different page backgrounds:

```tsx
// In PageHero.tsx, modify the SVG fill:
<path 
  d="M0,0 C150,100 350,0 600,50 C850,100 1050,0 1200,50 L1200,120 L0,120 Z" 
  fill="#f5f5f5"  // Change this to match your section background
  className="drop-shadow-lg"
/>
```

### Different Wave Shapes

Modify the SVG path for different wave patterns:

```tsx
// Gentle waves
d="M0,50 Q300,0 600,50 T1200,50 L1200,120 L0,120 Z"

// Sharp waves
d="M0,0 L200,100 L400,0 L600,100 L800,0 L1000,100 L1200,0 L1200,120 L0,120 Z"

// Current smooth waves (default)
d="M0,0 C150,100 350,0 600,50 C850,100 1050,0 1200,50 L1200,120 L0,120 Z"
```

## Best Practices

1. **Image Selection**
   - Use high-quality images (1920x1080 minimum)
   - Ensure images have good contrast for text
   - Avoid busy images with too much detail

2. **Title Length**
   - Keep titles short (2-5 words ideal)
   - Long titles may wrap awkwardly on mobile

3. **Subtitle Length**
   - Max 150 characters recommended
   - Should fit in 1-2 lines on desktop

4. **Height Selection**
   - Homepage: `h-screen` (full viewport)
   - Main pages: `h-[70vh]` (70% viewport)
   - Secondary pages: `h-[60vh]` (60% viewport)
   - Detail pages: `h-[50vh]` (50% viewport)

5. **Wave Usage**
   - Use wave when next section has white/light background
   - Disable wave (`showWave={false}`) for dark sections

## Troubleshooting

### Wave Not Showing
- Check `showWave` prop is not set to `false`
- Ensure parent has no `overflow-hidden`
- Verify SVG fill color contrasts with background

### Text Not Readable
- Increase overlay opacity in component
- Use darker background images
- Add more text shadow

### Parallax Not Smooth
- Check if page has smooth scrolling enabled
- Verify no conflicting scroll animations
- Test on different browsers

## Future Enhancements

Potential improvements for the component:

- [ ] Video background support
- [ ] Multiple wave style options
- [ ] Gradient overlay options
- [ ] Breadcrumb integration
- [ ] Search bar integration
- [ ] Social share buttons
- [ ] Scroll indicator animation

---

**Created**: 2026-02-01
**Last Updated**: 2026-02-01
**Status**: Active - About page migrated ✅
