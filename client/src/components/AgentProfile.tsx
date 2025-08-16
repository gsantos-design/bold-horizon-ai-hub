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
              THE SANTIAGO TEAM
            </h1>
            <p className="text-xl text-gray-600 mb-2">Pablo &amp; Nolly Santiago - Team Leaders</p>
            <p className="text-lg font-semibold text-blue-600 mb-8">Empowering Families Through The New Art of Living</p>
            
            {/* Leadership Photos */}
            <div className="flex flex-col md:flex-row justify-center items-start gap-12 mb-8">
              {/* Nolly Santiago */}
              <div className="text-center max-w-lg">
                <div className="relative mb-6">
                  <img 
                    src="/nolly-santiago.png" 
                    alt="Nolly Santiago" 
                    className="w-48 h-48 mx-auto rounded-full object-cover object-top shadow-lg border-4 border-purple-200"
                    style={{ objectPosition: 'center top' }}
                  />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Nolly Santiago</h2>
                <p className="text-purple-600 font-semibold mb-2">Marketing Director – World Financial Group</p>
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
                    className="w-48 h-48 mx-auto rounded-full object-cover object-top shadow-lg border-4 border-blue-200"
                    style={{ objectPosition: 'center top' }}
                  />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Pablo Santiago</h2>
                <p className="text-blue-600 font-semibold mb-2">Former NYPD & Orange County Law Enforcement | WFG Associate</p>
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
          <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-8 mb-12">
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
                <p className="text-emerald-600 font-semibold mb-2">Licensed Life Insurance Agent</p>
                <p className="text-gray-700 font-medium">Owner, Rainier Tax Services LLC</p>
              </div>
              
              {/* Princhesca Bio */}
              <div className="flex-1">
                <div className="bg-white rounded-lg p-6 shadow-md">
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Princhesca Rainier Turner is a Licensed Life Insurance Agent and the owner of Rainier Tax Services LLC. 
                    With more than 10 years of experience in financial services, she specializes in life insurance and annuities, 
                    personal and business tax planning and preparation, bookkeeping, and LLC formation.
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Her mission is to empower families, small business owners, and young professionals through financial 
                    education and customized solutions. Before entering the financial industry, Princhesca built a strong 
                    foundation in telecommunications, excelling in customer service, project management, and sales leadership.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    Rainier Tax Services was originally founded by her father in the 1990s. After his passing in 2018, 
                    Princhesca proudly took over the business to continue his legacy of service and integrity.
                  </p>
                </div>
                
                {/* Services Offered */}
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2 text-emerald-700">
                    <Building className="h-4 w-4" />
                    <span className="text-sm font-medium">Life Insurance & Annuities</span>
                  </div>
                  <div className="flex items-center space-x-2 text-emerald-700">
                    <FileText className="h-4 w-4" />
                    <span className="text-sm font-medium">Tax Preparation</span>
                  </div>
                  <div className="flex items-center space-x-2 text-emerald-700">
                    <Building className="h-4 w-4" />
                    <span className="text-sm font-medium">Business Formation</span>
                  </div>
                  <div className="flex items-center space-x-2 text-emerald-700">
                    <FileText className="h-4 w-4" />
                    <span className="text-sm font-medium">Bookkeeping Services</span>
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
                <p className="text-blue-600 font-semibold mb-2">Associate – World Financial Group</p>
                <p className="text-gray-700 text-sm leading-relaxed">
                  I'm excited to join the WFG team — a team that's also my family. I earned my investment license right out of high school, and later graduated with a degree in Finance. From day one, I knew I wanted to use my skills to help people take control of their money and their future.
                  <br/><br/>
                  I grew up watching my parents work incredibly hard, sacrificing countless holidays and summers in service to others. That dedication taught me discipline and commitment, but it also showed me a hard truth: without financial education, even the most dedicated people can be left unprotected.
                  <br/><br/>
                  My mission is to build lasting financial wealth, gain true freedom, and create a legacy that lasts for generations. If you have the heart of an entrepreneur and want to build real wealth, let's connect. I've got you, brother.
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-blue-700">
                  <Building className="h-4 w-4" />
                  <span className="text-sm font-medium">Investment License</span>
                </div>
                <div className="flex items-center space-x-2 text-blue-700">
                  <FileText className="h-4 w-4" />
                  <span className="text-sm font-medium">Finance Degree</span>
                </div>
                <div className="flex items-center space-x-2 text-blue-700">
                  <Users className="h-4 w-4" />
                  <span className="text-sm font-medium">Wealth Building</span>
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
                <p className="text-emerald-600 font-semibold mb-2">Associate – World Financial Group</p>
                <p className="text-gray-700 text-sm leading-relaxed">
                  I'm Christian Santiago. I recently graduated and, like my twin brother Joseph, I've chosen to join my family's mission at WFG. I've always been a bit of an introvert, keeping my circle small, but I'm deeply loyal to the people I care about. Numbers have always been my strength — I've loved math for as long as I can remember — but what truly grabbed my attention was learning about the power of compound interest.
                  <br/><br/>
                  It wasn't something I was ever taught in school, and my first reaction was: Why isn't this in schools? Everyone should know this. That moment sparked a passion in me to share this knowledge with others — especially with the younger generation.
                  <br/><br/>
                  I believe in empowering people to dream again, to rebuild self-belief, and to gain the confidence to create their own financial future. I see this as a new art of living — one where we use knowledge, entrepreneurship, and discipline to build not just wealth, but a lasting legacy.
                  <br/><br/>
                  My mission is to help young people understand that they have the power to take control of their money, their choices, and their future — starting today.
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-emerald-700">
                  <Building className="h-4 w-4" />
                  <span className="text-sm font-medium">Mathematics & Analytics</span>
                </div>
                <div className="flex items-center space-x-2 text-emerald-700">
                  <FileText className="h-4 w-4" />
                  <span className="text-sm font-medium">Compound Interest Expert</span>
                </div>
                <div className="flex items-center space-x-2 text-emerald-700">
                  <Users className="h-4 w-4" />
                  <span className="text-sm font-medium">Youth Financial Education</span>
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
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 text-lg"
              onClick={() => window.location.href = 'tel:407-777-1087'}
            >
              {t('contact.call_team')}
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-purple-600 text-purple-600 hover:bg-purple-50 px-8 py-3 text-lg"
            >
              {t('contact.schedule_consultation')}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}