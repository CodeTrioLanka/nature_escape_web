# Home Page Video Background Setup

## Overview
The home page Hero section now supports both **image** and **video** backgrounds from Cloudinary. The video background takes priority when available.

## How It Works

### Frontend (User-Facing Site)
- **Location**: `src/components/home/Hero.tsx`
- **API**: `src/api/home.api.ts`

The Hero component automatically detects if a video URL is provided:
- If `homebgVideo` has a value → displays video background
- If `homebgVideo` is empty → displays image background from `homebg`

### Backend Admin Panel
- **Location**: `cpanel/client/Cmswithlogindashboard/src/app/components/sections/HomeSection.tsx`

The admin panel has two fields:
1. **Background Image** (`homebg`) - For static image backgrounds
2. **Background Video (Optional)** (`homebgVideo`) - For video backgrounds

## How to Upload a Video

### Step 1: Access Admin Panel
1. Navigate to your admin panel
2. Go to the **Home Page Settings** section

### Step 2: Upload Video
1. Click the **Edit** button
2. Scroll to the **Hero Section**
3. Find the **Background Video (Optional)** field
4. Click the **Browse** button next to the video field
5. Select your video file (MP4, WebM, or MOV format recommended)
6. Wait for the upload to complete (Cloudinary will process it)
7. The video URL will automatically populate in the field
8. Click **Save** to apply changes

### Step 3: Verify
1. Visit your public website homepage
2. The video should now be playing as the background
3. Check the browser console for logs confirming video detection

## Video Requirements

### Recommended Specifications
- **Format**: MP4 (H.264 codec) for best browser compatibility
- **Resolution**: 1920x1080 (Full HD) or 1280x720 (HD)
- **File Size**: Keep under 10MB for optimal loading
- **Duration**: 10-30 seconds (looped automatically)
- **Aspect Ratio**: 16:9 for best results

### Optimization Tips
1. **Compress your video** before uploading to reduce file size
2. **Remove audio** - the video plays muted for better UX
3. **Use short loops** - the video loops automatically
4. **Test on mobile** - ensure it works on mobile devices

## Features

### Automatic Handling
- ✅ Auto-play on page load
- ✅ Loops continuously
- ✅ Muted by default (for browser autoplay policies)
- ✅ Mobile-friendly with `playsInline` attribute
- ✅ Parallax scroll effects
- ✅ Overlay for text readability
- ✅ Fallback to image if video fails to load

### Cloudinary Integration
- Videos are uploaded to Cloudinary automatically
- Old videos are deleted when new ones are uploaded
- URLs are stored in the database
- No manual file management needed

## Switching Between Image and Video

### To Use Video Background
1. Upload a video to the **Background Video** field
2. Save changes
3. The video will take priority over the image

### To Use Image Background
1. Clear the **Background Video** field (delete the URL)
2. Ensure the **Background Image** field has an image URL
3. Save changes
4. The image will be displayed

## Troubleshooting

### Video Not Playing
1. **Check browser console** for error messages
2. **Verify video URL** is accessible
3. **Check video format** - MP4 works best
4. **Test on different browsers** - some browsers block autoplay

### Video Loading Slowly
1. **Reduce file size** - compress the video
2. **Use Cloudinary transformations** - optimize delivery
3. **Consider shorter duration** - smaller file size

### Video Not Visible on Mobile
1. **Check `playsInline` attribute** - already included
2. **Test video format** - ensure mobile compatibility
3. **Check file size** - large files may not load on mobile data

## Example Cloudinary Video URL
```
https://res.cloudinary.com/your-cloud-name/video/upload/v1234567890/nature-escape/home-bg-video.mp4
```

## Code Reference

### Frontend Detection Logic
```typescript
// Prioritize video if available, otherwise use image
const backgroundVideo = homeData?.homebgVideo;
const backgroundImage = homeData?.homebg || heroImage;
const isVideo = !!backgroundVideo;
```

### Video Element
```tsx
<video
  autoPlay
  loop
  muted
  playsInline
  className="absolute inset-0 w-full h-full object-cover"
  src={backgroundVideo}
>
  <source src={backgroundVideo} type="video/mp4" />
  Your browser does not support the video tag.
</video>
```

## Notes
- The video background maintains the same parallax effects as the image
- The hero overlay is applied to both video and image for consistent text readability
- The video is horizontally flipped (`scale-x-[-1]`) to match the image behavior
