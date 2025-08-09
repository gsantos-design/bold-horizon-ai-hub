import React from 'react';
import { HelpTooltip, TipTooltip, FeatureTooltip, AITooltip, SmartTooltip } from './ContextualTooltip';

// Collection of pre-configured tooltips for common Santiago Team features
export const SantiagoTooltips = {
  // Commission Calculator Tooltips
  CommissionCalculator: ({ children }: { children: React.ReactNode }) => (
    <SmartTooltip 
      content="Calculate your potential earnings with precision. Based on Transamerica products and WFG compensation structure. Average successful associate earns $8,000-15,000 monthly after 12 months."
      context="commission"
    >
      {children}
    </SmartTooltip>
  ),

  // Lead Generation Tooltips
  LeadTargeting: ({ children }: { children: React.ReactNode }) => (
    <SmartTooltip 
      content="Target high-value prospects across Florida and New York markets. Focus on 401k rollover opportunities ($100K+ accounts), conservative investors seeking CD alternatives (4.5-6.8% yields), and entrepreneurs wanting $100K-$250K additional income."
      context="lead-generation"
    >
      {children}
    </SmartTooltip>
  ),

  HubSpotIntegration: ({ children }: { children: React.ReactNode }) => (
    <FeatureTooltip 
      content="Seamlessly sync leads with HubSpot CRM. Automatic deal value calculation, probability scoring, and pipeline management. Track lead progression from initial contact to closed deal with real-time updates."
      title="🔗 HubSpot CRM Integration"
    >
      {children}
    </FeatureTooltip>
  ),

  // AI Automation Tooltips
  VoiceCloning: ({ children }: { children: React.ReactNode }) => (
    <AITooltip 
      content="Clone Nolly and Pablo Santiago's voices using ElevenLabs AI. Make 2,000+ personalized phone calls monthly with authentic voice replication. Expected results: 30-40% contact rate, 8-12% appointment conversion."
      title="🎙️ Voice Cloning Technology"
    >
      {children}
    </AITooltip>
  ),

  VideoAvatars: ({ children }: { children: React.ReactNode }) => (
    <AITooltip 
      content="Generate thousands of personalized videos using AI avatars of Santiago Team leaders. HeyGen and Tavus integration for professional quality. 45% open rates vs 25% traditional email."
      title="📹 AI Video Avatars"
    >
      {children}
    </AITooltip>
  ),

  // Team Building Tooltips
  TeamPerformance: ({ children }: { children: React.ReactNode }) => (
    <SmartTooltip 
      content="Track team performance with real-time leaderboards. Monitor lead conversion rates, appointment settings, and revenue generation. Gold, silver, bronze rankings with progress analytics."
      context="team-building"
    >
      {children}
    </SmartTooltip>
  ),

  // Financial Education Tooltips
  Empower360: ({ children }: { children: React.ReactNode }) => (
    <SmartTooltip 
      content="Master the Three Philosophies: Multi-Handed Income (create 7+ income streams), Financial Rules (10% rule, 3 rules, 3 goals), and Self-Improvement (mindset mastery). Comprehensive system for financial freedom."
      context="financial-planning"
    >
      {children}
    </SmartTooltip>
  ),

  PhilosophySystem: ({ children }: { children: React.ReactNode }) => (
    <TipTooltip 
      content="The New Art of Living combines ancient wisdom with modern financial strategies. Learn to balance earnings, savings, and personal growth for sustainable wealth building and life satisfaction."
      title="📚 Philosophy System"
    >
      {children}
    </TipTooltip>
  ),

  // ROI and Success Metrics
  ROICalculator: ({ children }: { children: React.ReactNode }) => (
    <FeatureTooltip 
      content="AI automation investment: $421-656/month. Expected ROI: 9,500-16,500% monthly return. Scale lead generation 10x while maintaining personal touch and authentic relationships."
      title="💰 ROI Calculator"
    >
      {children}
    </FeatureTooltip>
  ),

  SuccessMetrics: ({ children }: { children: React.ReactNode }) => (
    <HelpTooltip 
      content="Track key performance indicators: phone call completion rates (target 30-40%), video engagement rates (target 45%), appointment conversion (target 8-12%), and pipeline value (target $250K+ monthly)."
      title="📊 Success Tracking"
    >
      {children}
    </HelpTooltip>
  ),

  // Territory Specific
  FloridaMarket: ({ children }: { children: React.ReactNode }) => (
    <TipTooltip 
      content="Florida market focus: Strong retirement planning demand, 401k rollover opportunities, and high-net-worth prospects. Santiago Team has established networks in major metropolitan areas."
      title="🌴 Florida Territory"
    >
      {children}
    </TipTooltip>
  ),

  NewYorkMarket: ({ children }: { children: React.ReactNode }) => (
    <TipTooltip 
      content="New York market focus: High-income professionals, business owners seeking tax advantages, and entrepreneurs looking for additional income streams. Premium market with higher deal values."
      title="🏙️ New York Territory"
    >
      {children}
    </TipTooltip>
  ),

  // Contact Information
  SantiagoContact: ({ children }: { children: React.ReactNode }) => (
    <HelpTooltip 
      content="Contact Pablo & Nolly Santiago directly at (407) 777-1087. Family-led team with combined 15+ years experience. Average client consultation results in $150K+ additional annual income potential."
      title="📞 Direct Contact"
    >
      {children}
    </HelpTooltip>
  ),

  // Industry Specific
  IndustryTargeting: ({ children }: { children: React.ReactNode }) => (
    <SmartTooltip 
      content="Target 9 high-conversion industries: Healthcare (85% success), Legal (78%), Real Estate (82%), Technology (75%), Manufacturing (70%), Finance (88%), Education (65%), Retail (60%), and Professional Services (80%)."
      context="lead-generation"
    >
      {children}
    </SmartTooltip>
  )
};

// Quick access wrapper for common tooltip scenarios
export const QuickTooltip = ({ 
  type, 
  children, 
  content,
  context 
}: { 
  type: 'help' | 'tip' | 'feature' | 'ai' | 'smart';
  children: React.ReactNode;
  content: string;
  context?: 'commission' | 'lead-generation' | 'ai-automation' | 'team-building' | 'financial-planning';
}) => {
  switch (type) {
    case 'help':
      return <HelpTooltip content={content}>{children}</HelpTooltip>;
    case 'tip':
      return <TipTooltip content={content}>{children}</TipTooltip>;
    case 'feature':
      return <FeatureTooltip content={content}>{children}</FeatureTooltip>;
    case 'ai':
      return <AITooltip content={content}>{children}</AITooltip>;
    case 'smart':
      return <SmartTooltip content={content} context={context || 'financial-planning'}>{children}</SmartTooltip>;
    default:
      return <HelpTooltip content={content}>{children}</HelpTooltip>;
  }
};

export default SantiagoTooltips;