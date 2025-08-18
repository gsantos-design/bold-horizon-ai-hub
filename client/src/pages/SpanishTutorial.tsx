import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/lib/LanguageContext';
import { 
  PlayCircle, 
  CheckCircle2, 
  Star, 
  Clock, 
  Users, 
  Target,
  BookOpen,
  Video,
  Download,
  MessageSquare,
  Phone,
  Calendar
} from 'lucide-react';

const tutorialSections = [
  {
    id: 'introduction',
    titleKey: 'tutorial.introduction_title',
    descriptionKey: 'tutorial.introduction_desc',
    duration: '10 min',
    lessons: [
      'tutorial.lesson_welcome',
      'tutorial.lesson_team_overview',
      'tutorial.lesson_mission'
    ]
  },
  {
    id: 'financial_basics',
    titleKey: 'tutorial.financial_basics_title', 
    descriptionKey: 'tutorial.financial_basics_desc',
    duration: '15 min',
    lessons: [
      'tutorial.lesson_compound_interest',
      'tutorial.lesson_multiple_income',
      'tutorial.lesson_protection_strategies'
    ]
  },
  {
    id: 'getting_started',
    titleKey: 'tutorial.getting_started_title',
    descriptionKey: 'tutorial.getting_started_desc', 
    duration: '20 min',
    lessons: [
      'tutorial.lesson_registration_process',
      'tutorial.lesson_first_meeting',
      'tutorial.lesson_goal_setting'
    ]
  },
  {
    id: 'advanced_strategies',
    titleKey: 'tutorial.advanced_strategies_title',
    descriptionKey: 'tutorial.advanced_strategies_desc',
    duration: '25 min', 
    lessons: [
      'tutorial.lesson_business_building',
      'tutorial.lesson_team_development',
      'tutorial.lesson_leadership_skills'
    ]
  }
];

export default function SpanishTutorial() {
  const { t, language } = useLanguage();
  const [activeSection, setActiveSection] = useState('introduction');
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [currentProgress, setCurrentProgress] = useState(0);

  const handleLessonComplete = (lessonId: string) => {
    if (!completedLessons.includes(lessonId)) {
      const newCompleted = [...completedLessons, lessonId];
      setCompletedLessons(newCompleted);
      
      // Calculate progress
      const totalLessons = tutorialSections.reduce((acc, section) => acc + section.lessons.length, 0);
      const progress = (newCompleted.length / totalLessons) * 100;
      setCurrentProgress(progress);
    }
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-16">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center max-w-4xl mx-auto"
            {...fadeInUp}
          >
            <Badge className="mb-4 bg-white/20 text-white px-4 py-2">
              <BookOpen className="w-4 h-4 mr-2" />
              {t('tutorial.spanish_training')}
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {t('tutorial.main_title')}
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              {t('tutorial.main_subtitle')}
            </p>
            
            {/* Progress Bar */}
            <div className="bg-white/20 rounded-full p-1 max-w-md mx-auto mb-8">
              <div className="flex items-center justify-between text-sm mb-2">
                <span>{t('tutorial.your_progress')}</span>
                <span>{Math.round(currentProgress)}%</span>
              </div>
              <Progress value={currentProgress} className="h-3" />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-purple-600 hover:bg-purple-50"
                onClick={() => setActiveSection('introduction')}
              >
                <PlayCircle className="w-5 w-5 mr-2" />
                {t('tutorial.start_tutorial')}
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white/10"
                onClick={() => window.location.href = 'tel:407-777-1087'}
              >
                <Phone className="w-5 h-5 mr-2" />
                {t('tutorial.get_help')}
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tutorial Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            
            {/* Tutorial Navigation */}
            <motion.div 
              className="mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Tabs value={activeSection} onValueChange={setActiveSection}>
                <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-8">
                  {tutorialSections.map((section, index) => (
                    <TabsTrigger 
                      key={section.id} 
                      value={section.id}
                      className="flex flex-col items-center p-4"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold ${
                          completedLessons.some(lesson => 
                            tutorialSections[index].lessons.includes(lesson)
                          ) ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600'
                        }`}>
                          {index + 1}
                        </div>
                        <Clock className="w-4 h-4" />
                        <span className="text-xs">{section.duration}</span>
                      </div>
                      <span className="text-xs text-center">{t(section.titleKey)}</span>
                    </TabsTrigger>
                  ))}
                </TabsList>

                {tutorialSections.map((section) => (
                  <TabsContent key={section.id} value={section.id}>
                    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                      <CardHeader className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle className="text-2xl mb-2">
                              {t(section.titleKey)}
                            </CardTitle>
                            <p className="text-purple-100">
                              {t(section.descriptionKey)}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-5 h-5" />
                            <span>{section.duration}</span>
                          </div>
                        </div>
                      </CardHeader>
                      
                      <CardContent className="p-8">
                        <div className="grid gap-6">
                          {section.lessons.map((lessonKey, index) => (
                            <motion.div
                              key={lessonKey}
                              className={`border rounded-lg p-6 cursor-pointer transition-all ${
                                completedLessons.includes(lessonKey) 
                                  ? 'border-green-500 bg-green-50' 
                                  : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50'
                              }`}
                              onClick={() => handleLessonComplete(lessonKey)}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                    completedLessons.includes(lessonKey)
                                      ? 'bg-green-500 text-white'
                                      : 'bg-purple-100 text-purple-600'
                                  }`}>
                                    {completedLessons.includes(lessonKey) ? (
                                      <CheckCircle2 className="w-5 h-5" />
                                    ) : (
                                      <PlayCircle className="w-5 h-5" />
                                    )}
                                  </div>
                                  <div>
                                    <h4 className="font-semibold text-gray-900">
                                      {t(lessonKey)}
                                    </h4>
                                    <p className="text-sm text-gray-600">
                                      {t(`${lessonKey}_desc`)}
                                    </p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Video className="w-5 h-5 text-purple-600" />
                                  <span className="text-sm text-gray-500">5-10 min</span>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                        
                        {/* Section Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-6 border-t">
                          <Button 
                            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                            onClick={() => {
                              section.lessons.forEach(lesson => handleLessonComplete(lesson));
                            }}
                          >
                            <CheckCircle2 className="w-4 h-4 mr-2" />
                            {t('tutorial.mark_section_complete')}
                          </Button>
                          <Button variant="outline">
                            <Download className="w-4 h-4 mr-2" />
                            {t('tutorial.download_materials')}
                          </Button>
                          <Button variant="outline">
                            <MessageSquare className="w-4 h-4 mr-2" />
                            {t('tutorial.ask_question')}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                ))}
              </Tabs>
            </motion.div>

            {/* Call to Action */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="bg-gradient-to-r from-emerald-600 to-blue-600 text-white border-0">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-4">
                    {t('tutorial.ready_to_start')}
                  </h3>
                  <p className="text-emerald-100 mb-6 max-w-2xl mx-auto">
                    {t('tutorial.ready_to_start_desc')}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button 
                      size="lg" 
                      className="bg-white text-emerald-600 hover:bg-emerald-50"
                      onClick={() => window.location.href = '/spanish-registration'}
                    >
                      <Star className="w-5 h-5 mr-2" />
                      {t('tutorial.register_now')}
                    </Button>
                    <Button 
                      size="lg" 
                      variant="outline" 
                      className="border-white text-white hover:bg-white/10"
                      onClick={() => window.location.href = 'tel:407-777-1087'}
                    >
                      <Calendar className="w-5 h-5 mr-2" />
                      {t('tutorial.schedule_meeting')}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Success Statistics */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Card className="text-center bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-center mb-4">
                    <Users className="w-8 h-8 text-blue-600" />
                  </div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-2">500+</h4>
                  <p className="text-gray-600">{t('tutorial.families_helped')}</p>
                </CardContent>
              </Card>
              
              <Card className="text-center bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-center mb-4">
                    <Target className="w-8 h-8 text-purple-600" />
                  </div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-2">95%</h4>
                  <p className="text-gray-600">{t('tutorial.success_rate')}</p>
                </CardContent>
              </Card>
              
              <Card className="text-center bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-center mb-4">
                    <Star className="w-8 h-8 text-emerald-600" />
                  </div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-2">4.9/5</h4>
                  <p className="text-gray-600">{t('tutorial.client_satisfaction')}</p>
                </CardContent>
              </Card>
            </motion.div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}