import React from 'react';

interface AppLogoTitleProps {
  subTitle: string;
  tagText: string;
}

export const AppLogoTitle: React.FC<AppLogoTitleProps> = ({ subTitle, tagText }) => {
  // Letters definition for "LITTLE THINGS" with custom pastel colors and responsive tilts
  const letters = [
    { char: 'L', color: 'text-[#F09597]', tilt: '-rotate-6' }, // Coral pink
    { char: 'I', color: 'text-[#6CA0dc]', tilt: 'rotate-3 translate-y-[1px]' }, // Sky Blue
    { char: 'T', color: 'text-[#E2C685]', tilt: '-rotate-3' }, // Soft Gold
    { char: 'T', color: 'text-[#82B3A4]', tilt: 'rotate-6 -translate-y-[1px]' }, // Sage Green
    { char: 'L', color: 'text-[#E0A458]', tilt: '-rotate-3' }, // Orange Gold
    { char: 'E', color: 'text-[#8B80F9]', tilt: 'rotate-12 translate-y-[1px]' }, // Cool violet
    { char: ' ', color: '', tilt: '' }, // space
    { char: 'T', color: 'text-[#F09597]', tilt: '-rotate-6' }, // Coral
    { char: 'H', color: 'text-[#6CA0dc]', tilt: 'rotate-3 translate-y-[2px]' }, // Sky Blue
    { char: 'I', color: 'text-[#E2C685]', tilt: '-rotate-12' }, // Gold
    { char: 'N', color: 'text-[#82B3A4]', tilt: 'rotate-3' }, // Sage Green
    { char: 'G', color: 'text-[#E0A458]', tilt: '-rotate-6 translate-y-[-1px]' }, // Orange Gold
    { char: 'S', color: 'text-[#AB87FF]', tilt: 'rotate-6' }, // Purple
  ];

  return (
    <div className="flex flex-col items-center sm:items-start gap-1 select-none">
      
      {/* 1. Overhead Minimalist Whimsical Sun from second reference image */}
      <div className="flex items-end gap-1.5 h-7 pl-4 mb-[-3px] self-center sm:self-start">
        <div className="relative w-12 h-6 overflow-hidden">
          {/* Semicircle Sun */}
          <div className="absolute bottom-0 left-[14px] w-8 h-8 rounded-full bg-[#E2C685] flex items-center justify-center border-b-0">
            {/* White Heart Inside */}
            <span className="text-white text-[9px] font-black translate-y-[-2px] animate-pulse">❤</span>
          </div>
          
          {/* Soft Colored Whimsical Sun Rays */}
          <div className="absolute top-0 bottom-0 left-0 right-0 pointer-events-none">
            {/* Left diagonal ray */}
            <span className="absolute left-[3px] bottom-[2px] w-[3px] h-[7px] bg-[#6CA0dc] rounded-full transform -rotate-45" />
            {/* Top left ray */}
            <span className="absolute left-[11px] top-[4px] w-[3px] h-[7px] bg-[#F09597] rounded-full transform -rotate-[22deg]" />
            {/* Center top ray */}
            <span className="absolute left-[22px] top-[0px] w-[3px] h-[7px] bg-[#82B3A4] rounded-full" />
            {/* Top right ray */}
            <span className="absolute right-[11px] top-[4px] w-[3px] h-[7px] bg-[#E0A458] rounded-full transform rotate-[22deg]" />
            {/* Right diagonal ray */}
            <span className="absolute right-[3px] bottom-[2px] w-[3px] h-[7px] bg-[#AB87FF] rounded-full transform rotate-45" />
          </div>
        </div>
      </div>

      {/* 2. Custom multichrome letter-by-letter header */}
      <div className="flex items-center gap-1.5">
        <h1 className="font-display font-bold text-3xl sm:text-4xl tracking-tight flex items-center flex-wrap leading-none select-none">
          {letters.map((val, idx) => {
            if (val.char === ' ') {
              return <span key={idx} className="w-2.5" />;
            }
            return (
              <span
                key={idx}
                className={`inline-block font-display font-black transform transition-transform hover:scale-115 cursor-default ${val.color} ${val.tilt}`}
                style={{
                  textShadow: '1px 1px 0px rgba(0,0,0,0.03)',
                  animationDelay: `${idx * 0.1}s`
                }}
              >
                {val.char}
              </span>
            );
          })}
        </h1>
        
        {/* Psycho-Coach premium tag pill */}
        <span className="bg-brand-sage/12 text-brand-sky px-2.5 py-0.5 rounded-full text-[9px] font-black font-sans tracking-wider uppercase ml-1.5 self-center border border-brand-sage/10">
          {tagText}
        </span>
      </div>

      {/* 3. Subtext under logo title */}
      <p className="text-[11px] sm:text-xs font-bold text-stone-400 tracking-wider uppercase mt-1 text-center sm:text-left leading-tight font-sans">
        ✨ {subTitle}
      </p>
    </div>
  );
};
