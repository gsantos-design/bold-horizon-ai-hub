import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Shield, 
  Heart, 
  Users, 
  Star, 
  ArrowRight, 
  Phone,
  Award,
  TrendingUp,
  Building,
  GraduationCap
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { useLanguage } from '@/lib/LanguageContext';

// Import images directly
import newTeamPhoto from '@assets/8357223228604543892_1754857339707.jpeg';

export default function LandingHero() {
  const { t } = useLanguage();
  
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Main Hero Content */}
          <motion.div className="text-center mb-16" {...fadeInUp}>
            <Badge className="mb-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 text-lg">
              🏆 {t('hero.badge')}
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              {t('hero.title_part1')}
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {t('hero.title_part2')}
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
              {t('hero.subtitle')}
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg"
                onClick={() => window.location.href = 'tel:407-777-1087'}
              >
                <Phone className="h-5 w-5 mr-2" />
                {t('hero.call_now')}
              </Button>
              <Link href="/mission-highlights">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg"
                >
                  {t('hero.discover_mission')}
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
              <a 
                href={t('meeting.spanish_zoom_link')}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 text-lg"
                >
                  <Users className="h-5 w-5 mr-2" />
                  {t('meeting.register_spanish')}
                </Button>
              </a>
            </div>
          </motion.div>

          {/* Mission Statement Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <Card className="border-2 border-blue-200 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                    <Shield className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{t('hero.protect_protectors')}</h3>
                  <p className="text-gray-600 text-sm">
                    {t('hero.protect_protectors_desc')}
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <Card className="border-2 border-purple-200 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-purple-100 rounded-full flex items-center justify-center">
                    <Heart className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{t('hero.family_legacy')}</h3>
                  <p className="text-gray-600 text-sm">
                    {t('hero.family_legacy_desc')}
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <Card className="border-2 border-green-200 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                    <TrendingUp className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{t('hero.entrepreneurial_wealth')}</h3>
                  <p className="text-gray-600 text-sm">
                    {t('hero.entrepreneurial_wealth_desc')}
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <Card className="border-2 border-orange-200 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-orange-100 rounded-full flex items-center justify-center">
                    <GraduationCap className="h-8 w-8 text-orange-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{t('hero.youth_education')}</h3>
                  <p className="text-gray-600 text-sm">
                    {t('hero.youth_education_desc')}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* About Us Section */}
          <motion.div 
            className="bg-white rounded-2xl shadow-xl p-8 md:p-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {t('team.about_title')}
              </h2>
              <p className="text-xl text-gray-600">
{t('team.about_subtitle')}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Story Content */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{t('team.our_story')}</h3>
                  <p className="text-gray-700 leading-relaxed">
                    {t('team.story_text')}
                  </p>
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{t('team.our_transformation')}</h3>
                  <p className="text-gray-700 leading-relaxed">
                    {t('team.transformation_text')}
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{t('team.our_mission_today')}</h3>
                  <p className="text-gray-700 leading-relaxed">
                    {t('team.mission_today_text')}
                  </p>
                </div>
              </div>

              {/* Impact Stats */}
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">{t('team.our_impact')}</h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-white rounded-lg shadow">
                      <div className="text-3xl font-bold text-blue-600 mb-1">5,000+</div>
                      <div className="text-sm text-gray-600">{t('team.families_served')}</div>
                    </div>
                    <div className="text-center p-4 bg-white rounded-lg shadow">
                      <div className="text-3xl font-bold text-purple-600 mb-1">75+</div>
                      <div className="text-sm text-gray-600">{t('team.years_experience')}</div>
                    </div>
                    <div className="text-center p-4 bg-white rounded-lg shadow">
                      <div className="text-3xl font-bold text-green-600 mb-1">3,800+</div>
                      <div className="text-sm text-gray-600">{t('team.financial_plans')}</div>
                    </div>
                    <div className="text-center p-4 bg-white rounded-lg shadow">
                      <div className="text-3xl font-bold text-orange-600 mb-1">100%</div>
                      <div className="text-sm text-gray-600">{t('team.family_commitment')}</div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl p-6 text-center">
                  <h4 className="text-xl font-bold mb-2">{t('team.ready_secure')}</h4>
                  <p className="mb-4 opacity-90">
                    {t('team.join_thousands')}
                  </p>
                  <Button 
                    size="lg" 
                    className="bg-white text-blue-600 hover:bg-gray-100"
                    onClick={() => window.location.href = 'tel:407-777-1087'}
                  >
                    <Phone className="h-5 w-5 mr-2" />
{t('team.start_journey')}
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Services Preview */}
          <motion.div 
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              {t('team.how_we_serve')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                  <Shield className="h-10 w-10 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{t('services.financial_protection')}</h3>
                <p className="text-gray-600">
                  {t('services.financial_protection_desc')}
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 bg-purple-100 rounded-full flex items-center justify-center">
                  <Building className="h-10 w-10 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{t('services.business_building')}</h3>
                <p className="text-gray-600">
                  {t('services.business_building_desc')}
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                  <Users className="h-10 w-10 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{t('services.family_legacy')}</h3>
                <p className="text-gray-600">
                  {t('services.family_legacy_desc')}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Santiago Team Family Photo */}
          <motion.div 
            className="mt-20 text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.8 }}
          >
            <div className="max-w-4xl mx-auto">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                {t('services.meet_family')}
              </h3>
              <p className="text-lg text-gray-600 mb-8">
                {t('services.meet_family_desc')}
              </p>
              <img 
                src={newTeamPhoto} 
                alt="Santiago Team Family Photo" 
                className="w-full rounded-2xl shadow-2xl border-4 border-white"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}