import { motion } from 'framer-motion';
import { Sparkles, Brain, Mic, TrendingDown, Zap, Chrome } from 'lucide-react';
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
        {/* Hero Section */}
        <motion.section 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative py-24 overflow-hidden bg-primary"
        >
          <div className="absolute inset-0">
            <div className="absolute top-20 left-10 w-4 h-4 bg-white/20 rounded-full animate-pulse"></div>
            <div className="absolute top-40 right-20 w-2 h-2 bg-white/30 rounded-full animate-bounce delay-1000"></div>
            <div className="absolute bottom-20 left-20 w-3 h-3 bg-white/25 rounded-full animate-pulse delay-500"></div>
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              {...fadeInUp}
              className="mb-6"
            >
              <Badge className="bg-white/20 text-white border-white/30 text-lg px-6 py-2 backdrop-blur-sm">
                <Brain className="w-4 h-4 mr-2" />
                Custom AI Innovation
              </Badge>
            </motion.div>
            
            <motion.h1 
              {...fadeInUp}
              className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight"
            >
              Santiago Team
              <span className="block text-white">
                AI Assistant
              </span>
            </motion.h1>
            
            <motion.p 
              {...fadeInUp}
              transition={{ delay: 0.2 }}
              className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto mb-12 leading-relaxed"
            >
              Revolutionary voice-powered automation system built with Google Gemini AI and ElevenLabs.
              Replacing expensive third-party services with custom solutions.
            </motion.p>

            {/* Cost Savings Highlight */}
            <motion.div
              {...fadeInUp}
              transition={{ delay: 0.4 }}
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 max-w-2xl mx-auto"
            >
              <div className="flex items-center justify-center mb-4">
                <TrendingDown className="w-8 h-8 text-white mr-3" />
                <span className="text-3xl font-bold text-white">90% Cost Reduction</span>
              </div>
              <div className="grid grid-cols-2 gap-6 text-center">
                <div className="text-white/90">
                  <div className="text-2xl font-bold line-through">$1,021/mo</div>
                  <div className="text-sm">Previous AI Hub</div>
                </div>
                <div className="text-white">
                  <div className="text-2xl font-bold">~$100/mo</div>
                  <div className="text-sm">Custom Solution</div>
                </div>
              </div>
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
                Experience the future of automation with voice commands. Built specifically for 
                Rob's Google Startup Program showcase - demonstrating cost-effective AI innovation.
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
                Google Startup Program Tech Stack
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Built with cutting-edge Google AI technology and cost-effective integrations.
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
              Ready for Google Startup Demo?
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-12">
              This voice-powered AI system showcases innovative cost reduction strategies 
              and advanced automation capabilities perfect for startup program presentations.
            </p>

            <div className="grid md:grid-cols-3 gap-8 text-white">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                <div className="text-3xl font-bold mb-2">90%</div>
                <div className="text-white/90">Cost Reduction</div>
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