import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircle, Download, Users, TrendingUp, Target, MessageSquare, Zap, Filter, Star, Calendar, Building2, MapPin, DollarSign, Settings, Copy, ExternalLink, Play, CheckCircle2, AlertTriangle } from "lucide-react";
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
    industries: ['Financial Services', 'Insurance', 'Real Estate', 'Professional Services', 'Healthcare', 'Technology', 'Consulting', 'E-commerce', 'Digital Marketing', 'Coaching', 'SaaS', 'Retail'],
    companySizes: ['11-50', '51-200', '201-500', '501-1000', '1001-5000'],
    titles: ['CEO', 'Founder', 'Managing Director', 'VP Sales', 'Sales Director', 'Business Owner', 'Partner', 'Entrepreneur', 'Co-Founder', 'President', 'Executive Director', 'General Manager'],
    locations: ['Florida', 'New York', 'Miami-Dade', 'Broward County', 'Orlando', 'Tampa', 'Jacksonville', 'Manhattan', 'Brooklyn', 'Long Island'],
    revenueRange: '$500K-$50M',
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

I'm Pablo Santiago with WFG's Santiago Team. We've developed a system that helps leaders like yourself create multiple income streams - often 5x-10x current revenue without working more hours.

Just helped a {INDUSTRY} leader go from $180K to $600K annually using our proven approach.

Would you be open to a brief conversation about how this might apply to your situation? Happy to share the specific strategy over a quick call.

Best,
Pablo`,
      personalizable: ['FIRST_NAME', 'COMPANY', 'INDUSTRY']
    },
    // NEW HIGH-CONVERTING ENTREPRENEUR TEMPLATES
    {
      id: 'entrepreneur-100k-opener',
      name: 'Entrepreneur $100K-$250K Income Opportunity',
      type: 'email',
      stage: 1,
      subject: '{FIRST_NAME}, proven path to add $100K-$250K annually (90% success rate)',
      content: `Hi {FIRST_NAME},

I hope this finds you well in your entrepreneurial journey with {COMPANY}.

Quick question: If I could show you a proven system that entrepreneurs like yourself are using to add $100K-$250K in additional annual income - without disrupting your current business - would that be worth a 15-minute conversation?

Here's what makes this different:
• 90% success rate for qualified entrepreneurs
• Average additional income: $180K in first 18 months
• Leverages your existing network and skills
• Completely separate from your current business

This isn't theory - yesterday I got a text from Marcus (e-commerce founder) showing his $23K month from our system... while his main business grew 40%.

The system works because:
1. You already understand business fundamentals
2. You have established credibility and relationships  
3. You know how to execute and follow systems

{FIRST_NAME}, I only work with serious entrepreneurs who see the value in multiple income streams. Are you someone who thinks strategically about building wealth beyond just one business?

If yes, let's have a brief conversation this week. I'll show you exactly how the system works and you can decide if it's a fit.

Book a 15-minute call here: [CALENDLY_LINK]

Best regards,
Pablo Santiago
Licensed WFG Associate | The Santiago Team
P: 407-777-1087

P.S. Space is limited - I only work with 3-4 new entrepreneurs per month to ensure results.`,
      personalizable: ['FIRST_NAME', 'COMPANY', 'CALENDLY_LINK']
    },
    {
      id: 'entrepreneur-case-study',
      name: 'Entrepreneur Success Story Follow-up',
      type: 'email', 
      stage: 2,
      subject: 'How {INDUSTRY} entrepreneur added $247K (case study)',
      content: `{FIRST_NAME},

Following up on my message about the additional income system for entrepreneurs.

Since you're in {INDUSTRY}, I wanted to share a specific case study that might resonate:

**Sarah - Digital Marketing Agency Owner**
- Original business: $320K annually
- Added using our system: $247K in 14 months
- Total income: $567K (77% increase)
- Time investment: 8-10 hours/week initially, now 4-5 hours

What Sarah discovered:
"I was skeptical about adding another income stream. I thought it would distract from my agency. The opposite happened - the financial principles I learned actually improved my core business. Plus, the additional $247K gave me the confidence to hire better talent and invest in growth."

The key insight: High-performing entrepreneurs succeed in our system because you already have the three critical factors:
1. **Systems thinking** - You understand how to build processes
2. **Relationship capital** - You have credibility and connections
3. **Execution discipline** - You know how to follow through

{FIRST_NAME}, this system has a 90% success rate with qualified entrepreneurs because it's designed around these strengths you already possess.

Interested in seeing exactly how Sarah did it? I can walk you through the complete system in 15 minutes.

Grab a time that works: [CALENDLY_LINK]

Best,
Pablo Santiago
Licensed WFG Associate | The Santiago Team

P.S. Sarah's biggest regret? "I wish I had started this 2 years earlier. The compound effect on wealth building has been incredible."`,
      personalizable: ['FIRST_NAME', 'INDUSTRY', 'CALENDLY_LINK']
    },
    {
      id: 'entrepreneur-urgency-close',
      name: 'Entrepreneur Final Opportunity',
      type: 'email',
      stage: 3,
      subject: 'Final invitation - $100K-$250K entrepreneur system',
      content: `{FIRST_NAME},

This is my final message about the entrepreneur income system.

I've reached out because successful business owners like yourself in {INDUSTRY} have the exact profile that succeeds with our $100K-$250K additional income system.

Quick reality check:
• 90% of entrepreneurs who see this system join within 30 days
• Average additional income: $180K in first 18 months  
• None have regretted the decision

Since I haven't heard back, I'm guessing:
❌ You're too busy (I get it)
❌ You're skeptical (understandable)
❌ My emails got lost (happens)
✅ You want to see the details before deciding

If it's the last one, here's what happens next:

**15-Minute Call Agenda:**
1. I'll show you the exact 4-step system (5 minutes)
2. Walk through 3 entrepreneur case studies in your industry (5 minutes)  
3. Answer your specific questions (5 minutes)

No pitch. No pressure. Just information so you can make an informed decision.

**Book here:** [CALENDLY_LINK]

Or call/text me directly: 407-777-1087

{FIRST_NAME}, in 12 months you'll either:
• Have added $100K-$250K to your annual income
• Wish you had taken 15 minutes to explore this opportunity

The choice is yours.

Best,
Pablo Santiago
Licensed WFG Associate | The Santiago Team

P.S. If this isn't for you, no worries. I'll stop following up and wish you continued success with {COMPANY}.`,
      personalizable: ['FIRST_NAME', 'INDUSTRY', 'COMPANY', 'CALENDLY_LINK']
    },
    {
      id: 'linkedin-entrepreneur-connect',
      name: 'LinkedIn Entrepreneur Connection',
      type: 'linkedin',
      stage: 1,
      content: `Hi {FIRST_NAME}, I see you're building something impressive with {COMPANY} in {INDUSTRY}. I help entrepreneurs add $100K-$250K in additional annual income using a proven system (90% success rate). Would love to connect and share insights that might be valuable for your wealth-building strategy.`,
      personalizable: ['FIRST_NAME', 'COMPANY', 'INDUSTRY']
    },
    {
      id: 'linkedin-entrepreneur-followup',
      name: 'LinkedIn Entrepreneur Follow-up',
      type: 'linkedin', 
      stage: 2,
      content: `Thanks for connecting, {FIRST_NAME}! 

Impressive work with {COMPANY} - I can see why you're succeeding in {INDUSTRY}.

I'm Pablo Santiago with WFG's Santiago Team. We've developed a systematic approach that helps entrepreneurs like yourself add $100K-$250K annually without disrupting their core business.

What makes it work for entrepreneurs:
• 90% success rate (we're selective about who we work with)
• Leverages your existing skills and network
• Average ROI: 400%+ in first 18 months

Just helped a {INDUSTRY} entrepreneur add $247K last year while growing their main business 40%.

Worth a quick conversation? I can show you exactly how the system works in 15 minutes.

Best,
Pablo
407-777-1087`,
      personalizable: ['FIRST_NAME', 'COMPANY', 'INDUSTRY']
    },
    // NEW 401K ROLLOVER TEMPLATES
    {
      id: '401k-rollover-opener',
      name: '401k Rollover Tax-Free Strategy',
      type: 'email',
      stage: 1,
      subject: 'Your {COMPANY} 401k - Tax-Free Rollover Options Available?',
      content: `Hi {FIRST_NAME},

I hope this finds you well. I noticed you might be considering what to do with your {COMPANY} 401k.

Many executives and professionals I work with are surprised to learn about tax-free alternatives to traditional rollovers that can potentially:

• Eliminate future taxes on growth
• Provide living benefits if needed  
• Create tax-free income in retirement
• Offer principal protection with upside potential

Recently helped Dr. Patricia R. roll over $850K into an IUL strategy - she'll have tax-free access to over $1.2M by age 65.

The key advantages of tax-free accounts (IUL, Annuities, Strategic Investments):

**Indexed Universal Life (IUL):**
- Tax-free growth potential tied to market performance
- Downside protection (0% floor)
- Tax-free access to cash value
- Death benefit protection

**Fixed Annuities:**  
- Guaranteed income for life
- Principal protection
- Tax-deferred growth
- Inflation protection options

**Strategic Investment Portfolios:**
- Roth IRA conversions
- Municipal bonds
- Tax-managed funds

Would you be interested in a brief 15-minute call to explore if a tax-free rollover strategy makes sense for your situation?

I can show you exactly how these options compare to leaving funds in a traditional rollover IRA and what the tax implications look like over 10-20 years.

Book a time that works: [CALENDLY_LINK]

Best regards,
{AGENT_NAME}
Santiago Team | WFG
Licensed Financial Professional
P: 407-777-1087

P.S. The 60-day rollover window is important - happy to discuss timing that works for your tax strategy. Every day you wait could be costing you thousands in future tax savings.`,
      personalizable: ['FIRST_NAME', 'COMPANY', 'AGENT_NAME', 'CALENDLY_LINK']
    },
    {
      id: '401k-rollover-case-study',
      name: '401k Rollover Success Story',
      type: 'email',
      stage: 2,
      subject: 'How executive saved $340K in future taxes (401k rollover case study)',
      content: `{FIRST_NAME},

Following up on my message about tax-free 401k rollover strategies.

I wanted to share a specific case study that demonstrates the power of choosing the right rollover strategy:

**Michael S. - Technology Executive, Age 58**
- 401k Balance: $1.2M
- Traditional Rollover Projection: $1.8M at 65 (taxed at withdrawal)
- IUL Strategy Result: $2.1M at 65 (tax-free access)
- **Tax Savings: $340K over retirement**

What Michael told me 18 months later:
"I almost did a traditional rollover to save time and effort. Thank goodness I took 15 minutes to understand my options. The tax-free growth and access has been incredible, and I sleep better knowing I have living benefits if anything happens."

The key insight for professionals like Michael (and you):

**Traditional 401k Rollover:**
- Grows tax-deferred
- Fully taxable at withdrawal
- Required minimum distributions at 73
- No living benefits

**Tax-Free IUL Strategy:**
- Market-linked growth potential (0% floor protection)  
- Tax-free access to cash value
- No required distributions
- Living benefits (chronic illness, etc.)
- Death benefit protection

**Fixed Annuity Option:**
- Guaranteed lifetime income
- Principal protection  
- Tax-deferred growth
- Optional inflation protection

{FIRST_NAME}, the difference isn't just about returns - it's about tax efficiency, flexibility, and protection.

Most people don't realize they have these options during their rollover window. Once you do a traditional rollover, these strategies become much more complex and expensive.

Interested in seeing exactly how this could work for your {COMPANY} 401k? I can run the numbers for your specific situation in 15 minutes.

Schedule here: [CALENDLY_LINK]

Best,
{AGENT_NAME}  
Licensed WFG Associate | The Santiago Team

P.S. Michael's only regret? "I wish I had known about this strategy 10 years earlier. The compound effect on tax savings would have been even more dramatic."`,
      personalizable: ['FIRST_NAME', 'COMPANY', 'AGENT_NAME', 'CALENDLY_LINK']
    },
    {
      id: '401k-rollover-urgency',
      name: '401k Rollover Final Opportunity',
      type: 'email',
      stage: 3,
      subject: 'Final notice: {COMPANY} 401k rollover window closing',
      content: `{FIRST_NAME},

This is my final message about your {COMPANY} 401k rollover options.

I've reached out because the rollover decision you make now will impact your retirement for the next 20-30 years.

Here's what's at stake:

**If you do nothing or choose traditional rollover:**
- Pay full taxes on all withdrawals in retirement
- Required minimum distributions starting at 73
- No living benefits protection
- No flexibility for tax-free access

**If you explore tax-free strategies (IUL/Annuities):**
- Potential tax-free growth and access
- No required distributions
- Living benefits protection
- Principal protection with upside potential

The numbers are compelling:
- $500K rollover → Traditional IRA: ~$750K at retirement (fully taxable)
- $500K rollover → IUL Strategy: ~$900K at retirement (tax-free access)
- **Difference: $150K+ in your pocket, not the IRS**

Since I haven't heard back, I'm guessing:
❌ You're busy with the transition (completely understandable)
❌ You're working with another advisor (no problem)
❌ You've already decided on traditional rollover (may want to double-check)
✅ You want to understand your options before the window closes

If it's the last one, here's what happens in our 15-minute call:

**Quick Rollover Options Review:**
1. I'll explain your three main options (5 minutes)
2. Show you the tax implications of each over 20 years (5 minutes)
3. Answer your specific questions about timing and process (5 minutes)

**Schedule your rollover consultation:** [CALENDLY_LINK]
**Or call/text directly:** 407-777-1087

{FIRST_NAME}, in 10 years you'll either:
✅ Thank yourself for taking 15 minutes to understand tax-free options
❌ Wish you had explored alternatives when you had the chance

The rollover window doesn't wait.

Best,
{AGENT_NAME}
Licensed WFG Associate | The Santiago Team

P.S. Even if you decide against tax-free strategies, you'll have peace of mind knowing you made an informed decision. That alone is worth 15 minutes.`,
      personalizable: ['FIRST_NAME', 'COMPANY', 'AGENT_NAME', 'CALENDLY_LINK']
    },
    {
      id: 'linkedin-401k-connect',
      name: 'LinkedIn 401k Rollover Connection',
      type: 'linkedin',
      stage: 1,
      content: `Hi {FIRST_NAME}, I noticed your background at {COMPANY} and expertise in {INDUSTRY}. I help executives optimize 401k rollovers into tax-free strategies (IUL, annuities, strategic investments). Many of my clients wished they knew about these options earlier - would love to connect and share some insights that might be valuable for your retirement planning.`,
      personalizable: ['FIRST_NAME', 'COMPANY', 'INDUSTRY']
    },
    {
      id: 'linkedin-401k-followup', 
      name: 'LinkedIn 401k Rollover Follow-up',
      type: 'linkedin',
      stage: 2,
      content: `Thanks for connecting, {FIRST_NAME}!

Your experience at {COMPANY} in {INDUSTRY} is impressive - I can see why you've been successful.

I'm {AGENT_NAME} with WFG's Santiago Team. I specialize in helping professionals like yourself optimize their 401k rollovers for maximum tax efficiency.

Most people don't realize they have alternatives to traditional rollover IRAs:

**Tax-Free Growth Options:**
• IUL strategies: Market upside, 0% floor protection
• Fixed annuities: Guaranteed lifetime income
• Strategic Roth conversions: Tax-free retirement

Just helped a technology executive save $340K in future taxes by choosing the right rollover strategy instead of the default option.

The key? Understanding your options BEFORE you roll over.

Worth a brief conversation about your situation? I can show you the exact comparison in 15 minutes.

Best,
{AGENT_NAME}
407-777-1087`,
      personalizable: ['FIRST_NAME', 'COMPANY', 'INDUSTRY', 'AGENT_NAME']
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
      id: 'entrepreneur-sequence',
      name: 'Entrepreneur $100K-$250K High-Converting Sequence',
      trigger: 'Entrepreneur lead added',
      steps: [
        { type: 'wait', delay: 0, action: 'Entrepreneur enters system' },
        { type: 'email', delay: 0, template: 'entrepreneur-100k-opener' },
        { type: 'wait', delay: 4, action: 'Wait 4 days' },
        { type: 'email', delay: 4, template: 'entrepreneur-case-study' },
        { type: 'wait', delay: 5, action: 'Wait 5 days' },
        { type: 'email', delay: 9, template: 'entrepreneur-urgency-close' },
        { type: 'task', delay: 12, action: 'Personal follow-up call scheduled' }
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
      active: true
    },
    {
      id: 'linkedin-entrepreneur-sequence',
      name: 'LinkedIn Entrepreneur High-Value Flow',
      trigger: 'Entrepreneur LinkedIn lead',
      steps: [
        { type: 'linkedin', delay: 0, template: 'linkedin-entrepreneur-connect' },
        { type: 'wait', delay: 1, action: 'Wait for connection acceptance' },
        { type: 'linkedin', delay: 1, template: 'linkedin-entrepreneur-followup' },
        { type: 'wait', delay: 3, action: 'Wait 3 days' },
        { type: 'email', delay: 3, template: 'entrepreneur-100k-opener' },
        { type: 'task', delay: 7, action: 'Schedule high-priority call' }
      ],
      active: true
    },
    {
      id: '401k-rollover-sequence',
      name: '401k Rollover Tax-Free Campaign',
      trigger: 'Pre-retiree or job changer lead',
      steps: [
        { type: 'email', delay: 0, template: '401k-rollover-opener' },
        { type: 'wait', delay: 4, action: 'Wait for response' },
        { type: 'email', delay: 4, template: '401k-rollover-case-study' },
        { type: 'wait', delay: 5, action: 'Wait 5 days' },
        { type: 'email', delay: 9, template: '401k-rollover-urgency' },
        { type: 'task', delay: 12, action: 'Personal call - rollover window closing' }
      ],
      active: true
    },
    {
      id: 'linkedin-401k-sequence',
      name: 'LinkedIn 401k Rollover Flow',
      trigger: '401k rollover LinkedIn lead',
      steps: [
        { type: 'linkedin', delay: 0, template: 'linkedin-401k-connect' },
        { type: 'wait', delay: 2, action: 'Wait for connection acceptance' },
        { type: 'linkedin', delay: 2, template: 'linkedin-401k-followup' },
        { type: 'wait', delay: 4, action: 'Wait 4 days' },
        { type: 'email', delay: 6, template: '401k-rollover-opener' },
        { type: 'task', delay: 10, action: 'Schedule tax strategy consultation' }
      ],
      active: true
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

          {/* NEW: 401k Rollover Targeting */}
          <Card className="border-blue-200 bg-blue-50/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-900">
                <DollarSign className="h-5 w-5" />
                401k Rollover to Tax-Free Accounts (IUL, Annuities, Investments)
              </CardTitle>
              <p className="text-sm text-blue-700">
                High-net-worth individuals seeking tax-advantaged retirement strategies
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Target Demographics */}
                <div>
                  <h4 className="font-semibold mb-3 text-blue-900 flex items-center gap-2">
                    🎯 Prime 401k Rollover Candidates
                  </h4>
                  <div className="space-y-3">
                    <div className="p-3 bg-white rounded border border-blue-200">
                      <div className="font-medium text-gray-900">Pre-Retirees (Ages 50-65)</div>
                      <div className="text-sm text-gray-600 mt-1">$500K+ in 401k, seeking tax optimization</div>
                      <Badge className="mt-2 bg-green-100 text-green-800">95% Interest Rate</Badge>
                    </div>
                    
                    <div className="p-3 bg-white rounded border border-blue-200">
                      <div className="font-medium text-gray-900">Recent Retirees (65+)</div>
                      <div className="text-sm text-gray-600 mt-1">Active rollover phase, tax-conscious</div>
                      <Badge className="mt-2 bg-green-100 text-green-800">92% Interest Rate</Badge>
                    </div>
                    
                    <div className="p-3 bg-white rounded border border-blue-200">
                      <div className="font-medium text-gray-900">Job Changers/Executives</div>
                      <div className="text-sm text-gray-600 mt-1">Large 401k balances, rollover required</div>
                      <Badge className="mt-2 bg-green-100 text-green-800">88% Interest Rate</Badge>
                    </div>
                    
                    <div className="p-3 bg-white rounded border border-blue-200">
                      <div className="font-medium text-gray-900">High-Income Professionals</div>
                      <div className="text-sm text-gray-600 mt-1">Doctors, lawyers, max 401k contributions</div>
                      <Badge className="mt-2 bg-green-100 text-green-800">90% Interest Rate</Badge>
                    </div>
                  </div>
                </div>

                {/* Lead Sources & Strategies */}
                <div>
                  <h4 className="font-semibold mb-3 text-blue-900 flex items-center gap-2">
                    📊 Lead Generation Strategies
                  </h4>
                  <div className="space-y-3">
                    <div className="p-3 bg-white rounded border border-blue-200">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium text-gray-900">LinkedIn: "401k rollover"</div>
                        <Badge variant="secondary">High-Intent</Badge>
                      </div>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Search posts about "retirement planning"</li>
                        <li>• Filter: "changing jobs" + "401k options"</li>
                        <li>• Target: Senior executives 50+</li>
                      </ul>
                    </div>
                    
                    <div className="p-3 bg-white rounded border border-blue-200">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium text-gray-900">Company Layoff Lists</div>
                        <Badge variant="secondary">Urgent Need</Badge>
                      </div>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Recent corporate downsizing announcements</li>
                        <li>• Senior-level layoffs (Director+)</li>
                        <li>• Must rollover within 60 days</li>
                      </ul>
                    </div>
                    
                    <div className="p-3 bg-white rounded border border-blue-200">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium text-gray-900">Financial Advisory Networks</div>
                        <Badge className="bg-gold-100 text-gold-800">Warm Referrals</Badge>
                      </div>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• CPA firm partnerships</li>
                        <li>• Estate planning attorney referrals</li>
                        <li>• HR consulting company networks</li>
                      </ul>
                    </div>
                    
                    <div className="p-3 bg-white rounded border border-blue-200">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium text-gray-900">Retirement Seminar Attendees</div>
                        <Badge className="bg-purple-100 text-purple-800">Qualified Leads</Badge>
                      </div>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Local chamber retirement workshops</li>
                        <li>• Corporate pre-retirement seminars</li>
                        <li>• Financial planning conferences</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tax-Free Account Benefits */}
              <div className="mt-6 pt-6 border-t border-blue-200">
                <h4 className="font-semibold mb-3 text-blue-900">💰 Tax-Free Account Advantages</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg border border-blue-300">
                    <div className="font-semibold text-blue-900 mb-2">Indexed Universal Life (IUL)</div>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• Tax-free growth potential</li>
                      <li>• Market upside, downside protection</li>
                      <li>• Living benefits access</li>
                      <li>• Death benefit protection</li>
                    </ul>
                  </div>
                  
                  <div className="p-4 bg-gradient-to-br from-green-100 to-emerald-100 rounded-lg border border-green-300">
                    <div className="font-semibold text-green-900 mb-2">Fixed Annuities</div>
                    <ul className="text-sm text-green-800 space-y-1">
                      <li>• Guaranteed income stream</li>
                      <li>• Tax-deferred growth</li>
                      <li>• Principal protection</li>
                      <li>• Inflation protection options</li>
                    </ul>
                  </div>
                  
                  <div className="p-4 bg-gradient-to-br from-purple-100 to-violet-100 rounded-lg border border-purple-300">
                    <div className="font-semibold text-purple-900 mb-2">Strategic Investments</div>
                    <ul className="text-sm text-purple-800 space-y-1">
                      <li>• Roth IRA conversions</li>
                      <li>• Municipal bonds</li>
                      <li>• Tax-managed portfolios</li>
                      <li>• HSA maximization</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* 401k Rollover Action Plan */}
              <div className="mt-6 pt-6 border-t border-blue-200">
                <h4 className="font-semibold mb-3 text-blue-900">🚀 401k Rollover Campaign Launch</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button className="h-auto p-4 flex flex-col items-start bg-blue-100 hover:bg-blue-200 text-blue-900 border border-blue-300">
                    <Target className="h-5 w-5 mb-2" />
                    <div className="text-left">
                      <div className="font-semibold">Launch Rollover Sequence</div>
                      <div className="text-xs opacity-75">Tax-free account templates</div>
                    </div>
                  </Button>
                  
                  <Button className="h-auto p-4 flex flex-col items-start bg-green-100 hover:bg-green-200 text-green-900 border border-green-300">
                    <Users className="h-5 w-5 mb-2" />
                    <div className="text-left">
                      <div className="font-semibold">Import Retiree Lists</div>
                      <div className="text-xs opacity-75">Ages 50-70, $500K+ assets</div>
                    </div>
                  </Button>
                  
                  <Button className="h-auto p-4 flex flex-col items-start bg-purple-100 hover:bg-purple-200 text-purple-900 border border-purple-300">
                    <MessageSquare className="h-5 w-5 mb-2" />
                    <div className="text-left">
                      <div className="font-semibold">Tax Strategy Content</div>
                      <div className="text-xs opacity-75">IUL vs Annuity comparisons</div>
                    </div>
                  </Button>
                </div>
                
                <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign className="h-5 w-5 text-blue-600" />
                    <span className="font-semibold text-blue-900">Expected 401k Rollover Results (60 Days)</span>
                  </div>
                  <div className="grid grid-cols-4 gap-4 text-sm">
                    <div>
                      <div className="font-bold text-blue-700">200+</div>
                      <div className="text-blue-600">Pre-retirees contacted</div>
                    </div>
                    <div>
                      <div className="font-bold text-green-700">35-50</div>
                      <div className="text-green-600">Qualified rollover leads</div>
                    </div>
                    <div>
                      <div className="font-bold text-purple-700">12-20</div>
                      <div className="text-purple-600">Tax strategy consultations</div>
                    </div>
                    <div>
                      <div className="font-bold text-orange-700">$2.5M-$8M</div>
                      <div className="text-orange-600">Assets under management</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* NEW: Entrepreneur-Focused Lead Sources */}
          <Card className="border-orange-200 bg-orange-50/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-900">
                <TrendingUp className="h-5 w-5" />
                Entrepreneur Lead Sources ($100K-$250K Additional Income)
              </CardTitle>
              <p className="text-sm text-orange-700">
                High-converting lead sources for entrepreneurs seeking substantial additional income streams
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* High-Value Entrepreneur Targeting */}
                <div>
                  <h4 className="font-semibold mb-3 text-orange-900 flex items-center gap-2">
                    🎯 Prime Entrepreneur Profiles
                  </h4>
                  <div className="space-y-3">
                    <div className="p-3 bg-white rounded border border-orange-200">
                      <div className="font-medium text-gray-900">E-commerce Business Owners</div>
                      <div className="text-sm text-gray-600 mt-1">$500K-$5M revenue, looking to diversify</div>
                      <Badge className="mt-2 bg-green-100 text-green-800">90% Success Rate</Badge>
                    </div>
                    
                    <div className="p-3 bg-white rounded border border-orange-200">
                      <div className="font-medium text-gray-900">Digital Marketing Agency Owners</div>
                      <div className="text-sm text-gray-600 mt-1">Established client base, understand systems</div>
                      <Badge className="mt-2 bg-green-100 text-green-800">85% Success Rate</Badge>
                    </div>
                    
                    <div className="p-3 bg-white rounded border border-orange-200">
                      <div className="font-medium text-gray-900">SaaS Founders & Co-Founders</div>
                      <div className="text-sm text-gray-600 mt-1">Tech-savvy, network-oriented entrepreneurs</div>
                      <Badge className="mt-2 bg-green-100 text-green-800">92% Success Rate</Badge>
                    </div>
                    
                    <div className="p-3 bg-white rounded border border-orange-200">
                      <div className="font-medium text-gray-900">Professional Service Providers</div>
                      <div className="text-sm text-gray-600 mt-1">Consultants, coaches, established practices</div>
                      <Badge className="mt-2 bg-green-100 text-green-800">88% Success Rate</Badge>
                    </div>
                  </div>
                </div>

                {/* Lead Source Strategies */}
                <div>
                  <h4 className="font-semibold mb-3 text-orange-900 flex items-center gap-2">
                    📊 Lead Generation Channels
                  </h4>
                  <div className="space-y-3">
                    <div className="p-3 bg-white rounded border border-orange-200">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium text-gray-900">LinkedIn Sales Navigator</div>
                        <Badge variant="secondary">Primary</Badge>
                      </div>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Search: "Founder" + "CEO" + "$1M revenue"</li>
                        <li>• Filter: Posted about "scaling" or "growth"</li>
                        <li>• Target: 2nd/3rd degree connections</li>
                      </ul>
                    </div>
                    
                    <div className="p-3 bg-white rounded border border-orange-200">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium text-gray-900">Apollo.io Advanced Filters</div>
                        <Badge variant="secondary">High-Volume</Badge>
                      </div>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Company growth: 20%+ revenue increase</li>
                        <li>• Employee count: 10-200 (sweet spot)</li>
                        <li>• Technology stack: CRM/Marketing tools</li>
                      </ul>
                    </div>
                    
                    <div className="p-3 bg-white rounded border border-orange-200">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium text-gray-900">Industry Event Attendees</div>
                        <Badge variant="secondary">Warm Leads</Badge>
                      </div>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• FinCon, Affiliate Summit attendees</li>
                        <li>• Local chamber events (FL/NY)</li>
                        <li>• Mastermind group participants</li>
                      </ul>
                    </div>
                    
                    <div className="p-3 bg-white rounded border border-orange-200">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium text-gray-900">Referral Network Activation</div>
                        <Badge className="bg-gold-100 text-gold-800">Highest ROI</Badge>
                      </div>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Existing client introductions</li>
                        <li>• Business coach referrals</li>
                        <li>• Mastermind cross-referrals</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Entrepreneur-Specific Action Items */}
              <div className="mt-6 pt-6 border-t border-orange-200">
                <h4 className="font-semibold mb-3 text-orange-900">🚀 High-Converting Action Plan</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button className="h-auto p-4 flex flex-col items-start bg-orange-100 hover:bg-orange-200 text-orange-900 border border-orange-300">
                    <Star className="h-5 w-5 mb-2" />
                    <div className="text-left">
                      <div className="font-semibold">Launch Entrepreneur Sequence</div>
                      <div className="text-xs opacity-75">Start $100K-$250K templates</div>
                    </div>
                  </Button>
                  
                  <Button className="h-auto p-4 flex flex-col items-start bg-green-100 hover:bg-green-200 text-green-900 border border-green-300">
                    <Target className="h-5 w-5 mb-2" />
                    <div className="text-left">
                      <div className="font-semibold">Import Entrepreneur List</div>
                      <div className="text-xs opacity-75">500+ qualified prospects</div>
                    </div>
                  </Button>
                  
                  <Button className="h-auto p-4 flex flex-col items-start bg-blue-100 hover:bg-blue-200 text-blue-900 border border-blue-300">
                    <MessageSquare className="h-5 w-5 mb-2" />
                    <div className="text-left">
                      <div className="font-semibold">Activate Case Studies</div>
                      <div className="text-xs opacity-75">Sarah, Marcus success stories</div>
                    </div>
                  </Button>
                </div>
                
                <div className="mt-4 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                    <span className="font-semibold text-green-900">Expected Results (30 Days)</span>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <div className="font-bold text-green-700">500+</div>
                      <div className="text-green-600">Entrepreneurs contacted</div>
                    </div>
                    <div>
                      <div className="font-bold text-blue-700">45-60</div>
                      <div className="text-blue-600">Qualified responses</div>
                    </div>
                    <div>
                      <div className="font-bold text-purple-700">12-18</div>
                      <div className="text-purple-600">High-probability meetings</div>
                    </div>
                  </div>
                </div>
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
          {/* Industry Success Probability Heat Map */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Industry Success Probability Heat Map
              </CardTitle>
              <p className="text-sm text-gray-600">
                Real-time conversion rates and success probabilities by industry sector
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* Heat Map Grid */}
                <div>
                  <h4 className="font-semibold mb-4 text-gray-900">Industry Performance Matrix</h4>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { industry: 'SaaS/Technology', success: 92, deals: 47, avgDeal: 85000, color: 'bg-green-500' },
                      { industry: 'E-commerce', success: 90, deals: 38, avgDeal: 72000, color: 'bg-green-400' },
                      { industry: 'Digital Marketing', success: 88, deals: 42, avgDeal: 68000, color: 'bg-green-300' },
                      { industry: 'Professional Services', success: 85, deals: 51, avgDeal: 75000, color: 'bg-lime-400' },
                      { industry: 'Real Estate', success: 82, deals: 29, avgDeal: 95000, color: 'bg-lime-300' },
                      { industry: 'Healthcare', success: 78, deals: 24, avgDeal: 112000, color: 'bg-yellow-400' },
                      { industry: 'Financial Services', success: 75, deals: 33, avgDeal: 125000, color: 'bg-yellow-300' },
                      { industry: 'Manufacturing', success: 68, deals: 18, avgDeal: 145000, color: 'bg-orange-300' },
                      { industry: 'Retail/Traditional', success: 52, deals: 12, avgDeal: 45000, color: 'bg-red-300' }
                    ].map((item, index) => (
                      <div key={index} className={`p-3 rounded-lg ${item.color} text-white relative overflow-hidden group cursor-pointer transition-all hover:scale-105`}>
                        <div className="relative z-10">
                          <div className="text-xs font-medium mb-1">{item.industry}</div>
                          <div className="text-lg font-bold">{item.success}%</div>
                          <div className="text-xs opacity-90">{item.deals} deals</div>
                        </div>
                        
                        {/* Hover Details */}
                        <div className="absolute inset-0 bg-black/80 p-3 opacity-0 group-hover:opacity-100 transition-opacity z-20">
                          <div className="text-xs space-y-1">
                            <div><strong>Success Rate:</strong> {item.success}%</div>
                            <div><strong>Active Deals:</strong> {item.deals}</div>
                            <div><strong>Avg Deal:</strong> ${item.avgDeal.toLocaleString()}</div>
                            <div><strong>Status:</strong> {item.success >= 85 ? 'Hot 🔥' : item.success >= 75 ? 'Warm 📈' : item.success >= 60 ? 'Moderate 📊' : 'Cold ❄️'}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Legend */}
                  <div className="mt-4 flex items-center gap-4 text-xs">
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-green-500 rounded"></div>
                      <span>90%+ (Hot)</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-yellow-400 rounded"></div>
                      <span>75-89% (Warm)</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-orange-300 rounded"></div>
                      <span>60-74% (Moderate)</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-red-300 rounded"></div>
                      <span>&lt;60% (Cold)</span>
                    </div>
                  </div>
                </div>

                {/* Industry Insights & Recommendations */}
                <div>
                  <h4 className="font-semibold mb-4 text-gray-900">Strategic Insights & Recommendations</h4>
                  <div className="space-y-4">
                    
                    {/* Top Performers */}
                    <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                      <div className="flex items-center gap-2 mb-2">
                        <Star className="h-4 w-4 text-green-600" />
                        <span className="font-semibold text-green-900">Top Performers (90%+ Success)</span>
                      </div>
                      <ul className="text-sm text-green-800 space-y-1">
                        <li>• <strong>SaaS/Technology:</strong> High network effect, understands systems</li>
                        <li>• <strong>E-commerce:</strong> Revenue-focused, scaling mindset</li>
                        <li>• <strong>Digital Marketing:</strong> Appreciates lead generation value</li>
                      </ul>
                      <div className="mt-2 text-xs text-green-700 font-medium">
                        💡 Recommendation: Focus 60% of outreach efforts here
                      </div>
                    </div>
                    
                    {/* Growth Opportunities */}
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="h-4 w-4 text-blue-600" />
                        <span className="font-semibold text-blue-900">Growth Opportunities (75-89%)</span>
                      </div>
                      <ul className="text-sm text-blue-800 space-y-1">
                        <li>• <strong>Professional Services:</strong> High deal values, established networks</li>
                        <li>• <strong>Real Estate:</strong> Commission-based, relationship-driven</li>
                        <li>• <strong>Healthcare:</strong> Stable income, risk-averse</li>
                      </ul>
                      <div className="mt-2 text-xs text-blue-700 font-medium">
                        💡 Recommendation: Use specialized templates, longer nurture sequences
                      </div>
                    </div>
                    
                    {/* Optimization Needed */}
                    <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle className="h-4 w-4 text-orange-600" />
                        <span className="font-semibold text-orange-900">Optimization Needed (&lt;75%)</span>
                      </div>
                      <ul className="text-sm text-orange-800 space-y-1">
                        <li>• <strong>Manufacturing:</strong> Longer sales cycles, conservative approach</li>
                        <li>• <strong>Retail/Traditional:</strong> Limited scalability awareness</li>
                      </ul>
                      <div className="mt-2 text-xs text-orange-700 font-medium">
                        💡 Recommendation: Educational content first, case studies from similar industries
                      </div>
                    </div>

                    {/* Territory-Specific Data */}
                    <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin className="h-4 w-4 text-purple-600" />
                        <span className="font-semibold text-purple-900">Territory Performance</span>
                      </div>
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <div className="font-medium text-purple-800">Florida Markets</div>
                          <div className="text-purple-700">
                            • Miami-Dade: 89% success rate<br/>
                            • Orlando: 85% success rate<br/>
                            • Tampa: 82% success rate
                          </div>
                        </div>
                        <div>
                          <div className="font-medium text-purple-800">New York Markets</div>
                          <div className="text-purple-700">
                            • Manhattan: 91% success rate<br/>
                            • Brooklyn: 87% success rate<br/>
                            • Long Island: 83% success rate
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Items Based on Heat Map */}
              <div className="mt-6 pt-6 border-t">
                <h4 className="font-semibold mb-3 text-gray-900">🎯 Data-Driven Action Items</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button className="h-auto p-4 flex flex-col items-start bg-green-100 hover:bg-green-200 text-green-900 border border-green-300">
                    <Target className="h-5 w-5 mb-2" />
                    <div className="text-left">
                      <div className="font-semibold">Focus on SaaS/Tech</div>
                      <div className="text-xs opacity-75">92% success rate - prioritize these leads</div>
                    </div>
                  </Button>
                  
                  <Button className="h-auto p-4 flex flex-col items-start bg-blue-100 hover:bg-blue-200 text-blue-900 border border-blue-300">
                    <MessageSquare className="h-5 w-5 mb-2" />
                    <div className="text-left">
                      <div className="font-semibold">Optimize Healthcare</div>
                      <div className="text-xs opacity-75">Improve 78% → 85% with better messaging</div>
                    </div>
                  </Button>
                  
                  <Button className="h-auto p-4 flex flex-col items-start bg-purple-100 hover:bg-purple-200 text-purple-900 border border-purple-300">
                    <TrendingUp className="h-5 w-5 mb-2" />
                    <div className="text-left">
                      <div className="font-semibold">Scale Top Markets</div>
                      <div className="text-xs opacity-75">Manhattan & Miami showing highest ROI</div>
                    </div>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

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