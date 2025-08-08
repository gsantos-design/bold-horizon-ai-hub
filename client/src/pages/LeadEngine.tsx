import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircle, Download, Users, TrendingUp, Target, MessageSquare, Zap, Filter, Star, Calendar, Building2, MapPin, DollarSign, Settings, Copy, ExternalLink, Play, CheckCircle2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

interface Lead {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  status: string;
  source: string;
  ownerEmail?: string;
  notes?: string;
  lastContactDate?: string;
  nextFollowUp?: string;
  createdAt: string;
  updatedAt: string;
  company?: string;
  title?: string;
  industry?: string;
  companySize?: string;
  location?: string;
  aiScore?: number;
  linkedinUrl?: string;
  estimatedDealAmount?: number;
  dealProbability?: number;
}

interface TargetingCriteria {
  industries: string[];
  companySizes: string[];
  titles: string[];
  locations: string[];
  revenueRange: string;
  employeeGrowth: boolean;
  hiringActivity: boolean;
}

interface OutreachTemplate {
  id: string;
  name: string;
  type: 'email' | 'linkedin';
  stage: number;
  subject?: string;
  content: string;
  personalizable: string[];
}

interface AutomationWorkflow {
  id: string;
  name: string;
  trigger: string;
  steps: Array<{
    type: 'email' | 'linkedin' | 'wait' | 'task';
    delay: number;
    template?: string;
    action?: string;
  }>;
  active: boolean;
}

export default function LeadEngine() {
  const [userEmail, setUserEmail] = useState("nolly@santiago-team.com");
  const [userRole, setUserRole] = useState<"team" | "founder">("founder");
  const [activeTab, setActiveTab] = useState("dashboard");
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [automationActive, setAutomationActive] = useState(false);
  
  // Santiago-specific targeting criteria
  const [targetingCriteria, setTargetingCriteria] = useState<TargetingCriteria>({
    industries: ['Financial Services', 'Insurance', 'Real Estate', 'Professional Services', 'Healthcare', 'Technology'],
    companySizes: ['51-200', '201-500', '501-1000', '1001-5000'],
    titles: ['CEO', 'Founder', 'Managing Director', 'VP Sales', 'Sales Director', 'Business Owner', 'Partner'],
    locations: ['Florida', 'New York', 'Miami-Dade', 'Broward County'],
    revenueRange: '$1M-$50M',
    employeeGrowth: true,
    hiringActivity: true
  });
  
  // Santiago outreach templates
  const outreachTemplates: OutreachTemplate[] = [
    {
      id: 'email-stage1',
      name: 'Value-First Opener',
      type: 'email',
      stage: 1,
      subject: 'Quick question about {COMPANY} revenue growth strategy',
      content: `Hi {FIRST_NAME},

I noticed {COMPANY} has been growing steadily in {INDUSTRY}. Congratulations on that momentum!

I'm Pablo Santiago with WFG, and I've been helping business leaders like yourself create multiple income streams that often 5x-10x their current revenue through systematic approaches.

Just last month, one of our partners went from $180K annually to over $600K using our proven system - without working more hours.

Would you be open to a brief conversation about how leaders in {INDUSTRY} are building these additional revenue streams?

Best regards,
Pablo Santiago
The Santiago Team - WFG
P: 407-777-1087

P.S. This isn't about replacing what you're doing - it's about multiplying it.`,
      personalizable: ['COMPANY', 'FIRST_NAME', 'INDUSTRY']
    },
    {
      id: 'email-stage2',
      name: 'Case Study Follow-up',
      type: 'email',
      stage: 2,
      subject: 'That {INDUSTRY} success story I mentioned',
      content: `Hi {FIRST_NAME},

Following up on my message about revenue multiplication strategies.

Here's that case study I mentioned: Maria was running a successful consulting firm in {INDUSTRY}, making about $200K annually. She joined our Santiago Team system 18 months ago.

Today she's generated over $850K in combined income:
• Her original business: $220K (grew 10%)
• WFG system income: $630K (new stream)

The key? She didn't change her core business. She added a systematic approach to wealth building that now generates 3x her original income.

I'd love to show you exactly how this works. Are you available for a 15-minute conversation this week?

Click here to grab a time that works: [CALENDLY_LINK]

Best,
Paul Santiago
The Santiago Team

P.S. The system works especially well for leaders in {INDUSTRY} because of the trust and relationships you already have.`,
      personalizable: ['FIRST_NAME', 'INDUSTRY', 'CALENDLY_LINK']
    },
    {
      id: 'email-stage3',
      name: 'Final Touch - Soft Close',
      type: 'email',
      stage: 3,
      subject: 'Last chance - {COMPANY} income multiplication',
      content: `{FIRST_NAME},

I know you're busy running {COMPANY}, so I'll keep this brief.

Last week, I shared how leaders in {INDUSTRY} are systematically building additional income streams that often exceed their primary business revenue.

Since I haven't heard back, I'm guessing either:
1. The timing isn't right
2. You're not interested in additional revenue streams
3. My emails got buried (happens to the best of us!)

If it's #3, here's one last opportunity to see how Nolly and I have helped hundreds of professionals add $300K-$800K annually to their income:

[CALENDLY_LINK]

If it's #1 or #2, no worries at all - I'll stop following up.

Either way, continued success with {COMPANY}!

Best,
Paul Santiago
The Santiago Team
407-777-1087`,
      personalizable: ['FIRST_NAME', 'COMPANY', 'INDUSTRY', 'CALENDLY_LINK']
    },
    {
      id: 'linkedin-stage1',
      name: 'LinkedIn Connection Request',
      type: 'linkedin',
      stage: 1,
      content: `Hi {FIRST_NAME}, I see you're leading {COMPANY} in {INDUSTRY}. I help business leaders like yourself build systematic additional income streams. Would love to connect and share some insights that might be valuable for your growth strategy.`,
      personalizable: ['FIRST_NAME', 'COMPANY', 'INDUSTRY']
    },
    {
      id: 'linkedin-stage2', 
      name: 'LinkedIn Follow-up Message',
      type: 'linkedin',
      stage: 2,
      content: `Thanks for connecting, {FIRST_NAME}! I noticed {COMPANY} has been making great progress in {INDUSTRY}. 

I'm Paul Santiago with WFG's Santiago Team. We've developed a system that helps leaders like yourself create multiple income streams - often 5x-10x current revenue without working more hours.

Just helped a {INDUSTRY} leader go from $180K to $600K annually using our proven approach.

Would you be open to a brief conversation about how this might apply to your situation? Happy to share the specific strategy over a quick call.

Best,
Paul`,
      personalizable: ['FIRST_NAME', 'COMPANY', 'INDUSTRY']
    }
  ];
  
  // Automation workflows
  const automationWorkflows: AutomationWorkflow[] = [
    {
      id: 'santiago-sequence',
      name: 'Santiago 3-Stage Email Sequence',
      trigger: 'New lead added',
      steps: [
        { type: 'wait', delay: 0, action: 'Lead enters system' },
        { type: 'email', delay: 0, template: 'email-stage1' },
        { type: 'wait', delay: 3, action: 'Wait 3 days' },
        { type: 'email', delay: 3, template: 'email-stage2' },
        { type: 'wait', delay: 4, action: 'Wait 4 days' },
        { type: 'email', delay: 7, template: 'email-stage3' },
        { type: 'task', delay: 10, action: 'Manual follow-up if no response' }
      ],
      active: true
    },
    {
      id: 'linkedin-sequence',
      name: 'LinkedIn Outreach Flow',
      trigger: 'LinkedIn URL available',
      steps: [
        { type: 'linkedin', delay: 0, template: 'linkedin-stage1' },
        { type: 'wait', delay: 2, action: 'Wait for connection acceptance' },
        { type: 'linkedin', delay: 2, template: 'linkedin-stage2' },
        { type: 'wait', delay: 5, action: 'Wait 5 days' },
        { type: 'task', delay: 5, action: 'Review for email sequence' }
      ],
      active: false
    }
  ];

  const { data: leads = [], isLoading, refetch } = useQuery({
    queryKey: ["/api/leads"],
    queryFn: async () => {
      const response = await fetch("/api/leads", {
        headers: {
          "x-user-email": userEmail,
          "x-user-role": userRole,
        },
      });
      if (!response.ok) throw new Error("Failed to fetch leads");
      return response.json();
    },
  });

  const handleExportCSV = async () => {
    try {
      const response = await fetch("/api/leads/export", {
        headers: {
          "x-user-email": userEmail,
          "x-user-role": userRole,
        },
      });
      
      if (!response.ok) throw new Error("Failed to export leads");
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `leads-export-${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error exporting leads:", error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new": return "bg-blue-100 text-blue-800";
      case "contacted": return "bg-yellow-100 text-yellow-800";
      case "meeting_booked": return "bg-green-100 text-green-800";
      case "closed": return "bg-emerald-100 text-emerald-800";
      case "lost": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const groupedLeads = leads.reduce((acc: Record<string, Lead[]>, lead: Lead) => {
    const status = lead.status || "new";
    if (!acc[status]) acc[status] = [];
    acc[status].push(lead);
    return acc;
  }, {});

  const statuses = ["new", "contacted", "meeting_booked", "closed", "lost"];

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading leads...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <img 
              src="/nolly-santiago.png" 
              alt="Nolly Santiago" 
              className="w-16 h-16 rounded-full object-cover border-2 border-purple-200"
            />
            <img 
              src="/paul-santiago.png" 
              alt="Paul Santiago" 
              className="w-16 h-16 rounded-full object-cover border-2 border-blue-200"
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Santiago Lead Engine</h1>
            <p className="text-gray-600 mt-2">Fast-track B2B outreach system for Nolly &amp; Paul Santiago</p>
          </div>
        </div>
        
        <div className="flex gap-4 items-center">
          {/* Demo user controls */}
          <div className="flex gap-2 items-center">
            <label className="text-sm text-gray-600">Demo User:</label>
            <select 
              value={userRole} 
              onChange={(e) => setUserRole(e.target.value as "team" | "founder")}
              className="px-3 py-1 border rounded"
            >
              <option value="founder">Founder</option>
              <option value="team">Team Member</option>
            </select>
          </div>
          
          <Button variant="outline" onClick={handleExportCSV}>
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
          
          <Button onClick={() => window.location.href = "/lead-engine/board"}>
            <PlusCircle className="h-4 w-4 mr-2" />
            Board View
          </Button>
        </div>
      </div>

      {/* Fast-Track Plan Progress */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 mb-8 border border-blue-200">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">🚀 Fast-Track Santiago Lead Engine Plan</h2>
            <p className="text-gray-600">3-5 Day Implementation Timeline</p>
          </div>
          <Badge className="bg-green-100 text-green-800 px-3 py-1">
            <CheckCircle2 className="h-4 w-4 mr-1" />
            System Ready
          </Badge>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="bg-white rounded-lg p-4 border border-green-200">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
              <span className="font-semibold text-green-900">Day 1</span>
            </div>
            <div className="text-sm text-gray-600">Target Persona &amp; Tools Setup</div>
          </div>
          
          <div className="bg-white rounded-lg p-4 border border-blue-200">
            <div className="flex items-center gap-2 mb-2">
              <Target className="h-5 w-5 text-blue-600" />
              <span className="font-semibold text-blue-900">Day 2</span>
            </div>
            <div className="text-sm text-gray-600">Data Pull &amp; AI Scoring</div>
          </div>
          
          <div className="bg-white rounded-lg p-4 border border-purple-200">
            <div className="flex items-center gap-2 mb-2">
              <MessageSquare className="h-5 w-5 text-purple-600" />
              <span className="font-semibold text-purple-900">Day 3</span>
            </div>
            <div className="text-sm text-gray-600">Outreach System Live</div>
          </div>
          
          <div className="bg-white rounded-lg p-4 border border-orange-200">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="h-5 w-5 text-orange-600" />
              <span className="font-semibold text-orange-900">Days 4-5</span>
            </div>
            <div className="text-sm text-gray-600">Live Test &amp; Adjust</div>
          </div>
          
          <div className="bg-white rounded-lg p-4 border border-emerald-200">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-5 w-5 text-emerald-600" />
              <span className="font-semibold text-emerald-900">Result</span>
            </div>
            <div className="text-sm text-gray-600">Warm responses &amp; bookings</div>
          </div>
        </div>
      </div>

      {/* Main Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="dashboard" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Dashboard
          </TabsTrigger>
          <TabsTrigger value="targeting" className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            Targeting
          </TabsTrigger>
          <TabsTrigger value="scripts" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            Scripts
          </TabsTrigger>
          <TabsTrigger value="automation" className="flex items-center gap-2">
            <Zap className="h-4 w-4" />
            Automation
          </TabsTrigger>
          <TabsTrigger value="results" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Results
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{leads.length}</div>
                <p className="text-xs text-muted-foreground">B2B prospects in pipeline</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">High-Value Targets</CardTitle>
                <Star className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">47</div>
                <p className="text-xs text-muted-foreground">AI Score {'>'}  80</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Response Rate</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">23.5%</div>
                <p className="text-xs text-muted-foreground">Above industry avg (12%)</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Meetings Booked</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600">{groupedLeads.meeting_booked?.length || 0}</div>
                <p className="text-xs text-muted-foreground">This week: +3</p>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button className="h-auto p-4 flex flex-col items-start bg-blue-50 hover:bg-blue-100 text-blue-900 border border-blue-200">
                  <ExternalLink className="h-5 w-5 mb-2" />
                  <div className="text-left">
                    <div className="font-semibold">Import from Apollo.io</div>
                    <div className="text-xs opacity-75">Pull 1000+ targeted leads</div>
                  </div>
                </Button>
                
                <Button className="h-auto p-4 flex flex-col items-start bg-purple-50 hover:bg-purple-100 text-purple-900 border border-purple-200">
                  <Play className="h-5 w-5 mb-2" />
                  <div className="text-left">
                    <div className="font-semibold">Start Outreach Campaign</div>
                    <div className="text-xs opacity-75">Launch Santiago sequence</div>
                  </div>
                </Button>
                
                <Button className="h-auto p-4 flex flex-col items-start bg-green-50 hover:bg-green-100 text-green-900 border border-green-200">
                  <Settings className="h-5 w-5 mb-2" />
                  <div className="text-left">
                    <div className="font-semibold">Sync Calendly</div>
                    <div className="text-xs opacity-75">Auto-book meetings</div>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Deal Amount Estimator - NEW v12 Feature */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Deal Amount Estimator
              </CardTitle>
              <p className="text-sm text-gray-600">
                Calculate potential deal values based on lead profile and company data
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Input Criteria */}
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Company Revenue Range
                    </label>
                    <select className="w-full p-2 border rounded-md">
                      <option value="startup">$0-$1M (Startup)</option>
                      <option value="small">$1M-$5M (Small Business)</option>
                      <option value="medium">$5M-$25M (Medium Business)</option>
                      <option value="large">$25M-$100M (Large Business)</option>
                      <option value="enterprise">$100M+ (Enterprise)</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Decision Maker Level
                    </label>
                    <select className="w-full p-2 border rounded-md">
                      <option value="c-level">C-Level (CEO, CFO, etc.)</option>
                      <option value="vp">VP Level</option>
                      <option value="director">Director Level</option>
                      <option value="manager">Manager Level</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Industry Type
                    </label>
                    <select className="w-full p-2 border rounded-md">
                      <option value="financial">Financial Services</option>
                      <option value="real-estate">Real Estate</option>
                      <option value="healthcare">Healthcare</option>
                      <option value="professional">Professional Services</option>
                      <option value="technology">Technology</option>
                      <option value="manufacturing">Manufacturing</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Geographic Market
                    </label>
                    <select className="w-full p-2 border rounded-md">
                      <option value="florida">Florida</option>
                      <option value="new-york">New York</option>
                      <option value="caribbean">Caribbean</option>
                      <option value="puerto-rico">Puerto Rico</option>
                    </select>
                  </div>
                </div>
                
                {/* Estimated Results */}
                <div className="space-y-4">
                  <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
                    <h4 className="font-semibold text-green-900 mb-2">Estimated Deal Value</h4>
                    <div className="text-2xl font-bold text-green-700">$15,000 - $45,000</div>
                    <div className="text-sm text-green-600 mt-1">Annual premium potential</div>
                  </div>
                  
                  <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                    <h4 className="font-semibold text-yellow-900 mb-2">Commission Estimate</h4>
                    <div className="text-xl font-bold text-yellow-700">$2,250 - $6,750</div>
                    <div className="text-sm text-yellow-600 mt-1">First year commission (15% avg)</div>
                  </div>
                  
                  <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <h4 className="font-semibold text-purple-900 mb-2">Success Probability</h4>
                    <div className="flex items-center gap-2">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-purple-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                      </div>
                      <span className="text-purple-700 font-medium">75%</span>
                    </div>
                    <div className="text-sm text-purple-600 mt-1">Based on Santiago team historical data</div>
                  </div>
                  
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="font-semibold text-blue-900 mb-2">Recommended Approach</h4>
                    <div className="text-sm text-blue-700 space-y-1">
                      <div>• Use Case Study opener (CEO level)</div>
                      <div>• Focus on multi-handed income strategy</div>
                      <div>• Schedule 30-min discovery call</div>
                      <div>• Follow up within 48 hours</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="targeting" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Santiago Lead Targeting Blueprint
              </CardTitle>
              <p className="text-sm text-gray-600 mt-2">
                Exact filters for Apollo.io / LinkedIn Sales Navigator to find high-value WFG prospects
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Target Industries */}
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Building2 className="h-4 w-4" />
                    Target Industries
                  </h4>
                  <div className="space-y-2">
                    {targetingCriteria.industries.map((industry, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span className="text-sm">{industry}</span>
                        <Badge variant="secondary">High-Value</Badge>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Decision Maker Titles */}
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Decision Maker Titles
                  </h4>
                  <div className="space-y-2">
                    {targetingCriteria.titles.map((title, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span className="text-sm">{title}</span>
                        <Badge variant="secondary">C-Level</Badge>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Geographic Focus */}
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Geographic Focus
                  </h4>
                  <div className="space-y-2">
                    {targetingCriteria.locations.map((location, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span className="text-sm">{location}</span>
                        <Badge variant="secondary">Santiago Territory</Badge>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Company Criteria */}
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <DollarSign className="h-4 w-4" />
                    Company Criteria
                  </h4>
                  <div className="space-y-3">
                    <div className="p-3 bg-blue-50 rounded border border-blue-200">
                      <div className="font-medium text-blue-900">Revenue Range</div>
                      <div className="text-sm text-blue-700">{targetingCriteria.revenueRange}</div>
                    </div>
                    
                    <div className="p-3 bg-green-50 rounded border border-green-200">
                      <div className="font-medium text-green-900">Company Sizes</div>
                      <div className="text-sm text-green-700">{targetingCriteria.companySizes.join(', ')} employees</div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <input type="checkbox" checked={targetingCriteria.employeeGrowth} readOnly />
                        <span className="text-sm">Employee growth in last 6 months</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <input type="checkbox" checked={targetingCriteria.hiringActivity} readOnly />
                        <span className="text-sm">Active hiring (signals budget)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Export Targeting Criteria */}
              <div className="pt-6 border-t">
                <div className="flex gap-3">
                  <Button className="flex items-center gap-2">
                    <Copy className="h-4 w-4" />
                    Copy Apollo.io Filters
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2">
                    <ExternalLink className="h-4 w-4" />
                    Export to Sales Navigator
                  </Button>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  These criteria will help you pull 1,000-2,000 qualified leads for AI scoring
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="scripts" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Template Library */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Santiago Scripts</CardTitle>
                  <p className="text-sm text-gray-600">Paul &amp; Nolly's proven templates</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {outreachTemplates.map((template) => (
                      <Button
                        key={template.id}
                        variant={selectedTemplate === template.id ? "default" : "outline"}
                        className="w-full justify-start text-left"
                        onClick={() => setSelectedTemplate(template.id)}
                      >
                        <div>
                          <div className="font-medium">{template.name}</div>
                          <div className="text-xs opacity-75">
                            {template.type.toUpperCase()} • Stage {template.stage}
                          </div>
                        </div>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Template Preview */}
            <div className="lg:col-span-2">
              {selectedTemplate && (
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>
                          {outreachTemplates.find(t => t.id === selectedTemplate)?.name}
                        </CardTitle>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge>
                            {outreachTemplates.find(t => t.id === selectedTemplate)?.type.toUpperCase()}
                          </Badge>
                          <Badge variant="secondary">
                            Stage {outreachTemplates.find(t => t.id === selectedTemplate)?.stage}
                          </Badge>
                        </div>
                      </div>
                      <Button size="sm" className="flex items-center gap-1">
                        <Copy className="h-3 w-3" />
                        Copy
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {outreachTemplates.find(t => t.id === selectedTemplate)?.subject && (
                      <div className="mb-4">
                        <div className="text-sm font-medium text-gray-600 mb-1">Subject Line:</div>
                        <div className="p-2 bg-gray-50 rounded text-sm font-medium">
                          {outreachTemplates.find(t => t.id === selectedTemplate)?.subject}
                        </div>
                      </div>
                    )}
                    
                    <div className="mb-4">
                      <div className="text-sm font-medium text-gray-600 mb-1">Message Content:</div>
                      <div className="p-4 bg-gray-50 rounded whitespace-pre-wrap text-sm leading-relaxed">
                        {outreachTemplates.find(t => t.id === selectedTemplate)?.content}
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-sm font-medium text-gray-600 mb-2">Personalization Fields:</div>
                      <div className="flex flex-wrap gap-2">
                        {outreachTemplates.find(t => t.id === selectedTemplate)?.personalizable.map((field, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {field}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
              
              {!selectedTemplate && (
                <Card>
                  <CardContent className="text-center py-12">
                    <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Select a Template</h3>
                    <p className="text-gray-600">Choose a script from the left to preview and customize</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="automation" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Santiago Automation Workflows
              </CardTitle>
              <p className="text-sm text-gray-600 mt-2">
                Automated sequences that run in Apollo.io or HubSpot
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {automationWorkflows.map((workflow) => (
                  <div key={workflow.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="font-semibold">{workflow.name}</h4>
                        <p className="text-sm text-gray-600">Trigger: {workflow.trigger}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={workflow.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                          {workflow.active ? 'Active' : 'Inactive'}
                        </Badge>
                        <Button size="sm" variant="outline">
                          {workflow.active ? 'Pause' : 'Activate'}
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      {workflow.steps.map((step, index) => (
                        <div key={index} className="flex items-center gap-3 p-2 bg-gray-50 rounded">
                          <div className="w-6 h-6 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center text-xs font-medium">
                            {index + 1}
                          </div>
                          <div className="flex-1">
                            {step.type === 'email' && (
                              <span className="text-sm">Send email: {step.template}</span>
                            )}
                            {step.type === 'linkedin' && (
                              <span className="text-sm">LinkedIn: {step.template}</span>
                            )}
                            {step.type === 'wait' && (
                              <span className="text-sm">Wait {step.delay} days</span>
                            )}
                            {step.type === 'task' && (
                              <span className="text-sm">{step.action}</span>
                            )}
                          </div>
                          {step.delay > 0 && (
                            <Badge variant="secondary" className="text-xs">
                              +{step.delay}d
                            </Badge>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="results" className="space-y-6">
          {/* Leads Table */}
          <Card>
            <CardHeader>
              <CardTitle>Lead Pipeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Name</th>
                      <th className="text-left p-2">Company</th>
                      <th className="text-left p-2">Title</th>
                      <th className="text-left p-2">Deal Value</th>
                      <th className="text-left p-2">Probability</th>
                      <th className="text-left p-2">AI Score</th>
                      <th className="text-left p-2">Status</th>
                      <th className="text-left p-2">Last Contact</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leads.map((lead: Lead) => (
                      <tr key={lead.id} className="border-b hover:bg-gray-50">
                        <td className="p-2">
                          <div className="font-medium">
                            {lead.firstName} {lead.lastName}
                          </div>
                          <div className="text-sm text-gray-500">{lead.email}</div>
                        </td>
                        <td className="p-2">
                          <div className="text-sm">{lead.company || 'N/A'}</div>
                          <div className="text-xs text-gray-500">{lead.industry || ''}</div>
                        </td>
                        <td className="p-2 text-sm text-gray-600">{lead.title || 'N/A'}</td>
                        <td className="p-2">
                          {lead.estimatedDealAmount ? (
                            <div className="text-sm font-medium text-green-700">
                              ${lead.estimatedDealAmount.toLocaleString()}
                            </div>
                          ) : (
                            <span className="text-xs text-gray-400">-</span>
                          )}
                        </td>
                        <td className="p-2">
                          {lead.dealProbability ? (
                            <div className="flex items-center gap-2">
                              <div className="w-12 bg-gray-200 rounded-full h-2">
                                <div 
                                  className={`h-2 rounded-full ${
                                    lead.dealProbability >= 75 ? 'bg-green-500' :
                                    lead.dealProbability >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                                  }`}
                                  style={{ width: `${Math.round(lead.dealProbability * 100)}%` }}
                                ></div>
                              </div>
                              <span className="text-xs">{Math.round(lead.dealProbability * 100)}%</span>
                            </div>
                          ) : (
                            <span className="text-xs text-gray-400">-</span>
                          )}
                        </td>
                        <td className="p-2">
                          {lead.aiScore ? (
                            <div className="flex items-center gap-1">
                              <Star className={`h-4 w-4 ${lead.aiScore >= 80 ? 'text-green-500' : lead.aiScore >= 60 ? 'text-yellow-500' : 'text-gray-400'}`} />
                              <span className="text-sm font-medium">{lead.aiScore}</span>
                            </div>
                          ) : (
                            <span className="text-sm text-gray-400">—</span>
                          )}
                        </td>
                        <td className="p-2">
                          <Badge className={getStatusColor(lead.status)}>
                            {lead.status.replace("_", " ").toUpperCase()}
                          </Badge>
                        </td>
                        <td className="p-2 text-sm text-gray-600">
                          {lead.lastContactDate ? new Date(lead.lastContactDate).toLocaleDateString() : 'Never'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                
                {leads.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <Target className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Ready to Launch</h3>
                    <p className="text-gray-600 mb-4">Import your first batch of leads to start the Santiago system</p>
                    <Button className="flex items-center gap-2">
                      <ExternalLink className="h-4 w-4" />
                      Import from Apollo.io
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}