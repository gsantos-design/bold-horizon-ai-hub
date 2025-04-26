import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { apiRequest } from "@/lib/queryClient";
import { motion } from "framer-motion";
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Sparkles, Send, RefreshCw, Star, Rocket, Heart, Brain, Briefcase, DollarSign, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Define the quiz schema
const quizSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  background: z.string().min(10, { message: "Please provide some background information" }),
  skills: z.array(z.string()).min(1, { message: "Please select at least one skill" }),
  motivations: z.array(z.string()).min(1, { message: "Please select at least one motivation" }),
  values: z.array(z.string()).min(1, { message: "Please select at least one value" }),
  workStyle: z.array(z.string()).min(1, { message: "Please select at least one work style" }),
  financialGoals: z.string({ required_error: "Please select a financial goal" }),
});

type QuizValues = z.infer<typeof quizSchema>;

// Options for the quiz
const skillsOptions = [
  { id: "communication", label: "Communication" },
  { id: "sales", label: "Sales" },
  { id: "leadership", label: "Leadership" },
  { id: "financial-knowledge", label: "Financial Knowledge" },
  { id: "networking", label: "Networking" },
  { id: "technology", label: "Technology" },
  { id: "customer-service", label: "Customer Service" },
  { id: "problem-solving", label: "Problem Solving" },
  { id: "organization", label: "Organization" },
  { id: "public-speaking", label: "Public Speaking" },
];

const motivationsOptions = [
  { id: "financial-independence", label: "Financial Independence" },
  { id: "helping-others", label: "Helping Others" },
  { id: "career-growth", label: "Career Growth" },
  { id: "work-life-balance", label: "Work-Life Balance" },
  { id: "recognition", label: "Recognition" },
  { id: "building-business", label: "Building a Business" },
  { id: "personal-development", label: "Personal Development" },
  { id: "legacy", label: "Creating a Legacy" },
  { id: "community-impact", label: "Community Impact" },
];

const valuesOptions = [
  { id: "integrity", label: "Integrity" },
  { id: "excellence", label: "Excellence" },
  { id: "teamwork", label: "Teamwork" },
  { id: "innovation", label: "Innovation" },
  { id: "accountability", label: "Accountability" },
  { id: "service", label: "Service" },
  { id: "continuous-learning", label: "Continuous Learning" },
  { id: "diversity", label: "Diversity" },
  { id: "trust", label: "Trust" },
];

const workStyleOptions = [
  { id: "independent", label: "Independent Worker" },
  { id: "team-player", label: "Team Player" },
  { id: "leader", label: "Leader" },
  { id: "detail-oriented", label: "Detail-Oriented" },
  { id: "big-picture", label: "Big Picture Thinker" },
  { id: "adaptable", label: "Adaptable" },
  { id: "structured", label: "Structured" },
  { id: "creative", label: "Creative" },
  { id: "analytical", label: "Analytical" },
];

const financialGoalsOptions = [
  { id: "supplement-income", label: "Supplement Current Income" },
  { id: "replace-income", label: "Replace Current Income" },
  { id: "financial-freedom", label: "Achieve Financial Freedom" },
  { id: "build-wealth", label: "Build Long-Term Wealth" },
  { id: "create-legacy", label: "Create a Financial Legacy" },
];

export default function CareerQuiz() {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recommendation, setRecommendation] = useState<{
    recommendedPath: string;
    explanation: string;
    strengths: string[];
    developmentAreas: string[];
    nextSteps: string[];
    estimatedTimeframe: string;
  } | null>(null);

  const form = useForm<QuizValues>({
    resolver: zodResolver(quizSchema),
    defaultValues: {
      name: "",
      email: "",
      background: "",
      skills: [],
      motivations: [],
      values: [],
      workStyle: [],
      financialGoals: "",
    },
  });

  const onSubmit = async (data: QuizValues) => {
    setIsSubmitting(true);
    try {
      const response = await apiRequest({
        url: "/api/career-quiz",
        method: "POST",
        body: data,
      });

      if (response && response.success && response.recommendation) {
        setRecommendation(response.recommendation);
        toast({
          title: "Career Path Analysis Complete",
          description: "We've analyzed your profile and generated a personalized recommendation!",
        });
        setStep(3); // Move to results page
      } else {
        throw new Error("Failed to get recommendation");
      }
    } catch (error) {
      console.error("Error submitting quiz:", error);
      toast({
        title: "Error",
        description: "There was an error analyzing your career path. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNextStep = async () => {
    if (step === 1) {
      // Validate personal information fields
      const personalInfo = await form.trigger(["name", "email", "background"]);
      if (personalInfo) setStep(2);
    } else if (step === 2) {
      // Final submission
      form.handleSubmit(onSubmit)();
    }
  };

  const resetQuiz = () => {
    form.reset();
    setRecommendation(null);
    setStep(1);
  };

  return (
    <div className="container py-12 space-y-8 relative z-10" id="career-quiz">
      {/* Enhanced cosmic background for this section */}
      <div className="absolute inset-0 -z-10 bg-blue-900/30 backdrop-blur-md rounded-xl 
                     border border-blue-400/20 shadow-xl overflow-hidden">
        <div className="absolute w-64 h-64 bg-blue-400/10 rounded-full -top-20 -right-20 blur-2xl"></div>
        <div className="absolute w-64 h-64 bg-indigo-400/10 rounded-full -bottom-20 -left-20 blur-2xl"></div>
        {/* Add stars */}
        {Array.from({ length: 8 }).map((_, i) => (
          <div 
            key={`quiz-star-${i}`}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse cosmic-star"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${3 + Math.random() * 3}s`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          ></div>
        ))}
      </div>
      
      <div className="text-center space-y-4">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight cosmic-text-title cosmic-glow-blue">
          Find Your Perfect Career Path
        </h2>
        <p className="cosmic-text text-lg max-w-2xl mx-auto">
          Discover your ideal role in the Bold Horizons with World Financial Group team with our personalized AI-powered career assessment.
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        {/* Progress Indicator */}
        <div className="flex justify-between items-center mb-8">
          <div className={`flex flex-col items-center ${step >= 1 ? "text-accent" : "text-white/50"}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${step >= 1 ? "bg-accent/80 text-white" : "bg-white/10"}`}>
              1
            </div>
            <span className="text-sm">Personal Info</span>
          </div>
          <div className="flex-1 h-1 mx-2 bg-white/10">
            <div className={`h-full bg-accent ${step >= 2 ? "w-full" : "w-0"} transition-all duration-300`}></div>
          </div>
          <div className={`flex flex-col items-center ${step >= 2 ? "text-accent" : "text-white/50"}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${step >= 2 ? "bg-accent/80 text-white" : "bg-white/10"}`}>
              2
            </div>
            <span className="text-sm">Preferences</span>
          </div>
          <div className="flex-1 h-1 mx-2 bg-white/10">
            <div className={`h-full bg-accent ${step >= 3 ? "w-full" : "w-0"} transition-all duration-300`}></div>
          </div>
          <div className={`flex flex-col items-center ${step >= 3 ? "text-accent" : "text-white/50"}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${step >= 3 ? "bg-accent/80 text-white" : "bg-white/10"}`}>
              3
            </div>
            <span className="text-sm">Results</span>
          </div>
        </div>

        {/* Quiz Form */}
        {step < 3 && (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {step === 1 && (
                <motion.div 
                  className="space-y-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card className="cosmic-glass-effect border-0 shadow-xl">
                    <CardHeader>
                      <CardTitle className="text-gradient">Tell us about yourself</CardTitle>
                      <CardDescription className="text-white/80">
                        We'll use this information to personalize your career path recommendation.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Your name" {...field} className="cosmic-input" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Email Address</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="you@example.com" {...field} className="cosmic-input" />
                            </FormControl>
                            <FormDescription className="text-white/60">
                              We'll send your personalized career path results to this email.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="background"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Professional Background</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Briefly describe your professional background, current situation, and why you're interested in a career with Bold Horizons with World Financial Group."
                                className="min-h-[120px] cosmic-input"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div 
                  className="space-y-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card className="cosmic-glass-effect border-0 shadow-xl">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-gradient">
                        <div className="bg-accent/20 p-2 rounded-full">
                          <Briefcase className="w-5 h-5 text-accent" />
                        </div> 
                        Your Skills
                      </CardTitle>
                      <CardDescription className="text-white/80">
                        Select all the skills you possess or are confident you can develop.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <FormField
                        control={form.control}
                        name="skills"
                        render={() => (
                          <FormItem>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {skillsOptions.map((skill) => (
                                <FormField
                                  key={skill.id}
                                  control={form.control}
                                  name="skills"
                                  render={({ field }) => {
                                    return (
                                      <FormItem
                                        key={skill.id}
                                        className="flex flex-row items-start space-x-3 space-y-0"
                                      >
                                        <FormControl>
                                          <Checkbox
                                            className="border-accent data-[state=checked]:bg-accent"
                                            checked={field.value?.includes(skill.id)}
                                            onCheckedChange={(checked) => {
                                              return checked
                                                ? field.onChange([...field.value, skill.id])
                                                : field.onChange(
                                                    field.value?.filter(
                                                      (value) => value !== skill.id
                                                    )
                                                  )
                                            }}
                                          />
                                        </FormControl>
                                        <FormLabel className="font-normal cursor-pointer text-white">
                                          {skill.label}
                                        </FormLabel>
                                      </FormItem>
                                    )
                                  }}
                                />
                              ))}
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </CardContent>
                  </Card>

                  <Card className="cosmic-glass-effect border-0 shadow-xl">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-gradient">
                        <div className="bg-accent/20 p-2 rounded-full">
                          <Rocket className="w-5 h-5 text-accent" />
                        </div> 
                        Your Motivations
                      </CardTitle>
                      <CardDescription className="text-white/80">
                        What drives you most in your career? Select all that apply.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <FormField
                        control={form.control}
                        name="motivations"
                        render={() => (
                          <FormItem>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {motivationsOptions.map((motivation) => (
                                <FormField
                                  key={motivation.id}
                                  control={form.control}
                                  name="motivations"
                                  render={({ field }) => {
                                    return (
                                      <FormItem
                                        key={motivation.id}
                                        className="flex flex-row items-start space-x-3 space-y-0"
                                      >
                                        <FormControl>
                                          <Checkbox
                                            className="border-accent data-[state=checked]:bg-accent"
                                            checked={field.value?.includes(motivation.id)}
                                            onCheckedChange={(checked) => {
                                              return checked
                                                ? field.onChange([...field.value, motivation.id])
                                                : field.onChange(
                                                    field.value?.filter(
                                                      (value) => value !== motivation.id
                                                    )
                                                  )
                                            }}
                                          />
                                        </FormControl>
                                        <FormLabel className="font-normal cursor-pointer text-white">
                                          {motivation.label}
                                        </FormLabel>
                                      </FormItem>
                                    )
                                  }}
                                />
                              ))}
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </CardContent>
                  </Card>

                  <Card className="cosmic-glass-effect border-0 shadow-xl">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-gradient">
                        <div className="bg-accent/20 p-2 rounded-full">
                          <Heart className="w-5 h-5 text-accent" />
                        </div> 
                        Your Values
                      </CardTitle>
                      <CardDescription className="text-white/80">
                        Which values are most important to you in your work environment?
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <FormField
                        control={form.control}
                        name="values"
                        render={() => (
                          <FormItem>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {valuesOptions.map((value) => (
                                <FormField
                                  key={value.id}
                                  control={form.control}
                                  name="values"
                                  render={({ field }) => {
                                    return (
                                      <FormItem
                                        key={value.id}
                                        className="flex flex-row items-start space-x-3 space-y-0"
                                      >
                                        <FormControl>
                                          <Checkbox
                                            className="border-accent data-[state=checked]:bg-accent"
                                            checked={field.value?.includes(value.id)}
                                            onCheckedChange={(checked) => {
                                              return checked
                                                ? field.onChange([...field.value, value.id])
                                                : field.onChange(
                                                    field.value?.filter(
                                                      (v) => v !== value.id
                                                    )
                                                  )
                                            }}
                                          />
                                        </FormControl>
                                        <FormLabel className="font-normal cursor-pointer text-white">
                                          {value.label}
                                        </FormLabel>
                                      </FormItem>
                                    )
                                  }}
                                />
                              ))}
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </CardContent>
                  </Card>

                  <Card className="cosmic-glass-effect border-0 shadow-xl">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-gradient">
                        <div className="bg-accent/20 p-2 rounded-full">
                          <Brain className="w-5 h-5 text-accent" />
                        </div> 
                        Your Work Style
                      </CardTitle>
                      <CardDescription className="text-white/80">
                        How would you describe your preferred way of working?
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <FormField
                        control={form.control}
                        name="workStyle"
                        render={() => (
                          <FormItem>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {workStyleOptions.map((style) => (
                                <FormField
                                  key={style.id}
                                  control={form.control}
                                  name="workStyle"
                                  render={({ field }) => {
                                    return (
                                      <FormItem
                                        key={style.id}
                                        className="flex flex-row items-start space-x-3 space-y-0"
                                      >
                                        <FormControl>
                                          <Checkbox
                                            className="border-accent data-[state=checked]:bg-accent"
                                            checked={field.value?.includes(style.id)}
                                            onCheckedChange={(checked) => {
                                              return checked
                                                ? field.onChange([...field.value, style.id])
                                                : field.onChange(
                                                    field.value?.filter(
                                                      (v) => v !== style.id
                                                    )
                                                  )
                                            }}
                                          />
                                        </FormControl>
                                        <FormLabel className="font-normal cursor-pointer text-white">
                                          {style.label}
                                        </FormLabel>
                                      </FormItem>
                                    )
                                  }}
                                />
                              ))}
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </CardContent>
                  </Card>

                  <Card className="cosmic-glass-effect border-0 shadow-xl">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-gradient">
                        <div className="bg-accent/20 p-2 rounded-full">
                          <DollarSign className="w-5 h-5 text-accent" />
                        </div> 
                        Your Financial Goals
                      </CardTitle>
                      <CardDescription className="text-white/80">
                        What are your primary financial objectives right now?
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <FormField
                        control={form.control}
                        name="financialGoals"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex flex-col space-y-3"
                              >
                                {financialGoalsOptions.map((goal) => (
                                  <FormItem
                                    key={goal.id}
                                    className="flex items-center space-x-3 space-y-0"
                                  >
                                    <FormControl>
                                      <RadioGroupItem className="border-accent text-accent" value={goal.id} />
                                    </FormControl>
                                    <FormLabel className="font-normal text-white">
                                      {goal.label}
                                    </FormLabel>
                                  </FormItem>
                                ))}
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              <div className="flex justify-between mt-6">
                {step > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep((prev) => prev - 1)}
                    className="border-white/40 text-white hover:bg-white/10"
                  >
                    Back
                  </Button>
                )}
                {step < 3 && (
                  <Button
                    type="button"
                    onClick={handleNextStep}
                    disabled={isSubmitting}
                    className={`ml-auto bg-accent hover:bg-accent/80 text-white`}
                  >
                    {step === 2 ? (
                      <>
                        {isSubmitting ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Analyzing...
                          </>
                        ) : (
                          <>
                            <Send className="mr-2 h-4 w-4" />
                            Submit
                          </>
                        )}
                      </>
                    ) : (
                      "Next"
                    )}
                  </Button>
                )}
              </div>
            </form>
          </Form>
        )}

        {/* Quiz Results */}
        {step === 3 && recommendation && (
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center space-y-2">
              <div className="inline-flex items-center justify-center p-3 bg-accent/20 rounded-full mb-4">
                <Sparkles className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-2xl font-bold text-gradient">Your Personalized Career Recommendation</h3>
              <p className="text-white/80">
                Based on your unique skills, values, and goals
              </p>
            </div>

            <Card className="cosmic-glass-effect border-0 shadow-xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-accent/5 to-transparent opacity-50 rounded-lg"></div>
              <div className="relative z-10">
                <CardHeader className="flex flex-col items-center text-center pb-2">
                  <Badge className="bg-accent/20 text-white hover:bg-accent/30 mb-2">
                    AI-Powered Recommendation
                  </Badge>
                  <CardTitle className="text-2xl text-gradient">
                    {recommendation.recommendedPath}
                  </CardTitle>
                  <CardDescription className="text-white/90 text-center max-w-2xl mx-auto">
                    {recommendation.explanation}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="text-lg font-semibold flex items-center gap-2 text-white">
                        <Star className="h-5 w-5 text-yellow-400" /> Your Strengths
                      </h4>
                      <ul className="space-y-2">
                        {recommendation.strengths.map((strength, index) => (
                          <li key={index} className="flex items-start">
                            <div className="mt-1 mr-2 flex items-center justify-center">
                              <div className="h-2 w-2 bg-accent rounded-full"></div>
                            </div>
                            <span className="text-white/90">{strength}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="space-y-4">
                      <h4 className="text-lg font-semibold flex items-center gap-2 text-white">
                        <Rocket className="h-5 w-5 text-accent" /> Development Areas
                      </h4>
                      <ul className="space-y-2">
                        {recommendation.developmentAreas.map((area, index) => (
                          <li key={index} className="flex items-start">
                            <div className="mt-1 mr-2 flex items-center justify-center">
                              <div className="h-2 w-2 bg-accent rounded-full"></div>
                            </div>
                            <span className="text-white/90">{area}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <Separator className="bg-white/10" />

                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold flex items-center gap-2 text-white">
                      <Check className="h-5 w-5 text-green-400" /> Next Steps for Success
                    </h4>
                    <ol className="space-y-3">
                      {recommendation.nextSteps.map((step, index) => (
                        <li key={index} className="flex items-start">
                          <span className="flex-shrink-0 h-6 w-6 rounded-full bg-accent/20 flex items-center justify-center mr-3 text-white font-semibold">
                            {index + 1}
                          </span>
                          <span className="text-white/90">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>

                  <div className="mt-6 bg-accent/10 p-4 rounded-lg flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-white">Estimated Timeframe</h4>
                      <p className="text-white/80">{recommendation.estimatedTimeframe}</p>
                    </div>
                    <div className="hidden md:block">
                      <Rocket className="h-10 w-10 text-accent opacity-50" />
                    </div>
                  </div>
                </CardContent>
              </div>
            </Card>

            <div className="flex justify-center">
              <Button 
                variant="outline" 
                onClick={resetQuiz}
                className="bg-accent/10 border-accent/30 text-white hover:bg-accent/20"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Retake Quiz
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}