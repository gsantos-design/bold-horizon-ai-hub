import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useLanguage } from '@/lib/LanguageContext';
import { motion, AnimatePresence } from "framer-motion";
import { 
  MessageCircle, 
  Send, 
  Bot, 
  User, 
  Heart, 
  Brain, 
  Target, 
  Lightbulb,
  Star,
  Sparkles,
  ArrowRight,
  BookOpen,
  Coffee,
  Smile
} from "lucide-react";

interface ChatMessage {
  id: number;
  role: 'user' | 'assistant';
  content: string;
  emotionalTone?: string;
  followUpActions?: string[];
  mentorPersonality?: string;
  metadata?: any;
  createdAt: string;
}

interface ChatSession {
  id: number;
  sessionId: string;
  userEmail?: string;
  userName?: string;
  currentTopic?: string;
  emotionalState?: string;
  userProfile?: any;
  createdAt: string;
  updatedAt: string;
}

const emotionalIcons = {
  confident: <Smile className="w-4 h-4" />,
  anxious: <Heart className="w-4 h-4" />,
  excited: <Star className="w-4 h-4" />,
  uncertain: <Brain className="w-4 h-4" />,
  motivated: <Target className="w-4 h-4" />,
  overwhelmed: <Coffee className="w-4 h-4" />,
  neutral: <Bot className="w-4 h-4" />
};

const mentorColors = {
  nolly: "bg-blue-100 border-blue-300 text-blue-800",
  pablo: "bg-purple-100 border-purple-300 text-purple-800", 
  santiago_team: "bg-emerald-100 border-emerald-300 text-emerald-800"
};

export default function AiCareerMentor() {
  const { t } = useLanguage();
  const [currentSession, setCurrentSession] = useState<ChatSession | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [userProfile, setUserProfile] = useState({
    name: "",
    email: "",
    careerStage: "",
    goals: [] as string[]
  });
  const [showProfileSetup, setShowProfileSetup] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const createSessionMutation = useMutation({
    mutationFn: async (profile: any) => {
      return await apiRequest({
        url: "/api/ai-mentor/session",
        method: "POST",
        body: {
          userEmail: profile.email,
          userName: profile.name,
          userProfile: profile
        }
      }) as any;
    },
    onSuccess: (data: any) => {
      setCurrentSession(data.session);
      setMessages([{
        id: 1,
        role: 'assistant' as const,
        content: data.welcomeMessage,
        emotionalTone: 'welcoming',
        mentorPersonality: 'santiago_team',
        createdAt: new Date().toISOString()
      }]);
      setShowProfileSetup(false);
    }
  });

  const sendMessageMutation = useMutation({
    mutationFn: async ({ sessionId, content, userProfile }: { sessionId: string; content: string; userProfile: any }) => {
      return await apiRequest({
        url: "/api/ai-mentor/chat",
        method: "POST", 
        body: { sessionId, content, userProfile }
      }) as any;
    },
    onSuccess: (data: any) => {
      setMessages(prev => [...prev, data.message]);
      setIsTyping(false);
    },
    onError: (error: any) => {
      console.error("Error sending message:", error);
      setIsTyping(false);
    }
  });

  const handleStartChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userProfile.name || !userProfile.email) return;
    
    createSessionMutation.mutate(userProfile);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !currentSession) return;

    // Add user message immediately
    const userMessage: ChatMessage = {
      id: Date.now(),
      role: 'user',
      content: newMessage,
      createdAt: new Date().toISOString()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);
    
    // Send to AI
    sendMessageMutation.mutate({
      sessionId: currentSession.sessionId,
      content: newMessage,
      userProfile
    });
    
    setNewMessage("");
  };

  const suggestedQuestions = [
    "What career opportunities are available with WFG?",
    "How do I know if I'm ready for financial services?",
    "What support does the Santiago Team provide?",
    "Tell me about the commission structure",
    "How can I build a successful team?",
    "What training is available for new associates?"
  ];

  if (showProfileSetup) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto"
          >
            <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0">
              <CardHeader className="text-center pb-6">
                <div className="flex justify-center mb-4">
                  <div className="relative">
                    <Bot className="w-16 h-16 text-purple-600" />
                    <Sparkles className="w-6 h-6 text-yellow-500 absolute -top-1 -right-1" />
                  </div>
                </div>
                <CardTitle className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  {t('leaders.subtitle')}
                </CardTitle>
                <p className="text-gray-600 mt-2">
                  {t('ai.description')}
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleStartChat} className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('form.your_name')}
                      </label>
                      <Input
                        value={userProfile.name}
                        onChange={(e) => setUserProfile(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Enter your full name"
                        required
                        className="bg-white/50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('form.email_address')}
                      </label>
                      <Input
                        type="email"
                        value={userProfile.email}
                        onChange={(e) => setUserProfile(prev => ({ ...prev, email: e.target.value }))}
                        placeholder="Enter your email"
                        required
                        className="bg-white/50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Career Stage (Optional)
                      </label>
                      <select
                        value={userProfile.careerStage}
                        onChange={(e) => setUserProfile(prev => ({ ...prev, careerStage: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white/50 focus:ring-purple-500 focus:border-purple-500"
                      >
                        <option value="">Select your current stage</option>
                        <option value="exploring">Exploring career options</option>
                        <option value="entry_level">Entry level professional</option>
                        <option value="experienced">Experienced professional</option>
                        <option value="management">Management/Leadership</option>
                        <option value="career_change">Considering career change</option>
                      </select>
                    </div>
                  </div>
                  
                  <Button 
                    type="submit" 
                    disabled={createSessionMutation.isPending}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-3"
                  >
                    {createSessionMutation.isPending ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Connecting to your mentor...
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <MessageCircle className="w-4 h-4 mr-2" />
                        {t('ai.start_chat')}
                      </div>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-6"
          >
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Pablo & Nolly's Office
            </h1>
            <p className="text-gray-600 mt-2">
              AI Career Mentor • Licensed WFG Associates • Emotional Intelligence enabled
            </p>
          </motion.div>

          {/* Chat Interface */}
          <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0 h-[600px] flex flex-col">
            {/* Chat Header */}
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Bot className="w-8 h-8 text-purple-600" />
                  <div>
                    <CardTitle className="text-lg">Pablo & Nolly's Office</CardTitle>
                    <p className="text-sm text-gray-500">
                      Licensed WFG Associates • {currentSession?.emotionalState && (
                        <span className="flex items-center">
                          {emotionalIcons[currentSession.emotionalState as keyof typeof emotionalIcons]}
                          <span className="ml-1 capitalize">{currentSession.emotionalState}</span>
                        </span>
                      )}
                    </p>
                  </div>
                </div>
                <Badge variant="outline" className="bg-emerald-50 text-emerald-700">
                  <Sparkles className="w-3 h-3 mr-1" />
                  Online
                </Badge>
              </div>
            </CardHeader>

            {/* Messages */}
            <ScrollArea className="flex-1 px-6">
              <div className="space-y-4">
                <AnimatePresence>
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[80%] ${message.role === 'user' ? 'order-1' : 'order-2'}`}>
                        <div className={`flex items-start space-x-2 ${message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            message.role === 'user' 
                              ? 'bg-blue-500 text-white' 
                              : 'bg-purple-100 text-purple-600'
                          }`}>
                            {message.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                          </div>
                          <div className={`rounded-lg px-4 py-2 ${
                            message.role === 'user' 
                              ? 'bg-blue-500 text-white' 
                              : 'bg-gray-100 text-gray-900'
                          }`}>
                            <p className="text-sm leading-relaxed">{message.content}</p>
                            {message.followUpActions && message.followUpActions.length > 0 && (
                              <div className="mt-3 space-y-1">
                                <p className="text-xs font-medium opacity-75">Suggested next steps:</p>
                                {message.followUpActions.map((action, idx) => (
                                  <div key={idx} className="flex items-center text-xs opacity-75">
                                    <ArrowRight className="w-3 h-3 mr-1" />
                                    {action}
                                  </div>
                                ))}
                              </div>
                            )}
                            {message.emotionalTone && message.mentorPersonality && (
                              <div className="mt-2 flex items-center space-x-2">
                                <Badge 
                                  variant="outline" 
                                  className={`text-xs ${mentorColors[message.mentorPersonality as keyof typeof mentorColors]}`}
                                >
                                  {message.mentorPersonality === 'santiago_team' ? 'Pablo & Nolly\'s Office' : 
                                   message.mentorPersonality === 'nolly' ? 'Pablo & Nolly Santiago' :
                                   message.mentorPersonality === 'pablo' ? 'Pablo Santiago' : message.mentorPersonality}
                                </Badge>
                                <span className="text-xs opacity-75">
                                  {emotionalIcons[message.emotionalTone as keyof typeof emotionalIcons]}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {/* Typing Indicator */}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center">
                        <Bot className="w-4 h-4" />
                      </div>
                      <div className="bg-gray-100 rounded-lg px-4 py-2">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* Suggested Questions */}
            {messages.length <= 1 && (
              <div className="px-6 py-3 border-t bg-gray-50/50">
                <p className="text-sm font-medium text-gray-700 mb-2">Try asking:</p>
                <div className="flex flex-wrap gap-2">
                  {suggestedQuestions.slice(0, 3).map((question, idx) => (
                    <Button
                      key={idx}
                      variant="outline"
                      size="sm"
                      onClick={() => setNewMessage(question)}
                      className="text-xs bg-white/50 hover:bg-white"
                    >
                      {question}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Area */}
            <div className="p-6 border-t">
              <form onSubmit={handleSendMessage} className="flex space-x-3">
                <Textarea
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Ask Pablo & Nolly about your career path, WFG opportunities, or any questions..."
                  className="flex-1 resize-none bg-white/50"
                  rows={1}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage(e);
                    }
                  }}
                />
                <Button 
                  type="submit" 
                  disabled={!newMessage.trim() || sendMessageMutation.isPending}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}