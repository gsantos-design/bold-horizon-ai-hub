import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, X, Star } from "lucide-react";
import { useProgress } from "@/lib/ProgressContext";

interface AchievementNotificationProps {
  achievement: {
    id: string;
    title: string;
    description: string;
    icon: string;
    category: "income" | "education" | "improvement" | "community";
  };
  onClose: () => void;
}

function AchievementNotification({ achievement, onClose }: AchievementNotificationProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Animate in
    setTimeout(() => setIsVisible(true), 100);
    
    // Auto close after 5 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300);
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "income": return "from-blue-500 to-cyan-500";
      case "education": return "from-green-500 to-emerald-500";
      case "improvement": return "from-purple-500 to-pink-500";
      case "community": return "from-yellow-500 to-orange-500";
      default: return "from-gray-500 to-gray-600";
    }
  };

  const getCategoryBadgeColor = (category: string) => {
    switch (category) {
      case "income": return "bg-blue-100 text-blue-800";
      case "education": return "bg-green-100 text-green-800";
      case "improvement": return "bg-purple-100 text-purple-800";
      case "community": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div
      className={`fixed top-4 right-4 z-50 transform transition-all duration-300 ${
        isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
      }`}
    >
      <Card className="w-80 bg-white shadow-lg border-0 overflow-hidden">
        <div className={`h-2 bg-gradient-to-r ${getCategoryColor(achievement.category)}`}></div>
        
        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className={`p-2 rounded-full bg-gradient-to-r ${getCategoryColor(achievement.category)} text-white`}>
                <Trophy className="h-4 w-4" />
              </div>
              <div>
                <div className="font-semibold text-gray-900 text-sm">Achievement Unlocked!</div>
                <Badge className={getCategoryBadgeColor(achievement.category)} variant="secondary">
                  +50 Points
                </Badge>
              </div>
            </div>
            <button
              onClick={() => {
                setIsVisible(false);
                setTimeout(onClose, 300);
              }}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="text-3xl">{achievement.icon}</div>
            <div className="flex-1">
              <h4 className="font-bold text-gray-900 mb-1">{achievement.title}</h4>
              <p className="text-sm text-gray-600">{achievement.description}</p>
            </div>
          </div>
          
          <div className="mt-3 flex items-center gap-1 text-xs text-gray-500">
            <Star className="h-3 w-3 text-yellow-500" />
            <span>You're making great progress with the Santiago Team!</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function AchievementNotificationContainer() {
  const { progress } = useProgress();
  const [notifications, setNotifications] = useState<Array<{ id: string; achievement: any }>>([]);
  const [lastCheckTime, setLastCheckTime] = useState(Date.now());

  useEffect(() => {
    // Check for newly unlocked achievements
    const newAchievements = progress.achievements.filter(achievement => 
      achievement.unlocked && 
      achievement.unlockedAt && 
      achievement.unlockedAt.getTime() > lastCheckTime
    );

    if (newAchievements.length > 0) {
      newAchievements.forEach((achievement, index) => {
        setTimeout(() => {
          setNotifications(prev => [...prev, { 
            id: `${achievement.id}-${Date.now()}`, 
            achievement 
          }]);
        }, index * 1000); // Stagger notifications if multiple unlocked at once
      });
      
      setLastCheckTime(Date.now());
    }
  }, [progress.achievements, lastCheckTime]);

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <>
      {notifications.map((notification, index) => (
        <div
          key={notification.id}
          style={{ top: `${1 + index * 6}rem` }}
          className="fixed right-4 z-50"
        >
          <AchievementNotification
            achievement={notification.achievement}
            onClose={() => removeNotification(notification.id)}
          />
        </div>
      ))}
    </>
  );
}