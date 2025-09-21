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
import { useLanguage } from '@/lib/LanguageContext';
import { DictionaryTerm } from '@/components/TooltipDictionary';

// Import images directly - ALL CORRECT SANTIAGO FAMILY PHOTOS
import pabloImage from '@assets/image_1756353161547.png';  // Pablo Santiago (NEW professional photo)
import nollyImage from '@assets/IMG_1248_1758497068316.png';  // Nolly Santiago (correct photo)  
import josephImage from '@assets/IMG_9689_1754855787976.jpeg'; // Joseph Santiago (young male) - KEEP CORRECT
import christianImage from '@assets/IMG_0411_1754924018747.jpeg'; // Christian Santiago (correct photo)
import princhescaPhoto from '@assets/IMG_8889_1754678450603.png'; // Princhesca Rainier Turner (team member)
import newTeamPhoto from '@assets/IMG_1242 (2)_1758480831086.jpeg';

export default function TeamSantiago() {
  const { t } = useLanguage();
  
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
      <section className="bg-primary text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div {...fadeInUp}>
              <Badge className="mb-4 bg-white/20 text-white px-6 py-2">
                👨‍👩‍👧‍👦 Meet Team Santiago
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                The Santiago Family<br/>
                Financial Legacy
              </h1>
              <p className="text-xl mb-8 opacity-90 leading-relaxed">
                Three generations united in transforming lives through financial education, 
                entrepreneurship, and building generational wealth across the United States.
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
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              {/* Nolly Santiago */}
              <motion.div variants={fadeInUp}>
                <Card className="h-full border-2 border-primary shadow-xl">
                  <CardHeader className="bg-primary text-white">
                    <div className="text-center">
                      <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-primary shadow-lg">
                        <img 
                          src={nollyImage} 
                          alt="Nolly Santiago" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardTitle className="text-2xl">Nolly Santiago</CardTitle>
                      <p className="text-white">Professional Financial Advisor</p>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <p className="text-gray-700 leading-relaxed">
                        <strong>Two decades in telecommunications.</strong> After losing both parents too early and realizing 
                        they never had <DictionaryTerm termId="educacion_financiera">financial education</DictionaryTerm>, Nolly discovered WFG. Her mission: ensure every family has 
                        the knowledge and tools to secure their <DictionaryTerm termId="prosperidad">future prosperity</DictionaryTerm> before it's too late.
                      </p>
                      
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-primary">
                          <Briefcase className="h-4 w-4" />
                          <span className="text-sm font-medium">Telecommunications Veteran</span>
                        </div>
                        <div className="flex items-center gap-2 text-primary">
                          <Heart className="h-4 w-4" />
                          <span className="text-sm font-medium">Family Legacy Advocate</span>
                        </div>
                        <div className="flex items-center gap-2 text-primary">
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
                <Card className="h-full border-2 border-primary shadow-xl">
                  <CardHeader className="bg-primary text-white">
                    <div className="text-center">
                      <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-primary shadow-lg">
                        <img 
                          src={pabloImage} 
                          alt="Pablo Santiago" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardTitle className="text-2xl">Pablo Santiago</CardTitle>
                      <p className="text-white">Retired NYPD Officer | Orange County Deputy | Financial Protection Advocate</p>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <p className="text-gray-700 leading-relaxed">
                        <strong>34 years in law enforcement</strong>—first with the NYPD and now serving as a deputy in Orange County. 
                        "Protection doesn't stop when the badge comes off." After asking himself, "If something happened to me, would my family be financially secure?" 
                        that question changed everything. Pablo shifted his focus to protecting his community through <DictionaryTerm termId="educacion_financiera">financial education</DictionaryTerm>, 
                        helping families build real legacies with <DictionaryTerm termId="libertad_financiera">tax-free wealth strategies</DictionaryTerm> instead of giving more than necessary to Uncle Sam.
                      </p>
                      
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-primary">
                          <Shield className="h-4 w-4" />
                          <span className="text-sm font-medium">34 Years Law Enforcement</span>
                        </div>
                        <div className="flex items-center gap-2 text-primary">
                          <Users className="h-4 w-4" />
                          <span className="text-sm font-medium">Proud Father & Husband</span>
                        </div>
                        <div className="flex items-center gap-2 text-primary">
                          <Target className="h-4 w-4" />
                          <span className="text-sm font-medium">Financial Protection Advocate</span>
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
                <Card className="h-full border-2 border-primary shadow-xl">
                  <CardHeader className="bg-primary text-white">
                    <div className="text-center">
                      <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-primary shadow-lg">
                        <img 
                          src={josephImage} 
                          alt="Joseph Santiago" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardTitle className="text-2xl">Joseph Santiago</CardTitle>
                      <p className="text-white">Associate & Entrepreneurial Leader</p>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <p className="text-gray-700 leading-relaxed">
                        <strong>Born into the family mission.</strong> Joseph earned his investment license while still in high school, 
                        demonstrating the Santiago family's commitment to <DictionaryTerm termId="educacion_financiera">financial education</DictionaryTerm> from an early age. 
                        As an entrepreneurial force, he specializes in helping business owners create multiple income streams and 
                        build <DictionaryTerm termId="prosperidad">generational wealth</DictionaryTerm> through smart investing and compound interest strategies.
                      </p>
                      
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-primary">
                          <GraduationCap className="h-4 w-4" />
                          <span className="text-sm font-medium">High School Graduate</span>
                        </div>
                        <div className="flex items-center gap-2 text-primary">
                          <Building className="h-4 w-4" />
                          <span className="text-sm font-medium">Investment Licensed</span>
                        </div>
                        <div className="flex items-center gap-2 text-primary">
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
                <Card className="h-full border-2 border-primary shadow-xl">
                  <CardHeader className="bg-primary text-white">
                    <div className="text-center">
                      <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-primary shadow-lg">
                        <img 
                          src={christianImage} 
                          alt="Christian Santiago" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardTitle className="text-2xl">Christian Santiago</CardTitle>
                      <p className="text-white">Associate & Youth Financial Educator</p>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <p className="text-gray-700 leading-relaxed">
                        <strong>The mathematical genius of the family.</strong> Christian combines his natural aptitude for numbers 
                        with a deep understanding of compound interest and investment strategies. As a recent graduate, he's passionate 
                        about teaching his generation the <DictionaryTerm termId="educacion_financiera">financial principles</DictionaryTerm> that can transform their futures. 
                        His mission is helping young adults understand that time is their greatest asset in building wealth.
                      </p>
                      
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-primary">
                          <GraduationCap className="h-4 w-4" />
                          <span className="text-sm font-medium">Recent Graduate</span>
                        </div>
                        <div className="flex items-center gap-2 text-primary">
                          <Target className="h-4 w-4" />
                          <span className="text-sm font-medium">Mathematics Expert</span>
                        </div>
                        <div className="flex items-center gap-2 text-primary">
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

              {/* Princhesca Rainier Turner - Team Member */}
              <motion.div variants={fadeInUp}>
                <Card className="h-full border-2 border-primary shadow-xl">
                  <CardHeader className="bg-primary text-white">
                    <div className="text-center">
                      <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-primary shadow-lg">
                        <img 
                          src={princhescaPhoto} 
                          alt="Princhesca Rainier Turner" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardTitle className="text-2xl">Princhesca Rainier Turner</CardTitle>
                      <p className="text-white">Senior Marketing Associate & Business Development</p>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <p className="text-gray-700 leading-relaxed">
                        <strong>Strategic business development expert.</strong> Princhesca brings extensive experience in 
                        client relationship management and business strategy to the Santiago Team. Her expertise in 
                        <DictionaryTerm termId="educacion_financiera">financial planning</DictionaryTerm> and commitment to helping families achieve 
                        <DictionaryTerm termId="libertad_financiera">financial independence</DictionaryTerm> makes her an invaluable part of our mission.
                      </p>
                      
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-primary">
                          <TrendingUp className="h-4 w-4" />
                          <span className="text-sm font-medium">Business Development</span>
                        </div>
                        <div className="flex items-center gap-2 text-primary">
                          <Users className="h-4 w-4" />
                          <span className="text-sm font-medium">Client Relations</span>
                        </div>
                        <div className="flex items-center gap-2 text-primary">
                          <Target className="h-4 w-4" />
                          <span className="text-sm font-medium">Strategic Planning</span>
                        </div>
                      </div>

                      <div className="border-t pt-4">
                        <h4 className="font-semibold text-gray-900 mb-2">Specializations:</h4>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="outline" className="text-xs">Business Strategy</Badge>
                          <Badge variant="outline" className="text-xs">Family Financial Planning</Badge>
                          <Badge variant="outline" className="text-xs">Wealth Building</Badge>
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
                  <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                    <Heart className="h-8 w-8 text-primary" />
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
                  <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                    <Shield className="h-8 w-8 text-primary" />
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
                  <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                    <Trophy className="h-8 w-8 text-primary" />
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
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div {...fadeInUp}>
              <Card className="border-none shadow-2xl">
                <CardHeader className="bg-primary text-white text-center">
                  <CardTitle className="text-3xl">The Santiago Story</CardTitle>
                  <p className="text-white/80">From Sacrifice to Success</p>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="space-y-6 text-gray-700 leading-relaxed">
                    <p className="text-lg">
                      <strong>Our journey began with service and sacrifice.</strong> Pablo served 34 years with the NYPD and Orange County 
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
      <section className="py-16 bg-primary text-white">
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
                <Button size="lg" className="bg-white text-primary hover:bg-gray-100 px-8 py-3">
                  <Calendar className="h-5 w-5 mr-2" />
                  Schedule Your Consultation
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary px-8 py-3">
                  <Users className="h-5 w-5 mr-2" />
                  Explore Career Opportunities
                </Button>
              </div>
              
              <div className="mt-8 flex items-center justify-center gap-6 text-sm opacity-75">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>Nationwide United States</span>
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
      <section className="py-16 bg-gray-50">
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
              The Santiago Family: Four generations united by service, driven by mission, 
              and committed to building generational wealth for families everywhere.
            </p>
            <div className="relative">
              <img 
                src={newTeamPhoto} 
                alt="Santiago Team Family Photo" 
                className="w-full rounded-3xl shadow-2xl border-8 border-primary"
              />
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <p className="text-lg font-semibold">
                  "From protecting communities to protecting families' financial futures"
                </p>
              </div>
            </div>
            
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="text-center p-6 bg-white rounded-xl shadow-lg">
                <div className="text-2xl font-bold text-primary mb-2">Pablo</div>
                <div className="text-sm text-gray-600">Law Enforcement Legacy</div>
              </div>
              <div className="text-center p-6 bg-white rounded-xl shadow-lg">
                <div className="text-2xl font-bold text-primary mb-2">Nolly</div>
                <div className="text-sm text-gray-600">Family Protection Mission</div>
              </div>
              <div className="text-center p-6 bg-white rounded-xl shadow-lg">
                <div className="text-2xl font-bold text-primary mb-2">Joseph</div>
                <div className="text-sm text-gray-600">Entrepreneurial Leadership</div>
              </div>
              <div className="text-center p-6 bg-white rounded-xl shadow-lg">
                <div className="text-2xl font-bold text-primary mb-2">Christian</div>
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