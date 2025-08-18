import { Shield, TrendingUp, Briefcase } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { DictionaryTerm } from "@/components/TooltipDictionary";

export default function Services() {
  const { t } = useLanguage();

  const services = [
    {
      icon: Shield,
      title: t('services.multi_income_title'),
      description: t('services.multi_income_desc')
    },
    {
      icon: TrendingUp,
      title: t('services.financial_education_title'), 
      description: t('services.financial_education_desc')
    },
    {
      icon: Briefcase,
      title: t('services.personal_development_title'),
      description: t('services.personal_development_desc')
    }
  ];

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
            {t('services.philosophy_title')}
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            {t('services.philosophy_subtitle')}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <div 
                  key={index}
                  className="bg-gray-50 p-8 rounded-lg text-center hover:shadow-lg transition-shadow border border-gray-100"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6 mx-auto">
                    <IconComponent className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-center">
                    {service.description}
                    {index === 0 && (
                      <span className="block mt-2">
                        Build <DictionaryTerm termId="prosperidad">prosperidad</DictionaryTerm> through <DictionaryTerm termId="ingreso_multiple">multiple income</DictionaryTerm> strategies.
                      </span>
                    )}
                    {index === 1 && (
                      <span className="block mt-2">
                        Master <DictionaryTerm termId="educacion_financiera">financial education</DictionaryTerm> and <DictionaryTerm termId="anualidad">annuity</DictionaryTerm> planning.
                      </span>
                    )}
                    {index === 2 && (
                      <span className="block mt-2">
                        Develop <DictionaryTerm termId="liderazgo">leadership</DictionaryTerm> and achieve <DictionaryTerm termId="libertad_financiera">financial freedom</DictionaryTerm>.
                      </span>
                    )}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}