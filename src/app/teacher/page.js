import Image from "next/image";
import Footer from "../../components/Footer";
import TeacherSwiper from "../../components/teacher/TeacherSwiper";
import TeacherHeroContent from "../../components/teacher/TeacherHeroContent";
import TeacherMarquee from "../../components/teacher/TeacherMarquee";

export const metadata = {
  title: "Our Teachers | KidzStar Preschool",
  description: "Meet our experienced and loving teachers at KidzStar Preschool.",
};

export default function TeacherPage() {
  return (
    <main className="relative min-h-screen bg-[#FDFCF9] pt-[80px] flex flex-col font-sans isolate overflow-hidden">
      
      {/* Background Grid Lines */}
      <div className="absolute inset-0 z-0 flex w-full h-full pointer-events-none max-w-[1440px] mx-auto px-4 md:px-12">
        {[...Array(6)].map((_, i) => (
          <div key={i} className={`flex-1 border-r border-black/[0.03] ${i === 0 ? 'border-l' : ''}`}></div>
        ))}
      </div>

      <div className="relative z-10 flex-grow max-w-[1440px] w-full mx-auto pb-0">
        
        {/* GSAP Animated Top Text Section */}
        <TeacherHeroContent />

      </div>

      {/* Full-width Animated Image Stagger Swiper */}
      <div className="relative z-10 w-full overflow-hidden">
        <TeacherSwiper />
      </div>

      {/* Opposing Infinite Marquees Section */}
      <TeacherMarquee />

      <div className="mt-12 md:mt-24 z-10 relative">
        <Footer />
      </div>
    </main>
  );
}
