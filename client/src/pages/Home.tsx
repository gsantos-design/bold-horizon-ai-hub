import Header from "@/components/Header";
import AgentProfile from "@/components/AgentProfile";
import { DictionaryTerm } from "@/components/TooltipDictionary";
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
import { Star, ArrowRight, Bot, MessageCircle, PlayCircle, HelpCircle, Video, FileVideo } from "lucide-react";
import { Link } from "wouter";
import { HelpTooltip, TipTooltip, FeatureTooltip, AITooltip, SmartTooltip } from "@/components/ContextualTooltip";
import InteractiveTourGuide, { homePageTour, useTourGuide } from "@/components/InteractiveTourGuide";
import WFGCompliance from "@/components/WFGCompliance";
import DynamicTeamMissionHighlightReel from "@/components/DynamicTeamMissionHighlightReel";
import LandingHero from "@/components/LandingHero";
import LocalizationBanner from "@/components/LocalizationBanner";
import SpanishMeetingCallout from "@/components/SpanishMeetingCallout";
import Footer from "@/components/Footer";
import FloatingHelpButton from "@/components/FloatingHelpButton";
import { useLanguage } from "@/lib/LanguageContext";

export default function Home() {
  const { t } = useLanguage();
  const { isActive, hasSeenTour, startTour, completeTour, skipTour } = useTourGuide('home-page');

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      
      {/* Localization Progress Banner */}
      <LocalizationBanner />
      
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
          content={t('tooltip.guided_tour_content')}
          title={t('tooltip.quick_start_tour')}
        >
          <Button
            onClick={startTour}
            variant="outline"
            className="bg-white/90 backdrop-blur-sm border-blue-200 text-blue-600 hover:bg-blue-50 shadow-lg"
          >
            <PlayCircle className="h-5 w-5 mr-2" />
            {t('home.take_tour')}
          </Button>
        </TipTooltip>
      </div>
      
      <LandingHero />
      
      {/* Spanish Meeting Callout */}
      <SpanishMeetingCallout />

      {/* Epic Video Generator - FEATURED */}
      <section className="bg-gradient-to-r from-amber-50 to-orange-50 py-12">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto bg-gradient-to-r from-amber-500 to-orange-500 border-0 shadow-xl text-white">
            <CardContent className="p-8 text-center">
              <Badge className="mb-4 bg-white text-amber-600 px-4 py-2 font-bold">
                🎬 NEW! Epic Video Generator
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Create Epic Entrance Videos
              </h2>
              <p className="text-lg mb-6 max-w-2xl mx-auto opacity-90">
                Generate cinematic entrance videos for your WFG presentations. Upload your own Veo creations or use our authentic Spanish community themes with triumphant music!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-white text-amber-600 hover:bg-gray-100 font-bold"
                  onClick={() => window.location.href = '/epic-video'}
                  data-testid="button-epic-video-home"
                >
                  <FileVideo className="h-5 w-5 mr-2" />
                  Launch Epic Video Generator
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
                <Button 
                  size="lg" 
                  className="bg-amber-600/20 text-white border-white/30 hover:bg-amber-600/30"
                  onClick={() => window.location.href = '/ai-automation'}
                  data-testid="button-ai-automation-home"
                >
                  <Bot className="h-5 w-5 mr-2" />
                  AI Automation Hub
                </Button>
              </div>
              <div className="mt-4 text-sm opacity-75">
                ⚡ Your uploaded video is ready! Perfect for billion-dollar presentations.
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* AI Career Mentor Featured Section */}
      <section className="bg-white py-12">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto bg-white/95 backdrop-blur-sm border-0 shadow-xl">
            <CardContent className="p-8 text-center">
              <AITooltip 
                content={t('tooltip.ai_mentor_content')}
                title={t('tooltip.ai_powered_guidance')}
              >
                <Badge className="mb-4 bg-primary text-white px-4 py-2 cursor-help">
                  🤖 {t('home.ai_mentor_badge')}
                </Badge>
              </AITooltip>
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                {t('home.ai_mentor_title')}
              </h2>
              <p className="text-lg text-gray-700 mb-6 max-w-2xl mx-auto">
                {t('home.ai_mentor_description')} Explore <DictionaryTerm termId="educacion_financiera">financial education</DictionaryTerm> pathways and discover how to build <DictionaryTerm termId="ingreso_multiple">multiple income streams</DictionaryTerm> with expert guidance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <SmartTooltip 
                  content={t('tooltip.smart_content')}
                  context="ai-automation"
                >
                  <Link href="/ai-mentor">
                    <Button size="lg" className="bg-primary hover:bg-primary/90 text-white">
                      <Bot className="h-5 w-5 mr-2" />
                      {t('home.start_career_chat')}
                      <MessageCircle className="h-5 w-5 ml-2" />
                    </Button>
                  </Link>
                </SmartTooltip>
                <Button 
                  size="lg" 
                  className="bg-primary hover:bg-primary/90 text-white"
                  onClick={() => window.location.href = 'tel:407-777-1087'}
                >
                  {t('home.schedule_call')}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
      
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
