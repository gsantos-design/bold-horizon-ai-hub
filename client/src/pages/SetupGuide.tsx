import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ExternalLink, 
  CheckCircle, 
  Clock, 
  DollarSign,
  Phone,
  Video,
  Bot,
  Settings,
  PlayCircle,
  FileText,
  Download,
  Chrome,
  Database
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function SetupGuide() {
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);

  const toggleStep = (stepId: string) => {
    setCompletedSteps(prev => 
      prev.includes(stepId) 
        ? prev.filter(id => id !== stepId)
        : [...prev, stepId]
    );
  };

  const ServiceCard = ({ 
    title, 
    cost, 
    setup, 
    roi, 
    link, 
    steps,
    icon 
  }: {
    title: string;
    cost: string;
    setup: string;
    roi: string;
    link: string;
    steps: string[];
    icon: React.ReactNode;
  }) => (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            {icon}
          </div>
          <div>
            <CardTitle className="text-xl">{title}</CardTitle>
            <Badge className="mt-1 bg-green-100 text-green-800">{cost}</Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-semibold text-gray-700">Setup Time</p>
              <p className="text-gray-600">{setup}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-700">Expected ROI</p>
              <p className="text-green-600 font-semibold">{roi}</p>
            </div>
          </div>
          
          <div>
            <p className="font-semibold text-gray-700 mb-2">Setup Steps:</p>
            <div className="space-y-2">
              {steps.map((step, index) => (
                <div key={index} className="flex items-start gap-2 text-sm">
                  <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold mt-0.5">
                    {index + 1}
                  </div>
                  <p className="text-gray-600">{step}</p>
                </div>
              ))}
            </div>
          </div>

          <Button 
            className="w-full" 
            onClick={() => window.open(link, '_blank')}
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Start Setup
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-20 pb-12">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 bg-white/20 text-white px-6 py-2">
                🚀 AI Automation Setup Guide
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Complete Setup Walkthrough
              </h1>
              <p className="text-xl mb-8 opacity-90">
                Step-by-step guide to implement AI phone calls and video avatars for the Santiago Team
              </p>
              <div className="flex flex-col md:flex-row gap-4 justify-center">
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-2xl font-bold">$421-656</div>
                  <div className="text-sm opacity-80">Monthly Investment</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-2xl font-bold">9,500-16,500%</div>
                  <div className="text-sm opacity-80">Monthly ROI</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-2xl font-bold">2-3 Weeks</div>
                  <div className="text-sm opacity-80">Full Deployment</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Setup Services */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Google Suite Integration</h2>
                <p className="text-lg text-gray-600">
                  Complete setup for Google Analytics, Firebase, and Gemini AI automation services
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <ServiceCard
                  title="Google Analytics 4"
                  cost="Free"
                  setup="15 minutes"
                  roi="Real-time lead tracking"
                  link="https://analytics.google.com"
                  icon={<Chrome className="h-5 w-5 text-blue-600" />}
                  steps={[
                    "Create Google Analytics account",
                    "Set up GA4 property for your domain", 
                    "Install tracking code on website",
                    "Configure conversion goals and events"
                  ]}
                />

                <ServiceCard
                  title="Firebase Backend"
                  cost="Free tier available"
                  setup="20 minutes"
                  roi="Scalable data management"
                  link="https://console.firebase.google.com"
                  icon={<Database className="h-5 w-5 text-green-600" />}
                  steps={[
                    "Create Firebase project",
                    "Enable Firestore database",
                    "Set up authentication rules",
                    "Configure web app integration"
                  ]}
                />

                <ServiceCard
                  title="Google Gemini AI"
                  cost="Free tier available"
                  setup="10 minutes"
                  roi="Intelligent automation"
                  link="https://ai.google.dev/"
                  icon={<Bot className="h-5 w-5 text-purple-600" />}
                  steps={[
                    "Access Google AI Studio",
                    "Create new API key for Gemini",
                    "Test AI model integration",
                    "Configure rate limits and usage"
                  ]}
                />

                <ServiceCard
                  title="Google Workspace"
                  cost="$6-18/month per user"
                  setup="30 minutes"
                  roi="Team collaboration & automation"
                  link="https://workspace.google.com"
                  icon={<Settings className="h-5 w-5 text-orange-600" />}
                  steps={[
                    "Create Google Workspace account",
                    "Set up team email addresses",
                    "Configure Drive and Sheets integration",
                    "Enable API access for automation"
                  ]}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Implementation Timeline */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">3-Week Implementation Timeline</h2>
                <p className="text-lg text-gray-600">
                  From account creation to full AI automation deployment
                </p>
              </div>

              <Tabs defaultValue="week1" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="week1">Week 1: Accounts</TabsTrigger>
                  <TabsTrigger value="week2">Week 2: Content</TabsTrigger>
                  <TabsTrigger value="week3">Week 3: Deploy</TabsTrigger>
                </TabsList>
                
                <TabsContent value="week1" className="mt-8">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Clock className="h-5 w-5" />
                        Week 1: Account Setup (2-3 hours total)
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="p-4 border rounded-lg">
                          <h4 className="font-semibold mb-2">Priority Tasks</h4>
                          <ul className="space-y-2 text-sm">
                            <li className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-green-600" />
                              Create all 4 service accounts
                            </li>
                            <li className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-green-600" />
                              Configure billing and payment methods
                            </li>
                            <li className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-green-600" />
                              Collect all API keys securely
                            </li>
                            <li className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-green-600" />
                              Test basic connectivity and features
                            </li>
                          </ul>
                        </div>
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <p className="text-sm text-blue-800">
                            <strong>Expected Investment:</strong> $1,027-1,427 monthly + $3,300 one-time setup
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="week2" className="mt-8">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        Week 2: Content Creation (6-8 hours)
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="p-4 border rounded-lg">
                          <h4 className="font-semibold mb-2">Recording Sessions</h4>
                          <ul className="space-y-2 text-sm">
                            <li>• Nolly Santiago voice recording (2-3 hours)</li>
                            <li>• Pablo Santiago voice recording (2-3 hours)</li>
                            <li>• Video avatar creation session (4K quality)</li>
                            <li>• Script testing and optimization</li>
                          </ul>
                        </div>
                        <div className="bg-green-50 p-4 rounded-lg">
                          <p className="text-sm text-green-800">
                            <strong>Quality Requirements:</strong> Professional microphone, quiet environment, 4K video for avatars
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="week3" className="mt-8">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <PlayCircle className="h-5 w-5" />
                        Week 3: Full Deployment
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="p-4 border rounded-lg">
                          <h4 className="font-semibold mb-2">Go-Live Checklist</h4>
                          <ul className="space-y-2 text-sm">
                            <li>• Integration testing with HubSpot CRM</li>
                            <li>• Launch first AI campaign (50 leads)</li>
                            <li>• Monitor performance and optimize</li>
                            <li>• Scale to full volume (2000+ contacts)</li>
                          </ul>
                        </div>
                        <div className="bg-purple-50 p-4 rounded-lg">
                          <p className="text-sm text-purple-800">
                            <strong>Expected Results:</strong> 200+ appointments, $2.5M+ pipeline, 1,000%+ ROI
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>

        {/* Quick Start Actions */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">Start Today</h2>
              <p className="text-xl mb-8 opacity-90">
                Begin your AI automation journey with these immediate actions
              </p>
              <div className="flex flex-col md:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-white text-purple-600 hover:bg-gray-100"
                  onClick={() => window.open('https://elevenlabs.io/sign-up', '_blank')}
                >
                  <ExternalLink className="h-5 w-5 mr-2" />
                  Start with ElevenLabs
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white hover:text-purple-600"
                  onClick={() => alert('Recording scripts template will be available soon!')}
                >
                  <Download className="h-5 w-5 mr-2" />
                  Download Scripts
                </Button>
              </div>
              
              <div className="mt-8 p-6 bg-white/10 rounded-lg">
                <p className="text-lg">
                  <strong>Need Help?</strong> Call Pablo & Nolly Santiago directly at{' '}
                  <a href="tel:407-777-1087" className="underline font-semibold">
                    (407) 777-1087
                  </a>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}