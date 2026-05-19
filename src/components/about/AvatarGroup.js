import Image from "next/image";

export default function AvatarGroup() {
  return (
    <div className="flex items-center gap-4 mt-8">
      <div className="flex -space-x-3">
        {[
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150",
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150",
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150",
        ].map((src, i) => (
          <div key={i} className="w-[46px] h-[46px] rounded-full border-[2.5px] border-[#FCFBFA] overflow-hidden relative shadow-sm">
            <div className="avatar-img-wrapper opacity-0 w-full h-full relative">
              <Image src={src} alt={`Team member ${i + 1}`} fill className="object-cover" />
            </div>
            <div className="avatar-reveal-cover absolute inset-0 bg-[#84FB41] z-10 origin-bottom" style={{ transform: "scaleY(0)" }}></div>
          </div>
        ))}
      </div>
      {/* Exact thick arrow from screenshot */}
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-black ml-1 mt-1">
        <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  );
}
