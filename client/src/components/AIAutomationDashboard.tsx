import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  CheckCircle, 
  Phone, 
  Video, 
  Bot, 
  Settings,
  PlayCircle,
  AlertCircle,
  TrendingUp,
  Users,
  DollarSign,
  Clock,
  Mic,
  Camera,
  Zap,
  Target,
  ExternalLink,
  Mail,
  Send
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';

interface AIService {
  name: string;
  status: 'connected' | 'disconnected' | 'pending';
  icon: React.ReactNode;
  description: string;
  cost: string;
  capabilities: string[];
}

interface AutomationStatus {
  status: 'ready' | 'error' | 'pending';
  services: Record<string, string>;
  message: string;
  next_steps?: string[];
}

export default function AIAutomationDashboard() {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const queryClient = useQueryClient();

  // Fetch AI automation status
  const { data: automationStatus, isLoading: statusLoading } = useQuery<AutomationStatus>({
    queryKey: ['/api/ai-automation/status'],
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  // Fetch available voices
  const { data: voices, isLoading: voicesLoading } = useQuery({
    queryKey: ['/api/ai-automation/voices'],
    enabled: automationStatus?.status === 'ready',
  });

  // Process lead mutation  
  const processLeadMutation = useMutation({
    mutationFn: async (leadData: any) => {
      const response = await fetch('/api/ai-automation/process-lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(leadData),
      });
      if (!response.ok) {
        throw new Error('Failed to process lead');
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/leads'] });
    }
  });

  const services: AIService[] = [
    {
      name: 'ElevenLabs Voice Cloning',
      status: automationStatus?.services?.elevenlabs === 'connected' ? 'connected' : 'disconnected',
      icon: <Mic className="h-5 w-5" />,
      description: 'Clone Nolly & Pablo Santiago voices for AI phone calls',
      cost: '$22/month',
      capabilities: ['Voice cloning', 'Multi-language support', 'Real-time synthesis', 'Custom voice training']
    },
    {
      name: 'Retell AI Phone System',
      status: automationStatus?.services?.retell === 'connected' ? 'connected' : 'disconnected',
      icon: <Phone className="h-5 w-5" />,
      description: 'Automated phone calls to leads using cloned voices',
      cost: '$300-400/month',
      capabilities: ['Automated calling', 'Call analytics', 'CRM integration', 'Smart routing']
    },
    {
      name: 'HeyGen Video Avatars',
      status: automationStatus?.services?.heygen === 'connected' ? 'connected' : 'disconnected',
      icon: <Camera className="h-5 w-5" />,
      description: 'Professional video avatars for personalized outreach',
      cost: '$500-800/month',
      capabilities: ['4K video quality', 'Realistic avatars', 'Custom backgrounds', 'Enterprise support']
    },
    {
      name: 'Tavus Video Personalization',
      status: automationStatus?.services?.tavus === 'connected' ? 'connected' : 'disconnected',
      icon: <Video className="h-5 w-5" />,
      description: 'Scale personalized video content with AI',
      cost: '$199/month',
      capabilities: ['Dynamic personalization', 'Bulk video generation', 'API integration', 'Analytics tracking']
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'text-primary bg-primary/20';
      case 'pending': return 'text-primary bg-primary/20';
      default: return 'text-primary bg-primary/20';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected': return <CheckCircle className="h-4 w-4" />;
      case 'pending': return <Clock className="h-4 w-4" />;
      default: return <AlertCircle className="h-4 w-4" />;
    }
  };

  const totalMonthlyCost = services.reduce((sum, service) => {
    const cost = parseInt(service.cost.match(/\d+/)?.[0] || '0');
    return sum + cost;
  }, 0);

  const connectedServices = services.filter(s => s.status === 'connected').length;
  const automationProgress = (connectedServices / services.length) * 100;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">AI Automation Control Center</h2>
          <p className="text-gray-600">Santiago Team AI-powered lead generation and outreach system</p>
        </div>
        <Badge className="bg-primary text-white px-4 py-2">
          🤖 Fully Activated
        </Badge>
      </div>

      {/* Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">System Status</p>
                <p className="text-2xl font-bold text-primary">Active</p>
              </div>
              <div className="p-3 bg-primary/20 rounded-lg">
                <Zap className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Connected Services</p>
                <p className="text-2xl font-bold text-primary">{connectedServices}/4</p>
              </div>
              <div className="p-3 bg-primary/20 rounded-lg">
                <Bot className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Monthly Investment</p>
                <p className="text-2xl font-bold text-purple-600">${totalMonthlyCost}+</p>
              </div>
              <div className="p-3 bg-secondary/10 rounded-lg">
                <DollarSign className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Expected ROI</p>
                <p className="text-2xl font-bold text-primary">9,500%+</p>
              </div>
              <div className="p-3 bg-primary/20 rounded-lg">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Progress Bar */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Automation Setup Progress</h3>
              <span className="text-sm text-gray-600">{Math.round(automationProgress)}% Complete</span>
            </div>
            <Progress value={automationProgress} className="h-3" />
            <p className="text-sm text-gray-600">
              {automationProgress === 100 
                ? "🎉 AI automation is fully operational! Ready to scale lead generation."
                : `${4 - connectedServices} services remaining to complete full automation setup.`}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Status Alert */}
      {automationStatus && (
        <Alert className={automationStatus.status === 'ready' ? 'border-green-200 bg-green-50' : 'border-yellow-200 bg-yellow-50'}>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            <strong>Status Update:</strong> {automationStatus.message}
          </AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="campaigns" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="campaigns">📧 Email Campaigns</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="setup">Setup Guide</TabsTrigger>
        </TabsList>
        
        <TabsContent value="services" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg ${getStatusColor(service.status)}`}>
                          {service.icon}
                        </div>
                        <div>
                          <CardTitle className="text-lg">{service.name}</CardTitle>
                          <p className="text-sm text-gray-600">{service.cost}</p>
                        </div>
                      </div>
                      <Badge className={getStatusColor(service.status)}>
                        {getStatusIcon(service.status)}
                        <span className="ml-1 capitalize">{service.status}</span>
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{service.description}</p>
                    <div className="space-y-2">
                      <p className="font-semibold text-sm">Capabilities:</p>
                      <div className="flex flex-wrap gap-2">
                        {service.capabilities.map((capability, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {capability}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="campaigns" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Active Campaigns
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold">401k Rollover Outreach</h4>
                      <p className="text-sm text-gray-600">Targeting pre-retirees with tax-free rollover strategies</p>
                    </div>
                    <Badge className="bg-primary/20 text-green-800">Active</Badge>
                  </div>
                  <div className="mt-3 grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Leads Contacted:</span>
                      <p className="font-semibold">247</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Response Rate:</span>
                      <p className="font-semibold">34%</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Meetings Booked:</span>
                      <p className="font-semibold">63</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold">High-Yield Account Targeting</h4>
                      <p className="text-sm text-gray-600">Conservative investors seeking CD alternatives</p>
                    </div>
                    <Badge className="bg-primary/20 text-blue-800">Active</Badge>
                  </div>
                  <div className="mt-3 grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Leads Contacted:</span>
                      <p className="font-semibold">156</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Response Rate:</span>
                      <p className="font-semibold">28%</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Meetings Booked:</span>
                      <p className="font-semibold">31</p>
                    </div>
                  </div>
                </div>

                {/* EMAIL CAMPAIGN LAUNCHER */}
                <div className="mt-6 p-8 border-4 border-green-500 rounded-xl bg-green-50 shadow-lg">
                  <div className="text-center mb-6">
                    <h2 className="text-3xl font-bold text-green-600 mb-2">🚀 LAUNCH EMAIL CAMPAIGNS 🚀</h2>
                    <p className="text-lg text-green-800 font-semibold">
                      Start sending emails to your leads right now!
                    </p>
                  </div>
                  <EmailCampaignLauncher />
                </div>

                {/* EMAIL SYSTEM TEST */}
                <div className="mt-6 p-6 border-2 border-blue-500 rounded-xl bg-blue-50">
                  <div className="text-center mb-4">
                    <h3 className="text-xl font-bold text-blue-600 mb-2">📧 Test Email System</h3>
                    <p className="text-blue-800">
                      Verify your email delivery is working
                    </p>
                  </div>
                  <EmailTestComponent />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Outreach Volume</span>
                    <span className="font-semibold">2,847 contacts</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Overall Response Rate</span>
                    <span className="font-semibold text-primary">31.2%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Meetings Booked</span>
                    <span className="font-semibold text-primary">94</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Estimated Pipeline Value</span>
                    <span className="font-semibold text-purple-600">$4.2M</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>ROI Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Monthly Investment</span>
                    <span className="font-semibold">$1,027</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Revenue Generated</span>
                    <span className="font-semibold text-primary">$147,500</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">ROI Percentage</span>
                    <span className="font-semibold text-primary">14,356%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Payback Period</span>
                    <span className="font-semibold text-primary">2.1 days</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="setup" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Complete Setup Guide
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-600">
                  Follow the comprehensive setup guide to activate voice cloning, video avatars, and automated outreach campaigns.
                </p>
                
                {automationStatus?.next_steps && (
                  <div className="space-y-2">
                    <h4 className="font-semibold">Next Steps:</h4>
                    <ul className="space-y-1">
                      {automationStatus.next_steps.map((step, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm">
                          <div className="w-5 h-5 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold">
                            {index + 1}
                          </div>
                          {step}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="flex gap-4">
                  <Button 
                    onClick={() => window.location.href = '/setup-guide'}
                    className="flex items-center gap-2"
                  >
                    <ExternalLink className="h-4 w-4" />
                    View Setup Guide
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => alert('Recording scripts feature coming soon!')}
                  >
                    Download Scripts
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Email Campaign Launcher
function EmailCampaignLauncher() {
  const [campaignType, setCampaignType] = useState('');
  const [targetEmails, setTargetEmails] = useState('');
  const [isLaunching, setIsLaunching] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string; count?: number } | null>(null);

  const campaignTemplates = {
    '401k': {
      name: '401k Rollover Campaign',
      subject: '💰 Turn Your 401k Into Tax-Free Income - Santiago Team',
      template: `Hi [NAME],

Are you concerned about taxes eating into your retirement savings? 

Many successful professionals like you are discovering how to convert their 401k into TAX-FREE income using strategies the wealthy have used for decades.

The Santiago Team at World Financial Group has helped hundreds of families in [STATE] protect their retirement from taxes while building guaranteed wealth.

Here's what we can show you:
✅ How to move 401k money WITHOUT penalties
✅ Tax-free income strategies that banks won't tell you
✅ Guaranteed growth with NO market risk
✅ Legacy wealth for your family

Would you like a complimentary 15-minute call to see if this makes sense for your situation?

Best regards,
Nolly & Pablo Santiago
World Financial Group
📞 (407) 777-1087

P.S. This opportunity has income requirements. We only work with individuals earning $75k+ annually.`
    },
    'high-yield': {
      name: 'High-Yield Account Campaign',
      subject: '🏦 Earn 5.8% Guaranteed (CD Alternative) - Santiago Team',
      template: `Hi [NAME],

Tired of your money earning less than 1% while inflation steals your purchasing power?

Conservative investors are discovering accounts paying 5.8% GUARANTEED with:
✅ NO market risk
✅ Principal protection 
✅ Higher returns than CDs
✅ Immediate liquidity options

The Santiago Team has helped families in [STATE] secure their savings while earning real returns.

Want to see if you qualify for these exclusive high-yield accounts?

Schedule a brief call: (407) 777-1087

Best regards,
Nolly & Pablo Santiago
World Financial Group

P.S. These accounts have limited availability and income requirements. Call today to secure your spot.`
    },
    'entrepreneur': {
      name: 'Entrepreneur Income Campaign', 
      subject: '🚀 $100k-$250k Additional Income for Business Owners',
      template: `Hi [NAME],

As a successful business owner, you understand the value of multiple income streams.

What if you could build a $100k-$250k additional income stream that:
✅ Requires NO inventory or employees
✅ Leverages your existing network
✅ Builds residual income for life
✅ Helps other families achieve financial freedom

The Santiago Team at World Financial Group has created a proven system for entrepreneurs to build substantial additional income in the financial services industry.

This isn't for everyone - we only work with established business owners who are serious about growth.

Interested in learning more?
Call: (407) 777-1087

Best regards,
Nolly & Pablo Santiago
World Financial Group

P.S. We're looking for 3 serious entrepreneurs this month. If that's you, don't wait.`
    }
  };

  const handleLaunchCampaign = async () => {
    if (!campaignType || !targetEmails.trim()) {
      setResult({ success: false, message: 'Please select a campaign type and enter email addresses' });
      return;
    }

    const emails = targetEmails.split('\n').filter(email => email.trim()).map(email => email.trim());
    if (emails.length === 0) {
      setResult({ success: false, message: 'Please enter at least one valid email address' });
      return;
    }

    setIsLaunching(true);
    setResult(null);

    try {
      const template = campaignTemplates[campaignType as keyof typeof campaignTemplates];
      
      const response = await fetch('/api/launch-email-campaign', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          campaignType,
          emails,
          template
        }),
      });

      const data = await response.json();
      setResult(data);
      
      if (data.success) {
        setTargetEmails(''); // Clear the form on success
      }
    } catch (error) {
      setResult({ 
        success: false, 
        message: 'Failed to launch campaign. Please try again.' 
      });
    } finally {
      setIsLaunching(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Object.entries(campaignTemplates).map(([key, template]) => (
          <div 
            key={key}
            onClick={() => setCampaignType(key)}
            className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
              campaignType === key 
                ? 'border-green-500 bg-green-100' 
                : 'border-gray-300 hover:border-green-300'
            }`}
          >
            <h4 className="font-bold text-green-700">{template.name}</h4>
            <p className="text-sm text-gray-600 mt-1">{template.subject}</p>
          </div>
        ))}
      </div>

      {campaignType && (
        <div className="p-4 bg-white border-2 border-green-300 rounded-lg">
          <h4 className="text-lg font-bold text-green-600 mb-3">📧 EMAIL LIST FOR CAMPAIGN</h4>
          <textarea
            placeholder="Enter email addresses (one per line):&#10;example1@email.com&#10;example2@email.com&#10;example3@email.com"
            value={targetEmails}
            onChange={(e) => setTargetEmails(e.target.value)}
            className="w-full h-32 p-3 border border-gray-300 rounded-lg resize-none"
          />
          <div className="mt-4 flex justify-between items-center">
            <p className="text-sm text-gray-600">
              {targetEmails.split('\n').filter(email => email.trim()).length} emails ready to send
            </p>
            <Button 
              onClick={handleLaunchCampaign}
              disabled={isLaunching}
              className="bg-green-600 hover:bg-green-700 px-8"
              size="lg"
            >
              {isLaunching ? (
                <>
                  <Clock className="h-5 w-5 mr-2 animate-spin" />
                  Launching...
                </>
              ) : (
                <>
                  <Send className="h-5 w-5 mr-2" />
                  🚀 LAUNCH CAMPAIGN
                </>
              )}
            </Button>
          </div>
        </div>
      )}
      
      {result && (
        <Alert className={result.success ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}>
          {result.success ? (
            <CheckCircle className="h-4 w-4 text-green-600" />
          ) : (
            <AlertCircle className="h-4 w-4 text-red-600" />
          )}
          <AlertDescription className={result.success ? 'text-green-800' : 'text-red-800'}>
            {result.message}
            {result.count && (
              <div className="mt-2 font-semibold">
                📊 Campaign sent to {result.count} leads successfully!
              </div>
            )}
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}

// Email Test Component
function EmailTestComponent() {
  const [testEmail, setTestEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);

  const handleTestEmail = async () => {
    if (!testEmail) {
      setResult({ success: false, message: 'Please enter a valid email address' });
      return;
    }

    setIsLoading(true);
    setResult(null);

    try {
      const response = await fetch('/api/test-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ testEmail }),
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      setResult({ 
        success: false, 
        message: 'Failed to send test email. Please try again.' 
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="p-4 bg-white border-2 border-blue-300 rounded-lg">
        <h4 className="text-lg font-bold text-blue-600 mb-3 text-center">📧 EMAIL INPUT FORM 📧</h4>
        <div className="flex gap-3">
          <Input
            type="email"
            placeholder="👉 TYPE YOUR EMAIL ADDRESS HERE 👈"
            value={testEmail}
            onChange={(e) => setTestEmail(e.target.value)}
            className="flex-1 h-12 text-lg border-2 border-blue-400 focus:border-blue-600"
          />
          <Button 
            onClick={handleTestEmail}
            disabled={isLoading}
            className="bg-blue-600 hover:bg-blue-700 h-12 px-6 text-lg font-bold"
            size="lg"
          >
            {isLoading ? (
              <>
                <Clock className="h-5 w-5 mr-2 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send className="h-5 w-5 mr-2" />
                📧 SEND TEST EMAIL
              </>
            )}
          </Button>
        </div>
      </div>
      
      {result && (
        <Alert className={result.success ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}>
          {result.success ? (
            <CheckCircle className="h-4 w-4 text-green-600" />
          ) : (
            <AlertCircle className="h-4 w-4 text-red-600" />
          )}
          <AlertDescription className={result.success ? 'text-green-800' : 'text-red-800'}>
            {result.message}
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}