import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Users, Trophy, TrendingUp, Rocket, Zap, ArrowRight, ChevronRight, Star, Moon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface JourneyStep {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  milestones: string[];
}

const journeySteps: JourneyStep[] = [
  {
    id: 1,
    title: "Join The Team",
    description: "Start your journey with Bold Horizons with World Financial Group",
    icon: <Users className="h-10 w-10 text-primary" />,
    milestones: [
      "Complete orientation",
      "Meet your mentor",
      "Set initial goals"
    ]
  },
  {
    id: 2,
    title: "Get Licensed",
    description: "Obtain necessary certifications to begin your career",
    icon: <Check className="h-10 w-10 text-primary" />,
    milestones: [
      "Study for exams",
      "Pass licensing tests",
      "Register credentials"
    ]
  },
  {
    id: 3,
    title: "First Clients",
    description: "Begin building your client portfolio",
    icon: <TrendingUp className="h-10 w-10 text-primary" />,
    milestones: [
      "Develop prospecting strategies",
      "Schedule first meetings",
      "Complete initial sales"
    ]
  },
  {
    id: 4,
    title: "Build Your Team",
    description: "Expand your impact by recruiting others",
    icon: <Zap className="h-10 w-10 text-primary" />,
    milestones: [
      "Identify potential recruits",
      "Host opportunity meetings",
      "Train new team members"
    ]
  },
  {
    id: 5,
    title: "Leadership Growth",
    description: "Develop into a strong leader within the organization",
    icon: <Trophy className="h-10 w-10 text-primary" />,
    milestones: [
      "Hit promotion targets",
      "Expand team structure",
      "Earn leadership bonuses"
    ]
  },
  {
    id: 6,
    title: "Financial Freedom",
    description: "Achieve your ultimate financial and lifestyle goals",
    icon: <Rocket className="h-10 w-10 text-primary" />,
    milestones: [
      "Create passive income streams",
      "Reach top compensation levels",
      "Build a lasting legacy"
    ]
  }
];

// Cosmic background element
const CosmicBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Cosmic effect with stars and moon */}
      <div className="absolute w-full h-full bg-blue-900/10 backdrop-blur-[100px]"></div>
      
      {/* Stars */}
      {Array.from({ length: 30 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            width: Math.random() * 3 + 1,
            height: Math.random() * 3 + 1,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            repeatType: "reverse",
            delay: Math.random() * 5,
          }}
        />
      ))}
      
      {/* Larger stars */}
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.div
          key={`large-${i}`}
          className="absolute text-white/70"
          style={{
            top: `${Math.random() * 90 + 5}%`,
            left: `${Math.random() * 90 + 5}%`,
          }}
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: "reverse",
            delay: Math.random() * 3,
          }}
        >
          <Star className="h-4 w-4" />
        </motion.div>
      ))}
      
      {/* Moon */}
      <motion.div 
        className="absolute right-[10%] top-[15%]"
        animate={{
          y: [0, 10, 0],
          opacity: [0.8, 1, 0.8],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        <Moon className="h-16 w-16 text-white/30" />
      </motion.div>
      
      {/* Glowing orbs */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={`orb-${i}`}
          className="absolute rounded-full bg-blue-300/10 blur-xl"
          style={{
            width: Math.random() * 150 + 50,
            height: Math.random() * 150 + 50,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            opacity: [0.1, 0.3, 0.1],
            scale: [1, 1.2, 1],
            x: [0, Math.random() * 50 - 25, 0],
            y: [0, Math.random() * 50 - 25, 0],
          }}
          transition={{
            duration: Math.random() * 20 + 10,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      ))}
    </div>
  );
};

export default function RecruitmentJourney() {
  const [activeStep, setActiveStep] = useState(1);
  const [autoAdvance, setAutoAdvance] = useState(true);

  // Auto-advance through steps at regular intervals if autoAdvance is true
  useEffect(() => {
    if (!autoAdvance) return;
    
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev >= journeySteps.length ? 1 : prev + 1));
    }, 5000); // Change step every 5 seconds
    
    return () => clearInterval(timer);
  }, [autoAdvance]);

  const handleStepClick = (stepId: number) => {
    setActiveStep(stepId);
    setAutoAdvance(false); // Stop auto advance when user interacts
  };

  const handleRestart = () => {
    setActiveStep(1);
    setAutoAdvance(true);
  };

  return (
    <section className="py-16 relative overflow-hidden" id="recruitment-journey">
      {/* 3D Cosmic Background */}
      <div className="absolute inset-0 bg-blue-50"></div>
      <CosmicBackground />
      
      <div className="container px-4 mx-auto relative z-10">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-3 px-3 py-1 bg-primary/5 text-primary border-primary/20">
            Your Path to Success
          </Badge>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
            WFG Recruitment Journey
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Follow the path to success with WFG. Each step brings you closer to achieving 
            financial independence and building a lasting legacy.
          </p>
        </div>

        {/* Progress Tracker */}
        <div className="relative max-w-5xl mx-auto mb-12">
          {/* Progress Line */}
          <div className="hidden md:block h-2 bg-blue-200/50 rounded-full absolute top-7 left-7 right-7 z-0">
            <motion.div 
              className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"
              style={{ 
                width: `${(activeStep - 1) * (100 / (journeySteps.length - 1))}%`
              }}
              initial={{ width: '0%' }}
              animate={{ 
                width: `${(activeStep - 1) * (100 / (journeySteps.length - 1))}%` 
              }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
            />
          </div>

          {/* Floating Animated Dots */}
          <div className="hidden md:block absolute top-0 left-0 right-0 h-16 overflow-hidden">
            {Array.from({ length: 5 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full bg-primary/40"
                initial={{ 
                  top: Math.random() * 16, 
                  left: `${Math.random() * 80 + 5}%`,
                  opacity: 0.2,
                }}
                animate={{ 
                  top: [Math.random() * 16, Math.random() * 16, Math.random() * 16],
                  opacity: [0.2, 0.8, 0.2],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: i * 0.7,
                }}
              />
            ))}
          </div>

          {/* Step Markers */}
          <div className="flex justify-between items-center relative z-10 px-4 md:px-0">
            {journeySteps.map((step) => (
              <button
                key={step.id}
                onClick={() => handleStepClick(step.id)}
                className={cn(
                  "flex flex-col items-center cursor-pointer transition-all duration-300",
                  "relative group",
                  {
                    "scale-110": step.id === activeStep
                  }
                )}
                aria-label={`View ${step.title} step`}
              >
                {/* Step Circle */}
                <motion.div 
                  className={cn(
                    "w-14 h-14 rounded-full flex items-center justify-center z-10 transition-all duration-500",
                    "border-4 shadow-md",
                    step.id <= activeStep 
                      ? "bg-blue-600 border-white" 
                      : "bg-white border-neutral-200",
                    step.id === activeStep && "ring-4 ring-blue-200"
                  )}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {step.id <= activeStep ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    >
                      {React.cloneElement(step.icon as React.ReactElement, { className: "h-6 w-6 text-white" })}
                    </motion.div>
                  ) : (
                    <span className="text-lg font-bold text-neutral-400">
                      {step.id}
                    </span>
                  )}
                  
                  {/* Pulse animation for active step */}
                  {step.id === activeStep && (
                    <motion.div
                      className="absolute inset-0 rounded-full bg-blue-500/40"
                      animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}

                  {/* Star decoration for completed steps */}
                  {step.id < activeStep && (
                    <motion.div
                      className="absolute -top-1 -right-1"
                      initial={{ scale: 0, rotate: -30 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.2, type: "spring" }}
                    >
                      <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                    </motion.div>
                  )}
                </motion.div>
                
                {/* Step Title */}
                <div className="mt-3 text-center">
                  <AnimatePresence>
                    <motion.span 
                      className={cn(
                        "text-sm font-semibold hidden md:block",
                        step.id === activeStep 
                          ? "text-blue-700" 
                          : step.id < activeStep 
                            ? "text-blue-600" 
                            : "text-neutral-500"
                      )}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      {step.title}
                    </motion.span>
                  </AnimatePresence>
                  
                  {/* Mobile Step Number */}
                  <span className="text-xs font-medium block md:hidden text-neutral-500">
                    Step {step.id}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Active Step Content */}
        <div className="max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            {journeySteps.map((step) => (
              step.id === activeStep && (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white/80 backdrop-blur-sm shadow-xl rounded-xl overflow-hidden border border-blue-100"
                >
                  {/* Header Gradient */}
                  <div className="h-2 bg-blue-500" />
                  
                  <div className="p-8 md:p-10">
                    <div className="flex flex-col md:flex-row items-start gap-8">
                      {/* Icon Section */}
                      <div className="md:w-24 flex flex-col items-center">
                        <div className="p-5 bg-blue-100 rounded-2xl shadow-sm border border-blue-200">
                          <motion.div
                            initial={{ rotate: -10, scale: 0.9 }}
                            animate={{ rotate: 0, scale: 1 }}
                            transition={{ type: "spring", stiffness: 200 }}
                          >
                            {React.cloneElement(step.icon as React.ReactElement, { className: "h-12 w-12 text-blue-600" })}
                          </motion.div>
                        </div>
                        <Badge className="mt-4 bg-blue-100 text-blue-700 hover:bg-blue-200 border-none">
                          Step {step.id}
                        </Badge>
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1">
                        <h3 className="text-3xl font-bold mb-3 text-blue-700">
                          {step.title}
                        </h3>
                        <p className="text-lg text-neutral-600 mb-8 border-l-4 border-blue-200 pl-4 italic">
                          {step.description}
                        </p>
                        
                        <h4 className="font-semibold mb-4 text-neutral-800 flex items-center">
                          <Star className="h-5 w-5 mr-2 text-yellow-500 fill-yellow-500" />
                          Key Milestones:
                        </h4>
                        <ul className="space-y-4 mb-6">
                          {step.milestones.map((milestone, i) => (
                            <motion.li 
                              key={i}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.4, delay: i * 0.2 }}
                              className="flex items-start gap-4 p-3 rounded-lg bg-blue-50 border border-blue-100"
                            >
                              <div className="flex-shrink-0 h-7 w-7 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center mt-0.5 border border-blue-300">
                                <Check className="h-4 w-4 text-blue-600" />
                              </div>
                              <span className="text-neutral-700">{milestone}</span>
                            </motion.li>
                          ))}
                        </ul>
                        
                        {/* Navigation Buttons */}
                        <div className="flex flex-col sm:flex-row sm:justify-between items-center gap-4 mt-8 pt-6 border-t border-neutral-200">
                          <div className="flex items-center text-sm text-neutral-500">
                            <div className="h-2 w-2 bg-blue-500 rounded-full mr-2"></div>
                            <span>Your progress: Step {step.id} of {journeySteps.length}</span>
                          </div>
                          <div className="flex gap-3">
                            {step.id > 1 && (
                              <button 
                                onClick={() => handleStepClick(step.id - 1)}
                                className="px-4 py-2 border border-blue-200 rounded-md text-sm font-medium hover:bg-blue-50 transition-colors flex items-center"
                              >
                                <ChevronRight className="h-4 w-4 mr-1 transform rotate-180" />
                                Previous
                              </button>
                            )}
                            {step.id < journeySteps.length ? (
                              <button 
                                onClick={() => handleStepClick(step.id + 1)}
                                className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors flex items-center"
                              >
                                Next Step
                                <ChevronRight className="h-4 w-4 ml-1" />
                              </button>
                            ) : (
                              <button 
                                onClick={handleRestart}
                                className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors flex items-center"
                              >
                                Restart Journey
                                <ArrowRight className="h-4 w-4 ml-1" />
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            ))}
          </AnimatePresence>
        </div>

        {/* Call To Action */}
        <div className="mt-16 text-center">
          <Card className="max-w-xl mx-auto overflow-hidden border-none">
            <div className="absolute inset-0 bg-blue-600 rounded-lg opacity-90" />
            <CardContent className="relative z-10 px-8 py-10">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <h3 className="text-2xl font-bold mb-3 text-white">Ready to Start Your Journey?</h3>
                <p className="mb-6 text-white/80">Take the first step toward financial independence and join our team today.</p>
                <button 
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-white text-primary hover:bg-neutral-100 h-11 px-6 py-3"
                >
                  Contact Us Today
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </motion.div>
              
              {/* Stars in CTA */}
              <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                {Array.from({ length: 12 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute rounded-full bg-white/20"
                    style={{
                      width: Math.random() * 4 + 1,
                      height: Math.random() * 4 + 1,
                      top: `${Math.random() * 100}%`,
                      left: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      opacity: [0.2, 0.8, 0.2],
                      scale: [1, 1.5, 1],
                    }}
                    transition={{
                      duration: Math.random() * 3 + 2,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}