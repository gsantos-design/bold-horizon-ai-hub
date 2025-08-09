import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, DollarSign, Users, Target, Shield, PiggyBank, Brain, Heart, Star } from "lucide-react";

export default function ThreePhilosophies() {
  const [activePhilosophy, setActivePhilosophy] = useState(1);

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2">
            🎯 Empowering Families
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            The <span className="text-blue-600">Three Philosophies</span><br/>
            That Transform Lives
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover the proven framework that has helped thousands of families achieve financial freedom 
            and build generational wealth through systematic approaches.
          </p>
        </div>

        {/* Philosophy Selector */}
        <div className="flex flex-col md:flex-row justify-center gap-4 mb-12">
          <Button
            variant={activePhilosophy === 1 ? "default" : "outline"}
            size="lg"
            onClick={() => setActivePhilosophy(1)}
            className="flex items-center gap-2"
          >
            <Users className="h-5 w-5" />
            Multi-Handed Income
          </Button>
          <Button
            variant={activePhilosophy === 2 ? "default" : "outline"}
            size="lg"
            onClick={() => setActivePhilosophy(2)}
            className="flex items-center gap-2"
          >
            <Target className="h-5 w-5" />
            10% | 3 Rules | 3 Goals
          </Button>
          <Button
            variant={activePhilosophy === 3 ? "default" : "outline"}
            size="lg"
            onClick={() => setActivePhilosophy(3)}
            className="flex items-center gap-2"
          >
            <Brain className="h-5 w-5" />
            Self-Improvement
          </Button>
        </div>

        {/* Philosophy 1: Multi-Handed Income */}
        {activePhilosophy === 1 && (
          <div className="max-w-6xl mx-auto">
            <Card className="mb-8 border-2 border-blue-200 shadow-xl">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                <CardTitle className="text-2xl md:text-3xl text-center">
                  <Users className="h-8 w-8 inline-block mr-3" />
                  Philosophy #1: Multi-Handed Income
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                {/* Problem Statement */}
                <div className="text-center mb-12">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">The Real Problem: Debt or Income Multiplication?</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <Card className="border-2 border-gray-200">
                      <CardContent className="p-6 text-center">
                        <h4 className="font-bold text-lg mb-2">Family A</h4>
                        <p className="text-2xl font-bold text-blue-600">$50K/yr</p>
                        <div className="mt-4 text-sm text-gray-600">
                          <p className="font-semibold">$1 Million Mortgage Debt</p>
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="border-2 border-gray-200">
                      <CardContent className="p-6 text-center">
                        <h4 className="font-bold text-lg mb-2">Family B</h4>
                        <p className="text-2xl font-bold text-blue-600">$100K/yr</p>
                        <div className="mt-4 text-sm text-gray-600">
                          <p className="font-semibold">$1 Million Mortgage Debt</p>
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="border-2 border-gray-200">
                      <CardContent className="p-6 text-center">
                        <h4 className="font-bold text-lg mb-2">Family C</h4>
                        <p className="text-2xl font-bold text-blue-600">$500K/yr</p>
                        <div className="mt-4 text-sm text-gray-600">
                          <p className="font-semibold">$1 Million Mortgage Debt</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-6">
                    <h4 className="text-xl font-bold text-yellow-800 mb-2">Question: Who Will Pay It Off Faster?</h4>
                    <p className="text-yellow-700">The answer reveals the fundamental difference between single-handed and multi-handed income approaches.</p>
                  </div>
                </div>

                {/* Two Pathways */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                  <Card className="border-2 border-red-200 bg-red-50">
                    <CardContent className="p-6 text-center">
                      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <TrendingUp className="h-8 w-8 text-red-600" />
                      </div>
                      <h4 className="text-xl font-bold text-red-800 mb-4">Single-Handed Income</h4>
                      <p className="text-red-700 font-semibold mb-4">Income Will NEVER Multiply With:</p>
                      <div className="space-y-2">
                        <div className="bg-white rounded-lg p-3 border border-red-200">
                          <p className="font-semibold">Skill & Hours</p>
                        </div>
                      </div>
                      <p className="text-sm text-red-600 mt-4">Limited by time and personal capacity</p>
                    </CardContent>
                  </Card>

                  <Card className="border-2 border-green-200 bg-green-50">
                    <CardContent className="p-6 text-center">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Users className="h-8 w-8 text-green-600" />
                      </div>
                      <h4 className="text-xl font-bold text-green-800 mb-4">Multi-Handed Income</h4>
                      <p className="text-green-700 font-semibold mb-4">Income WILL Multiply With:</p>
                      <div className="space-y-2">
                        <div className="bg-white rounded-lg p-3 border border-green-200">
                          <p className="font-semibold">System</p>
                        </div>
                      </div>
                      <p className="text-sm text-green-600 mt-4">Scalable through team building and systems</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Dreams Section */}
                <div className="text-center bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-8">
                  <h4 className="text-2xl font-bold text-gray-900 mb-6">Do You Desire?</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="flex flex-col items-center">
                      <TrendingUp className="h-8 w-8 text-purple-600 mb-2" />
                      <p className="font-semibold">5X-10X Your Income</p>
                    </div>
                    <div className="flex flex-col items-center">
                      <Star className="h-8 w-8 text-purple-600 mb-2" />
                      <p className="font-semibold">Freedom of Time</p>
                    </div>
                    <div className="flex flex-col items-center">
                      <Heart className="h-8 w-8 text-purple-600 mb-2" />
                      <p className="font-semibold">Lifestyle</p>
                    </div>
                    <div className="flex flex-col items-center">
                      <Users className="h-8 w-8 text-purple-600 mb-2" />
                      <p className="font-semibold">Generational Wealth</p>
                    </div>
                  </div>
                  <div className="mt-6 bg-white rounded-lg p-4 border-2 border-purple-200">
                    <p className="text-lg font-bold text-purple-800">Which pathway goes to your dreams?</p>
                    <p className="text-purple-600 mt-2">It's not about changing the vehicle (work), it's about changing the path</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Philosophy 2: 10% | 3 Rules | 3 Goals */}
        {activePhilosophy === 2 && (
          <div className="max-w-6xl mx-auto">
            <Card className="mb-8 border-2 border-green-200 shadow-xl">
              <CardHeader className="bg-gradient-to-r from-green-600 to-green-700 text-white">
                <CardTitle className="text-2xl md:text-3xl text-center">
                  <Target className="h-8 w-8 inline-block mr-3" />
                  Philosophy #2: 10% | 3 Rules | 3 Goals
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                {/* The Biggest Regret */}
                <div className="text-center mb-12">
                  <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6 mb-8">
                    <h3 className="text-2xl font-bold text-red-800 mb-4">The Biggest Regret of Americans/Canadians?</h3>
                    <p className="text-xl font-bold text-red-600">NOT SAVING ENOUGH</p>
                  </div>
                  <p className="text-lg text-gray-700 mb-8">
                    To put families on the path of wealth creation, we empower them with:
                  </p>
                </div>

                {/* The Framework */}
                <div className="space-y-8">
                  {/* Save 10% */}
                  <Card className="border-2 border-blue-200">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                          <PiggyBank className="h-6 w-6 text-blue-600" />
                        </div>
                        <h4 className="text-xl font-bold text-blue-800">SAVE 10% FROM NET-PAYCHECK</h4>
                      </div>
                      <p className="text-gray-700">Establish a foundation of consistent savings to build wealth systematically.</p>
                    </CardContent>
                  </Card>

                  {/* 3 Rules */}
                  <Card className="border-2 border-purple-200">
                    <CardContent className="p-6">
                      <h4 className="text-xl font-bold text-purple-800 mb-4">APPLY 3 RULES IN YOUR FAVOR</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="text-center p-4 bg-purple-50 rounded-lg">
                          <TrendingUp className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                          <h5 className="font-bold text-purple-800">COMPOUND</h5>
                          <p className="text-sm text-purple-600 mt-1">Accumulation Phase</p>
                        </div>
                        <div className="text-center p-4 bg-purple-50 rounded-lg">
                          <Shield className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                          <h5 className="font-bold text-purple-800">RISK</h5>
                          <p className="text-sm text-purple-600 mt-1">Protection Phase</p>
                        </div>
                        <div className="text-center p-4 bg-purple-50 rounded-lg">
                          <DollarSign className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                          <h5 className="font-bold text-purple-800">TAX</h5>
                          <p className="text-sm text-purple-600 mt-1">Distribution Phase</p>
                        </div>
                      </div>
                      <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <p className="text-sm text-yellow-800 font-semibold">
                          Most people utilize various financial products, but they don't know if these 3 rules are in their favor.
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* 3 Goals */}
                  <Card className="border-2 border-green-200">
                    <CardContent className="p-6">
                      <h4 className="text-xl font-bold text-green-800 mb-4">PLAN 3 GOALS FOR A SECURE FUTURE</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="text-center p-4 bg-green-50 rounded-lg">
                          <Shield className="h-8 w-8 text-green-600 mx-auto mb-2" />
                          <h5 className="font-bold text-green-800">INCOME PROTECTION</h5>
                          <p className="text-sm text-green-600 mt-1">Safeguard your earning ability</p>
                        </div>
                        <div className="text-center p-4 bg-green-50 rounded-lg">
                          <DollarSign className="h-8 w-8 text-green-600 mx-auto mb-2" />
                          <h5 className="font-bold text-green-800">INCOME REPLACEMENT</h5>
                          <p className="text-sm text-green-600 mt-1">Ensure retirement security</p>
                        </div>
                        <div className="text-center p-4 bg-green-50 rounded-lg">
                          <Users className="h-8 w-8 text-green-600 mx-auto mb-2" />
                          <h5 className="font-bold text-green-800">GENERATIONAL WEALTH</h5>
                          <p className="text-sm text-green-600 mt-1">Create lasting family legacy</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Philosophy 3: Self-Improvement */}
        {activePhilosophy === 3 && (
          <div className="max-w-6xl mx-auto">
            <Card className="mb-8 border-2 border-purple-200 shadow-xl">
              <CardHeader className="bg-gradient-to-r from-purple-600 to-purple-700 text-white">
                <CardTitle className="text-2xl md:text-3xl text-center">
                  <Brain className="h-8 w-8 inline-block mr-3" />
                  Philosophy #3: Self-Improvement
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                {/* The Problem */}
                <div className="text-center mb-12">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    The Biggest Suffering of Our Society Today is NOT Lack of Opportunities, But:
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <Card className="border-2 border-red-200 bg-red-50">
                      <CardContent className="p-6 text-center">
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <span className="text-2xl font-bold text-red-600">1</span>
                        </div>
                        <h4 className="font-bold text-lg text-red-800 mb-2">SELF-DOUBT</h4>
                        <p className="text-red-600">Questioning one's own abilities and potential</p>
                      </CardContent>
                    </Card>
                    <Card className="border-2 border-red-200 bg-red-50">
                      <CardContent className="p-6 text-center">
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <span className="text-2xl font-bold text-red-600">2</span>
                        </div>
                        <h4 className="font-bold text-lg text-red-800 mb-2">LOW CONFIDENCE</h4>
                        <p className="text-red-600">Lack of belief in personal capabilities</p>
                      </CardContent>
                    </Card>
                    <Card className="border-2 border-red-200 bg-red-50">
                      <CardContent className="p-6 text-center">
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <span className="text-2xl font-bold text-red-600">3</span>
                        </div>
                        <h4 className="font-bold text-lg text-red-800 mb-2">FEAR OF WHAT OTHERS THINK</h4>
                        <p className="text-red-600">Paralyzed by social judgment and criticism</p>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="bg-gray-100 border-2 border-gray-300 rounded-lg p-6 mb-8">
                    <p className="text-lg font-bold text-gray-800">
                      Because our environment does not support self-improvement
                    </p>
                  </div>
                  <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
                    <p className="text-xl font-bold text-blue-800 mb-2">
                      SELF-IMPROVEMENT IS THE ONLY WAY TO LIVE A BLISSFUL LIFE AND MAKE OUR WORLD BETTER
                    </p>
                  </div>
                </div>

                {/* What Holds People Back */}
                <div className="mb-12">
                  <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
                    What Holds People Back From Life-Changing Chances?
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <Card className="border-2 border-orange-200 bg-orange-50">
                      <CardContent className="p-6 text-center">
                        <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <span className="text-2xl font-bold text-orange-600">1</span>
                        </div>
                        <h4 className="font-bold text-lg text-orange-800 mb-2">BAD EXPERIENCES FROM PAST</h4>
                        <p className="text-orange-600">Previous failures create future hesitation</p>
                      </CardContent>
                    </Card>
                    <Card className="border-2 border-orange-200 bg-orange-50">
                      <CardContent className="p-6 text-center">
                        <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <span className="text-2xl font-bold text-orange-600">2</span>
                        </div>
                        <h4 className="font-bold text-lg text-orange-800 mb-2">SELF-CREATED ILLUSIONS</h4>
                        <p className="text-orange-600">Mental barriers we build ourselves</p>
                      </CardContent>
                    </Card>
                    <Card className="border-2 border-orange-200 bg-orange-50">
                      <CardContent className="p-6 text-center">
                        <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <span className="text-2xl font-bold text-orange-600">3</span>
                        </div>
                        <h4 className="font-bold text-lg text-orange-800 mb-2">PRE-OCCUPIED PERSPECTIVE</h4>
                        <p className="text-orange-600">Fixed mindset limiting new possibilities</p>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="text-center space-y-4">
                    <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6">
                      <p className="text-lg font-bold text-green-800 mb-2">
                        But some people always stay open to learn new perspectives towards a bright future
                      </p>
                    </div>
                    <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
                      <p className="text-xl font-bold text-blue-800">
                        IT'S NOT THE OPPORTUNITY, IT'S THE PERSPECTIVE TOWARDS OPPORTUNITY
                      </p>
                    </div>
                  </div>
                </div>

                {/* Call to Action */}
                <div className="text-center bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    Those Who Stay Open Towards Learning Always Find Ways to Transform Their Life
                  </h3>
                  <p className="text-lg text-gray-700 mb-6">
                    If you are one of those who are hungry for success and open-minded
                  </p>
                  <div className="bg-white rounded-lg p-6 border-2 border-purple-200 mb-6">
                    <p className="text-lg font-bold text-purple-800 mb-4">
                      SET ONE-ON-ONE TIME TO LEARN HOW YOUR FAMILY CAN BE EMPOWERED WITH THE 3 PHILOSOPHIES
                    </p>
                    <div className="space-y-2 text-left max-w-md mx-auto">
                      <div className="flex items-center">
                        <Users className="h-5 w-5 text-purple-600 mr-3" />
                        <span className="font-semibold">Multi-Handed Income</span>
                      </div>
                      <div className="flex items-center">
                        <Target className="h-5 w-5 text-purple-600 mr-3" />
                        <span className="font-semibold">10% | 3 Rules | 3 Goals</span>
                      </div>
                      <div className="flex items-center">
                        <Brain className="h-5 w-5 text-purple-600 mr-3" />
                        <span className="font-semibold">Self-Improvement</span>
                      </div>
                    </div>
                  </div>
                  <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3">
                    Schedule One-On-One Time to Learn the New Art of Living
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Ready to Transform Your Family's Future?</h3>
            <p className="text-lg mb-6 opacity-90">
              Join thousands of families who have already discovered the power of the Three Philosophies
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="px-8">
                Schedule Your Free Consultation
              </Button>
              <Button size="lg" variant="outline" className="px-8 bg-white text-blue-600 border-white hover:bg-gray-100">
                Contact Pablo & Nolly Santiago
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}