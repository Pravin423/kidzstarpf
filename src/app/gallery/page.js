import Footer from "../../components/Footer";
import Gallery from "../../components/gallery/Gallery";

export const metadata = {
  title: "Gallery | KidzStar Preschool",
  description: "Take a look at our vibrant learning environment and activities.",
};

export default function GalleryPage() {
  return (
    <main className="relative overflow-hidden min-h-screen bg-[#FCFBFA] pt-[120px] isolate">
      {/* Absolute Backdrop Grid Sheet */}
      <div 
        className="absolute inset-0 -z-30 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(10, 53, 204, 0.15) 1.5px, transparent 1.5px), linear-gradient(90deg, rgba(10, 53, 204, 0.15) 1.5px, transparent 1.5px)`,
          backgroundSize: '180px 180px'
        }}
      ></div>

      <Gallery />

      <Footer />
    </main>
  );
}
