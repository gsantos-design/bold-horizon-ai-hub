import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { PiggyBank, TrendingUp, Shield, Calculator, Target, BookOpen } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

interface BudgetItem {
  name: string;
  amount: number;
  category: "need" | "want";
}

export default function FinancialEducationModule() {
  const { t } = useLanguage();
  
  // Budget Simulator State
  const [monthlyIncome, setMonthlyIncome] = useState(5000);
  const [expenses, setExpenses] = useState<BudgetItem[]>([
    { name: "Rent/Mortgage", amount: 1500, category: "need" },
    { name: "Food & Groceries", amount: 600, category: "need" },
    { name: "Transportation", amount: 400, category: "need" },
    { name: "Entertainment", amount: 300, category: "want" },
    { name: "Shopping", amount: 200, category: "want" }
  ]);

  // Compound Interest Calculator State
  const [principal, setPrincipal] = useState(10000);
  const [monthlyContribution, setMonthlyContribution] = useState(500);
  const [interestRate, setInterestRate] = useState(7);
  const [years, setYears] = useState(20);

  // Goal Builder State
  const [goalType, setGoalType] = useState<"protection" | "retirement" | "wealth">("protection");
  const [familySize, setFamilySize] = useState(4);
  const [currentAge, setCurrentAge] = useState(35);
  const [retirementAge, setRetirementAge] = useState(65);

  const calculateBudgetScenarios = () => {
    const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    
    // Traditional Budgeting (save what's left)
    const traditionalSavings = Math.max(0, monthlyIncome - totalExpenses);
    
    // Prioritize Savings (pay yourself first - 10%)
    const prioritySavings = monthlyIncome * 0.1;
    const remainingForExpenses = monthlyIncome - prioritySavings;
    const adjustedExpenses = Math.min(totalExpenses, remainingForExpenses);
    
    return {
      traditional: {
        savings: traditionalSavings,
        expenses: totalExpenses,
        savingsRate: (traditionalSavings / monthlyIncome) * 100
      },
      priority: {
        savings: prioritySavings,
        expenses: adjustedExpenses,
        savingsRate: 10,
        available: remainingForExpenses
      }
    };
  };

  const calculateCompoundGrowth = () => {
    const monthlyRate = interestRate / 100 / 12;
    const totalMonths = years * 12;
    
    // Future value of initial principal
    const principalGrowth = principal * Math.pow(1 + monthlyRate, totalMonths);
    
    // Future value of monthly contributions (annuity)
    const contributionsGrowth = monthlyContribution * 
      ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate);
    
    const totalValue = principalGrowth + contributionsGrowth;
    const totalContributed = principal + (monthlyContribution * totalMonths);
    const interestEarned = totalValue - totalContributed;
    
    return {
      totalValue: Math.round(totalValue),
      totalContributed: Math.round(totalContributed),
      interestEarned: Math.round(interestEarned)
    };
  };

  const calculateGoalPlan = () => {
    switch (goalType) {
      case "protection":
        const annualIncome = monthlyIncome * 12;
        const recommendedCoverage = annualIncome * 10; // 10x annual income rule
        const estimatedPremium = (annualIncome * 0.02) / 12; // ~2% of annual income monthly
        
        return {
          title: "Income Protection Plan",
          target: recommendedCoverage,
          monthlyAction: estimatedPremium,
          description: `Protect your family with ${recommendedCoverage.toLocaleString()} in life insurance coverage`,
          timeframe: "Immediate protection",
          nextSteps: [
            "Review current coverage gaps",
            "Compare term vs whole life options", 
            "Consider disability insurance",
            "Update beneficiaries"
          ]
        };
        
      case "retirement":
        const yearsToRetirement = retirementAge - currentAge;
        const annualIncomeRetirement = monthlyIncome * 12;
        const retirementNeeds = annualIncomeRetirement * 0.8 * 25; // 80% replacement for 25 years
        const monthlyNeeded = retirementNeeds / (yearsToRetirement * 12);
        
        return {
          title: "Retirement Income Plan",
          target: retirementNeeds,
          monthlyAction: monthlyNeeded,
          description: `Build ${retirementNeeds.toLocaleString()} for comfortable retirement`,
          timeframe: `${yearsToRetirement} years to retirement`,
          nextSteps: [
            "Maximize 401(k) contributions",
            "Consider Roth IRA conversions",
            "Review investment allocation",
            "Plan for healthcare costs"
          ]
        };
        
      case "wealth":
        const annualIncomeWealth = monthlyIncome * 12;
        const wealthTarget = annualIncomeWealth * 15; // 15x annual income for generational wealth
        const wealthTimeframe = 30;
        const monthlyWealth = wealthTarget / (wealthTimeframe * 12);
        
        return {
          title: "Generational Wealth Plan", 
          target: wealthTarget,
          monthlyAction: monthlyWealth,
          description: `Create ${wealthTarget.toLocaleString()} in generational wealth`,
          timeframe: `${wealthTimeframe} year wealth building strategy`,
          nextSteps: [
            "Establish education funds",
            "Consider permanent life insurance",
            "Explore real estate investments",
            "Plan estate and tax strategies"
          ]
        };
        
      default:
        return { title: "", target: 0, monthlyAction: 0, description: "", timeframe: "", nextSteps: [] };
    }
  };

  const budgetResults = calculateBudgetScenarios();
  const compoundResults = calculateCompoundGrowth();
  const goalPlan = calculateGoalPlan();

  const workshops = [
    {
      title: "Budgeting vs Prioritizing Savings",
      duration: "15 min",
      description: "Learn why paying yourself first creates better financial outcomes than saving leftovers.",
      icon: <PiggyBank className="h-6 w-6" />,
      completed: false
    },
    {
      title: "The Three Rules of Money",
      duration: "20 min", 
      description: "Master compound interest, growth strategies, and tax optimization.",
      icon: <TrendingUp className="h-6 w-6" />,
      completed: false
    },
    {
      title: "Income Protection Strategies",
      duration: "12 min",
      description: "Safeguard your family's financial future with proper insurance planning.",
      icon: <Shield className="h-6 w-6" />,
      completed: false
    }
  ];

  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Financial Education Philosophy
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Learn how money really works. Master the difference between budgeting and prioritizing savings, 
              understand the three rules of money, and build your financial foundation.
            </p>
          </div>

          <Tabs defaultValue="budget-simulator" className="space-y-8">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="budget-simulator" className="flex items-center gap-2">
                <PiggyBank className="h-4 w-4" />
                Budget vs Priority
              </TabsTrigger>
              <TabsTrigger value="money-rules" className="flex items-center gap-2">
                <Calculator className="h-4 w-4" />
                Money Rules
              </TabsTrigger>
              <TabsTrigger value="goal-builder" className="flex items-center gap-2">
                <Target className="h-4 w-4" />
                Goal Builder
              </TabsTrigger>
              <TabsTrigger value="workshops" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                Workshops
              </TabsTrigger>
            </TabsList>

            <TabsContent value="budget-simulator" className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Budget Input</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="monthly-income">Monthly Income ($)</Label>
                      <Input
                        id="monthly-income"
                        type="number"
                        value={monthlyIncome}
                        onChange={(e) => setMonthlyIncome(Number(e.target.value))}
                        className="mt-1"
                      />
                    </div>
                    
                    <div className="space-y-3">
                      <Label>Monthly Expenses</Label>
                      {expenses.map((expense, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <Input
                            value={expense.name}
                            onChange={(e) => {
                              const newExpenses = [...expenses];
                              newExpenses[index].name = e.target.value;
                              setExpenses(newExpenses);
                            }}
                            className="flex-1"
                          />
                          <Input
                            type="number"
                            value={expense.amount}
                            onChange={(e) => {
                              const newExpenses = [...expenses];
                              newExpenses[index].amount = Number(e.target.value);
                              setExpenses(newExpenses);
                            }}
                            className="w-24"
                          />
                          <Badge variant={expense.category === "need" ? "default" : "secondary"}>
                            {expense.category}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Comparison Results</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                        <h4 className="font-semibold text-red-900 mb-2">Traditional Budgeting</h4>
                        <div className="text-2xl font-bold text-red-700">
                          ${budgetResults.traditional.savings.toLocaleString()}
                        </div>
                        <div className="text-sm text-red-600">
                          {budgetResults.traditional.savingsRate.toFixed(1)}% savings rate
                        </div>
                        <p className="text-xs text-red-600 mt-2">Save what's left after expenses</p>
                      </div>

                      <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                        <h4 className="font-semibold text-green-900 mb-2">Priority Savings</h4>
                        <div className="text-2xl font-bold text-green-700">
                          ${budgetResults.priority.savings.toLocaleString()}
                        </div>
                        <div className="text-sm text-green-600">
                          {budgetResults.priority.savingsRate}% savings rate
                        </div>
                        <p className="text-xs text-green-600 mt-2">Pay yourself first (10%)</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Annual Difference</span>
                          <span className="font-semibold text-green-600">
                            +${((budgetResults.priority.savings - budgetResults.traditional.savings) * 12).toLocaleString()}
                          </span>
                        </div>
                        <Progress 
                          value={budgetResults.priority.savingsRate} 
                          className="h-2"
                        />
                      </div>
                      
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <p className="text-sm text-blue-800">
                          <strong>Key Insight:</strong> Prioritizing savings ensures you save first, 
                          then adjust expenses accordingly. This builds wealth consistently.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="money-rules" className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Compound Interest Calculator</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="principal">Initial Amount ($)</Label>
                        <Input
                          id="principal"
                          type="number"
                          value={principal}
                          onChange={(e) => setPrincipal(Number(e.target.value))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="monthly-contribution">Monthly Contribution ($)</Label>
                        <Input
                          id="monthly-contribution"
                          type="number"
                          value={monthlyContribution}
                          onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="interest-rate">Annual Interest Rate (%)</Label>
                        <Input
                          id="interest-rate"
                          type="number"
                          step="0.1"
                          value={interestRate}
                          onChange={(e) => setInterestRate(Number(e.target.value))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="years">Time Period (Years)</Label>
                        <Input
                          id="years"
                          type="number"
                          value={years}
                          onChange={(e) => setYears(Number(e.target.value))}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Growth Projection</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center p-6 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg">
                      <div className="text-3xl font-bold text-gray-900 mb-2">
                        ${compoundResults.totalValue.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-600">Total Value After {years} Years</div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-gray-50 rounded">
                        <div className="text-xl font-semibold text-gray-900">
                          ${compoundResults.totalContributed.toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-600">Total Contributed</div>
                      </div>
                      <div className="text-center p-4 bg-green-50 rounded">
                        <div className="text-xl font-semibold text-green-700">
                          ${compoundResults.interestEarned.toLocaleString()}
                        </div>
                        <div className="text-sm text-green-600">Interest Earned</div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Your Contributions</span>
                        <span className="text-sm">{((compoundResults.totalContributed / compoundResults.totalValue) * 100).toFixed(1)}%</span>
                      </div>
                      <Progress 
                        value={(compoundResults.totalContributed / compoundResults.totalValue) * 100}
                        className="h-2"
                      />
                      <div className="flex justify-between">
                        <span className="text-sm">Compound Growth</span>
                        <span className="text-sm">{((compoundResults.interestEarned / compoundResults.totalValue) * 100).toFixed(1)}%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="goal-builder" className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Goal Configuration</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Financial Goal Type</Label>
                      <div className="grid grid-cols-3 gap-2 mt-2">
                        <Button
                          variant={goalType === "protection" ? "default" : "outline"}
                          onClick={() => setGoalType("protection")}
                          className="text-xs"
                        >
                          Income Protection
                        </Button>
                        <Button
                          variant={goalType === "retirement" ? "default" : "outline"}
                          onClick={() => setGoalType("retirement")}
                          className="text-xs"
                        >
                          Retirement
                        </Button>
                        <Button
                          variant={goalType === "wealth" ? "default" : "outline"}
                          onClick={() => setGoalType("wealth")}
                          className="text-xs"
                        >
                          Generational Wealth
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="family-size">Family Size</Label>
                        <Input
                          id="family-size"
                          type="number"
                          value={familySize}
                          onChange={(e) => setFamilySize(Number(e.target.value))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="current-age">Current Age</Label>
                        <Input
                          id="current-age"
                          type="number"
                          value={currentAge}
                          onChange={(e) => setCurrentAge(Number(e.target.value))}
                        />
                      </div>
                    </div>

                    {goalType === "retirement" && (
                      <div>
                        <Label htmlFor="retirement-age">Retirement Age</Label>
                        <Input
                          id="retirement-age"
                          type="number"
                          value={retirementAge}
                          onChange={(e) => setRetirementAge(Number(e.target.value))}
                        />
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>{goalPlan.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center p-6 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-gray-900 mb-2">
                        ${goalPlan.target.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-600">{goalPlan.description}</div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-blue-50 rounded">
                        <div className="text-lg font-semibold text-blue-900">
                          ${goalPlan.monthlyAction.toLocaleString()}
                        </div>
                        <div className="text-sm text-blue-600">Monthly Action</div>
                      </div>
                      <div className="text-center p-4 bg-green-50 rounded">
                        <div className="text-lg font-semibold text-green-900">
                          {goalPlan.timeframe}
                        </div>
                        <div className="text-sm text-green-600">Timeline</div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Next Steps:</h4>
                      <ul className="space-y-1 text-sm text-gray-600">
                        {goalPlan.nextSteps.map((step, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                            {step}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="workshops" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {workshops.map((workshop, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg flex items-center gap-3">
                          <div className="text-blue-600">{workshop.icon}</div>
                          {workshop.title}
                        </CardTitle>
                        <Badge variant="secondary">{workshop.duration}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-4">{workshop.description}</p>
                      <Button 
                        className="w-full" 
                        variant={workshop.completed ? "outline" : "default"}
                      >
                        {workshop.completed ? "Review Workshop" : "Start Workshop"}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
}