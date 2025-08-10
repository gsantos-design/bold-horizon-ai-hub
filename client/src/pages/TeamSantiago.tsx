import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Star, 
  Trophy, 
  Target, 
  Users, 
  Heart, 
  Shield, 
  TrendingUp,
  Calendar,
  MapPin,
  Award,
  Briefcase,
  GraduationCap,
  Building,
  DollarSign
} from 'lucide-react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function TeamSantiago() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div {...fadeInUp}>
              <Badge className="mb-4 bg-white/20 text-white px-6 py-2">
                👨‍👩‍👧‍👦 Meet Team Santiago
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                The Santiago Family<br/>
                <span className="text-yellow-300">Financial Legacy</span>
              </h1>
              <p className="text-xl mb-8 opacity-90 leading-relaxed">
                Three generations united in transforming lives through financial education, 
                entrepreneurship, and building generational wealth across Florida and New York.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Family Story */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div className="text-center mb-16" {...fadeInUp}>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Family Mission
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                From sacrifice to success, from hardship to hope — the Santiago story is one of transformation, 
                dedication, and an unwavering commitment to helping others achieve financial freedom.
              </p>
            </motion.div>

            {/* Team Members */}
            <motion.div 
              className="grid grid-cols-1 lg:grid-cols-2 gap-8"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              {/* Nolly Santiago */}
              <motion.div variants={fadeInUp}>
                <Card className="h-full border-2 border-purple-200 shadow-xl">
                  <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                    <div className="text-center">
                      <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-white shadow-lg">
                        <img 
                          src="@assets/image_1754703666032.png" 
                          alt="Nolly Santiago" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardTitle className="text-2xl">Nolly Santiago</CardTitle>
                      <p className="text-purple-100">Co-Founder & Senior Associate</p>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <p className="text-gray-700 leading-relaxed">
                        The heart and soul of Team Santiago. With over a decade of experience transforming lives 
                        through financial education, Nolly combines compassion with expertise to guide families 
                        toward financial freedom.
                      </p>
                      
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-purple-600">
                          <Award className="h-4 w-4" />
                          <span className="text-sm font-medium">Senior Associate WFG</span>
                        </div>
                        <div className="flex items-center gap-2 text-purple-600">
                          <Users className="h-4 w-4" />
                          <span className="text-sm font-medium">Team Building Expert</span>
                        </div>
                        <div className="flex items-center gap-2 text-purple-600">
                          <Heart className="h-4 w-4" />
                          <span className="text-sm font-medium">Family Financial Advocate</span>
                        </div>
                      </div>

                      <div className="border-t pt-4">
                        <h4 className="font-semibold text-gray-900 mb-2">Specializations:</h4>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="outline" className="text-xs">IUL Products</Badge>
                          <Badge variant="outline" className="text-xs">Retirement Planning</Badge>
                          <Badge variant="outline" className="text-xs">Team Leadership</Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Pablo Santiago */}
              <motion.div variants={fadeInUp}>
                <Card className="h-full border-2 border-blue-200 shadow-xl">
                  <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                    <div className="text-center">
                      <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-white shadow-lg">
                        <img 
                          src="@assets/image_1754703082911.png" 
                          alt="Pablo Santiago" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardTitle className="text-2xl">Pablo Santiago</CardTitle>
                      <p className="text-blue-100">Co-Founder & Strategic Leader</p>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <p className="text-gray-700 leading-relaxed">
                        The strategic mind behind Team Santiago's growth. Pablo's analytical approach and 
                        entrepreneurial spirit drive innovative solutions for wealth building and business development.
                      </p>
                      
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-blue-600">
                          <Briefcase className="h-4 w-4" />
                          <span className="text-sm font-medium">Business Strategist</span>
                        </div>
                        <div className="flex items-center gap-2 text-blue-600">
                          <TrendingUp className="h-4 w-4" />
                          <span className="text-sm font-medium">Investment Advisor</span>
                        </div>
                        <div className="flex items-center gap-2 text-blue-600">
                          <Target className="h-4 w-4" />
                          <span className="text-sm font-medium">Goal Achievement Coach</span>
                        </div>
                      </div>

                      <div className="border-t pt-4">
                        <h4 className="font-semibold text-gray-900 mb-2">Specializations:</h4>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="outline" className="text-xs">Business Building</Badge>
                          <Badge variant="outline" className="text-xs">Investment Strategy</Badge>
                          <Badge variant="outline" className="text-xs">Entrepreneurship</Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Joseph Santiago */}
              <motion.div variants={fadeInUp}>
                <Card className="h-full border-2 border-green-200 shadow-xl">
                  <CardHeader className="bg-gradient-to-r from-green-600 to-emerald-600 text-white">
                    <div className="text-center">
                      <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-white shadow-lg">
                        <img 
                          src="@assets/IMG_9689_1754855787976.jpeg" 
                          alt="Joseph Santiago" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardTitle className="text-2xl">Joseph Santiago</CardTitle>
                      <p className="text-green-100">Associate & Entrepreneurial Leader</p>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <p className="text-gray-700 leading-relaxed">
                        Twin brother and entrepreneurial force. With his investment license earned straight 
                        out of high school and a Finance degree, Joseph brings passion for helping entrepreneurs 
                        build wealth and create lasting legacies.
                      </p>
                      
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-green-600">
                          <GraduationCap className="h-4 w-4" />
                          <span className="text-sm font-medium">Finance Degree</span>
                        </div>
                        <div className="flex items-center gap-2 text-green-600">
                          <Building className="h-4 w-4" />
                          <span className="text-sm font-medium">Investment Licensed</span>
                        </div>
                        <div className="flex items-center gap-2 text-green-600">
                          <DollarSign className="h-4 w-4" />
                          <span className="text-sm font-medium">Entrepreneurial Focus</span>
                        </div>
                      </div>

                      <div className="border-t pt-4">
                        <h4 className="font-semibold text-gray-900 mb-2">Specializations:</h4>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="outline" className="text-xs">Compound Interest</Badge>
                          <Badge variant="outline" className="text-xs">Entrepreneurs</Badge>
                          <Badge variant="outline" className="text-xs">Legacy Building</Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Christian Santiago */}
              <motion.div variants={fadeInUp}>
                <Card className="h-full border-2 border-orange-200 shadow-xl">
                  <CardHeader className="bg-gradient-to-r from-orange-600 to-red-600 text-white">
                    <div className="text-center">
                      <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-white shadow-lg">
                        <img 
                          src="/christian-santiago.png" 
                          alt="Christian Santiago" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardTitle className="text-2xl">Christian Santiago</CardTitle>
                      <p className="text-orange-100">Associate & Youth Financial Educator</p>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <p className="text-gray-700 leading-relaxed">
                        Twin brother and mathematical mind. A recent graduate with a passion for numbers 
                        and compound interest, Christian is dedicated to educating young people about 
                        financial empowerment and the new art of living.
                      </p>
                      
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-orange-600">
                          <GraduationCap className="h-4 w-4" />
                          <span className="text-sm font-medium">Recent Graduate</span>
                        </div>
                        <div className="flex items-center gap-2 text-orange-600">
                          <Target className="h-4 w-4" />
                          <span className="text-sm font-medium">Mathematics Expert</span>
                        </div>
                        <div className="flex items-center gap-2 text-orange-600">
                          <Users className="h-4 w-4" />
                          <span className="text-sm font-medium">Youth Educator</span>
                        </div>
                      </div>

                      <div className="border-t pt-4">
                        <h4 className="font-semibold text-gray-900 mb-2">Specializations:</h4>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="outline" className="text-xs">Compound Interest</Badge>
                          <Badge variant="outline" className="text-xs">Young Adults</Badge>
                          <Badge variant="outline" className="text-xs">Financial Education</Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Family Values */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div className="text-center mb-12" {...fadeInUp}>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Core Values
              </h2>
              <p className="text-xl text-gray-600">
                The principles that guide every decision and drive our mission forward
              </p>
            </motion.div>

            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              <motion.div variants={fadeInUp}>
                <div className="text-center p-6">
                  <div className="w-16 h-16 mx-auto mb-4 bg-purple-100 rounded-full flex items-center justify-center">
                    <Heart className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Family First</h3>
                  <p className="text-gray-600">
                    We believe in the power of family — both our own and the families we serve. 
                    Every decision is made with family legacy in mind.
                  </p>
                </div>
              </motion.div>

              <motion.div variants={fadeInUp}>
                <div className="text-center p-6">
                  <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                    <Shield className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Financial Protection</h3>
                  <p className="text-gray-600">
                    We've seen the consequences of being financially unprotected. Our mission is to 
                    ensure no family faces that uncertainty.
                  </p>
                </div>
              </motion.div>

              <motion.div variants={fadeInUp}>
                <div className="text-center p-6">
                  <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                    <Trophy className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Generational Wealth</h3>
                  <p className="text-gray-600">
                    We don't just build wealth for today — we create legacies that last for generations, 
                    using the power of compound interest and smart investing.
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div {...fadeInUp}>
              <Card className="border-none shadow-2xl">
                <CardHeader className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-center">
                  <CardTitle className="text-3xl">The Santiago Story</CardTitle>
                  <p className="text-indigo-100">From Sacrifice to Success</p>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="space-y-6 text-gray-700 leading-relaxed">
                    <p className="text-lg">
                      <strong>Our journey began with sacrifice.</strong> Like many families, we watched our parents 
                      work tirelessly, giving up holidays and summers to provide for us. Their dedication taught us 
                      the value of hard work, but it also revealed a painful truth: without financial education, 
                      even the most dedicated people can be left vulnerable.
                    </p>
                    
                    <p>
                      <strong>World Financial Group changed everything.</strong> We discovered the power of multiple 
                      income streams, the magic of compound interest, and most importantly, how to protect our family's 
                      financial future. As Albert Einstein said, <em>"Those who understand compound interest earn it… 
                      those who don't, pay it."</em>
                    </p>
                    
                    <p>
                      <strong>Today, we're three generations strong.</strong> From Nolly and Pablo's leadership to 
                      Joseph's fresh perspective as a licensed professional, we're united in one mission: helping 
                      families break free from financial uncertainty and build lasting wealth.
                    </p>
                    
                    <p>
                      <strong>This is more than business — it's our calling.</strong> We've experienced the 
                      transformation that comes with financial education and protection. Now, we're dedicated to 
                      sharing that opportunity with every family we meet.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div {...fadeInUp}>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Build Your Financial Legacy?
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Join the Santiago family mission. Whether you're looking to protect your family's future, 
                build additional income streams, or start your entrepreneurial journey — we've got you covered.
              </p>
              <div className="flex flex-col md:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-3">
                  <Calendar className="h-5 w-5 mr-2" />
                  Schedule Your Consultation
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600 px-8 py-3">
                  <Users className="h-5 w-5 mr-2" />
                  Explore Career Opportunities
                </Button>
              </div>
              
              <div className="mt-8 flex items-center justify-center gap-6 text-sm opacity-75">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>Florida & New York</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  <span>Licensed Professionals</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="h-4 w-4" />
                  <span>WFG Certified</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}