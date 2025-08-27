import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, GraduationCap, Target, ArrowRight, PlayCircle, Star, Award, Users2, Trophy, Zap } from "lucide-react";

// Import correct Santiago family photos
import nollyImage from '@assets/IMG_0410_1754923958309.jpeg';  // Nolly Santiago (correct photo)
import pabloImage from '@assets/IMG_0409_1754923884869.jpeg';  // Pablo Santiago (correct photo)
import josephImage from '@assets/IMG_9689_1754855787976.jpeg'; // Joseph Santiago
import christianImage from '@assets/IMG_0411_1754924018747.jpeg'; // Christian Santiago
// Removed individual team photo - using family showcase instead
import MultiHandedIncome from "@/components/MultiHandedIncome";
import FinancialEducationModule from "@/components/FinancialEducationModule";
import SelfImprovementModule from "@/components/SelfImprovementModule";
import { useLanguage } from "@/lib/LanguageContext";
import GamificationDashboard from "@/components/GamificationDashboard";
import ThreePhilosophies from "@/components/ThreePhilosophies";

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
      icon: <Target className="h-8 w-8" />,
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
    <div className="min-h-screen bg-primary">
      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl text-center">
          <div className="mb-8">
            <Badge className="mb-4 bg-primary text-white px-6 py-2">
              Led by Pablo & Nolly Santiago
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-accent mb-6">
              Empower360
            </h1>
            <p className="text-xl md:text-2xl text-white mb-8 max-w-4xl mx-auto">
              Experience the <strong>New Art of Living</strong> through Pablo and Nolly Santiago's proven three-pillar system: 
              Multi-Handed Income, Financial Education, and Self-Improvement
            </p>
            
            {/* Leadership Introduction */}
            <div className="bg-white/95 backdrop-blur-sm rounded-xl p-8 max-w-6xl mx-auto mb-8 border border-primary/20">
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold text-gray-900 mb-4">Meet Your Leaders</h3>
                <p className="text-gray-600 text-lg">The driving force behind The Santiago Team's proven system</p>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                {/* Nolly Santiago */}
                <div className="text-center">
                  <div className="relative mb-6">
                    <img 
                      src={nollyImage} 
                      alt="Nolly Santiago" 
                      className="w-64 h-64 mx-auto rounded-full object-cover shadow-lg border-4 border-primary bg-blue-100"
                    />
                  </div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-2">Nolly Santiago</h4>
                  <p className="text-primary font-semibold mb-4">Marketing Director – World Financial Group</p>
                  <p className="text-gray-700 leading-relaxed">
                    With 20+ years in telecommunications, Nolly discovered WFG after losing both parents too early 
                    and realizing they never had financial education. Her mission: ensure every family has the knowledge 
                    and tools to secure their future before it's too late.
                  </p>
                </div>
                
                {/* Pablo Santiago */}
                <div className="text-center">
                  <div className="relative mb-6">
                    <img 
                      src={pabloImage} 
                      alt="Pablo Santiago" 
                      className="w-64 h-64 mx-auto rounded-full object-cover shadow-lg border-4 border-primary bg-blue-100"
                    />
                  </div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-2">Pablo Santiago</h4>
                  <p className="text-primary font-semibold mb-4">Senior Associate – World Financial Group</p>
                  <p className="text-gray-700 leading-relaxed">
                    30+ years of law enforcement experience drives Pablo's commitment to protecting first responders 
                    and their families through financial education. His dedication to "protecting the protectors" 
                    has transformed thousands of lives across Florida and New York markets.
                  </p>
                </div>
              </div>
              
              {/* Combined Achievement */}
              <div className="mt-8 text-center p-6 bg-primary/5 rounded-lg">
                <p className="text-gray-700 leading-relaxed text-lg">
                  Together, <strong>Pablo and Nolly Santiago</strong> have built a legacy of empowering families to achieve financial 
                  freedom through systematic approaches to wealth building, education, and personal growth. Their proven 
                  three-pillar system has helped clients go from traditional single-income approaches to generating 
                  multiple streams of income that often exceed their original earnings by 5x-10x.
                </p>
              </div>
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
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white">
                <PlayCircle className="h-5 w-5 mr-2" />
                Begin Your Journey
              </Button>
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-white"
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

      {/* Team Showcase Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-primary text-white px-6 py-2">
              🏆 Award-Winning Team
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              The Santiago Team Excellence
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Meet the dedicated professionals who make financial transformation possible for families 
              across the Florida and New York markets.
            </p>
          </div>

          {/* Santiago Family Team Showcase */}
          <div className="mb-16">
            <Card className="overflow-hidden max-w-5xl mx-auto bg-white border-2 border-primary/20">
              <CardHeader className="bg-primary text-white text-center">
                <CardTitle className="text-2xl">The Santiago Family Team</CardTitle>
                <p className="text-blue-100 mt-2">Three generations of excellence serving Florida and New York families</p>
              </CardHeader>
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Leadership Team - Pablo & Nolly */}
                  <div className="text-center">
                    <h4 className="font-bold text-gray-900 mb-4 text-lg">Leadership Team</h4>
                    <div className="flex justify-center space-x-6 mb-4">
                      <div className="text-center">
                        <img 
                          src={pabloImage} 
                          alt="Pablo Santiago" 
                          className="w-20 h-20 mx-auto rounded-full object-cover border-4 border-blue-200"
                        />
                        <p className="text-sm font-medium text-gray-900 mt-2">Pablo Santiago</p>
                        <p className="text-xs text-blue-600">Senior Associate</p>
                      </div>
                      <div className="text-center">
                        <img 
                          src={nollyImage} 
                          alt="Nolly Santiago" 
                          className="w-20 h-20 mx-auto rounded-full object-cover border-4 border-purple-200"
                        />
                        <p className="text-sm font-medium text-gray-900 mt-2">Nolly Santiago</p>
                        <p className="text-xs text-purple-600">Marketing Director</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">50+ years combined experience in law enforcement and telecommunications</p>
                  </div>
                  
                  {/* Next Generation - Joseph & Christian */}
                  <div className="text-center">
                    <h4 className="font-bold text-gray-900 mb-4 text-lg">Next Generation</h4>
                    <div className="flex justify-center space-x-6 mb-4">
                      <div className="text-center">
                        <img 
                          src={josephImage} 
                          alt="Joseph Santiago" 
                          className="w-20 h-20 mx-auto rounded-full object-cover border-4 border-green-200"
                        />
                        <p className="text-sm font-medium text-gray-900 mt-2">Joseph Santiago</p>
                        <p className="text-xs text-green-600">Investment Licensed</p>
                      </div>
                      <div className="text-center">
                        <img 
                          src={christianImage} 
                          alt="Christian Santiago" 
                          className="w-20 h-20 mx-auto rounded-full object-cover border-4 border-orange-200"
                        />
                        <p className="text-sm font-medium text-gray-900 mt-2">Christian Santiago</p>
                        <p className="text-xs text-orange-600">Mathematics Expert</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">Bringing innovation and specialized expertise to financial services</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Individual Team Members */}
          <div className="max-w-6xl mx-auto">
            <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">The Santiago Family Team</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              
              {/* Pablo Santiago */}
              <Card className="text-center overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <img 
                    src={pabloImage} 
                    alt="Pablo Santiago" 
                    className="w-32 h-32 mx-auto rounded-full object-cover mb-4 border-4 border-blue-100"
                  />
                  <h4 className="font-bold text-gray-900 mb-1">Pablo Santiago</h4>
                  <p className="text-blue-600 text-sm font-medium mb-2">Senior Associate - WFG</p>
                  <p className="text-gray-600 text-sm">Protecting first responders &amp; families</p>
                </div>
              </Card>

              {/* Nolly Santiago */}
              <Card className="text-center overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <img 
                    src={nollyImage} 
                    alt="Nolly Santiago" 
                    className="w-32 h-32 mx-auto rounded-full object-cover mb-4 border-4 border-purple-100"
                  />
                  <h4 className="font-bold text-gray-900 mb-1">Nolly Santiago</h4>
                  <p className="text-purple-600 text-sm font-medium mb-2">Marketing Director - WFG</p>
                  <p className="text-gray-600 text-sm">Family legacy &amp; financial education</p>
                </div>
              </Card>

              {/* Joseph Santiago */}
              <Card className="text-center overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <img 
                    src={josephImage} 
                    alt="Joseph Santiago" 
                    className="w-32 h-32 mx-auto rounded-full object-cover mb-4 border-4 border-green-100"
                  />
                  <h4 className="font-bold text-gray-900 mb-1">Joseph Santiago</h4>
                  <p className="text-green-600 text-sm font-medium mb-2">Investment Licensed</p>
                  <p className="text-gray-600 text-sm">Entrepreneurial wealth building</p>
                </div>
              </Card>

              {/* Christian Santiago */}
              <Card className="text-center overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <img 
                    src={christianImage} 
                    alt="Christian Santiago" 
                    className="w-32 h-32 mx-auto rounded-full object-cover mb-4 border-4 border-orange-100"
                  />
                  <h4 className="font-bold text-gray-900 mb-1">Christian Santiago</h4>
                  <p className="text-orange-600 text-sm font-medium mb-2">Mathematics Expert</p>
                  <p className="text-gray-600 text-sm">Youth financial education</p>
                </div>
              </Card>


            </div>

            {/* Team Achievement Banner */}
            <div className="mt-12 text-center">
              <Card className="bg-primary text-white">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-4">Why Choose The Santiago Team?</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <div className="text-3xl font-bold mb-2">500+</div>
                      <div className="text-blue-100">Families Served</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold mb-2">$50M+</div>
                      <div className="text-blue-100">Assets Protected</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold mb-2">15+</div>
                      <div className="text-blue-100">Years Experience</div>
                    </div>
                  </div>
                  <p className="mt-6 text-blue-100">
                    Our proven track record speaks for itself. Join hundreds of families who have transformed 
                    their financial future with The Santiago Team's systematic approach to wealth building.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Three Philosophies Section */}
      <ThreePhilosophies />

      {/* Main Content */}
      <section className="pb-16">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="multi-handed-income" className="max-w-7xl mx-auto">
            <div className="flex justify-center mb-8">
              <TabsList className="grid w-full max-w-3xl grid-cols-3 h-auto p-2 bg-white/95 backdrop-blur-sm">
                <TabsTrigger 
                  value="multi-handed-income" 
                  className="flex flex-col items-center gap-2 py-4 px-2 data-[state=active]:bg-primary data-[state=active]:text-white"
                >
                  <TrendingUp className="h-5 w-5" />
                  <span className="text-xs md:text-sm font-medium">Multi-Handed Income</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="financial-education"
                  className="flex flex-col items-center gap-2 py-4 px-2 data-[state=active]:bg-primary data-[state=active]:text-white"
                >
                  <GraduationCap className="h-5 w-5" />
                  <span className="text-xs md:text-sm font-medium">Financial Education</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="self-improvement"
                  className="flex flex-col items-center gap-2 py-4 px-2 data-[state=active]:bg-primary data-[state=active]:text-white"
                >
                  <Target className="h-5 w-5" />
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
      <section className="py-16 bg-primary">
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
                className="bg-primary hover:bg-primary/90 text-white font-semibold"
                onClick={() => window.open('https://registration.wfglaunch.com/?recruitercode=C8V5D', '_blank')}
              >
                <ArrowRight className="h-5 w-5 mr-2" />
                Start Your Journey Today
              </Button>
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-white font-semibold"
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