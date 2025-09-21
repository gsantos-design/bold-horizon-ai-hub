import { motion } from 'framer-motion';
import { Sparkles, Brain, Mic, TrendingDown, Zap, Chrome, Award, Globe, TrendingUp, Bot, Database } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import VoiceInterface from '@/components/VoiceInterface';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'wouter';

export default function CustomAI() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="pt-20 pb-16">
        {/* Hero Section - Enhanced with Bold Horizons visuals */}
        <motion.section 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative py-32 overflow-hidden bg-gradient-to-br from-navy-900 via-blue-900 to-indigo-900"
          style={{ background: "linear-gradient(135deg, #1e3a8a 0%, #1e40af 35%, #312e81 100%)" }}
        >
          {/* Clean professional background */}
          <div className="absolute inset-0">
            {/* Simple professional gradient overlay - Navy & Gold */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-800/10 via-transparent to-yellow-600/5"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-900/5 to-transparent"></div>
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              {...fadeInUp}
              className="mb-8"
            >
              <div
                className="inline-flex items-center bg-white/10 backdrop-blur-lg border text-white text-xl px-8 py-4 rounded-full shadow-xl"
                style={{ borderColor: 'rgba(217, 119, 6, 0.3)' }}
              >
                <div
                  className="mr-3"
                  style={{ color: '#D97706' }}
                >
                  <Brain className="w-6 h-6" />
                </div>
                <span className="font-semibold tracking-wide">Santiago Team Excellence</span>
                <div className="ml-3 w-2 h-2 rounded-full" style={{ backgroundColor: '#D97706' }}></div>
              </div>
            </motion.div>
            
            <h1 className="text-6xl md:text-8xl font-bold text-white mb-12 leading-tight">
              <span className="inline-block">
                <span 
                  className="bg-clip-text text-transparent"
                  style={{ 
                    background: "linear-gradient(45deg, #D97706 0%, #B45309 50%, #F59E0B 100%)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text"
                  }}
                >
                  Santiago Team
                </span>
              </span>
              <span className="block mt-4">
                <span className="relative">
                  AI Assistant
                </span>
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto mb-12 leading-relaxed">
              Bold Horizons: Revolutionary AI automation system built by the Santiago Team.
              Transforming financial services through innovative technology and family values.
            </p>

            {/* Cost Savings Highlight - Enhanced */}
            <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-10 max-w-3xl mx-auto shadow-2xl">
              {/* Glassmorphism effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 rounded-3xl"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-blue-500/10 to-transparent rounded-3xl"></div>
              
              <div className="relative z-10">
                <div className="flex items-center justify-center mb-6">
                  <div
                    style={{ color: '#D97706' }}
                  >
                    <TrendingDown className="w-10 h-10 mr-4" />
                  </div>
                  <span className="text-4xl font-bold bg-clip-text text-transparent" 
                        style={{ 
                          background: "linear-gradient(45deg, #D97706 0%, #F59E0B 100%)",
                          WebkitBackgroundClip: "text",
                          backgroundClip: "text"
                        }}>
                    90% Cost Reduction
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-8 text-center">
                  <motion.div 
                    className="relative p-6 backdrop-blur-sm rounded-2xl border"
                    style={{ 
                      backgroundColor: 'rgba(30, 58, 138, 0.15)',
                      borderColor: 'rgba(30, 58, 138, 0.3)'
                    }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="text-3xl font-bold text-white/80 line-through mb-2">$1,021/mo</div>
                    <div className="text-white/70 text-lg">Previous AI Hub</div>
                    <div className="absolute top-2 right-2">
                      <motion.div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: '#1e3a8a' }}
                        animate={{ opacity: [1, 0.4, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="relative p-6 backdrop-blur-sm rounded-2xl border"
                    style={{ 
                      backgroundColor: 'rgba(217, 119, 6, 0.15)',
                      borderColor: 'rgba(217, 119, 6, 0.3)'
                    }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="text-3xl font-bold mb-2" style={{ color: '#F59E0B' }}>~$100/mo</div>
                    <div className="text-white/80 text-lg">Bold Horizons Solution</div>
                    <div className="absolute top-2 right-2">
                      <motion.div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: '#D97706' }}
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                    </div>
                  </motion.div>
                </div>
                
                {/* Savings calculation */}
                <div className="mt-6 text-center text-white/90">
                  <span className="text-xl font-semibold">
                    Annual Savings: <span style={{ color: '#F59E0B' }}>$11,052</span>
                  </span>
                </div>
                
                {/* WFG Compliance Disclaimer */}
                <div className="mt-4 p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg" data-testid="cost-savings-disclaimer">
                  <p className="text-xs text-white/80 leading-relaxed">
                    <strong>WFG Compliance:</strong> Figures are illustrative projections only. No guarantees of results. 
                    Individual outcomes may vary significantly. Not an offer or solicitation. Subject to WFG approval.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* WFG Corporate Impact Section */}
        <section className="py-20 bg-gradient-to-br from-blue-900 to-blue-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="mb-6">
                <Badge className="bg-white/20 text-white text-lg px-6 py-3">
                  <Award className="w-4 h-4 mr-2" />
                  Santiago Team Impact
                </Badge>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Bold Horizons Impact Metrics
              </h2>
              <p className="text-xl text-white/90 max-w-3xl mx-auto mb-6">
                Demonstrating how the Santiago Team's Bold Horizons platform enhances insurance, IUL, and 401K sales
                to protect families and build generational wealth across WFG chapters nationwide.
              </p>
              
              {/* WFG Compliance Disclaimer for Impact Metrics */}
              <div className="max-w-4xl mx-auto p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg" data-testid="impact-metrics-disclaimer">
                <p className="text-sm text-white/90 leading-relaxed text-center">
                  <strong>⚠️ WFG Compliance Notice:</strong> All performance metrics shown are illustrative projections based on Santiago Team pilot data. 
                  No guarantees of results are made. Individual results may vary significantly. Not an offer or solicitation. 
                  Subject to World Financial Group compliance review and approval.
                </p>
              </div>
            </div>

            <div className="grid lg:grid-cols-4 gap-8">
              {/* Total Chapters Impact */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center" data-testid="metric-wfg-chapters">
                <div className="text-5xl font-bold text-white mb-3">2,500+</div>
                <div className="text-white/80 text-lg mb-2">WFG Chapters</div>
                <div className="text-sm text-white/60">Nationwide Deployment</div>
              </div>

              {/* Annual Savings */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center" data-testid="metric-annual-savings">
                <div className="text-5xl font-bold text-green-400 mb-3">$2.3M</div>
                <div className="text-white/80 text-lg mb-2">Annual Savings</div>
                <div className="text-sm text-white/60">Per Year Corporate-Wide</div>
              </div>

              {/* Conversion Increase */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center" data-testid="metric-conversion-rate">
                <div className="text-5xl font-bold text-yellow-400 mb-3">+35%</div>
                <div className="text-white/80 text-lg mb-2">Lead Conversion</div>
                <div className="text-sm text-white/60">AI-Powered Enhancement</div>
              </div>

              {/* ROI Metric */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center" data-testid="metric-roi-return">
                <div className="text-5xl font-bold text-orange-400 mb-3">2,300%</div>
                <div className="text-white/80 text-lg mb-2">ROI Return</div>
                <div className="text-sm text-white/60">First Year Implementation</div>
              </div>
            </div>

            {/* Additional Corporate Benefits */}
            <div className="mt-16 grid md:grid-cols-3 gap-8">
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Chrome className="w-5 h-5 mr-2" />
                    Google Analytics Integration
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-white/90">
                    <div className="text-3xl font-bold text-blue-300 mb-2">Real-Time</div>
                    <p className="text-white/80 mb-4">Google Analytics 4 integration for comprehensive lead tracking, conversion analysis, and ROI measurement.</p>
                    <div className="flex gap-2">
                      <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">GA4</Badge>
                      <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">Lead Tracking</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Database className="w-5 h-5 mr-2" />
                    Firebase Operations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-white/90">
                    <div className="text-3xl font-bold text-orange-300 mb-2">Scalable</div>
                    <p className="text-white/80 mb-4">Firebase real-time database sync, authentication-ready infrastructure, and event streaming for enterprise deployment.</p>
                    <div className="flex gap-2">
                      <Badge className="bg-orange-500/20 text-orange-300 border-orange-500/30">Firebase</Badge>
                      <Badge className="bg-orange-500/20 text-orange-300 border-orange-500/30">Real-time Sync</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Bot className="w-5 h-5 mr-2" />
                    Gemini AI Automation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-white/90">
                    <div className="text-3xl font-bold text-green-300 mb-2">Automated</div>
                    <p className="text-white/80 mb-4">Google Gemini AI for intelligent lead qualification, personalized outreach, and automated follow-up sequences.</p>
                    <div className="flex gap-2">
                      <Badge className="bg-green-500/20 text-green-300 border-green-500/30">Gemini AI</Badge>
                      <Badge className="bg-green-500/20 text-green-300 border-green-500/30">Lead Gen</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* AI Agents Section */}
        <motion.section 
          {...fadeInUp}
          className="py-20 bg-white"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="mb-6 space-y-3">
                <Badge className="bg-primary/10 text-primary text-lg px-6 py-3">
                  <Bot className="w-4 h-4 mr-2" />
                  Santiago Team Sales Agent Hub
                </Badge>
                <div className="flex justify-center">
                  <Badge className="bg-green-100 text-green-800 px-4 py-2">
                    Bilingual Engagement (English/Spanish) • Powered by Google
                  </Badge>
                </div>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Intelligent Lead Generation
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Santiago Team's powerful sales agent hub with AI automation for lead generation, 
                bilingual customer engagement, and WFG chapter management nationwide.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {/* Google Analytics Integration */}
              <div>
                <Card className="h-full border-primary/20" data-testid="card-google-analytics">
                  <CardHeader className="text-center pb-4">
                    <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                      <Chrome className="w-8 h-8 text-blue-600" />
                    </div>
                    <CardTitle className="text-2xl text-gray-900">Google Analytics 4</CardTitle>
                    <CardDescription className="text-lg text-gray-600">
                      Advanced lead tracking and conversion analytics
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-2">Automation Features:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Real-time lead conversion tracking</li>
                        <li>• Automated ROI measurement</li>
                        <li>• WFG chapter performance analytics</li>
                        <li>• Customer journey mapping</li>
                      </ul>
                    </div>
                    <div className="flex items-center justify-between">
                      <Badge className="bg-blue-100 text-blue-800">Google Suite</Badge>
                      <Badge className="bg-green-100 text-green-800">Real-time</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Firebase & Gemini AI */}
              <div>
                <Card className="h-full border-primary/20" data-testid="card-firebase-gemini">
                  <CardHeader className="text-center pb-4">
                    <div className="w-16 h-16 mx-auto mb-4 bg-yellow-100 rounded-full flex items-center justify-center">
                      <Bot className="w-8 h-8 text-yellow-600" />
                    </div>
                    <CardTitle className="text-2xl text-gray-900">Firebase + Gemini AI</CardTitle>
                    <CardDescription className="text-lg text-gray-600">
                      Intelligent lead automation and customer engagement
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-2">AI Automation:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Automated lead qualification (Gemini AI)</li>
                        <li>• Bilingual customer outreach sequences</li>
                        <li>• Real-time Firebase data sync</li>
                        <li>• Smart follow-up scheduling</li>
                      </ul>
                    </div>
                    <div className="flex items-center justify-between">
                      <Badge className="bg-yellow-100 text-yellow-800">AI-Powered</Badge>
                      <Badge className="bg-green-100 text-green-800">Automated</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Business Impact Section */}
            <div className="mt-16 text-center">
              <Card className="max-w-5xl mx-auto bg-gray-50 border-primary/20">
                <CardHeader>
                  <CardTitle className="text-2xl text-gray-900">Sales Agent Hub Impact</CardTitle>
                  <CardDescription>
                    Powerful automation platform for Santiago Team's nationwide WFG chapter expansion
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6 mb-6">
                    <div className="text-center p-4 bg-white rounded-lg">
                      <h4 className="font-semibold text-gray-900">Target Market</h4>
                      <p className="text-2xl font-bold text-blue-600">2,500+ Chapters</p>
                      <p className="text-sm text-gray-600">WFG nationwide coverage</p>
                    </div>
                    <div className="text-center p-4 bg-white rounded-lg">
                      <h4 className="font-semibold text-gray-900">Service Enhancement</h4>
                      <p className="text-2xl font-bold text-yellow-600">24/7 Coverage</p>
                      <p className="text-sm text-gray-600">Bilingual client support</p>
                    </div>
                    <div className="text-center p-4 bg-white rounded-lg">
                      <h4 className="font-semibold text-gray-900">Focus Areas</h4>
                      <p className="text-lg font-bold text-green-600">Insurance • IUL • 401K</p>
                      <p className="text-sm text-gray-600">Core WFG product lines</p>
                    </div>
                  </div>
                  <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg" data-testid="compliance-disclaimer">
                    <p className="text-sm text-gray-700 font-semibold mb-2">⚠️ WFG Compliance Disclaimer</p>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      All performance figures are illustrative projections based on Santiago Team pilot program data. No guarantees of results are made. 
                      Individual results may vary significantly. Subject to World Financial Group compliance review and approval. 
                      This platform is currently in beta testing phase for potential WFG chapter deployment.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Agent Selection Interface */}
            <div className="mt-12 text-center">
              <Card className="max-w-4xl mx-auto bg-gray-50 border-primary/20">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-900">Start a Consultation</CardTitle>
                  <CardDescription>
                    Choose your preferred language and connect with a Santiago Team AI specialist
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link 
                    href="/ai-career-mentor?lang=en"
                    className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg rounded-md transition-colors"
                    data-testid="link-start-mentor-en"
                  >
                    <Globe className="w-5 h-5 mr-2" />
                    Start English Mentor
                  </Link>
                  <Link 
                    href="/ai-career-mentor?lang=es"
                    className="inline-flex items-center justify-center bg-yellow-600 hover:bg-yellow-700 text-white px-8 py-3 text-lg rounded-md transition-colors"
                    data-testid="link-start-mentor-es"
                  >
                    <Globe className="w-5 h-5 mr-2" />
                    Iniciar Mentor en Español
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.section>

        {/* Voice Interface Section */}
        <motion.section 
          {...fadeInUp}
          className="py-20 bg-gray-50"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mb-6"
              >
                <Badge className="bg-primary/10 text-primary text-lg px-6 py-3">
                  <Mic className="w-4 h-4 mr-2" />
                  Voice-Powered AI
                </Badge>
              </motion.div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Speak to Your AI Assistant
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Experience the future of automation with voice commands. Built by the Santiago Team 
                to demonstrate innovative AI solutions that protect families and build generational wealth.
              </p>
            </div>

            {/* Voice Interface Component */}
            <div className="flex justify-center mb-16">
              <VoiceInterface />
            </div>

            {/* Browser Support Notice */}
            <motion.div
              {...fadeInUp}
              transition={{ delay: 0.6 }}
              className="max-w-2xl mx-auto bg-blue-50 border border-blue-200 rounded-xl p-6"
            >
              <div className="flex items-center mb-3">
                <Chrome className="w-5 h-5 text-blue-600 mr-2" />
                <span className="font-semibold text-blue-900">Browser Compatibility</span>
              </div>
              <p className="text-blue-800 text-sm">
                For optimal voice recognition, use Chrome, Edge, or Safari. This system provides 
                much better microphone performance than Windows built-in voice recognition.
              </p>
            </motion.div>
          </div>
        </motion.section>

        {/* Technology Stack Section */}
        <motion.section 
          {...fadeInUp}
          className="py-20 bg-white"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Bold Horizons Technology Stack
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Built with cutting-edge AI technology by the Santiago Team for maximum impact and cost-effectiveness.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: Brain,
                  title: "Advanced AI Engine",
                  description: "Advanced multimodal AI for intelligent voice command processing and automated responses.",
                  highlight: "Latest AI Model"
                },
                {
                  icon: Mic,
                  title: "Google AI Voice Processing",
                  description: "High-quality text-to-speech with natural voice cloning capabilities.",
                  highlight: "Premium Audio"
                },
                {
                  icon: Zap,
                  title: "Custom Orchestration",
                  description: "Purpose-built automation system replacing expensive third-party AI hubs.",
                  highlight: "Cost-Effective"
                },
                {
                  icon: Sparkles,
                  title: "Real-Time Processing",
                  description: "Instant voice command recognition with intelligent intent analysis.",
                  highlight: "Lightning Fast"
                },
                {
                  icon: Chrome,
                  title: "Browser-Based Audio",
                  description: "Superior microphone access through modern web audio APIs.",
                  highlight: "No Downloads"
                },
                {
                  icon: TrendingDown,
                  title: "90% Cost Savings",
                  description: "From $1,021/month AI hub to ~$100/month custom solution.",
                  highlight: "ROI Focused"
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-xl transition-all duration-300 border-primary/20">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                          <feature.icon className="w-6 h-6 text-white" />
                        </div>
                        <Badge className="bg-primary/10 text-primary text-xs">
                          {feature.highlight}
                        </Badge>
                      </div>
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-gray-600 leading-relaxed">
                        {feature.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Demo Showcase Section */}
        <motion.section 
          {...fadeInUp}
          className="py-20 bg-primary"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready for the Santiago Demo?
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-12">
              This Bold Horizons AI system demonstrates how the Santiago Team's innovation 
              can transform insurance, IUL, and 401K sales nationwide with proven results and family values.
            </p>

            <div className="grid md:grid-cols-4 gap-8 text-white">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                <div className="text-3xl font-bold mb-2">90%</div>
                <div className="text-white/90">Cost Reduction</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                <div className="text-3xl font-bold mb-2">$2.3M</div>
                <div className="text-white/90">Annual Savings</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                <div className="text-3xl font-bold mb-2">2,500+</div>
                <div className="text-white/90">WFG Chapters</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                <div className="text-3xl font-bold mb-2">5+</div>
                <div className="text-white/90">AI Technologies</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                <div className="text-3xl font-bold mb-2">Real-Time</div>
                <div className="text-white/90">Voice Processing</div>
              </div>
            </div>
          </div>
        </motion.section>
      </main>

      <Footer />
    </div>
  );
}