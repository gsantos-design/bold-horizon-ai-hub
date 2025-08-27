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
          {/* Leadership Team Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('page.santiago_team_title')}
            </h1>
            <p className="text-xl text-gray-600 mb-2">{t('page.team_leaders')}</p>
            <p className="text-lg font-semibold text-primary mb-8">{t('page.empowering_through_new_art')}</p>
            
            {/* Leadership Photos */}
            <div className="flex flex-col md:flex-row justify-center items-start gap-12 mb-8">
              {/* Nolly Santiago */}
              <div className="text-center max-w-lg">
                <div className="relative mb-6">
                  <img 
                    src="/nolly-santiago.png" 
                    alt="Nolly Santiago" 
                    className="w-48 h-48 mx-auto rounded-full object-cover object-top shadow-lg border-4 border-primary"
                    style={{ objectPosition: 'center top' }}
                  />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Nolly Santiago</h2>
                <p className="text-primary font-semibold mb-2">{t('team.nolly_title')}</p>
                <div className="text-gray-700 leading-relaxed space-y-3 text-sm text-left">
                  <p>{t('team.nolly_bio_1')}</p>
                  <p>{t('team.nolly_bio_2')}</p>
                  <p><strong>{t('team.nolly_bio_3')}</strong></p>
                  <p>{t('team.nolly_bio_4')}</p>
                </div>
              </div>
              
              {/* Pablo Santiago */}
              <div className="text-center max-w-lg">
                <div className="relative mb-6">
                  <img 
                    src="/pablo-santiago.png" 
                    alt="Pablo Santiago" 
                    className="w-48 h-48 mx-auto rounded-full object-cover object-top shadow-lg border-4 border-primary"
                    style={{ objectPosition: 'center top' }}
                  />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Pablo Santiago</h2>
                <p className="text-primary font-semibold mb-2">{t('team.pablo_title')}</p>
                <div className="text-gray-700 leading-relaxed space-y-3 text-sm text-left">
                  <p><strong>{t('team.pablo_bio_title')}</strong></p>
                  <p>{t('team.pablo_bio_1')}</p>
                  <p>{t('team.pablo_bio_2')}</p>
                  <p><strong>{t('team.pablo_bio_3')}</strong></p>
                  <p>{t('team.pablo_bio_4')}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Team Members Section */}
          <div className="bg-white rounded-xl p-8 mb-12 border border-gray-200">
            <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
              Santiago Team Members
            </h2>
            
            <div className="flex flex-col lg:flex-row items-center gap-8">
              {/* Princhesca Photo */}
              <div className="text-center lg:text-left">
                <div className="relative mb-4">
                  <img 
                    src={princhescaPhoto} 
                    alt="Princhesca Rainier Turner" 
                    className="w-48 h-48 mx-auto lg:mx-0 rounded-full object-cover object-top shadow-lg border-4 border-emerald-200"
                    style={{ objectPosition: 'center top' }}
                  />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Princhesca Rainier Turner</h3>
                <p className="text-emerald-600 font-semibold mb-2">{t('team.princhesca_title')}</p>
                <p className="text-gray-700 font-medium">{t('team.princhesca_company')}</p>
              </div>
              
              {/* Princhesca Bio */}
              <div className="flex-1">
                <div className="bg-white rounded-lg p-6 shadow-md">
                  <p className="text-gray-700 leading-relaxed mb-4">
                    {t('team.princhesca_bio_1')}
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    {t('team.princhesca_bio_2')}
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    {t('team.princhesca_bio_3')}
                  </p>
                </div>
                
                {/* Services Offered */}
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2 text-emerald-700">
                    <Building className="h-4 w-4" />
                    <span className="text-sm font-medium">{t('team.princhesca_service_1')}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-emerald-700">
                    <FileText className="h-4 w-4" />
                    <span className="text-sm font-medium">{t('team.princhesca_service_2')}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-emerald-700">
                    <Building className="h-4 w-4" />
                    <span className="text-sm font-medium">{t('team.princhesca_service_3')}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-emerald-700">
                    <FileText className="h-4 w-4" />
                    <span className="text-sm font-medium">{t('team.princhesca_service_4')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Team Members */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* New Team Member 1 */}
            <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-gray-100">
              <div className="text-center mb-4">
                <div className="relative mb-4">
                  <img 
                    src={josephImage} 
                    alt="Joseph Santiago" 
                    className="w-48 h-48 mx-auto rounded-full object-cover object-top shadow-lg border-4 border-blue-200"
                    style={{ objectPosition: 'center top' }}
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Joseph Santiago</h3>
                <p className="text-blue-600 font-semibold mb-2">{t('team.joseph_title')}</p>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {t('team.joseph_bio_1')}
                  <br/><br/>
                  {t('team.joseph_bio_2')}
                  <br/><br/>
                  {t('team.joseph_bio_3')}
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-blue-700">
                  <Building className="h-4 w-4" />
                  <span className="text-sm font-medium">{t('team.joseph_skill_1')}</span>
                </div>
                <div className="flex items-center space-x-2 text-blue-700">
                  <FileText className="h-4 w-4" />
                  <span className="text-sm font-medium">{t('team.joseph_skill_2')}</span>
                </div>
                <div className="flex items-center space-x-2 text-blue-700">
                  <Users className="h-4 w-4" />
                  <span className="text-sm font-medium">{t('team.joseph_skill_3')}</span>
                </div>
              </div>
            </div>

            {/* New Team Member 2 */}
            <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-gray-100">
              <div className="text-center mb-4">
                <div className="relative mb-4">
                  <img 
                    src="/christian-santiago.png" 
                    alt="Christian Santiago" 
                    className="w-48 h-48 mx-auto rounded-full object-cover object-top shadow-lg border-4 border-emerald-200"
                    style={{ objectPosition: 'center top' }}
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Christian Santiago</h3>
                <p className="text-emerald-600 font-semibold mb-2">{t('team.christian_title')}</p>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {t('team.christian_bio_1')}
                  <br/><br/>
                  {t('team.christian_bio_2')}
                  <br/><br/>
                  {t('team.christian_bio_3')}
                  <br/><br/>
                  {t('team.christian_bio_4')}
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-emerald-700">
                  <Building className="h-4 w-4" />
                  <span className="text-sm font-medium">{t('team.christian_skill_1')}</span>
                </div>
                <div className="flex items-center space-x-2 text-emerald-700">
                  <FileText className="h-4 w-4" />
                  <span className="text-sm font-medium">{t('team.christian_skill_2')}</span>
                </div>
                <div className="flex items-center space-x-2 text-emerald-700">
                  <Users className="h-4 w-4" />
                  <span className="text-sm font-medium">{t('team.christian_skill_3')}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* Nolly Phone */}
            <div className="flex items-center space-x-3 p-4 bg-purple-50 rounded-lg border border-purple-200">
              <Phone className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm text-purple-600 font-medium">Nolly Santiago</p>
                <p className="font-semibold text-gray-900">(407) 777-1087</p>
              </div>
            </div>

            {/* Paul Phone */}
            <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <Phone className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-blue-600 font-medium">Paul Santiago</p>
                <p className="font-semibold text-gray-900">407-777-1087</p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
              <Mail className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <Button variant="link" className="p-0 h-auto text-blue-600 font-semibold">
                  {t('contact.email_me')}
                </Button>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg md:col-span-2">
              <MapPin className="h-5 w-5 text-blue-600" />
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
              <Clock className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">{t('contact.office_hours')}</p>
                <Button variant="link" className="p-0 h-auto text-blue-600 font-semibold">
                  {t('office.click_office_hours')}
                </Button>
              </div>
            </div>

            {/* Languages */}
            <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg md:col-span-3">
              <MessageCircle className="h-5 w-5 text-blue-600" />
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