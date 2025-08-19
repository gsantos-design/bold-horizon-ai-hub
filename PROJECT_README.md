# Bold Horizons with World Financial Group

This is a dynamic recruitment platform for Bold Horizons with World Financial Group that transforms career exploration through immersive cosmic-themed digital experiences and innovative engagement strategies.

## How to Add Team Leaders' Image

To add the image of Nolly and Paul Santiago to the About Us section:

1. **Convert the Image**: Convert your HEIC file to a JPEG or PNG format if needed (there are free online converters available)

2. **Upload the Image**: Place the converted image in the `/public` folder of this project
   - Name the image file something descriptive like `santiago-team-leaders.jpg`

3. **Update the Code**: In `client/src/components/AboutUs.tsx`, find and edit the following section:
   - Uncomment the `<img>` tag (around line 76-80)
   - Update the `src` attribute to point to your image file (e.g., `src="/santiago-team-leaders.jpg"`)

```jsx
{/* Once you have the image, uncomment this line and update the src path */}
<img 
  src="/santiago-team-leaders.jpg" 
  alt="Nolly and Paul Santiago" 
  className="w-full h-full object-cover"
/>
```

4. **Remove the Instructions**: You can remove the instructions div (the one with "Manual Image Integration" text) once your image is working properly

## 📖 Santiago Family User Guide

**For comprehensive instructions on all AI automation features, see [SANTIAGO_FAMILY_USER_GUIDE.md](SANTIAGO_FAMILY_USER_GUIDE.md)**

This detailed guide covers:
- AI Career Mentor System with emotional intelligence
- Lead Generation Engine with deal estimation
- AI Automation Hub (voice synthesis, video generation, call automation)
- Team Performance Dashboards and analytics
- Spanish language tools and translation system
- Complete API reference and troubleshooting

## Project Features

- React.js with TypeScript frontend
- AI-powered career quiz and recommendation system with GPT-4 integration
- Advanced lead generation with HubSpot CRM integration
- AI automation hub with voice synthesis (ElevenLabs), video generation (HeyGen), and call automation (Retell)
- Comprehensive Spanish localization with interactive dictionary
- 3D/4D cosmic background design
- Animated recruitment journey visualization
- Team performance tracking and leaderboards
- Responsive, interactive career exploration tools
- Glassmorphic UI with cosmic design elements
- Real-time workflow visualization

## Quick Access Links

- [Santiago Family User Guide](SANTIAGO_FAMILY_USER_GUIDE.md) - Complete AI automation documentation
- [Quick Start Checklist](QUICK_START_CHECKLIST.md) - Setup guide
- [AI Automation Setup](AI_AUTOMATION_SETUP_GUIDE.md) - AI configuration
- [Client API Setup](CLIENT_API_SETUP_GUIDE.md) - API instructions
- [Account Setup Walkthrough](ACCOUNT_SETUP_WALKTHROUGH.md) - Account configuration

## Technical Stack

- **Frontend**: React.js with TypeScript, Tailwind CSS, shadcn/ui components
- **Backend**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **AI Services**: OpenAI GPT-4, ElevenLabs, HeyGen, Retell AI
- **CRM Integration**: HubSpot API
- **Authentication**: Replit Auth with OpenID Connect
- **Deployment**: Replit hosting platform

## Development

1. **Install Dependencies**: Use the package manager tool in Replit
2. **Environment Setup**: Configure API keys in Replit Secrets
3. **Database Setup**: PostgreSQL database is automatically provisioned
4. **Run Development Server**: Use the "Start application" workflow

## Support

For technical support or questions about the AI automation features, refer to the comprehensive Santiago Family User Guide or contact the development team.