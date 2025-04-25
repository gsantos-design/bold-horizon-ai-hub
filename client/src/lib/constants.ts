// Rank information with commission percentages and requirements
export const ranks = [
  { 
    id: 'training-associate',
    title: 'Training Associate',
    commission: 0.30,
    fastTrackRequirements: null,
    traditionalRequirements: null,
  },
  { 
    id: 'associate',
    title: 'Associate',
    commission: 0.45,
    fastTrackRequirements: {
      sales: 3,
      recruits: 3,
      timeframe: '30 days'
    },
    traditionalRequirements: {
      points: 20000,
      timeframe: '90 days'
    }
  },
  { 
    id: 'senior-associate',
    title: 'Senior Associate',
    commission: 0.55,
    fastTrackRequirements: {
      sales: 10,
      recruits: 10,
      timeframe: '30 days'
    },
    traditionalRequirements: {
      licensedAgents: 4,
      baseShopPoints: 30000,
      timeframe: '3 months'
    }
  },
  { 
    id: 'marketing-director',
    title: 'Marketing Director',
    commission: 0.62,
    fastTrackRequirements: {
      sales: 25,
      recruits: 25,
      timeframe: '30 days'
    },
    traditionalRequirements: {
      licensedAgents: 5,
      netPoints: 40000,
      timeframe: '3 months'
    }
  },
  { 
    id: 'senior-marketing-director',
    title: 'Senior Marketing Director',
    commission: 0.80,
    fastTrackRequirements: null,
    traditionalRequirements: {
      licensedAgents: 10,
      directLegs: 3,
      baseNetPoints: 75000,
      income: 35000,
      timeframe: '12 months'
    }
  }
];

// Payout methods
export const payoutMethods = [
  {
    title: 'Advanced Commission Option 1',
    steps: [
      'Submit application with premium',
      'Receive 40% advance within one week',
      'After policy approval (3-4 weeks), deliver policy to client',
      'Receive remaining 60% advance after delivery requirements are submitted'
    ]
  },
  {
    title: 'Advanced Commission Option 2 (Trial Application)',
    steps: [
      'Submit application without premium',
      'After approval, deliver policy and submit payment authorization',
      'Receive 100% of commission advance within one week'
    ]
  },
  {
    title: 'Renewals',
    steps: [
      'With Transamerica, our primary carrier, renewals pay 3-5% for approximately 15 years',
      'Clients must pay 13 months of target premium within 24 months to avoid chargebacks'
    ]
  }
];

// Bonus programs
export const bonusPrograms = [
  'Base shop bonus',
  'Super base bonus',
  'Super team bonus',
  'Advisory base bonus',
  'Advisory super base bonus',
  'Advisory super team bonus'
];

// Executive bonuses
export const executiveBonuses = [
  {
    level: 'EVC',
    bonusType: 'Annual Bonus',
    amount: '$10,000-$25,000'
  },
  {
    level: 'SCBC',
    bonusType: 'Annual Bonus + Presidential Rolex',
    amount: '$50,000-$200,000'
  },
  {
    level: 'FC',
    bonusType: 'Team Override',
    amount: 'Additional 21 basis points'
  },
  {
    level: 'EC',
    bonusType: 'Company-Wide Override',
    amount: 'Additional 13 basis points'
  }
];

// Resources for download
export const resources = [
  {
    title: 'Compensation Guide',
    description: 'Complete breakdown of the WFG compensation structure and bonus programs.',
    fileType: 'PDF',
    icon: 'FileText'
  },
  {
    title: 'Commission Spreadsheet',
    description: 'Advanced Excel tool for tracking your sales, commissions, and team overrides.',
    fileType: 'Excel',
    icon: 'Calculator'
  },
  {
    title: 'Recruitment Kit',
    description: 'Templates and scripts to help you build your team more effectively.',
    fileType: 'ZIP',
    icon: 'Users'
  },
  {
    title: 'Training Videos',
    description: 'Comprehensive video library covering sales techniques, product knowledge, and team building.',
    fileType: 'Video',
    icon: 'PlayCircle'
  },
  {
    title: 'Event Calendar',
    description: 'Stay updated on upcoming training sessions, webinars, and recognition events.',
    fileType: 'Calendar',
    icon: 'Calendar'
  },
  {
    title: 'Support Resources',
    description: 'Contact information for various departments and technical support.',
    fileType: 'Directory',
    icon: 'HeadsetHelp'
  }
];

// Contact information
export const contactInfo = {
  address: {
    name: 'WFG Financial Headquarters',
    street: '11200 Rockville Pike, Suite 500',
    city: 'Rockville, MD 20852'
  },
  phone: '(800) 555-0123',
  email: 'careers@wfgfinancial.com',
  hours: {
    weekdays: 'Monday - Friday: 9:00 AM - 6:00 PM',
    saturday: 'Saturday: 10:00 AM - 2:00 PM',
    sunday: 'Sunday: Closed'
  },
  social: [
    { platform: 'Facebook', url: '#' },
    { platform: 'LinkedIn', url: '#' },
    { platform: 'YouTube', url: '#' },
    { platform: 'Mobile App', url: '#' }
  ]
};

// Interest options for contact form
export const interestOptions = [
  { value: 'career', label: 'Starting a Career with WFG' },
  { value: 'more-info', label: 'Learning More About Compensation' },
  { value: 'meeting', label: 'Scheduling a Meeting' },
  { value: 'resources', label: 'Accessing Resources' },
  { value: 'other', label: 'Other' }
];
