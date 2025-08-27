import { motion } from "framer-motion";
import { 
  Users, 
  Target, 
  Award, 
  Briefcase, 
  BookOpen, 
  Heart,
  ArrowRight,
  MessageCircle,
  Check,
  Bot,
  Trophy,
  Star,
  ThumbsUp,
  Share
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useLanguage } from "@/lib/LanguageContext";

export default function AboutUs() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<string>("mission");
  const [showTestimonial, setShowTestimonial] = useState<number | null>(null);

  const testimonials = [
    {
      name: "Carlos Rodriguez",
      role: "Senior Marketing Director",
      quote: "Joining the Santiago Team was the best career decision I've ever made. The training, support, and leadership have been exceptional.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cHJvZmVzc2lvbmFsJTIwbWFufGVufDB8fDB8fHww&auto=format&fit=crop&w=150&q=80"
    },
    {
      name: "Maria Gonzalez",
      role: "Marketing Director",
      quote: "Pablo and Nolly's mentorship transformed not just my business but my entire approach to helping families achieve financial security.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmVzc2lvbmFsJTIwd29tYW58ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=150&q=80"
    },
    {
      name: "James Wilson",
      role: "Associate",
      quote: "The Santiago Team's systems and training program gave me the confidence to succeed in this business from day one.",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cHJvZmVzc2lvbmFsJTIwbWFufGVufDB8fDB8fHww&auto=format&fit=crop&w=150&q=80"
    }
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
          <span className="text-accent font-semibold tracking-wider text-sm uppercase">{t('team.our_story')}</span>
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-primary mb-4">
            {t('team.about_title')}
          </h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            Led by Pablo and Nolly Santiago, we're dedicated to empowering individuals with 
            financial education and opportunities that transform lives.
          </p>
        </div>

        {/* Team Photo */}
        <div className="relative rounded-xl overflow-hidden mb-16 max-w-4xl mx-auto shadow-xl">
          <div className="aspect-[16/9] bg-gradient-to-r from-primary/10 to-accent/10 flex items-center justify-center p-8">
            <div className="w-full max-w-2xl mx-auto">
              <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-6">
                <div className="text-center">
                  <img 
                    src="/nolly-santiago.png" 
                    alt="Nolly Santiago" 
                    className="w-40 h-40 rounded-full object-cover object-top mx-auto border-4 border-primary shadow-lg mb-4"
                    style={{ objectPosition: 'center top' }}
                  />
                  <h4 className="text-lg font-bold text-primary">Nolly Santiago</h4>
                  <p className="text-sm text-gray-600">Co-Leader</p>
                </div>
                <div className="text-center">
                  <img 
                    src="/pablo-santiago.png" 
                    alt="Pablo Santiago" 
                    className="w-40 h-40 rounded-full object-cover object-top mx-auto border-4 border-primary shadow-lg mb-4"
                    style={{ objectPosition: 'center top' }}
                  />
                  <h4 className="text-lg font-bold text-primary">Pablo Santiago</h4>
                  <p className="text-sm text-gray-600">Co-Leader</p>
                </div>
              </div>
              <div className="bg-white/90 backdrop-blur-md p-6 rounded-xl text-center border border-primary/10">
                <h3 className="text-xl font-bold text-primary mb-2">The Santiago Team</h3>
                <p className="text-sm text-gray-700 mb-3">Licensed WFG Associates</p>
                <p className="text-sm italic text-primary/70 max-w-md mx-auto">
                  Empowering families to achieve financial freedom through proven WFG strategies and team building.
                </p>
                <div className="mt-4 text-sm text-secondary flex justify-center gap-1">
                  <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Tabs */}
        <div className="mb-16">
          <div className="flex overflow-x-auto pb-4 mb-6 gap-2 justify-center">
            <TabButton
              active={activeTab === "mission"}
              onClick={() => setActiveTab("mission")}
              icon={<Target className="h-4 w-4 mr-2" />}
              label="Our Mission"
            />
            <TabButton
              active={activeTab === "who"}
              onClick={() => setActiveTab("who")}
              icon={<Users className="h-4 w-4 mr-2" />}
              label="Who We Are"
            />
            <TabButton
              active={activeTab === "approach"}
              onClick={() => setActiveTab("approach")}
              icon={<BookOpen className="h-4 w-4 mr-2" />}
              label="Our Approach"
            />
            <TabButton
              active={activeTab === "why"}
              onClick={() => setActiveTab("why")}
              icon={<Award className="h-4 w-4 mr-2" />}
              label="Why Choose Us"
            />
          </div>

          <div className="bg-neutral-50 rounded-xl p-8 shadow-sm transition-all">
            {activeTab === "mission" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-3xl mx-auto"
              >
                <h3 className="text-2xl font-bold text-primary mb-4 flex items-center">
                  <Target className="h-5 w-5 mr-2 text-accent" />
                  Our Mission
                </h3>
                <div className="prose prose-neutral max-w-none">
                  <p>
                    At the Santiago Team, led by Paul and Nolly Santiago, we're dedicated to empowering 
                    individuals with financial education and opportunities that can transform lives. 
                    We believe that financial literacy shouldn't be a privilege for the few but a 
                    fundamental right for everyone, regardless of background or experience.
                  </p>
                  <div className="bg-white p-4 rounded-lg border border-neutral-200 my-4 flex items-center">
                    <div className="bg-accent/10 p-2 rounded-full mr-4">
                      <Heart className="h-6 w-6 text-accent" />
                    </div>
                    <p className="text-lg font-medium italic m-0">
                      "Transforming Lives Through Financial Education"
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "who" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-3xl mx-auto"
              >
                <h3 className="text-2xl font-bold text-primary mb-4 flex items-center">
                  <Users className="h-5 w-5 mr-2 text-accent" />
                  Who We Are
                </h3>
                <div className="prose prose-neutral max-w-none">
                  <p>
                    The Santiago Team is a dynamic community of financial professionals within Bold Horizons with World Financial Group. 
                    Under the visionary leadership of Paul and Nolly Santiago, we've built a reputation for excellence, 
                    integrity, and results. Our team members come from diverse backgrounds but share a common purpose: 
                    helping families achieve financial security and independence.
                  </p>
                  <p>
                    Paul and Nolly Santiago began their journey with a simple mission—to help people understand 
                    financial concepts and create pathways to financial freedom. What started as a personal 
                    commitment has grown into one of the most respected and successful teams in the organization.
                  </p>
                </div>
              </motion.div>
            )}

            {activeTab === "approach" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-3xl mx-auto"
              >
                <h3 className="text-2xl font-bold text-primary mb-4 flex items-center">
                  <BookOpen className="h-5 w-5 mr-2 text-accent" />
                  Our Approach
                </h3>
                <div className="prose prose-neutral max-w-none">
                  <p>
                    We believe in a client-first mentality. Our approach begins with education, not sales. 
                    Before recommending any financial solutions, we take the time to understand your unique 
                    situation, goals, and concerns. We then develop personalized strategies aligned with your 
                    objectives, always explaining concepts in clear, straightforward language.
                  </p>

                  <p>
                    The Santiago Team offers comprehensive financial services through our partnership with 
                    industry leaders like Transamerica. Our solutions include:
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose mt-4">
                    {[
                      "Life insurance and protection planning", 
                      "Retirement strategies",
                      "Investment opportunities", 
                      "Wealth accumulation programs",
                      "Business succession planning", 
                      "Education funding solutions"
                    ].map((service, index) => (
                      <div key={index} className="flex items-center bg-white p-3 rounded-lg border border-neutral-200">
                        <div className="h-6 w-6 bg-accent/10 rounded-full flex items-center justify-center mr-3">
                          <Check className="h-3 w-3 text-accent" />
                        </div>
                        <span className="text-neutral-700">{service}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "why" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-3xl mx-auto"
              >
                <h3 className="text-2xl font-bold text-primary mb-4 flex items-center">
                  <Award className="h-5 w-5 mr-2 text-accent" />
                  Why Choose The Santiago Team
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-100">
                    <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                      <Award className="h-6 w-6 text-primary" />
                    </div>
                    <h4 className="font-bold text-lg mb-2">Leadership Excellence</h4>
                    <p className="text-neutral-600">
                      Paul and Nolly Santiago lead by example, demonstrating the highest standards of 
                      professionalism and achievement in the financial services industry.
                    </p>
                  </div>
                  
                  <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-100">
                    <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                      <BookOpen className="h-6 w-6 text-primary" />
                    </div>
                    <h4 className="font-bold text-lg mb-2">Comprehensive Training</h4>
                    <p className="text-neutral-600">
                      We provide our team members with world-class training, mentorship, and support 
                      systems to ensure their success.
                    </p>
                  </div>
                  
                  <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-100">
                    <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                      <Heart className="h-6 w-6 text-primary" />
                    </div>
                    <h4 className="font-bold text-lg mb-2">Community Focus</h4>
                    <p className="text-neutral-600">
                      We're committed to financial literacy in our communities through workshops, 
                      seminars, and educational events.
                    </p>
                  </div>
                  
                  <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-100">
                    <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                      <Target className="h-6 w-6 text-primary" />
                    </div>
                    <h4 className="font-bold text-lg mb-2">Proven System</h4>
                    <p className="text-neutral-600">
                      Our team follows a time-tested system that has helped thousands of families 
                      make informed financial decisions.
                    </p>
                  </div>
                </div>

                {/* AI Sales Force - Unique Competitive Advantage */}
                <div className="bg-gradient-to-br from-primary/5 via-secondary/5 to-secondary/10 p-8 rounded-xl border-2 border-secondary/20 mb-6">
                  <div className="flex items-center mb-4">
                    <div className="bg-gradient-to-r from-primary to-secondary w-14 h-14 rounded-full flex items-center justify-center mr-4">
                      <Bot className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-2xl text-primary mb-1">Revolutionary AI Sales Force</h4>
                      <p className="text-secondary font-medium">The Santiago Team's Exclusive Competitive Edge</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4 text-gray-700">
                    <p className="text-lg leading-relaxed">
                      <strong className="text-primary">The Santiago Team stands as one of the only organizations in the financial services industry</strong> 
                      providing a complete AI-powered sales ecosystem that revolutionizes how we generate, qualify, and convert prospects into satisfied clients.
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-6 mt-6">
                      <div className="bg-white p-6 rounded-lg border border-primary/10">
                        <h5 className="font-bold text-lg text-primary mb-3 flex items-center">
                          <Target className="h-5 w-5 mr-2" />
                          AI-Powered Lead Generation
                        </h5>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-start"><Check className="h-4 w-4 text-secondary mr-2 mt-0.5" />Intelligent prospect identification targeting high-net-worth individuals</li>
                          <li className="flex items-start"><Check className="h-4 w-4 text-secondary mr-2 mt-0.5" />Automated LinkedIn and email outreach with personalized messaging</li>
                          <li className="flex items-start"><Check className="h-4 w-4 text-secondary mr-2 mt-0.5" />Real-time lead scoring and qualification algorithms</li>
                          <li className="flex items-start"><Check className="h-4 w-4 text-secondary mr-2 mt-0.5" />Multi-channel campaign orchestration across all platforms</li>
                        </ul>
                      </div>
                      
                      <div className="bg-white p-6 rounded-lg border border-primary/10">
                        <h5 className="font-bold text-lg text-primary mb-3 flex items-center">
                          <Bot className="h-5 w-5 mr-2" />
                          AI Appointment Setting
                        </h5>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-start"><Check className="h-4 w-4 text-secondary mr-2 mt-0.5" />Automated phone calls with human-like AI voice technology</li>
                          <li className="flex items-start"><Check className="h-4 w-4 text-secondary mr-2 mt-0.5" />Intelligent conversation flows that qualify prospects automatically</li>
                          <li className="flex items-start"><Check className="h-4 w-4 text-secondary mr-2 mt-0.5" />Seamless calendar integration for immediate appointment booking</li>
                          <li className="flex items-start"><Check className="h-4 w-4 text-secondary mr-2 mt-0.5" />Follow-up sequences that nurture prospects until appointment confirmation</li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-r from-secondary/5 to-secondary/10 p-6 rounded-lg border border-secondary/20 mt-6">
                      <h5 className="font-bold text-xl text-secondary mb-3 flex items-center">
                        <Trophy className="h-6 w-6 mr-2" />
                        Exceptional Results & High Close Rates
                      </h5>
                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="text-center">
                          <div className="text-3xl font-bold text-secondary">90%+</div>
                          <div className="text-sm text-secondary/80">Qualified Appointment Rate</div>
                        </div>
                        <div className="text-center">
                          <div className="text-3xl font-bold text-secondary">75%+</div>
                          <div className="text-sm text-secondary/80">First Meeting Close Rate</div>
                        </div>
                        <div className="text-center">
                          <div className="text-3xl font-bold text-secondary">3x</div>
                          <div className="text-sm text-secondary/80">Industry Average Conversion</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-secondary/5 p-6 rounded-lg border border-secondary/20">
                      <h5 className="font-bold text-lg text-primary mb-3">What This Means for Santiago Team Members:</h5>
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <ul className="space-y-2">
                            <li className="flex items-start"><Award className="h-4 w-4 text-secondary mr-2 mt-0.5" />Pre-qualified prospects delivered to your calendar daily</li>
                            <li className="flex items-start"><Award className="h-4 w-4 text-secondary mr-2 mt-0.5" />Higher conversion rates leading to increased income potential</li>
                            <li className="flex items-start"><Award className="h-4 w-4 text-secondary mr-2 mt-0.5" />More time focusing on closing deals, not chasing leads</li>
                          </ul>
                        </div>
                        <div>
                          <ul className="space-y-2">
                            <li className="flex items-start"><Award className="h-4 w-4 text-secondary mr-2 mt-0.5" />Professional development through advanced AI tools training</li>
                            <li className="flex items-start"><Award className="h-4 w-4 text-secondary mr-2 mt-0.5" />Competitive advantage over traditional financial services teams</li>
                            <li className="flex items-start"><Award className="h-4 w-4 text-secondary mr-2 mt-0.5" />Access to cutting-edge technology usually reserved for Fortune 500 companies</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-primary/5 to-accent/5 p-6 rounded-lg">
                  <h4 className="font-bold text-lg mb-2">Growth Opportunities</h4>
                  <p className="text-neutral-600">
                    We offer a unique platform where passionate individuals can build rewarding careers 
                    while making a meaningful difference in others' lives.
                  </p>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Team Testimonials */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-primary mb-6 text-center">
            Hear From Our Team Members
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className="bg-white rounded-xl shadow-sm overflow-hidden border border-neutral-200 relative"
              >
                <div 
                  className="p-6 cursor-pointer transition-all hover:bg-neutral-50" 
                  onClick={() => setShowTestimonial(showTestimonial === index ? null : index)}
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-primary">{testimonial.name}</h4>
                      <p className="text-sm text-neutral-500">{testimonial.role}</p>
                    </div>
                  </div>
                  
                  <p className="text-neutral-600 line-clamp-3">
                    "{testimonial.quote}"
                  </p>
                  
                  <div className="mt-3 text-xs text-accent flex items-center">
                    <span>{showTestimonial === index ? "Show less" : "Read more"}</span>
                    <ArrowRight className="h-3 w-3 ml-1" />
                  </div>
                </div>
                
                {showTestimonial === index && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="bg-neutral-50 p-6 border-t border-neutral-200"
                  >
                    <p className="text-neutral-600 mb-4">
                      "{testimonial.quote}"
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 text-secondary" fill="currentColor" />
                        ))}
                      </div>
                      <span className="text-xs text-neutral-500">Joined 2022</span>
                    </div>
                  </motion.div>
                )}
                
                {/* Social-media-like interaction icons */}
                <div className="flex border-t border-neutral-200 divide-x divide-neutral-200">
                  <button className="flex-1 p-2 text-xs text-neutral-500 flex items-center justify-center hover:bg-neutral-50">
                    <ThumbsUp className="h-3 w-3 mr-1" />
                    Like
                  </button>
                  <button className="flex-1 p-2 text-xs text-neutral-500 flex items-center justify-center hover:bg-neutral-50">
                    <MessageCircle className="h-3 w-3 mr-1" />
                    Comment
                  </button>
                  <button className="flex-1 p-2 text-xs text-neutral-500 flex items-center justify-center hover:bg-neutral-50">
                    <Share className="h-3 w-3 mr-1" />
                    Share
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-primary to-primary-dark text-white p-8 md:p-12 rounded-xl text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">Join Our Movement</h3>
          <p className="max-w-2xl mx-auto mb-6">
            Whether you're looking for guidance on your financial journey or exploring opportunities to build a 
            career helping others, the Santiago Team welcomes you. We're more than just financial professionals—we're 
            a family united by our commitment to financial education and empowerment.
          </p>
          <Button
            className="bg-white text-primary hover:bg-neutral-100 px-6 py-3 text-lg font-semibold"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Connect With Us
          </Button>
        </div>
        </div>
      </div>
    </section>
  );
}

// Supporting Components
function TabButton({ active, onClick, icon, label }: { active: boolean; onClick: () => void; icon: React.ReactNode; label: string }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center px-4 py-2 rounded-full whitespace-nowrap transition-all ${
        active
          ? "bg-primary text-white shadow-md"
          : "bg-white text-neutral-600 border border-neutral-200 hover:bg-neutral-50"
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}



