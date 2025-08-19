import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  FileText, 
  Rocket, 
  Settings, 
  Zap, 
  Users, 
  BookOpen,
  ExternalLink,
  Download,
  Code,
  Database,
  Cpu
} from "lucide-react";

export default function Documentation() {
  const downloadFile = (filename: string, content: string) => {
    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const readmeContent = `# Bold Horizons with World Financial Group

This is a dynamic recruitment platform for Bold Horizons with World Financial Group that transforms career exploration through immersive cosmic-themed digital experiences and innovative engagement strategies.

## How to Add Team Leaders' Image

To add the image of Nolly and Paul Santiago to the About Us section:

1. **Convert the Image**: Convert your HEIC file to a JPEG or PNG format if needed (there are free online converters available)

2. **Upload the Image**: Place the converted image in the \`/public\` folder of this project
   - Name the image file something descriptive like \`santiago-team-leaders.jpg\`

3. **Update the Code**: In \`client/src/components/AboutUs.tsx\`, find and edit the following section:
   - Uncomment the \`<img>\` tag (around line 76-80)
   - Update the \`src\` attribute to point to your image file (e.g., \`src="/santiago-team-leaders.jpg"\`)

\`\`\`jsx
{/* Once you have the image, uncomment this line and update the src path */}
<img 
  src="/santiago-team-leaders.jpg" 
  alt="Nolly and Paul Santiago" 
  className="w-full h-full object-cover"
/>
\`\`\`

4. **Remove the Instructions**: You can remove the instructions div (the one with "Manual Image Integration" text) once your image is working properly

## 📖 Santiago Family User Guide

**For comprehensive instructions on all AI automation features, see SANTIAGO_FAMILY_USER_GUIDE.md**

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

## Technical Stack

- **Frontend**: React.js with TypeScript, Tailwind CSS, shadcn/ui components
- **Backend**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **AI Services**: OpenAI GPT-4, ElevenLabs, HeyGen, Retell AI
- **CRM Integration**: HubSpot API
- **Authentication**: Replit Auth with OpenID Connect
- **Deployment**: Replit hosting platform`;

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-8">
            <Badge className="mb-4 bg-blue-600 text-white px-4 py-2">
              <FileText className="h-4 w-4 mr-2" />
              Project Documentation
            </Badge>
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Bold Horizons Documentation Hub
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive guides and documentation for the Santiago Team's AI-powered recruitment platform
            </p>
          </div>

          {/* Quick Access Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            
            {/* Main README */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-blue-600" />
                  Main README
                </CardTitle>
                <CardDescription>
                  Project overview and setup instructions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  onClick={() => downloadFile('README.md', readmeContent)}
                  className="w-full"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download README
                </Button>
              </CardContent>
            </Card>

            {/* Santiago Family User Guide */}
            <Card className="hover:shadow-lg transition-shadow border-purple-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-purple-600" />
                  Santiago Family Guide
                </CardTitle>
                <CardDescription>
                  Complete AI automation system documentation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Badge className="mb-3 bg-purple-100 text-purple-800">Comprehensive</Badge>
                <p className="text-sm text-gray-600 mb-3">
                  AI Career Mentor, Lead Engine, Automation Hub, Performance Tracking
                </p>
                <Button variant="outline" className="w-full">
                  <BookOpen className="h-4 w-4 mr-2" />
                  View Guide
                </Button>
              </CardContent>
            </Card>

            {/* Quick Start */}
            <Card className="hover:shadow-lg transition-shadow border-green-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Rocket className="h-5 w-5 text-green-600" />
                  Quick Start
                </CardTitle>
                <CardDescription>
                  Get up and running in minutes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Badge className="mb-3 bg-green-100 text-green-800">Essential</Badge>
                <p className="text-sm text-gray-600 mb-3">
                  Setup checklist and initial configuration
                </p>
                <Button variant="outline" className="w-full">
                  <Zap className="h-4 w-4 mr-2" />
                  Start Setup
                </Button>
              </CardContent>
            </Card>

          </div>

          {/* Technical Documentation */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5 text-blue-600" />
                Technical Documentation
              </CardTitle>
              <CardDescription>
                API references, setup guides, and technical specifications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                
                <div className="space-y-3">
                  <h4 className="font-semibold flex items-center gap-2">
                    <Settings className="h-4 w-4" />
                    Setup Guides
                  </h4>
                  <div className="space-y-2">
                    <Button variant="ghost" className="w-full justify-start text-sm">
                      <ExternalLink className="h-3 w-3 mr-2" />
                      AI Automation Setup Guide
                    </Button>
                    <Button variant="ghost" className="w-full justify-start text-sm">
                      <ExternalLink className="h-3 w-3 mr-2" />
                      Client API Setup Guide
                    </Button>
                    <Button variant="ghost" className="w-full justify-start text-sm">
                      <ExternalLink className="h-3 w-3 mr-2" />
                      Account Setup Walkthrough
                    </Button>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold flex items-center gap-2">
                    <Database className="h-4 w-4" />
                    System Information
                  </h4>
                  <div className="space-y-2">
                    <div className="text-sm text-gray-600">
                      <strong>Frontend:</strong> React.js + TypeScript
                    </div>
                    <div className="text-sm text-gray-600">
                      <strong>Backend:</strong> Express.js + PostgreSQL
                    </div>
                    <div className="text-sm text-gray-600">
                      <strong>AI Services:</strong> OpenAI, ElevenLabs, HeyGen, Retell
                    </div>
                    <div className="text-sm text-gray-600">
                      <strong>CRM:</strong> HubSpot Integration
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* README Content Display */}
          <Card>
            <CardHeader>
              <CardTitle>README.md Content</CardTitle>
              <CardDescription>
                Main project documentation and setup instructions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 p-6 rounded-lg max-h-96 overflow-y-auto">
                <pre className="text-sm text-gray-800 whitespace-pre-wrap font-mono">
                  {readmeContent}
                </pre>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}