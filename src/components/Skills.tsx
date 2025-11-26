import { Code, Server, Database, Package, GitBranch, Monitor, FileSpreadsheet, Sparkles } from 'lucide-react';

interface Skill {
  nombre: string;
  nivel: number | string;
}

interface Tecnologias {
  frontend: Skill[];
  backend: Skill[];
  bases_datos: Skill[];
  contenedores: Skill[];
  sistemas_control: Skill[];
  sistemas_operativos: Skill[];
  ofimatica: Skill[];
}

interface SkillsProps {
  tecnologias: Tecnologias;
}

const categoryIcons = {
  frontend: Code,
  backend: Server,
  bases_datos: Database,
  contenedores: Package,
  sistemas_control: GitBranch,
  sistemas_operativos: Monitor,
  ofimatica: FileSpreadsheet,
};

const categoryNames = {
  frontend: 'Frontend',
  backend: 'Backend',
  bases_datos: 'Bases de Datos',
  contenedores: 'Contenedores',
  sistemas_control: 'Control de Versiones',
  sistemas_operativos: 'Sistemas Operativos',
  ofimatica: 'Ofimatica',
};

const Skills = ({ tecnologias }: SkillsProps) => {
  const renderSkill = (skill: Skill, index: number) => {
    const isNumeric = typeof skill.nivel === 'number';
    const nivel = isNumeric ? skill.nivel : 0;

    return (
      <div
        key={index}
        className="group relative bg-white dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 hover:shadow-lg transition-all duration-300 hover:scale-105 animate-fade-in"
        style={{ animationDelay: `${index * 50}ms` }}
      >
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">
            {skill.nombre}
          </h4>
          <span className="text-xs sm:text-sm font-bold text-blue-600 dark:text-blue-400">
            {isNumeric ? `${nivel}%` : skill.nivel}
          </span>
        </div>

        {isNumeric ? (
          <div className="relative h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full transition-all duration-1000 ease-out group-hover:from-blue-500 group-hover:to-cyan-500"
              style={{ width: `${nivel}%` }}
            ></div>
          </div>
        ) : (
          <div className="text-xs text-gray-500 dark:text-gray-400 italic">
            En desarrollo
          </div>
        )}
      </div>
    );
  };

  return (
    <section id="habilidades" className="relative py-16 sm:py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-50/50 dark:via-blue-950/20 to-transparent"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 sm:mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-600 dark:text-blue-400 text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            <span>Tecnologias</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Habilidades Tecnicas
          </h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Tecnologias y herramientas que domino
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
          {Object.entries(tecnologias).map(([category, skills], categoryIndex) => {
            const Icon = categoryIcons[category as keyof typeof categoryIcons];
            const categoryName = categoryNames[category as keyof typeof categoryNames];

            return (
              <div
                key={category}
                className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800/50 dark:to-gray-900/50 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all duration-500 animate-fade-in"
                style={{ animationDelay: `${categoryIndex * 100}ms` }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl shadow-lg">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                    {categoryName}
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {skills.map((skill, skillIndex) => renderSkill(skill, skillIndex))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
