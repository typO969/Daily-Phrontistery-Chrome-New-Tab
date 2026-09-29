import React, { useMemo } from 'react';

interface AmbientParticlesProps {
  enabled: boolean;
  accentColor: string;
}

export const AmbientParticles: React.FC<AmbientParticlesProps> = ({ enabled, accentColor }) => {
  if (!enabled) return null;

  // Generate deterministic gentle floating particles
  const particles = useMemo(() => {
    return Array.from({ length: 24 }).map((_, i) => ({
      id: i,
      x: (i * 17 + 7) % 100,
      y: (i * 23 + 13) % 100,
      size: 1.5 + (i % 3) * 1.2,
      duration: 18 + (i % 12) * 2,
      delay: (i % 8) * 1.5,
      opacity: 0.15 + (i % 4) * 0.1,
    }));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10" aria-hidden="true">
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: accentColor || '#f59e0b',
            opacity: p.opacity,
            boxShadow: `0 0 ${p.size * 3}px ${accentColor || '#f59e0b'}`,
            animation: `ambient-float ${p.duration}s ease-in-out ${p.delay}s infinite alternate`,
          }}
        />
      ))}
      <style>{`
        @keyframes ambient-float {
          0% {
            transform: translate(0, 0) scale(0.9);
            opacity: 0.1;
          }
          50% {
            transform: translate(15px, -25px) scale(1.15);
            opacity: 0.35;
          }
          100% {
            transform: translate(-15px, -50px) scale(0.85);
            opacity: 0.1;
          }
        }
      `}</style>
    </div>
  );
};
