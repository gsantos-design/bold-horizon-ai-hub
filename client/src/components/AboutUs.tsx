import { motion } from "framer-motion";
import { 
  Users, 
  Target, 
  Award, 
  Briefcase, 
  BookOpen, 
  Heart,
  ArrowRight,
  MessageCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function AboutUs() {
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
      quote: "Paul and Nolly's mentorship transformed not just my business but my entire approach to helping families achieve financial security.",
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
        <div className="text-center mb-12">
          <span className="text-accent font-semibold tracking-wider text-sm uppercase">Our Story</span>
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-primary mb-4">
            About The Santiago Team
          </h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            Led by Paul and Nolly Santiago, we're dedicated to empowering individuals with 
            financial education and opportunities that transform lives.
          </p>
        </div>

        {/* Team Photo */}
        <div className="relative rounded-xl overflow-hidden mb-16 max-w-4xl mx-auto shadow-xl">
          <div className="aspect-[16/9] bg-gradient-to-r from-primary/10 to-accent/10 flex flex-col md:flex-row items-center justify-center">
            {/* Image will be replaced with the actual photo of Nolly and Paul Santiago */}
            <div className="w-full md:w-1/2 h-full bg-gradient-to-br from-blue-800/20 to-indigo-600/10 flex items-center justify-center p-6">
              <div className="bg-white/80 backdrop-blur-md p-4 rounded-xl text-center shadow-md border border-blue-100">
                <h4 className="text-primary font-bold">Nolly and Paul Santiago</h4>
                <p className="text-sm text-gray-700">Team Leaders</p>
                <p className="text-xs italic mt-2 text-primary/70">
                  Add photo here:<br/>
                  Replace this placeholder with your image
                </p>
                <div className="mt-3 text-xs text-blue-500 flex justify-center gap-1">
                  <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                </div>
              </div>
            </div>
            
            <div className="w-full md:w-1/2 p-8 text-center">
              <h3 className="text-3xl font-bold text-primary mb-4">The Santiago Team</h3>
              <p className="text-neutral-700 mb-2 italic">
                "Transforming Lives Through Financial Education"
              </p>
              <p className="text-neutral-600 text-sm">
                A community of passionate professionals dedicated to financial empowerment, led by Nolly and Paul Santiago
              </p>
            </div>
          </div>
          {/* Social media-style overlay */}
          <div className="absolute bottom-4 right-4 flex gap-2">
            <span className="bg-white/80 backdrop-blur-sm text-primary text-xs px-2 py-1 rounded-full flex items-center">
              <Users className="h-3 w-3 mr-1" />
              <span>5000+ Team Members</span>
            </span>
            <span className="bg-white/80 backdrop-blur-sm text-primary text-xs px-2 py-1 rounded-full flex items-center">
              <MessageCircle className="h-3 w-3 mr-1" />
              <span>View Team</span>
            </span>
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
                          <Star key={i} className="h-4 w-4 text-yellow-400" fill="currentColor" />
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

function Check({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function Star({ className, fill }: { className?: string; fill?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill={fill || "none"}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function ThumbsUp({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M7 10v12" />
      <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z" />
    </svg>
  );
}

function Share({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
      <polyline points="16 6 12 2 8 6" />
      <line x1="12" y1="2" x2="12" y2="15" />
    </svg>
  );
}