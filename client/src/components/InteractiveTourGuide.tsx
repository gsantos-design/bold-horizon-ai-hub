import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  ArrowRight, 
  ArrowLeft, 
  X, 
  PlayCircle, 
  CheckCircle, 
  Sparkles,
  Target,
  Zap,
  Users,
  Calculator,
  Bot,
  Video
} from 'lucide-react';

interface TourStep {
  id: string;
  title: string;
  content: string;
  target: string;
  position: 'top' | 'bottom' | 'left' | 'right';
  icon: React.ReactNode;
  action?: () => void;
}

interface InteractiveTourGuideProps {
  steps: TourStep[];
  isActive: boolean;
  onComplete: () => void;
  onSkip: () => void;
}

export default function InteractiveTourGuide({ steps, isActive, onComplete, onSkip }: InteractiveTourGuideProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [targetElement, setTargetElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (isActive && steps[currentStep]) {
      const element = document.querySelector(steps[currentStep].target) as HTMLElement;
      setTargetElement(element);
      
      // Scroll element into view
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center' 
        });
      }
    }
  }, [currentStep, isActive, steps]);

  const handleNext = () => {
    if (steps[currentStep]?.action) {
      steps[currentStep].action();
    }
    
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    onSkip();
  };

  if (!isActive || !steps[currentStep]) return null;

  const step = steps[currentStep];
  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <AnimatePresence>
      {isActive && (
        <>
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-30 z-40"
            onClick={handleSkip}
          />
          
          {/* Spotlight effect on target element */}
          {targetElement && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="fixed z-40 pointer-events-none"
              style={{
                top: targetElement.offsetTop - 10,
                left: targetElement.offsetLeft - 10,
                width: targetElement.offsetWidth + 20,
                height: targetElement.offsetHeight + 20,
                boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.3), 0 0 20px rgba(59, 130, 246, 0.5)',
                borderRadius: '8px'
              }}
            />
          )}
          
          {/* Tour guide card */}
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed z-50 max-w-sm mx-4"
            style={{
              top: targetElement ? 
                (step.position === 'bottom' ? targetElement.offsetTop + targetElement.offsetHeight + 20 :
                 step.position === 'top' ? targetElement.offsetTop - 200 :
                 targetElement.offsetTop) : '50%',
              left: targetElement ?
                (step.position === 'right' ? targetElement.offsetLeft + targetElement.offsetWidth + 20 :
                 step.position === 'left' ? targetElement.offsetLeft - 300 :
                 targetElement.offsetLeft) : '50%',
              transform: !targetElement ? 'translate(-50%, -50%)' : 'none'
            }}
          >
            <Card className="border-2 border-blue-200 shadow-2xl bg-gradient-to-br from-white to-blue-50">
              <CardContent className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                      className="p-2 rounded-full bg-blue-100"
                    >
                      {step.icon}
                    </motion.div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-800">{step.title}</h3>
                      <p className="text-sm text-blue-600">Step {currentStep + 1} of {steps.length}</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleSkip}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                  <motion.div 
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>

                {/* Content */}
                <div className="mb-6 text-gray-700 leading-relaxed">
                  {step.content}
                </div>

                {/* Navigation */}
                <div className="flex items-center justify-between">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handlePrevious}
                    disabled={currentStep === 0}
                    className="flex items-center gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Previous
                  </Button>
                  
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleSkip}
                      className="text-gray-500"
                    >
                      Skip Tour
                    </Button>
                    
                    <Button
                      size="sm"
                      onClick={handleNext}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 text-white flex items-center gap-2"
                    >
                      {currentStep === steps.length - 1 ? (
                        <>
                          <CheckCircle className="w-4 h-4" />
                          Complete
                        </>
                      ) : (
                        <>
                          Next
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </Button>
                  </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute -top-2 -right-2">
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      rotate: [0, 180, 360]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <Sparkles className="w-6 h-6 text-yellow-400" />
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// Pre-configured tour steps for different pages
export const homePageTour: TourStep[] = [
  {
    id: 'welcome',
    title: 'Welcome to Santiago Team!',
    content: 'Discover how our cosmic-themed platform transforms financial career exploration with AI-powered tools and immersive experiences.',
    target: '.hero-section',
    position: 'bottom',
    icon: <Sparkles className="w-5 h-5 text-blue-600" />
  },
  {
    id: 'navigation',
    title: 'Explore Our Features',
    content: 'Navigate through our comprehensive suite of tools including Empower360, AI Automation, Lead Engine, and Team Performance tracking.',
    target: 'nav',
    position: 'bottom',
    icon: <Target className="w-5 h-5 text-purple-600" />
  },
  {
    id: 'ai-features',
    title: 'AI-Powered Automation',
    content: 'Experience cutting-edge AI phone calls and video avatar cloning to 10x your lead generation capacity.',
    target: '[href="/ai-automation"]',
    position: 'bottom',
    icon: <Bot className="w-5 h-5 text-pink-600" />
  }
];

export const leadEngineTour: TourStep[] = [
  {
    id: 'dashboard',
    title: 'Lead Generation Dashboard',
    content: 'Your command center for managing leads, tracking performance, and optimizing campaigns across Florida and New York markets.',
    target: '.dashboard-section',
    position: 'bottom',
    icon: <Target className="w-5 h-5 text-blue-600" />
  },
  {
    id: 'targeting',
    title: 'Smart Targeting System',
    content: 'Target 401k rollover prospects, high-yield seekers, and entrepreneurs with precision using our advanced filtering system.',
    target: '.targeting-section',
    position: 'right',
    icon: <Zap className="w-5 h-5 text-green-600" />
  },
  {
    id: 'automation',
    title: 'Campaign Automation',
    content: 'Launch automated email sequences, LinkedIn campaigns, and AI-powered outreach to scale your lead generation.',
    target: '.automation-section',
    position: 'left',
    icon: <Bot className="w-5 h-5 text-purple-600" />
  }
];

export const aiAutomationTour: TourStep[] = [
  {
    id: 'overview',
    title: 'AI Automation Hub',
    content: 'Scale your outreach with AI-powered phone calls featuring Nolly and Pablo Santiago voice clones, plus personalized video avatars.',
    target: '.ai-overview-section',
    position: 'bottom',
    icon: <Bot className="w-5 h-5 text-pink-600" />
  },
  {
    id: 'phone-ai',
    title: 'Voice Cloning Setup',
    content: 'Configure AI phone calls with cloned voices of your team leaders. Expected ROI: 9,500-16,500% monthly return.',
    target: '.phone-ai-section',
    position: 'right',
    icon: <Video className="w-5 h-5 text-blue-600" />
  },
  {
    id: 'video-avatars',
    title: 'Video Avatar Creation',
    content: 'Generate personalized video messages at scale using AI avatars of Nolly and Pablo Santiago for email and social campaigns.',
    target: '.video-ai-section',
    position: 'left',
    icon: <Video className="w-5 h-5 text-purple-600" />
  }
];

// Hook for managing tour state
export const useTourGuide = (tourKey: string) => {
  const [isActive, setIsActive] = useState(false);
  const [hasSeenTour, setHasSeenTour] = useState(false);

  useEffect(() => {
    // Check if user has seen this tour before
    const seen = localStorage.getItem(`tour-${tourKey}-completed`);
    setHasSeenTour(!!seen);
  }, [tourKey]);

  const startTour = () => {
    setIsActive(true);
  };

  const completeTour = () => {
    setIsActive(false);
    localStorage.setItem(`tour-${tourKey}-completed`, 'true');
    setHasSeenTour(true);
  };

  const skipTour = () => {
    setIsActive(false);
    localStorage.setItem(`tour-${tourKey}-completed`, 'true');
    setHasSeenTour(true);
  };

  const resetTour = () => {
    localStorage.removeItem(`tour-${tourKey}-completed`);
    setHasSeenTour(false);
  };

  return {
    isActive,
    hasSeenTour,
    startTour,
    completeTour,
    skipTour,
    resetTour
  };
};