import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AlertCircle, DollarSign, TrendingUp, Award, Zap, Briefcase, Home, Car } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const calculatorSchema = z.object({
  rank: z.string(),
  premium: z.string().min(1, "Premium is required").refine((val) => !isNaN(Number(val)), {
    message: "Premium must be a number",
  }),
  policies: z.string().min(1, "Number of policies is required").refine((val) => !isNaN(Number(val)), {
    message: "Number of policies must be a number",
  }),
  region: z.string().optional(),
  currentIncome: z.string().optional(),
});

type CalculatorInputs = z.infer<typeof calculatorSchema>;

export default function CommissionCalculator() {
  const [monthlyCommission, setMonthlyCommission] = useState<number>(0);
  const [annualCommission, setAnnualCommission] = useState<number>(0);
  const [points, setPoints] = useState<number>(0);
  const [isHighlighted, setIsHighlighted] = useState<boolean>(false);
  const [yearlyProjection, setYearlyProjection] = useState<number[]>([]);
  const [showLifestyleImpact, setShowLifestyleImpact] = useState<boolean>(false);
  const [comparisonIncome, setComparisonIncome] = useState<number>(0);
  const [region, setRegion] = useState<string>("florida");

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CalculatorInputs>({
    resolver: zodResolver(calculatorSchema),
    defaultValues: {
      rank: "0.3",
      premium: "250",
      policies: "5",
      region: "florida",
      currentIncome: "",
    },
  });

  const watchRank = watch("rank");
  const watchPremium = watch("premium");
  const watchPolicies = watch("policies");
  const watchCurrentIncome = watch("currentIncome");
  const watchRegion = watch("region");

  // Calculate on form field changes for real-time updates
  useEffect(() => {
    if (watchRank && watchPremium && watchPolicies) {
      const rank = parseFloat(watchRank);
      const premium = parseFloat(watchPremium);
      const policies = parseInt(watchPolicies);

      if (!isNaN(rank) && !isNaN(premium) && !isNaN(policies)) {
        const annualPremium = premium * 12 * policies;
        const commission = annualPremium * rank;
        const monthlyCommission = commission / 12;
        const pointsValue = annualPremium * 1.25;

        setMonthlyCommission(monthlyCommission);
        setAnnualCommission(commission);
        setPoints(pointsValue);
        
        // Project growth for 3 years
        calculateGrowthProjection(monthlyCommission);
      }
    }

    if (watchRegion) {
      setRegion(watchRegion);
    }
    
    if (watchCurrentIncome) {
      const income = parseFloat(watchCurrentIncome.replace(/,/g, ""));
      if (!isNaN(income)) {
        setComparisonIncome(income);
      }
    }
  }, [watchRank, watchPremium, watchPolicies, watchCurrentIncome, watchRegion]);

  const calculateGrowthProjection = (startingMonthly: number) => {
    // Simplified growth projection
    const projection = [startingMonthly * 12]; // Year 1
    projection.push(projection[0] * 1.5); // Year 2: 50% growth
    projection.push(projection[1] * 1.7); // Year 3: 70% growth from year 2
    setYearlyProjection(projection);
  };

  const onSubmit = (data: CalculatorInputs) => {
    const rank = parseFloat(data.rank);
    const premium = parseFloat(data.premium);
    const policies = parseInt(data.policies);

    const annualPremium = premium * 12 * policies;
    const commission = annualPremium * rank;
    const monthlyCommission = commission / 12;
    let pointsValue = 0;

    // Transamerica calculation for points (simplified)
    pointsValue = annualPremium * 1.25;

    setMonthlyCommission(monthlyCommission);
    setAnnualCommission(commission);
    setPoints(pointsValue);
    setShowLifestyleImpact(true);

    // Animation effect
    setIsHighlighted(true);
    setTimeout(() => setIsHighlighted(false), 300);
    
    // Calculate growth projection
    calculateGrowthProjection(monthlyCommission);
  };

  return (
    <section id="calculator" className="mb-16">
      <Card className="shadow-lg">
        <CardHeader className="bg-primary text-white p-6">
          <div className="mb-2">
            <span className="bg-white/20 text-white text-sm font-semibold px-3 py-1 rounded-full">
              Financial Freedom Calculator
            </span>
          </div>
          <CardTitle className="font-heading font-bold text-3xl mb-2">
            Visualize Your Potential Income
          </CardTitle>
          <CardDescription className="text-white opacity-90">
            See how WFG can transform your financial future by calculating your potential earnings 
            based on your rank and sales activity. Many of our associates nationwide 
            have multiplied their former incomes by 3-5x within their first year.
          </CardDescription>
        </CardHeader>
        
        <CardContent className="p-6">
          <Tabs defaultValue="calculate" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="calculate">Calculate Potential</TabsTrigger>
              <TabsTrigger value="lifestyle">Lifestyle Impact</TabsTrigger>
            </TabsList>
            
            <TabsContent value="calculate">
              <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <div className="mb-6">
                    <Label htmlFor="rank" className="block text-lg font-semibold mb-2">
                      Your Rank
                    </Label>
                    <Controller
                      name="rank"
                      control={control}
                      render={({ field }) => (
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="w-full p-3 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
                            <SelectValue placeholder="Select your rank" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="0.3">Training Associate (30%)</SelectItem>
                            <SelectItem value="0.45">Associate (45%)</SelectItem>
                            <SelectItem value="0.55">Senior Associate (55%)</SelectItem>
                            <SelectItem value="0.62">Marketing Director (62%)</SelectItem>
                            <SelectItem value="0.8">Senior Marketing Director (80%)</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>
                  
                  <div className="mb-6">
                    <Label htmlFor="premium" className="block text-lg font-semibold mb-2">
                      Monthly Premium Amount ($)
                    </Label>
                    <Controller
                      name="premium"
                      control={control}
                      render={({ field }) => (
                        <Input
                          id="premium"
                          type="number"
                          min="50"
                          className="w-full p-3 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                          {...field}
                        />
                      )}
                    />
                    {errors.premium && (
                      <Alert variant="destructive" className="mt-2">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{errors.premium.message}</AlertDescription>
                      </Alert>
                    )}
                  </div>

                  <div className="mb-6">
                    <Label htmlFor="policies" className="block text-lg font-semibold mb-2">
                      Number of Policies Per Month
                    </Label>
                    <Controller
                      name="policies"
                      control={control}
                      render={({ field }) => (
                        <Input
                          id="policies"
                          type="number"
                          min="1"
                          max="100"
                          className="w-full p-3 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                          {...field}
                        />
                      )}
                    />
                    {errors.policies && (
                      <Alert variant="destructive" className="mt-2">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{errors.policies.message}</AlertDescription>
                      </Alert>
                    )}
                  </div>
                  
                  <div className="mb-6">
                    <Label htmlFor="region" className="block text-lg font-semibold mb-2">
                      Your Region
                    </Label>
                    <Controller
                      name="region"
                      control={control}
                      render={({ field }) => (
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="w-full p-3 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
                            <SelectValue placeholder="Select your region" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="caribbean">Caribbean</SelectItem>
                            <SelectItem value="nationwide">United States</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>
                  
                  <div className="mb-6">
                    <Label htmlFor="currentIncome" className="block text-lg font-semibold mb-2">
                      Your Current Monthly Income ($)
                    </Label>
                    <Controller
                      name="currentIncome"
                      control={control}
                      render={({ field }) => (
                        <Input
                          id="currentIncome"
                          type="text"
                          placeholder="Optional - for comparison"
                          className="w-full p-3 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                          {...field}
                        />
                      )}
                    />
                  </div>
                  
                  <Button 
                    type="submit"
                    className="bg-accent hover:bg-accent-dark text-white font-semibold px-6 py-3 rounded-md transition-colors duration-300"
                  >
                    Calculate Earnings
                  </Button>
                </div>
                
                <div className="bg-gradient-to-r from-primary/5 to-accent/5 p-6 rounded-lg border border-primary/20">
                  <h3 className="font-heading font-semibold text-xl mb-4">Your Financial Transformation</h3>
                  
                  <div className="space-y-6">
                    <div className="bg-white p-4 rounded-md shadow-sm">
                      <p className="text-neutral-600 font-semibold">Monthly Commission:</p>
                      <p 
                        className={`font-mono text-3xl font-bold text-secondary animate-value ${isHighlighted ? 'highlight' : ''}`}
                      >
                        ${monthlyCommission.toFixed(2)}
                      </p>
                      {comparisonIncome > 0 && monthlyCommission > comparisonIncome && (
                        <p className="text-xs text-accent-dark mt-1 font-semibold">
                          That's ${(monthlyCommission - comparisonIncome).toFixed(2)} more than your current income!
                        </p>
                      )}
                      {monthlyCommission > 5000 && (
                        <p className="text-xs text-accent-dark mt-1 font-semibold">
                          That's more than many professionals earn in a month!
                        </p>
                      )}
                    </div>
                    
                    <div className="bg-white p-4 rounded-md shadow-sm">
                      <p className="text-neutral-600 font-semibold">Annual Commission:</p>
                      <p 
                        className={`font-mono text-3xl font-bold text-secondary animate-value ${isHighlighted ? 'highlight' : ''}`}
                      >
                        ${annualCommission.toFixed(2)}
                      </p>
                      {annualCommission > 50000 && (
                        <p className="text-xs text-accent-dark mt-1 font-semibold">
                          This could be life-changing income for you and your family!
                        </p>
                      )}
                    </div>
                    
                    <div className="bg-white p-4 rounded-md shadow-sm">
                      <p className="text-neutral-600 font-semibold">Points Generated:</p>
                      <p 
                        className={`font-mono text-3xl font-bold text-primary animate-value ${isHighlighted ? 'highlight' : ''}`}
                      >
                        {Math.round(points)}
                      </p>
                      <p className="text-xs text-primary-dark mt-1">
                        Points help you track progress toward promotions and bonuses
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-6 p-4 bg-white rounded-md border border-accent/20">
                    <div className="flex items-center mb-2">
                      <div className="w-2 h-2 rounded-full bg-accent mr-2"></div>
                      <p className="text-sm font-semibold">3-Year Growth Projection</p>
                    </div>
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      {yearlyProjection.map((amount, index) => (
                        <div key={index} className="text-center">
                          <div className="bg-primary/10 rounded-t-md py-1">
                            <p className="text-xs font-semibold text-primary">Year {index + 1}</p>
                          </div>
                          <div className="py-2 px-1 border border-t-0 border-primary/20 rounded-b-md">
                            <p className="text-lg font-mono font-bold">${Math.round(amount).toLocaleString()}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-neutral-500">Based on typical growth patterns of successful associates</p>
                  </div>
                  
                  <div className="mt-6 p-4 bg-white rounded-md border border-accent/20">
                    <div className="flex items-center mb-2">
                      <div className="w-2 h-2 rounded-full bg-accent mr-2"></div>
                      <p className="text-sm font-semibold">Promotion Potential</p>
                    </div>
                    <div>
                      {points < 1000 && (
                        <p className="text-sm">Keep working! You need at least 1,000 points to promote to Associate.</p>
                      )}
                      {points >= 1000 && points < 3000 && (
                        <p className="text-sm">Great start! You have enough points to potentially reach Associate level.</p>
                      )}
                      {points >= 3000 && points < 10000 && (
                        <p className="text-sm">Impressive! You're on track for Senior Associate with these numbers.</p>
                      )}
                      {points >= 10000 && (
                        <p className="text-sm">Exceptional! You're generating Marketing Director level production.</p>
                      )}
                    </div>
                  </div>
                </div>
              </form>
            </TabsContent>
            
            <TabsContent value="lifestyle">
              <div className="bg-gradient-to-r from-primary/5 to-accent/5 p-6 rounded-lg border border-primary/20">
                <h3 className="font-heading font-semibold text-xl mb-6 text-center">What Your WFG Income Could Mean For Your Life</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-white p-5 rounded-lg shadow-sm flex flex-col items-center text-center">
                    <Home className="h-10 w-10 text-accent mb-3" />
                    <h4 className="font-semibold text-lg mb-2">Home Ownership</h4>
                    <p className="text-sm text-neutral-600">
                      With an annual income of ${Math.round(annualCommission).toLocaleString()}, you could qualify for a mortgage 
                      up to ${Math.round(annualCommission * 3).toLocaleString()} in many areas, making your dream home a reality.
                    </p>
                  </div>
                  
                  <div className="bg-white p-5 rounded-lg shadow-sm flex flex-col items-center text-center">
                    <Car className="h-10 w-10 text-accent mb-3" />
                    <h4 className="font-semibold text-lg mb-2">Dream Vehicle</h4>
                    <p className="text-sm text-neutral-600">
                      Many of our associates celebrate their success by purchasing vehicles they've always wanted - 
                      a tangible symbol of their hard work and determination.
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-white p-5 rounded-lg shadow-sm flex flex-col items-center text-center">
                    <Zap className="h-10 w-10 text-accent mb-3" />
                    <h4 className="font-semibold text-lg mb-2">Financial Freedom</h4>
                    <p className="text-sm text-neutral-600">
                      Imagine being debt-free and building wealth for your future instead of living paycheck to paycheck.
                    </p>
                  </div>
                  
                  <div className="bg-white p-5 rounded-lg shadow-sm flex flex-col items-center text-center">
                    <Briefcase className="h-10 w-10 text-accent mb-3" />
                    <h4 className="font-semibold text-lg mb-2">Work-Life Balance</h4>
                    <p className="text-sm text-neutral-600">
                      Set your own schedule and never miss important family moments again. Be your own boss!
                    </p>
                  </div>
                  
                  <div className="bg-white p-5 rounded-lg shadow-sm flex flex-col items-center text-center">
                    <TrendingUp className="h-10 w-10 text-accent mb-3" />
                    <h4 className="font-semibold text-lg mb-2">Legacy Building</h4>
                    <p className="text-sm text-neutral-600">
                      Create generational wealth and establish a business that can be passed down to your children.
                    </p>
                  </div>
                </div>
                
                {region && (
                  <div className="bg-primary/10 p-5 rounded-lg mb-6">
                    <h4 className="font-semibold text-lg mb-3 text-primary text-center">Regional Success Stories</h4>
                    
                    {region === 'caribbean' && (
                      <div>
                        <p className="text-sm mb-4">
                          In the Caribbean, our top-performing associates have transformed entire communities by creating jobs 
                          and providing financial education. Many started with nothing but ambition and determination.
                        </p>
                        <p className="text-sm font-semibold">
                          "After Hurricane Maria devastated my community, I used my WFG business to help rebuild. Now my team helps 
                          hundreds of families secure their financial futures." - Carlos Mendez, Puerto Rico
                        </p>
                      </div>
                    )}
                    
                    {region === 'florida' && (
                      <div>
                        <p className="text-sm mb-4">
                          Our associates nationwide have created some of our fastest-growing teams, leveraging diverse communities 
                          and entrepreneurial spirit of the Sunshine State to build massive organizations.
                        </p>
                        <p className="text-sm font-semibold">
                          "I left a 20-year banking career to join WFG. Within two years, I had surpassed my banking salary 
                          and now lead a team of 75 associates nationwide." - Elena Rodriguez
                        </p>
                      </div>
                    )}
                    
                    {region === 'newyork' && (
                      <div>
                        <p className="text-sm mb-4">
                          In competitive markets nationwide, our associates thrive by serving diverse communities 
                          and building strong teams that support each other like family.
                        </p>
                        <p className="text-sm font-semibold">
                          "I started part-time while working as a teacher in the Bronx. Now I've retired from teaching and 
                          earn six figures helping families in my community secure their futures." - Marcus Johnson, Bronx
                        </p>
                      </div>
                    )}
                    
                    {region === 'other' && (
                      <div>
                        <p className="text-sm mb-4">
                          No matter where you're located, WFG provides the systems and support for your success. Our 
                          associates across North America have created thriving businesses in every type of market.
                        </p>
                        <p className="text-sm font-semibold">
                          "The WFG system works in any market because people everywhere need financial protection and education. 
                          Your determination is the only limiting factor." - Paul Santiago, Marketing Director
                        </p>
                      </div>
                    )}
                  </div>
                )}
                
                <div className="text-center">
                  <Button 
                    className="bg-accent hover:bg-accent-dark text-white font-semibold px-6 py-3 rounded-md transition-colors duration-300"
                    onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                  >
                    Start Your Journey Today
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </section>
  );
}
