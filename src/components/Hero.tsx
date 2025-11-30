import { Download, Code2, Sparkles, Zap, Brain, Rocket } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useParallax } from '../hooks/useParallax';
import AnimatedCounter from './AnimatedCounter';

interface HeroProps {
  data: {
    nombre: string;
    profesion: string;
    descripcion: string;
    foto_perfil: string;
    cv_pdf: string;
  };
}

const Hero = ({ data }: HeroProps) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const parallaxRef = useParallax(0.5);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex flex-col justify-between overflow-hidden pt-16 sm:pt-20"
    >
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.2), transparent 50%)`,
        }}
      ></div>

      <div ref={parallaxRef} className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 dark:bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/20 dark:bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex-grow flex items-center">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 w-full">
          <div className="flex-1 text-center lg:text-left space-y-6 animate-fade-in transform transition-all duration-1000">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-600 dark:text-blue-400 text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              <span>Disponible para proyectos</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-gray-900 dark:text-white leading-tight">
              Hola, soy{' '}
              <span className=" text-4xl sm:text-5xl lg:text-6xl bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent">
                {data.nombre}
              </span>
            </h1>

            <div className="flex items-center justify-center lg:justify-start gap-2 text-xl sm:text-2xl text-gray-700 dark:text-gray-300">
              <Code2 className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 dark:text-blue-400" />
              <p className="font-semibold">{data.profesion}</p>
            </div>

            <p className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-400 max-w-2xl leading-relaxed">
              {data.descripcion}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <a
                href="#proyectos"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#proyectos')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
              >
                Ver Proyectos
                <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              </a>

              <a
                href={data.cv_pdf}
                download
                className="group w-full sm:w-auto px-8 py-4 bg-white dark:bg-gray-800 border-2 border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400 rounded-xl font-semibold hover:bg-blue-50 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
              >
                <Download className="w-5 h-5 group-hover:animate-bounce" />
                Descargar CV
              </a>
            </div>
          </div>

          <div className="flex-1 flex justify-center lg:justify-end animate-fade-in-delayed">
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full blur-2xl opacity-50 group-hover:opacity-75 transition-opacity duration-500 animate-pulse"></div>
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-2xl group-hover:scale-105 transition-transform duration-500">
                <img
                  src={data.foto_perfil}
                  alt={data.nombre}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = 'https://via.placeholder.com/400x400/3b82f6/ffffff?text=Ghostroot';
                  }}
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center shadow-xl animate-bounce-slow">
                <Code2 className="w-12 h-12 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-40 left-1/2 transform -translate-x-1/2 animate-bounce pointer-events-none">
        <div className="w-6 h-10 border-2 border-gray-400 dark:border-gray-600 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-2 bg-gray-400 dark:bg-gray-600 rounded-full animate-scroll"></div>
        </div>
      </div>

      <div className="w-full py-8 sm:py-12 bg-gradient-to-t from-blue-50/50 dark:from-blue-950/30 to-transparent relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedCounter
            items={[
              { label: 'Proyectos', value: 50, icon: <Rocket className="w-8 h-8" /> },
              { label: 'Tecnologías', value: 20, icon: <Zap className="w-8 h-8" /> },
              { label: 'Años Exp.', value: 5, icon: <Brain className="w-8 h-8" /> },
              { label: 'Clientes', value: 30, icon: <Sparkles className="w-8 h-8" /> },
            ]}
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
