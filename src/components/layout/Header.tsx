import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, Menu, X, ChevronRight } from "lucide-react";
import logo from "@/assets/nature-escape-logo.png";
import { fetchTourCategories } from "@/api/tours.api";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [dropdownItems, setDropdownItems] = useState<{ name: string; href: string }[]>([]);
  const [mobileSubmenuOpen, setMobileSubmenuOpen] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const categories = await fetchTourCategories();
        const items = categories.map(cat => ({
          name: cat.title,
          href: `/sri-lanka-tours/${cat.slug.trim()}`
        }));
        setDropdownItems(items);
      } catch (error) {
        console.error("Failed to load navigation categories", error);
      }
    };
    loadCategories();
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "HOME", href: "/" },
    { name: "ABOUT US", href: "/about" },
    {
      name: "SRI LANKA TOURS",
      href: "/sri-lanka-tours",
      hasDropdown: true,
      dropdown: dropdownItems.length > 0 ? dropdownItems : [
        { name: "Loading...", href: "#" }
      ]
    },
    { name: "EXCURSIONS", href: "/excursions" },
    { name: "THINGS TO DO", href: "/things-to-do" },
    { name: "SERVICES", href: "/services" },
    { name: "REVIEWS", href: "/reviews" },
    { name: "CONTACT", href: "/contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
          ? "bg-black/20 backdrop-blur-md border-b border-white/10 hover:bg-black/40"
          : "bg-transparent"
          }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 relative z-50">
              <img
                src={logo}
                alt="Nature Escape"
                className="h-14 w-auto object-contain drop-shadow-md"
              />
              <span className="text-xl font-display font-bold text-white hidden sm:block drop-shadow-lg">
                Nature<span className="text-gold">Escape</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                <div
                  key={item.name}
                  className="relative group"
                  onMouseEnter={() => item.hasDropdown && setActiveDropdown(item.name)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    to={item.href}
                    className={`px-4 py-2 flex items-center gap-1 text-white/90 font-medium text-sm tracking-wide transition-all duration-200 hover:text-white hover:bg-white/10 rounded-lg ${location.pathname === item.href ||
                      (item.hasDropdown && location.pathname.startsWith(item.href))
                      ? "text-white bg-white/10"
                      : ""
                      }`}
                  >
                    {item.name}
                    {item.hasDropdown && (
                      <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${activeDropdown === item.name ? 'rotate-180' : ''}`} />
                    )}
                  </Link>

                  {/* Desktop Dropdown */}
                  {item.hasDropdown && (
                    <div className={`absolute top-full left-0 w-64 pt-2 transition-all duration-200 ${activeDropdown === item.name ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`}>
                      <div className="bg-white shadow-xl rounded-xl overflow-hidden border border-border/50 py-2">
                        {item.dropdown?.map((subItem) => (
                          <Link
                            key={subItem.name}
                            to={subItem.href}
                            className="block px-4 py-2.5 text-sm text-foreground/80 hover:text-primary hover:bg-accent/50 transition-colors duration-150"
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 text-white relative z-50 focus:outline-none"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <div className="relative w-6 h-6">
                <AnimatePresence mode="wait">
                  {isMobileMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ opacity: 0, rotate: -90 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      exit={{ opacity: 0, rotate: 90 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="w-6 h-6" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ opacity: 0, rotate: 90 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      exit={{ opacity: 0, rotate: -90 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="w-6 h-6" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay - Separate from Header to ensure full screen coverage */}
      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/20 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Menu Content */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-white/95 backdrop-blur-xl shadow-2xl pt-24 pb-8 px-6 overflow-y-auto border-l border-white/20"
            >
              <nav className="flex flex-col space-y-6">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                    className="group"
                  >
                    <div className="flex items-center justify-between border-b border-gray-100/50 pb-2">
                      <Link
                        to={item.href}
                        className="text-xl font-display font-medium text-gray-800 group-hover:text-primary transition-colors block flex-1"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                      {item.hasDropdown && (
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            setMobileSubmenuOpen(mobileSubmenuOpen === item.name ? null : item.name);
                          }}
                          className="p-2 text-gray-400 hover:text-primary transition-colors"
                        >
                          <ChevronRight className={`w-5 h-5 transition-transform duration-300 ${mobileSubmenuOpen === item.name ? 'rotate-90 text-primary' : ''}`} />
                        </button>
                      )}
                    </div>

                    {/* Mobile Submenu */}
                    <AnimatePresence>
                      {item.hasDropdown && mobileSubmenuOpen === item.name && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="pl-4 py-3 space-y-3 mt-1 border-l-2 border-primary/10 ml-1">
                            {item.dropdown?.map((subItem) => (
                              <Link
                                key={subItem.name}
                                to={subItem.href}
                                className="block text-base text-gray-600 hover:text-primary hover:translate-x-1 transition-all duration-200"
                                onClick={() => setIsMobileMenuOpen(false)}
                              >
                                {subItem.name}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </nav>

              {/* Mobile Menu Footer */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-12 pt-6 border-t border-gray-100"
              >
                <div className="flex justify-center space-x-4 mb-4">
                  {/* Add your social icons here if needed */}
                </div>
                <p className="text-center text-gray-400 text-xs tracking-wider uppercase">
                  © 2024 Nature Escape
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
