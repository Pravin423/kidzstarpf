import ProgramsList from "../../components/programs/ProgramsList";
import ProcessSteps from "../../components/programs/ProcessSteps";
import OurServices from "../../components/OurServices";
import Footer from "../../components/Footer";
import JoinUs from "../../components/JoinUs";
export const metadata = {
  title: "Our Programs | KidzStar Preschool",
  description: "Explore our tailored learning experiences for toddlers, preschool, and kindergarten children.",
};

export default function ProgramsPage() {
  return (
    <main className="relative overflow-hidden min-h-screen bg-[#FCFBFA] pt-[80px] isolate">
      {/* Absolute Backdrop Grid Sheet */}
      <div 
        className="absolute inset-0 -z-30 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(10, 53, 204, 0.15) 1.5px, transparent 1.5px), linear-gradient(90deg, rgba(10, 53, 204, 0.15) 1.5px, transparent 1.5px)`,
          backgroundSize: '180px 180px'
        }}
      ></div>

      <ProgramsList />
      <ProcessSteps />
      <OurServices />
       <JoinUs />
      <Footer />
    </main>
  );
}
