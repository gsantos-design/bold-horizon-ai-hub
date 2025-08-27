import { motion } from "framer-motion";
import { Heart, Brain, Lightbulb, Target, Coffee, Smile, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface EmotionalIntelligenceDisplayProps {
  emotionalState?: string;
  emotionalTone?: string;
  mentorPersonality?: string;
  followUpActions?: string[];
  onActionClick?: (action: string) => void;
}

const emotionalIcons = {
  confident: { icon: <Smile className="w-4 h-4" />, color: "text-secondary", bg: "bg-secondary/10" },
  anxious: { icon: <Heart className="w-4 h-4" />, color: "text-primary", bg: "bg-primary/10" },
  excited: { icon: <Star className="w-4 h-4" />, color: "text-secondary", bg: "bg-secondary/10" },
  uncertain: { icon: <Brain className="w-4 h-4" />, color: "text-primary", bg: "bg-primary/10" },
  motivated: { icon: <Target className="w-4 h-4" />, color: "text-primary", bg: "bg-primary/10" },
  overwhelmed: { icon: <Coffee className="w-4 h-4" />, color: "text-secondary", bg: "bg-secondary/10" },
  neutral: { icon: <Brain className="w-4 h-4" />, color: "text-gray-600", bg: "bg-gray-50" },
  encouraging: { icon: <Lightbulb className="w-4 h-4" />, color: "text-secondary", bg: "bg-secondary/10" },
  supportive: { icon: <Heart className="w-4 h-4" />, color: "text-primary", bg: "bg-primary/10" },
  understanding: { icon: <Brain className="w-4 h-4" />, color: "text-primary", bg: "bg-primary/10" },
  welcoming: { icon: <Smile className="w-4 h-4" />, color: "text-secondary", bg: "bg-secondary/10" }
};

const mentorStyles = {
  nolly: {
    name: "Nolly Santiago",
    style: "bg-primary/10 border-primary/20 text-primary",
    description: "Empathetic & Detail-Oriented"
  },
  pablo: {
    name: "Pablo Santiago", 
    style: "bg-secondary/10 border-secondary/20 text-secondary",
    description: "Visionary & Strategic"
  },
  santiago_team: {
    name: "Pablo & Nolly's Office",
    style: "bg-primary/10 border-primary/20 text-primary",
    description: "Balanced Expertise"
  }
};

export function EmotionalIntelligenceDisplay({
  emotionalState,
  emotionalTone,
  mentorPersonality,
  followUpActions,
  onActionClick
}: EmotionalIntelligenceDisplayProps) {
  const currentEmotion = emotionalState || emotionalTone || 'neutral';
  const emotionData = emotionalIcons[currentEmotion as keyof typeof emotionalIcons] || emotionalIcons.neutral;
  const mentorData = mentorStyles[mentorPersonality as keyof typeof mentorStyles] || mentorStyles.santiago_team;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-3"
    >
      {/* Emotional State Indicator */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className={`p-2 rounded-full ${emotionData.bg}`}>
            <div className={emotionData.color}>
              {emotionData.icon}
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">
              Emotional State: <span className="capitalize">{currentEmotion}</span>
            </p>
            <p className="text-xs text-gray-600">AI is adapting response style</p>
          </div>
        </div>

        {/* Mentor Personality */}
        {mentorPersonality && (
          <Badge variant="outline" className={mentorData.style}>
            {mentorData.name}
          </Badge>
        )}
      </div>

      {/* Follow-up Actions */}
      {followUpActions && followUpActions.length > 0 && (
        <Card className="bg-gray-50">
          <CardContent className="p-3">
            <p className="text-sm font-medium text-gray-700 mb-2">
              Suggested next steps:
            </p>
            <div className="flex flex-wrap gap-2">
              {followUpActions.map((action, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onActionClick?.(action)}
                  className="text-xs px-3 py-1 bg-white hover:bg-primary/5 text-primary rounded-full border border-primary/20 transition-colors"
                >
                  {action}
                </motion.button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Emotional Intelligence Explanation */}
      <div className="text-xs text-gray-500 italic">
        💡 The AI Mentor uses emotional intelligence to detect your feelings and adapt its communication style to provide the most helpful support.
      </div>
    </motion.div>
  );
}