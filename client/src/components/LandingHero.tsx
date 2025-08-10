import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Shield, 
  Heart, 
  Users, 
  Star, 
  ArrowRight, 
  Phone,
  Award,
  TrendingUp,
  Building,
  GraduationCap
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';

// Import images directly
import newTeamPhoto from '@assets/8357223228604543892_1754857339707.jpeg';

export default function LandingHero() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Main Hero Content */}
          <motion.div className="text-center mb-16" {...fadeInUp}>
            <Badge className="mb-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 text-lg">
              🏆 Santiago Team - World Financial Group
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Protecting Those Who
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Protect Others
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
              From 30+ years in law enforcement to telecommunications expertise, the Santiago family 
              transforms lives through financial education, building generational wealth, and 
              protecting what matters most.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg"
                onClick={() => window.location.href = 'tel:407-777-1087'}
              >
                <Phone className="h-5 w-5 mr-2" />
                Call Now: (407) 777-1087
              </Button>
              <Link href="/mission-highlights">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg"
                >
                  Discover Our Mission
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Mission Statement Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <Card className="border-2 border-blue-200 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                    <Shield className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Protect the Protectors</h3>
                  <p className="text-gray-600 text-sm">
                    Pablo's 30+ years in law enforcement drives our mission to protect first responders and their families.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <Card className="border-2 border-purple-200 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-purple-100 rounded-full flex items-center justify-center">
                    <Heart className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Family Legacy</h3>
                  <p className="text-gray-600 text-sm">
                    Nolly's mission ensures every family has financial education to secure their future before it's too late.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <Card className="border-2 border-green-200 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                    <TrendingUp className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Entrepreneurial Wealth</h3>
                  <p className="text-gray-600 text-sm">
                    Joseph empowers entrepreneurs to build real wealth through investment strategies and compound interest.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <Card className="border-2 border-orange-200 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-orange-100 rounded-full flex items-center justify-center">
                    <GraduationCap className="h-8 w-8 text-orange-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Youth Education</h3>
                  <p className="text-gray-600 text-sm">
                    Christian empowers young people to take control of their financial future through the new art of living.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* About Us Section */}
          <motion.div 
            className="bg-white rounded-2xl shadow-xl p-8 md:p-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                About the Santiago Team
              </h2>
              <p className="text-xl text-gray-600">
                Four generations united by service, driven by mission
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Story Content */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Our Story</h3>
                  <p className="text-gray-700 leading-relaxed">
                    The Santiago family story begins with service and sacrifice. Pablo's 30+ years protecting communities 
                    as NYPD and Orange County law enforcement, combined with Nolly's two decades serving businesses in 
                    telecommunications, created a foundation of dedication to others.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Our Transformation</h3>
                  <p className="text-gray-700 leading-relaxed">
                    After Pablo survived a major heart attack and realized the financial vulnerabilities that even 
                    dedicated servants face, our family discovered World Financial Group. For the first time, we learned 
                    how money really works and how to protect families from life's uncertainties.
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Our Mission Today</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Now, with Joseph's investment expertise and Christian's passion for educating young people, we're 
                    four family members strong, united in helping families break free from financial uncertainty and 
                    build lasting generational wealth.
                  </p>
                </div>
              </div>

              {/* Impact Stats */}
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Our Impact</h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-white rounded-lg shadow">
                      <div className="text-3xl font-bold text-blue-600 mb-1">5,000+</div>
                      <div className="text-sm text-gray-600">Families Served</div>
                    </div>
                    <div className="text-center p-4 bg-white rounded-lg shadow">
                      <div className="text-3xl font-bold text-purple-600 mb-1">75+</div>
                      <div className="text-sm text-gray-600">Years Experience</div>
                    </div>
                    <div className="text-center p-4 bg-white rounded-lg shadow">
                      <div className="text-3xl font-bold text-green-600 mb-1">3,800+</div>
                      <div className="text-sm text-gray-600">Financial Plans</div>
                    </div>
                    <div className="text-center p-4 bg-white rounded-lg shadow">
                      <div className="text-3xl font-bold text-orange-600 mb-1">100%</div>
                      <div className="text-sm text-gray-600">Family Commitment</div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl p-6 text-center">
                  <h4 className="text-xl font-bold mb-2">Ready to Secure Your Family's Future?</h4>
                  <p className="mb-4 opacity-90">
                    Join thousands of families who've transformed their financial future with the Santiago Team.
                  </p>
                  <Button 
                    size="lg" 
                    className="bg-white text-blue-600 hover:bg-gray-100"
                    onClick={() => window.location.href = 'tel:407-777-1087'}
                  >
                    <Phone className="h-5 w-5 mr-2" />
                    Start Your Journey Today
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Services Preview */}
          <motion.div 
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              How We Serve You
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                  <Shield className="h-10 w-10 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Financial Protection</h3>
                <p className="text-gray-600">
                  Comprehensive strategies to protect your income and build tax-free wealth for your family's future.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 bg-purple-100 rounded-full flex items-center justify-center">
                  <Building className="h-10 w-10 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Business Building</h3>
                <p className="text-gray-600">
                  Entrepreneurial opportunities and multiple income streams to create lasting financial independence.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                  <Users className="h-10 w-10 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Family Legacy</h3>
                <p className="text-gray-600">
                  Generational wealth strategies that ensure your family's security for decades to come.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Santiago Team Family Photo */}
          <motion.div 
            className="mt-20 text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.8 }}
          >
            <div className="max-w-4xl mx-auto">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Meet the Santiago Family
              </h3>
              <p className="text-lg text-gray-600 mb-8">
                Four generations united in transforming lives through financial education
              </p>
              <img 
                src={newTeamPhoto} 
                alt="Santiago Team Family Photo" 
                className="w-full rounded-2xl shadow-2xl border-4 border-white"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}