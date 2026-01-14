
import React, { useEffect, useState } from 'react';

export type AtmosphereVariant = 'tomb' | 'desert' | 'codex';

interface AtmosphereProps {
  variant: AtmosphereVariant;
}

const AtmosphereBackground: React.FC<AtmosphereProps> = ({ variant }) => {
  const [particles, setParticles] = useState<Array<{id: number, left: number, top: number, delay: number, duration: number, size: number}>>([]);

  useEffect(() => {
    // Determine particle count based on variant
    const isDesert = variant === 'desert';
    const particleCount = isDesert ? 40 : 12; // More stars for desert mode
    
    const newParticles = Array.from({ length: particleCount }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 10,
      duration: isDesert ? 100 + Math.random() * 100 : 25 + Math.random() * 30, // Stars are very slow
      size: isDesert ? 1 + Math.random() * 1.5 : 1 + Math.random() * 2
    }));
    setParticles(newParticles);
  }, [variant]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 transition-colors duration-1000 ease-in-out bg-black">
      <style>
        {`
          @keyframes floatUp {
            0% { transform: translateY(0) translateX(0); opacity: 0; }
            20% { opacity: 0.15; }
            50% { transform: translateY(-30px) translateX(15px); opacity: 0.1; }
            80% { opacity: 0.15; }
            100% { transform: translateY(-80px) translateX(-10px); opacity: 0; }
          }
          @keyframes twinkle {
            0%, 100% { opacity: 0.2; transform: scale(1); }
            50% { opacity: 0.8; transform: scale(1.2); }
          }
           @keyframes scanline {
            0% { transform: translateY(-100%); }
            100% { transform: translateY(100%); }
          }
        `}
      </style>

      {/* --- VARIANT 1: THE DEEP TOMB (Original Fog) --- */}
      {variant === 'tomb' && (
        <>
          <div className="absolute inset-0 bg-[#020203]"></div>
          {/* Ambient Lighting */}
          <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-[#d4af37] blur-[180px] opacity-[0.03]"></div>
          <div className="absolute bottom-[-20%] right-[-10%] w-[70vw] h-[70vw] rounded-full bg-[#b87333] blur-[200px] opacity-[0.02]"></div>
          
          {/* Fog/Noise Layer */}
          <div 
            className="absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
              backgroundSize: '200px 200px',
            }}
          ></div>
        </>
      )}

      {/* --- VARIANT 2: MIDNIGHT DESERT (Blue Gradient + Stars) --- */}
      {variant === 'desert' && (
        <>
           {/* Deep Blue Night Gradient */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#0f172a_0%,_#020617_60%,_#000000_100%)]"></div>
          
          {/* Horizon Glow */}
          <div className="absolute bottom-0 left-0 right-0 h-[40vh] bg-gradient-to-t from-[#1e1b4b]/20 to-transparent"></div>
          
          {/* Subtle Dunes Silhouette Effect (CSS Curved Gradient) */}
          <div className="absolute bottom-[-10%] left-[-10%] right-[-10%] h-[30vh] bg-[radial-gradient(50%_100%_at_50%_100%,_#000000_80%,_transparent_100%)] opacity-80 blur-xl"></div>
        </>
      )}

      {/* --- VARIANT 3: CODEX GRID (Technical) --- */}
      {variant === 'codex' && (
        <>
          <div className="absolute inset-0 bg-[#050505]"></div>
          
          {/* The Grid Pattern */}
          <div 
            className="absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage: `
                linear-gradient(to right, #333 1px, transparent 1px),
                linear-gradient(to bottom, #333 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px'
            }}
          ></div>
          
          {/* Finer Grid */}
          <div 
             className="absolute inset-0 opacity-[0.03]"
             style={{
               backgroundImage: `
                 linear-gradient(to right, #d4af37 0.5px, transparent 0.5px),
                 linear-gradient(to bottom, #d4af37 0.5px, transparent 0.5px)
               `,
               backgroundSize: '10px 10px'
             }}
          ></div>

          {/* Vignette */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,#000000_100%)]"></div>
        </>
      )}

      {/* --- SHARED: VIGNETTE & PARTICLES --- */}
      {variant !== 'codex' && (
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000000_90%)] opacity-80"></div>
      )}

      {particles.map((p) => (
        <div
          key={p.id}
          className={`absolute rounded-full ${variant === 'desert' ? 'bg-white' : 'bg-[#8a8a8a]'} shadow-[0_0_2px_rgba(255,255,255,0.1)]`}
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: 0,
            animation: variant === 'desert' 
              ? `twinkle ${2 + Math.random() * 3}s ease-in-out infinite` 
              : `floatUp ${p.duration}s linear infinite`,
            animationDelay: variant === 'desert' ? `${Math.random() * 5}s` : `-${p.delay}s`
          }}
        />
      ))}
    </div>
  );
};

export default AtmosphereBackground;
