import React, { useEffect, useRef } from 'react';
import { Cpu } from 'lucide-react';

const HexGrid = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      
      containerRef.current.style.setProperty('--mouse-x', x.toString());
      containerRef.current.style.setProperty('--mouse-y', y.toString());
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-screen bg-black overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20" />
      <div className="hex-grid">
        {[...Array(150)].map((_, i) => (
          <div
            key={i}
            className="hex"
            style={{
              '--delay': `${Math.random() * 5}s`,
              '--scale': `${0.8 + Math.random() * 0.4}`,
              '--x': `${Math.random() * 100}%`,
              '--y': `${Math.random() * 100}%`,
            } as React.CSSProperties}
          >
            <div className="hex-inner" />
          </div>
        ))}
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center z-10">
          <Cpu className="w-16 h-16 text-cyan-400 animate-pulse mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-cyan-400 tracking-wider mb-2">
            SYSTEM ACTIVE
          </h1>
          <p className="text-cyan-300/80 tracking-widest text-sm">
            GRID INITIALIZATION COMPLETE
          </p>
        </div>
      </div>
    </div>
  );
};

export default HexGrid;