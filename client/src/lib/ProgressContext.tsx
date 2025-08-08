import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: Date;
  category: "income" | "education" | "improvement" | "community";
}

interface Challenge {
  id: string;
  title: string;
  description: string;
  target: number;
  current: number;
  duration: number; // days
  startDate: Date;
  endDate: Date;
  participants: number;
  type: "savings" | "gratitude" | "learning" | "vision";
}

interface ProgressData {
  // Achievements
  achievements: Achievement[];
  totalPoints: number;
  level: number;
  
  // Challenges
  activeChallenges: Challenge[];
  completedChallenges: Challenge[];
  
  // Progress tracking
  workshopsCompleted: string[];
  modulesStarted: string[];
  quizzesTaken: string[];
  calculatorsUsed: string[];
  visionItemsCreated: number;
  gratitudeEntries: number;
  confidenceAssessments: number;
  
  // Streaks and habits
  dailyLoginStreak: number;
  gratitudeStreak: number;
  learningStreak: number;
  lastLoginDate: Date | null;
  
  // Referrals
  referralCount: number;
  referralLevel: number;
}

interface ProgressContextType {
  progress: ProgressData;
  unlockAchievement: (achievementId: string) => void;
  addPoints: (points: number) => void;
  markWorkshopCompleted: (workshopId: string) => void;
  markModuleStarted: (moduleId: string) => void;
  markQuizTaken: (quizId: string) => void;
  markCalculatorUsed: (calculatorId: string) => void;
  addVisionItem: () => void;
  addGratitudeEntry: () => void;
  recordConfidenceAssessment: () => void;
  joinChallenge: (challengeId: string) => void;
  updateChallengeProgress: (challengeId: string, progress: number) => void;
  recordDailyLogin: () => void;
  addReferral: () => void;
}

const defaultProgress: ProgressData = {
  achievements: [
    {
      id: "first_login",
      title: "Welcome Aboard!",
      description: "Take your first step into The New Art of Living",
      icon: "🎉",
      unlocked: false,
      category: "community"
    },
    {
      id: "first_calculator",
      title: "Number Cruncher",
      description: "Use your first financial calculator",
      icon: "🧮",
      unlocked: false,
      category: "education"
    },
    {
      id: "quiz_master",
      title: "Lens Explorer",
      description: "Complete the Lens of Life quiz",
      icon: "🔍",
      unlocked: false,
      category: "improvement"
    },
    {
      id: "vision_creator",
      title: "Dream Architect",
      description: "Create your first vision board item",
      icon: "🎯",
      unlocked: false,
      category: "improvement"
    },
    {
      id: "gratitude_warrior",
      title: "Gratitude Warrior",
      description: "Write 10 gratitude entries",
      icon: "🙏",
      unlocked: false,
      category: "improvement"
    },
    {
      id: "system_builder",
      title: "System Builder",
      description: "Complete multi-handed income analysis",
      icon: "⚙️",
      unlocked: false,
      category: "income"
    },
    {
      id: "workshop_graduate",
      title: "Workshop Graduate",
      description: "Complete your first workshop",
      icon: "🎓",
      unlocked: false,
      category: "education"
    },
    {
      id: "streak_starter",
      title: "Streak Starter",
      description: "Maintain a 7-day login streak",
      icon: "🔥",
      unlocked: false,
      category: "community"
    },
    {
      id: "referral_champion",
      title: "Growth Champion",
      description: "Refer 3 people to the Santiago Team",
      icon: "👥",
      unlocked: false,
      category: "community"
    },
    {
      id: "ten_percent_saver",
      title: "10% Saver",
      description: "Join the 10% Savings Challenge",
      icon: "💰",
      unlocked: false,
      category: "education"
    }
  ],
  totalPoints: 0,
  level: 1,
  activeChallenges: [],
  completedChallenges: [],
  workshopsCompleted: [],
  modulesStarted: [],
  quizzesTaken: [],
  calculatorsUsed: [],
  visionItemsCreated: 0,
  gratitudeEntries: 0,
  confidenceAssessments: 0,
  dailyLoginStreak: 0,
  gratitudeStreak: 0,
  learningStreak: 0,
  lastLoginDate: null,
  referralCount: 0,
  referralLevel: 1
};

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<ProgressData>(() => {
    const saved = localStorage.getItem('santiago-progress');
    if (saved) {
      const parsed = JSON.parse(saved);
      // Convert date strings back to Date objects
      if (parsed.lastLoginDate) {
        parsed.lastLoginDate = new Date(parsed.lastLoginDate);
      }
      parsed.activeChallenges = parsed.activeChallenges?.map((c: any) => ({
        ...c,
        startDate: new Date(c.startDate),
        endDate: new Date(c.endDate)
      })) || [];
      parsed.completedChallenges = parsed.completedChallenges?.map((c: any) => ({
        ...c,
        startDate: new Date(c.startDate),
        endDate: new Date(c.endDate)
      })) || [];
      return { ...defaultProgress, ...parsed };
    }
    return defaultProgress;
  });

  // Save to localStorage whenever progress changes
  useEffect(() => {
    localStorage.setItem('santiago-progress', JSON.stringify(progress));
  }, [progress]);

  // Check for daily login on mount
  useEffect(() => {
    recordDailyLogin();
  }, []);

  const unlockAchievement = (achievementId: string) => {
    setProgress(prev => {
      const achievement = prev.achievements.find(a => a.id === achievementId);
      if (achievement && !achievement.unlocked) {
        const updatedAchievements = prev.achievements.map(a =>
          a.id === achievementId 
            ? { ...a, unlocked: true, unlockedAt: new Date() }
            : a
        );
        
        return {
          ...prev,
          achievements: updatedAchievements,
          totalPoints: prev.totalPoints + 50, // 50 points per achievement
          level: Math.floor((prev.totalPoints + 50) / 100) + 1
        };
      }
      return prev;
    });
  };

  const addPoints = (points: number) => {
    setProgress(prev => ({
      ...prev,
      totalPoints: prev.totalPoints + points,
      level: Math.floor((prev.totalPoints + points) / 100) + 1
    }));
  };

  const markWorkshopCompleted = (workshopId: string) => {
    setProgress(prev => {
      if (!prev.workshopsCompleted.includes(workshopId)) {
        const updated = {
          ...prev,
          workshopsCompleted: [...prev.workshopsCompleted, workshopId],
          totalPoints: prev.totalPoints + 25
        };
        
        if (updated.workshopsCompleted.length === 1) {
          setTimeout(() => unlockAchievement("workshop_graduate"), 100);
        }
        
        return updated;
      }
      return prev;
    });
  };

  const markModuleStarted = (moduleId: string) => {
    setProgress(prev => {
      if (!prev.modulesStarted.includes(moduleId)) {
        return {
          ...prev,
          modulesStarted: [...prev.modulesStarted, moduleId],
          totalPoints: prev.totalPoints + 10
        };
      }
      return prev;
    });
  };

  const markQuizTaken = (quizId: string) => {
    setProgress(prev => {
      if (!prev.quizzesTaken.includes(quizId)) {
        const updated = {
          ...prev,
          quizzesTaken: [...prev.quizzesTaken, quizId],
          totalPoints: prev.totalPoints + 30
        };
        
        if (quizId === "lens-of-life") {
          setTimeout(() => unlockAchievement("quiz_master"), 100);
        }
        
        return updated;
      }
      return prev;
    });
  };

  const markCalculatorUsed = (calculatorId: string) => {
    setProgress(prev => {
      if (!prev.calculatorsUsed.includes(calculatorId)) {
        const updated = {
          ...prev,
          calculatorsUsed: [...prev.calculatorsUsed, calculatorId],
          totalPoints: prev.totalPoints + 15
        };
        
        if (updated.calculatorsUsed.length === 1) {
          setTimeout(() => unlockAchievement("first_calculator"), 100);
        }
        
        if (calculatorId === "income-multiplier") {
          setTimeout(() => unlockAchievement("system_builder"), 100);
        }
        
        return updated;
      }
      return prev;
    });
  };

  const addVisionItem = () => {
    setProgress(prev => {
      const updated = {
        ...prev,
        visionItemsCreated: prev.visionItemsCreated + 1,
        totalPoints: prev.totalPoints + 20
      };
      
      if (updated.visionItemsCreated === 1) {
        setTimeout(() => unlockAchievement("vision_creator"), 100);
      }
      
      return updated;
    });
  };

  const addGratitudeEntry = () => {
    setProgress(prev => {
      const updated = {
        ...prev,
        gratitudeEntries: prev.gratitudeEntries + 1,
        totalPoints: prev.totalPoints + 5,
        gratitudeStreak: prev.gratitudeStreak + 1
      };
      
      if (updated.gratitudeEntries === 10) {
        setTimeout(() => unlockAchievement("gratitude_warrior"), 100);
      }
      
      return updated;
    });
  };

  const recordConfidenceAssessment = () => {
    setProgress(prev => ({
      ...prev,
      confidenceAssessments: prev.confidenceAssessments + 1,
      totalPoints: prev.totalPoints + 15
    }));
  };

  const joinChallenge = (challengeId: string) => {
    // This would typically make an API call
    // For now, we'll add a sample challenge
    if (challengeId === "ten-percent-challenge") {
      const challenge: Challenge = {
        id: "ten-percent-challenge",
        title: "10% Savings Challenge",
        description: "Save 10% of your income for 30 days",
        target: 30,
        current: 0,
        duration: 30,
        startDate: new Date(),
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        participants: 156,
        type: "savings"
      };
      
      setProgress(prev => ({
        ...prev,
        activeChallenges: [...prev.activeChallenges, challenge]
      }));
      
      setTimeout(() => unlockAchievement("ten_percent_saver"), 100);
    }
  };

  const updateChallengeProgress = (challengeId: string, progressValue: number) => {
    setProgress(prev => ({
      ...prev,
      activeChallenges: prev.activeChallenges.map(c =>
        c.id === challengeId ? { ...c, current: progressValue } : c
      )
    }));
  };

  const recordDailyLogin = () => {
    const today = new Date().toDateString();
    setProgress(prev => {
      const lastLogin = prev.lastLoginDate?.toDateString();
      const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toDateString();
      
      if (lastLogin === today) {
        return prev; // Already logged in today
      }
      
      let newStreak = 1;
      if (lastLogin === yesterday) {
        newStreak = prev.dailyLoginStreak + 1;
      }
      
      const updated = {
        ...prev,
        dailyLoginStreak: newStreak,
        lastLoginDate: new Date(),
        totalPoints: prev.totalPoints + 5
      };
      
      if (updated.dailyLoginStreak === 1 && prev.dailyLoginStreak === 0) {
        setTimeout(() => unlockAchievement("first_login"), 100);
      }
      
      if (updated.dailyLoginStreak === 7) {
        setTimeout(() => unlockAchievement("streak_starter"), 100);
      }
      
      return updated;
    });
  };

  const addReferral = () => {
    setProgress(prev => {
      const updated = {
        ...prev,
        referralCount: prev.referralCount + 1,
        referralLevel: Math.floor((prev.referralCount + 1) / 3) + 1,
        totalPoints: prev.totalPoints + 100
      };
      
      if (updated.referralCount === 3) {
        setTimeout(() => unlockAchievement("referral_champion"), 100);
      }
      
      return updated;
    });
  };

  const value: ProgressContextType = {
    progress,
    unlockAchievement,
    addPoints,
    markWorkshopCompleted,
    markModuleStarted,
    markQuizTaken,
    markCalculatorUsed,
    addVisionItem,
    addGratitudeEntry,
    recordConfidenceAssessment,
    joinChallenge,
    updateChallengeProgress,
    recordDailyLogin,
    addReferral
  };

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (context === undefined) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
}