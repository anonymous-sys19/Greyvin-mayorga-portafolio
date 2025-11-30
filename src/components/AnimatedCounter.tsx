import { useEffect, useRef, useState } from 'react';

interface CounterItem {
  label: string;
  value: number;
  icon: React.ReactNode;
}

interface AnimatedCounterProps {
  items: CounterItem[];
}

const AnimatedCounter = ({ items }: AnimatedCounterProps) => {
  const [counts, setCounts] = useState(items.map(() => 0));
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    const intervals = items.map((item, index) => {
      let current = 0;
      const increment = item.value / 60;

      return setInterval(() => {
        current += increment;
        if (current >= item.value) {
          current = item.value;
          clearInterval(intervals[index]);
        }
        setCounts(prev => {
          const newCounts = [...prev];
          newCounts[index] = Math.floor(current);
          return newCounts;
        });
      }, 30);
    });

    return () => intervals.forEach(clearInterval);
  }, [isVisible, items]);

  return (
    <div
      ref={ref}
      className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 py-8 sm:py-12"
    >
      {items.map((item, index) => (
        <div
          key={index}
          className="group relative bg-white dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-110 text-center animate-fade-in"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-300"></div>

          <div className="relative">
            <div className="flex justify-center mb-3 text-blue-600 dark:text-blue-400 group-hover:scale-125 transition-transform duration-300">
              {item.icon}
            </div>
            <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent mb-2">
              {counts[index]}+
            </div>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 font-medium">
              {item.label}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnimatedCounter;
