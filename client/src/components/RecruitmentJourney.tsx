import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Check, Users, Trophy, TrendingUp, Rocket, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

const journeySteps = [
  {
    id: 1,
    title: "Join The Team",
    description: "Start your journey with World Financial Group",
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
    <section className="py-16 bg-neutral-50" id="recruitment-journey">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-br from-indigo-600 to-blue-400 bg-clip-text text-transparent mb-3">
            Your Recruitment Journey
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Follow the path to success with WFG. Each step brings you closer to achieving 
            financial independence and building a lasting legacy.
          </p>
        </div>

        {/* Progress Tracker */}
        <div className="relative max-w-4xl mx-auto mb-12">
          <div className="hidden md:block h-1 bg-neutral-200 absolute top-5 left-0 right-0 z-0">
            <motion.div 
              className="h-full bg-primary"
              style={{ 
                width: `${(activeStep - 1) * (100 / (journeySteps.length - 1))}%`
              }}
              initial={{ width: '0%' }}
              animate={{ 
                width: `${(activeStep - 1) * (100 / (journeySteps.length - 1))}%` 
              }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          </div>

          <div className="flex justify-between items-center relative z-10">
            {journeySteps.map((step) => (
              <button
                key={step.id}
                onClick={() => handleStepClick(step.id)}
                className={cn(
                  "flex flex-col items-center cursor-pointer transition-all duration-300",
                  "relative"
                )}
                aria-label={`View ${step.title} step`}
              >
                <div 
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center z-10 transition-all duration-300",
                    "border-4",
                    step.id <= activeStep 
                      ? "bg-primary border-primary-foreground" 
                      : "bg-neutral-100 border-neutral-200",
                    step.id === activeStep && "ring-4 ring-primary/20"
                  )}
                >
                  <span 
                    className={cn(
                      "text-sm font-bold",
                      step.id <= activeStep ? "text-primary-foreground" : "text-neutral-400"
                    )}
                  >
                    {step.id}
                  </span>
                </div>
                <span 
                  className={cn(
                    "text-xs mt-2 font-medium hidden md:block text-center",
                    step.id === activeStep ? "text-primary" : "text-neutral-500"
                  )}
                >
                  {step.title}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Active Step Content */}
        <div className="max-w-4xl mx-auto">
          {journeySteps.map((step) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: step.id === activeStep ? 1 : 0,
                y: step.id === activeStep ? 0 : 20,
                display: step.id === activeStep ? "block" : "none"
              }}
              transition={{ duration: 0.5 }}
              className="bg-white shadow-lg rounded-lg overflow-hidden"
            >
              <div className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row items-start gap-6">
                  <div className="p-4 bg-primary/10 rounded-full">
                    {step.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-2 text-primary">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      {step.description}
                    </p>
                    
                    <h4 className="font-semibold mb-3 text-neutral-700">
                      Key Milestones:
                    </h4>
                    <ul className="space-y-3">
                      {step.milestones.map((milestone, i) => (
                        <motion.li 
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: i * 0.15 }}
                          className="flex items-start gap-3"
                        >
                          <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center mt-0.5">
                            <Check className="h-3.5 w-3.5 text-primary" />
                          </div>
                          <span>{milestone}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="bg-neutral-50 px-8 py-4 flex items-center justify-between">
                <div className="text-sm text-neutral-500">
                  Step {step.id} of {journeySteps.length}
                </div>
                <div className="flex gap-3">
                  {step.id < journeySteps.length ? (
                    <button 
                      onClick={() => handleStepClick(step.id + 1)}
                      className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                    >
                      Next Step →
                    </button>
                  ) : (
                    <button 
                      onClick={handleRestart}
                      className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                    >
                      Restart Journey
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call To Action */}
        <div className="mt-12 text-center">
          <Card className="max-w-lg mx-auto bg-primary text-primary-foreground">
            <CardContent className="pt-6">
              <h3 className="text-xl font-bold mb-2">Ready to Start Your Journey?</h3>
              <p className="mb-4">Take the first step toward your financial future today.</p>
              <button 
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-background text-primary hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
              >
                Contact Us Today
              </button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}