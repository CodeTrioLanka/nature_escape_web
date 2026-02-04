import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Make Lenis globally available
declare global {
    interface Window {
        lenis: Lenis;
    }
}

const SmoothScroll = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        // 1. Initialize Lenis
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Standard easing
            orientation: "vertical",
            gestureOrientation: "vertical",
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
        });

        window.lenis = lenis;

        // 2. Connect to GSAP ScrollTrigger
        // This allows GSAP animations to work perfectly with Lenis smooth scroll
        gsap.registerPlugin(ScrollTrigger);

        // Update ScrollTrigger whenever Lenis scrolls
        lenis.on("scroll", ScrollTrigger.update);

        // Tell GSAP to use Lenis for scroll position
        gsap.ticker.add((time) => {
            lenis.raf(time * 1000); // Lenis requires time in milliseconds
        });

        // Disable GSAP's native ticker lag smoothing to maintain sync
        gsap.ticker.lagSmoothing(0);

        // 3. Setup cleanup
        return () => {
            lenis.destroy();
            // @ts-ignore
            window.lenis = null;
            gsap.ticker.remove((time) => {
                lenis.raf(time * 1000);
            });
        };
    }, []);

    // 4. Handle Scroll Reset on Navigation
    useEffect(() => {
        if (window.lenis) {
            window.lenis.scrollTo(0, { immediate: true });
        } else {
            window.scrollTo(0, 0);
        }
    }, [pathname]);

    return null;
};

export default SmoothScroll;
