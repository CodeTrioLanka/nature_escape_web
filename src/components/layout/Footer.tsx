import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchContactDetails } from "@/api/contact.api";
import { fetchTourCategories } from "@/api/tours.api";
import srilanka_beach from "@/assets/srilanka_beach.webp";
const logo = "/logov2.jpeg";

const Footer = () => {
  // Fetch contact details (shared cache with Contact page)
  const { data: contactDetails } = useQuery({
    queryKey: ["contactDetails"],
    queryFn: fetchContactDetails,
    staleTime: 1000 * 60 * 10, // 10 minutes
  });

  // Fetch tour categories (shared cache with Sri Lanka Tours page)
  const { data: tourCategories } = useQuery({
    queryKey: ["tourCategories"],
    queryFn: fetchTourCategories,
    staleTime: 1000 * 60 * 10,
  });

  // Dynamic values with fallbacks
  const address =
    contactDetails?.address && contactDetails.address.length > 0
      ? contactDetails.address.join(", ")
      : "130 Galle Road, Colombo 03, Sri Lanka";

  const phones =
    contactDetails?.phone && contactDetails.phone.length > 0
      ? contactDetails.phone
      : ["+94 11 277 0294", "+94 76 311 9077"];

  const emailAddress =
    contactDetails?.email && contactDetails.email.length > 0
      ? contactDetails.email[0]
      : "slnatureescape@gmail.com";

  const socials = contactDetails?.socials;

  return (
    <footer className="relative text-primary-foreground">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${srilanka_beach})` }}
      />
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative z-10 container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 text-center md:text-left">
          {/* Brand */}
          <div>
            <Link to="/" className="inline-block">
              <img
                src={logo}
                alt="Nature Escape"
                className="h-20 w-auto object-contain mb-4 mx-auto md:mx-0"
              />
            </Link>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              Creating unforgettable travel experiences that connect you with nature, culture, and adventure.
            </p>
            <div className="flex justify-center md:justify-start space-x-4 mt-6">
              <a href={socials?.facebook || "#"} target={socials?.facebook ? "_blank" : undefined} rel="noopener noreferrer" className="p-2 bg-ocean-light/20 rounded-full hover:bg-secondary hover:text-secondary-foreground transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href={socials?.instagram || "#"} target={socials?.instagram ? "_blank" : undefined} rel="noopener noreferrer" className="p-2 bg-ocean-light/20 rounded-full hover:bg-secondary hover:text-secondary-foreground transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href={socials?.twitter || "#"} target={socials?.twitter ? "_blank" : undefined} rel="noopener noreferrer" className="p-2 bg-ocean-light/20 rounded-full hover:bg-secondary hover:text-secondary-foreground transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-ocean-light/20 rounded-full hover:bg-secondary hover:text-secondary-foreground transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {["Sri Lanka Tours", "About Us", "Sustainability", "Excursions", "Things To Do", "Contact"].map((item) => (
                <li key={item}>
                  <Link to="#" className="text-primary-foreground/70 hover:text-secondary transition-colors text-sm">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tour Categories */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Tour Categories</h4>
            <ul className="space-y-2">
              {tourCategories && tourCategories.length > 0
                ? tourCategories.map((cat) => (
                    <li key={cat._id}>
                      <Link to={`/sri-lanka-tours/${cat.slug}`} className="text-primary-foreground/70 hover:text-secondary transition-colors text-sm">
                        {cat.title}
                      </Link>
                    </li>
                  ))
                : ["Cultural Tours", "Wildlife Safari", "Beach Holidays", "Adventure Tours", "Honeymoon Packages", "MICE"].map((item) => (
                    <li key={item}>
                      <Link to="/sri-lanka-tours" className="text-primary-foreground/70 hover:text-secondary transition-colors text-sm">
                        {item}
                      </Link>
                    </li>
                  ))
              }
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex flex-col md:flex-row items-center md:items-start gap-2 md:gap-3">
                <MapPin className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                <span className="text-primary-foreground/70 text-sm">
                  {address}
                </span>
              </li>
              {phones.map((p, idx) => (
                <li key={idx} className="flex flex-col md:flex-row items-center md:items-center gap-2 md:gap-3">
                  <Phone className="w-5 h-5 text-secondary shrink-0" />
                  <a href={`tel:${p.replace(/\s/g, "")}`} className="text-primary-foreground/70 text-sm hover:text-secondary transition-colors">
                    {p}
                  </a>
                </li>
              ))}
              <li className="flex flex-col md:flex-row items-center md:items-center gap-2 md:gap-3">
                <Mail className="w-5 h-5 text-gold shrink-0" />
                <a href={`mailto:${emailAddress}`} className="text-primary-foreground/80 text-sm hover:text-gold transition-colors">
                  {emailAddress}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative z-10 border-t border-ocean-light/20">
        <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-primary-foreground/70 text-sm">
            © 2026{" "}
            <a
              href="https://www.codetriolanka.lk/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary hover:text-secondary/80 transition-colors font-semibold"
            >
              CodeTrio Lanka Solutions
            </a>
            . All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="https://www.codetriolanka.lk/" target="_blank" rel="noopener noreferrer" className="text-primary-foreground/60 hover:text-primary-foreground text-sm transition-colors">
              Website design and develop by CodeTrioLanka
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

