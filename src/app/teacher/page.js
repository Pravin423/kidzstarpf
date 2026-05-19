import Image from "next/image";
import Footer from "../../components/Footer";
import TeacherSwiper from "../../components/teacher/TeacherSwiper";
import TeacherHeroContent from "../../components/teacher/TeacherHeroContent";
import TeacherMarquee from "../../components/teacher/TeacherMarquee";
import TeacherInteractiveList from "../../components/teacher/TeacherInteractiveList";
import TeacherStatsSplit from "../../components/teacher/TeacherStatsSplit";

export const metadata = {
  title: "Our Teachers | KidzStar Preschool",
  description: "Meet our experienced and loving teachers at KidzStar Preschool.",
};

export default function TeacherPage() {
  return (
    <main className="relative min-h-screen bg-[#FDFCF9] pt-[80px] flex flex-col font-sans isolate overflow-hidden">
      
      {/* Background Grid Checks */}
      <div 
        className="absolute inset-0 z-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(10, 53, 204, 0.15) 1.5px, transparent 1.5px), linear-gradient(90deg, rgba(10, 53, 204, 0.15) 1.5px, transparent 1.5px)`,
          backgroundSize: '180px 180px'
        }}
      ></div>

      <div className="relative z-10 flex-grow max-w-[1440px] w-full mx-auto pb-0">
        
        {/* GSAP Animated Top Text Section */}
        <TeacherHeroContent />

      </div>

      {/* Full-width Animated Image Stagger Swiper */}
      <div className="relative z-10 w-full overflow-hidden">
        <TeacherSwiper />
      </div>

      {/* Interactive Curriculum/Department Explorer */}
      <TeacherInteractiveList />

      

      {/* Opposing Infinite Marquees Section */}
      <TeacherMarquee />

      {/* Stats and Split Banner Section */}
      <TeacherStatsSplit />

      <div className="mt-12 md:mt-24 z-10 relative">
        <Footer />
      </div>
    </main>
  );
}
