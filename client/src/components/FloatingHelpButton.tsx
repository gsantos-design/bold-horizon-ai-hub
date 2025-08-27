import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  HelpCircle, 
  X, 
  Phone, 
  MessageCircle, 
  BookOpen, 
  PlayCircle,
  ExternalLink,
  Bot,
  Sparkles,
  Target,
  DollarSign
} from 'lucide-react';
import { HelpTooltip } from './ContextualTooltip';

interface FloatingHelpButtonProps {
  currentPage?: string;
}

export default function FloatingHelpButton({ currentPage = 'home' }: FloatingHelpButtonProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const helpContent = {
    home: {
      title: "Santiago Team Platform Help",
      description: "Your comprehensive WFG recruitment and financial education platform",
      quickActions: [
        {
          icon: <PlayCircle className="h-4 w-4" />,
          label: "Take Platform Tour",
          action: () => console.log('Start tour'),
          description: "5-minute guided tour of key features"
        },
        {
          icon: <Bot className="h-4 w-4" />,
          label: "AI Career Mentor", 
          action: () => window.location.href = '/ai-mentor',
          description: "Chat with AI-powered career guidance"
        },
        {
          icon: <Phone className="h-4 w-4" />,
          label: "Call Santiago Team",
          action: () => window.location.href = 'tel:407-777-1087',
          description: "Speak with Pablo & Nolly directly"
        },
        {
          icon: <BookOpen className="h-4 w-4" />,
          label: "Empower360 Philosophy",
          action: () => window.location.href = '/empower360',
          description: "Learn our Three Philosophies system"
        }
      ]
    },
    'ai-automation': {
      title: "AI Automation Help",
      description: "Scale your lead generation with AI phone calls and video avatars",
      quickActions: [
        {
          icon: <ExternalLink className="h-4 w-4" />,
          label: "Setup Guide",
          action: () => window.location.href = '/setup-guide',
          description: "Complete account setup walkthrough"
        },
        {
          icon: <Target className="h-4 w-4" />,
          label: "ROI Calculator",
          action: () => console.log('Show ROI calculator'),
          description: "Calculate expected returns: 9,500-16,500%"
        },
        {
          icon: <MessageCircle className="h-4 w-4" />,
          label: "Recording Scripts",
          action: () => window.open('/RECORDING_SCRIPTS_TEMPLATE.md', '_blank'),
          description: "Voice & video recording templates"
        }
      ]
    },
    'lead-engine': {
      title: "Lead Engine Help", 
      description: "Advanced lead generation and CRM integration",
      quickActions: [
        {
          icon: <Target className="h-4 w-4" />,
          label: "Targeting Guide",
          action: () => console.log('Show targeting help'),
          description: "401k rollover & high-yield targeting"
        },
        {
          icon: <DollarSign className="h-4 w-4" />,
          label: "Deal Calculator",
          action: () => console.log('Show deal calculator'),
          description: "Estimate lead values and probabilities"
        },
        {
          icon: <ExternalLink className="h-4 w-4" />,
          label: "HubSpot Integration",
          action: () => console.log('Show HubSpot help'),
          description: "CRM sync and automation setup"
        }
      ]
    }
  };

  const currentContent = helpContent[currentPage as keyof typeof helpContent] || helpContent.home;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="mb-4"
          >
            <Card className="w-80 bg-white/95 backdrop-blur-sm border-2 border-primary shadow-2xl">
              <CardContent className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                      className="p-2 bg-primary/20 rounded-full"
                    >
                      <Sparkles className="h-4 w-4 text-primary" />
                    </motion.div>
                    <div>
                      <h3 className="font-bold text-gray-800">{currentContent.title}</h3>
                      <p className="text-xs text-primary">Quick Help & Actions</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsExpanded(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                  {currentContent.description}
                </p>

                {/* Quick Actions */}
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Quick Actions
                  </p>
                  {currentContent.quickActions.map((action, index) => (
                    <motion.button
                      key={index}
                      onClick={action.action}
                      className="w-full p-3 text-left rounded-lg border border-gray-100 hover:border-primary hover:bg-primary/10 transition-colors group"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-1.5 bg-primary/20 rounded-lg group-hover:bg-primary/30 transition-colors">
                          {action.icon}
                        </div>
                        <div>
                          <p className="font-medium text-gray-800 text-sm">{action.label}</p>
                          <p className="text-xs text-gray-500">{action.description}</p>
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>

                {/* Contact Footer */}
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-xs text-gray-500 text-center">
                    Need personal help? Call Pablo & Nolly at{' '}
                    <a href="tel:407-777-1087" className="font-semibold text-primary hover:underline">
                      (407) 777-1087
                    </a>
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main help button */}
      <HelpTooltip 
        content="Get instant help, take guided tours, access setup guides, and contact the Santiago Team directly. Your comprehensive support hub for platform success!"
        title="🆘 Platform Help Center"
      >
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Button
            onClick={() => setIsExpanded(!isExpanded)}
            className={`h-14 w-14 rounded-full shadow-lg transition-all duration-300 ${
              isExpanded 
                ? 'bg-red-600 hover:bg-red-700' 
                : 'bg-primary hover:bg-primary/90'
            }`}
          >
            <AnimatePresence mode="wait">
              {isExpanded ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="h-6 w-6 text-white" />
                </motion.div>
              ) : (
                <motion.div
                  key="help"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="relative"
                >
                  <HelpCircle className="h-6 w-6 text-white" />
                  <motion.div
                    className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full"
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [1, 0.7, 1]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </Button>
        </motion.div>
      </HelpTooltip>
    </div>
  );
}