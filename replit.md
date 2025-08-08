# Overview

Bold Horizons is a dynamic recruitment platform for World Financial Group (WFG), specifically designed for the Santiago Team. This cosmic-themed digital recruitment platform transforms career exploration through immersive 3D visualizations, AI-powered career assessments, and innovative engagement strategies. The application serves as a comprehensive recruitment and education tool for financial professionals in the Caribbean, Florida, and New York markets.

# User Preferences

Preferred communication style: Simple, everyday language.

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
- **Multi-regional Support**: Specialized configurations for Caribbean, Florida, and New York markets