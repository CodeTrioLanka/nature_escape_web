import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import srilanka_beach from "@/assets/srilanka_beach.webp";
import logo from "@/assets/nature-escape-logo.png";

const Footer = () => {
  return (
    <footer className="relative text-primary-foreground">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${srilanka_beach})` }}
      />
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative z-10 container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <Link to="/">
              <img 
                src={logo} 
                alt="Nature Escape" 
                className="h-20 w-auto object-contain mb-4"
              />
            </Link>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              Your gateway to unforgettable nature experiences in Sri Lanka. 
              Discover pristine beaches, lush forests, and exotic wildlife.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="p-2 bg-ocean-light/20 rounded-full hover:bg-secondary hover:text-secondary-foreground transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-ocean-light/20 rounded-full hover:bg-secondary hover:text-secondary-foreground transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-ocean-light/20 rounded-full hover:bg-secondary hover:text-secondary-foreground transition-colors">
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
              {["Cultural Tours", "Wildlife Safari", "Beach Holidays", "Adventure Tours", "Honeymoon Packages", "MICE"].map((item) => (
                <li key={item}>
                  <Link to="#" className="text-primary-foreground/70 hover:text-secondary transition-colors text-sm">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                <span className="text-primary-foreground/70 text-sm">
                  130 Galle Road, Colombo 03, Sri Lanka
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-secondary shrink-0" />
                <span className="text-primary-foreground/70 text-sm">+94 11 234 5678</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gold shrink-0" />
                <span className="text-primary-foreground/80 text-sm">info@natureescape.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative z-10 border-t border-ocean-light/20">
        <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-primary-foreground/70 text-sm">
            © 2026 Nature Escape. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link to="#" className="text-primary-foreground/60 hover:text-primary-foreground text-sm">
              Privacy Policy
            </Link>
            <Link to="#" className="text-primary-foreground/60 hover:text-primary-foreground text-sm">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
