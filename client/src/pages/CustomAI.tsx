import { motion } from 'framer-motion';
import { Sparkles, Brain, Mic, TrendingDown, Zap, Chrome, Award, Globe, TrendingUp } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import VoiceInterface from '@/components/VoiceInterface';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

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
        {/* Hero Section - Enhanced with Google-style visuals */}
        <motion.section 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative py-32 overflow-hidden bg-gradient-to-br from-navy-900 via-blue-900 to-indigo-900"
          style={{ background: "linear-gradient(135deg, #1e3a8a 0%, #1e40af 35%, #312e81 100%)" }}
        >
          {/* Advanced animated background */}
          <div className="absolute inset-0">
            {/* Floating neural network nodes - Navy & Gold Theme */}
            <div className="absolute top-20 left-16 w-6 h-6 rounded-full backdrop-blur-sm border border-yellow-500/30" style={{ backgroundColor: 'rgba(251, 191, 36, 0.2)' }}>
              <motion.div 
                className="w-full h-full rounded-full"
                style={{ backgroundColor: '#D97706' }}
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.4, 0.9, 0.4]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </div>
            <div className="absolute top-40 right-24 w-4 h-4 rounded-full backdrop-blur-sm border border-blue-300/30" style={{ backgroundColor: 'rgba(30, 58, 138, 0.3)' }}>
              <motion.div 
                className="w-full h-full rounded-full"
                style={{ backgroundColor: '#1e3a8a' }}
                animate={{ 
                  scale: [1, 1.3, 1],
                  opacity: [0.4, 0.9, 0.4]
                }}
                transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
              />
            </div>
            <div className="absolute bottom-32 left-32 w-5 h-5 rounded-full backdrop-blur-sm border border-yellow-400/30" style={{ backgroundColor: 'rgba(217, 119, 6, 0.25)' }}>
              <motion.div 
                className="w-full h-full rounded-full"
                style={{ backgroundColor: '#B45309' }}
                animate={{ 
                  scale: [1, 1.1, 1],
                  opacity: [0.5, 0.8, 0.5]
                }}
                transition={{ duration: 4, repeat: Infinity, delay: 1 }}
              />
            </div>
            <div className="absolute top-32 right-16 w-3 h-3 rounded-full backdrop-blur-sm border border-yellow-500/40" style={{ backgroundColor: 'rgba(245, 158, 11, 0.3)' }}>
              <motion.div 
                className="w-full h-full rounded-full"
                style={{ backgroundColor: '#F59E0B' }}
                animate={{ 
                  scale: [1, 1.4, 1],
                  opacity: [0.6, 1, 0.6]
                }}
                transition={{ duration: 3.5, repeat: Infinity, delay: 1.5 }}
              />
            </div>
            
            {/* Connecting lines animation */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <motion.path
                d="M 100 120 Q 300 200 500 160"
                stroke="url(#gradient1)"
                strokeWidth="2"
                fill="none"
                opacity="0.4"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              <motion.path
                d="M 200 300 Q 400 250 600 280"
                stroke="url(#gradient2)"
                strokeWidth="2"
                fill="none"
                opacity="0.3"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
              />
              <defs>
                <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#1e3a8a" stopOpacity="0.7" />
                  <stop offset="100%" stopColor="#D97706" stopOpacity="0.4" />
                </linearGradient>
                <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#B45309" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#1e40af" stopOpacity="0.3" />
                </linearGradient>
              </defs>
            </svg>

            {/* Mesh gradient overlay - Navy & Gold */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-800/15 via-transparent to-yellow-600/10"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-900/8 to-transparent"></div>
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              {...fadeInUp}
              className="mb-8"
            >
              <motion.div
                className="inline-flex items-center bg-white/10 backdrop-blur-lg border text-white text-xl px-8 py-4 rounded-full shadow-2xl"
                style={{ borderColor: 'rgba(217, 119, 6, 0.3)' }}
                whileHover={{ scale: 1.05, y: -2 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  className="mr-3"
                  style={{ color: '#D97706' }}
                >
                  <Brain className="w-6 h-6" />
                </motion.div>
                <span className="font-semibold tracking-wide">Santiago Team Excellence</span>
                <div className="ml-3 w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: '#D97706' }}></div>
              </motion.div>
            </motion.div>
            
            <motion.h1 
              {...fadeInUp}
              className="text-6xl md:text-8xl font-bold text-white mb-12 leading-tight"
            >
              <span className="inline-block">
                <motion.span 
                  className="bg-clip-text text-transparent"
                  style={{ 
                    background: "linear-gradient(45deg, #D97706 0%, #B45309 50%, #F59E0B 100%)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text"
                  }}
                >
                  Santiago Team
                </motion.span>
              </span>
              <span className="block mt-4">
                <motion.span
                  className="relative"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  AI Assistant
                  <motion.div
                    className="absolute -inset-1 rounded-lg blur opacity-30"
                    style={{ background: "linear-gradient(45deg, #1e3a8a, #D97706)" }}
                    animate={{ 
                      scale: [1, 1.05, 1],
                      opacity: [0.3, 0.5, 0.3]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                </motion.span>
              </span>
            </motion.h1>
            
            <motion.p 
              {...fadeInUp}
              transition={{ delay: 0.2 }}
              className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto mb-12 leading-relaxed"
            >
              Bold Horizons: Revolutionary AI automation system built by the Santiago Team.
              Transforming financial services through innovative technology and family values.
            </motion.p>

            {/* Cost Savings Highlight - Enhanced */}
            <motion.div
              {...fadeInUp}
              transition={{ delay: 0.4 }}
              className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-10 max-w-3xl mx-auto shadow-2xl"
              whileHover={{ y: -5, scale: 1.02 }}
            >
              {/* Glassmorphism effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 rounded-3xl"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-blue-500/10 to-transparent rounded-3xl"></div>
              
              <div className="relative z-10">
                <div className="flex items-center justify-center mb-6">
                  <motion.div
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    style={{ color: '#D97706' }}
                  >
                    <TrendingDown className="w-10 h-10 mr-4" />
                  </motion.div>
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
                
                {/* Savings calculation animation */}
                <motion.div
                  className="mt-6 text-center text-white/90"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                >
                  <span className="text-xl font-semibold">
                    Annual Savings: <span style={{ color: '#F59E0B' }}>$11,052</span>
                  </span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* WFG Corporate Impact Section */}
        <motion.section 
          {...fadeInUp}
          className="py-20 bg-gradient-to-br from-blue-900 to-blue-800"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mb-6"
              >
                <Badge className="bg-white/20 text-white text-lg px-6 py-3">
                  <Award className="w-4 h-4 mr-2" />
                  Santiago Team Impact
                </Badge>
              </motion.div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Bold Horizons Impact Metrics
              </h2>
              <p className="text-xl text-white/90 max-w-3xl mx-auto">
                Demonstrating how the Santiago Team's Bold Horizons platform can protect families 
                and build generational wealth across WFG chapters nationwide.
              </p>
            </div>

            <div className="grid lg:grid-cols-4 gap-8">
              {/* Total Chapters Impact */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center hover:bg-white/15 transition-all"
              >
                <div className="text-5xl font-bold text-white mb-3">2,500+</div>
                <div className="text-white/80 text-lg mb-2">WFG Chapters</div>
                <div className="text-sm text-white/60">Nationwide Deployment</div>
              </motion.div>

              {/* Annual Savings */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center hover:bg-white/15 transition-all"
              >
                <div className="text-5xl font-bold text-green-400 mb-3">$2.3M</div>
                <div className="text-white/80 text-lg mb-2">Annual Savings</div>
                <div className="text-sm text-white/60">Per Year Corporate-Wide</div>
              </motion.div>

              {/* Conversion Increase */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center hover:bg-white/15 transition-all"
              >
                <div className="text-5xl font-bold text-yellow-400 mb-3">+35%</div>
                <div className="text-white/80 text-lg mb-2">Lead Conversion</div>
                <div className="text-sm text-white/60">AI-Powered Enhancement</div>
              </motion.div>

              {/* ROI Metric */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center hover:bg-white/15 transition-all"
              >
                <div className="text-5xl font-bold text-orange-400 mb-3">2,300%</div>
                <div className="text-white/80 text-lg mb-2">ROI Return</div>
                <div className="text-sm text-white/60">First Year Implementation</div>
              </motion.div>
            </div>

            {/* Additional Corporate Benefits */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="mt-16 grid md:grid-cols-2 gap-8"
            >
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Globe className="w-5 h-5 mr-2" />
                    Bilingual Market Coverage
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-white/90">
                    <div className="text-3xl font-bold text-blue-300 mb-2">85%</div>
                    <p className="text-white/80 mb-4">Spanish-speaking market coverage with AI-powered translation and cultural adaptation.</p>
                    <div className="flex gap-2">
                      <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">Spanish AI</Badge>
                      <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">Cultural Terms</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2" />
                    Scalability Infrastructure
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-white/90">
                    <div className="text-3xl font-bold text-green-300 mb-2">Enterprise</div>
                    <p className="text-white/80 mb-4">Google Cloud infrastructure ensuring 99.9% uptime across all chapters with real-time analytics.</p>
                    <div className="flex gap-2">
                      <Badge className="bg-green-500/20 text-green-300 border-green-500/30">Google Cloud</Badge>
                      <Badge className="bg-green-500/20 text-green-300 border-green-500/30">Analytics</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
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
                  title: "Google Gemini 2.5 Pro",
                  description: "Advanced multimodal AI for intelligent voice command processing and automated responses.",
                  highlight: "Latest AI Model"
                },
                {
                  icon: Mic,
                  title: "ElevenLabs Voice Synthesis",
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
              can transform financial services nationwide with proven results and family values.
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