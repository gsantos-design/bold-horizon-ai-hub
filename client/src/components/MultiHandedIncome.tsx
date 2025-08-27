import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Users, Building, Calculator, PlayCircle } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { useProgress } from "@/lib/ProgressContext";

export default function MultiHandedIncome() {
  const { t } = useLanguage();
  const { markModuleStarted, markCalculatorUsed, markWorkshopCompleted } = useProgress();
  const [currentIncome, setCurrentIncome] = useState<number>(5000);
  const [systemFactor, setSystemFactor] = useState<number>(3);
  const [timeframe, setTimeframe] = useState<number>(2);
  const [hasStartedModule, setHasStartedModule] = useState(false);
  
  // Track module start
  if (!hasStartedModule) {
    markModuleStarted("multi-handed-income");
    setHasStartedModule(true);
  }

  const calculateProjections = () => {
    const monthly = currentIncome;
    const annual = monthly * 12;
    
    const projected5x = annual * 5;
    const projected10x = annual * 10;
    const systemBased = annual * systemFactor;
    
    return {
      current: {
        monthly,
        annual
      },
      projections: {
        fiveX: projected5x,
        tenX: projected10x,
        systemBased
      }
    };
  };

  const results = calculateProjections();

  const caseStudies = [
    {
      title: "Starbucks Model",
      description: "Instead of designing more coffee flavors (skill-based), Starbucks multiplied revenue by opening more locations (system-based).",
      growthFactor: "1000+ locations",
      icon: <Building className="h-6 w-6" />
    },
    {
      title: "WFG Success Story",
      description: "Maria went from $60k/year to $300k+ by building a team-based system instead of working more hours.",
      growthFactor: "5x income growth",
      icon: <Users className="h-6 w-6" />
    },
    {
      title: "Franchise Model",
      description: "McDonald's doesn't make money from burgers - they make money from systems that generate consistent returns.",
      growthFactor: "Scalable systems",
      icon: <TrendingUp className="h-6 w-6" />
    }
  ];

  const learningModules = [
    {
      title: "Skill-Based vs System-Based Income",
      duration: "5 min",
      description: "Understand why most people hit a glass ceiling and how to break through it.",
      completed: false
    },
    {
      title: "The Starbucks Strategy",
      duration: "3 min", 
      description: "Learn how major companies multiply revenue through systems, not just skills.",
      completed: false
    },
    {
      title: "Building Your First System",
      duration: "8 min",
      description: "Step-by-step guide to creating your own multi-handed income stream.",
      completed: false
    }
  ];

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Multi-Handed Income Philosophy
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Stop thinking about growing your income. Start thinking about multiplying it. 
              Learn the system-driven approach that can 5x to 10x your earnings without working more hours.
            </p>
          </div>

          <Tabs defaultValue="calculator" className="space-y-8">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="calculator" className="flex items-center gap-2">
                <Calculator className="h-4 w-4" />
                Income Calculator
              </TabsTrigger>
              <TabsTrigger value="learning" className="flex items-center gap-2">
                <PlayCircle className="h-4 w-4" />
                Learning Path
              </TabsTrigger>
              <TabsTrigger value="case-studies" className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Case Studies
              </TabsTrigger>
            </TabsList>

            <TabsContent value="calculator" className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Calculator Input */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calculator className="h-5 w-5 text-blue-600" />
                      Income Multiplier Calculator
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <Label htmlFor="current-income">Current Monthly Income ($)</Label>
                      <Input
                        id="current-income"
                        type="number"
                        value={currentIncome}
                        onChange={(e) => {
                          setCurrentIncome(Number(e.target.value));
                          markCalculatorUsed("income-multiplier");
                        }}
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="system-factor">System Replication Factor</Label>
                      <div className="mt-1 space-y-2">
                        <Input
                          id="system-factor"
                          type="range"
                          min="2"
                          max="10"
                          value={systemFactor}
                          onChange={(e) => setSystemFactor(Number(e.target.value))}
                          className="w-full"
                        />
                        <div className="flex justify-between text-sm text-gray-500">
                          <span>2x</span>
                          <span className="font-medium text-blue-600">{systemFactor}x</span>
                          <span>10x</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="timeframe">Timeframe (Years)</Label>
                      <select 
                        id="timeframe"
                        value={timeframe}
                        onChange={(e) => setTimeframe(Number(e.target.value))}
                        className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
                      >
                        <option value={1}>1 Year</option>
                        <option value={2}>2 Years</option>
                        <option value={3}>3 Years</option>
                        <option value={5}>5 Years</option>
                      </select>
                    </div>
                  </CardContent>
                </Card>

                {/* Results */}
                <Card>
                  <CardHeader>
                    <CardTitle>Your Income Projections</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-gray-900">
                          ${results.current.monthly.toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-600">Current Monthly</div>
                      </div>
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-gray-900">
                          ${results.current.annual.toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-600">Current Annual</div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-blue-900">System-Based Growth ({systemFactor}x)</span>
                          <Badge className="bg-primary text-white">${results.projections.systemBased.toLocaleString()}</Badge>
                        </div>
                        <div className="text-sm text-blue-700 mt-1">
                          Potential annual income with {systemFactor}x system replication
                        </div>
                      </div>

                      <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-green-900">5x Growth Target</span>
                          <Badge className="bg-primary text-white">${results.projections.fiveX.toLocaleString()}</Badge>
                        </div>
                        <div className="text-sm text-green-700 mt-1">
                          Conservative system-based projection
                        </div>
                      </div>

                      <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-emerald-900">10x Growth Potential</span>
                          <Badge className="bg-primary text-white">${results.projections.tenX.toLocaleString()}</Badge>
                        </div>
                        <div className="text-sm text-emerald-700 mt-1">
                          Advanced system-based potential
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t">
                      <p className="text-sm text-gray-600 text-center">
                        <strong>Remember:</strong> These projections assume system-based growth, 
                        not just working more hours or getting more skills.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="learning" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {learningModules.map((module, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{module.title}</CardTitle>
                        <Badge variant="secondary">{module.duration}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-4">{module.description}</p>
                      <Button 
                        className="w-full" 
                        variant={module.completed ? "outline" : "default"}
                        onClick={() => markWorkshopCompleted(`workshop-${index}`)}
                      >
                        <PlayCircle className="h-4 w-4 mr-2" />
                        {module.completed ? "Review" : "Start Module"}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="case-studies" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {caseStudies.map((study, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3">
                        <div className="text-blue-600">{study.icon}</div>
                        {study.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-4">{study.description}</p>
                      <div className="flex justify-between items-center">
                        <Badge className="bg-green-100 text-green-800">
                          {study.growthFactor}
                        </Badge>
                        <Button variant="outline" size="sm">
                          Learn More
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          {/* Call to Action */}
          <div className="mt-12 text-center">
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-blue-900 mb-4">
                  Ready to Multiply Your Income?
                </h3>
                <p className="text-blue-700 mb-6 max-w-2xl mx-auto">
                  Join thousands who have transformed their financial future through system-based income growth. 
                  Stop trading time for money and start building wealth that works for you.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    size="lg" 
                    className="bg-primary hover:bg-primary/90 text-white"
                    onClick={() => window.open('https://agents.worldfinancialgroup.com/Nolly-Santiago-C8V5D', '_blank')}
                  >
                    Start Your Journey
                  </Button>
                  <Button 
                    size="lg" 
                    className="bg-primary hover:bg-primary/90 text-white"
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