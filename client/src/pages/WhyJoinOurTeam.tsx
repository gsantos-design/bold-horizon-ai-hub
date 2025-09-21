import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Bot, 
  Smartphone, 
  Video, 
  Phone, 
  TrendingUp, 
  Users, 
  Target, 
  Award,
  Zap,
  Star,
  Clock,
  DollarSign,
  Shield,
  CheckCircle,
  ArrowRight,
  PlayCircle,
  Lightbulb,
  Rocket,
  Globe,
  Brain,
  HeadphonesIcon,
  Calendar,
  MessageSquare,
  BarChart3,
  Trophy,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Import correct Santiago family photos
import pabloImage from '@assets/image_1756353161547.png';
import nollyImage from '@assets/IMG_0410_1754923958309.jpeg';
import josephImage from '@assets/IMG_9689_1754855787976.jpeg';
import christianImage from '@assets/IMG_0411_1754924018747.jpeg';
// Import team member photos
import princhescaPhoto from '@assets/IMG_8889_1754678450603.png';

export default function WhyJoinOurTeam() {
  const [activeFeature, setActiveFeature] = useState('ai-assistant');

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const aiFeatures = [
    {
      id: 'ai-assistant',
      title: 'Personal AI Assistant',
      icon: <Bot className="h-8 w-8" />,
      color: 'from-blue-600 to-cyan-600',
      description: 'Every team member gets their own AI-powered virtual assistant that handles lead qualification, appointment scheduling, and initial client outreach.',
      benefits: [
        '24/7 lead response within 2 minutes',
        'Automated follow-up sequences',
        'Lead scoring and prioritization',
        'CRM integration and data management'
      ],
      stats: { metric: '300%', label: 'Increase in Lead Response Rate' }
    },
    {
      id: 'ai-calls',
      title: 'AI-Powered Phone Calls',
      icon: <Phone className="h-8 w-8" />,
      color: 'from-purple-600 to-pink-600',
      description: 'Revolutionary AI phone technology that conducts initial consultations, qualifies prospects, and books appointments automatically.',
      benefits: [
        'Natural conversation flow',
        'Appointment booking automation',
        'Lead qualification scripts',
        'Call recording and transcription'
      ],
      stats: { metric: '85%', label: 'Appointment Show-Up Rate' }
    },
    {
      id: 'personalized-videos',
      title: 'Personalized Video Creation',
      icon: <Video className="h-8 w-8" />,
      color: 'from-green-600 to-emerald-600',
      description: 'AI generates personalized video messages for each prospect, dramatically increasing engagement and conversion rates.',
      benefits: [
        'Customized video content',
        'Automated video delivery',
        'Engagement tracking',
        'A/B testing capabilities'
      ],
      stats: { metric: '450%', label: 'Higher Video Engagement' }
    },
    {
      id: 'smart-analytics',
      title: 'Intelligent Analytics',
      icon: <BarChart3 className="h-8 w-8" />,
      color: 'from-orange-600 to-red-600',
      description: 'Advanced AI analytics provide deep insights into your performance, identifying opportunities and optimizing your approach.',
      benefits: [
        'Performance prediction',
        'Opportunity identification',
        'Automated reporting',
        'ROI optimization'
      ],
      stats: { metric: '180%', label: 'Improvement in Closing Rate' }
    }
  ];

  const teamBenefits = [
    {
      title: 'Revolutionary AI Technology',
      subtitle: 'Be Part of the Future',
      description: 'Join one of the only WFG teams offering cutting-edge AI automation technology that transforms how you work with clients.',
      icon: <Rocket className="h-12 w-12" />,
      gradient: 'from-blue-600 to-purple-600',
      features: [
        'AI-powered lead generation',
        'Automated client communication',
        'Personalized video outreach',
        'Smart performance analytics'
      ]
    },
    {
      title: 'Comprehensive Training Program',
      subtitle: 'Master the Art of Financial Success',
      description: 'Our proven three-pillar system (Multi-Handed Income, Financial Education, Self-Improvement) with dedicated mentorship.',
      icon: <Award className="h-12 w-12" />,
      gradient: 'from-green-600 to-emerald-600',
      features: [
        'Pablo & Nolly\'s personal mentorship',
        'Weekly training workshops',
        'Industry certification support',
        'Ongoing professional development'
      ]
    },
    {
      title: 'Guaranteed Income Support',
      subtitle: 'Financial Security from Day One',
      description: 'Unlike other teams, we provide income guarantees and support to ensure your success while you build your client base.',
      icon: <Shield className="h-12 w-12" />,
      gradient: 'from-purple-600 to-pink-600',
      features: [
        'First 90-day income guarantee',
        'Leads provided until self-sufficient',
        'Marketing budget support',
        'Technology tools included'
      ]
    },
    {
      title: 'Family Legacy Building',
      subtitle: 'Multi-Generational Success',
      description: 'Learn from a family team spanning three generations, each bringing unique expertise and proven success strategies.',
      icon: <Users className="h-12 w-12" />,
      gradient: 'from-orange-600 to-red-600',
      features: [
        'Pablo: 34 years law enforcement (NYPD & Orange County)',
        'Nolly: 20+ years telecommunications',
        'Joseph: Investment licensed entrepreneur',
        'Christian: Mathematics & education expert'
      ]
    }
  ];

  const successMetrics = [
    { label: 'New Agent Success Rate', value: '94%', description: 'Agents earning $50K+ in first year' },
    { label: 'AI Technology Adoption', value: '100%', description: 'Team members using AI tools' },
    { label: 'Client Retention Rate', value: '89%', description: 'Clients staying long-term' },
    { label: 'Average Income Growth', value: '275%', description: 'Year-over-year earnings increase' }
  ];

  const tutorialSteps = [
    {
      step: 1,
      title: 'AI Onboarding & Setup',
      duration: 'Week 1',
      description: 'Complete AI system setup and learn basic automation tools',
      details: [
        'Personal AI assistant configuration',
        'CRM integration and setup',
        'Lead generation system training',
        'Basic automation workflows'
      ]
    },
    {
      step: 2,
      title: 'Advanced AI Training',
      duration: 'Weeks 2-3',
      description: 'Master advanced AI features and personalization',
      details: [
        'AI phone call scripting',
        'Personalized video creation',
        'Advanced lead scoring',
        'Performance analytics training'
      ]
    },
    {
      step: 3,
      title: 'Live Practice & Optimization',
      duration: 'Weeks 4-6',
      description: 'Apply AI tools with real prospects and optimize performance',
      details: [
        'Live lead engagement',
        'AI performance tuning',
        'A/B testing strategies',
        'Results analysis and improvement'
      ]
    },
    {
      step: 4,
      title: 'Mastery & Independence',
      duration: 'Ongoing',
      description: 'Achieve full proficiency and help train new team members',
      details: [
        'Advanced strategy development',
        'Mentoring new team members',
        'Continuous optimization',
        'Leadership opportunities'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div {...fadeInUp}>
              <Badge className="mb-4 bg-white/20 text-white px-6 py-2">
                <Sparkles className="w-4 h-4 mr-2" />
                Exclusive AI Technology
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Join the Future of<br/>
                <span className="text-yellow-300">Financial Services</span>
              </h1>
              <p className="text-xl mb-8 opacity-90 leading-relaxed">
                Be part of one of the only WFG teams offering revolutionary AI automation technology. 
                Transform your career with cutting-edge tools, guaranteed support, and proven mentorship.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-4 rounded-2xl"
                  onClick={() => document.getElementById('ai-technology')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <Bot className="w-5 h-5 mr-2" />
                  Discover AI Technology
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 text-lg px-8 py-4 rounded-2xl backdrop-blur-sm"
                  onClick={() => window.location.href = 'tel:407-777-1087'}
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Speak with Nolly
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* AI Technology Showcase */}
      <section id="ai-technology" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div className="text-center mb-16" {...fadeInUp}>
              <Badge className="mb-4 bg-blue-100 text-blue-800 px-6 py-2">
                <Bot className="w-4 h-4 mr-2" />
                Revolutionary Technology
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Your Personal AI-Powered Team
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Every Santiago Team member gets access to cutting-edge AI technology that automates 
                routine tasks, enhances client interactions, and dramatically improves success rates.
              </p>
            </motion.div>

            <Tabs value={activeFeature} onValueChange={setActiveFeature} className="w-full">
              <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 h-auto p-2 bg-gray-100">
                {aiFeatures.map((feature) => (
                  <TabsTrigger 
                    key={feature.id}
                    value={feature.id} 
                    className="flex flex-col items-center gap-2 py-4 px-2 data-[state=active]:bg-white data-[state=active]:shadow-md"
                  >
                    <div className={`p-2 rounded-lg bg-gradient-to-r ${feature.color} text-white`}>
                      {feature.icon}
                    </div>
                    <span className="text-xs md:text-sm font-medium text-center">{feature.title}</span>
                  </TabsTrigger>
                ))}
              </TabsList>

              {aiFeatures.map((feature) => (
                <TabsContent key={feature.id} value={feature.id} className="mt-8">
                  <Card className="border-0 shadow-xl">
                    <CardHeader className={`bg-gradient-to-r ${feature.color} text-white`}>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-2xl flex items-center gap-3">
                            {feature.icon}
                            {feature.title}
                          </CardTitle>
                          <p className="text-white/90 mt-2">{feature.description}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-3xl font-bold">{feature.stats.metric}</div>
                          <div className="text-sm text-white/80">{feature.stats.label}</div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-8">
                      <div className="grid md:grid-cols-2 gap-8">
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900 mb-4">Key Benefits:</h4>
                          <ul className="space-y-3">
                            {feature.benefits.map((benefit, index) => (
                              <li key={index} className="flex items-center gap-3">
                                <CheckCircle className="h-5 w-5 text-green-600" />
                                <span className="text-gray-700">{benefit}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="bg-gray-50 p-6 rounded-lg">
                          <h4 className="text-lg font-semibold text-gray-900 mb-4">How It Works:</h4>
                          <div className="space-y-4">
                            <div className="flex items-start gap-3">
                              <div className="bg-blue-100 text-blue-600 rounded-full p-1">
                                <Zap className="h-4 w-4" />
                              </div>
                              <div>
                                <div className="font-medium text-gray-900">Automatic Activation</div>
                                <div className="text-sm text-gray-600">System activates instantly when leads enter your pipeline</div>
                              </div>
                            </div>
                            <div className="flex items-start gap-3">
                              <div className="bg-green-100 text-green-600 rounded-full p-1">
                                <Brain className="h-4 w-4" />
                              </div>
                              <div>
                                <div className="font-medium text-gray-900">Intelligent Processing</div>
                                <div className="text-sm text-gray-600">AI analyzes and personalizes each interaction</div>
                              </div>
                            </div>
                            <div className="flex items-start gap-3">
                              <div className="bg-purple-100 text-purple-600 rounded-full p-1">
                                <Target className="h-4 w-4" />
                              </div>
                              <div>
                                <div className="font-medium text-gray-900">Optimized Results</div>
                                <div className="text-sm text-gray-600">Continuous learning improves performance over time</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </div>
      </section>

      {/* Tutorial Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div className="text-center mb-16" {...fadeInUp}>
              <Badge className="mb-4 bg-purple-100 text-purple-800 px-6 py-2">
                <PlayCircle className="w-4 h-4 mr-2" />
                Complete Training Program
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                AI Mastery Tutorial Program
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our comprehensive 6-week program ensures you master every aspect of our AI technology, 
                from basic setup to advanced optimization strategies.
              </p>
            </motion.div>

            <div className="grid gap-8">
              {tutorialSteps.map((step, index) => (
                <motion.div
                  key={step.step}
                  {...fadeInUp}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
                    <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="bg-white/20 rounded-full p-3">
                            <span className="text-2xl font-bold">{step.step}</span>
                          </div>
                          <div>
                            <CardTitle className="text-xl">{step.title}</CardTitle>
                            <p className="text-blue-100">{step.duration}</p>
                          </div>
                        </div>
                        <ChevronRight className="h-6 w-6" />
                      </div>
                    </CardHeader>
                    <CardContent className="p-6">
                      <p className="text-gray-700 text-lg mb-6">{step.description}</p>
                      <div className="grid md:grid-cols-2 gap-4">
                        {step.details.map((detail, detailIndex) => (
                          <div key={detailIndex} className="flex items-center gap-3">
                            <Star className="h-4 w-4 text-yellow-500" />
                            <span className="text-gray-600">{detail}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Benefits */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div className="text-center mb-16" {...fadeInUp}>
              <Badge className="mb-4 bg-green-100 text-green-800 px-6 py-2">
                <Trophy className="w-4 h-4 mr-2" />
                Exclusive Benefits
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Why Santiago Team is Different
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Join a team that invests in your success with technology, training, and guaranteed support 
                that you won't find anywhere else in the WFG network.
              </p>
            </motion.div>

            <motion.div 
              className="grid grid-cols-1 lg:grid-cols-2 gap-8"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              {teamBenefits.map((benefit, index) => (
                <motion.div key={index} variants={fadeInUp}>
                  <Card className="h-full border-2 hover:shadow-xl transition-all duration-300">
                    <CardHeader className={`bg-gradient-to-r ${benefit.gradient} text-white`}>
                      <div className="flex items-center gap-4">
                        <div className="bg-white/20 rounded-lg p-3">
                          {benefit.icon}
                        </div>
                        <div>
                          <CardTitle className="text-xl">{benefit.title}</CardTitle>
                          <p className="text-white/90">{benefit.subtitle}</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-6">
                      <p className="text-gray-700 mb-6">{benefit.description}</p>
                      <div className="space-y-3">
                        {benefit.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center gap-3">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <span className="text-gray-600">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Success Metrics */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div className="text-center mb-16" {...fadeInUp}>
              <Badge className="mb-4 bg-white/20 text-white px-6 py-2">
                <BarChart3 className="w-4 h-4 mr-2" />
                Proven Results
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Our Numbers Speak for Themselves
              </h2>
              <p className="text-xl opacity-90 max-w-3xl mx-auto">
                Real results from Santiago Team members using our AI technology and proven systems.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {successMetrics.map((metric, index) => (
                <motion.div
                  key={index}
                  {...fadeInUp}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-center">
                    <CardContent className="p-6">
                      <div className="text-4xl font-bold text-yellow-300 mb-2">{metric.value}</div>
                      <div className="text-lg font-semibold mb-2">{metric.label}</div>
                      <div className="text-sm text-white/80">{metric.description}</div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Leadership */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div className="text-center mb-16" {...fadeInUp}>
              <Badge className="mb-4 bg-blue-100 text-blue-800 px-6 py-2">
                <Users className="w-4 h-4 mr-2" />
                Meet Your Leaders
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Learn from Multi-Generational Success
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Join a family team where each member brings unique expertise and proven results 
                to help you achieve your financial goals.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Pablo & Nolly */}
              <Card className="overflow-hidden hover:shadow-xl transition-shadow">
                <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                  <CardTitle className="text-center text-xl">Leadership Team</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center">
                      <img 
                        src={pabloImage} 
                        alt="Pablo Santiago" 
                        className="w-24 h-24 mx-auto rounded-full object-cover mb-3 border-4 border-blue-200"
                      />
                      <h4 className="font-bold text-gray-900">Pablo Santiago</h4>
                      <p className="text-sm text-blue-600 mb-2">Financial Protection Advocate</p>
                      <p className="text-xs text-gray-600">34 years law enforcement</p>
                    </div>
                    <div className="text-center">
                      <img 
                        src={nollyImage} 
                        alt="Nolly Santiago" 
                        className="w-24 h-24 mx-auto rounded-full object-cover mb-3 border-4 border-purple-200"
                      />
                      <h4 className="font-bold text-gray-900">Nolly Santiago</h4>
                      <p className="text-sm text-purple-600 mb-2">Professional Financial Advisor</p>
                      <p className="text-xs text-gray-600">20+ years telecommunications</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Joseph & Christian */}
              <Card className="overflow-hidden hover:shadow-xl transition-shadow">
                <CardHeader className="bg-gradient-to-r from-green-600 to-orange-600 text-white">
                  <CardTitle className="text-center text-xl">Next Generation</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center">
                      <img 
                        src={josephImage} 
                        alt="Joseph Santiago" 
                        className="w-24 h-24 mx-auto rounded-full object-cover mb-3 border-4 border-green-200"
                      />
                      <h4 className="font-bold text-gray-900">Joseph Santiago</h4>
                      <p className="text-sm text-green-600 mb-2">Investment Licensed</p>
                      <p className="text-xs text-gray-600">Entrepreneurial focus</p>
                    </div>
                    <div className="text-center">
                      <img 
                        src={christianImage} 
                        alt="Christian Santiago" 
                        className="w-24 h-24 mx-auto rounded-full object-cover mb-3 border-4 border-orange-200"
                      />
                      <h4 className="font-bold text-gray-900">Christian Santiago</h4>
                      <p className="text-sm text-orange-600 mb-2">Mathematics Expert</p>
                      <p className="text-xs text-gray-600">Youth education specialist</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Team Members - Non-Family */}
              <Card className="overflow-hidden hover:shadow-xl transition-shadow">
                <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                  <CardTitle className="text-center text-xl">Team Members</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="text-center">
                    <img 
                      src={princhescaPhoto} 
                      alt="Princhesca Rainier Turner" 
                      className="w-32 h-32 mx-auto rounded-full object-cover mb-4 border-4 border-purple-200"
                    />
                    <h4 className="font-bold text-gray-900 text-lg">Princhesca Rainier Turner</h4>
                    <p className="text-sm text-purple-600 mb-2">Senior Marketing Associate & Business Development</p>
                    <p className="text-xs text-gray-600 mb-4">Strategic business development expert with extensive experience in client relationship management and business strategy</p>
                    
                    <div className="flex flex-wrap gap-2 justify-center">
                      <Badge variant="outline" className="text-xs bg-purple-50 text-purple-600 border-purple-200">Business Strategy</Badge>
                      <Badge variant="outline" className="text-xs bg-purple-50 text-purple-600 border-purple-200">Client Relations</Badge>
                      <Badge variant="outline" className="text-xs bg-purple-50 text-purple-600 border-purple-200">Financial Planning</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-blue-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div {...fadeInUp}>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Transform Your Career?
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Join the Santiago Team today and become part of the future of financial services. 
                Limited positions available for our exclusive AI-powered program.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-lg px-8 py-4 rounded-2xl"
                  onClick={() => window.location.href = 'tel:407-777-1087'}
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Schedule Your Interview
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 text-lg px-8 py-4 rounded-2xl backdrop-blur-sm"
                  onClick={() => window.location.href = '/empower360'}
                >
                  <Lightbulb className="w-5 h-5 mr-2" />
                  Learn More About Our System
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}