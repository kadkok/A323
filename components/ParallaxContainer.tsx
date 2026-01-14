
import React, { useRef, useState, useEffect } from 'react';

interface ParallaxContainerProps {
  children: React.ReactNode;
  className?: string;
}

const ParallaxContainer: React.FC<ParallaxContainerProps> = ({ children, className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50 });

  // Smooth interpolation target
  const targetRef = useRef({ x: 0, y: 0, glareX: 50, glareY: 50 });
  
  useEffect(() => {
    let animationFrameId: number;

    const animate = () => {
      // Linear Interpolation (Lerp) for smoothness
      // Current = Current + (Target - Current) * factor
      setRotation(prev => ({
        x: prev.x + (targetRef.current.x - prev.x) * 0.1,
        y: prev.y + (targetRef.current.y - prev.y) * 0.1
      }));

      setGlarePosition(prev => ({
        x: prev.x + (targetRef.current.glareX - prev.x) * 0.1,
        y: prev.y + (targetRef.current.glareY - prev.y) * 0.1
      }));

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const mouseX = e.clientX;
    const mouseY = e.clientY;

    // Calculate rotation (Max 2 degrees for subtlety)
    const rotateY = ((mouseX - centerX) / (rect.width / 2)) * 2; 
    const rotateX = -((mouseY - centerY) / (rect.height / 2)) * 2;

    // Calculate glare position (inverted slightly)
    const glareX = ((mouseX - rect.left) / rect.width) * 100;
    const glareY = ((mouseY - rect.top) / rect.height) * 100;

    targetRef.current = { x: rotateX, y: rotateY, glareX, glareY };
  };

  const handleMouseLeave = () => {
    targetRef.current = { x: 0, y: 0, glareX: 50, glareY: 50 };
  };

  return (
    <div 
      className="perspective-1000 w-full h-full flex items-center justify-center p-2"
      style={{ perspective: '1500px' }}
    >
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`relative transition-shadow duration-300 ease-out ${className}`}
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale3d(1, 1, 1)`,
          transformStyle: 'preserve-3d',
          boxShadow: `${-rotation.y * 5}px ${rotation.x * 5}px 30px rgba(0,0,0,0.6)`,
        }}
      >
        {/* Photorealistic Texture Layer */}
        <div 
          className="absolute inset-0 rounded-sm z-0 pointer-events-none"
          style={{
            background: `
              linear-gradient(135deg, rgba(20, 20, 24, 0.95), rgba(10, 10, 12, 0.98)),
              url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.08'/%3E%3C/svg%3E")
            `,
            backgroundBlendMode: 'overlay',
            boxShadow: 'inset 0 0 100px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.05)'
          }}
        />

        {/* Dynamic Light/Glare Layer */}
        <div 
          className="absolute inset-0 rounded-sm z-10 pointer-events-none mix-blend-soft-light"
          style={{
            background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(255,255,255,0.15) 0%, transparent 60%)`
          }}
        />

        {/* Content Layer - Elevated slightly via translateZ */}
        <div className="relative z-20 h-full w-full" style={{ transform: 'translateZ(10px)' }}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default ParallaxContainer;
