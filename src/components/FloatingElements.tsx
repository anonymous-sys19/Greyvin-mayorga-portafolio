import { useEffect, useState } from 'react';

interface FloatingElement {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
}

const FloatingElements = () => {
  const [elements, setElements] = useState<FloatingElement[]>([]);

  useEffect(() => {
    const initialElements: FloatingElement[] = Array.from({ length: 6 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      size: Math.random() * 3 + 2,
    }));
    setElements(initialElements);

    const interval = setInterval(() => {
      setElements(prev =>
        prev.map(el => ({
          ...el,
          x: (el.x + el.vx + 100) % 100,
          y: (el.y + el.vy + 100) % 100,
        }))
      );
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {elements.map((el) => (
        <div
          key={el.id}
          className="absolute rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 blur-xl opacity-20 dark:opacity-10"
          style={{
            width: `${el.size}rem`,
            height: `${el.size}rem`,
            left: `${el.x}%`,
            top: `${el.y}%`,
            transition: 'all 50ms linear',
          }}
        />
      ))}
    </div>
  );
};

export default FloatingElements;
