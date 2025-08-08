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
  confident: { icon: <Smile className="w-4 h-4" />, color: "text-green-600", bg: "bg-green-50" },
  anxious: { icon: <Heart className="w-4 h-4" />, color: "text-orange-600", bg: "bg-orange-50" },
  excited: { icon: <Star className="w-4 h-4" />, color: "text-yellow-600", bg: "bg-yellow-50" },
  uncertain: { icon: <Brain className="w-4 h-4" />, color: "text-blue-600", bg: "bg-blue-50" },
  motivated: { icon: <Target className="w-4 h-4" />, color: "text-purple-600", bg: "bg-purple-50" },
  overwhelmed: { icon: <Coffee className="w-4 h-4" />, color: "text-red-600", bg: "bg-red-50" },
  neutral: { icon: <Brain className="w-4 h-4" />, color: "text-gray-600", bg: "bg-gray-50" },
  encouraging: { icon: <Lightbulb className="w-4 h-4" />, color: "text-emerald-600", bg: "bg-emerald-50" },
  supportive: { icon: <Heart className="w-4 h-4" />, color: "text-blue-600", bg: "bg-blue-50" },
  understanding: { icon: <Brain className="w-4 h-4" />, color: "text-purple-600", bg: "bg-purple-50" },
  welcoming: { icon: <Smile className="w-4 h-4" />, color: "text-green-600", bg: "bg-green-50" }
};

const mentorStyles = {
  nolly: {
    name: "Nolly Santiago",
    style: "bg-blue-50 border-blue-200 text-blue-800",
    description: "Empathetic & Detail-Oriented"
  },
  paul: {
    name: "Paul Santiago", 
    style: "bg-purple-50 border-purple-200 text-purple-800",
    description: "Visionary & Strategic"
  },
  santiago_team: {
    name: "Nolly & Paul's Office",
    style: "bg-emerald-50 border-emerald-200 text-emerald-800",
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
                  className="text-xs px-3 py-1 bg-white hover:bg-purple-50 text-purple-700 rounded-full border border-purple-200 transition-colors"
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