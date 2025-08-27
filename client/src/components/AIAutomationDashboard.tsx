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
  Send,
  Copy
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
  const [selectedCampaign, setSelectedCampaign] = useState<string>('');
  const [targetEmails, setTargetEmails] = useState<string>('');
  const [isLaunching, setIsLaunching] = useState(false);
  const [result, setResult] = useState<{success: boolean, message: string} | null>(null);

  // Fetch current leads count
  const { data: leads } = useQuery({
    queryKey: ['/api/leads'],
  });

  const currentLeadsCount = leads?.length || 0;

  const campaignTemplates = {
    '401k': {
      name: '401k Rollover Campaign',
      description: 'Turn Your 401k Into Tax-Free Income - Santiago Team',
      icon: '🏦',
    },
    'high-yield': {
      name: 'High-Yield Account Campaign',
      description: 'Earn 5.6% Guaranteed on Alternative - Santiago Team',
      icon: '📈',
    },
    'entrepreneur': {
      name: 'Entrepreneur Income Campaign',
      description: '$100k-$250k Additional Income for Business Owners',
      icon: '💼',
    }
  };

  const handleLaunchCampaign = async () => {
    if (!selectedCampaign || !targetEmails.trim()) {
      alert('Please select a campaign and enter target emails');
      return;
    }

    setIsLaunching(true);
    try {
      const emails = targetEmails.split('\n').filter(email => email.trim());
      const response = await fetch('/api/ai-automation/launch-campaign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          campaignType: selectedCampaign,
          emails: emails
        }),
      });

      const data = await response.json();
      setResult({
        success: response.ok,
        message: data.message || (response.ok ? `Campaign launched to ${emails.length} recipients!` : 'Campaign failed')
      });

      if (response.ok) {
        setTargetEmails('');
        setSelectedCampaign('');
      }
    } catch (error) {
      setResult({
        success: false,
        message: 'Network error: Please try again'
      });
    }
    setIsLaunching(false);
  };


  return (
    <div className="space-y-6">
      {/* Header with High-Yield Account Targeting Stats */}
      <Card>
        <CardContent className="p-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">High-Yield Account Targeting</h2>
            <p className="text-gray-600 mb-4">Conservative investors seeking CD alternatives</p>
            <div className="grid grid-cols-3 gap-8">
              <div>
                <div className="text-sm text-gray-600">Leads Contacted</div>
                <div className="text-2xl font-bold text-primary">156</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Response Rate</div>
                <div className="text-2xl font-bold text-primary">28%</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Meetings Booked</div>
                <div className="text-2xl font-bold text-primary">31</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lead Sources Section */}
      <div className="border-4 border-purple-500 rounded-xl bg-purple-50 p-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-purple-700 mb-2">📊 YOUR LEAD SOURCES 📊</h2>
          <p className="text-purple-800">Import leads from multiple sources for your campaigns</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div 
            onClick={() => window.location.href = '/lead-engine'}
            className="p-4 bg-white border-2 border-purple-300 rounded-lg cursor-pointer hover:border-purple-500 transition-all text-center"
          >
            <div className="text-3xl mb-2">🗃️</div>
            <h4 className="font-bold text-purple-700">Current Lead Database</h4>
            <div className="text-xl font-bold text-purple-600 mt-1">{currentLeadsCount}</div>
            <p className="text-sm text-gray-600 mt-2">Your existing leads in the system</p>
          </div>

          <div 
            onClick={() => window.location.href = '/lead-engine'}
            className="p-4 bg-white border-2 border-purple-300 rounded-lg cursor-pointer hover:border-purple-500 transition-all text-center"
          >
            <div className="text-3xl mb-2">🚀</div>
            <h4 className="font-bold text-purple-700">Apollo.io Import</h4>
            <div className="text-xl font-bold text-purple-600 mt-1">Unlimited</div>
            <p className="text-sm text-gray-600 mt-2">Import B2B leads from Apollo.io</p>
          </div>

          <div 
            onClick={() => window.location.href = '/lead-engine'}
            className="p-4 bg-white border-2 border-purple-300 rounded-lg cursor-pointer hover:border-purple-500 transition-all text-center"
          >
            <div className="text-3xl mb-2">💼</div>
            <h4 className="font-bold text-purple-700">LinkedIn Sales Navigator</h4>
            <div className="text-xl font-bold text-purple-600 mt-1">Pro Access</div>
            <p className="text-sm text-gray-600 mt-2">Extract leads from LinkedIn searches</p>
          </div>

          <div 
            onClick={() => window.location.href = '/lead-engine'}
            className="p-4 bg-white border-2 border-purple-300 rounded-lg cursor-pointer hover:border-purple-500 transition-all text-center"
          >
            <div className="text-3xl mb-2">🔗</div>
            <h4 className="font-bold text-purple-700">HubSpot CRM</h4>
            <div className="text-xl font-bold text-purple-600 mt-1">Sync Ready</div>
            <p className="text-sm text-gray-600 mt-2">Import from your HubSpot CRM</p>
          </div>

          <div 
            onClick={() => window.location.href = '/lead-engine'}
            className="p-4 bg-white border-2 border-purple-300 rounded-lg cursor-pointer hover:border-purple-500 transition-all text-center"
          >
            <div className="text-3xl mb-2">📂</div>
            <h4 className="font-bold text-purple-700">CSV Upload</h4>
            <div className="text-xl font-bold text-purple-600 mt-1">File Ready</div>
            <p className="text-sm text-gray-600 mt-2">Upload your own lead lists</p>
          </div>

          <div 
            onClick={() => window.location.href = '/lead-engine'}
            className="p-4 bg-white border-2 border-purple-300 rounded-lg cursor-pointer hover:border-purple-500 transition-all text-center"
          >
            <div className="text-3xl mb-2">🌐</div>
            <h4 className="font-bold text-purple-700">Website Forms</h4>
            <div className="text-xl font-bold text-purple-600 mt-1">Live Capture</div>
            <p className="text-sm text-gray-600 mt-2">Leads from your website forms</p>
          </div>
        </div>
      </div>

      {/* Email Campaigns Section */}
      <div className="border-4 border-green-500 rounded-xl bg-green-50 p-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-green-700 mb-2">🚀 LAUNCH EMAIL CAMPAIGNS 🚀</h2>
          <p className="text-green-800">Start sending emails to your leads right now!</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {Object.entries(campaignTemplates).map(([key, template]) => (
            <div 
              key={key}
              onClick={() => setSelectedCampaign(key)}
              className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                selectedCampaign === key 
                  ? 'border-green-500 bg-white shadow-md' 
                  : 'border-green-300 bg-white hover:border-green-400'
              }`}
            >
              <div className="text-center">
                <div className="text-2xl mb-2">{template.icon}</div>
                <h4 className="font-bold text-green-700">{template.name}</h4>
                <p className="text-sm text-gray-600 mt-1">{template.description}</p>
              </div>
            </div>
          ))}
        </div>

        {selectedCampaign && (
          <div className="bg-white border-2 border-green-300 rounded-lg p-4">
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
          <Alert className={result.success ? 'border-green-200 bg-green-50 mt-4' : 'border-red-200 bg-red-50 mt-4'}>
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
    </div>
  );
}

// Legacy components no longer used in the new design
function OldLeadSourcesComponent() {
  const [leads, setLeads] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchLeads = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/leads');
      if (response.ok) {
        const leadsData = await response.json();
        setLeads(leadsData);
      }
    } catch (error) {
      console.error('Failed to fetch leads:', error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const leadSources = [
    {
      name: 'Current Lead Database',
      icon: '🗃️',
      count: leads.length,
      description: 'Your existing leads in the system',
      action: () => window.location.href = '/lead-engine'
    },
    {
      name: 'Apollo.io Import',
      icon: '🚀',
      count: 'Unlimited',
      description: 'Import B2B leads from Apollo.io',
      action: () => window.location.href = '/lead-engine'
    },
    {
      name: 'LinkedIn Sales Navigator',
      icon: '💼',
      count: 'Pro Access',
      description: 'Extract leads from LinkedIn searches',
      action: () => window.location.href = '/lead-engine'
    },
    {
      name: 'HubSpot CRM',
      icon: '🔗',
      count: 'Sync Ready',
      description: 'Import from your HubSpot CRM',
      action: () => window.location.href = '/lead-engine'
    },
    {
      name: 'CSV Upload',
      icon: '📂',
      count: 'File Ready',
      description: 'Upload your own lead lists',
      action: () => window.location.href = '/lead-engine'
    },
    {
      name: 'Website Forms',
      icon: '🌐',
      count: 'Live Capture',
      description: 'Leads from your website forms',
      action: () => window.location.href = '/lead-engine'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {leadSources.map((source) => (
          <div 
            key={source.name}
            onClick={source.action}
            className="p-4 border-2 border-purple-300 rounded-lg cursor-pointer hover:border-purple-500 hover:bg-purple-100 transition-all"
          >
            <div className="text-center">
              <div className="text-3xl mb-2">{source.icon}</div>
              <h4 className="font-bold text-purple-700">{source.name}</h4>
              <div className="text-xl font-bold text-purple-600 mt-1">{source.count}</div>
              <p className="text-sm text-gray-600 mt-2">{source.description}</p>
            </div>
          </div>
        ))}
      </div>

      {leads.length > 0 && (
        <div className="p-4 bg-white border-2 border-purple-300 rounded-lg">
          <h4 className="text-lg font-bold text-purple-600 mb-3">📧 QUICK EMAIL EXPORT</h4>
          <p className="text-sm text-gray-600 mb-3">
            Export emails from your current {leads.length} leads to paste into campaigns:
          </p>
          <div className="flex gap-3">
            <Button 
              onClick={() => {
                const emails = leads.map(lead => lead.email).filter(Boolean).join('\n');
                navigator.clipboard.writeText(emails);
                alert(`✅ Copied ${leads.filter(lead => lead.email).length} emails to clipboard!`);
              }}
              className="bg-purple-600 hover:bg-purple-700"
            >
              <Copy className="h-4 w-4 mr-2" />
              Copy All Emails
            </Button>
            <Button 
              variant="outline"
              onClick={() => window.location.href = '/lead-engine'}
              className="border-purple-400 text-purple-600"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Manage in Lead Engine
            </Button>
          </div>
        </div>
      )}
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