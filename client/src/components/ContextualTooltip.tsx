import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from '@/components/ui/tooltip';
import { 
  HelpCircle, 
  Lightbulb, 
  Target, 
  TrendingUp, 
  Users, 
  Zap,
  DollarSign,
  Phone,
  Video,
  Star,
  Award,
  Calculator,
  BarChart3,
  Bot,
  Sparkles
} from 'lucide-react';

interface ContextualTooltipProps {
  children: React.ReactNode;
  content: string;
  title?: string;
  type?: 'help' | 'tip' | 'feature' | 'success' | 'warning' | 'ai';
  position?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
  playful?: boolean;
}

const tooltipIcons = {
  help: HelpCircle,
  tip: Lightbulb,
  feature: Star,
  success: Award,
  warning: Target,
  ai: Bot
};

const tooltipColors = {
  help: 'border-primary/20 bg-primary/5 text-primary',
  tip: 'border-secondary/20 bg-secondary/5 text-secondary',
  feature: 'border-primary/20 bg-primary/5 text-primary',
  success: 'border-secondary/20 bg-secondary/5 text-secondary',
  warning: 'border-secondary/20 bg-secondary/5 text-secondary',
  ai: 'border-primary/20 bg-gradient-to-r from-primary/5 to-secondary/5 text-primary'
};

const playfulAnimations = {
  bounce: {
    initial: { scale: 0, rotate: -180 },
    animate: { 
      scale: 1, 
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20
      }
    },
    exit: { 
      scale: 0, 
      rotate: 180,
      transition: { duration: 0.2 }
    }
  },
  pulse: {
    initial: { scale: 0.8, opacity: 0 },
    animate: { 
      scale: [0.8, 1.05, 1],
      opacity: 1,
      transition: {
        duration: 0.6,
        times: [0, 0.6, 1],
        ease: "easeInOut"
      }
    },
    exit: { 
      scale: 0.8, 
      opacity: 0,
      transition: { duration: 0.2 }
    }
  },
  wobble: {
    initial: { scale: 0, x: -20 },
    animate: { 
      scale: 1,
      x: 0,
      rotate: [0, 5, -5, 0],
      transition: {
        scale: { type: "spring", stiffness: 200 },
        rotate: { duration: 0.5, times: [0, 0.33, 0.66, 1] }
      }
    },
    exit: { 
      scale: 0, 
      x: 20,
      transition: { duration: 0.2 }
    }
  }
};

export default function ContextualTooltip({ 
  children, 
  content, 
  title,
  type = 'help', 
  position = 'top',
  delay = 0,
  playful = true 
}: ContextualTooltipProps) {
  const [isOpen, setIsOpen] = useState(false);
  const Icon = tooltipIcons[type];
  const colorClass = tooltipColors[type];
  const animationType = playful ? ['bounce', 'pulse', 'wobble'][Math.floor(Math.random() * 3)] as keyof typeof playfulAnimations : 'bounce';

  return (
    <TooltipProvider delayDuration={delay}>
      <Tooltip open={isOpen} onOpenChange={setIsOpen}>
        <TooltipTrigger asChild>
          <motion.div
            className="relative inline-flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {children}
            {/* Floating help indicator */}
            <motion.div
              className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center cursor-help"
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Sparkles className="w-2 h-2 text-white" />
            </motion.div>
          </motion.div>
        </TooltipTrigger>
        <TooltipContent 
          side={position} 
          className={`max-w-xs p-0 border-0 shadow-xl ${playful ? 'animate-none' : ''}`}
        >
          <AnimatePresence>
            {isOpen && (
              <motion.div
                className={`rounded-lg border-2 ${colorClass} p-4 shadow-lg`}
                {...(playful ? playfulAnimations[animationType] : {})}
              >
                {/* Header */}
                {title && (
                  <div className="flex items-center gap-2 mb-2">
                    <motion.div
                      animate={playful ? { rotate: [0, 360] } : {}}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                      <Icon className="w-4 h-4" />
                    </motion.div>
                    <span className="font-semibold text-sm">{title}</span>
                  </div>
                )}
                
                {/* Content */}
                <div className="text-sm leading-relaxed">
                  {content}
                </div>
                
                {/* Decorative elements for playful tooltips */}
                {playful && (
                  <div className="absolute -top-1 -left-1">
                    <motion.div
                      className="w-2 h-2 rounded-full bg-secondary"
                      animate={{
                        scale: [0, 1, 0],
                        opacity: [0, 1, 0]
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        delay: 0.5
                      }}
                    />
                  </div>
                )}
                
                {playful && (
                  <div className="absolute -bottom-1 -right-1">
                    <motion.div
                      className="w-3 h-3 rounded-full bg-primary"
                      animate={{
                        scale: [1, 1.5, 1],
                        rotate: [0, 180, 360]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

// Pre-configured tooltip components for common use cases
export const HelpTooltip = ({ children, content, title }: { children: React.ReactNode; content: string; title?: string }) => (
  <ContextualTooltip type="help" content={content} title={title}>
    {children}
  </ContextualTooltip>
);

export const TipTooltip = ({ children, content, title }: { children: React.ReactNode; content: string; title?: string }) => (
  <ContextualTooltip type="tip" content={content} title={title || "💡 Pro Tip"}>
    {children}
  </ContextualTooltip>
);

export const FeatureTooltip = ({ children, content, title }: { children: React.ReactNode; content: string; title?: string }) => (
  <ContextualTooltip type="feature" content={content} title={title || "✨ New Feature"}>
    {children}
  </ContextualTooltip>
);

export const AITooltip = ({ children, content, title }: { children: React.ReactNode; content: string; title?: string }) => (
  <ContextualTooltip type="ai" content={content} title={title || "🤖 AI Powered"} playful={true}>
    {children}
  </ContextualTooltip>
);

export const SuccessTooltip = ({ children, content, title }: { children: React.ReactNode; content: string; title?: string }) => (
  <ContextualTooltip type="success" content={content} title={title || "🏆 Success"} playful={true}>
    {children}
  </ContextualTooltip>
);

// Smart tooltip that adapts based on content type
export const SmartTooltip = ({ children, content, context }: { 
  children: React.ReactNode; 
  content: string; 
  context: 'commission' | 'lead-generation' | 'ai-automation' | 'team-building' | 'financial-planning' 
}) => {
  const contextConfig = {
    'commission': { type: 'success' as const, title: '💰 Commission Calculator', icon: DollarSign },
    'lead-generation': { type: 'feature' as const, title: '🎯 Lead Generation', icon: Target },
    'ai-automation': { type: 'ai' as const, title: '🤖 AI Automation', icon: Bot },
    'team-building': { type: 'tip' as const, title: '👥 Team Building', icon: Users },
    'financial-planning': { type: 'help' as const, title: '📊 Financial Planning', icon: TrendingUp }
  };

  const config = contextConfig[context];
  
  return (
    <ContextualTooltip 
      type={config.type} 
      content={content} 
      title={config.title}
      playful={config.type === 'ai' || config.type === 'success'}
    >
      {children}
    </ContextualTooltip>
  );
};