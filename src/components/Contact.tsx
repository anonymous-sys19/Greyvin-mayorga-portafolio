import { Mail, Phone, Github, Facebook, Instagram, Linkedin, Send, Sparkles } from 'lucide-react';

interface ContactInfo {
  email: string;
  telefono: string;
  redes: {
    github: string;
    facebook: string;
    instagram: string;
    linkedin: string;
  };
}

interface ContactProps {
  contacto: ContactInfo;
}

const Contact = ({ contacto }: ContactProps) => {
  const socialLinks = [
    { name: 'GitHub', icon: Github, url: contacto.redes.github, color: 'hover:text-gray-900 dark:hover:text-white' },
    { name: 'Facebook', icon: Facebook, url: contacto.redes.facebook, color: 'hover:text-blue-600 dark:hover:text-blue-400' },
    { name: 'Instagram', icon: Instagram, url: contacto.redes.instagram, color: 'hover:text-pink-600 dark:hover:text-pink-400' },
    { name: 'LinkedIn', icon: Linkedin, url: contacto.redes.linkedin, color: 'hover:text-blue-700 dark:hover:text-blue-500' },
  ];

  return (
    <section id="contacto" className="relative py-16 sm:py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-50/50 dark:via-cyan-950/20 to-transparent"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 sm:mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-600 dark:text-blue-400 text-sm font-medium mb-4">
            <Send className="w-4 h-4" />
            <span>Conectemos</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Contacto
          </h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Estoy disponible para nuevos proyectos y colaboraciones
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12">
            <div className="group bg-gradient-to-br from-white to-gray-50 dark:from-gray-800/50 dark:to-gray-900/50 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 animate-fade-in">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl shadow-lg group-hover:rotate-12 transition-transform duration-300">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                  Email
                </h3>
              </div>
              <a
                href={`mailto:${contacto.email}`}
                className="text-sm sm:text-base text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors break-all"
              >
                {contacto.email}
              </a>
            </div>

            <div className="group bg-gradient-to-br from-white to-gray-50 dark:from-gray-800/50 dark:to-gray-900/50 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 animate-fade-in animation-delay-100">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-gradient-to-br from-cyan-600 to-blue-600 rounded-xl shadow-lg group-hover:rotate-12 transition-transform duration-300">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                  Telefono
                </h3>
              </div>
              <a
                href={`tel:${contacto.telefono}`}
                className="text-sm sm:text-base text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                {contacto.telefono}
              </a>
            </div>
          </div>

          <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800/50 dark:to-gray-900/50 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-xl animate-fade-in animation-delay-200">
            <div className="flex items-center gap-3 mb-6">
              <Sparkles className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                Redes Sociales
              </h3>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group flex flex-col items-center gap-3 p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:scale-110 ${social.color}`}
                >
                  <social.icon className="w-8 h-8 text-gray-600 dark:text-gray-400 group-hover:scale-125 transition-transform duration-300" />
                  <span className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white">
                    {social.name}
                  </span>
                </a>
              ))}
            </div>
          </div>

          <div className="mt-8 sm:mt-12 text-center animate-fade-in animation-delay-300">
            <a
              href={`mailto:${contacto.email}`}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <Send className="w-5 h-5" />
              Enviar Mensaje
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
