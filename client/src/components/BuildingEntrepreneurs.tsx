import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/LanguageContext";
import { DictionaryTerm } from "@/components/TooltipDictionary";

export default function BuildingEntrepreneurs() {
  const { t } = useLanguage();

  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div>
              <img 
                src="https://cdn.bfldr.com/801X31N1/at/fc9p3rv7f8q7wzrn8mk4ns6j/Meeting_1.jpg?auto=webp&format=jpg&width=1900&height=1900" 
                alt="Building Entrepreneurs" 
                className="w-full rounded-lg shadow-lg"
              />
            </div>

            {/* Content */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                {t('building.master_new_art')}<br />
                <span className="text-primary">{t('building.join_santiago_team')}</span>
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                {t('building.transform_description')} Learn proven strategies for <DictionaryTerm termId="ingreso_multiple">multiple income streams</DictionaryTerm> and <DictionaryTerm termId="libertad_financiera">financial freedom</DictionaryTerm>.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                {t('building.community_description')} Experience comprehensive <DictionaryTerm termId="educacion_financiera">financial education</DictionaryTerm> and <DictionaryTerm termId="liderazgo">leadership development</DictionaryTerm>.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-primary hover:bg-primary/90 text-secondary px-8 py-3 text-lg"
                  onClick={() => window.open('https://registration.wfglaunch.com/?recruitercode=C8V5D', '_blank')}
                >
                  {t('building.start_journey')}
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary/5 px-8 py-3 text-lg"
                  onClick={() => window.location.href = 'tel:407-777-1087'}
                >
                  {t('building.call_pablo_nolly')}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}