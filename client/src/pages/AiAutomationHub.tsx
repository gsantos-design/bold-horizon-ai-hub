import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Phone, 
  Video, 
  Zap, 
  Users, 
  TrendingUp, 
  MessageSquare, 
  Clock, 
  DollarSign,
  Settings,
  PlayCircle,
  Mic,
  Camera,
  Bot,
  Star,
  Target,
  Briefcase,
  Calendar,
  Mail,
  PhoneCall,
  FileVideo,
  Volume2,
  Eye
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AIAutomationDashboard from "@/components/AIAutomationDashboard";
import { HelpTooltip, TipTooltip, FeatureTooltip, AITooltip, SmartTooltip } from "@/components/ContextualTooltip";
import InteractiveTourGuide, { aiAutomationTour, useTourGuide } from "@/components/InteractiveTourGuide";
import FloatingHelpButton from "@/components/FloatingHelpButton";
import { useLanguage } from "@/lib/LanguageContext";
import { useSound } from "@/lib/SoundContext";
import { useToast } from "@/hooks/use-toast";

export default function AiAutomationHub() {
  const [activeTab, setActiveTab] = useState("overview");
  const [phoneScript, setPhoneScript] = useState("");
  const [videoScript, setVideoScript] = useState("");
  const [isSetupLoading, setIsSetupLoading] = useState(false);
  const [isTestingAI, setIsTestingAI] = useState(false);
  const [testResults, setTestResults] = useState<any>(null);
  const { isActive, hasSeenTour, startTour, completeTour, skipTour } = useTourGuide('ai-automation');
  const { t } = useLanguage();
  const { toast } = useToast();
  
  // Test Google AI functionality for enterprise deployment
  const testGoogleAI = async () => {
    setIsTestingAI(true);
    setTestResults(null);
    
    try {
      // Test connection first
      const connectionResponse = await fetch('/api/google-ai/test-connection', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      const connectionResult = await connectionResponse.json();
      
      if (!connectionResult.success) {
        throw new Error(connectionResult.message);
      }
      
      // Test voice script generation
      const voiceResponse = await fetch('/api/google-ai/generate-voice-script', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          scenario: '401k rollover opportunity',
          teamMember: 'Nolly'
        })
      });
      const voiceResult = await voiceResponse.json();
      
      // Test video script generation  
      const videoResponse = await fetch('/api/google-ai/generate-video-script', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prospect: 'Business Professional',
          scenario: 'financial growth opportunity'
        })
      });
      const videoResult = await videoResponse.json();
      
      // Test lead analysis
      const leadResponse = await fetch('/api/google-ai/analyze-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          leadInfo: 'Experienced business owner, 45 years old, interested in investment opportunities, annual income $150K+'
        })
      });
      const leadResult = await leadResponse.json();
      
      const allResults = {
        connection: connectionResult,
        voiceScript: voiceResult.script,
        videoScript: videoResult.script,
        leadAnalysis: leadResult.analysis
      };
      
      setTestResults(allResults);
      
      toast({
        title: "✅ Enterprise AI Systems Online",
        description: "All automation features are functioning correctly and ready for deployment.",
        duration: 5000
      });
      
    } catch (error: any) {
      console.error('Google AI test failed:', error);
      toast({
        title: "❌ System Check Failed",
        description: error.message || "Please verify your configuration settings.",
        duration: 5000
      });
    } finally {
      setIsTestingAI(false);
    }
  };

  // Handler functions for button interactions
  const handleVoiceSetup = () => {
    setIsSetupLoading(true);
    toast({
      title: "Voice Setup Guide",
      description: "Voice cloning requires ElevenLabs account setup and voice samples. Check our setup guide for step-by-step instructions.",
      duration: 5000
    });
    // Simulate setup process
    setTimeout(() => {
      setIsSetupLoading(false);
    }, 2000);
  };

  const handleVideoSetup = () => {
    setIsSetupLoading(true);
    toast({
      title: "Video Setup Guide",
      description: "Video avatar creation requires HeyGen or Tavus account setup and training footage. Check our setup guide for requirements.",
      duration: 5000
    });
    // Simulate setup process
    setTimeout(() => {
      setIsSetupLoading(false);
    }, 2000);
  };

  const handleDeployAutomation = () => {
    toast({
      title: "AI Automation Deployment",
      description: "Contact the Santiago Team to deploy your AI automation campaigns. We'll help set up voice cloning, video avatars, and targeting.",
      duration: 6000
    });
  };

  const handleScheduleCall = () => {
    toast({
      title: "Strategy Call Scheduled",
      description: "Redirecting to calendar to book your Santiago Team strategy session...",
      duration: 3000
    });
    // Redirect to calendar booking
    setTimeout(() => {
      window.open('https://calendly.com/santiago-team-wfg', '_blank');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Interactive Tour Guide */}
      <InteractiveTourGuide 
        steps={aiAutomationTour}
        isActive={isActive}
        onComplete={completeTour}
        onSkip={skipTour}
      />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-primary text-secondary py-16 ai-overview-section">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <AITooltip 
                content="Transform your Santiago Team's lead generation with cutting-edge AI technology. Scale from dozens to thousands of personalized prospect interactions daily while maintaining the authentic touch of Nolly and Pablo Santiago."
                title="🤖 Revolutionary AI Scaling"
              >
                <Badge className="mb-4 bg-slate-600 text-white px-6 py-2 text-sm cursor-help font-semibold shadow-lg">
                  {t('ai.hero_badge')}
                </Badge>
              </AITooltip>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                {t('ai.hero_title')}
              </h1>
              <p className="text-xl mb-8 opacity-90 leading-relaxed">
                {t('ai.hero_subtitle')}
              </p>
              <div className="flex flex-col md:flex-row gap-4 justify-center">
                <TipTooltip 
                  content="Launch your first AI automation campaign targeting 401k rollover prospects, high-yield savers, or entrepreneurs. Expected results: 8-12% conversion rate, 200+ appointments monthly, $2.5M+ pipeline value."
                  title="🚀 Campaign Launch"
                >
                  <Button size="lg" className="bg-slate-700 text-white hover:bg-slate-600 px-8 font-bold border-2 border-slate-700 shadow-lg">
                    <PlayCircle className="h-5 w-5 mr-2 text-primary" />
                    <span className="text-primary">{t('ai.start_campaign')}</span>
                  </Button>
                </TipTooltip>
                
                <HelpTooltip 
                  content="Configure your AI phone calls and video avatars with custom scripts, targeting parameters, and integration settings. Setup includes voice cloning, avatar training, and CRM synchronization."
                  title="⚙️ AI Configuration"
                >
                  <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-primary px-8 font-bold bg-transparent">
                    <Settings className="h-5 w-5 mr-2" />
                    <span>{t('ai.configuration')}</span>
                  </Button>
                </HelpTooltip>
              </div>
              
              {/* Tour trigger for new users */}
              {!hasSeenTour && (
                <div className="mt-6">
                  <TipTooltip 
                    content="New to AI automation? Take a quick guided tour to understand how voice cloning and video avatars can 10x your lead generation capacity!"
                  >
                    <Button 
                      onClick={startTour}
                      variant="outline" 
                      className="border-2 border-white/70 text-white hover:bg-white/10 font-bold bg-transparent"
                    >
                      <PlayCircle className="h-4 w-4 mr-2 text-white" />
                      <span className="text-white">{t('ai.take_tour')}</span>
                    </Button>
                  </TipTooltip>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="max-w-7xl mx-auto">
              <div className="flex justify-center mb-8">
                <TabsList className="grid w-full max-w-2xl grid-cols-4 h-auto p-2 bg-white/80 backdrop-blur-sm">
                  <TabsTrigger 
                    value="overview" 
                    className="flex flex-col items-center gap-2 py-4 px-2"
                  >
                    <Eye className="h-5 w-5" />
                    <span className="text-xs md:text-sm">{t('ai.tab_overview')}</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="phone-ai" 
                    className="flex flex-col items-center gap-2 py-4 px-2"
                  >
                    <Phone className="h-5 w-5" />
                    <span className="text-xs md:text-sm">{t('ai.tab_calls')}</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="video-ai" 
                    className="flex flex-col items-center gap-2 py-4 px-2"
                  >
                    <Video className="h-5 w-5" />
                    <span className="text-xs md:text-sm">{t('ai.tab_videos')}</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="campaigns" 
                    className="flex flex-col items-center gap-2 py-4 px-2"
                  >
                    <Zap className="h-5 w-5" />
                    <span className="text-xs md:text-sm">{t('ai.tab_campaigns')}</span>
                  </TabsTrigger>
                </TabsList>
              </div>

              {/* Overview Tab */}
              <TabsContent value="overview" className="mt-0">
                <AIAutomationDashboard />
                
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                  {/* AI Phone Calls */}
                  <Card className="border-2 border-primary/20 shadow-xl">
                    <CardHeader className="bg-primary text-white">
                      <CardTitle className="flex items-center text-xl">
                        <Phone className="h-6 w-6 mr-3" />
                        {t('ai.phone_title')}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold">{t('ai.platform_integration')}</span>
                          <Badge className="bg-primary/10 text-primary">Google AI Voice</Badge>
                        </div>
                        <div className="space-y-3">
                          <div className="flex items-center">
                            <Volume2 className="h-4 w-4 text-primary mr-3" />
                            <span className="text-sm">{t('ai.voice_clones')}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 text-primary mr-3" />
                            <span className="text-sm">{t('ai.response_latency')}</span>
                          </div>
                          <div className="flex items-center">
                            <Users className="h-4 w-4 text-primary mr-3" />
                            <span className="text-sm">{t('ai.concurrent_calls')}</span>
                          </div>
                          <div className="flex items-center">
                            <Target className="h-4 w-4 text-primary mr-3" />
                            <span className="text-sm">{t('ai.lead_qualification')}</span>
                          </div>
                        </div>
                        <div className="bg-primary/5 rounded-lg p-4">
                          <h4 className="font-semibold text-primary mb-2">{t('ai.perfect_for')}</h4>
                          <ul className="text-sm text-primary/80 space-y-1">
                            <li>• {t('ai.rollover_outreach')}</li>
                            <li>• {t('ai.high_yield_followup')}</li>
                            <li>• {t('ai.entrepreneur_calls')}</li>
                            <li>• {t('ai.appointment_reminders')}</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* AI Video Avatars */}
                  <Card className="border-2 border-primary shadow-xl">
                    <CardHeader className="bg-primary text-white">
                      <CardTitle className="flex items-center text-xl">
                        <Video className="h-6 w-6 mr-3" />
                        {t('ai.video_title')}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold">{t('ai.platform_integration_video')}</span>
                          <Badge className="bg-primary text-white">Google AI Video</Badge>
                        </div>
                        <div className="space-y-3">
                          <div className="flex items-center">
                            <Camera className="h-4 w-4 text-primary mr-3" />
                            <span className="text-sm">{t('ai.video_avatars')}</span>
                          </div>
                          <div className="flex items-center">
                            <MessageSquare className="h-4 w-4 text-primary mr-3" />
                            <span className="text-sm">{t('ai.personalized_messaging')}</span>
                          </div>
                          <div className="flex items-center">
                            <Zap className="h-4 w-4 text-primary mr-3" />
                            <span className="text-sm">{t('ai.bulk_generation')}</span>
                          </div>
                          <div className="flex items-center">
                            <TrendingUp className="h-4 w-4 text-primary mr-3" />
                            <span className="text-sm">{t('ai.crm_integration')}</span>
                          </div>
                        </div>
                        <div className="bg-blue-50 rounded-lg p-4">
                          <h4 className="font-semibold text-blue-800 mb-2">{t('ai.perfect_for')}</h4>
                          <ul className="text-sm text-blue-700 space-y-1">
                            <li>• {t('ai.email_personalization')}</li>
                            <li>• {t('ai.linkedin_videos')}</li>
                            <li>• {t('ai.educational_content')}</li>
                            <li>• {t('ai.onboarding_sequences')}</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Epic Video Generator - NEW! */}
                  <Card className="border-2 border-slate-600 shadow-xl relative overflow-hidden">
                    <div className="absolute top-2 right-2 z-10">
                      <Badge className="bg-slate-600 text-white font-bold">NEW!</Badge>
                    </div>
                    <CardHeader className="bg-gradient-to-r from-slate-700 to-slate-600 text-white">
                      <CardTitle className="flex items-center text-xl">
                        <FileVideo className="h-6 w-6 mr-3" />
                        {t('ai.epic_video_title')}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold">{t('ai.platform_integration_epic')}</span>
                          <Badge className="bg-slate-100 text-slate-700">Google Veo + Custom</Badge>
                        </div>
                        <div className="space-y-3">
                          <div className="flex items-center">
                            <Camera className="h-4 w-4 text-slate-600 mr-3" />
                            <span className="text-sm">{t('ai.epic_entrance_videos')}</span>
                          </div>
                          <div className="flex items-center">
                            <Volume2 className="h-4 w-4 text-slate-600 mr-3" />
                            <span className="text-sm">{t('ai.triumphant_music')}</span>
                          </div>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-slate-600 mr-3" />
                            <span className="text-sm">{t('ai.spanish_themes')}</span>
                          </div>
                          <div className="flex items-center">
                            <Target className="h-4 w-4 text-slate-600 mr-3" />
                            <span className="text-sm">{t('ai.billion_presentations')}</span>
                          </div>
                        </div>
                        <div className="bg-slate-50 rounded-lg p-4">
                          <h4 className="font-semibold text-slate-700 mb-2">{t('ai.video_ready')}</h4>
                          <p className="text-sm text-slate-600 mb-3">
                            {t('ai.video_ready_desc')}
                          </p>
                          <Button 
                            onClick={() => window.location.href = '/epic-video'} 
                            className="w-full bg-slate-700 hover:bg-slate-600 text-white"
                            data-testid="button-epic-video"
                          >
                            <FileVideo className="h-4 w-4 mr-2" />
                            {t('ai.launch_epic_generator')}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Implementation Roadmap */}
                <Card className="border-2 border-primary shadow-xl">
                  <CardHeader className="bg-primary text-white">
                    <CardTitle className="flex items-center text-xl">
                      <Settings className="h-6 w-6 mr-3" />
                      {t('ai.implementation_roadmap')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                          <span className="text-2xl font-bold text-white">1</span>
                        </div>
                        <h3 className="font-bold text-lg mb-2">{t('ai.voice_video_training')}</h3>
                        <p className="text-sm text-gray-600">{t('ai.voice_video_training_desc')}</p>
                      </div>
                      <div className="text-center">
                        <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                          <span className="text-2xl font-bold text-white">2</span>
                        </div>
                        <h3 className="font-bold text-lg mb-2">{t('ai.api_integration')}</h3>
                        <p className="text-sm text-gray-600">{t('ai.api_integration_desc')}</p>
                      </div>
                      <div className="text-center">
                        <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                          <span className="text-2xl font-bold text-white">3</span>
                        </div>
                        <h3 className="font-bold text-lg mb-2">{t('ai.campaign_launch')}</h3>
                        <p className="text-sm text-gray-600">{t('ai.campaign_launch_desc')}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Phone AI Tab */}
              <TabsContent value="phone-ai" className="mt-0">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2 space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <Mic className="h-5 w-5 mr-2" />
                          {t('ai.voice_clone_config')}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <Label>{t('ai.select_team_member')}</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Choose voice to clone" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="nolly">Nolly Santiago (Primary)</SelectItem>
                              <SelectItem value="pablo">Pablo Santiago (Co-Leader)</SelectItem>
                              <SelectItem value="custom">Upload Custom Voice</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="phone-script">{t('ai.call_script_template')}</Label>
                          <Textarea 
                            id="phone-script"
                            placeholder="Hi [PROSPECT_NAME], this is Nolly Santiago from the Santiago Team at World Financial Group. I'm calling because you expressed interest in learning about our high-yield savings alternatives..."
                            value={phoneScript}
                            onChange={(e) => setPhoneScript(e.target.value)}
                            className="h-32"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label>Campaign Type</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Select campaign" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="401k">401k Rollover Outreach</SelectItem>
                                <SelectItem value="high-yield">High-Yield Accounts</SelectItem>
                                <SelectItem value="entrepreneur">Entrepreneur Income</SelectItem>
                                <SelectItem value="follow-up">Lead Follow-up</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label>Call Volume</Label>
                            <Input placeholder="e.g., 100 calls/day" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <Settings className="h-5 w-5 mr-2" />
                          Advanced Settings
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label>Response Latency</Label>
                            <Select defaultValue="fast">
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="ultra-fast">Ultra Fast (~250ms)</SelectItem>
                                <SelectItem value="fast">Fast (~500ms)</SelectItem>
                                <SelectItem value="standard">Standard (~1s)</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label>Call Duration Limit</Label>
                            <Select defaultValue="5min">
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="3min">3 minutes</SelectItem>
                                <SelectItem value="5min">5 minutes</SelectItem>
                                <SelectItem value="10min">10 minutes</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <Label>Transfer to Human Agent</Label>
                          <Button variant="outline" size="sm">Configure</Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div>
                    <Card className="sticky top-4">
                      <CardHeader>
                        <CardTitle className="text-lg">Platform Pricing</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="bg-primary/5 rounded-lg p-4">
                          <h4 className="font-semibold text-primary">Google AI Voice</h4>
                          <div className="text-sm text-primary space-y-1 mt-2">
                            <p>• Voice Cloning: $22/month (Creator Plan)</p>
                            <p>• Phone Calls: $0.10-0.30/minute</p>
                            <p>• Setup: $500-1,000 one-time</p>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm">Est. Monthly Cost (1,000 calls):</span>
                            <span className="font-semibold">$200-400</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Est. Setup Time:</span>
                            <span className="font-semibold">2-3 weeks</span>
                          </div>
                        </div>
                        <Button className="w-full">
                          <PhoneCall className="h-4 w-4 mr-2" />
                          Start Phone AI Setup
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              {/* Video AI Tab */}
              <TabsContent value="video-ai" className="mt-0">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2 space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <Camera className="h-5 w-5 mr-2" />
                          {t('ai.avatar_clone_config')}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <Label>{t('ai.select_team_member')}</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Choose avatar to clone" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="nolly">Nolly Santiago (Primary)</SelectItem>
                              <SelectItem value="pablo">Pablo Santiago (Co-Leader)</SelectItem>
                              <SelectItem value="both">Both (Dual Presentation)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="video-script">{t('ai.video_script_template')}</Label>
                          <Textarea 
                            id="video-script"
                            placeholder="Hi [PROSPECT_NAME], I'm Nolly Santiago, and I wanted to personally reach out to you about an incredible opportunity with our Santiago Team. Based on your background in [INDUSTRY], I believe you'd be perfect for our entrepreneur program..."
                            value={videoScript}
                            onChange={(e) => setVideoScript(e.target.value)}
                            className="h-32"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label>Video Duration</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Select duration" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="30s">30 seconds</SelectItem>
                                <SelectItem value="1min">1 minute</SelectItem>
                                <SelectItem value="2min">2 minutes</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label>Video Quality</Label>
                            <Select defaultValue="hd">
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="sd">Standard (720p)</SelectItem>
                                <SelectItem value="hd">High Definition (1080p)</SelectItem>
                                <SelectItem value="4k">Ultra HD (4K)</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <Briefcase className="h-5 w-5 mr-2" />
                          Personalization Variables
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="bg-gray-50 rounded-lg p-4">
                          <h4 className="font-semibold mb-2">Available Variables:</h4>
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <span className="bg-primary/10 px-2 py-1 rounded">[PROSPECT_NAME]</span>
                            <span className="bg-primary/10 px-2 py-1 rounded">[COMPANY_NAME]</span>
                            <span className="bg-primary/10 px-2 py-1 rounded">[INDUSTRY]</span>
                            <span className="bg-primary/10 px-2 py-1 rounded">[JOB_TITLE]</span>
                            <span className="bg-primary/10 px-2 py-1 rounded">[LOCATION]</span>
                            <span className="bg-primary/10 px-2 py-1 rounded">[PAIN_POINT]</span>
                          </div>
                        </div>
                        <div>
                          <Label>Background Scene</Label>
                          <Select defaultValue="office">
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="office">Professional Office</SelectItem>
                              <SelectItem value="home">Home Study</SelectItem>
                              <SelectItem value="neutral">Neutral Background</SelectItem>
                              <SelectItem value="branded">Santiago Team Branded</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div>
                    <Card className="sticky top-4">
                      <CardHeader>
                        <CardTitle className="text-lg">Platform Pricing</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="bg-blue-50 rounded-lg p-4">
                          <h4 className="font-semibold text-blue-800">Google AI Video</h4>
                          <div className="text-sm text-primary space-y-1 mt-2">
                            <p>• Avatar Creation: $99/month</p>
                            <p>• Video Generation: $0.50-1.00/minute</p>
                            <p>• Personalization: Included</p>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm">Est. Monthly Cost (500 videos):</span>
                            <span className="font-semibold">$350-550</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Est. Setup Time:</span>
                            <span className="font-semibold">1-2 weeks</span>
                          </div>
                        </div>
                        <Button 
                          className="w-full" 
                          onClick={handleVideoSetup}
                          disabled={isSetupLoading}
                        >
                          <FileVideo className="h-4 w-4 mr-2" />
                          {isSetupLoading ? 'Setting up...' : t('ai.start_video_setup')}
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              {/* Campaigns Tab */}
              <TabsContent value="campaigns" className="mt-0">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <Card className="border-2 border-green-200">
                    <CardHeader className="bg-primary text-white">
                      <CardTitle className="flex items-center">
                        <Calendar className="h-5 w-5 mr-2" />
                        Active AI Campaigns
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div className="border rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold">401k Rollover Outreach</h4>
                            <Badge className="bg-green-100 text-green-800">Active</Badge>
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-gray-600">Calls Made:</span>
                              <span className="font-semibold ml-2">247</span>
                            </div>
                            <div>
                              <span className="text-gray-600">Appointments:</span>
                              <span className="font-semibold ml-2">23</span>
                            </div>
                            <div>
                              <span className="text-gray-600">Conversion Rate:</span>
                              <span className="font-semibold ml-2">9.3%</span>
                            </div>
                            <div>
                              <span className="text-gray-600">Est. Revenue:</span>
                              <span className="font-semibold ml-2">$34,500</span>
                            </div>
                          </div>
                        </div>

                        <div className="border rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold">High-Yield Account Videos</h4>
                            <Badge className="bg-blue-100 text-blue-800">Active</Badge>
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-gray-600">Videos Sent:</span>
                              <span className="font-semibold ml-2">156</span>
                            </div>
                            <div>
                              <span className="text-gray-600">Opens:</span>
                              <span className="font-semibold ml-2">89</span>
                            </div>
                            <div>
                              <span className="text-gray-600">Engagement Rate:</span>
                              <span className="font-semibold ml-2">57%</span>
                            </div>
                            <div>
                              <span className="text-gray-600">Meetings Booked:</span>
                              <span className="font-semibold ml-2">12</span>
                            </div>
                          </div>
                        </div>

                        <div className="border rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold">Entrepreneur Opportunity</h4>
                            <Badge className="bg-amber-100 text-amber-800">Paused</Badge>
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-gray-600">Reach Attempts:</span>
                              <span className="font-semibold ml-2">89</span>
                            </div>
                            <div>
                              <span className="text-gray-600">Contacts Made:</span>
                              <span className="font-semibold ml-2">31</span>
                            </div>
                            <div>
                              <span className="text-gray-600">Interest Level:</span>
                              <span className="font-semibold ml-2">High</span>
                            </div>
                            <div>
                              <span className="text-gray-600">Next Follow-up:</span>
                              <span className="font-semibold ml-2">2 days</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-2 border-primary/20">
                    <CardHeader className="bg-primary text-white">
                      <CardTitle className="flex items-center">
                        <TrendingUp className="h-5 w-5 mr-2" />
                        Performance Analytics
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="space-y-6">
                        <div>
                          <h4 className="font-semibold mb-3">This Month's Results</h4>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-sm">Total AI Interactions</span>
                              <span className="font-bold">492</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm">Qualified Leads Generated</span>
                              <span className="font-bold">78</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm">Appointments Scheduled</span>
                              <span className="font-bold">35</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm">Estimated Pipeline Value</span>
                              <span className="font-bold text-primary">$87,500</span>
                            </div>
                          </div>
                        </div>

                        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-4">
                          <h4 className="font-semibold text-green-800 mb-2">ROI Projection</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span>AI Automation Costs:</span>
                              <span>$800/month</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Generated Revenue:</span>
                              <span className="font-semibold">$87,500</span>
                            </div>
                            <div className="flex justify-between border-t pt-2">
                              <span className="font-semibold">Return on Investment:</span>
                              <span className="font-bold text-primary">10,838%</span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-3">Best Performing Scripts</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center justify-between bg-green-50 rounded px-3 py-2">
                              <span>"Tax-Free Rollover Strategy"</span>
                              <span className="font-semibold text-primary">12.4% conversion</span>
                            </div>
                            <div className="flex items-center justify-between bg-blue-50 rounded px-3 py-2">
                              <span>"High-Yield Alternative"</span>
                              <span className="font-semibold text-primary">8.9% conversion</span>
                            </div>
                            <div className="flex items-center justify-between bg-blue-50 rounded px-3 py-2">
                              <span>"Entrepreneur Income"</span>
                              <span className="font-semibold text-primary">15.2% conversion</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="mt-8 text-center">
                  <Card className="border-2 border-yellow-200 bg-gradient-to-r from-yellow-50 to-orange-50">
                    <CardContent className="p-8">
                      <div className="max-w-3xl mx-auto">
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Scale Your Santiago Team?</h3>
                        <p className="text-lg text-gray-600 mb-6">
                          Transform your nationwide lead generation with AI-powered phone calls and personalized video outreach
                        </p>
                        <div className="flex flex-col md:flex-row gap-4 justify-center">
                          <Button 
                            size="lg" 
                            className="bg-primary text-white px-8"
                            onClick={handleDeployAutomation}
                          >
                            <Bot className="h-5 w-5 mr-2" />
                            Deploy AI Automation
                          </Button>
                          <Button 
                            size="lg" 
                            className="bg-primary text-white px-8"
                            onClick={handleScheduleCall}
                          >
                            <Calendar className="h-5 w-5 mr-2" />
                            Schedule Strategy Call
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
      <Footer />
      
      {/* Floating Help Button */}
      <FloatingHelpButton currentPage="ai-automation" />
    </div>
  );
}