import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { apiRequest } from "@/lib/queryClient";
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
import { Check, Sparkles, Send, RefreshCw, Star, Rocket, Heart, Brain, Briefcase, DollarSign } from "lucide-react";
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
    <div className="container py-12 space-y-8" id="career-quiz">
      <div className="text-center space-y-4">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-br from-indigo-600 to-blue-400 bg-clip-text text-transparent">
          Find Your Perfect Career Path
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Discover your ideal role in the World Financial Group team with our personalized AI-powered career assessment.
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        {/* Progress Indicator */}
        <div className="flex justify-between items-center mb-8">
          <div className={`flex flex-col items-center ${step >= 1 ? "text-primary" : "text-muted-foreground"}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${step >= 1 ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
              1
            </div>
            <span className="text-sm">Personal Info</span>
          </div>
          <div className="flex-1 h-1 mx-2 bg-muted">
            <div className={`h-full bg-primary ${step >= 2 ? "w-full" : "w-0"} transition-all duration-300`}></div>
          </div>
          <div className={`flex flex-col items-center ${step >= 2 ? "text-primary" : "text-muted-foreground"}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${step >= 2 ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
              2
            </div>
            <span className="text-sm">Preferences</span>
          </div>
          <div className="flex-1 h-1 mx-2 bg-muted">
            <div className={`h-full bg-primary ${step >= 3 ? "w-full" : "w-0"} transition-all duration-300`}></div>
          </div>
          <div className={`flex flex-col items-center ${step >= 3 ? "text-primary" : "text-muted-foreground"}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${step >= 3 ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
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
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Tell us about yourself</CardTitle>
                      <CardDescription>
                        We'll use this information to personalize your career path recommendation.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Your name" {...field} />
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
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="you@example.com" {...field} />
                            </FormControl>
                            <FormDescription>
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
                            <FormLabel>Professional Background</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Briefly describe your professional background, current situation, and why you're interested in a career with World Financial Group."
                                className="min-h-[120px]"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </CardContent>
                  </Card>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-8">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Briefcase className="w-5 h-5" /> Your Skills
                      </CardTitle>
                      <CardDescription>
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
                                        <FormLabel className="font-normal cursor-pointer">
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

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Rocket className="w-5 h-5" /> Your Motivations
                      </CardTitle>
                      <CardDescription>
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
                                        <FormLabel className="font-normal cursor-pointer">
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

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Heart className="w-5 h-5" /> Your Values
                      </CardTitle>
                      <CardDescription>
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
                                        <FormLabel className="font-normal cursor-pointer">
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

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Brain className="w-5 h-5" /> Your Work Style
                      </CardTitle>
                      <CardDescription>
                        How do you prefer to work? Select all that apply.
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
                                            checked={field.value?.includes(style.id)}
                                            onCheckedChange={(checked) => {
                                              return checked
                                                ? field.onChange([...field.value, style.id])
                                                : field.onChange(
                                                    field.value?.filter(
                                                      (value) => value !== style.id
                                                    )
                                                  )
                                            }}
                                          />
                                        </FormControl>
                                        <FormLabel className="font-normal cursor-pointer">
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

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <DollarSign className="w-5 h-5" /> Financial Goals
                      </CardTitle>
                      <CardDescription>
                        What are your primary financial goals for this career?
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
                                className="space-y-3"
                              >
                                {financialGoalsOptions.map((goal) => (
                                  <FormItem
                                    key={goal.id}
                                    className="flex items-center space-x-3 space-y-0"
                                  >
                                    <FormControl>
                                      <RadioGroupItem value={goal.id} />
                                    </FormControl>
                                    <FormLabel className="font-normal cursor-pointer">
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
                </div>
              )}

              <div className="flex justify-between mt-6">
                {step > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep((prev) => prev - 1)}
                  >
                    Back
                  </Button>
                )}
                {step < 3 && (
                  <Button
                    type="button"
                    onClick={handleNextStep}
                    disabled={isSubmitting}
                    className="ml-auto"
                  >
                    {step === 2 ? (
                      <>
                        {isSubmitting ? (
                          <>
                            <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
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

        {/* Results */}
        {step === 3 && recommendation && (
          <div className="space-y-8 animate-in fade-in slide-in-from-top-4 duration-500">
            <div className="text-center space-y-2">
              <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
                <Sparkles className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold">Your Personalized Career Recommendation</h3>
              <p className="text-muted-foreground">
                Based on your unique skills, values, and goals
              </p>
            </div>

            <Card className="border-primary/20 shadow-lg">
              <CardHeader className="pb-4">
                <Badge className="mb-2 self-start" variant="default">
                  Recommended Path
                </Badge>
                <CardTitle className="text-2xl font-bold text-primary">
                  {recommendation.recommendedPath}
                </CardTitle>
                <CardDescription className="text-base">
                  {recommendation.explanation}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-semibold text-lg mb-3 flex items-center">
                    <Star className="h-5 w-5 mr-2 text-yellow-500" />
                    Your Strengths
                  </h4>
                  <ul className="grid gap-2">
                    {recommendation.strengths.map((strength, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="h-5 w-5 mr-2 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>{strength}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Separator />

                <div>
                  <h4 className="font-semibold text-lg mb-3">Development Areas</h4>
                  <ul className="grid gap-2">
                    {recommendation.developmentAreas.map((area, index) => (
                      <li key={index} className="flex items-start">
                        <div className="h-5 w-5 mr-2 rounded-full border-2 border-primary flex items-center justify-center flex-shrink-0">
                          <div className="h-2 w-2 bg-primary rounded-full"></div>
                        </div>
                        <span>{area}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Separator />

                <div>
                  <h4 className="font-semibold text-lg mb-3">Next Steps</h4>
                  <ol className="grid gap-3">
                    {recommendation.nextSteps.map((step, index) => (
                      <li key={index} className="flex items-start">
                        <span className="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full bg-primary text-primary-foreground text-sm font-medium mr-3">
                          {index + 1}
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                <Separator />

                <div className="bg-muted/50 p-4 rounded-lg">
                  <h4 className="font-semibold text-lg mb-1">Estimated Timeframe</h4>
                  <p>{recommendation.estimatedTimeframe}</p>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col md:flex-row gap-4">
                <Button onClick={resetQuiz} variant="outline" className="w-full md:w-auto">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Take Quiz Again
                </Button>
                <Button className="w-full md:w-auto">
                  Schedule a Consultation
                </Button>
              </CardFooter>
            </Card>

            <div className="text-center pt-4">
              <p className="text-muted-foreground text-sm">
                Want to discuss your results in person? Reach out to our team for a personalized consultation.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}