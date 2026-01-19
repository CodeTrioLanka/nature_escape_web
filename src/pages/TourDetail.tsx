import { useParams, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Check, X, MapPin, Calendar, Users, Clock, ChevronRight, ChevronLeft, Phone } from "lucide-react";
import { useState, useRef, useEffect } from "react";

// Import images
import beachParadiseImg from "@/assets/beach-paradise.jpg";
import beachMirissaImg from "@/assets/beach-mirissa.jpg";
import beachUnawatunaImg from "@/assets/beach-unawatuna.jpg";
import sigiriyaImg from "@/assets/sigiriya.jpg";
import teaPlantationsImg from "@/assets/tea-plantations.jpg";
import templeImg from "@/assets/temple.jpg";
import wildlifeImg from "@/assets/wildlife.jpg";
import honeymoonImg from "@/assets/honeymoon.jpg";
import adventureImg from "@/assets/adventure.jpg";
import familyBeachImg from "@/assets/family-beach.jpg";
import sriLankaMapImg from "@/assets/sri-lanka-map.jpg";

interface TourData {
  title: string;
  subtitle: string;
  duration: string;
  groupSize: string;
  category: string;
  categoryLabel: string;
  heroImage: string;
  description: string;
  itinerary: {
    day: string;
    title: string;
    description: string;
  }[];
  gallery: string[];
  inclusions: string[];
  exclusions: string[];
  paymentMethods: string[];
  paymentpolicies: string[];
  faqs: {
    question: string;
    answer: string;
  }[];
  relatedTours: {
    slug: string;
    title: string;
    image: string;
    duration: string;
  }[];
  destinations: {
    name: string;
    image: string;
  }[];
}

const toursData: Record<string, TourData> = {
  "unawatuna-beach-escape": {
    title: "Eastern Blue Bliss",
    subtitle: "Sri Lanka Beach Tours",
    duration: "11 Nights & 12 Days",
    groupSize: "Ayubowan! Welcome to Sri Lanka.",
    category: "beach",
    categoryLabel: "Recommended for Adventure, Honeymoon",
    heroImage: beachUnawatunaImg,
    description: "Tucked away from the usual tourist trails, the North Eastern coast of Sri Lanka is a hidden paradise waiting to be discovered. With golden beaches that stretch for miles, untouched coral reefs teeming with marine life, and a rich cultural tapestry woven from Tamil and colonial heritage, this region offers an experience that’s both serene and soul-stirring. Whether you’re chasing adventure, seeking spiritual depth, or simply craving a quiet stretch of sand to call your own, Sri Lanka’s North Eastern coast is a treasure trove of authentic, unspoiled beauty.",
    itinerary: [

      {
        day: "Day 01",
        title: "Arrival",
        description: "Arrive in Sri Lanka and head to Negombo, just minutes from the airport. Relax after your flight, explore the lively fish market or take a peaceful boat ride through the mangroves, and enjoy a refreshing dip or evening walk along Negombo Beach."
      },

      {
        day: "Day 02",
        title: "Habarana",
        description: "Make a stop for the day at the cultural triangle of the country,Visit the Sigiriya Rock this evening for a spectacular sunset and the Sigiriya Rock is a UNESCO World Heritage site, whose ancient architectural tactics are bound to marvel you."
      },


      {
        day: "Day 03 & 04",
        title: "Trincomalee",
        description: "Spend the day exploring Trincomalee, a coastal gem in Sri Lanka’s North Eastern province, renowned for one of the world’s finest natural harbors. Enjoy crystal-clear waters, golden beaches, and rich cultural heritage as you visit the sacred Koneswaram Temple, take in panoramic views from Swami Rock, or dive into the vibrant marine life at Pigeon Island for an unforgettable seaside experience."
      },

      {
        day: "Day 05 & 06",
        title: "Pasikudah",
        description: "After breakfast, travel to Pasikudah on Sri Lanka’s east coast. This quiet coastal paradise is famous for its shallow, calm waters and long stretches of soft golden sand. The bay is ideal for safe swimming, as the sea remains waist-deep far from the shore, making it perfect for all ages."
      },

      {
        day: "Day 07 & 08",
        title: "Arugambay",
        description: "Bid farewell to Pasikudah and travel to Arugam Bay, a surfer’s paradise on Sri Lanka’s southeast coast. Known for its world-class waves, laid-back atmosphere, and palm-fringed beaches, Arugam Bay attracts surfers from around the world, especially from May to September when the swells are at their best."
      },

      {
        day: "Day 09",
        title: "Yala",
        description: "Making your way to the South, make a stop at Yala today. Head out on an evening safari at Yala National Park. With the highest density of leopards in Sri Lanka, test your luck with an exciting drive in search of the spotted leopard and many other endemic species."
      },

      {
        day: "Day 10",
        title: "Galle",
        description: "Today's stop is at the city of Galle, a perfect blend of colonial charm and seaside elegance. Explore the historic Galle Fort, a UNESCO World Heritage Site built by the Portuguese and later fortified by the Dutch. Wander through cobbled streets lined with cozy cafés, art galleries, boutique hotels, and admire old-world architecture embraced by the salty sea breeze."
      },

      {
        day: "Day 11",
        title: "Colombo",
        description: "Make your way to Colombo, the commercial hub of the country, for a perfect end to your Sri Lankan adventure. En-route, stop by the Kosgoda Turtle Hatchery. Enjoy some last-minute shopping and a tour around the city before departure."
      },

      {
        day: "Day 12",
        title: "Departure",
        description: "After a fun-filled and adventurous holiday in Sri Lanka, it's time to say goodbye! Today you will be transferred to the airport in time for your departure flight. Until next time, Ayubowan!"
      },

    ],
    gallery: [beachParadiseImg, beachMirissaImg, wildlifeImg],
    inclusions: [
      "Accommodation – Transportation in an air-conditioned vehicle with the services of a chauffeur guide -Entrance Tickets – Government Taxes",
    ],
    exclusions: [
      "Alcoholic Beverages",
      "Extra meals/snacks and beverages ordered from the hotel or outside the hotel.",
      "Early check ins and late check outs",
      "Tips & Expenses of personal nature",
      "Travel Insurance, Visa & Air Fare"
    ],
    paymentMethods: [
      "Please note we require 50% of the payment on confirmation and the balance 02 weeks prior to arrival. Or the full payment can be settled on confirmation.",
    ],
    paymentpolicies: [
      "50% deposit required at booking",
      "Full payment due 30 days before departure",
      "Free cancellation up to 14 days before departure"
    ],
    faqs: [
      { question: "Can activities be swapped & price for a single traveler?", answer: "Yes, we can customize activities based on your preferences. Single traveler supplements apply." },
      { question: "Can I extend this tour with additional destinations?", answer: "Absolutely! We offer extension packages to explore more of Sri Lanka." },
      { question: "I don't see what I like. Can I request a personalized tour plan?", answer: "Yes, contact us for a fully customized itinerary." },
      { question: "What kind of accommodation will be provided in this tour?", answer: "4-star beachfront resorts with modern amenities and ocean views." }
    ],
    relatedTours: [
      { slug: "mirissa-surf-retreat", title: "Mirissa Surf Retreat", image: beachMirissaImg, duration: "5 Days" },
      { slug: "southern-coastal-voyage", title: "Southern Coastal Voyage", image: beachParadiseImg, duration: "6 Days" }
    ],
    destinations: [
      { name: "Kalpitiya", image: beachParadiseImg },
      { name: "Jaffna", image: templeImg },
      { name: "Mirissa", image: beachMirissaImg },
      { name: "Udawalawe", image: wildlifeImg },
      { name: "Wilpattu", image: wildlifeImg },
      { name: "Yala", image: wildlifeImg },
      { name: "Habarana", image: sigiriyaImg },
      { name: "Hikkaduwa", image: beachParadiseImg },
      { name: "Galle", image: templeImg },
      { name: "Haputale", image: teaPlantationsImg },
      { name: "Ella", image: teaPlantationsImg }
    ]
  },
  "mirissa-surf-retreat": {
    title: "Mirissa Surf Retreat",
    subtitle: "Ride the Perfect Wave",
    duration: "5 Days / 4 Nights",
    groupSize: "2-8 People",
    category: "beach",
    categoryLabel: "Beach Tours",
    heroImage: beachMirissaImg,
    description: "Catch the perfect wave at Mirissa, Sri Lanka's premier surfing destination. Whether you're a beginner or experienced surfer, our retreat offers expert instruction, pristine beaches, and an unforgettable surfing experience on the Indian Ocean.",
    itinerary: [
      { day: "Day 01", title: "Arrival & Orientation", description: "Arrive in Mirissa, meet your surf instructors, equipment fitting, and beach orientation." },
      { day: "Day 02", title: "Beginner Surf Sessions", description: "Morning and afternoon surf lessons with experienced instructors." },
      { day: "Day 03", title: "Advanced Surfing", description: "Progress to more challenging waves, video analysis of your technique." },
      { day: "Day 04", title: "Free Surf & Whale Watching", description: "Morning free surf session, afternoon whale watching excursion." },
      { day: "Day 05", title: "Farewell Surf & Departure", description: "Final morning surf session and departure." }
    ],
    gallery: [beachMirissaImg, beachParadiseImg, beachUnawatunaImg],
    inclusions: ["Surf equipment rental", "Professional surf instruction", "Beachfront accommodation", "Daily breakfast", "Whale watching tour"],
    exclusions: ["International flights", "Travel insurance", "Personal expenses"],
    paymentMethods: ["Year-round departures", "Best surfing conditions November to April"],
    paymentpolicies: ["30% deposit required", "Full payment 14 days before"],
    faqs: [
      { question: "Do I need prior surfing experience?", answer: "No, we welcome all skill levels from complete beginners to advanced surfers." }
    ],
    relatedTours: [
      { slug: "unawatuna-beach-escape", title: "Unawatuna Beach Escape", image: beachUnawatunaImg, duration: "7 Days" }
    ],
    destinations: [
      { name: "Mirissa", image: beachMirissaImg },
      { name: "Weligama", image: beachParadiseImg }
    ]
  },
  "bentota-paradise": {
    title: "Bentota Paradise",
    subtitle: "Luxury Beach Getaway",
    duration: "4 Days / 3 Nights",
    groupSize: "2-6 People",
    category: "beach",
    categoryLabel: "Beach Tours",
    heroImage: beachParadiseImg,
    description: "Discover the luxurious beaches of Bentota, known for its water sports and upscale resorts. This exclusive getaway combines relaxation with adventure activities on the pristine southwestern coast.",
    itinerary: [
      { day: "Day 01", title: "Arrival in Bentota", description: "Transfer to your luxury resort, evening at leisure." },
      { day: "Day 02", title: "Water Sports Day", description: "Jet skiing, banana boat rides, and parasailing." },
      { day: "Day 03", title: "River Safari", description: "Madu River boat safari to see mangroves and wildlife." },
      { day: "Day 04", title: "Departure", description: "Farewell and transfer to airport." }
    ],
    gallery: [beachParadiseImg, beachMirissaImg, beachUnawatunaImg],
    inclusions: ["Luxury resort accommodation", "All water sports activities", "River safari", "Daily breakfast and dinner"],
    exclusions: ["International flights", "Travel insurance", "Personal expenses"],
    paymentMethods: ["Daily departures available"],
    paymentpolicies: ["50% deposit required at booking"],
    faqs: [],
    relatedTours: [
      { slug: "unawatuna-beach-escape", title: "Unawatuna Beach Escape", image: beachUnawatunaImg, duration: "7 Days" }
    ],
    destinations: [
      { name: "Bentota", image: beachParadiseImg }
    ]
  },
  "cultural-triangle-explorer": {
    title: "Cultural Triangle Explorer",
    subtitle: "Ancient Wonders of Ceylon",
    duration: "8 Days / 7 Nights",
    groupSize: "2-15 People",
    category: "cultural",
    categoryLabel: "Cultural Tours",
    heroImage: sigiriyaImg,
    description: "Journey through Sri Lanka's Cultural Triangle, home to ancient cities, sacred temples, and UNESCO World Heritage sites. Explore Sigiriya Rock Fortress, the ancient city of Polonnaruwa, and the sacred Temple of the Tooth in Kandy.",
    itinerary: [
      { day: "Day 01", title: "Arrival in Colombo", description: "Welcome to Sri Lanka! Transfer to Negombo for overnight stay." },
      { day: "Day 02", title: "Anuradhapura", description: "Explore the ancient city and sacred Bo Tree." },
      { day: "Day 03", title: "Sigiriya & Dambulla", description: "Climb Sigiriya Rock and visit Dambulla Cave Temple." },
      { day: "Day 04", title: "Polonnaruwa", description: "Discover the medieval capital's ancient ruins." },
      { day: "Day 05", title: "Minneriya Safari", description: "Wildlife safari to see the elephant gathering." },
      { day: "Day 06", title: "Kandy", description: "Temple of the Tooth and cultural dance show." },
      { day: "Day 07", title: "Peradeniya Gardens", description: "Explore the Royal Botanical Gardens." },
      { day: "Day 08", title: "Departure", description: "Transfer to Colombo airport." }
    ],
    gallery: [sigiriyaImg, templeImg, wildlifeImg],
    inclusions: ["All accommodation", "Daily breakfast and dinner", "Entrance fees", "Professional guide", "All transportation"],
    exclusions: ["International flights", "Travel insurance", "Personal expenses", "Optional activities"],
    paymentMethods: ["Weekly departures on Sundays", "Private tours available daily"],
    paymentpolicies: ["40% deposit required", "Balance due 21 days before departure"],
    faqs: [
      { question: "How strenuous is the Sigiriya climb?", answer: "The climb involves about 1,200 steps and takes 1-2 hours. Moderate fitness recommended." }
    ],
    relatedTours: [
      { slug: "temple-trail-pilgrimage", title: "Temple Trail Pilgrimage", image: templeImg, duration: "6 Days" }
    ],
    destinations: [
      { name: "Sigiriya", image: sigiriyaImg },
      { name: "Kandy", image: templeImg },
      { name: "Polonnaruwa", image: sigiriyaImg }
    ]
  },
  "temple-trail-pilgrimage": {
    title: "Temple Trail Pilgrimage",
    subtitle: "Sacred Journey Through Time",
    duration: "6 Days / 5 Nights",
    groupSize: "2-12 People",
    category: "cultural",
    categoryLabel: "Cultural Tours",
    heroImage: templeImg,
    description: "Embark on a spiritual journey visiting Sri Lanka's most sacred Buddhist temples and pilgrimage sites. Experience the deep spirituality and ancient traditions that have shaped the island's culture for over 2,500 years.",
    itinerary: [
      { day: "Day 01", title: "Arrival & Kelaniya Temple", description: "Visit Kelaniya Raja Maha Viharaya near Colombo." },
      { day: "Day 02", title: "Anuradhapura Sacred City", description: "Visit the Sri Maha Bodhi and ancient stupas." },
      { day: "Day 03", title: "Mihintale", description: "Climb to the birthplace of Buddhism in Sri Lanka." },
      { day: "Day 04", title: "Dambulla & Aluvihara", description: "Cave temples and ancient Buddhist manuscripts." },
      { day: "Day 05", title: "Kandy Temple of the Tooth", description: "Visit the most sacred Buddhist site in Sri Lanka." },
      { day: "Day 06", title: "Departure", description: "Transfer to airport." }
    ],
    gallery: [templeImg, sigiriyaImg, teaPlantationsImg],
    inclusions: ["Temple entrance fees", "Expert Buddhist guide", "All transportation", "Accommodation", "Vegetarian meals"],
    exclusions: ["International flights", "Travel insurance", "Personal offerings"],
    paymentMethods: ["Departures aligned with Buddhist full moon days", "Private tours available"],
    paymentpolicies: ["30% deposit required"],
    faqs: [],
    relatedTours: [
      { slug: "cultural-triangle-explorer", title: "Cultural Triangle Explorer", image: sigiriyaImg, duration: "8 Days" }
    ],
    destinations: [
      { name: "Kandy", image: templeImg },
      { name: "Anuradhapura", image: sigiriyaImg }
    ]
  },
  "romantic-honeymoon-escape": {
    title: "Romantic Honeymoon Escape",
    subtitle: "Love in Paradise",
    duration: "10 Days / 9 Nights",
    groupSize: "2 People",
    category: "honeymoon",
    categoryLabel: "Honeymoon Tours",
    heroImage: honeymoonImg,
    description: "Create unforgettable memories on this romantic journey through Sri Lanka's most enchanting destinations. From luxury treehouse stays to private beach dinners, every detail is designed to celebrate your love.",
    itinerary: [
      { day: "Day 01-02", title: "Sigiriya Treehouse", description: "Luxury treehouse stay with private butler service." },
      { day: "Day 03-04", title: "Kandy Romance", description: "Couples spa, temple visit, and private cultural show." },
      { day: "Day 05-06", title: "Ella Hill Country", description: "Train journey, waterfall picnics, and mountain views." },
      { day: "Day 07-08", title: "Yala Safari", description: "Private safari and luxury tented camp experience." },
      { day: "Day 09-10", title: "Beach Bliss", description: "Beachfront villa with private dinners and sunset cruises." }
    ],
    gallery: [honeymoonImg, beachParadiseImg, teaPlantationsImg],
    inclusions: ["Luxury accommodations", "Private transfers", "Couples spa treatments", "Private dinners", "All activities"],
    exclusions: ["International flights", "Travel insurance", "Alcoholic beverages"],
    paymentMethods: ["Available year-round", "Custom dates for your special occasion"],
    paymentpolicies: ["50% deposit", "Complimentary room upgrade when available"],
    faqs: [
      { question: "Can you arrange special surprises?", answer: "Yes! We specialize in romantic surprises including private dinners, flower arrangements, and celebration cakes." }
    ],
    relatedTours: [],
    destinations: [
      { name: "Ella", image: teaPlantationsImg },
      { name: "Bentota", image: beachParadiseImg }
    ]
  },
  "family-adventure-tour": {
    title: "Family Adventure Tour",
    subtitle: "Fun for All Ages",
    duration: "9 Days / 8 Nights",
    groupSize: "4-10 People",
    category: "family",
    categoryLabel: "Family Tours",
    heroImage: familyBeachImg,
    description: "Create lasting family memories on this adventure-packed tour designed for all ages. From elephant encounters to beach fun, every day brings new discoveries and excitement for the whole family.",
    itinerary: [
      { day: "Day 01", title: "Welcome to Sri Lanka", description: "Arrival and transfer to family-friendly resort." },
      { day: "Day 02", title: "Elephant Orphanage", description: "Visit Pinnawala and interact with baby elephants." },
      { day: "Day 03", title: "Sigiriya Adventure", description: "Climb Sigiriya or explore Pidurangala Rock." },
      { day: "Day 04", title: "Safari Day", description: "Jeep safari at Minneriya National Park." },
      { day: "Day 05", title: "Train Journey", description: "Scenic train ride through tea country." },
      { day: "Day 06", title: "Tea Factory Visit", description: "Learn how tea is made, chocolate factory tour." },
      { day: "Day 07-08", title: "Beach Days", description: "Water sports, turtle hatchery, and beach fun." },
      { day: "Day 09", title: "Departure", description: "Farewell and airport transfer." }
    ],
    gallery: [familyBeachImg, wildlifeImg, teaPlantationsImg],
    inclusions: ["Family rooms", "Child-friendly meals", "All activities", "Private vehicle", "Kids' activity packs"],
    exclusions: ["International flights", "Travel insurance", "Personal expenses"],
    paymentMethods: ["School holiday departures", "Private family tours any date"],
    paymentpolicies: ["Children under 5 stay free", "Special family pricing available"],
    faqs: [
      { question: "What ages is this tour suitable for?", answer: "This tour is designed for children ages 4 and up, with activities adaptable for all ages." }
    ],
    relatedTours: [],
    destinations: [
      { name: "Pinnawala", image: wildlifeImg },
      { name: "Bentota", image: beachParadiseImg }
    ]
  },
  "wildlife-safari-expedition": {
    title: "Wildlife Safari Expedition",
    subtitle: "Into the Wild",
    duration: "6 Days / 5 Nights",
    groupSize: "2-8 People",
    category: "wildlife",
    categoryLabel: "Wildlife Tours",
    heroImage: wildlifeImg,
    description: "Embark on an unforgettable wildlife expedition through Sri Lanka's premier national parks. Spot leopards, elephants, sloth bears, and hundreds of bird species in their natural habitats.",
    itinerary: [
      { day: "Day 01", title: "Arrival & Wilpattu", description: "Transfer to Wilpattu, evening safari." },
      { day: "Day 02", title: "Wilpattu Safari", description: "Full day leopard tracking safari." },
      { day: "Day 03", title: "Minneriya", description: "The Gathering - largest elephant congregation." },
      { day: "Day 04", title: "Yala National Park", description: "World's highest leopard density." },
      { day: "Day 05", title: "Yala Safari", description: "Morning and afternoon safaris." },
      { day: "Day 06", title: "Departure", description: "Morning birding and departure." }
    ],
    gallery: [wildlifeImg, sigiriyaImg, beachParadiseImg],
    inclusions: ["Safari jeeps", "Park entrance fees", "Expert naturalist guides", "Luxury safari lodges", "All meals"],
    exclusions: ["International flights", "Travel insurance", "Camera fees"],
    paymentMethods: ["Best wildlife viewing February to October"],
    paymentpolicies: ["Early booking recommended for peak season"],
    faqs: [
      { question: "What are the chances of seeing a leopard?", answer: "Yala has excellent leopard sighting rates, with chances over 60% on a full day safari." }
    ],
    relatedTours: [],
    destinations: [
      { name: "Yala", image: wildlifeImg },
      { name: "Wilpattu", image: wildlifeImg }
    ]
  },
  "adventure-adrenaline-rush": {
    title: "Adventure Adrenaline Rush",
    subtitle: "Thrills & Excitement",
    duration: "7 Days / 6 Nights",
    groupSize: "2-10 People",
    category: "adventure",
    categoryLabel: "Adventure Tours",
    heroImage: adventureImg,
    description: "Get your adrenaline pumping with this action-packed adventure tour. From white water rafting to rock climbing, zip-lining to waterfall abseiling, this tour is designed for thrill-seekers.",
    itinerary: [
      { day: "Day 01", title: "Arrival & Kitulgala", description: "Transfer to adventure base camp." },
      { day: "Day 02", title: "White Water Rafting", description: "Grade 3-4 rapids on Kelani River." },
      { day: "Day 03", title: "Canyoning", description: "Waterfall abseiling and cliff jumping." },
      { day: "Day 04", title: "Ella Rock Trek", description: "Sunrise hike to Ella Rock summit." },
      { day: "Day 05", title: "Zip Line & Cycling", description: "Mega zip line and mountain biking." },
      { day: "Day 06", title: "Surfing", description: "Surf lessons at Arugam Bay." },
      { day: "Day 07", title: "Departure", description: "Morning beach time and departure." }
    ],
    gallery: [adventureImg, teaPlantationsImg, beachMirissaImg],
    inclusions: ["All adventure activities", "Safety equipment", "Expert guides", "Adventure lodges", "Meals"],
    exclusions: ["International flights", "Travel insurance (mandatory)", "Personal gear"],
    paymentMethods: ["Year-round departures", "Best conditions April to September"],
    paymentpolicies: ["Medical fitness declaration required", "Minimum age 16 years"],
    faqs: [
      { question: "Do I need experience?", answer: "No prior experience needed. All activities include safety briefings and expert instruction." }
    ],
    relatedTours: [],
    destinations: [
      { name: "Kitulgala", image: adventureImg },
      { name: "Ella", image: teaPlantationsImg }
    ]
  }
};

// Destinations Carousel Component
const DestinationsCarousel = ({ destinations, categoryLabel }: {
  destinations: { name: string; image: string }[];
  categoryLabel: string;
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsPerView = 4;
  const maxIndex = Math.max(0, destinations.length - itemsPerView);

  const scroll = (direction: 'left' | 'right') => {
    if (direction === 'left') {
      setCurrentIndex(prev => Math.max(0, prev - 1));
    } else {
      setCurrentIndex(prev => Math.min(maxIndex, prev + 1));
    }
  };

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-sm uppercase tracking-wider text-muted-foreground mb-2">Plan your Perfect</h2>
          <h3 className="text-3xl md:text-4xl font-serif">{categoryLabel.replace(' Tours', '')} Escape</h3>

          <div className="flex justify-center gap-4 mt-6">
            <Button variant="outline" size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">All Destinations</Button>
            <Button variant="ghost" size="sm">Top Beaches</Button>
          </div>
        </div>

        <div className="relative max-w-6xl mx-auto">
          {/* Navigation Arrows */}
          <button
            onClick={() => scroll('left')}
            disabled={currentIndex === 0}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 z-10 w-10 h-10 rounded-full bg-background border border-border shadow-lg flex items-center justify-center hover:bg-muted transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={() => scroll('right')}
            disabled={currentIndex >= maxIndex}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 z-10 w-10 h-10 rounded-full bg-background border border-border shadow-lg flex items-center justify-center hover:bg-muted transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Carousel Container */}
          <div className="overflow-hidden" ref={containerRef}>
            <div
              className="flex gap-4 transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView + 1.5)}%)` }}
            >
              {destinations.map((destination, index) => (
                <Link
                  key={index}
                  to={`/destination/${destination.name.toLowerCase().replace(/\s+/g, '-')}`}
                  className="group relative flex-shrink-0 w-[calc(25%-12px)] aspect-[3/4] overflow-hidden rounded-lg cursor-pointer"
                >
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold uppercase tracking-wider text-sm">{destination.name}</h4>
                      <div className="h-px bg-primary w-8" />
                    </div>
                  </div>

                  {/* Hover Explore Button */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-primary/80 rounded-full p-3 flex items-center gap-2">
                      <span className="text-xs font-medium text-primary-foreground">EXPLORE</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const TourDetail = () => {
  const { tourSlug } = useParams<{ tourSlug: string }>();

  const tour = tourSlug ? toursData[tourSlug] : null;

  if (!tour) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Tour Not Found</h1>
            <Link to="/sri-lanka-tours">
              <Button>Back to Tours</Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[500px]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${tour.heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60" />
        </div>

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white px-4">
          <span className="inline-block bg-primary/90 text-primary-foreground px-4 py-1 rounded-full text-sm font-medium mb-4">
            {tour.categoryLabel}
          </span>
          <h1 className="text-4xl md:text-6xl font-bold mb-2">{tour.title}</h1>
          <div className="flex items-center gap-2 text-lg mb-4 opacity-80">
            <span className="w-12 h-px bg-white/60"></span>
            <span>{tour.subtitle}</span>
            <span className="w-12 h-px bg-white/60"></span>
          </div>

          <div className="flex flex-wrap justify-center gap-6 mt-4 text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{tour.duration}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>{tour.groupSize}</span>
            </div>
          </div>

          <p className="max-w-3xl mt-6 text-white/90 leading-relaxed">
            {tour.description}
          </p>

          <Button size="lg" className="mt-8 bg-primary hover:bg-primary/90">
            <Phone className="w-4 h-4 mr-2" />
            Inquire Now
          </Button>
        </div>
      </section>

      {/* Itinerary Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-sm text-primary uppercase tracking-wider mb-2">Through the Hills</h2>
            <h3 className="text-3xl md:text-4xl font-serif">to the Sea</h3>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {tour.itinerary.map((item, index) => (
                <AccordionItem key={index} value={`day-${index}`} className="border-b border-border">
                  <AccordionTrigger className="hover:no-underline py-4">
                    <div className="flex items-center gap-6 text-left">
                      <span className="bg-primary/10 text-primary font-semibold px-4 py-2 rounded text-sm min-w-[80px] text-center">
                        {item.day}
                      </span>
                      <span className="font-medium text-foreground">{item.title}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pl-[110px] text-muted-foreground">
                    {item.description}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Visual Journeys Gallery */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif">Visual Journeys</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {tour.gallery.map((image, index) => (
              <div key={index} className="aspect-[4/3] overflow-hidden rounded-lg">
                <img
                  src={image}
                  alt={`Gallery ${index + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Inclusions & Info Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {/* Inclusions */}
            <div>
              <h3 className="font-semibold text-lg mb-4 text-foreground border-b border-primary pb-2">
                INCLUSIONS
              </h3>
              <ul className="space-y-2">
                {tour.inclusions.map((item, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Exclusions */}
            <div>
              <h3 className="font-semibold text-lg mb-4 text-foreground border-b border-primary pb-2">
                EXCLUSIONS
              </h3>
              <ul className="space-y-2">
                {tour.exclusions.map((item, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <X className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Departure Info */}
            <div>
              <h3 className="font-semibold text-lg mb-4 text-foreground border-b border-primary pb-2">
              PAYMENT METHODS
              </h3>
              <ul className="space-y-2">
                {tour.paymentMethods.map((item, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <ChevronRight className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Booking Info */}
            <div>
              <h3 className="font-semibold text-lg mb-4 text-foreground border-b border-primary pb-2">
                PAYMENT POLICIES
              </h3>
              <ul className="space-y-2">
                {tour.paymentpolicies.map((item, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <ChevronRight className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Route Map Section */}
      <section className="py-16 bg-[#2c3e50]">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center max-w-6xl mx-auto">
            <div className="text-white">
              <h2 className="text-sm uppercase tracking-wider mb-2 opacity-70">Here is your</h2>
              <h3 className="text-3xl md:text-4xl font-serif mb-4">
                {tour.title} <span className="text-primary">Route</span>
              </h3>
              <p className="text-white/70 leading-relaxed">
                Travel with us through the most breathtaking landscapes of Sri Lanka.
                Our carefully curated route takes you through hidden gems and iconic destinations,
                creating memories that will last a lifetime.
              </p>
            </div>
            <div className="flex justify-center">
              <img
                src={sriLankaMapImg}
                alt="Tour Route Map"
                className="max-w-[300px] rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      {tour.faqs.length > 0 && (
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto items-center">
              <div className="aspect-[4/3] overflow-hidden rounded-lg">
                <img
                  src={tour.gallery[0]}
                  alt="Tour Experience"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h2 className="text-sm uppercase tracking-wider text-muted-foreground mb-2">Everything</h2>
                <h3 className="text-3xl md:text-4xl font-serif mb-8">You Need to Know</h3>

                <Accordion type="single" collapsible className="w-full">
                  {tour.faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`faq-${index}`}>
                      <AccordionTrigger className="text-left text-sm font-medium">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground text-sm">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Related Tours */}
      {tour.relatedTours.length > 0 && (
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-sm uppercase tracking-wider text-muted-foreground mb-2">More Journeys to</h2>
              <h3 className="text-3xl md:text-4xl font-serif">Discover</h3>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {tour.relatedTours.map((related, index) => (
                <Link
                  key={index}
                  to={`/tour/${related.slug}`}
                  className="group relative aspect-[4/3] overflow-hidden rounded-lg"
                >
                  <img
                    src={related.image}
                    alt={related.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <p className="text-xs uppercase tracking-wider opacity-70">{tour.categoryLabel}</p>
                    <h4 className="font-semibold">{related.title}</h4>
                    <p className="text-sm opacity-70">{related.duration}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Destinations Carousel Section */}
      {tour.destinations.length > 0 && (
        <DestinationsCarousel
          destinations={tour.destinations}
          categoryLabel={tour.categoryLabel}
        />
      )}

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-serif mb-4">Ready to Start Your Journey?</h2>
          <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Contact our travel experts to customize this tour or create your perfect Sri Lanka adventure.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact">
              <Button size="lg" variant="secondary">
                Contact Us
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
              <Phone className="w-4 h-4 mr-2" />
              +94 11 234 5678
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default TourDetail;
