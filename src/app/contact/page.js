import ContactHero from "../../components/contact/ContactHero";
import AdmissionForm from "../../components/AdmissionForm";
import LocationCards from "../../components/contact/LocationCards";
import Footer from "../../components/Footer";

export const metadata = {
  title: "Contact Us | KidzStar Preschool",
  description: "Get in touch with us for admissions, queries, or to schedule a visit.",
};

export default function ContactPage() {
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

      <ContactHero />
      <AdmissionForm />
      <LocationCards />

      <Footer />
    </main>
  );
}
