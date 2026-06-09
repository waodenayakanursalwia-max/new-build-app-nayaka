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

  const renderSun = (isSmall = false) => {
    const sunWidth = isSmall ? 'w-10 h-5' : 'w-12 h-6';
    const sunLeft = isSmall ? 'left-[12px]' : 'left-[14px]';
    const sunSize = isSmall ? 'w-6 h-6' : 'w-8 h-8';
    const heartText = '❤';
    const heartSize = isSmall ? 'text-[7px]' : 'text-[9px]';

    return (
      <div className={`relative ${sunWidth} overflow-hidden`}>
        {/* Semicircle Sun */}
        <div className={`absolute bottom-0 ${sunLeft} ${sunSize} rounded-full bg-[#E2C685] flex items-center justify-center border-b-0`}>
          {/* White Heart Inside */}
          <span className={`text-white ${heartSize} font-black translate-y-[-2px] animate-pulse`}>{heartText}</span>
        </div>
        
        {/* Soft Colored Whimsical Sun Rays */}
        <div className="absolute top-0 bottom-0 left-0 right-0 pointer-events-none">
          {/* Left diagonal ray */}
          <span className={`absolute ${isSmall ? 'left-[2px] bottom-[1px] w-[2px]' : 'left-[3px] bottom-[2px] w-[3px]'} h-[7px] bg-[#6CA0dc] rounded-full transform -rotate-45`} />
          {/* Top left ray */}
          <span className={`absolute ${isSmall ? 'left-[9px] top-[3px] w-[2px]' : 'left-[11px] top-[4px] w-[3px]'} h-[7px] bg-[#F09597] rounded-full transform -rotate-[22deg]`} />
          {/* Center top ray */}
          <span className={`absolute ${isSmall ? 'left-[18px] top-[0px] w-[2px]' : 'left-[22px] top-[0px] w-[3px]'} h-[7px] bg-[#82B3A4] rounded-full`} />
          {/* Top right ray */}
          <span className={`absolute ${isSmall ? 'right-[9px] top-[3px] w-[2px]' : 'right-[11px] top-[4px] w-[3px]'} h-[7px] bg-[#E0A458] rounded-full transform rotate-[22deg]`} />
          {/* Right diagonal ray */}
          <span className={`absolute ${isSmall ? 'right-[2px] bottom-[1px] w-[2px]' : 'right-[3px] bottom-[2px] w-[3px]'} h-[7px] bg-[#AB87FF] rounded-full transform rotate-45`} />
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-row items-center flex-wrap sm:flex-nowrap gap-2 md:gap-3 lg:gap-4 select-none w-full lg:w-auto justify-center sm:justify-start">
      
      {/* Sun icon is always horizontally aligned on the left */}
      <div className="flex items-center shrink-0">
        {renderSun(true)}
      </div>

      {/* Title letters container - always horizontal */}
      <div className="flex items-center gap-1.5 shrink-0">
        <h1 className="font-display font-bold text-lg sm:text-xl md:text-2xl tracking-tight flex items-center flex-wrap leading-none select-none">
          {letters.map((val, idx) => {
            if (val.char === ' ') {
              return <span key={idx} className="w-1.5" />;
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

        {/* Tag Pill */}
        <span className="bg-brand-sage/12 text-brand-sky px-2 py-0.5 rounded-full text-[8px] md:text-[9px] font-black font-sans tracking-wider uppercase ml-1 self-center border border-brand-sage/10 whitespace-nowrap">
          {tagText}
        </span>
      </div>

      {/* Elegant Divider - visible when space allows (sm+) */}
      <div className="hidden sm:block h-4 w-[1px] bg-slate-200 shrink-0" />

      {/* Subtext/Subtitle - kept horizontal or inline */}
      <p className="text-[9px] sm:text-xs font-black text-stone-400 tracking-wider uppercase text-center sm:text-left leading-tight font-sans whitespace-nowrap">
        ✨ {subTitle}
      </p>
    </div>
  );
};
