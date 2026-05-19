export default function GrowthCard() {
  return (
    <div className="absolute -bottom-8 -left-8 md:left-6 md:bottom-8 bg-white rounded-2xl p-6 shadow-[0_15px_40px_rgba(0,0,0,0.06)] w-[260px] z-20 hidden sm:block">
      <div className="flex justify-between items-center mb-1">
        <span className="text-[14px] font-medium text-black">Growth</span>
        <span className="text-[11px] text-gray-400 font-medium">Jan 2026</span>
      </div>
      <div className="text-[2.5rem] font-medium text-black tracking-tight mb-5 leading-none">
        65%
      </div>
      
      {/* Exact Bar Chart Visualization */}
      <div className="flex items-end justify-between h-[60px] w-full gap-[8px]">
        {[
          { bg: "h-[50%]", fg: "h-[45%]" },
          { bg: "h-[65%]", fg: "h-[45%]" },
          { bg: "h-[45%]", fg: "h-[35%]" },
          { bg: "h-[35%]", fg: "h-[25%]" },
          { bg: "h-[75%]", fg: "h-[60%]" },
          { bg: "h-[100%]", fg: "h-[85%]" }
        ].map((bar, i) => (
          <div 
            key={i} 
            className={`w-full ${bar.bg} bg-[#FFF2D0] rounded-full relative flex flex-col justify-end overflow-hidden`}
          >
            <div 
              className={`w-full ${bar.fg} bg-[#FFB000] rounded-full transition-all duration-1000 ease-out`}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
}
