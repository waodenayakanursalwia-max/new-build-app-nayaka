import React from 'react';

export const CuteDoodleBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0 opacity-40 sm:opacity-[0.55] bg-[#FDFDF9]/50">
      
      {/* ==================== BRACKET 1: TOP ZONE (0% - 20%) ==================== */}

      {/* 1. Large Crayon Rainbow & Cozy Sun (Top Left - y: 2%, x: 2%) */}
      <div className="absolute top-[2%] left-[2%] w-36 h-36 text-amber-400 transform -rotate-3 animate-pulse" style={{ animationDuration: '8s' }}>
        <svg viewBox="0 0 120 120" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
          {/* Smiling Sun in Top-Left Corner of current rainbow */}
          <circle cx="22" cy="22" r="14" fill="#FEF3C7" stroke="#E2C685" strokeWidth="2.5" />
          <path d="M22 4 L22 8 M22 36 L22 40 M4 22 L8 22 M36 22 L40 22" stroke="#E2C685" strokeWidth="2.5" />
          <path d="M9 9 L12 12 M32 32 L35 35 M9 35 L12 32 M32 9 L35 12" stroke="#E2C685" strokeWidth="2.5" />
          {/* Sun Face expression */}
          <circle cx="18" cy="20" r="1.5" fill="#B45309" stroke="none" />
          <circle cx="26" cy="20" r="1.5" fill="#B45309" stroke="none" />
          <path d="M19 25 Q22 28 25 25" stroke="#B45309" strokeWidth="1.5" />

          {/* Rainbow arcs in thick crayon look */}
          <path d="M35 85 A45 45 0 0 1 115 85" stroke="#F09597" /> {/* Coral Red */}
          <path d="M45 85 A35 35 0 0 1 105 85" stroke="#E2C685" /> {/* Gold */}
          <path d="M55 85 A25 25 0 0 1 95 85" stroke="#82B3A4" />  {/* Sage */}
          <path d="M65 85 A15 15 0 0 1 85 85" stroke="#6CA0dc" />  {/* Sky Blue */}

          {/* Fluffy clouds on both feet */}
          <path d="M20 88 C20 82, 42 82, 42 88 C42 94, 20 94, 20 88 Z" fill="#F0FDFA" stroke="#82B3A4" strokeWidth="2" />
          <path d="M90 88 C90 82, 112 82, 112 88 C112 94, 90 94, 90 88 Z" fill="#F0FDFA" stroke="#82B3A4" strokeWidth="2" />
        </svg>
      </div>

      {/* 2. Toy Space Rocket Ship Flying Up (Top Right - y: 2%, x: 5%) */}
      <div className="absolute top-[2%] right-[4%] w-32 h-32 text-indigo-400 transform rotate-[15deg] animate-bounce" style={{ animationDuration: '12s' }}>
        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          {/* Rocket primary hull */}
          <path d="M35 70 L35 32 C35 20, 50 8, 50 8 C50 8, 65 20, 65 32 L65 70 Z" fill="#EEF2F6" stroke="#8B80F9" />
          {/* Side stabilizer fins */}
          <path d="M35 50 L20 70 L35 70" fill="#E0E7FF" stroke="#8B80F9" />
          <path d="M65 50 L80 70 L65 70" fill="#E0E7FF" stroke="#8B80F9" />
          {/* Cabin view glass window */}
          <circle cx="50" cy="38" r="9" fill="#DBEAFE" stroke="#8B80F9" strokeWidth="2.5" />
          <circle cx="47" cy="35" r="2.5" fill="white" stroke="none" />
          {/* Fire blast exhaust flow */}
          <path d="M40 70 L40 85 L50 94 L60 85 L60 70 Z" fill="#FDE047" stroke="#EAB308" />
          <path d="M45 70 L45 80 L50 85 L55 80 L55 70" stroke="#EF4444" strokeWidth="2" />
        </svg>
      </div>

      {/* 3. Hand-drawn ABC Floating Header Text (Top Center - y: 4%, x: 38%) */}
      <div className="absolute top-[4%] left-[38%] w-24 h-16 text-rose-400 transform -rotate-6">
        <svg viewBox="0 0 100 60" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round">
          {/* Handdrawn ABC Text letters */}
          <path d="M15 45 L25 15 L35 45 M18 35 L32 35" stroke="#F09597" />
          <path d="M45 15 L58 15 C64 15, 64 27, 58 27 C64 27, 64 45, 58 45 L45 45 Z M45 28 L56 28 M45 45 L56 45" stroke="#E0A458" />
          <path d="M88 20 C80 15, 70 25, 70 32 C70 41, 80 48, 88 42" stroke="#6CA0dc" />
        </svg>
      </div>


      {/* ==================== BRACKET 2: UPPER ZONE (20% - 40%) ==================== */}

      {/* 4. Cartoon Little Boy Waving (Left Side - y: 15%, x: 2%) */}
      <div className="absolute top-[14%] left-[2%] w-28 h-32 text-sky-400 transform rotate-6">
        <svg viewBox="0 0 100 120" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
          {/* Boy Face head */}
          <circle cx="50" cy="45" r="24" fill="#FFFBEB" stroke="#6CA0dc" />
          {/* Spiky dynamic hair cap */}
          <path d="M26 38 C32 20, 50 20, 50 20 C50 20, 58 22, 64 28 C70 32, 74 38, 74 38" stroke="#F09597" strokeWidth="3.5" />
          {/* Eyes (happy dots) */}
          <circle cx="42" cy="42" r="2.5" fill="#1E3A8A" />
          <circle cx="58" cy="42" r="2.5" fill="#1E3A8A" />
          {/* Smiling mouth */}
          <path d="M44 54 Q50 60 56 54" fill="#FEE2E2" stroke="#1E3A8A" />
          {/* Blushing cheeks */}
          <circle cx="35" cy="48" r="3.5" fill="#FCA5A5" stroke="none" />
          <circle cx="65" cy="48" r="3.5" fill="#FCA5A5" stroke="none" />
          {/* Body and waving hand */}
          <path d="M40 69 L30 85" stroke="#6CA0dc" strokeWidth="3.5" /> {/* left shoulder arm */}
          <path d="M60 69 L74 54 M74 54 M74 54 C76 50, 80 50, 80 54" stroke="#6CA0dc" strokeWidth="3.5" /> {/* waving hand right */}
          <rect x="36" y="69" width="28" height="30" rx="4" fill="#E0F2FE" stroke="#6CA0dc" />
          {/* Striped shirt lines */}
          <path d="M38 78 L62 78 M38 88 L62 88" stroke="#6CA0dc" strokeWidth="2" />
        </svg>
      </div>

      {/* 5. Cozy Country Wood House (Right Side - y: 18%, x: 3%) */}
      <div className="absolute top-[17%] right-[3%] w-28 h-32 text-emerald-400 transform -rotate-3">
        <svg viewBox="0 0 100 110" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          {/* Chimney blowing small cozy smoke loop */}
          <rect x="74" y="22" width="10" height="20" fill="#E6F4EA" stroke="#82B3A4" />
          <path d="M78 14 Q84 6 80 2 T86 -6" stroke="#6CA0dc" strokeWidth="2" />
          {/* Triangle tiled roof */}
          <path d="M10 46 L50 12 L90 46 Z" fill="#D1FAE5" stroke="#82B3A4" />
          {/* Home square walls */}
          <rect x="20" y="46" width="60" height="48" fill="white" stroke="#82B3A4" />
          {/* Cute arched wood door */}
          <path d="M42 64 L42 94 A8 8 0 0 1 58 94 L58 64 Z" fill="#FEF3C7" stroke="#82B3A4" />
          <circle cx="45" cy="78" r="2" fill="#B45309" stroke="none" />
          {/* Window panes with cross glass */}
          <rect x="28" y="54" width="10" height="12" fill="#ECFDF5" stroke="#82B3A4" />
          <rect x="62" y="54" width="10" height="12" fill="#ECFDF5" stroke="#82B3A4" />
        </svg>
      </div>


      {/* ==================== BRACKET 3: MID ZONE A (40% - 60%) ==================== */}

      {/* 6. Honeybee with Loop Trail (Left Rail - y: 34%, x: 1%) */}
      <div className="absolute top-[32%] left-[1.5%] w-30 h-30 text-amber-400">
        <svg viewBox="0 0 120 120" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round">
          {/* Chubby bumblebee body */}
          <rect x="50" y="42" width="36" height="24" rx="12" fill="#FEF08A" stroke="#E0A458" />
          {/* Dark crayon stripes */}
          <path d="M60 42 L60 66" stroke="#4B5563" strokeWidth="4" />
          <path d="M72 42 L72 66" stroke="#4B5563" strokeWidth="4" />
          {/* Whimsical double oval wings */}
          <ellipse cx="62" cy="30" rx="8" ry="12" fill="#F0FDFA" stroke="#6CA0dc" />
          <ellipse cx="72" cy="32" rx="6" ry="10" fill="#F0FDFA" stroke="#6CA0dc" />
          {/* Tiny antennae loops */}
          <path d="M86 44 C92 38, 92 32, 88 28" stroke="#4B5563" />
          <circle cx="88" cy="27" r="2.5" fill="#4B5563" stroke="none" />
          {/* Buzzing dotted trail */}
          <path d="M10 88 C25 98, 38 52, 20 68 C14 74, 30 84, 46 54" stroke="#94A3B8" strokeWidth="2.5" strokeDasharray="6 6" />
          {/* Smiling face on the bee */}
          <circle cx="80" cy="49" r="1.5" fill="#4B5563" stroke="none" />
          <path d="M81 54 Q83 56 85 54" stroke="#4B5563" strokeWidth="1.5" />
        </svg>
      </div>

      {/* 7. Cute Rocking Horse / Kuda Kayu (Right Rail - y: 36%, x: 3%) */}
      <div className="absolute top-[35%] right-[2%] w-30 h-30 text-[#8B80F9] transform rotate-3 animate-pulse" style={{ animationDuration: '10s' }}>
        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          {/* Rockers arched runners at bottom */}
          <path d="M12 80 Q50 94 88 80" stroke="#AB87FF" strokeWidth="4.5" />
          {/* Upright connector rods */}
          <path d="M30 85 L35 60 M70 85 L65 60" stroke="#AB87FF" />
          {/* Saddle toy pony body */}
          <path d="M25 60 C25 45, 75 45, 75 60 Z" fill="#EEF2F6" stroke="#AB87FF" />
          {/* Horse Neck & Head */}
          <path d="M62 54 L75 30 L85 35 L75 45" fill="#EEF2F6" stroke="#AB87FF" />
          {/* Yarn Mane brush */}
          <path d="M68 45 L60 38 M70 40 L62 33" stroke="#F09597" strokeWidth="2.5" />
          {/* Curly Pony tail */}
          <path d="M22 58 C14 55, 12 40, 18 35" stroke="#F09597" strokeWidth="3" />
        </svg>
      </div>

      {/* 8. Hand-sketched Apple with leaf (Center Left - y: 44%, x: 18%) */}
      <div className="absolute top-[43%] left-[14%] w-18 h-18 text-rose-500 transform rotate-6">
        <svg viewBox="0 0 50 50" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
          <path d="M25 14 C15 5, 5 15, 5 28 C5 42, 20 48, 25 46 C30 48, 45 42, 45 28 C45 15, 35 5, 25 14 Z" fill="#FFE4E6" stroke="#F09597" />
          {/* Apple brown stem */}
          <path d="M25 14 C25 6, 28 4, 32 2" stroke="#E0A458" strokeWidth="2.5" />
          {/* Small green leaf */}
          <path d="M25 10 C30 10, 32 14, 30 18 C26 18, 24 14, 25 10" fill="#D1FAE5" stroke="#82B3A4" />
        </svg>
      </div>


      {/* ==================== BRACKET 4: MID ZONE B (60% - 80%) ==================== */}

      {/* 9. Tic-Tac-Toe Pencil Scribbles (Left Side - y: 52%, x: 20%) */}
      <div className="absolute top-[52%] left-[19%] w-24 h-24 text-stone-300">
        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round">
          {/* Sketched lattice cross lines */}
          <path d="M34 8 L34 92 M66 8 L66 92 M8 34 L92 34 M8 66 L92 66" stroke="#94A3B8" />
          {/* Handdrawn O marks (colorful coral) */}
          <circle cx="21" cy="21" r="9" stroke="#F09597" strokeWidth="3" />
          <circle cx="79" cy="79" r="9" stroke="#6CA0dc" strokeWidth="3" />
          {/* Handdrawn X marks (colorful gold and green) */}
          <path d="M48 12 L60 26 M60 12 L48 26" stroke="#E2C685" strokeWidth="4" />
          <path d="M12 48 L26 60 M26 48 L12 60" stroke="#82B3A4" strokeWidth="4" />
        </svg>
      </div>

      {/* 10. Kids Wooden Stacking Toy Blocks A-B-C (Right Side - y: 56%, x: 18%) */}
      <div className="absolute top-[55%] right-[16%] w-26 h-26 text-orange-400 transform rotate-12">
        <svg viewBox="0 0 120 120" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          {/* Block A (Base Pink) */}
          <rect x="15" y="70" width="36" height="36" rx="5" fill="#FFE4E6" stroke="#F09597" />
          <text x="25" y="96" fill="#F09597" className="text-xl font-display font-black">A</text>
          {/* Block B (Right Side Green) */}
          <rect x="58" y="58" width="36" height="36" rx="5" fill="#E6F4EA" stroke="#82B3A4" />
          <text x="68" y="84" fill="#82B3A4" className="text-xl font-display font-black">B</text>
          {/* Block C (Top Stacked Blue) */}
          <rect x="36" y="20" width="36" height="36" rx="5" fill="#E0F2FE" stroke="#6CA0dc" />
          <text x="46" y="46" fill="#6CA0dc" className="text-xl font-display font-black">C</text>
        </svg>
      </div>

      {/* 11. Large Crayon Pencil Sketching Stars (Left Center - y: 65%, x: 1.5%) */}
      <div className="absolute top-[64%] left-[1.5%] w-24 h-24 text-[#E2C685] transform -rotate-45">
        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
          {/* Hand-drawn crayon body */}
          <polygon points="10,40 60,10 90,40 40,70" fill="#FEF3C7" stroke="#E2C685" strokeWidth="3" />
          {/* Triangle point */}
          <polygon points="90,40 100,50 90,60" fill="#F59E0B" stroke="#E2C685" />
          {/* Scribble swirly stars trails */}
          <path d="M50 80 Q70 60, 90 90 T10 70" stroke="#F09597" strokeWidth="2" strokeDasharray="3 3" />
          <path d="M35 15 L40 5 L45 15 L55 18 L46 25 L50 35 L40 28 L30 35 L34 25 L25 18 Z" fill="#FEF3C7" stroke="#E2C685" />
        </svg>
      </div>


      {/* ==================== BRACKET 5: LOWER ZONE (80% - 100%) ==================== */}

      {/* 12. Crawling Ladybug / Kumbang Kecil (Left Rail - y: 76%, x: 4%) */}
      <div className="absolute top-[75%] left-[3%] w-26 h-26 text-rose-500 transform rotate-12">
        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
          {/* Big Green Leaf Ladybug crawls on */}
          <path d="M10 90 C30 50, 80 50, 95 30 C80 60, 40 80, 10 90" fill="#E6F4EA" stroke="#82B3A4" strokeWidth="2.5" />
          
          {/* Ladybug basic round body */}
          <circle cx="55" cy="45" r="20" fill="#FFE4E6" stroke="#F09597" />
          {/* Split back wings line */}
          <path d="M55 25 L55 65" stroke="#F09597" strokeWidth="3.5" />
          {/* Black spots on wings */}
          <circle cx="43" cy="38" r="3" fill="#B91C1C" stroke="none" />
          <circle cx="45" cy="52" r="3" fill="#B91C1C" stroke="none" />
          <circle cx="67" cy="38" r="3" fill="#B91C1C" stroke="none" />
          <circle cx="65" cy="52" r="3" fill="#B91C1C" stroke="none" />
          {/* Head & Antennae */}
          <circle cx="68" cy="31" r="5" fill="#4B5563" stroke="none" />
          <path d="M72 27 Q78 22 80 24 M70 26 Q74 18 72 16" stroke="#4B5563" strokeWidth="2" />
        </svg>
      </div>

      {/* 13. Hopscotch Chalk Grid / Engklek (Right Rail - y: 78%, x: 4%) */}
      <div className="absolute top-[78%] right-[3%] w-28 h-40 text-sky-400/90 transform rotate-6">
        <svg viewBox="0 0 100 150" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
          {/* Block boxes layout */}
          {/* Double boxes 4 & 5 */}
          <rect x="8" y="44" width="38" height="26" stroke="#6CA0dc" />
          <rect x="46" y="44" width="38" height="26" stroke="#6CA0dc" />
          {/* Single Box 3, 2, 1 descending */}
          <rect x="27" y="70" width="38" height="26" stroke="#6CA0dc" />
          <rect x="27" y="96" width="38" height="26" stroke="#6CA0dc" />
          <rect x="27" y="122" width="38" height="26" stroke="#6CA0dc" />
          {/* Semi-circle top dome 7 */}
          <path d="M27 44 A19 19 0 0 1 65 44 Z" fill="#E0F2FE" stroke="#6CA0dc" />

          {/* Crayon chalk numbers */}
          <text x="42" y="34" fill="#6CA0dc" className="text-sm font-sans font-black">7</text>
          <text x="21" y="62" fill="#6CA0dc" className="text-xs font-sans font-bold">5</text>
          <text x="60" y="62" fill="#6CA0dc" className="text-xs font-sans font-bold">6</text>
          <text x="41" y="88" fill="#6CA0dc" className="text-xs font-sans font-bold">3</text>
          <text x="41" y="114" fill="#6CA0dc" className="text-xs font-sans font-bold">2</text>
          <text x="41" y="140" fill="#6CA0dc" className="text-xs font-sans font-bold">1</text>
        </svg>
      </div>

      {/* 14. Cute Cartoon Girl with Pigtails Waving (Center Bottom - y: 88%, x: 14%) */}
      <div className="absolute bottom-[2%] left-[13%] w-28 h-32 text-pink-400">
        <svg viewBox="0 0 100 120" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
          {/* Cute face */}
          <circle cx="50" cy="50" r="24" fill="#FFFBEB" stroke="#F09597" />
          {/* Two cute round hair buns (pigtails) */}
          <circle cx="24" cy="30" r="10" fill="#FFF" stroke="#F09597" />
          <circle cx="76" cy="30" r="10" fill="#FFF" stroke="#F09597" />
          {/* Hair bows loops */}
          <path d="M24 38 L16 35 M76 38 L84 35" stroke="#AB87FF" strokeWidth="4" />
          {/* Eyes & smile */}
          <circle cx="41" cy="48" r="2.5" fill="#4B5563" />
          <circle cx="59" cy="48" r="2.5" fill="#4B5563" />
          <path d="M43 59 Q50 66 57 59" stroke="#4B5563" strokeWidth="2.5" />
          {/* Blushing cheeks */}
          <circle cx="34" cy="54" r="3.5" fill="#FCA5A5" stroke="none" />
          <circle cx="66" cy="54" r="3.5" fill="#FCA5A5" stroke="none" />
          {/* Dress clothes */}
          <path d="M30 74 L14 85" stroke="#F09597" strokeWidth="3" /> {/* Left arm */}
          <path d="M70 74 L86 85" stroke="#F09597" strokeWidth="3" /> {/* Right arm */}
          <path d="M38 74 L25 104 L75 104 L62 74 Z" fill="#FAE8FF" stroke="#F09597" />
          {/* Dress star pattern */}
          <polygon points="50,82 52,86 56,86 53,89 54,93 50,91 46,93 47,89 44,86 48,86" fill="#F09597" stroke="none" />
        </svg>
      </div>

      {/* 15. Helium Balloon with string / Balon (Right Bottom - y: 92%, x: 18%) */}
      <div className="absolute bottom-[2%] right-[16%] w-24 h-32 text-indigo-400">
        <svg viewBox="0 0 80 120" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
          {/* Oval gas balloon */}
          <ellipse cx="40" cy="40" rx="22" ry="30" fill="#E0F2FE" stroke="#8B80F9" />
          {/* Shiny balloon highlight */}
          <path d="M28 26 A10 16 0 0 1 38 18" stroke="white" strokeWidth="2.5" />
          {/* Small tie knot triangle at base */}
          <polygon points="36,70 44,70 40,75" fill="#8B80F9" stroke="#8B80F9" />
          {/* Wavy trailing child holding cord */}
          <path d="M40 75 C34 90, 48 100, 38 120" stroke="#8B80F9" strokeWidth="2" />
        </svg>
      </div>

    </div>
  );
};
