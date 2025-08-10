import Header from "@/components/Header";
import AgentProfile from "@/components/AgentProfile";
import FinancialIndependence from "@/components/FinancialIndependence";
import VideoSection from "@/components/VideoSection";
import Services from "@/components/Services";
import AppointmentForm from "@/components/AppointmentForm";
import BuildingEntrepreneurs from "@/components/BuildingEntrepreneurs";
import FAQ from "@/components/FAQ";
import OfficeInfo from "@/components/OfficeInfo";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, ArrowRight, Bot, MessageCircle, PlayCircle, HelpCircle } from "lucide-react";
import { Link } from "wouter";
import { HelpTooltip, TipTooltip, FeatureTooltip, AITooltip, SmartTooltip } from "@/components/ContextualTooltip";
import InteractiveTourGuide, { homePageTour, useTourGuide } from "@/components/InteractiveTourGuide";
import WFGCompliance from "@/components/WFGCompliance";
import DynamicTeamMissionHighlightReel from "@/components/DynamicTeamMissionHighlightReel";
import Footer from "@/components/Footer";
import FloatingHelpButton from "@/components/FloatingHelpButton";

export default function Home() {
  const { isActive, hasSeenTour, startTour, completeTour, skipTour } = useTourGuide('home-page');

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      
      {/* Interactive Tour Guide */}
      <InteractiveTourGuide 
        steps={homePageTour}
        isActive={isActive}
        onComplete={completeTour}
        onSkip={skipTour}
      />

      {/* Tour Trigger Button (always visible for demo) */}
      <div className="fixed bottom-4 left-4 z-30">
        <TipTooltip 
          content="Take a guided tour to discover all the powerful features available to grow your Santiago Team success!"
          title="🚀 Quick Start Tour"
        >
          <Button
            onClick={startTour}
            variant="outline"
            className="bg-white/90 backdrop-blur-sm border-blue-200 text-blue-600 hover:bg-blue-50 shadow-lg"
          >
            <PlayCircle className="h-5 w-5 mr-2" />
            Take Tour
          </Button>
        </TipTooltip>
      </div>
      
      {/* Empower360 Featured Section */}
      <section className="bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 py-12 hero-section">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto bg-white/95 backdrop-blur-sm border-0 shadow-2xl">
            <CardContent className="p-8 text-center">
              <FeatureTooltip 
                content="Discover our comprehensive philosophy system that combines financial education, multi-income strategies, and personal development into one transformative experience."
                title="✨ Empower360 Philosophy"
              >
                <Badge className="mb-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 cursor-help">
                  🌟 New Feature: Our Philosophy
                </Badge>
              </FeatureTooltip>
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
                Experience Empower360
              </h2>
              <p className="text-lg text-gray-700 mb-6 max-w-2xl mx-auto">
                Master the <strong>New Art of Living</strong> through our transformative philosophy: 
                Multi-Handed Income, Financial Education, and Self-Improvement
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <SmartTooltip 
                  content="Access comprehensive training on the Three Philosophies: Multi-Handed Income (create multiple revenue streams), Financial Rules (10% savings, 3 rules, 3 goals), and Self-Improvement (mindset mastery). Perfect for entrepreneurs and professionals seeking $100K-$250K additional income."
                  context="financial-planning"
                >
                  <Link href="/empower360">
                    <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white">
                      <Star className="h-5 w-5 mr-2" />
                      Explore Empower360
                      <ArrowRight className="h-5 w-5 ml-2" />
                    </Button>
                  </Link>
                </SmartTooltip>
                <HelpTooltip 
                  content="Speak directly with Nolly or Pablo Santiago to discuss your financial goals and explore opportunities with the Santiago Team. Average consultation leads to $150K+ additional annual income potential."
                  title="📞 Free Consultation"
                >
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="border-purple-600 text-purple-600 hover:bg-purple-50"
                    onClick={() => window.location.href = 'tel:407-777-1087'}
                  >
                    📞 Call Now: (407) 777-1087
                  </Button>
                </HelpTooltip>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* AI Career Mentor Featured Section */}
      <section className="bg-gradient-to-r from-emerald-50 via-blue-50 to-purple-50 py-12">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto bg-white/95 backdrop-blur-sm border-0 shadow-xl">
            <CardContent className="p-8 text-center">
              <AITooltip 
                content="Experience our revolutionary AI Career Mentor powered by GPT-4o with emotional intelligence. Get personalized guidance from Nolly Santiago, Pablo Santiago, and Santiago Team mentors - each with unique personalities and expertise tailored to your WFG journey."
                title="🤖 AI-Powered Career Guidance"
              >
                <Badge className="mb-4 bg-gradient-to-r from-emerald-600 to-purple-600 text-white px-4 py-2 cursor-help">
                  🤖 NEW: AI Career Mentor
                </Badge>
              </AITooltip>
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-600 to-purple-600 bg-clip-text text-transparent mb-4">
                AI Career Mentor with Emotional Intelligence
              </h2>
              <p className="text-lg text-gray-700 mb-6 max-w-2xl mx-auto">
                Get personalized career guidance powered by the Santiago Team's expertise. 
                Our AI mentor understands your emotions and provides tailored advice for your WFG journey.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <SmartTooltip 
                  content="Chat with AI mentors featuring the personalities and expertise of Nolly Santiago, Pablo Santiago, and the Santiago Team. Get personalized career advice, income strategies, and emotional support for your financial services journey."
                  context="ai-automation"
                >
                  <Link href="/ai-mentor">
                    <Button size="lg" className="bg-gradient-to-r from-emerald-600 to-purple-600 hover:from-emerald-700 hover:to-purple-700 text-white">
                      <Bot className="h-5 w-5 mr-2" />
                      Start Career Chat
                      <MessageCircle className="h-5 w-5 ml-2" />
                    </Button>
                  </Link>
                </SmartTooltip>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-emerald-600 text-emerald-600 hover:bg-emerald-50"
                  onClick={() => window.location.href = 'tel:407-777-1087'}
                >
                  Schedule 1-on-1 Call
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
      
      <DynamicTeamMissionHighlightReel />
      <AgentProfile />
      <FinancialIndependence />
      <VideoSection />
      <Services />
      <AppointmentForm />
      <BuildingEntrepreneurs />
      <FAQ />
      <OfficeInfo />
      <WFGCompliance />
      <Footer />
      
      {/* Floating Help Button */}
      <FloatingHelpButton currentPage="home" />
    </div>
  );
}
