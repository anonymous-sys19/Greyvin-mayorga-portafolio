import { useEffect, useRef } from 'react';

const CursorGlow = () => {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!glowRef.current) return;

      const x = e.clientX;
      const y = e.clientY;

      glowRef.current.style.left = `${x}px`;
      glowRef.current.style.top = `${y}px`;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      ref={glowRef}
      className="fixed pointer-events-none w-96 h-96 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 z-0 hidden lg:block"
      style={{
        boxShadow: '0 0 80px rgba(59, 130, 246, 0.4)',
        transition: 'all 100ms ease-out',
      }}
    />
  );
};

export default CursorGlow;
