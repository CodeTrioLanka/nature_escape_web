import { useState, useEffect } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";

const ScrollNavigation = () => {
    const [showTop, setShowTop] = useState(false);
    const [showBottom, setShowBottom] = useState(true);

    const handleScroll = () => {
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        const fullHeight = document.documentElement.scrollHeight;

        // Show "Scroll to Top" if scrolled down more than 300px
        setShowTop(scrollY > 300);

        // Show "Scroll to Bottom" if not at the bottom (with 50px buffer)
        setShowBottom(scrollY + windowHeight < fullHeight - 100);
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const scrollToBottom = () => {
        window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: "smooth",
        });
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        handleScroll(); // Initial check
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3">
            {/* Scroll to Top */}
            <button
                onClick={scrollToTop}
                className={`bg-primary hover:bg-primary-dark text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center ${showTop ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10 pointer-events-none"
                    }`}
                aria-label="Scroll to top"
            >
                <ChevronUp size={24} />
            </button>

            {/* Scroll to Bottom */}
            <button
                onClick={scrollToBottom}
                className={`bg-primary hover:bg-primary-dark text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center ${showBottom ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10 pointer-events-none"
                    }`}
                aria-label="Scroll to bottom"
            >
                <ChevronDown size={24} />
            </button>
        </div>
    );
};

export default ScrollNavigation;
