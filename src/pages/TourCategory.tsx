import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { ArrowRight, Check, X, Loader2 } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { motion, useScroll, useTransform } from "framer-motion";
import { fetchTourCategoryBySlug, TourCategory as ITourCategory } from "@/api/tours.api";
import { fetchPackagesByCategoryId, Package } from "@/api/packages.api";

// Images
import beachSurfImg from "@/assets/beach-surf.jpg";
import beachUnawatunaImg from "@/assets/beach-unawatuna.jpg";
import sigiriyaImg from "@/assets/sigiriya.jpg";
import teaImg from "@/assets/tea-plantations.jpg";

import honeymoonImg from "@/assets/honeymoon.jpg";
import honeymoonImgCard1 from "@/assets/honeymoon1.jpg";
import honeymoonImgCard2 from "@/assets/honeymoon2.jpg";
import honeymoonImgCard3 from "@/assets/honeymoon3.jpg";

import wildlifeImg from "@/assets/wildlife.jpg";
import wildlifeImgCard1 from "@/assets/wildlife1.jpg";
import wildlifeImgCard2 from "@/assets/wildlife2.jpg";
import wildlifeImgCard3 from "@/assets/wildlife3.jpg";

import adventureImg from "@/assets/adventure.jpg";
import adventureImgCard1 from "@/assets/adventure1.jpg";
import adventureImgCard2 from "@/assets/adventure2.jpg";
import adventureImgCard3 from "@/assets/adventure3.jpg";

import templeImg from "@/assets/temple.jpg";
import templeImgCard1 from "@/assets/temple1.jpg";
import templeImgCard2 from "@/assets/temple2.jpg";
import templeImgCard3 from "@/assets/temple3.jpg";

import familyImg from "@/assets/family-beach.jpg";
import golfImg from "@/assets/golf.jpg";

import mapImg from "@/assets/sri-lanka-map.jpg";

// Category data
const categoryData: Record<string, {
  title: string;
  description: string;
  heroImage: string;
  tours: { id: number; slug: string; title: string; duration: string; image: string; recommended: string[] }[];
  features: ({ name: string; values: boolean[] } | { section: string; items: { name: string; values: boolean[] }[] })[];
  mapText: { heading: string; subheading: string; description: string };
}> = {
  beach: {
    title: "Beach Tours",
    description: "Sri Lanka’s coast dazzles with golden beaches, turquoise waters, vibrant coral reefs, and bustling fishing villages, offering relaxation, adventure, rich culture, and breathtaking sunsets along its endless tropical shoreline.",
    heroImage: beachSurfImg,
    tours: [
      {
        id: 1,
        slug: "unawatuna-beach-escape",
        title: "Eastern Blue Bliss",
        duration: "11 Nights & 12 Days",
        image: beachUnawatunaImg,
        recommended: ["Adventure", "Honeymoon"]
      },
      {
        id: 2,
        slug: "mirissa-surf-retreat",
        title: "Southern Sands Voyage",
        duration: "09 Nights & 10 Days",
        image: honeymoonImgCard2,
        recommended: ["Adventure", "Honeymoon"]
      },
      {
        id: 3,
        slug: "bentota-paradise",
        title: "Sunrise Shores Tour",
        duration: "13 Nights & 14 Days",
        image: honeymoonImgCard3,
        recommended: ["Family"]
      },
    ],

    features: [
      {
        section: "Negombo",
        items: [
          { name: "Tangalle", values: [false, true, true] },
          { name: "Hummanaya Blow Hole", values: [false, true, true] },
          { name: "Mulgirigala Temple", values: [false, true, true] },
          { name: "Kalametiya Bird Sanctuary", values: [false, true, true] },
          { name: "Scuba Diving", values: [false, true, true] },
        ]
      },
      {
        section: "Habarana",
        items: [
          { name: "Sigiriya", values: [true, false, true] },
        ]
      },
      {
        section: "Trincomalee",
        items: [
          { name: "Pigeon Island", values: [true, false, false] },
          { name: "Koneshwaram Temple", values: [true, false, true] },
          { name: "Pasikudah", values: [true, false, true] },
          { name: "Arugambay", values: [true, false, true] },
          { name: "Surfing", values: [true, false, true] },
        ]
      },
      {
        section: "Yala",
        items: [
          { name: "Yala National Park Safari", values: [true, false, true] },
        ]
      },
      {
        section: "Mirissa",
        items: [
          { name: "Surfing (Mirissa)", values: [false, true, true] },
          { name: "Whale and Dolphin Watching", values: [false, true, true] },
        ]
      },
      {
        section: "Unawatuna",
        items: [
          { name: "Jungle Beach", values: [false, true, true] },
        ]
      },
      {
        section: "Galle",
        items: [
          { name: "Galle Fort Tour", values: [false, false, true] },
        ]
      },
      {
        section: "Hikkaduwa",
        items: [
          { name: "Snorkelling", values: [false, true, true] },
          { name: "Kayaking", values: [false, true, true] },
        ]
      },
      {
        section: "Bentota",
        items: [
          { name: "Kosgoda Sea Turtle Hatchery", values: [false, false, true] },
        ]
      },
      {
        section: "Kalpitiya",
        items: [
          { name: "Kite Surfing", values: [true, true, false] },
          { name: "Dolphin Watching", values: [true, true, false] },
          { name: "Fishing", values: [true, true, false] },
          { name: "Cookery Demonstration", values: [true, true, false] },
          { name: "Wilpattu National Park Safari", values: [true, true, false] },
        ]
      },
      {
        section: "Colombo",
        items: [
          { name: "Street Food Tour", values: [true, false, false] },
          { name: "City Tour and Shopping", values: [true, false, false] },
        ]
      },
      {
        section: "Mannar",
        items: [
          { name: "Mannar Fort", values: [true, true, false] },
        ]
      },
      {
        section: "Jaffna",
        items: [
          { name: "KKS Beach", values: [true, true, false] },
          { name: "Casuarina Beach", values: [true, true, false] },
          { name: "Keerimalai Hot Water Spring", values: [true, true, false] }
        ]
      },
    ],

    mapText: {
      heading: "Sun, Sand, and Sea",
      subheading: "Sri Lanka's Beach Paradise Awaits",
      description: "Discover over 1,340 km of stunning coastline with pristine beaches, world-class surf spots, and crystal-clear waters perfect for snorkeling and diving."
    }
  },

  cultural: {
    title: "Cultural Tours",
    description: "Journey through Sri Lanka's ancient heritage with UNESCO World Heritage sites, sacred temples, and historic kingdoms. Discover the Cultural Triangle featuring Sigiriya, Polonnaruwa, and Anuradhapura.",
    heroImage: sigiriyaImg,
    tours: [
      {
        id: 1,
        slug: "cultural-triangle-explorer",
        title: "Cultural Triangle Explorer",
        duration: "8 Days / 7 Nights",
        image: sigiriyaImg,
        recommended: ["Cultural", "History"]
      },
      {
        id: 2,
        slug: "temple-trail-pilgrimage",
        title: "Temple Trail Pilgrimage",
        duration: "6 Days / 5 Nights",
        image: templeImg,
        recommended: ["Spiritual", "Cultural"]
      },
      {
        id: 3,
        slug: "cultural-triangle-explorer",
        title: "The Heritage Legacy",
        duration: "14 Nights / 15 Days",
        image: sigiriyaImg,
        recommended: ["Adventure", "Cultural"]
      },
    ],

    features: [
      {
        section: "Negombo",
        items: [
          { name: "Negombo", values: [true, true, true] },
        ]
      },
      {
        section: "Anuradhapura",
        items: [
          { name: "Mihintale", values: [false, true, true] },
        ]
      },
      {
        section: "Kandy",
        items: [
          { name: "Temple of the Tooth", values: [true, true, true] },
          { name: "Cultural Dance Show", values: [true, true, true] },
          { name: "Royal Botanical Gardens", values: [true, true, true] },
        ]
      },
      {
        section: "Nuwara Eliya",
        items: [
          { name: "Tea Factory Visit", values: [true, true, true] },
          { name: "Ella", values: [false, true, true] },
          { name: "Nine Arch Bridge", values: [false, true, true] },
        ]
      },

    ],
    mapText: {
      heading: "Sri Lanka",
      subheading: "Cultural Route Map",
      description: "Explore ancient kingdoms, sacred temples, and UNESCO World Heritage sites across the Cultural Triangle of Sri Lanka."
    }
  },

  honeymoon: {
    title: "Honeymoon Tours",
    description: "Experience the best of both worlds with our exclusive honeymoon getaways. We pair the mystique of the ocean with the romance of the highlands to create a diverse, unforgettable travel experience for newlyweds.",
    heroImage: honeymoonImg,
    tours: [
      {
        id: 1,
        slug: "romantic-honeymoon-escape",
        title: "Romantic Honeymoon Escape",
        duration: "10 Days / 9 Nights",
        image: honeymoonImgCard1,
        recommended: ["Couples", "Romantic"]
      },
      {
        id: 2,
        slug: "romantic-honeymoon-escape",
        title: "Romantic Serenity in the Mist",
        duration: "7 Nights / 8 Days",
        image: honeymoonImgCard2,
        recommended: ["Beach", "Romantic"]
      },
      {
        id: 3,
        slug: "romantic-honeymoon-escape",
        title: "Passion's Getaway",
        duration: "5 Nights / 6 Days",
        image: honeymoonImgCard3,
        recommended: ["Romantic", "Scenic"]
      },
    ],

    features: [
      {
        section: "Colombo",
        items: [
          { name: "City Tour and Shopping", values: [true, true, true] },
          { name: "Street Food Experience", values: [true, false, true] },
          { name: "Sunset Cruise", values: [true, false, false] },
        ],
      },
      {
        section: "Bentota",
        items: [
          { name: "Madu River Boat Ride", values: [true, false, false] }
        ],
      },
      {
        section: "Negombo",
        items: [
        ]
      },
      {
        section: "Habarana",
        items: [
          { name: "Minneriya National Park", values: [false, true, true] },
          { name: "Hiriwadunna Village", values: [false, true, true] },
          { name: "Sigiriya", values: [false, true, true] },
          { name: "Hot Air Balloon", values: [false, true, true] },
          { name: "Dambulla Cave Temple", values: [false, true, true] },
          { name: "Anuradhapura", values: [false, false, true] },
        ]
      },
      {
        section: "Kandy",
        items: [
          { name: "Temple of the Tooth", values: [false, true, true] },
          { name: "Cultural Show", values: [false, true, true] },
          { name: "Ambuluwawa Tower", values: [false, true, true] },
          { name: "Royal Botanical Garden", values: [false, false, true] },
        ],
      },
      {
        section: "Nuwara Eliya",
        items: [
          { name: "Ramboda Falls", values: [false, false, true] },
          { name: "Gregory Lake", values: [false, false, true] },
          { name: "Strawberry Farm", values: [false, false, true] },
        ],
      },
    ],

    mapText: {
      heading: "Love, Nature, and Sunset Cruises",
      subheading: "Perfect Sri Lanka Honeymoon Escapes",
      description: "Escape to a world where golden beaches meet misty mountains. Our honeymoon packages offer the perfect blend of intimate private dinners, breathtaking highland views, and serene sunset cruises designed for two."
    }
  },

  "hill-country": {
    title: "Hill Country Tours",
    description: "Explore the misty highlands of Sri Lanka with scenic tea plantations, cool climate, and breathtaking mountain views.",
    heroImage: teaImg,
    tours: [
      { id: 1, slug: "cultural-triangle-explorer", title: "Hills and Waterfalls Tour", duration: "6 Nights / 7 Days", image: teaImg, recommended: ["Scenic", "Nature"] },
      { id: 2, slug: "cultural-triangle-explorer", title: "Sri Lanka Cloud Adventure", duration: "10 Nights / 11 Days", image: teaImg, recommended: ["Adventure", "Nature"] },
    ],
    features: [
      {
        section: "Negombo",
        items: []
      },
      {
        section: "Kandy",
        items: [
          { name: "Temple of the Tooth", values: [false, false] },
          { name: "Cultural Performance", values: [false, false] },
          { name: "Royal Botanical Garden", values: [false, false] },
        ]
      },
      {
        section: "Nuwara Eliya",
        items: [
          { name: "Tea Plantation", values: [false, false] },
          { name: "Gregory Lake", values: [false, false] },
          { name: "Hakgala Garden", values: [false, false] },
          { name: "Ambewela Farm", values: [false, false] },
          { name: "Ella", values: [true, false] },
          { name: "Ravana Falls", values: [true, false] },
          { name: "Nine Arch Bridge", values: [true, false] },
        ],
      },
      {
        section: "Galle",
        items: [
          { name: "Galle Fort Tour", values: [true, false] },
        ],
      },
      {
        section: "Colombo",
        items: [
          { name: "Red Mosque", values: [false, true] },
          { name: "City Tour and Shopping", values: [false, true] }
        ],
      },
    ],

    mapText: {
      heading: "Discover the Highlands",
      subheading: "Misty, Cool, and Hill Country Pleasures",
      description: "Experience the scenic beauty of Sri Lanka's hill country."
    }
  },

  wildlife: {
    title: "Wildlife Tours",
    description: "Uncover Sri Lanka’s wilderness with exhilarating safari experiences. Explore national parks teeming with elephants, leopards, and exotic birds in their natural habitats.",
    heroImage: wildlifeImg,
    tours: [
      {
        id: 1,
        slug: "wildlife-safari-expedition",
        title: "Wildlife Safari Expedition",
        duration: "6 Days / 5 Nights",
        image: wildlifeImgCard1,
        recommended: ["Adventure", "Family"]
      },
      {
        id: 2,
        slug: "wildlife-safari-expedition",
        title: "Wildlife Parks Explored",
        duration: "6 Nights / 7 Days",
        image: wildlifeImgCard2,
        recommended: ["Nature", "Photography"]
      },
      {
        id: 3,
        slug: "wildlife-safari-expedition",
        title: "Wilpattu Wild Escape",
        duration: "4 Nights / 5 Days",
        image: wildlifeImgCard3,
        recommended: ["Adventure"]
      },
    ],
    features: [
      {
        section: "Negombo",
        items: [
          { name: "Negombo", values: [false, false, false] },
        ]
      },
      {
        section: "Habarana",
        items: [
          { name: "Minneriya National Park", values: [false, false, false] },
          { name: "Hiriwadunna Village", values: [false, true, true] },
          { name: "Sigiriya", values: [false, false, true] },
          { name: "Anuradhapura", values: [true, false, false] },
          { name: "Dambulla", values: [true, false, true] },
          { name: "Wasgamuwa National Park", values: [false, true, true] },

        ]
      },
      {
        section: "Nuwara Eliya",
        items: [
          { name: "Tea Factory", values: [false, false, false] },
          { name: "Horton Plains", values: [false, false, false] },
          { name: "Moon Plains", values: [true, false, false] },
        ]
      },
      {
        section: "Colombo",
        items: [
          { name: "City Tour & Shopping", values: [false, true, true] },
        ]
      },
      {
        section: "Wilpattu",
        items: [
          { name: "Wilpattu National Park", values: [true, false, true] },
        ]
      },
      {
        section: "Kandy",
        items: [
          { name: "Royal Botanical Garden", values: [true, false, true] },
        ]
      },
      {
        section: "Ella",
        items: [
          { name: "Nine Arch Bridge", values: [true, false, true] },
          { name: "Mini Adam’s Peak", values: [true, false, true] },
          { name: "Ravana Falls", values: [true, false, true] },
        ]
      },
      {
        section: "Arugambay",
        items: [
          { name: "Elephant Rock", values: [true, false, false] },
          { name: "Kumana National Park", values: [true, true, false] },
        ]
      },
      {
        section: "Udawalawe",
        items: [
          { name: "Udawalawe National Park", values: [true, false, false] },
          { name: "Udawalawe Transit Home", values: [true, false, false] },
        ]
      },
      {
        section: "Yala",
        items: [
          { name: "Yala National Park", values: [true, true, false] },
        ]
      },
      {
        section: "Sinharaja",
        items: [
          { name: "Sinharaja Rainforest", values: [true, true, false] },
        ]
      },
      {
        section: "Bentota",
        items: [
          { name: "Madu River Boat Safari", values: [true, true, false] },
        ]
      },
    ],

    mapText: {
      heading: "From Wild Parks to Peaks",
      subheading: "Sri Lanka's Ultimate Adventure Trail",
      description: "Experience world-class wildlife safaris."
    }
  },

  adventure: {
    title: "Adventure Tours",
    description: "Enjoy hiking, biking, kayaking, and a range of exciting outdoor adventures. Explore Sri Lanka's diverse landscapes from mountains to beaches.",
    heroImage: adventureImg,
    tours: [
      {
        id: 1,
        slug: "adventure-adrenaline-rush",
        title: "Adventure Adrenaline Rush",
        duration: "7 Days / 6 Nights",
        image: adventureImgCard1,
        recommended: ["Thrill", "Active"]
      },
      {
        id: 2,
        slug: "adventure-adrenaline-rush",
        title: "Sri Lanka Wild Trekking",
        duration: "8 Nights / 9 Days",
        image: adventureImgCard2,
        recommended: ["Hiking", "Nature"]
      },
      {
        id: 3,
        slug: "adventure-adrenaline-rush",
        title: "Extreme Trek Sri Lanka",
        duration: "6 Nights / 7 Days",
        image: adventureImgCard3,
        recommended: ["Extreme", "Adventure"]
      },
    ],

    features: [
      { name: "Negombo", values: [false, true, true] },

      { name: "Kandy", values: [false, true, true] },
      { name: "Temple of the Tooth", values: [false, true, true] },
      { name: "Hanthana", values: [false, true, true] },

      { name: "Hatton", values: [false, true, true] },
      { name: "Kithulgala White Water Rafting", values: [false, false, true] },
      { name: "Luxapana Water Fall - Rope Jump", values: [false, true, true] },

      { name: "Nuwara Eliya", values: [false, false, true] },
      { name: "Horton Plains National Park", values: [false, false, true] },

      { name: "Ella", values: [false, false, true] },
      { name: "9 Arch Bridge", values: [false, false, true] },
      { name: "Rawana Falls", values: [false, false, true] },
      { name: "Ella Gap", values: [false, false, true] },
      { name: "Mini Adam's Peak", values: [false, false, true] },
      { name: "Rawana Zip Line", values: [false, false, true] },

      { name: "Yala", values: [true, false, true] },
      { name: "Yala National Park Safari", values: [true, false, true] },

      { name: "Mirissa", values: [true, false, true] },
      { name: "Surfing", values: [true, false, false] },
      { name: "Whale and Dolphin Watching", values: [true, false, true] },

      { name: "Galle", values: [true, false, true] },
      { name: "Galle Fort Tour", values: [true, false, true] },

      { name: "Hikkaduwa", values: [false, false, true] },
      { name: "Kayaking", values: [false, false, true] },

      { name: "Colombo", values: [false, true, true] },
      { name: "Street Food Tour", values: [true, false, false] },
      { name: "City Tour and Shopping", values: [true, true, true] },

      { name: "Kalpitiya", values: [false, true, false] },
      { name: "Kite Surfing", values: [false, true, false] },
      { name: "Dolphin Watching", values: [false, true, false] },
      { name: "Fishing", values: [false, true, false] },
      { name: "Cookery Demonstration", values: [false, true, false] },
      { name: "Wilpattu National Park Safari", values: [false, true, false] },

      { name: "Cultural Triangle", values: [false, false, false] },
      { name: "Sigiriya", values: [false, false, false] },
      { name: "Pidurangala Rock", values: [false, false, false] },
      { name: "Minneriya National Park Safari", values: [false, false, false] },

      { name: "Bentota", values: [true, false, false] },
      { name: "Madu River Boat Safari", values: [true, false, false] }
    ],

    mapText: {
      heading: "Adventure-Filled Sri Lanka",
      subheading: "From Highlands to Beaches and Beyond",
      description: "Push your limits with thrilling adventures."
    }
  },

  ayurvedic: {
    title: "Ayurvedic Tours",
    description: "Rejuvenate your mind and body with Sri Lanka's ancient healing traditions.",
    heroImage: teaImg,
    tours: [
      {
        id: 1,
        slug: "romantic-honeymoon-escape",
        title: "Sri Lanka Ayurveda Stay",
        duration: "10 Nights / 11 Days",
        image: honeymoonImg,
        recommended: ["Wellness", "Relaxation"]
      },
      {
        id: 2,
        slug: "romantic-honeymoon-escape",
        title: "Forever Glowing",
        duration: "7 Nights / 8 Days",
        image: teaImg,
        recommended: ["Spa", "Healing"]
      },
    ],
    features: [
      { name: "Negombo", values: [true, false] },

      { name: "Kandy", values: [true, true] },
      { name: "Temple of the Tooth", values: [true, false] },
      { name: "Hanthana", values: [true, false] },

      { name: "Nuwara Eliya", values: [true, false] },
      { name: "Horton Plains National Park", values: [true, false] },

      { name: "Ella", values: [true, false] },
      { name: "9 Arch Bridge", values: [true, false] },
      { name: "Rawana Falls", values: [true, false] },
      { name: "Ella Gap", values: [true, false] },

      { name: "Yala", values: [true, false] },
      { name: "Yala National Park Safari", values: [true, false] },

      { name: "Mirissa", values: [true, false] },
      { name: "Surfing", values: [true, false] },

      { name: "Beruwala", values: [false, true] },

      { name: "Colombo", values: [true, false] },
      { name: "City Tour and Shopping", values: [true, false] },

      { name: "Sigiriya", values: [false, true] },
      { name: "Weligama", values: [false, true] }
    ],
    mapText: {
      heading: "Rejuvenate Your Mind and Body",
      subheading: "With Sri Lanka's Ayurvedic Escapes",
      description: "Experience ancient healing traditions."
    }
  },

  family: {
    title: "Family Tours",
    description: "Create unforgettable memories with family-friendly adventures across Sri Lanka.",
    heroImage: familyImg,
    tours: [
      {
        id: 1,
        slug: "family-adventure-tour",
        title: "Family Adventure Tour",
        duration: "9 Days / 8 Nights",
        image: familyImg,
        recommended: ["Kids", "Family"]
      },
      {
        id: 2,
        slug: "family-adventure-tour",
        title: "Family Escapade in Sri Lanka",
        duration: "14 Nights / 15 Days",
        image: wildlifeImg,
        recommended: ["Adventure", "Family"]
      },
    ],
    features: [
      { name: "Negombo", values: [true, true] },

      { name: "Kandy", values: [true, true] },
      { name: "Temple of the Tooth", values: [true, true] },
      { name: "Ambuluwawa Tower", values: [false, true] },

      { name: "Habarana", values: [true, true] },
      { name: "Minneriya National Park Safari", values: [true, true] },
      { name: "Dambulla Cave Temple", values: [true, true] },
      { name: "Sigiriya", values: [true, true] },
      { name: "Hiriwadunna", values: [true, true] },

      { name: "Anuradhapura", values: [false, true] },

      { name: "Nuwara Eliya", values: [true, true] },
      { name: "Gregory Lake", values: [true, true] },
      { name: "Horton Plains", values: [true, true] },

      { name: "Ella", values: [true, true] },
      { name: "Ravana Falls", values: [true, true] },
      { name: "Nine Arch Bridge", values: [true, true] },
      { name: "Ravana Zipline", values: [true, true] },
      { name: "Mini Adam's Peak", values: [true, true] },

      { name: "Yala", values: [true, true] },
      { name: "Yala National Park", values: [true, true] },

      { name: "Weligama", values: [true, true] },
      { name: "Surfing", values: [true, true] },

      { name: "Galle", values: [true, true] },
      { name: "Galle Fort Tour", values: [true, true] },

      { name: "Bentota", values: [true, true] },
      { name: "Madu River Boat Safari", values: [true, true] },

      { name: "Colombo", values: [true, true] },
      { name: "Red Mosque", values: [true, true] },
      { name: "City Tour and Shopping", values: [true, true] },

      { name: "Kalpitiya", values: [false, true] },
      { name: "Kite Surfing", values: [false, true] },
      { name: "Dolphin Watching", values: [false, true] },
      { name: "Fishing", values: [false, true] },
      { name: "Cookery Demonstration", values: [false, true] },
      { name: "Wilpattu National Park Safari", values: [false, true] }
    ],
    mapText: {
      heading: "Unforgettable Family Adventures",
      subheading: "Sri Lanka's Best Family Destinations",
      description: "Create lasting memories with family-friendly tours."
    }
  },

  ramayana: {
    title: "Ramayana Tours",
    description: "Journey through the legends of Hindu mythology on a sacred path. Explore ancient temples, caves, and landscapes linked to the epic Ramayana.",
    heroImage: templeImg,
    tours: [
      {
        id: 1,
        slug: "temple-trail-pilgrimage",
        title: "11 Days Ramayana Trail",
        duration: "10 Nights / 11 Days",
        image: templeImgCard1,
        recommended: ["Spiritual", "Cultural"]
      },
      {
        id: 2,
        slug: "temple-trail-pilgrimage",
        title: "Sri Lanka's Legends",
        duration: "8 Nights / 9 Days",
        image: templeImgCard2,
        recommended: ["History", "Mythology"]
      },
      {
        id: 3,
        slug: "temple-trail-pilgrimage",
        title: "Ramayana Mini Trail",
        duration: "5 Nights / 6 Days",
        image: templeImgCard3,
        recommended: ["Short Trip"]
      },
    ],

    features: [
      { name: "Chilaw", values: [true, true, true] },
      { name: "Munneshwaram Kovil", values: [true, true, true] },

      { name: "Kandy", values: [true, true, true] },
      { name: "Temple of the Tooth Relic", values: [true, true, true] },

      { name: "Nuwara Eliya", values: [true, true, true] },
      { name: "Sri Bhaktha Hanuman Temple", values: [true, true, true] },
      { name: "Tea Plantation", values: [true, true, true] },
      { name: "Divurumpola", values: [true, true, true] },
      { name: "Seeta Amman Temple", values: [true, true, true] },
      { name: "Ashoka Vatika", values: [true, true, true] },
      { name: "Gayathri Peedam", values: [true, true, true] },

      { name: "Colombo", values: [true, true, true] },
      { name: "Panchamuga Anjaneyar Temple", values: [true, true, true] },
      { name: "Kelaniya Rajamaha Temple", values: [true, true, true] },

      { name: "Ella", values: [false, true, false] },

      { name: "Kataragama", values: [false, true, false] },
      { name: "Kataragama Temple", values: [false, true, false] },

      { name: "Unawatuna", values: [false, true, true] },

      { name: "Roomassala", values: [false, true, true] },
      { name: "Roomassala Temple", values: [false, true, true] },

      { name: "Bentota", values: [false, true, true] },

      { name: "Galle", values: [false, false, true] },
      { name: "Galle Fort", values: [false, false, true] },

      { name: "Dambulla", values: [false, false, true] },
      { name: "Dambulla Cave Temple", values: [false, false, true] },

      { name: "Sigiriya", values: [false, false, true] },

      { name: "Trincomalee", values: [false, false, true] },
      { name: "Koneshwaram Temple", values: [false, false, true] }
    ],

    mapText: {
      heading: "Ramayana Trail Map",
      subheading: "Discover Sri Lanka's Legendary Journey",
      description: "Follow the sacred path of the Ramayana epic."
    }
  },

  golf: {
    title: "Golf Tours",
    description: "Sri Lanka is home to some of the oldest and finest golf courses in South Asia.",
    heroImage: golfImg,
    tours: [
      {
        id: 1,
        slug: "cultural-triangle-explorer",
        title: "18 Holes of Golfing",
        duration: "6 Nights / 7 Days",
        image: golfImg,
        recommended: ["Golf", "Luxury"]
      },
      {
        id: 2,
        slug: "cultural-triangle-explorer",
        title: "The Ultimate Golf Escape",
        duration: "10 Nights / 11 Days",
        image: golfImg,
        recommended: ["Golf", "Premium"]
      },
    ],

    features: [
      { name: "Colombo", values: [true, true] },
      { name: "City Tour", values: [true, true] },
      { name: "Colombo Golf Course", values: [false, true] },
      { name: "Kandy", values: [true, true] },
      { name: "Temple of the Tooth", values: [true, true] },
      { name: "Victoria Golf Course", values: [true, true] },
      { name: "Royal Botanical Garden", values: [false, true] },
      { name: "Negombo", values: [true, true] },
      { name: "Nuwara Eliya", values: [false, true] },
      { name: "Tea Factory", values: [false, true] },
      { name: "Nuwara Eliya Golf Club", values: [false, true] },
      { name: "Hambantota", values: [false, false] },
      { name: "Shangri La Golf Course", values: [false, true] }
    ],

    mapText: {
      heading: "Sri Lanka's Golf Paradise",
      subheading: "World-Class Courses in Tropical Settings",
      description: "Experience world-class golfing in stunning settings."
    }
  }
};

const TourCategory = () => {
  const { category: categorySlug } = useParams<{ category: string }>();
  const [tourCategory, setTourCategory] = useState<ITourCategory | null>(null);
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Static data fallback for features/mapText which aren't in backend yet
  const staticData = categoryData[categorySlug || "beach"] || categoryData.beach;

  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);

  useEffect(() => {
    const fetchData = async () => {
      if (!categorySlug) return;

      try {
        setLoading(true);
        // 1. Fetch Tour Category
        const categoryData = await fetchTourCategoryBySlug(categorySlug);

        if (!categoryData) {
          setError("Category not found");
          // Don't return here if we want to fallback to static data completely?
          // But user wants backend integration.
        } else {
          setTourCategory(categoryData);

          // 2. Fetch Packages for this category
          const packagesData = await fetchPackagesByCategoryId(categoryData._id);
          setPackages(packagesData);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [categorySlug]);

  if (loading) {
    return (
      <Layout>
        <div className="h-[60vh] flex flex-col items-center justify-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
          <p className="text-muted-foreground">Loading specific {categorySlug?.replace('-', ' ')} tours...</p>
        </div>
      </Layout>
    );
  }

  // If backend data is missing, we could fallback to staticData entirely, 
  // but for now let's try to use what we have.
  // If tourCategory is null (not found in backend), fall back to staticData if available
  const data = tourCategory ? {
    title: tourCategory.title,
    description: tourCategory.description || staticData.description,
    heroImage: tourCategory.images?.[0] || staticData.heroImage,
    tours: packages.map(pkg => ({
      id: pkg._id,
      slug: pkg.slug,
      title: pkg.packageName,
      duration: `${pkg.overview?.duration?.days || 0} Days / ${pkg.overview?.duration?.nights || 0} Nights`, // Adjust based on data availability
      image: pkg.hero?.backgroundImage || staticData.tours[0]?.image || beachSurfImg,
      recommended: pkg.hero?.title ? [pkg.hero.title] : ["Adventure"] // Placeholder
    })),
    features: staticData.features, // Backend doesn't have features yet
    mapText: staticData.mapText // Backend doesn't have mapText yet
  } : staticData;

  // If even static data is missing (unlikely given the specific keys), show error
  if (!data) {
    return (
      <Layout>
        <div className="py-20 text-center">
          <h2 className="text-2xl font-bold mb-4">Tour Category Not Found</h2>
          <Link to="/sri-lanka-tours" className="inline-flex items-center gap-2 text-primary hover:underline">
            <ArrowRight className="rotate-180 w-4 h-4" /> Return to Tours
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero Section with Parallax */}
      <section className="relative h-[90vh] min-h-[350px] overflow-hidden -mt-20">
        <motion.div
          className="absolute inset-0 bg-cover bg-center scale-110"
          style={{
            backgroundImage: `url(${data.heroImage})`,
            y: heroY
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-foreground/30 via-foreground/10 to-foreground/40" />
        </motion.div>
      </section>

      {/* Title Section */}
      <section className="pt-16 pb-8 bg-background">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-sm tracking-widest text-muted-foreground uppercase">
              Sri Lanka
            </span>
            <h1 className="section-title mt-2 mb-6">
              {data.title}
            </h1>
            <p className="text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              {data.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Tours - Modern Card Design */}
      <section className="py-8 pb-16 bg-background">
        <div className="container mx-auto px-4">
          {data.tours.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-muted-foreground">No tour packages available for this category yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {data.tours.map((tour, index) => (
                <motion.div
                  key={tour.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link
                    to={`/tour/${tour.slug}`}
                    className="group block"
                  >
                    <div className="relative overflow-hidden aspect-[4/5] rounded-lg shadow-lg">
                      {/* Background Image */}
                      <img
                        src={tour.image}
                        alt={tour.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />

                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/30 to-transparent" />

                      {/* Recommended Tag - Top */}
                      <div className="absolute top-4 left-4 right-4">
                        <span className="inline-block px-3 py-1.5 bg-secondary/90 backdrop-blur-sm text-secondary-foreground text-[10px] font-semibold tracking-wider uppercase rounded">
                          Recommended for {(tour.recommended || []).join(", ")}
                        </span>
                      </div>

                      {/* Content - Bottom */}
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        {/* Category Label */}
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-[10px] font-semibold tracking-widest uppercase text-primary-foreground/80">
                            {data.title}
                          </span>
                          <span className="w-8 h-[1px] bg-primary-foreground/50" />
                        </div>

                        {/* Tour Title */}
                        <h3 className="text-xl font-display font-bold text-primary-foreground mb-2 group-hover:text-secondary transition-colors duration-300">
                          {(tour.title || "").toUpperCase()}
                        </h3>

                        {/* Duration */}
                        <p className="text-sm text-primary-foreground/80">
                          {tour.duration}
                        </p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Comparison Table */}
      {data.features && data.features.length > 0 && (
        <section className="py-12 bg-sand">
          <div className="container mx-auto px-4">
            <div className="overflow-x-auto">
              <table className="w-full max-w-4xl mx-auto bg-card rounded-xl shadow-lg overflow-hidden">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-4 font-display font-semibold text-foreground">
                      Inclusions
                    </th>
                    {/* Only show up to 3 tours in comparison to fit/avoid overflow if many packages */}
                    {data.tours.slice(0, 3).map((tour) => (
                      <th key={tour.id} className="p-4 text-center">
                        <div className="font-display font-semibold text-foreground text-sm">
                          {tour.title}
                        </div>
                        <div className="text-muted-foreground text-xs mt-1">
                          {tour.duration}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.features.map((group, groupIndex) => {
                    // Handle grouped sections
                    if ('section' in group) {
                      return (
                        <React.Fragment key={group.section}>
                          {/* SECTION HEADER ROW */}
                          <tr className="bg-muted/60">
                            <td
                              colSpan={Math.min(data.tours.length, 3) + 1}
                              className="p-4 font-display font-semibold text-foreground uppercase tracking-wide"
                            >
                              {group.section}
                            </td>
                          </tr>

                          {/* FEATURE ROWS */}
                          {group.items.map((item, idx) => (
                            <tr
                              key={item.name}
                              className={idx % 2 === 0 ? "bg-card" : "bg-muted/30"}
                            >
                              <td className="p-4 text-sm text-foreground pl-8">
                                {item.name}
                              </td>

                              {item.values.slice(0, Math.min(data.tours.length, 3)).map((value, i) => (
                                <td key={i} className="p-4 text-center">
                                  {value ? (
                                    <Check className="w-5 h-5 text-forest mx-auto" />
                                  ) : (
                                    <X className="w-5 h-5 text-muted-foreground/40 mx-auto" />
                                  )}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </React.Fragment>
                      );
                    }

                    // Handle flat features
                    return (
                      <tr
                        key={group.name}
                        className={groupIndex % 2 === 0 ? "bg-card" : "bg-muted/30"}
                      >
                        <td className="p-4 text-sm text-foreground">
                          {group.name}
                        </td>

                        {group.values.slice(0, Math.min(data.tours.length, 3)).map((value, i) => (
                          <td key={i} className="p-4 text-center">
                            {value ? (
                              <Check className="w-5 h-5 text-forest mx-auto" />
                            ) : (
                              <X className="w-5 h-5 text-muted-foreground/40 mx-auto" />
                            )}
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>

              </table>
            </div>
          </div>
        </section>
      )}

      {/* Map Section */}
      {data.mapText && (
        <section className="py-16 bg-accent">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="relative order-2 lg:order-1">
                <img
                  src={mapImg}
                  alt="Map of Sri Lanka"
                  className="w-full max-w-sm mx-auto rounded-2xl shadow-xl"
                />
              </div>

              <div className="order-1 lg:order-2">
                <h2 className="text-3xl md:text-4xl font-display font-bold mt-3 mb-2">
                  {data.mapText.heading}
                </h2>
                <h3 className="text-xl md:text-2xl font-display font-medium text-primary mb-6">
                  {data.mapText.subheading}
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {data.mapText.description}
                </p>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-card p-4 rounded-lg">
                    <span className="text-2xl font-display font-bold text-primary">{data.tours.length}</span>
                    <p className="text-muted-foreground text-sm">Tour Packages</p>
                  </div>
                  <div className="bg-card p-4 rounded-lg">
                    <span className="text-2xl font-display font-bold text-primary">
                      {data.tours.length > 0 ? "4-14" : "0"}
                    </span>
                    <p className="text-muted-foreground text-sm">Days Duration</p>
                  </div>
                </div>

                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-ocean-light transition-all"
                >
                  Get a Custom Quote
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA Banner */}
      <section className="py-16 bg-ocean-dark">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-primary-foreground mb-4">
            Ready to Book Your {data.title.replace(" Tours", "")} Adventure ?
          </h2>
          <p className="text-primary-foreground/80 max-w-xl mx-auto mb-8">
            Contact our travel experts for personalized recommendations and exclusive deals.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-3 bg-secondary text-secondary-foreground font-semibold rounded-lg hover:brightness-110 transition-all"
            >
              Request Quote
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/sri-lanka-tours"
              className="inline-flex items-center gap-2 px-8 py-3 bg-primary-foreground/10 text-primary-foreground font-medium rounded-lg border border-primary-foreground/30 hover:bg-primary-foreground/20 transition-all"
            >
              View All Tours
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default TourCategory;