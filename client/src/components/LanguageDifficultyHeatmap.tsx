import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/lib/LanguageContext";
import { Thermometer, Globe, CheckCircle, AlertTriangle, XCircle, Zap, Trophy, Target } from "lucide-react";

interface TranslationSection {
  id: string;
  name: string;
  difficulty: 'easy' | 'medium' | 'hard' | 'complete';
  completionPercentage: number;
  keyCount: number;
  description: string;
  priority: 'low' | 'medium' | 'high';
  category: 'navigation' | 'content' | 'forms' | 'interactive' | 'marketing';
}

const translationSections: TranslationSection[] = [
  {
    id: 'nav-header',
    name: 'Navigation Header',
    difficulty: 'complete',
    completionPercentage: 100,
    keyCount: 12,
    description: 'Main navigation menu and language switcher',
    priority: 'high',
    category: 'navigation'
  },
  {
    id: 'home-hero',
    name: 'Home Hero Section',
    difficulty: 'complete',
    completionPercentage: 95,
    keyCount: 8,
    description: 'Landing page hero content and call-to-action',
    priority: 'high',
    category: 'marketing'
  },
  {
    id: 'spanish-registration',
    name: 'Spanish Registration Form',
    difficulty: 'complete',
    completionPercentage: 100,
    keyCount: 15,
    description: 'Complete Spanish meeting registration system',
    priority: 'high',
    category: 'forms'
  },
  {
    id: 'team-profiles',
    name: 'Team Member Profiles',
    difficulty: 'complete',
    completionPercentage: 100,
    keyCount: 32,
    description: 'Santiago family member biographies and details',
    priority: 'medium',
    category: 'content'
  },
  {
    id: 'ai-mentor',
    name: 'AI Career Mentor',
    difficulty: 'medium',
    completionPercentage: 75,
    keyCount: 18,
    description: 'AI chatbot interface and responses',
    priority: 'high',
    category: 'interactive'
  },
  {
    id: 'lead-engine',
    name: 'Lead Engine Dashboard',
    difficulty: 'hard',
    completionPercentage: 40,
    keyCount: 45,
    description: 'B2B lead management and analytics',
    priority: 'medium',
    category: 'interactive'
  },
  {
    id: 'workflow-viz',
    name: 'Workflow Visualization',
    difficulty: 'hard',
    completionPercentage: 30,
    keyCount: 28,
    description: 'Dynamic workflow diagrams and animations',
    priority: 'low',
    category: 'interactive'
  },
  {
    id: 'educational-content',
    name: 'Educational Philosophy',
    difficulty: 'complete',
    completionPercentage: 90,
    keyCount: 22,
    description: 'Three Philosophies and financial education',
    priority: 'high',
    category: 'content'
  },
  {
    id: 'events-calendar',
    name: 'Events Calendar',
    difficulty: 'medium',
    completionPercentage: 65,
    keyCount: 16,
    description: 'WFG events and meeting schedules',
    priority: 'medium',
    category: 'content'
  },
  {
    id: 'compliance-legal',
    name: 'Compliance & Legal',
    difficulty: 'hard',
    completionPercentage: 25,
    keyCount: 35,
    description: 'WFG disclaimers and legal requirements',
    priority: 'high',
    category: 'content'
  }
];

export default function LanguageDifficultyHeatmap() {
  const { t, language } = useLanguage();
  const [selectedSection, setSelectedSection] = useState<TranslationSection | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [animatedSections, setAnimatedSections] = useState<Set<string>>(new Set());

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'complete': return 'bg-gradient-to-br from-green-400 to-emerald-500';
      case 'easy': return 'bg-gradient-to-br from-yellow-300 to-orange-400';
      case 'medium': return 'bg-gradient-to-br from-orange-400 to-red-400';
      case 'hard': return 'bg-gradient-to-br from-red-500 to-red-700';
      default: return 'bg-gradient-to-br from-gray-300 to-gray-400';
    }
  };

  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty) {
      case 'complete': return <CheckCircle className="h-5 w-5 text-white" />;
      case 'easy': return <Zap className="h-5 w-5 text-white" />;
      case 'medium': return <AlertTriangle className="h-5 w-5 text-white" />;
      case 'hard': return <XCircle className="h-5 w-5 text-white" />;
      default: return <Target className="h-5 w-5 text-white" />;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high': return <Badge className="bg-red-500 text-white">High Priority</Badge>;
      case 'medium': return <Badge className="bg-yellow-500 text-white">Medium Priority</Badge>;
      case 'low': return <Badge className="bg-green-500 text-white">Low Priority</Badge>;
      default: return null;
    }
  };

  const filteredSections = filterCategory === 'all' 
    ? translationSections 
    : translationSections.filter(section => section.category === filterCategory);

  const totalCompletion = Math.round(
    translationSections.reduce((sum, section) => sum + section.completionPercentage, 0) / translationSections.length
  );

  const handleSectionHover = (sectionId: string) => {
    setAnimatedSections(prev => new Set([...prev, sectionId]));
  };

  const categories = [
    { id: 'all', name: 'All Sections', icon: Globe },
    { id: 'navigation', name: 'Navigation', icon: Target },
    { id: 'content', name: 'Content', icon: CheckCircle },
    { id: 'forms', name: 'Forms', icon: AlertTriangle },
    { id: 'interactive', name: 'Interactive', icon: Zap },
    { id: 'marketing', name: 'Marketing', icon: Trophy }
  ];

  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Header Section */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full">
            <Thermometer className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Interactive Language Difficulty Heatmap
          </h1>
        </div>
        
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-2xl border border-purple-200">
          <div className="flex items-center justify-center space-x-6 mb-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">{totalCompletion}%</div>
              <div className="text-sm text-gray-600">Overall Completion</div>
            </div>
            <div className="h-12 w-px bg-purple-300"></div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">
                {translationSections.filter(s => s.difficulty === 'complete').length}
              </div>
              <div className="text-sm text-gray-600">Complete Sections</div>
            </div>
            <div className="h-12 w-px bg-purple-300"></div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">
                {translationSections.reduce((sum, s) => sum + s.keyCount, 0)}
              </div>
              <div className="text-sm text-gray-600">Translation Keys</div>
            </div>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-green-400 to-purple-500 rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${totalCompletion}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Category Filters */}
      <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold text-gray-800">
            Filter by Category
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <Button
                  key={category.id}
                  variant={filterCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterCategory(category.id)}
                  className={`transition-all duration-200 ${
                    filterCategory === category.id 
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' 
                      : 'hover:bg-purple-50'
                  }`}
                >
                  <IconComponent className="h-4 w-4 mr-2" />
                  {category.name}
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Heatmap Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredSections.map((section, index) => (
          <Card
            key={section.id}
            className={`cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl border-0 overflow-hidden ${
              animatedSections.has(section.id) ? 'animate-pulse' : ''
            }`}
            onClick={() => setSelectedSection(section)}
            onMouseEnter={() => handleSectionHover(section.id)}
            style={{
              animationDelay: `${index * 100}ms`
            }}
          >
            <div className={`h-2 ${getDifficultyColor(section.difficulty)}`}></div>
            
            <CardContent className="p-4 space-y-3">
              <div className="flex items-start justify-between">
                <h3 className="font-semibold text-gray-800 text-sm leading-tight">
                  {section.name}
                </h3>
                {getDifficultyIcon(section.difficulty)}
              </div>
              
              <p className="text-xs text-gray-600 line-clamp-2">
                {section.description}
              </p>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">{section.keyCount} keys</span>
                  <span className="text-sm font-bold text-gray-700">{section.completionPercentage}%</span>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-500 ${getDifficultyColor(section.difficulty)}`}
                    style={{ width: `${section.completionPercentage}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                {getPriorityBadge(section.priority)}
                <Badge variant="outline" className="text-xs">
                  {section.category}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Legend */}
      <Card className="bg-gradient-to-r from-gray-50 to-blue-50 border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-800 flex items-center">
            <Target className="h-5 w-5 mr-2" />
            Difficulty Legend
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 rounded bg-gradient-to-br from-green-400 to-emerald-500"></div>
              <span className="text-sm font-medium">Complete (90-100%)</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 rounded bg-gradient-to-br from-yellow-300 to-orange-400"></div>
              <span className="text-sm font-medium">Easy (70-89%)</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 rounded bg-gradient-to-br from-orange-400 to-red-400"></div>
              <span className="text-sm font-medium">Medium (40-69%)</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 rounded bg-gradient-to-br from-red-500 to-red-700"></div>
              <span className="text-sm font-medium">Hard (0-39%)</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detail Modal */}
      {selectedSection && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <Card className="max-w-md w-full bg-white border-0 shadow-2xl">
            <div className={`h-2 ${getDifficultyColor(selectedSection.difficulty)}`}></div>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-bold text-gray-800">
                  {selectedSection.name}
                </CardTitle>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setSelectedSection(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">{selectedSection.description}</p>
              
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">{selectedSection.completionPercentage}%</div>
                  <div className="text-sm text-gray-600">Complete</div>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{selectedSection.keyCount}</div>
                  <div className="text-sm text-gray-600">Translation Keys</div>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                {getPriorityBadge(selectedSection.priority)}
                <Badge variant="outline" className="capitalize">
                  {selectedSection.category}
                </Badge>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div 
                  className={`h-full transition-all duration-1000 ${getDifficultyColor(selectedSection.difficulty)}`}
                  style={{ width: `${selectedSection.completionPercentage}%` }}
                ></div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}