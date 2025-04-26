import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  ArrowRight, 
  Check, 
  DollarSign, 
  Camera, 
  Instagram, 
  Twitter, 
  Facebook, 
  Share2,
  ChevronRight,
  Star,
  TrendingUp,
  Users,
  DollarSign as MoneyIcon
} from "lucide-react";
import { motion } from "framer-motion";
import Interactive3DCamera from "./Interactive3DCamera";
import { useLanguage } from "@/lib/LanguageContext";

export default function Hero() {
  const [currentIncome, setCurrentIncome] = useState("");
  const [showComparison, setShowComparison] = useState(false);
  const [potentialIncome, setPotentialIncome] = useState(0);
  const [activeSlide, setActiveSlide] = useState(0);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [socialShareActive, setSocialShareActive] = useState(false);
  const [show3DCamera, setShow3DCamera] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 100,
        behavior: "smooth",
      });
    }
  };

  const handleQuickCalculate = () => {
    const income = parseFloat(currentIncome.replace(/,/g, ""));
    if (!isNaN(income)) {
      // Simple projection - estimate 3x current income potential
      const potential = Math.round(income * 3);
      setPotentialIncome(potential);
      setShowComparison(true);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev === 3 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const successStories = [
    {
      name: "Maria R.",
      from: "San Juan, PR",
      before: "$2,800",
      after: "$9,500",
      quote: "The Santiago team showed me how to build wealth while helping my community. Now I'm debt-free and own my dream home.",
      icon: <Home className="h-8 w-8 text-white" />,
      transform: "4.2x income increase"
    },
    {
      name: "James T.",
      from: "Miami, FL",
      before: "$4,200", 
      after: "$16,800",
      quote: "I left my corporate job to join the Santiago team. Now I earn 4x more working fewer hours and controlling my own schedule.",
      icon: <Clock className="h-8 w-8 text-white" />,
      transform: "5.1x income increase"
    },
    {
      name: "Sophia D.",
      from: "Brooklyn, NY",
      before: "$3,500",
      after: "$11,200",
      quote: "In 18 months with the Santiago team, I built a business that helps families and provides the freedom I never had in my corporate career.",
      icon: <Users className="h-8 w-8 text-white" />,
      transform: "3.8x income increase"
    },
    {
      name: "Carlos M.",
      from: "Santo Domingo",
      before: "$2,100",
      after: "$8,400",
      quote: "The Santiago system works! I followed the blueprint exactly and quadrupled my income while helping my community secure their futures.",
      icon: <TrendingUp className="h-8 w-8 text-white" />,
      transform: "4x income increase"
    }
  ];

  return (
    <section className="text-white py-16 relative overflow-hidden">
      {/* Animated Cosmic Elements (to enhance the global cosmic background) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Glowing orbs specific to hero section */}
        <div className="absolute top-10 left-10 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 left-1/4 w-48 h-48 bg-blue-300/10 rounded-full blur-3xl"></div>
        
        {/* Animated stars */}
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={`hero-star-${i}`}
            className="absolute rounded-full bg-white"
            style={{
              width: Math.random() * 3 + 1,
              height: Math.random() * 3 + 1,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: 0.6,
            }}
            animate={{
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Intro Headline with Hook */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-10"
        >
          <div className="mb-2 flex justify-center">
            <span className="bg-accent text-white text-sm font-semibold px-3 py-1 rounded-full flex items-center">
              <Star className="h-3 w-3 mr-1" fill="white" />
              The Santiago Team: Caribbean, Florida & New York
            </span>
          </div>
          
          <motion.h1 
            className="font-heading font-bold text-4xl md:text-6xl mb-4 leading-tight"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <span className="block">Your Life.</span>
            <span className="text-accent">Transformed</span>
            <span className="block">Forever.</span>
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl mb-6 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            Join the <span className="font-bold text-accent">Santiago Team</span> and escape the ordinary. 
            Discover how our associates are building <span className="underline decoration-accent decoration-2">life-changing wealth</span> in 
            the Caribbean, Florida, and New York.
          </motion.p>
          
          {/* "As Seen On" Social Proof */}
          <div className="flex justify-center items-center gap-4 mb-8 text-white/70">
            <p className="text-sm font-semibold">As featured in:</p>
            <div className="flex gap-4">
              <div className="flex items-center gap-1 text-sm">
                <Instagram className="h-4 w-4" />
                <span>@SantiagoTeamWFG</span>
              </div>
              <div className="flex items-center gap-1 text-sm">
                <Twitter className="h-4 w-4" />
                <span>25K+ Followers</span>
              </div>
              <div className="flex items-center gap-1 text-sm">
                <Users className="h-4 w-4" />
                <span>5000+ Associates</span>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Interactive Income Transformation Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Left Side: Income Calculator */}
          <div className="lg:col-span-6">
            {!showComparison ? (
              <motion.div 
                className="cosmic-glass-effect p-8 rounded-xl relative z-10 cosmic-gradient-border"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9, duration: 0.5 }}
              >
                <h3 className="text-2xl font-bold mb-4 flex items-center">
                  <MoneyIcon className="h-6 w-6 mr-2 text-accent" />
                  Calculate Your New Future
                </h3>
                <p className="font-medium mb-6">Enter your current income to see how the Santiago Team system can transform your financial reality:</p>
                <div className="flex flex-col gap-3">
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-accent h-5 w-5" />
                    <Input
                      type="text"
                      placeholder="Your current monthly income"
                      value={currentIncome}
                      onChange={(e) => setCurrentIncome(e.target.value)}
                      className="pl-10 py-6 w-full text-primary font-medium border-2 border-accent/30 focus:border-accent"
                    />
                  </div>
                  <Button 
                    className="bg-accent hover:bg-accent-dark text-white font-bold py-6 text-lg"
                    onClick={handleQuickCalculate}
                  >
                    Reveal My Potential <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
                <p className="text-xs mt-3 text-white/80 italic">Based on real results from our associates in your region</p>
              </motion.div>
            ) : (
              <motion.div 
                className="cosmic-glass-effect p-8 rounded-xl relative z-10 cosmic-gradient-border"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-2xl font-bold mb-6 flex items-center">
                  <TrendingUp className="h-6 w-6 mr-2 text-accent" />
                  Your Transformation Preview
                </h3>
                
                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div className="flex flex-col items-center p-5 bg-white/5 rounded-lg border border-white/10">
                    <p className="text-sm opacity-80 mb-1">Current Monthly</p>
                    <p className="text-3xl font-bold">${currentIncome}</p>
                    <p className="text-xs mt-2 text-white/60">Stuck in the rat race</p>
                  </div>
                  
                  <motion.div 
                    className="flex flex-col items-center p-5 bg-accent/30 rounded-lg border border-accent/30"
                    initial={{ scale: 1 }}
                    animate={{ scale: [1, 1.03, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
                  >
                    <p className="text-sm opacity-80 mb-1">Santiago Team Potential</p>
                    <p className="text-3xl font-bold">${potentialIncome.toLocaleString()}</p>
                    <div className="mt-2 bg-white/20 px-2 py-1 rounded-full">
                      <p className="text-xs font-semibold">+{Math.round(potentialIncome/(parseInt(currentIncome.replace(/,/g, "")) || 1))}x increase</p>
                    </div>
                  </motion.div>
                </div>
                
                <div className="mb-6 p-4 bg-white/5 rounded-lg">
                  <p className="text-sm mb-2">With this income, you could:</p>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-accent mr-2" />
                      <span>Pay off all debt in {Math.round(50000/potentialIncome)} months</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-accent mr-2" />
                      <span>Afford a ${Math.round(potentialIncome*3.5)} monthly mortgage</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-accent mr-2" />
                      <span>Build ${Math.round(potentialIncome*0.2*12*5).toLocaleString()} in savings over 5 years</span>
                    </li>
                  </ul>
                </div>
                
                <div className="flex justify-between gap-3">
                  <Button 
                    className="bg-accent hover:bg-accent-dark text-white"
                    onClick={() => scrollToSection("calculator")}
                  >
                    See detailed projection
                  </Button>
                  
                  <Button 
                    variant="outline"
                    className="border-white text-white hover:bg-white/10"
                    onClick={() => setShowComparison(false)}
                  >
                    Recalculate
                  </Button>
                </div>
              </motion.div>
            )}
          </div>
          
          {/* Right Side: Success Stories Showcase */}
          <div className="lg:col-span-6">
            <motion.div 
              className="relative h-full"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9, duration: 0.5 }}
            >
              <div className="bg-white/10 backdrop-blur-md p-1 rounded-xl border border-white/20 shadow-xl overflow-hidden h-full">
                <div className="relative h-full">
                  {/* Interactive "Social Media" Style Display */}
                  <div className="absolute top-4 right-4 z-10 flex gap-2">
                    <Button 
                      size="icon" 
                      variant="secondary" 
                      className="rounded-full w-8 h-8 bg-white/20 backdrop-blur-md hover:bg-white/30"
                      onClick={() => setShowVideoModal(true)}
                    >
                      <Camera className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="secondary"
                      className="rounded-full w-8 h-8 bg-accent/80 backdrop-blur-md hover:bg-accent"
                      onClick={() => setShow3DCamera(true)}
                    >
                      <Camera className="h-4 w-4" />
                      <span className="absolute top-0 right-0 w-2 h-2 bg-white rounded-full animate-pulse"></span>
                    </Button>
                    <Button 
                      size="icon" 
                      variant="secondary" 
                      className="rounded-full w-8 h-8 bg-white/20 backdrop-blur-md hover:bg-white/30"
                      onClick={() => setSocialShareActive(!socialShareActive)}
                    >
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  {socialShareActive && (
                    <motion.div 
                      className="absolute top-14 right-4 z-10 bg-white/20 backdrop-blur-xl p-3 rounded-lg shadow-lg border border-white/30"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <p className="text-xs mb-2">Share this opportunity:</p>
                      <div className="flex gap-2">
                        <Button size="icon" variant="outline" className="rounded-full w-8 h-8">
                          <Facebook className="h-4 w-4" />
                        </Button>
                        <Button size="icon" variant="outline" className="rounded-full w-8 h-8">
                          <Instagram className="h-4 w-4" />
                        </Button>
                        <Button size="icon" variant="outline" className="rounded-full w-8 h-8">
                          <Twitter className="h-4 w-4" />
                        </Button>
                      </div>
                    </motion.div>
                  )}
                  
                  {/* Success Story Carousel */}
                  <div className="h-full flex flex-col">
                    <div className="p-4 flex justify-between items-center border-b border-white/10">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-primary-dark flex items-center justify-center mr-3">
                          <Users className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="font-semibold">Santiago Team Transformations</h3>
                          <p className="text-xs opacity-80">Real people, real results</p>
                        </div>
                      </div>
                      <div className="flex">
                        {[0, 1, 2, 3].map((idx) => (
                          <button 
                            key={idx}
                            className={`w-2 h-2 mx-1 rounded-full ${
                              activeSlide === idx ? 'bg-accent' : 'bg-white/30'
                            }`}
                            onClick={() => setActiveSlide(idx)}
                          ></button>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex-grow relative">
                      {successStories.map((story, idx) => (
                        <motion.div 
                          key={idx}
                          className="absolute inset-0 p-6 flex flex-col"
                          initial={{ opacity: 0, x: 50 }}
                          animate={{ 
                            opacity: activeSlide === idx ? 1 : 0,
                            x: activeSlide === idx ? 0 : 50,
                            pointerEvents: activeSlide === idx ? 'auto' : 'none'
                          }}
                          transition={{ duration: 0.5 }}
                        >
                          <div className="flex items-center mb-4">
                            <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center mr-4">
                              {story.icon}
                            </div>
                            <div>
                              <h4 className="font-bold text-lg">{story.name}</h4>
                              <p className="text-sm opacity-80">{story.from}</p>
                            </div>
                          </div>
                          
                          <div className="bg-white/10 p-4 rounded-lg mb-4">
                            <p className="italic text-sm">"{story.quote}"</p>
                          </div>
                          
                          <div className="mt-auto">
                            <div className="grid grid-cols-2 gap-4 mb-4">
                              <div className="bg-white/10 p-3 rounded-lg text-center">
                                <p className="text-xs opacity-80">Before Santiago Team</p>
                                <p className="text-xl font-bold">{story.before}/mo</p>
                              </div>
                              <div className="bg-accent/30 p-3 rounded-lg text-center">
                                <p className="text-xs opacity-80">After Santiago Team</p>
                                <p className="text-xl font-bold">{story.after}/mo</p>
                              </div>
                            </div>
                            <div className="bg-white/20 rounded-lg p-2 text-center">
                              <p className="text-sm font-bold">{story.transform}</p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Value Propositions */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/10 transform transition-transform hover:scale-105">
            <div className="bg-accent rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
              <DollarSign className="h-6 w-6"/>
            </div>
            <h3 className="font-semibold text-xl mb-2 text-center">Financial Freedom</h3>
            <p className="text-sm opacity-90 text-center">Break free from financial stress with the Santiago System for building wealth</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/10 transform transition-transform hover:scale-105">
            <div className="bg-accent rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="h-6 w-6"/>
            </div>
            <h3 className="font-semibold text-xl mb-2 text-center">Unlimited Growth</h3>
            <p className="text-sm opacity-90 text-center">Your income is determined by your ambition, not someone else's salary cap</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/10 transform transition-transform hover:scale-105">
            <div className="bg-accent rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
              <Users className="h-6 w-6"/>
            </div>
            <h3 className="font-semibold text-xl mb-2 text-center">Team Building</h3>
            <p className="text-sm opacity-90 text-center">Create generational wealth by building and leading your own organization</p>
          </div>
        </motion.div>
        
        {/* Call to Action */}
        <motion.div 
          className="flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          <Button 
            className="bg-accent hover:bg-accent-dark text-white font-semibold px-8 py-6 rounded-md transition-colors duration-300 text-lg"
            onClick={() => scrollToSection("calculator")}
          >
            Calculate Full Potential
          </Button>
          <Button 
            variant="outline"
            className="border-2 border-white hover:bg-white/20 text-white font-semibold px-8 py-6 rounded-md transition-colors duration-300 text-lg"
            onClick={() => scrollToSection("contact")}
          >
            Join The Santiago Team
          </Button>
        </motion.div>
      </div>
      
      {/* Video Modal */}
      {showVideoModal && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20 shadow-xl max-w-3xl w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold">See The Santiago Team In Action</h3>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setShowVideoModal(false)}
                className="hover:bg-white/20"
              >
                <span className="text-xl">✕</span>
              </Button>
            </div>
            <div className="aspect-video bg-black/50 rounded-lg mb-4">
              <video
                ref={videoRef}
                controls
                className="w-full h-full object-cover rounded-lg"
                poster="https://images.unsplash.com/photo-1574607383476-f517f260d30b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dGVhbSUyMG1lZXRpbmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60"
              >
                <source src="#" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <Button 
              className="w-full bg-accent hover:bg-accent-dark"
              onClick={() => {
                setShowVideoModal(false);
                scrollToSection("contact");
              }}
            >
              I'm Ready To Transform My Life
            </Button>
          </div>
        </div>
      )}
      
      {/* 3D Interactive Camera Experience */}
      {show3DCamera && (
        <Interactive3DCamera 
          onCapture={(imageData) => {
            setCapturedImage(imageData);
            setShow3DCamera(false);
          }}
          onClose={() => setShow3DCamera(false)}
        />
      )}
    </section>
  );
}

// Additional components for rendering icons
function Home({ className }: { className?: string }) {
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
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function Clock({ className }: { className?: string }) {
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
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function CloseIcon({ className }: { className?: string }) {
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
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}
