import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, GraduationCap, Brain, ArrowRight, PlayCircle, Star, Award, Users2, Target, Trophy, Zap } from "lucide-react";
import MultiHandedIncome from "@/components/MultiHandedIncome";
import FinancialEducationModule from "@/components/FinancialEducationModule";
import SelfImprovementModule from "@/components/SelfImprovementModule";
import { useLanguage } from "@/lib/LanguageContext";
import GamificationDashboard from "@/components/GamificationDashboard";

export default function Empower360() {
  const { t } = useLanguage();

  const philosophyModules = [
    {
      id: "multi-handed-income",
      title: "Multi-Handed Income",
      subtitle: "Multiply Your Income Through Systems",
      description: "Stop thinking about growing your income. Start multiplying it through system-driven approaches that can 5x to 10x your earnings.",
      icon: <TrendingUp className="h-8 w-8" />,
      color: "from-blue-500 to-cyan-500",
      features: [
        "Income Multiplier Calculator",
        "System vs Skill-Based Learning",
        "Real-World Case Studies", 
        "Franchise Business Models"
      ]
    },
    {
      id: "financial-education",
      title: "Financial Education", 
      subtitle: "Master How Money Really Works",
      description: "Learn the three rules of money: compound interest, growth strategies, and tax optimization. Build wealth systematically.",
      icon: <GraduationCap className="h-8 w-8" />,
      color: "from-green-500 to-emerald-500",
      features: [
        "Budget vs Priority Savings Simulator",
        "Compound Interest Calculator",
        "Goal Builder for Protection, Retirement & Wealth",
        "Interactive Financial Workshops"
      ]
    },
    {
      id: "self-improvement",
      title: "Self-Improvement",
      subtitle: "Build Confidence That Bends Reality",
      description: "Discover your life lens and learn to operate from imagination and dreams rather than history and memory.",
      icon: <Brain className="h-8 w-8" />,
      color: "from-purple-500 to-pink-500",
      features: [
        "Lens of Life Assessment Quiz",
        "Confidence Building Exercises",
        "Vision Board Creator",
        "Daily Practice Tracker"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl text-center">
          <div className="mb-8">
            <Badge className="mb-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2">
              Led by Nolly & Paul Santiago
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
              Empower360
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-4xl mx-auto">
              Experience the <strong>New Art of Living</strong> through Nolly and Paul Santiago's proven three-pillar system: 
              Multi-Handed Income, Financial Education, and Self-Improvement
            </p>
            
            {/* Leadership Introduction */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 max-w-4xl mx-auto mb-8 border border-purple-200">
              <div className="flex items-center justify-center gap-4 mb-4">
                <Users2 className="h-8 w-8 text-purple-600" />
                <h3 className="text-2xl font-bold text-gray-900">Meet Your Leaders</h3>
              </div>
              <p className="text-gray-700 text-center leading-relaxed">
                <strong>Nolly and Paul Santiago</strong> have transformed thousands of lives through The Santiago Team's 
                proven system. As WFG leaders, they've built a legacy of empowering families to achieve financial 
                freedom through systematic approaches to wealth building, education, and personal growth.
              </p>
            </div>
          </div>

          {/* Philosophy Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {philosophyModules.map((module, index) => (
              <Card key={module.id} className="relative overflow-hidden hover:shadow-xl transition-all duration-300 border-0 bg-white/70 backdrop-blur-sm">
                <div className={`absolute inset-0 bg-gradient-to-br ${module.color} opacity-5`}></div>
                <CardHeader className="text-center relative z-10">
                  <div className={`inline-flex p-4 rounded-full bg-gradient-to-br ${module.color} text-white mb-4 mx-auto`}>
                    {module.icon}
                  </div>
                  <CardTitle className="text-xl font-bold">{module.title}</CardTitle>
                  <p className="text-sm text-gray-600 font-medium">{module.subtitle}</p>
                </CardHeader>
                <CardContent className="relative z-10 space-y-4">
                  <p className="text-gray-700 text-sm leading-relaxed">{module.description}</p>
                  
                  <div className="space-y-2">
                    {module.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center text-sm text-gray-600">
                        <Star className="h-3 w-3 mr-2 text-yellow-500" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <p className="text-lg text-gray-600 mb-6">
              Ready to transform your financial future? Start your journey below.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                <PlayCircle className="h-5 w-5 mr-2" />
                Begin Your Journey
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
          </div>
          
          {/* Gamification Dashboard */}
          <div className="max-w-6xl mx-auto mt-12">
            <GamificationDashboard />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-16">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="multi-handed-income" className="max-w-7xl mx-auto">
            <div className="flex justify-center mb-8">
              <TabsList className="grid w-full max-w-3xl grid-cols-3 h-auto p-2 bg-white/80 backdrop-blur-sm">
                <TabsTrigger 
                  value="multi-handed-income" 
                  className="flex flex-col items-center gap-2 py-4 px-2 data-[state=active]:bg-gradient-to-br data-[state=active]:from-blue-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white"
                >
                  <TrendingUp className="h-5 w-5" />
                  <span className="text-xs md:text-sm font-medium">Multi-Handed Income</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="financial-education"
                  className="flex flex-col items-center gap-2 py-4 px-2 data-[state=active]:bg-gradient-to-br data-[state=active]:from-green-500 data-[state=active]:to-emerald-500 data-[state=active]:text-white"
                >
                  <GraduationCap className="h-5 w-5" />
                  <span className="text-xs md:text-sm font-medium">Financial Education</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="self-improvement"
                  className="flex flex-col items-center gap-2 py-4 px-2 data-[state=active]:bg-gradient-to-br data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white"
                >
                  <Brain className="h-5 w-5" />
                  <span className="text-xs md:text-sm font-medium">Self-Improvement</span>
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="multi-handed-income" className="mt-0">
              <MultiHandedIncome />
            </TabsContent>

            <TabsContent value="financial-education" className="mt-0">
              <FinancialEducationModule />
            </TabsContent>

            <TabsContent value="self-improvement" className="mt-0">
              <SelfImprovementModule />
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Master The New Art of Living?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join Nolly and Paul Santiago's team and thousands of others who have transformed their lives through 
              the proven three-pillar system of multi-handed income, financial education, and self-improvement.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-purple-600 hover:bg-gray-100"
                onClick={() => window.open('https://registration.wfglaunch.com/?recruitercode=C8V5D', '_blank')}
              >
                <ArrowRight className="h-5 w-5 mr-2" />
                Start Your Journey Today
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-purple-600"
                onClick={() => window.location.href = 'tel:407-777-1087'}
              >
                Schedule a Call with Nolly
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}