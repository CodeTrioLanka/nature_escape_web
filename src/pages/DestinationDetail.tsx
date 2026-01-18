import { useParams, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { MapPin, Calendar, Bus, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";

// Import images
import beachParadiseImg from "@/assets/beach-paradise.jpg";
import beachMirissaImg from "@/assets/beach-mirissa.jpg";
import beachUnawatunaImg from "@/assets/beach-unawatuna.jpg";
import sigiriyaImg from "@/assets/sigiriya.jpg";
import teaPlantationsImg from "@/assets/tea-plantations.jpg";
import templeImg from "@/assets/temple.jpg";
import wildlifeImg from "@/assets/wildlife.jpg";
import beachSurfImg from "@/assets/beach-surf.jpg";

interface PlaceToVisit {
  name: string;
  image: string;
}

interface DestinationData {
  name: string;
  subtitle: string;
  heroImage: string;
  description: string;
  atAGlance: {
    location: string;
    bestTime: string;
    transportation: string;
  };
  placesToVisit: PlaceToVisit[];
  tagline: string;
  taglineDescription: string;
  cafes?: string[];
  restaurants?: string[];
  workingSpaces?: string[];
  escapeTitle: string;
  escapeSubtitle: string;
  otherDestinations: {
    slug: string;
    name: string;
    image: string;
  }[];
}

const destinationsData: Record<string, DestinationData> = {
  "kalpitiya": {
    name: "Kalpitiya",
    subtitle: "Adventure Lagoon Haven",
    heroImage: beachParadiseImg,
    description: "Located on Sri Lanka's northwestern coast, Kalpitiya is a coastal village famed for its marine biodiversity and dolphin watching. Stretching between the Indian Ocean and Puttalam Lagoon, the peninsula offers unspoilt beaches, mangroves, and Bar Reef Marine Sanctuary, home to vivid coral and sea life. Kalpitiya remains a quiet escape with kite surfing spots, traditional fishing communities, and island excursions. Future eco-tourism plans aim to develop its islands sustainably, enhancing its charm as a nature and marine paradise.",
    atAGlance: {
      location: "View on Map",
      bestTime: "November - April",
      transportation: "Taxi, Private Car, Bus, Train"
    },
    placesToVisit: [
      { name: "Bar Reef Marine Sanctuary", image: beachParadiseImg },
      { name: "Dutch Fort Kalpitiya", image: templeImg },
      { name: "Puttalam Lagoon", image: beachMirissaImg },
      { name: "Wilpattu National Park", image: wildlifeImg }
    ],
    tagline: "Where Ocean Meets Lagoon Life",
    taglineDescription: "Kalpitiya blends nature and adventure, from dolphin safaris to coral snorkeling. Explore its fishing villages, kite surfing beaches, and mangrove-lined lagoons for a peaceful yet thrilling coastal escape unlike any other in Sri Lanka.",
    escapeTitle: "Plan Your Perfect",
    escapeSubtitle: "Escape",
    otherDestinations: [
      { slug: "ella", name: "Ella", image: teaPlantationsImg },
      { slug: "galle", name: "Galle", image: templeImg },
      { slug: "haputale", name: "Haputale", image: teaPlantationsImg }
    ]
  },
  "jaffna": {
    name: "Jaffna Peninsula",
    subtitle: "Cultural Northern Heritage",
    heroImage: templeImg,
    description: "The Jaffna Peninsula makes up the northernmost region of Sri Lanka and is the centre of the island's Tamil culture. While often considered similar to southern India, the peninsula has its own culture that is unique to the beliefs and lifestyle of Sri Lankan Tamils. Jaffna City is the region's capital and is often the best starting point for exploring the peninsula, while the suburb of Nallur provides a glimpse into the rich history and heritage of the area.",
    atAGlance: {
      location: "View on Map",
      bestTime: "May - September",
      transportation: "Public or Private"
    },
    placesToVisit: [
      { name: "Jaffna Public Library", image: templeImg },
      { name: "Nallur Kandaswamy Temple", image: sigiriyaImg }
    ],
    tagline: "Sri Lanka's Vibrant North Awaits",
    taglineDescription: "Explore Sri Lanka's vibrant Jaffna Peninsula and surround yourself with the rich history and heritage of the island's Tamil population. From sacred kovils to eventful festivals, it's a world of colour and intricate beliefs that captivates from the get-go.",
    escapeTitle: "Plan Your Perfect",
    escapeSubtitle: "Beach Escape",
    otherDestinations: [
      { slug: "ella", name: "Ella", image: teaPlantationsImg },
      { slug: "galle", name: "Galle", image: templeImg },
      { slug: "haputale", name: "Haputale", image: teaPlantationsImg }
    ]
  },
  "mirissa": {
    name: "Mirissa",
    subtitle: "Serene Whale Coast",
    heroImage: beachMirissaImg,
    description: "Mirissa, on Sri Lanka's southern coast, is a picturesque beach town known for its golden sands, turquoise waters, and relaxed atmosphere. It's a popular spot for surfing, snorkeling, and whale watching, especially between November and April. The town also offers vibrant nightlife, beachfront cafes, and scenic gems like Coconut Tree Hill. Whether you're seeking adventure or simply a place to unwind by the ocean, Mirissa blends natural beauty with coastal charm, making it a favourite among travellers.",
    atAGlance: {
      location: "View on Map",
      bestTime: "December - April",
      transportation: "Public & Private"
    },
    placesToVisit: [
      { name: "Mirissa Beach", image: beachMirissaImg },
      { name: "Coconut Tree Hill", image: teaPlantationsImg },
      { name: "Parrot Rock", image: beachParadiseImg },
      { name: "Secret Beach", image: beachUnawatunaImg }
    ],
    tagline: "Mirissa – A Laid-back Tropical Escape",
    taglineDescription: "Beaches, views, energy. If Mirissa had to be described in three words, these are what would be used. Visit for the sandy beaches, get mesmerised by the gorgeous views, and stay for the unmatched energy.",
    cafes: ["Korato Mirissa", "Latem Cafe", "Shady Lane Mirissa", "Aloha Coffee Gallery"],
    escapeTitle: "Beach Vibes",
    escapeSubtitle: "",
    otherDestinations: [
      { slug: "ella", name: "Ella", image: teaPlantationsImg },
      { slug: "galle", name: "Galle", image: templeImg },
      { slug: "haputale", name: "Haputale", image: teaPlantationsImg }
    ]
  },
  "udawalawe": {
    name: "Udawalawe",
    subtitle: "Wild Elephant Sanctuary",
    heroImage: wildlifeImg,
    description: "Discover the vibrant landscapes and scenery of Udawalawe, a town in Sri Lanka's Ratnapura district, known for its incredible natural beauty. Its main attraction is the Udawalawe National Park, which provides a home to several captivating wildlife species and surrounds the Udawalawe Reservoir. Nature lovers looking to enjoy Sri Lanka's natural beauty won't ever be disappointed with a visit to Udawalawe, where massive elephant herds and colourful bird species are abundant.",
    atAGlance: {
      location: "View on Map",
      bestTime: "May - September",
      transportation: "Public or Private"
    },
    placesToVisit: [
      { name: "Udawalawe National Park", image: wildlifeImg },
      { name: "Elephant Transit Home", image: wildlifeImg }
    ],
    tagline: "Surround Yourself with Nature's Beauty",
    taglineDescription: "Make your way to the scenic town of Udawalawe, where incredible wildlife encounters and lush landscapes await to bring you the best of Sri Lanka's captivating biodiversity. Get your safari gear ready for outdoor adventures you won't forget.",
    escapeTitle: "Plan Your Perfect",
    escapeSubtitle: "Escape",
    otherDestinations: [
      { slug: "ella", name: "Ella", image: teaPlantationsImg },
      { slug: "galle", name: "Galle", image: templeImg },
      { slug: "haputale", name: "Haputale", image: teaPlantationsImg }
    ]
  },
  "wilpattu": {
    name: "Wilpattu",
    subtitle: "Untamed Wilderness Reserve",
    heroImage: wildlifeImg,
    description: "Located in Sri Lanka's northwest, Wilpattu is the country's largest national park, famed for its unique 'villus' or natural lakes. Its dense forests, lakes, and grasslands create habitats for leopards, elephants, sloth bears, and deer. Unlike other parks, Wilpattu remains peaceful and less crowded, ideal for wildlife enthusiasts. Visitors can join guided jeep safaris to explore its rich biodiversity and birdlife. Its commitment to conservation and eco-tourism makes Wilpattu a must-visit for nature and adventure lovers.",
    atAGlance: {
      location: "View on Map",
      bestTime: "February - October",
      transportation: "Private Car, Safari Jeep Tours"
    },
    placesToVisit: [
      { name: "Natural Villus (Lakes)", image: beachParadiseImg },
      { name: "Birdwatching Trails", image: wildlifeImg },
      { name: "Forest and Coastal Belts", image: teaPlantationsImg }
    ],
    tagline: "Sri Lanka's Quiet Wildlife Haven",
    taglineDescription: "Wilpattu offers a peaceful wildlife experience with leopards, elephants, and abundant birdlife amid its lakes and forests. Its guided jeep safaris and eco-friendly stays make it a perfect destination for nature lovers seeking authentic wilderness encounters.",
    escapeTitle: "Plan Your Perfect",
    escapeSubtitle: "Escape",
    otherDestinations: [
      { slug: "ella", name: "Ella", image: teaPlantationsImg },
      { slug: "galle", name: "Galle", image: templeImg },
      { slug: "haputale", name: "Haputale", image: teaPlantationsImg }
    ]
  },
  "yala": {
    name: "Yala Region",
    subtitle: "Majestic Safari Land",
    heroImage: wildlifeImg,
    description: "While often synonymously associated with the Yala National Park, the Yala region in Sri Lanka's southern province encompasses several other parks, reserves and religious sites. This is because the region is abundant in rich biodiversity and is also steeped in history and culture, making it a hotspot for nature lovers and culture buffs. Adventures abound, from treacherous hikes to thrilling jeep safaris, to tranquil temple visits, and visitors will have plenty of picture-perfect scenes to capture on camera!",
    atAGlance: {
      location: "View on Map",
      bestTime: "February - July",
      transportation: "Public & Private"
    },
    placesToVisit: [
      { name: "Yala National Park", image: wildlifeImg },
      { name: "Bundala National Park", image: wildlifeImg },
      { name: "Lunugamvehera National Park", image: wildlifeImg },
      { name: "Sithulpawwa Rock Temple", image: templeImg },
      { name: "Kataragama Temple", image: sigiriyaImg }
    ],
    tagline: "Witness the Charm of Yala",
    taglineDescription: "A visit to the Yala region is one of the best ways to experience Sri Lanka's vibrant natural beauty that co-exists with the island's long-held religious culture and traditions, giving you an adventure like no other.",
    escapeTitle: "Plan Your Perfect",
    escapeSubtitle: "Escape",
    otherDestinations: [
      { slug: "ella", name: "Ella", image: teaPlantationsImg },
      { slug: "galle", name: "Galle", image: templeImg },
      { slug: "haputale", name: "Haputale", image: teaPlantationsImg }
    ]
  },
  "habarana": {
    name: "Habarana",
    subtitle: "Tropical Jungle Gateway",
    heroImage: wildlifeImg,
    description: "Situated in the heart of North Central Province, Habarana is a travel gem that is often overlooked. Yet, its proximity to Sri Lanka's greatest cultural treasures is what makes this city a dream destination. Habarana is surrounded by legendary relics of the island's past: Polonnaruwa, Anuradhapura, Dambulla and Sigiriya form the island's 'Cultural triangle', with ancient temples, gardens, and palace ruins dating back to Sri Lanka's first kingdoms — from a rock fortress shrouded by jungle to colossal 10th-century stupas.",
    atAGlance: {
      location: "View on Map",
      bestTime: "May - September",
      transportation: "Public & Private"
    },
    placesToVisit: [
      { name: "Sigiriya Rock Fortress", image: sigiriyaImg },
      { name: "Polonnaruwa Ruins", image: sigiriyaImg },
      { name: "Anuradhapura Sacred City", image: templeImg },
      { name: "Dambulla Royal Cave Temple", image: templeImg },
      { name: "Minneriya National Park", image: wildlifeImg }
    ],
    tagline: "Habarana, Your Next Getaway",
    taglineDescription: "Discover the best stops along the way as you explore Sri Lanka's cultural triangle. Relax or recharge just minutes from the top attractions, surrounded by ancient relics and protected biospheres rich with wildlife.",
    cafes: ["Chill & Swing Djabu", "Jagat Food Restaurant", "Kopi Restaurant", "Jeya's Vigan Manor"],
    workingSpaces: ["Cute Cafe", "Green House Resort Dambulla"],
    escapeTitle: "Plan the",
    escapeSubtitle: "Ultimate Getaway",
    otherDestinations: [
      { slug: "ella", name: "Ella", image: teaPlantationsImg },
      { slug: "galle", name: "Galle", image: templeImg },
      { slug: "haputale", name: "Haputale", image: teaPlantationsImg }
    ]
  },
  "hikkaduwa": {
    name: "Hikkaduwa",
    subtitle: "Vibrant Beach Escape",
    heroImage: beachParadiseImg,
    description: "Located on Sri Lanka's southwest coast, Hikkaduwa is a lively beach town famed for its coral sanctuary and surf waves. Known for Hikkaduwa Beach's palm-fringed sands lined with bars and restaurants, it offers both relaxation and adventure. The shallow reef shelters Hikkaduwa National Park, home to marine turtles and vivid coral gardens perfect for snorkeling. Beyond the coast, explore Gangarama Maha Vihara temple with its intricate murals. With its easy-going vibe and marine wonders, Hikkaduwa remains a top seaside escape.",
    atAGlance: {
      location: "View on Map",
      bestTime: "December - April",
      transportation: "Train, Bus, Private Car"
    },
    placesToVisit: [
      { name: "Hikkaduwa Beach", image: beachParadiseImg },
      { name: "Hikkaduwa Coral Sanctuary", image: beachMirissaImg },
      { name: "Telwatta Bird Sanctuary", image: teaPlantationsImg }
    ],
    tagline: "Surf, Coral, Culture, and Relaxation",
    taglineDescription: "Hikkaduwa offers a vibrant mix of surfing, coral reef snorkeling, and local culture. Whether it's exploring temples, enjoying seafood by the beach, or spotting marine turtles, this coastal town brings together adventure and tropical charm seamlessly.",
    restaurants: ["Refresh Beach Restaurant", "Tapi Beach Restaurant"],
    escapeTitle: "Plan Your Perfect",
    escapeSubtitle: "Escape",
    otherDestinations: [
      { slug: "ella", name: "Ella", image: teaPlantationsImg },
      { slug: "galle", name: "Galle", image: templeImg },
      { slug: "haputale", name: "Haputale", image: teaPlantationsImg }
    ]
  },
  "galle": {
    name: "Galle",
    subtitle: "Historic Coastal Gem",
    heroImage: templeImg,
    description: "The coastal town of Galle has a magnetic nature that draws visitors and locals alike to its beaches. Its crown jewel, the Galle Fort, is a UNESCO World Heritage Site filled with cobbled streets, Dutch-era buildings, art galleries and the iconic lighthouse. The city's mix of European architecture and Sri Lankan culture offers a unique atmosphere. Beyond the fort, Galle boasts beautiful beaches, bustling markets, and local eateries. It's an ideal destination for history lovers, creatives, and coastal wanderers alike.",
    atAGlance: {
      location: "View on Map",
      bestTime: "December - April",
      transportation: "Public & Private"
    },
    placesToVisit: [
      { name: "Galle Fort", image: templeImg },
      { name: "Galle Lighthouse", image: beachParadiseImg },
      { name: "Unawatuna Beach", image: beachUnawatunaImg }
    ],
    tagline: "Galle – A Coastal City Steeped in History",
    taglineDescription: "Galle's infectious nature comes from its ability to create a merge between two different times, that of the colonial past and the modern present. This combination is unbeatable, and you can see that for yourself.",
    cafes: ["Cafe 62", "Lauru Beach", "Pedlar's Inn Cafe", "Barista Cafe Aroma Unawatuna", "Tea Avenue - Galle"],
    escapeTitle: "Enchanting",
    escapeSubtitle: "Beach Fun",
    otherDestinations: [
      { slug: "ella", name: "Ella", image: teaPlantationsImg },
      { slug: "haputale", name: "Haputale", image: teaPlantationsImg },
      { slug: "hikkaduwa", name: "Hikkaduwa", image: beachParadiseImg }
    ]
  },
  "haputale": {
    name: "Haputale",
    subtitle: "Misty Tea Highlands",
    heroImage: teaPlantationsImg,
    description: "A small city at the very south of Sri Lanka's hill country, Haputale is teeming with scenic mountain views, sweeping tea plantations and a chilly climate that's a welcome respite from the heat of the lowlands. Curious visitors will have plenty to look forward to, from thrilling outdoor excursions that reveal magnificent viewpoints to journeys that take you back in time, each revealing a unique aspect of Sri Lanka's hillside charm.",
    atAGlance: {
      location: "View on Map",
      bestTime: "January - April",
      transportation: "Bus, Train, Private Car"
    },
    placesToVisit: [
      { name: "Adisham Bungalow", image: teaPlantationsImg },
      { name: "Devil's Staircase", image: teaPlantationsImg }
    ],
    tagline: "A Hidden Hillside Gem",
    taglineDescription: "Whether you're an adventurer looking to capture the best views of Sri Lanka's hill country or dive deeper into the history and traditions of Sri Lanka's tea industry, Haputale offers a memorable experience in the mountains you won't forget.",
    escapeTitle: "Plan Your Perfect",
    escapeSubtitle: "Escape",
    otherDestinations: [
      { slug: "ella", name: "Ella", image: teaPlantationsImg },
      { slug: "galle", name: "Galle", image: templeImg },
      { slug: "hikkaduwa", name: "Hikkaduwa", image: beachParadiseImg }
    ]
  },
  "ella": {
    name: "Ella",
    subtitle: "Scenic Mountain Paradise",
    heroImage: teaPlantationsImg,
    description: "Nestled in Sri Lanka's central highlands, Ella is a charming mountain town famous for its breathtaking views, lush tea plantations, and cool climate. Popular attractions include the iconic Nine Arch Bridge, Ella Rock, and Little Adam's Peak. The town offers a perfect blend of adventure and relaxation, with scenic train rides, waterfall hikes, and cozy cafes. Whether you're seeking outdoor adventures or peaceful mountain vibes, Ella delivers an unforgettable hill country experience.",
    atAGlance: {
      location: "View on Map",
      bestTime: "January - April",
      transportation: "Train, Bus, Private Car"
    },
    placesToVisit: [
      { name: "Nine Arch Bridge", image: teaPlantationsImg },
      { name: "Ella Rock", image: teaPlantationsImg },
      { name: "Little Adam's Peak", image: teaPlantationsImg },
      { name: "Ravana Falls", image: beachMirissaImg }
    ],
    tagline: "Where Mountains Meet Magic",
    taglineDescription: "Ella captivates with its misty mountains, rolling tea estates, and warm hospitality. From sunrise hikes to train journeys through tunnels and bridges, every moment in Ella feels like stepping into a postcard.",
    cafes: ["Cafe Chill", "Ella Flower Garden", "Dream Cafe"],
    escapeTitle: "Plan Your Perfect",
    escapeSubtitle: "Mountain Escape",
    otherDestinations: [
      { slug: "galle", name: "Galle", image: templeImg },
      { slug: "haputale", name: "Haputale", image: teaPlantationsImg },
      { slug: "hikkaduwa", name: "Hikkaduwa", image: beachParadiseImg }
    ]
  }
};

const DestinationDetail = () => {
  const { destinationSlug } = useParams<{ destinationSlug: string }>();
  const destination = destinationSlug ? destinationsData[destinationSlug] : null;
  const heroRef = useRef<HTMLDivElement>(null);
  const [carouselIndex, setCarouselIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  if (!destination) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-serif mb-4">Destination Not Found</h1>
            <p className="text-muted-foreground mb-8">The destination you're looking for doesn't exist.</p>
            <Link to="/">
              <Button>Return Home</Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  const handlePrev = () => {
    setCarouselIndex((prev) =>
      prev === 0 ? destination.otherDestinations.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCarouselIndex((prev) =>
      prev === destination.otherDestinations.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section ref={heroRef} className="relative h-[60vh] md:h-[70vh] overflow-hidden">
        <motion.div
          style={{ y: heroY, scale: heroScale }}
          className="absolute inset-0"
        >
          <img
            src={destination.heroImage}
            alt={destination.name}
            className="w-full h-full object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      </section>

      {/* Title Section */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-sm uppercase tracking-wider text-primary mb-2"
          >
            {destination.subtitle}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-serif mb-6"
          >
            {destination.name}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-muted-foreground leading-relaxed"
          >
            {destination.description}
          </motion.p>
        </div>
      </section>

      {/* At a Glance Section */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-serif text-center mb-8">
            {destination.name} at a Glance
          </h2>
          
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            <div className="flex flex-col items-center text-center">
              <MapPin className="w-6 h-6 mb-2 text-primary" />
              <p className="font-medium">Location</p>
              <p className="text-sm text-muted-foreground">{destination.atAGlance.location}</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <Calendar className="w-6 h-6 mb-2 text-primary" />
              <p className="font-medium">Best time to visit</p>
              <p className="text-sm text-muted-foreground">{destination.atAGlance.bestTime}</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <Bus className="w-6 h-6 mb-2 text-primary" />
              <p className="font-medium">Transportation</p>
              <p className="text-sm text-muted-foreground">{destination.atAGlance.transportation}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Places to Visit */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-8">
            <h3 className="text-sm uppercase tracking-wider font-medium">Places to Visit</h3>
            <div className="h-px bg-border flex-1 max-w-[60px]" />
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {destination.placesToVisit.map((place, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative aspect-square overflow-hidden rounded-lg cursor-pointer"
              >
                <img
                  src={place.image}
                  alt={place.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center gap-2">
                    <h4 className="text-white font-semibold text-sm uppercase tracking-wider">
                      {place.name}
                    </h4>
                    <div className="h-px bg-primary flex-1 max-w-[40px]" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tagline Section */}
      <section className="py-12 md:py-16 bg-background border-t border-b border-border">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-serif mb-4">{destination.tagline}</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            {destination.taglineDescription}
          </p>
          
          {/* Cafes */}
          {destination.cafes && destination.cafes.length > 0 && (
            <div className="mt-8">
              <div className="flex items-center justify-center gap-4 mb-4">
                <h4 className="text-sm uppercase tracking-wider font-medium">Cafes</h4>
                <div className="h-px bg-border w-12" />
              </div>
              <ul className="text-sm text-muted-foreground space-y-1">
                {destination.cafes.map((cafe, index) => (
                  <li key={index} className="hover:text-primary transition-colors cursor-pointer underline underline-offset-2">
                    {cafe}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Restaurants */}
          {destination.restaurants && destination.restaurants.length > 0 && (
            <div className="mt-8">
              <div className="flex items-center justify-center gap-4 mb-4">
                <h4 className="text-sm uppercase tracking-wider font-medium">Restaurants</h4>
                <div className="h-px bg-border w-12" />
              </div>
              <ul className="text-sm text-muted-foreground space-y-1">
                {destination.restaurants.map((restaurant, index) => (
                  <li key={index} className="hover:text-primary transition-colors cursor-pointer underline underline-offset-2">
                    {restaurant}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Working Spaces */}
          {destination.workingSpaces && destination.workingSpaces.length > 0 && (
            <div className="mt-8">
              <div className="flex items-center justify-center gap-4 mb-4">
                <h4 className="text-sm uppercase tracking-wider font-medium">Working Spaces</h4>
                <div className="h-px bg-border w-12" />
              </div>
              <ul className="text-sm text-muted-foreground space-y-1">
                {destination.workingSpaces.map((space, index) => (
                  <li key={index} className="hover:text-primary transition-colors cursor-pointer underline underline-offset-2">
                    {space}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      {/* Other Destinations Section */}
      <section className="py-16 bg-[#3d3a2f] text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <p className="text-sm italic mb-1">{destination.escapeTitle}</p>
            <h2 className="text-3xl md:text-4xl font-serif">{destination.escapeSubtitle || "Escape"}</h2>
            <p className="text-sm underline underline-offset-4 mt-4 cursor-pointer hover:text-primary transition-colors">
              Other Destinations
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={handlePrev}
                className="text-white hover:bg-white/10 shrink-0"
              >
                <ChevronLeft className="w-6 h-6" />
              </Button>

              <div className="grid grid-cols-3 gap-4 flex-1">
                {destination.otherDestinations.map((dest, index) => (
                  <Link
                    key={index}
                    to={`/destination/${dest.slug}`}
                    className="group relative aspect-[3/4] overflow-hidden rounded-lg"
                  >
                    <img
                      src={dest.image}
                      alt={dest.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold uppercase tracking-wider text-sm">
                          {dest.name}
                        </h4>
                        <div className="h-px bg-primary w-8" />
                      </div>
                    </div>
                    
                    {/* Hover Explore Button */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-primary/80 rounded-full p-3 flex items-center gap-2">
                        <span className="text-xs font-medium">EXPLORE</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              <Button
                variant="ghost"
                size="icon"
                onClick={handleNext}
                className="text-white hover:bg-white/10 shrink-0"
              >
                <ChevronRight className="w-6 h-6" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default DestinationDetail;
