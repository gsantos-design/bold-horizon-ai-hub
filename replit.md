# Overview

Bold Horizons is a dynamic recruitment platform for World Financial Group (WFG), specifically designed for the Santiago Team. This cosmic-themed digital recruitment platform transforms career exploration through immersive 3D visualizations, AI-powered career assessments, and innovative engagement strategies. The application serves as a comprehensive recruitment and education tool for financial professionals in the Florida and New York markets.

## Recent v12 Enhancements (August 2025)
- **Image Import Compatibility Issue**: Build system cannot handle capitalized file extensions (.JPG, .PNG) - requires .jpeg or .png for proper import functionality
- **Enhanced Landing Page Content**: Complete redesign with compelling mission statement, about us story, and service previews replacing generic hero content
- **Detailed Bios Moved to Mission Page**: Team member biographies relocated from home page to dedicated mission highlights page for better content organization
- **AI Career Mentor Chatbot**: Full implementation with emotional intelligence, mentor personalities (Nolly Santiago, Pablo Santiago, Santiago Team), OpenAI GPT-4o integration
- **Team Member Profiles**: Added Princhesca Rainier Turner profile with professional bio and services
- **Extended Team Roster**: Updated Joseph Santiago and Christian Santiago profiles with new photos and comprehensive personal bios highlighting their unique specializations
- **Dynamic Workflow Visualization Tool**: Complete interactive workflow visualization system with real-time animations, performance analytics, and multiple campaign templates
- **Unified Team Santiago Page**: Comprehensive family story page showcasing four-generation Santiago team with professional bios and mission statement
- **WFG Compliance Implementation**: Comprehensive compliance overhaul following official WFG Social Media Guidelines including proper disclaimers, educational focus, and professional title corrections
- **Deal Amount Estimator**: Advanced revenue prediction based on lead profile, company data, industry, and geographic factors
- **Enhanced HubSpot Import**: Automatic deal value calculation and probability scoring for imported leads
- **Enhanced Security**: HMAC verification for Calendly webhooks to prevent unauthorized access
- **Lead Pipeline Visualization**: Updated tables showing estimated deal values and success probabilities
- **Revenue Intelligence**: Smart calculation engine using title, industry, company size, and location multipliers
- **Entrepreneur-Focused Lead Generation**: New targeting system for entrepreneurs seeking $100K-$250K additional income with 90% close rate potential
- **High-Converting Outreach Templates**: Specialized email sequences and LinkedIn campaigns targeting successful business owners and founders
- **Territory Optimization**: Updated all components to focus exclusively on Florida and New York markets (Caribbean and Puerto Rico fully removed)
- **Industry Success Probability Heat Map**: Interactive visual analytics showing conversion rates, deal values, and strategic insights across 9 industry sectors with territory-specific performance data
- **401k Rollover Targeting**: Comprehensive lead generation system targeting individuals seeking tax-free rollover strategies (IUL, Annuities, Strategic Investments) with specialized templates for pre-retirees, job changers, and high-income professionals
- **High Yield No-Loss Targeting**: Lead generation system for conservative investors seeking CD alternatives with guaranteed principal protection and higher yields (4.5-6.8% vs traditional CD rates)
- **Complete Team Santiago Biographies**: All four family members updated with authentic personal stories - Pablo (30+ year law enforcement veteran), Nolly (telecommunications background, family legacy mission), Joseph (entrepreneurial focus, investment licensed), and Christian Santiago (mathematics expert, youth educator)
- **Interactive Workflow Visualization**: Real-time animated workflow diagrams for AI automation campaigns, lead generation processes, and conversion funnel analytics
- **Dynamic Team Mission Highlight Reel**: Interactive showcase featuring each Santiago family member's mission, impact statistics, and personal stories with animated transitions and auto-play functionality

# User Preferences

Preferred communication style: Simple, everyday language.
Content organization: Better landing page content with mission statement and about us sections, move detailed bios to mission page for improved user experience.

# System Architecture

## Frontend Architecture
The application uses a modern React-based frontend architecture with TypeScript for type safety. The UI is built with shadcn/ui components providing a consistent, cosmic-themed design system. The frontend implements:

- **Component Structure**: Modular React components organized by functionality (career quiz, commission calculator, team building tools)
- **State Management**: React hooks and context for language switching and loading states
- **Animation Framework**: Framer Motion for cosmic animations, 3D effects, and smooth transitions
- **Responsive Design**: Tailwind CSS with custom cosmic design tokens and glassmorphic UI elements
- **3D Visualizations**: Custom 3D camera interactions and career constellation mapping

## Backend Architecture
The backend follows a full-stack Express.js architecture with TypeScript:

- **API Structure**: RESTful endpoints for inquiry submissions and career quiz processing
- **Database Layer**: Drizzle ORM with PostgreSQL schema for data persistence
- **Storage Interface**: Abstracted storage layer with in-memory fallback for development
- **Route Organization**: Modular route handlers with proper validation and error handling

## Data Storage Solutions
The application uses a flexible data storage approach:

- **Primary Database**: PostgreSQL via Drizzle ORM for production data
- **Schema Management**: Type-safe database schemas with Zod validation
- **Development Storage**: In-memory storage implementation for local development
- **Migration System**: Drizzle-kit for database migrations and schema updates

## Authentication and Authorization
Currently implements a minimal authentication structure with room for expansion:

- **User Schema**: Basic user table with username/password structure
- **Session Management**: Prepared for session-based authentication
- **Security Headers**: Basic security middleware for API routes

## Key Features Implementation

### AI-Powered Career Assessment
- OpenAI integration for personalized career path recommendations
- Comprehensive quiz system with skills, motivations, and values assessment
- Dynamic career constellation visualization based on quiz results

### Commission and Compensation Tools
- Advanced commission calculator with regional variations
- Interactive compensation structure visualization
- Team building income projections and growth modeling

### B2B Lead Engine (Fast-Track Santiago Lead Engine Plan)
- 5-tab interface: Dashboard, Targeting, Scripts, Automation, Results
- Apollo.io and LinkedIn Sales Navigator integration concepts
- Santiago-branded email sequences with AI lead scoring
- CRM integration with HubSpot API
- Round-robin lead assignment system
- Automated workflow management
- **v12 NEW**: Deal Amount Estimator with intelligent revenue calculations
- **v12 NEW**: Enhanced lead import with automatic deal value and probability scoring

### Webhook Integration System
- **v12 ENHANCED**: Calendly webhook handling with HMAC signature verification for security
- **v12 ENHANCED**: Enhanced meeting booking tracking with detailed event information
- Email reply tracking via Zapier/Gmail integration
- Real-time lead stage progression in both local database and HubSpot
- Automated note creation in CRM for lead activity tracking
- **v12 NEW**: Timestamp validation to prevent replay attacks (5-minute window)

### Team Performance Leaderboard
- Real-time team statistics and performance rankings
- Lead conversion tracking with visual progress indicators
- HubSpot owner integration for comprehensive team management
- Trophy system with gold, silver, bronze rankings
- Conversion rate calculations and progress analytics

### Multilingual Support
- React Context-based language switching (English/Spanish)
- Comprehensive translation system for Caribbean and Florida markets
- Dynamic content adaptation based on user language preference

### 3D Cosmic Interface
- Custom 3D camera component for immersive experiences
- Animated cosmic backgrounds with shooting stars and celestial elements
- Interactive career path visualizations in 3D space

# External Dependencies

## Core Framework Dependencies
- **React 18**: Frontend framework with TypeScript support
- **Express.js**: Backend API server with TypeScript
- **Vite**: Build tool and development server with hot module replacement

## UI and Design
- **shadcn/ui**: Component library built on Radix UI primitives
- **Tailwind CSS**: Utility-first CSS framework with custom cosmic theme
- **Framer Motion**: Animation library for 3D effects and transitions
- **Lucide React**: Icon library for consistent iconography

## Database and Storage
- **Drizzle ORM**: Type-safe ORM for PostgreSQL interactions
- **@neondatabase/serverless**: Neon database adapter for serverless deployments
- **connect-pg-simple**: PostgreSQL session store for Express sessions

## AI and External Services
- **OpenAI API**: AI-powered career recommendation engine
- **HubSpot API**: CRM integration for lead management and automation
- **Calendly Webhooks**: Automated meeting booking tracking
- **Zapier Integration**: Email reply detection and lead engagement monitoring
- **Zod**: Schema validation for forms and API requests
- **React Hook Form**: Form management with validation integration

## Development and Build Tools
- **TypeScript**: Type safety across frontend and backend
- **ESBuild**: Fast bundling for production builds
- **PostCSS**: CSS processing with Tailwind CSS integration
- **@replit/vite-plugin-runtime-error-modal**: Development error handling

## Data Visualization
- **Recharts**: Chart library for commission and growth projections
- **Custom 3D Components**: Proprietary 3D visualization system for career paths

## Query and State Management
- **TanStack React Query**: Server state management and caching
- **React Context**: Client-side state for language and loading states

## Additional Integrations
- **World Financial Group**: Direct integration with WFG registration systems
- **Transamerica**: Commission calculation based on Transamerica products
- **Multi-regional Support**: Specialized configurations for Florida and New York markets (Caribbean territory removed)