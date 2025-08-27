import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Trophy, 
  Target, 
  Users, 
  Flame, 
  Award, 
  Calendar, 
  TrendingUp,
  Star,
  Gift,
  Zap,
  Heart,
  Clock
} from "lucide-react";
import { useProgress } from "@/lib/ProgressContext";

export default function GamificationDashboard() {
  const {
    progress,
    joinChallenge,
    updateChallengeProgress,
    addReferral
  } = useProgress();

  const [selectedChallenge, setSelectedChallenge] = useState<string | null>(null);

  const levelProgress = (progress.totalPoints % 100);
  const nextLevelPoints = 100 - levelProgress;

  const unlockedAchievements = progress.achievements.filter(a => a.unlocked);
  const lockedAchievements = progress.achievements.filter(a => !a.unlocked);

  const availableChallenges = [
    {
      id: "ten-percent-challenge",
      title: "10% Savings Challenge",
      description: "Save 10% of your income every day for 30 days",
      duration: 30,
      participants: 156,
      reward: "Financial Freedom Badge + 500 Points",
      difficulty: "Beginner",
      icon: "💰",
      category: "savings"
    },
    {
      id: "gratitude-21",
      title: "21-Day Gratitude Journey",
      description: "Write 3 gratitude entries daily for 21 days",
      duration: 21,
      participants: 89,
      reward: "Gratitude Master Badge + 300 Points",
      difficulty: "Easy",
      icon: "🙏",
      category: "gratitude"
    },
    {
      id: "vision-builder",
      title: "Vision Board Builder",
      description: "Create 10 detailed vision items across different categories",
      duration: 14,
      participants: 67,
      reward: "Dream Architect Badge + 400 Points",
      difficulty: "Intermediate",
      icon: "🎯",
      category: "vision"
    },
    {
      id: "learning-streak",
      title: "Daily Learning Streak",
      description: "Complete one workshop or module daily for 14 days",
      duration: 14,
      participants: 45,
      reward: "Knowledge Seeker Badge + 350 Points",
      difficulty: "Intermediate",
      icon: "📚",
      category: "learning"
    }
  ];

  const isAlreadyInChallenge = (challengeId: string) => {
    return progress.activeChallenges.some(c => c.id === challengeId);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "bg-green-100 text-green-800";
      case "Beginner": return "bg-blue-100 text-blue-800";
      case "Intermediate": return "bg-yellow-100 text-yellow-800";
      case "Advanced": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "income": return "💼";
      case "education": return "🎓";
      case "improvement": return "🧠";
      case "community": return "👥";
      default: return "🏆";
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Trophy className="h-8 w-8 text-accent" />
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Your Journey Progress</h2>
            <p className="text-gray-600">Track your growth with the Santiago Team</p>
          </div>
        </div>
        
        <div className="text-right">
          <div className="text-3xl font-bold text-accent">Level {progress.level}</div>
          <div className="text-sm text-gray-600">{progress.totalPoints} points</div>
        </div>
      </div>

      {/* Level Progress */}
      <div className="bg-white rounded-lg p-4 mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">Level Progress</span>
          <span className="text-sm text-gray-500">{nextLevelPoints} points to next level</span>
        </div>
        <Progress value={levelProgress} className="h-3" />
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg p-4 text-center">
          <Flame className="h-6 w-6 text-primary mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">{progress.dailyLoginStreak}</div>
          <div className="text-sm text-gray-600">Day Streak</div>
        </div>
        
        <div className="bg-white rounded-lg p-4 text-center">
          <Target className="h-6 w-6 text-primary mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">{unlockedAchievements.length}</div>
          <div className="text-sm text-gray-600">Achievements</div>
        </div>
        
        <div className="bg-white rounded-lg p-4 text-center">
          <Users className="h-6 w-6 text-primary mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">{progress.referralCount}</div>
          <div className="text-sm text-gray-600">Referrals</div>
        </div>
        
        <div className="bg-white rounded-lg p-4 text-center">
          <Calendar className="h-6 w-6 text-primary mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">{progress.activeChallenges.length}</div>
          <div className="text-sm text-gray-600">Active Challenges</div>
        </div>
      </div>

      <Tabs defaultValue="achievements" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="achievements" className="flex items-center gap-2">
            <Award className="h-4 w-4" />
            Achievements
          </TabsTrigger>
          <TabsTrigger value="challenges" className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            Challenges
          </TabsTrigger>
          <TabsTrigger value="leaderboard" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Progress
          </TabsTrigger>
        </TabsList>

        <TabsContent value="achievements" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Unlocked Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary">
                  <Trophy className="h-5 w-5" />
                  Unlocked ({unlockedAchievements.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {unlockedAchievements.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">
                    Start exploring to unlock your first achievement!
                  </p>
                ) : (
                  unlockedAchievements.map((achievement) => (
                    <div key={achievement.id} className="flex items-center gap-3 p-3 bg-primary/5 rounded-lg border border-primary/20">
                      <div className="text-2xl">{achievement.icon}</div>
                      <div className="flex-1">
                        <div className="font-semibold text-primary">{achievement.title}</div>
                        <div className="text-sm text-gray-700">{achievement.description}</div>
                      </div>
                      <Badge className="bg-primary/10 text-primary">
                        {getCategoryIcon(achievement.category)}
                      </Badge>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>

            {/* Locked Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-600">
                  <Star className="h-5 w-5" />
                  Next Goals ({lockedAchievements.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {lockedAchievements.slice(0, 5).map((achievement) => (
                  <div key={achievement.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-2xl opacity-50">{achievement.icon}</div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-700">{achievement.title}</div>
                      <div className="text-sm text-gray-600">{achievement.description}</div>
                    </div>
                    <Badge variant="secondary">
                      {getCategoryIcon(achievement.category)}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="challenges" className="space-y-6">
          {/* Active Challenges */}
          {progress.activeChallenges.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary">
                  <Zap className="h-5 w-5" />
                  Your Active Challenges
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {progress.activeChallenges.map((challenge) => (
                  <div key={challenge.id} className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-semibold text-primary">{challenge.title}</h4>
                        <p className="text-sm text-gray-700">{challenge.description}</p>
                      </div>
                      <Badge className="bg-primary/10 text-primary">
                        {Math.ceil((challenge.endDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24))} days left
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress: {challenge.current}/{challenge.target}</span>
                        <span>{Math.round((challenge.current / challenge.target) * 100)}%</span>
                      </div>
                      <Progress value={(challenge.current / challenge.target) * 100} className="h-2" />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Available Challenges */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Join a Challenge
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {availableChallenges.map((challenge) => (
                <div key={challenge.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{challenge.icon}</span>
                      <div>
                        <h4 className="font-semibold text-gray-900">{challenge.title}</h4>
                        <Badge className={getDifficultyColor(challenge.difficulty)} variant="secondary">
                          {challenge.difficulty}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right text-sm text-gray-500">
                      <Clock className="h-4 w-4 inline mr-1" />
                      {challenge.duration} days
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-3">{challenge.description}</p>
                  
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Users className="h-4 w-4" />
                      {challenge.participants} participants
                    </div>
                    <div className="text-xs text-green-600 font-medium">
                      <Gift className="h-3 w-3 inline mr-1" />
                      {challenge.reward}
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full" 
                    size="sm"
                    disabled={isAlreadyInChallenge(challenge.id)}
                    onClick={() => joinChallenge(challenge.id)}
                  >
                    {isAlreadyInChallenge(challenge.id) ? "Already Joined" : "Join Challenge"}
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="leaderboard" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Personal Progress */}
            <Card>
              <CardHeader>
                <CardTitle>Your Progress Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-xl font-bold text-gray-900">{progress.workshopsCompleted.length}</div>
                    <div className="text-sm text-gray-600">Workshops Completed</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-xl font-bold text-gray-900">{progress.quizzesTaken.length}</div>
                    <div className="text-sm text-gray-600">Quizzes Taken</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-xl font-bold text-gray-900">{progress.visionItemsCreated}</div>
                    <div className="text-sm text-gray-600">Vision Items</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-xl font-bold text-gray-900">{progress.gratitudeEntries}</div>
                    <div className="text-sm text-gray-600">Gratitude Entries</div>
                  </div>
                </div>
                
                <div className="pt-4 border-t">
                  <h4 className="font-semibold mb-2">Recent Milestones</h4>
                  {unlockedAchievements.slice(-3).map((achievement) => (
                    <div key={achievement.id} className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                      <span>{achievement.icon}</span>
                      <span>Unlocked "{achievement.title}"</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Referral System */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-accent" />
                  Grow the Santiago Team
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center p-4 bg-primary/5 rounded-lg border border-primary/20">
                  <div className="text-2xl font-bold text-accent mb-1">
                    Level {progress.referralLevel} Referrer
                  </div>
                  <div className="text-sm text-gray-600 mb-3">
                    {progress.referralCount} people joined through you
                  </div>
                  <div className="text-xs text-gray-500">
                    Next level at {progress.referralLevel * 3} referrals
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-semibold">Referral Rewards</h4>
                  <div className="text-sm text-gray-600 space-y-1">
                    <div>• 1st referral: Welcome Bonus (100 points)</div>
                    <div>• 3rd referral: Growth Champion Badge</div>
                    <div>• 5th referral: Leadership Circle Access</div>
                    <div>• 10th referral: Santiago Team Ambassador</div>
                  </div>
                </div>
                
                <div className="pt-4 border-t">
                  <Button 
                    className="w-full bg-primary text-white hover:bg-primary/90"
                    onClick={() => {
                      addReferral();
                      // In a real app, this would open a sharing dialog or copy referral link
                    }}
                  >
                    Share Your Journey
                  </Button>
                  <p className="text-xs text-gray-500 text-center mt-2">
                    Share your referral link: santiago-team.com/join?ref=YOU
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}