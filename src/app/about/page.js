import AboutHero from "../../components/about/AboutHero";
import AboutVision from "../../components/about/AboutVision";
import WhyChooseUs from "../../components/about/WhyChooseUs";
import AboutStats from "../../components/about/AboutStats";
import TurningVision from "../../components/about/TurningVision";
import Footer from "../../components/Footer";

export const metadata = {
  title: "About Us | KidzStar Preschool",
  description: "Learn more about KidzStar Preschool, our vision, and our approach to early childhood education.",
};

export default function AboutPage() {
  return (
    <main className="relative overflow-hidden min-h-screen bg-[#FCFBFA] pt-[80px] isolate">
      {/* Absolute Backdrop Grid Sheet - Baseline Layer (matching Home page) */}
      <div 
        className="absolute inset-0 -z-30 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(10, 53, 204, 0.15) 1.5px, transparent 1.5px), linear-gradient(90deg, rgba(10, 53, 204, 0.15) 1.5px, transparent 1.5px)`,
          backgroundSize: '180px 180px'
        }}
      ></div>

      <AboutHero />
      <AboutVision />
      <AboutStats />
      <WhyChooseUs />
      <TurningVision />
      <Footer />
    </main>
  );
}
