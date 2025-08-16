import { Button } from "@/components/ui/button";
import { Clock, Users, Calendar } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

export default function SpanishMeetingCallout() {
  const { t } = useLanguage();

  return (
    <section className="bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center text-white">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
              <Users className="h-8 w-8" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t('meeting.spanish_title')}
            </h2>
            <p className="text-xl text-purple-100 mb-6">
              {t('meeting.spanish_description')}
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="flex items-center justify-center space-x-3">
                <Calendar className="h-6 w-6 text-purple-200" />
                <span className="text-lg font-semibold text-purple-100">
                  {t('meeting.schedule').split(' at ')[0]}
                </span>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <Clock className="h-6 w-6 text-purple-200" />
                <span className="text-lg font-semibold text-purple-100">
                  7:00 PM Eastern Time
                </span>
              </div>
            </div>
            
            <div className="text-center space-x-4">
              <a 
                href={t('meeting.spanish_zoom_link')}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button 
                  size="lg" 
                  className="bg-white text-purple-600 hover:bg-purple-50 px-8 py-4 text-lg font-semibold shadow-lg"
                >
                  {t('meeting.register_spanish')}
                </Button>
              </a>
              <a href="/registro-espanol">
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-white text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold"
                >
                  Formulario en Español
                </Button>
              </a>
            </div>
          </div>

          <p className="text-purple-200 text-sm">
            {t('meeting.eastern_time')} | {t('meeting.presented_by')}
          </p>
        </div>
      </div>
    </section>
  );
}