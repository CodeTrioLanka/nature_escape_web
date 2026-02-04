import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import ScrollToTop from "./components/ScrollToTop";
import SmoothScroll from "./components/SmoothScroll";
import Index from "./pages/Index";
import About from "./pages/About";
import SriLankaTours from "./pages/SriLankaTours";
import TourCategory from "./pages/TourCategory";
import TourDetail from "./pages/TourDetail";
import DestinationDetail from "./pages/DestinationDetail";
import Excursions from "./pages/Excursions";
import ExcursionDetail from "./pages/ExcursionDetail";
import ThingsToDo from "./pages/ThingsToDo";
import ThingsToDoDetail from "./pages/ThingsToDoDetail";
import Reviews from "./pages/Reviews";
import Sustainability from "./pages/Sustainability";
import Services from "./pages/Services";
import ServiceDetail from "./pages/ServiceDetail";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SmoothScroll />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/sri-lanka-tours" element={<SriLankaTours />} />
          <Route path="/sri-lanka-tours/:category" element={<TourCategory />} />
          <Route path="/tour/:tourSlug" element={<TourDetail />} />
          <Route path="/destination/:destinationSlug" element={<DestinationDetail />} />
          <Route path="/excursions" element={<Excursions />} />
          <Route path="/excursion/:excursionSlug" element={<ExcursionDetail />} />
          <Route path="/things-to-do" element={<ThingsToDo />} />
          <Route path="/things-to-do/:id" element={<ThingsToDoDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/sustainability" element={<Sustainability />} />
          <Route path="/services" element={<Services />} />
          <Route path="/service/:serviceSlug" element={<ServiceDetail />} />
          <Route path="/reviews" element={<Reviews />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
