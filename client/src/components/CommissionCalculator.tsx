import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const calculatorSchema = z.object({
  rank: z.string(),
  premium: z.string().min(1, "Premium is required").refine((val) => !isNaN(Number(val)), {
    message: "Premium must be a number",
  }),
  policies: z.string().min(1, "Number of policies is required").refine((val) => !isNaN(Number(val)), {
    message: "Number of policies must be a number",
  }),
});

type CalculatorInputs = z.infer<typeof calculatorSchema>;

export default function CommissionCalculator() {
  const [monthlyCommission, setMonthlyCommission] = useState<number>(0);
  const [annualCommission, setAnnualCommission] = useState<number>(0);
  const [points, setPoints] = useState<number>(0);
  const [isHighlighted, setIsHighlighted] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CalculatorInputs>({
    resolver: zodResolver(calculatorSchema),
    defaultValues: {
      rank: "0.3",
      premium: "250",
      policies: "5",
    },
  });

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

    // Animation effect
    setIsHighlighted(true);
    setTimeout(() => setIsHighlighted(false), 300);
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
            based on your rank and sales activity. Many of our Caribbean, Florida and New York associates 
            have multiplied their former incomes by 3-5x within their first year.
          </CardDescription>
        </CardHeader>
        
        <CardContent className="p-6">
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
                  <p className="text-sm font-semibold">
                    Now imagine building a team and multiplying this income!
                  </p>
                </div>
                <p className="text-sm text-neutral-700">
                  This calculator provides estimates based on the information provided. Actual commissions and points may vary based on specific products, carriers, and other factors.
                </p>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </section>
  );
}
