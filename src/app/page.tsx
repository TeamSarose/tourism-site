import HeroSection from "@/components/HeroSection";
import FeaturedDestinations from "@/components/FeaturedDestinations";
import CulturalHighlights from "@/components/CulturalHighlights";
import OurLocation from "@/components/OurLocation";
import ContactUs from "@/components/ContactUs";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <FeaturedDestinations />
      <CulturalHighlights />
      <OurLocation />
      <ContactUs />
      <Footer />
      <ScrollToTop />
    </div>
  );
}
