import { Award, Sparkles, X } from 'lucide-react';
import { useState } from 'react';

interface Certificate {
  titulo?: string;
  Titulo?: string;
  imagen: string;
}

interface CertificatesProps {
  certificados: Certificate[];
}

const Certificates = ({ certificados }: CertificatesProps) => {
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);

  const getCertificateTitle = (cert: Certificate) => cert.titulo || cert.Titulo || 'Certificado';

  return (
    <section id="certificados" className="relative py-16 sm:py-24 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 sm:mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-100 dark:bg-cyan-900/30 rounded-full text-cyan-600 dark:text-cyan-400 text-sm font-medium mb-4">
            <Award className="w-4 h-4" />
            <span>Logros</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Certificaciones
          </h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Certificados y cursos completados
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {certificados.map((cert, index) => (
            <div
              key={index}
              className="group relative bg-white dark:bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 cursor-pointer animate-fade-in"
              style={{ animationDelay: `${index * 75}ms` }}
              onClick={() => setSelectedCertificate(cert)}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900/20 dark:to-cyan-900/20">
                <img
                  src={cert.imagen}
                  alt={getCertificateTitle(cert)}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  onError={(e) => {
                    e.currentTarget.src = `https://via.placeholder.com/400x300/3b82f6/ffffff?text=${encodeURIComponent(getCertificateTitle(cert))}`;
                  }}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                  <Sparkles className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transform scale-50 group-hover:scale-100 transition-all duration-300" />
                </div>
              </div>

              <div className="relative p-4">
                <div className="flex items-start gap-2">
                  <Award className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                  <h3 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {getCertificateTitle(cert)}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedCertificate && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in"
          onClick={() => setSelectedCertificate(null)}
        >
          <div
            className="relative max-w-5xl w-full max-h-[90vh] bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-2xl animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedCertificate(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-white/90 dark:bg-gray-900/90 hover:bg-white dark:hover:bg-gray-800 rounded-full shadow-lg transition-all hover:scale-110"
              aria-label="Cerrar"
            >
              <X className="w-6 h-6 text-gray-900 dark:text-white" />
            </button>

            <div className="p-6">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {getCertificateTitle(selectedCertificate)}
              </h3>
              <div className="relative">
                <img
                  src={selectedCertificate.imagen}
                  alt={getCertificateTitle(selectedCertificate)}
                  className="w-full h-auto rounded-lg shadow-lg"
                  onError={(e) => {
                    e.currentTarget.src = `https://via.placeholder.com/800x600/3b82f6/ffffff?text=${encodeURIComponent(getCertificateTitle(selectedCertificate))}`;
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Certificates;
