import { useState, useEffect } from 'react';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Certificates from './components/Certificates';
import Contact from './components/Contact';
import Navigation from './components/Navigation';
import Background3D from './components/Background3D';
import FloatingElements from './components/FloatingElements';
import ScrollProgress from './components/ScrollProgress';
import CursorGlow from './components/CursorGlow';
import data from './data.json';

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-blue-100 to-purple-100 dark:from-gray-900 dark:via-blue-950 dark:to-purple-950 transition-colors duration-500 overflow-x-hidden">
      <Background3D />
      <FloatingElements />
      <ScrollProgress />
      <CursorGlow />
      <Navigation theme={theme} toggleTheme={toggleTheme} />

      <main className="relative z-10">
        <Hero data={data.inicio} />
        <Projects projects={data.proyectos} />
        <Skills tecnologias={data.tecnologias} />
        <Certificates certificados={data.certificados} />
        <Contact contacto={data.contacto} />
      </main>

      <footer className="relative z-10 py-8 text-center text-gray-600 dark:text-gray-400 border-t border-gray-200 dark:border-gray-800">
        <p>&copy; {new Date().getFullYear()} {data.inicio.nombre}. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}

export default App;
