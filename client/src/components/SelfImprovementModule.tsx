import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Brain, Target, Lightbulb, Eye, Heart, Star } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { useProgress } from "@/lib/ProgressContext";

interface QuizQuestion {
  id: string;
  question: string;
  options: { value: string; label: string; lens: "positive" | "negative" }[];
}

interface VisionBoardItem {
  id: string;
  title: string;
  description: string;
  category: "financial" | "personal" | "family" | "career";
  timeframe: "1-year" | "5-year" | "lifetime";
}

export default function SelfImprovementModule() {
  const { t } = useLanguage();
  const { 
    markModuleStarted, 
    markQuizTaken, 
    addVisionItem: trackVisionItem, 
    addGratitudeEntry: trackGratitudeEntry,
    recordConfidenceAssessment 
  } = useProgress();
  const [hasStartedModule, setHasStartedModule] = useState(false);
  
  // Track module start
  if (!hasStartedModule) {
    markModuleStarted("self-improvement");
    setHasStartedModule(true);
  }
  
  // Lens of Life Quiz State
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({});
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizResult, setQuizResult] = useState<"positive" | "negative" | null>(null);

  // Confidence Builder State
  const [confidenceLevel, setConfidenceLevel] = useState(5);
  const [dailyAffirmation, setDailyAffirmation] = useState("");
  const [gratitudeEntries, setGratitudeEntries] = useState<string[]>([]);
  const [newGratitude, setNewGratitude] = useState("");

  // Vision Board State
  const [visionItems, setVisionItems] = useState<VisionBoardItem[]>([
    {
      id: "1",
      title: "Financial Freedom",
      description: "Achieve multiple income streams and financial independence",
      category: "financial",
      timeframe: "5-year"
    },
    {
      id: "2", 
      title: "Family Legacy",
      description: "Build generational wealth for my children and grandchildren",
      category: "family",
      timeframe: "lifetime"
    }
  ]);
  const [newVisionTitle, setNewVisionTitle] = useState("");
  const [newVisionDescription, setNewVisionDescription] = useState("");
  const [newVisionCategory, setNewVisionCategory] = useState<"financial" | "personal" | "family" | "career">("financial");
  const [newVisionTimeframe, setNewVisionTimeframe] = useState<"1-year" | "5-year" | "lifetime">("1-year");

  const quizQuestions: QuizQuestion[] = [
    {
      id: "q1",
      question: "When you wake up each morning, what's typically your first thought?",
      options: [
        { value: "grateful", label: "I'm grateful for another day and new opportunities", lens: "positive" },
        { value: "worried", label: "I worry about the challenges ahead", lens: "negative" },
        { value: "excited", label: "I'm excited about what I can accomplish", lens: "positive" },
        { value: "stressed", label: "I feel stressed about my responsibilities", lens: "negative" }
      ]
    },
    {
      id: "q2",
      question: "How do you typically view setbacks or failures?",
      options: [
        { value: "learning", label: "As learning opportunities and stepping stones", lens: "positive" },
        { value: "proof", label: "As proof that I'm not capable enough", lens: "negative" },
        { value: "temporary", label: "As temporary challenges I can overcome", lens: "positive" },
        { value: "pattern", label: "As part of a pattern of things going wrong", lens: "negative" }
      ]
    },
    {
      id: "q3",
      question: "When you think about your future, what do you see?",
      options: [
        { value: "possibilities", label: "Endless possibilities and potential growth", lens: "positive" },
        { value: "uncertainty", label: "Uncertainty and potential problems", lens: "negative" },
        { value: "dreams", label: "My dreams and goals becoming reality", lens: "positive" },
        { value: "limitations", label: "The same limitations I face today", lens: "negative" }
      ]
    },
    {
      id: "q4",
      question: "How do you approach new opportunities?",
      options: [
        { value: "embrace", label: "I embrace them with enthusiasm", lens: "positive" },
        { value: "skeptical", label: "I'm skeptical and look for what could go wrong", lens: "negative" },
        { value: "curious", label: "I'm curious and eager to learn more", lens: "positive" },
        { value: "fearful", label: "I feel fearful and prefer staying safe", lens: "negative" }
      ]
    },
    {
      id: "q5",
      question: "What drives your daily actions?",
      options: [
        { value: "imagination", label: "My imagination and dreams for the future", lens: "positive" },
        { value: "history", label: "Past experiences and what I've learned to avoid", lens: "negative" },
        { value: "vision", label: "A clear vision of who I want to become", lens: "positive" },
        { value: "fear", label: "Fear of making mistakes or failing", lens: "negative" }
      ]
    },
    {
      id: "q6",
      question: "How do you see other people's success?",
      options: [
        { value: "inspiration", label: "As inspiration for what's possible for me too", lens: "positive" },
        { value: "comparison", label: "As a reminder of what I lack", lens: "negative" },
        { value: "motivation", label: "As motivation to work harder toward my goals", lens: "positive" },
        { value: "evidence", label: "As evidence that life isn't fair", lens: "negative" }
      ]
    }
  ];

  const handleQuizAnswer = (questionId: string, answer: string) => {
    setQuizAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const calculateQuizResult = () => {
    const answers = Object.values(quizAnswers);
    const selectedOptions = answers.map(answer => 
      quizQuestions.flatMap(q => q.options).find(opt => opt.value === answer)
    ).filter(Boolean);
    
    const positiveCount = selectedOptions.filter(opt => opt?.lens === "positive").length;
    const negativeCount = selectedOptions.filter(opt => opt?.lens === "negative").length;
    
    const result = positiveCount >= negativeCount ? "positive" : "negative";
    setQuizResult(result);
    setQuizCompleted(true);
    markQuizTaken("lens-of-life");
  };

  const addGratitudeEntry = () => {
    if (newGratitude.trim()) {
      setGratitudeEntries(prev => [...prev, newGratitude.trim()]);
      setNewGratitude("");
      trackGratitudeEntry();
    }
  };

  const addVisionItem = () => {
    if (newVisionTitle.trim() && newVisionDescription.trim()) {
      const newItem: VisionBoardItem = {
        id: Date.now().toString(),
        title: newVisionTitle,
        description: newVisionDescription,
        category: newVisionCategory,
        timeframe: newVisionTimeframe
      };
      setVisionItems(prev => [...prev, newItem]);
      setNewVisionTitle("");
      setNewVisionDescription("");
      trackVisionItem();
    }
  };

  const getConfidenceMessage = (level: number) => {
    if (level <= 3) return "Let's build your confidence step by step";
    if (level <= 6) return "You're on a good path, keep growing";
    if (level <= 8) return "Strong confidence! You're making great progress";
    return "Excellent! Your confidence is transforming your reality";
  };

  const confidenceExercises = [
    {
      title: "Daily Success Reflection",
      description: "Write down 3 things you accomplished today, no matter how small",
      icon: <Star className="h-5 w-5" />
    },
    {
      title: "Future Self Visualization", 
      description: "Spend 5 minutes visualizing yourself achieving your biggest goal",
      icon: <Eye className="h-5 w-5" />
    },
    {
      title: "Strength Inventory",
      description: "List 10 personal strengths and recall times you've used them successfully",
      icon: <Brain className="h-5 w-5" />
    },
    {
      title: "Gratitude Practice",
      description: "Write 3 things you're grateful for to shift your mindset to abundance",
      icon: <Heart className="h-5 w-5" />
    }
  ];

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Self-Improvement Philosophy
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Build confidence that bends your reality. Discover which lens you see life through 
              and learn to operate from your imagination and dreams rather than history and memory.
            </p>
          </div>

          <Tabs defaultValue="lens-quiz" className="space-y-8">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="lens-quiz" className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                Lens of Life Quiz
              </TabsTrigger>
              <TabsTrigger value="confidence-builder" className="flex items-center gap-2">
                <Brain className="h-4 w-4" />
                Confidence Builder
              </TabsTrigger>
              <TabsTrigger value="vision-board" className="flex items-center gap-2">
                <Target className="h-4 w-4" />
                Vision Board
              </TabsTrigger>
            </TabsList>

            <TabsContent value="lens-quiz" className="space-y-8">
              {!quizCompleted ? (
                <Card className="max-w-3xl mx-auto">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle>Discover Your Life Lens</CardTitle>
                      <Badge variant="secondary">
                        Question {currentQuestion + 1} of {quizQuestions.length}
                      </Badge>
                    </div>
                    <Progress value={(currentQuestion / quizQuestions.length) * 100} className="mt-2" />
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {currentQuestion < quizQuestions.length && (
                      <>
                        <div>
                          <h3 className="text-lg font-semibold mb-4">
                            {quizQuestions[currentQuestion].question}
                          </h3>
                          
                          <RadioGroup 
                            value={quizAnswers[quizQuestions[currentQuestion].id] || ""}
                            onValueChange={(value) => handleQuizAnswer(quizQuestions[currentQuestion].id, value)}
                          >
                            {quizQuestions[currentQuestion].options.map((option) => (
                              <div key={option.value} className="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-50">
                                <RadioGroupItem value={option.value} id={option.value} />
                                <Label htmlFor={option.value} className="flex-1 cursor-pointer">
                                  {option.label}
                                </Label>
                              </div>
                            ))}
                          </RadioGroup>
                        </div>

                        <div className="flex justify-between">
                          <Button 
                            variant="outline" 
                            onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                            disabled={currentQuestion === 0}
                          >
                            Previous
                          </Button>
                          
                          {currentQuestion === quizQuestions.length - 1 ? (
                            <Button 
                              onClick={calculateQuizResult}
                              disabled={!quizAnswers[quizQuestions[currentQuestion].id]}
                            >
                              Get Results
                            </Button>
                          ) : (
                            <Button 
                              onClick={() => setCurrentQuestion(currentQuestion + 1)}
                              disabled={!quizAnswers[quizQuestions[currentQuestion].id]}
                            >
                              Next
                            </Button>
                          )}
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>
              ) : (
                <div className="max-w-4xl mx-auto space-y-6">
                  <Card className={quizResult === "positive" ? "border-green-200 bg-green-50" : "border-yellow-200 bg-yellow-50"}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3">
                        {quizResult === "positive" ? (
                          <>
                            <div className="text-green-600"><Lightbulb className="h-6 w-6" /></div>
                            Positive Life Lens
                          </>
                        ) : (
                          <>
                            <div className="text-yellow-600"><Eye className="h-6 w-6" /></div>
                            Growth Opportunity Identified
                          </>
                        )}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {quizResult === "positive" ? (
                        <div className="space-y-4">
                          <p className="text-green-800">
                            Excellent! You primarily see life through a positive lens, focusing on God, favor, 
                            protection, abundance, light, and love. You operate from your imagination and dreams 
                            rather than being limited by history and memory.
                          </p>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-4 bg-white rounded-lg border border-green-200">
                              <h4 className="font-semibold text-green-900 mb-2">Your Strengths</h4>
                              <ul className="text-sm text-green-800 space-y-1">
                                <li>• You see opportunities in challenges</li>
                                <li>• You're driven by vision and possibility</li>
                                <li>• You maintain hope during difficult times</li>
                                <li>• You inspire others with your optimism</li>
                              </ul>
                            </div>
                            <div className="p-4 bg-white rounded-lg border border-green-200">
                              <h4 className="font-semibold text-green-900 mb-2">Keep Growing</h4>
                              <ul className="text-sm text-green-800 space-y-1">
                                <li>• Share your positive energy with others</li>
                                <li>• Help others see possibilities</li>
                                <li>• Continue building on your dreams</li>
                                <li>• Maintain your growth mindset</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <p className="text-yellow-800">
                            You tend to filter life through challenges, focusing on things that worry or limit you. 
                            This is common and can be transformed! You can learn to shift your lens to see 
                            abundance, opportunities, and possibilities.
                          </p>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-4 bg-white rounded-lg border border-yellow-200">
                              <h4 className="font-semibold text-yellow-900 mb-2">Current Patterns</h4>
                              <ul className="text-sm text-yellow-800 space-y-1">
                                <li>• Operating from past experiences</li>
                                <li>• Focusing on potential problems</li>
                                <li>• Seeing limitations before possibilities</li>
                                <li>• Feeling stuck in current circumstances</li>
                              </ul>
                            </div>
                            <div className="p-4 bg-white rounded-lg border border-yellow-200">
                              <h4 className="font-semibold text-yellow-900 mb-2">Transformation Steps</h4>
                              <ul className="text-sm text-yellow-800 space-y-1">
                                <li>• Practice daily gratitude</li>
                                <li>• Visualize your desired future</li>
                                <li>• Challenge negative thoughts</li>
                                <li>• Surround yourself with positive influences</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  <div className="text-center">
                    <Button onClick={() => {
                      setQuizCompleted(false);
                      setCurrentQuestion(0);
                      setQuizAnswers({});
                      setQuizResult(null);
                    }}>
                      Retake Quiz
                    </Button>
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="confidence-builder" className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Confidence Assessment</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <Label>Current Confidence Level (1-10)</Label>
                      <div className="mt-2 space-y-2">
                        <Input
                          type="range"
                          min="1"
                          max="10"
                          value={confidenceLevel}
                          onChange={(e) => {
                            setConfidenceLevel(Number(e.target.value));
                            recordConfidenceAssessment();
                          }}
                          className="w-full"
                        />
                        <div className="flex justify-between text-sm text-gray-500">
                          <span>1</span>
                          <span className="font-medium text-blue-600">{confidenceLevel}</span>
                          <span>10</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mt-2">{getConfidenceMessage(confidenceLevel)}</p>
                    </div>

                    <div>
                      <Label htmlFor="daily-affirmation">Daily Affirmation</Label>
                      <Textarea
                        id="daily-affirmation"
                        placeholder="Write a positive affirmation about yourself..."
                        value={dailyAffirmation}
                        onChange={(e) => setDailyAffirmation(e.target.value)}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label>Gratitude Practice</Label>
                      <div className="flex gap-2 mt-1">
                        <Input
                          placeholder="I'm grateful for..."
                          value={newGratitude}
                          onChange={(e) => setNewGratitude(e.target.value)}
                          onKeyPress={(e) => e.key === "Enter" && addGratitudeEntry()}
                        />
                        <Button onClick={addGratitudeEntry}>Add</Button>
                      </div>
                      
                      <div className="mt-3 space-y-2 max-h-32 overflow-y-auto">
                        {gratitudeEntries.map((entry, index) => (
                          <div key={index} className="p-2 bg-green-50 rounded text-sm">
                            {entry}
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Confidence Building Exercises</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {confidenceExercises.map((exercise, index) => (
                        <div key={index} className="p-4 border rounded-lg hover:bg-gray-50">
                          <div className="flex items-start gap-3">
                            <div className="text-blue-600 mt-1">{exercise.icon}</div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-900 mb-1">{exercise.title}</h4>
                              <p className="text-sm text-gray-600">{exercise.description}</p>
                            </div>
                            <Button variant="outline" size="sm">Start</Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="vision-board" className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <Card className="lg:col-span-1">
                  <CardHeader>
                    <CardTitle>Add Vision Item</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="vision-title">Goal Title</Label>
                      <Input
                        id="vision-title"
                        value={newVisionTitle}
                        onChange={(e) => setNewVisionTitle(e.target.value)}
                        placeholder="Enter your goal..."
                      />
                    </div>

                    <div>
                      <Label htmlFor="vision-description">Description</Label>
                      <Textarea
                        id="vision-description"
                        value={newVisionDescription}
                        onChange={(e) => setNewVisionDescription(e.target.value)}
                        placeholder="Describe your vision in detail..."
                      />
                    </div>

                    <div>
                      <Label>Category</Label>
                      <select 
                        value={newVisionCategory}
                        onChange={(e) => setNewVisionCategory(e.target.value as any)}
                        className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
                      >
                        <option value="financial">Financial</option>
                        <option value="personal">Personal</option>
                        <option value="family">Family</option>
                        <option value="career">Career</option>
                      </select>
                    </div>

                    <div>
                      <Label>Timeframe</Label>
                      <select 
                        value={newVisionTimeframe}
                        onChange={(e) => setNewVisionTimeframe(e.target.value as any)}
                        className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
                      >
                        <option value="1-year">1 Year</option>
                        <option value="5-year">5 Years</option>
                        <option value="lifetime">Lifetime</option>
                      </select>
                    </div>

                    <Button onClick={addVisionItem} className="w-full">
                      Add to Vision Board
                    </Button>
                  </CardContent>
                </Card>

                <div className="lg:col-span-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {visionItems.map((item) => (
                      <Card key={item.id} className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                          <div className="flex justify-between items-start">
                            <CardTitle className="text-lg">{item.title}</CardTitle>
                            <div className="flex gap-2">
                              <Badge variant="secondary">{item.category}</Badge>
                              <Badge variant="outline">{item.timeframe}</Badge>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-600">{item.description}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {visionItems.length === 0 && (
                    <div className="text-center py-12 text-gray-500">
                      <Target className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>Start building your vision board by adding your first goal.</p>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {/* Motivational Call to Action */}
          <div className="mt-12">
            <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold text-purple-900 mb-4">
                  Transform Your Reality Through Confidence
                </h3>
                <p className="text-purple-700 mb-6 max-w-2xl mx-auto">
                  "Confidence bends your reality. It begins to change the filter that you see things through." 
                  Your self-improvement journey starts with recognizing your true potential.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    size="lg" 
                    className="bg-purple-600 hover:bg-purple-700"
                    onClick={() => window.open('https://agents.worldfinancialgroup.com/Nolly-Santiago-C8V5D', '_blank')}
                  >
                    Begin Your Transformation
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="border-purple-600 text-purple-600 hover:bg-purple-50"
                    onClick={() => window.location.href = 'tel:407-777-1087'}
                  >
                    Speak with Nolly
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}