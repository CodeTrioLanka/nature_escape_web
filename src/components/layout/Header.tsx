import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, Menu, X } from "lucide-react";
import logo from "@/assets/nature-escape-logo.png";
import { fetchTourCategories } from "@/api/tours.api";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [dropdownItems, setDropdownItems] = useState<{ name: string; href: string }[]>([]);
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
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/50 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img
              src={logo}
              alt="Nature Escape"
              className="h-14 w-auto object-contain"
            />
            <span className="text-xl font-display font-bold text-foreground hidden sm:block">
              Nature<span className="text-forest">Escape</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => item.hasDropdown && setActiveDropdown(item.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  to={item.href}
                  className={`px-4 py-2 flex items-center gap-1 text-foreground font-medium text-sm tracking-wide transition-colors duration-200 hover:text-ocean ${location.pathname === item.href ||
                    (item.hasDropdown && location.pathname.startsWith(item.href))
                    ? "text-ocean"
                    : ""
                    }`}
                >
                  {item.name}
                  {item.hasDropdown && (
                    <ChevronDown className="w-4 h-4 transition-transform duration-200"
                      style={{ transform: activeDropdown === item.name ? "rotate(180deg)" : "rotate(0)" }}
                    />
                  )}
                </Link>

                {/* Dropdown */}
                {item.hasDropdown && activeDropdown === item.name && (
                  <div className="absolute top-full left-0 w-56 bg-card shadow-xl rounded-md overflow-hidden animate-fade-in">
                    {item.dropdown?.map((subItem) => (
                      <Link
                        key={subItem.name}
                        to={subItem.href}
                        className="dropdown-item"
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white/90 backdrop-blur-sm border-t border-border">
          <nav className="container mx-auto px-4 py-4 space-y-2">
            {navItems.map((item) => (
              <div key={item.name}>
                <Link
                  to={item.href}
                  className="block py-2 text-foreground font-medium text-sm"
                  onClick={() => !item.hasDropdown && setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
                {item.hasDropdown && (
                  <div className="pl-4 space-y-1">
                    {item.dropdown?.map((subItem) => (
                      <Link
                        key={subItem.name}
                        to={subItem.href}
                        className="block py-1.5 text-sm text-muted-foreground hover:text-foreground"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
