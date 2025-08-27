import { Phone, Mail, MapPin, Clock, MessageCircle, Building, FileText, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/LanguageContext";
import princhescaPhoto from "@assets/IMG_8889_1754678450603.png";
import josephImage from '@assets/IMG_9689_1754855787976.jpeg';

export default function AgentProfile() {
  const { t } = useLanguage();

  return (
    <section className="bg-white py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Team Section */}
          <div className="bg-white py-12 mb-16">
            {/* Leadership Team */}
            <div className="text-center mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Leadership Team</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto mb-6">
                {/* Pablo Santiago */}
                <div className="text-center">
                  <div className="relative mb-4">
                    <img 
                      src="/pablo-santiago.png" 
                      alt="Pablo Santiago" 
                      className="w-24 h-24 mx-auto rounded-full object-cover object-top shadow-lg"
                      style={{ objectPosition: 'center top' }}
                    />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">Pablo Santiago</h3>
                  <p className="text-primary font-semibold text-sm">Senior Associate</p>
                </div>
                
                {/* Nolly Santiago */}
                <div className="text-center">
                  <div className="relative mb-4">
                    <img 
                      src="/nolly-santiago.png" 
                      alt="Nolly Santiago" 
                      className="w-24 h-24 mx-auto rounded-full object-cover object-top shadow-lg"
                      style={{ objectPosition: 'center top' }}
                    />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">Nolly Santiago</h3>
                  <p className="text-primary font-semibold text-sm">Marketing Director</p>
                </div>
              </div>
              <p className="text-gray-600 text-sm max-w-md mx-auto">50+ years combined experience in law enforcement and telecommunications</p>
            </div>

            {/* Next Generation */}
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Next Generation</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto mb-6">
                {/* Joseph Santiago */}
                <div className="text-center">
                  <div className="relative mb-4">
                    <img 
                      src={josephImage} 
                      alt="Joseph Santiago" 
                      className="w-24 h-24 mx-auto rounded-full object-cover object-top shadow-lg"
                      style={{ objectPosition: 'center top' }}
                    />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">Joseph Santiago</h3>
                  <p className="text-primary font-semibold text-sm">Investment Licensed</p>
                </div>
                
                {/* Christian Santiago */}
                <div className="text-center">
                  <div className="relative mb-4">
                    <img 
                      src="/christian-santiago.png" 
                      alt="Christian Santiago" 
                      className="w-24 h-24 mx-auto rounded-full object-cover object-top shadow-lg"
                      style={{ objectPosition: 'center top' }}
                    />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">Christian Santiago</h3>
                  <p className="text-primary font-semibold text-sm">Mathematics Expert</p>
                </div>
              </div>
              <p className="text-gray-600 text-sm max-w-md mx-auto">Bringing innovation and specialized expertise to financial services</p>
            </div>
          </div>

          {/* Contact Information Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* Nolly Phone */}
            <div className="flex items-center space-x-3 p-4 bg-primary/5 rounded-lg border border-primary/20">
              <Phone className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-primary font-medium">Nolly Santiago</p>
                <p className="font-semibold text-gray-900">(407) 777-1087</p>
              </div>
            </div>

            {/* Pablo Phone */}
            <div className="flex items-center space-x-3 p-4 bg-primary/5 rounded-lg border border-primary/20">
              <Phone className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-primary font-medium">Pablo Santiago</p>
                <p className="font-semibold text-gray-900">407-777-1087</p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
              <Mail className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <Button variant="link" className="p-0 h-auto text-primary font-semibold">
                  {t('contact.email_me')}
                </Button>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg md:col-span-2">
              <MapPin className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-gray-600">{t('contact.location')}</p>
                <p className="font-semibold text-gray-900">
                  235 N Westmonte Dr, Suite 107<br />
                  Altamonte Springs, FL 32714
                </p>
              </div>
            </div>

            {/* Office Hours */}
            <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
              <Clock className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-gray-600">{t('contact.office_hours')}</p>
                <Button variant="link" className="p-0 h-auto text-primary font-semibold">
                  {t('office.click_office_hours')}
                </Button>
              </div>
            </div>

            {/* Languages */}
            <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg md:col-span-3">
              <MessageCircle className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-gray-600">{t('contact.languages')}</p>
                <p className="font-semibold text-gray-900">{t('contact.spanish_english')}</p>
              </div>
            </div>
          </div>

          {/* Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-white px-8 py-3 text-lg"
              onClick={() => window.location.href = 'tel:407-777-1087'}
            >
              {t('contact.call_team')}
            </Button>
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-white px-8 py-3 text-lg"
            >
              {t('contact.schedule_consultation')}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}