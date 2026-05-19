import Hero from "../components/Hero";
import WhoWeAre from "../components/WhoWeAre";
import HowWeWork from "../components/HowWeWork";
import OurServices from "../components/OurServices";
import ExpertiseStats from "../components/ExpertiseStats";
import Testimonials from "../components/Testimonials";
import JoinUs from "../components/JoinUs";
import AdmissionForm from "../components/AdmissionForm";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <main className="relative overflow-hidden min-h-screen bg-[#FFFDF9]">
      {/* Dynamic Scale-on-Scroll Hero */}
      <Hero />
      
      {/* Who We Are Section */}
      <WhoWeAre />

      {/* Customized Services Section */}
      <OurServices />
      
       {/* How We Work Process Section */}
      <HowWeWork />

      {/* Expertise & Statistics Section */}
      <ExpertiseStats />

      {/* Testimonials & Client Insights Section */}
      <Testimonials />

      {/* Floating orbital cards CTA Section */}
      <JoinUs />

      {/* Admission Intake Submission Section */}
      <AdmissionForm />

      {/* Editorial Corporate Footer */}
      <Footer />
    </main>
  );
}
