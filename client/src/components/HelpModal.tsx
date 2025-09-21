import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, 
  Book, 
  Phone, 
  Bot, 
  PlayCircle,
  ExternalLink,
  MessageCircle,
  DollarSign,
  Target,
  Users,
  Settings,
  FileText,
  Clock,
  CheckCircle
} from 'lucide-react';

interface HelpModalProps {
  children: React.ReactNode;
  currentPage?: string;
}

export default function HelpModal({ children, currentPage = 'home' }: HelpModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('getting-started');

  const helpSections = {
    'getting-started': {
      title: 'Getting Started',
      icon: <PlayCircle className="h-5 w-5" />,
      items: [
        {
          title: 'Platform Overview',
          description: 'Learn about the Santiago Team recruitment platform and its key features',
          action: () => console.log('Show overview'),
          time: '5 min read'
        },
        {
          title: 'Take Interactive Tour',
          description: 'Guided walkthrough of all major platform features',
          action: () => console.log('Start tour'),
          time: '10 min tour'
        },
        {
          title: 'Contact Santiago Team',
          description: 'Speak directly with Pablo & Nolly Santiago',
          action: () => window.location.href = 'tel:407-777-1087',
          time: 'Immediate'
        }
      ]
    },
    'ai-automation': {
      title: 'AI Automation',
      icon: <Bot className="h-5 w-5" />,
      items: [
        {
          title: 'Complete Setup Guide',
          description: 'Step-by-step walkthrough for Google Analytics, Firebase, Gemini AI, and Workspace',
          action: () => window.location.href = '/setup-guide',
          time: '1-2 hours'
        },
        {
          title: 'Google AI Integration',
          description: 'Configure Google Analytics tracking and Gemini AI automation',
          action: () => window.location.href = '/setup-guide',
          time: '30 min'
        },
        {
          title: 'Analytics Dashboard',
          description: 'Set up Google Analytics goals and conversion tracking for lead generation',
          action: () => console.log('Show analytics setup'),
          time: '15 min'
        }
      ]
    },
    'lead-generation': {
      title: 'Lead Generation',
      icon: <Target className="h-5 w-5" />,
      items: [
        {
          title: '401k Rollover Targeting',
          description: 'Target pre-retirees and job changers with tax-free rollover strategies',
          action: () => window.location.href = '/lead-engine',
          time: '10 min'
        },
        {
          title: 'High-Yield Targeting',
          description: 'Conservative investors seeking CD alternatives (4.5-6.8% yields)',
          action: () => window.location.href = '/lead-engine',
          time: '10 min'
        },
        {
          title: 'HubSpot Integration',
          description: 'Sync leads with CRM, automatic deal value calculation',
          action: () => console.log('Show HubSpot help'),
          time: '15 min'
        }
      ]
    },
    'financial-education': {
      title: 'Financial Education',
      icon: <Book className="h-5 w-5" />,
      items: [
        {
          title: 'Empower360 Philosophy',
          description: 'Master the Three Philosophies: Multi-Handed Income, Financial Rules, Self-Improvement',
          action: () => window.location.href = '/empower360',
          time: '20 min'
        },
        {
          title: 'Commission Calculator',
          description: 'Calculate potential earnings with WFG compensation structure',
          action: () => console.log('Show commission calculator'),
          time: '5 min'
        },
        {
          title: 'Team Building Strategies',
          description: 'Learn recruitment and team development techniques',
          action: () => window.location.href = '/team-performance',
          time: '15 min'
        }
      ]
    }
  };

  const quickActions = [
    {
      title: 'AI Career Mentor',
      description: 'Chat with AI mentors powered by Santiago Team expertise',
      icon: <Bot className="h-5 w-5 text-purple-600" />,
      action: () => window.location.href = '/ai-mentor'
    },
    {
      title: 'Setup AI Automation',
      description: 'Complete account setup for voice & video cloning',
      icon: <Settings className="h-5 w-5 text-blue-600" />,
      action: () => window.location.href = '/setup-guide'
    },
    {
      title: 'Call Santiago Team',
      description: 'Speak directly with Pablo & Nolly Santiago',
      icon: <Phone className="h-5 w-5 text-green-600" />,
      action: () => window.location.href = 'tel:407-777-1087'
    },
    {
      title: 'Lead Generation Engine',
      description: 'Advanced targeting for high-value prospects',
      icon: <Target className="h-5 w-5 text-orange-600" />,
      action: () => window.location.href = '/lead-engine'
    }
  ];

  const filteredItems = Object.entries(helpSections).flatMap(([key, section]) => 
    section.items.filter(item => 
      searchQuery === '' || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    ).map(item => ({ ...item, category: key, categoryTitle: section.title }))
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="p-2 bg-blue-100 rounded-full"
            >
              <Book className="h-5 w-5 text-blue-600" />
            </motion.div>
            Santiago Team Help Center
          </DialogTitle>
          <DialogDescription>
            Comprehensive support for platform features, AI automation setup, and lead generation strategies
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4">
          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search help articles, guides, and tutorials..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {searchQuery ? (
            /* Search Results */
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {filteredItems.length > 0 ? (
                filteredItems.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={item.action}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold text-gray-800">{item.title}</h3>
                            <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                            <div className="flex items-center gap-4 mt-2">
                              <span className="text-xs text-blue-600 font-medium">{item.categoryTitle}</span>
                              <span className="text-xs text-gray-500 flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {item.time}
                              </span>
                            </div>
                          </div>
                          <ExternalLink className="h-4 w-4 text-gray-400" />
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">No results found for "{searchQuery}"</p>
                  <Button 
                    variant="outline" 
                    className="mt-2"
                    onClick={() => setSearchQuery('')}
                  >
                    Clear Search
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
              <TabsList className="grid w-full grid-cols-4">
                {Object.entries(helpSections).map(([key, section]) => (
                  <TabsTrigger key={key} value={key} className="flex items-center gap-2">
                    {section.icon}
                    <span className="hidden sm:inline">{section.title}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
              
              {Object.entries(helpSections).map(([key, section]) => (
                <TabsContent key={key} value={key} className="mt-6">
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {section.items.map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={item.action}>
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <h3 className="font-semibold text-gray-800">{item.title}</h3>
                                <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                                <div className="flex items-center gap-2 mt-2">
                                  <Clock className="h-3 w-3 text-gray-400" />
                                  <span className="text-xs text-gray-500">{item.time}</span>
                                </div>
                              </div>
                              <ExternalLink className="h-4 w-4 text-gray-400 ml-4" />
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          )}

          {/* Quick Actions */}
          {!searchQuery && (
            <div className="mt-8 pt-6 border-t">
              <h3 className="font-semibold text-gray-800 mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-3">
                {quickActions.map((action, index) => (
                  <motion.button
                    key={index}
                    onClick={action.action}
                    className="p-3 text-left rounded-lg border border-gray-100 hover:border-blue-200 hover:bg-blue-50 transition-colors group"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-1.5 bg-gray-100 rounded-lg group-hover:bg-blue-100 transition-colors">
                        {action.icon}
                      </div>
                      <div>
                        <p className="font-medium text-gray-800 text-sm">{action.title}</p>
                        <p className="text-xs text-gray-500">{action.description}</p>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          )}

          {/* Contact Footer */}
          <div className="mt-6 pt-4 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600">
                Need personal assistance?
              </p>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => window.location.href = 'tel:407-777-1087'}
                className="flex items-center gap-2"
              >
                <Phone className="h-4 w-4" />
                Call (407) 777-1087
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}