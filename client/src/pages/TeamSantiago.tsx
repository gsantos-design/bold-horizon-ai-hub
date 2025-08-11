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

// Import images directly
import pabloImage from '@assets/Image-1_1754701413805.jpeg';
import nollyImage from '@assets/IMG_0321_1754703873582.jpeg';
import josephImage from '@assets/IMG_9689_1754855787976.jpeg';
import christianImage from '@assets/IMG_0397_1754857771422.png';
import newTeamPhoto from '@assets/8357223228604543892_1754857339707.jpeg';

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
                          src={nollyImage} 
                          alt="Nolly Santiago" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardTitle className="text-2xl">Nolly Santiago</CardTitle>
                      <p className="text-purple-100">Marketing Director – World Financial Group</p>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <p className="text-gray-700 leading-relaxed">
                        <strong>Two decades in telecommunications.</strong> After losing both parents too early and realizing 
                        they never had financial education, Nolly discovered WFG. Her mission: ensure every family has 
                        the knowledge and tools to secure their future before it's too late.
                      </p>
                      
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-purple-600">
                          <Briefcase className="h-4 w-4" />
                          <span className="text-sm font-medium">Telecommunications Veteran</span>
                        </div>
                        <div className="flex items-center gap-2 text-purple-600">
                          <Heart className="h-4 w-4" />
                          <span className="text-sm font-medium">Family Legacy Advocate</span>
                        </div>
                        <div className="flex items-center gap-2 text-purple-600">
                          <Users className="h-4 w-4" />
                          <span className="text-sm font-medium">Financial Education</span>
                        </div>
                      </div>

                      <div className="border-t pt-4">
                        <h4 className="font-semibold text-gray-900 mb-2">Specializations:</h4>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="outline" className="text-xs">Family Protection</Badge>
                          <Badge variant="outline" className="text-xs">Multiple Income Streams</Badge>
                          <Badge variant="outline" className="text-xs">Financial Education</Badge>
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
                          src={pabloImage} 
                          alt="Pablo Santiago" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardTitle className="text-2xl">Pablo Santiago</CardTitle>
                      <p className="text-blue-100">Former NYPD & Orange County Law Enforcement</p>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <p className="text-gray-700 leading-relaxed">
                        <strong>30+ years in law enforcement.</strong> After surviving a major heart attack, Pablo realized 
                        the financial vulnerabilities first responders face. His mission: protect the protectors through 
                        financial education and tax-free wealth building strategies.
                      </p>
                      
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-blue-600">
                          <Shield className="h-4 w-4" />
                          <span className="text-sm font-medium">NYPD Veteran</span>
                        </div>
                        <div className="flex items-center gap-2 text-blue-600">
                          <Users className="h-4 w-4" />
                          <span className="text-sm font-medium">First Responder Advocate</span>
                        </div>
                        <div className="flex items-center gap-2 text-blue-600">
                          <Target className="h-4 w-4" />
                          <span className="text-sm font-medium">Tax-Free Wealth Strategies</span>
                        </div>
                      </div>

                      <div className="border-t pt-4">
                        <h4 className="font-semibold text-gray-900 mb-2">Specializations:</h4>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="outline" className="text-xs">Law Enforcement</Badge>
                          <Badge variant="outline" className="text-xs">First Responders</Badge>
                          <Badge variant="outline" className="text-xs">Financial Protection</Badge>
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
                          src={josephImage} 
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
                      <strong>Our journey began with service and sacrifice.</strong> Pablo served over 30 years with the NYPD 
                      and Orange County law enforcement, protecting strangers and running toward danger. But after surviving 
                      a major heart attack, he realized a painful truth: even the most dedicated servants can be left financially 
                      vulnerable when they can no longer work.
                    </p>
                    
                    <p>
                      <strong>World Financial Group changed everything.</strong> We discovered the power of multiple 
                      income streams, the magic of compound interest, and most importantly, how to protect our family's 
                      financial future. As Albert Einstein said, <em>"Those who understand compound interest earn it… 
                      those who don't, pay it."</em>
                    </p>
                    
                    <p>
                      <strong>Today, we're four family members strong.</strong> From Pablo's mission to protect the protectors 
                      and Nolly's heart for family empowerment, to Joseph's entrepreneurial focus and Christian's passion for 
                      educating young people — we're united in helping families break free from financial uncertainty.
                    </p>
                    
                    <p>
                      <strong>This is more than business — it's our calling.</strong> We've spent our careers serving others. 
                      Pablo protected the public; now we protect families' financial futures. Every strategy we share, every 
                      solution we provide, comes from our own transformation through financial education.
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

      {/* Santiago Team Family Photo Section */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Together We Transform Lives
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              The Santiago Team: Four generations united by service, driven by mission, 
              and committed to building generational wealth for families everywhere.
            </p>
            <div className="relative">
              <img 
                src={newTeamPhoto} 
                alt="Santiago Team Family Photo" 
                className="w-full rounded-3xl shadow-2xl border-8 border-white"
              />
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <p className="text-lg font-semibold">
                  "From protecting communities to protecting families' financial futures"
                </p>
              </div>
            </div>
            
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center p-6 bg-white rounded-xl shadow-lg">
                <div className="text-2xl font-bold text-blue-600 mb-2">Pablo</div>
                <div className="text-sm text-gray-600">Law Enforcement Legacy</div>
              </div>
              <div className="text-center p-6 bg-white rounded-xl shadow-lg">
                <div className="text-2xl font-bold text-purple-600 mb-2">Nolly</div>
                <div className="text-sm text-gray-600">Family Protection Mission</div>
              </div>
              <div className="text-center p-6 bg-white rounded-xl shadow-lg">
                <div className="text-2xl font-bold text-green-600 mb-2">Joseph</div>
                <div className="text-sm text-gray-600">Entrepreneurial Leadership</div>
              </div>
              <div className="text-center p-6 bg-white rounded-xl shadow-lg">
                <div className="text-2xl font-bold text-orange-600 mb-2">Christian</div>
                <div className="text-sm text-gray-600">Youth Financial Education</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}