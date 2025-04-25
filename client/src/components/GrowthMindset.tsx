import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { 
  Brain, 
  Lightbulb, 
  Target, 
  Users, 
  PenTool, 
  RefreshCw,
  ChevronDown,
  ChevronUp
} from "lucide-react";

export default function GrowthMindset() {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };

  return (
    <section id="growth-mindset" className="py-16 bg-neutral-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-heading font-bold text-3xl text-primary mb-4">
            Embracing Imperfection in Your Growth Journey
          </h2>
          <p className="text-neutral-600 max-w-3xl mx-auto">
            Discover the mindset that separates successful WFG associates from the rest. Your journey 
            isn't about achieving perfection—it's about embracing the valuable lessons that come from imperfection.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <Card className="shadow-md bg-white border-0 overflow-hidden">
            <CardHeader className="bg-gradient-to-br from-primary to-primary-dark text-white p-6">
              <CardTitle className="font-heading text-2xl">The Growth Mindset Difference</CardTitle>
              <CardDescription className="text-white opacity-90">
                Understanding the power of perspective in your business journey
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-6">
                <div className="prose prose-neutral max-w-none">
                  <p>
                    Perfection may be a moment we remember fondly in our lives. However, true growth and human 
                    perfection are actually found in those imperfect moments—when challenges arise and things 
                    aren't going your way.
                  </p>
                  <p>
                    Many associates stall their growth while waiting for the "perfect moment." Here's what 
                    you need to understand: Your Senior Marketing Director protected you, making conditions 
                    appear perfect while they were the ones facing the pain points necessary for base shop growth.
                  </p>
                  <p>
                    When you become an SMD yourself, remember: you are not weak—you're now the parent. Just as 
                    parents never show the hardship and pain of life to their children until they're old enough 
                    to experience reality, SMDs must be the Superman, the Supermom, the superdad for their base 
                    shop and people.
                  </p>
                  <blockquote className="border-l-4 border-primary pl-4 italic">
                    "If you're casual, you'll become a casualty."
                  </blockquote>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-md bg-white border-0 overflow-hidden">
            <CardHeader className="bg-gradient-to-br from-accent to-accent-dark text-white p-6">
              <CardTitle className="font-heading text-2xl">The Power of Inner Dialogue</CardTitle>
              <CardDescription className="text-white opacity-90">
                How small changes in your thinking create massive results
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-6">
                <div className="prose prose-neutral max-w-none">
                  <p>
                    The Bible says, "As a man thinketh, so is he." What you think about yourself becomes 
                    your reality. We all must change our inner dialogue:
                  </p>
                  <ul>
                    <li>Change "This is hard" to "This is simple, but not easy"</li>
                    <li>Change "I don't know how" to "I'll find a way"</li>
                    <li>Change "I'm not good enough" to "I'm getting better every day"</li>
                  </ul>
                  <p>
                    Small changes in wording can transform your life and bring peace and enjoyment to your business.
                  </p>
                  <p>
                    One of my biggest philosophies: <strong>the day you stop having fun with this business is the day you're done</strong>. 
                    Just like in life—many people understand that when they stop being active or having fun at 65 or 70, 
                    they start dying. In entrepreneurship, regardless of struggles, frustrations, or victories, the 
                    moment you stop having fun is when you're finished.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12">
          <h3 className="font-heading font-bold text-2xl text-primary mb-8 text-center">
            Keys to Success at Any Level
          </h3>
          
          <div className="space-y-4">
            <Card
              className={`shadow-sm border-l-4 border-primary cursor-pointer transition-all duration-300 ${
                expandedSection === "coachable" ? "bg-primary/5" : "bg-white"
              }`}
              onClick={() => toggleSection("coachable")}
            >
              <CardContent className="p-6">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary rounded-full p-2 flex items-center justify-center text-white">
                      <RefreshCw className="h-5 w-5" />
                    </div>
                    <h4 className="font-heading font-semibold text-lg">Remain Coachable</h4>
                  </div>
                  <div>
                    {expandedSection === "coachable" ? (
                      <ChevronUp className="h-5 w-5 text-neutral-500" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-neutral-500" />
                    )}
                  </div>
                </div>
                
                {expandedSection === "coachable" && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-4"
                  >
                    <p className="text-neutral-600">
                      Coachability is the ability to follow. Every great leader is first a great follower. 
                      There's nothing wrong with being a follower when necessary, and you learn to be a good 
                      leader by following good leaders.
                    </p>
                  </motion.div>
                )}
              </CardContent>
            </Card>
            
            <Card
              className={`shadow-sm border-l-4 border-primary cursor-pointer transition-all duration-300 ${
                expandedSection === "teachable" ? "bg-primary/5" : "bg-white"
              }`}
              onClick={() => toggleSection("teachable")}
            >
              <CardContent className="p-6">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary rounded-full p-2 flex items-center justify-center text-white">
                      <Brain className="h-5 w-5" />
                    </div>
                    <h4 className="font-heading font-semibold text-lg">Remain Teachable</h4>
                  </div>
                  <div>
                    {expandedSection === "teachable" ? (
                      <ChevronUp className="h-5 w-5 text-neutral-500" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-neutral-500" />
                    )}
                  </div>
                </div>
                
                {expandedSection === "teachable" && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-4"
                  >
                    <p className="text-neutral-600">
                      Be a student of the business no matter your position. The day you feel you know everything 
                      is when growth stops blessing you with learning. As long as you remain a student, you'll 
                      continue to learn. Those struggles and setbacks aren't failures—they're learning opportunities.
                    </p>
                  </motion.div>
                )}
              </CardContent>
            </Card>
            
            <Card
              className={`shadow-sm border-l-4 border-primary cursor-pointer transition-all duration-300 ${
                expandedSection === "hunger" ? "bg-primary/5" : "bg-white"
              }`}
              onClick={() => toggleSection("hunger")}
            >
              <CardContent className="p-6">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary rounded-full p-2 flex items-center justify-center text-white">
                      <Target className="h-5 w-5" />
                    </div>
                    <h4 className="font-heading font-semibold text-lg">Maintain Hunger</h4>
                  </div>
                  <div>
                    {expandedSection === "hunger" ? (
                      <ChevronUp className="h-5 w-5 text-neutral-500" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-neutral-500" />
                    )}
                  </div>
                </div>
                
                {expandedSection === "hunger" && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-4"
                  >
                    <p className="text-neutral-600">
                      Develop an inner desire to win. Hunger comes from either dissatisfaction or significance:
                    </p>
                    <ul className="list-disc pl-5 mt-2 text-neutral-600">
                      <li>Early in business, excitement comes from dissatisfaction with your current situation</li>
                      <li>As you achieve goals, hunger must shift to significance—finding purpose beyond yourself</li>
                    </ul>
                  </motion.div>
                )}
              </CardContent>
            </Card>
            
            <Card
              className={`shadow-sm border-l-4 border-primary cursor-pointer transition-all duration-300 ${
                expandedSection === "thinkbig" ? "bg-primary/5" : "bg-white"
              }`}
              onClick={() => toggleSection("thinkbig")}
            >
              <CardContent className="p-6">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary rounded-full p-2 flex items-center justify-center text-white">
                      <Lightbulb className="h-5 w-5" />
                    </div>
                    <h4 className="font-heading font-semibold text-lg">Think Big, Talk Big, Do Big</h4>
                  </div>
                  <div>
                    {expandedSection === "thinkbig" ? (
                      <ChevronUp className="h-5 w-5 text-neutral-500" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-neutral-500" />
                    )}
                  </div>
                </div>
                
                {expandedSection === "thinkbig" && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-4"
                  >
                    <p className="text-neutral-600">
                      If you think big, you'll talk big. If you talk big, you'll do big. Conversely, if you think small, 
                      you'll talk small and do small—or nothing at all. Never fear thinking big; fear thinking too small. 
                      Small is boring—there's no thrill or challenge in it.
                    </p>
                  </motion.div>
                )}
              </CardContent>
            </Card>
            
            <Card
              className={`shadow-sm border-l-4 border-primary cursor-pointer transition-all duration-300 ${
                expandedSection === "success" ? "bg-primary/5" : "bg-white"
              }`}
              onClick={() => toggleSection("success")}
            >
              <CardContent className="p-6">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary rounded-full p-2 flex items-center justify-center text-white">
                      <Users className="h-5 w-5" />
                    </div>
                    <h4 className="font-heading font-semibold text-lg">Align Yourself With Success</h4>
                  </div>
                  <div>
                    {expandedSection === "success" ? (
                      <ChevronUp className="h-5 w-5 text-neutral-500" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-neutral-500" />
                    )}
                  </div>
                </div>
                
                {expandedSection === "success" && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-4"
                  >
                    <p className="text-neutral-600">
                      Surround yourself with successful people. Show me your mentor, I'll show you your future. 
                      Show me who you hang around with, I'll show you your future. When I spend time with average 
                      people discussing casual matters, my thinking becomes small. When I connect with driven 
                      colleagues, I become excited and fired up.
                    </p>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
        
        <div className="mt-12 bg-gradient-to-r from-primary/10 to-accent/10 p-8 rounded-xl">
          <div className="text-center mb-6">
            <h3 className="font-heading font-bold text-2xl text-primary mb-2">
              The Unique Opportunity Before Us
            </h3>
            <p className="text-neutral-600 max-w-3xl mx-auto">
              Success is the result of small discipline practiced every day—not sometimes, but every day.
            </p>
          </div>
          
          <div className="prose prose-neutral max-w-none">
            <p>
              In my 19 years, I've never seen our position quite like it is now. Forget the products and 
              companies—I've never seen such momentum in this company and between teams like ours. We have 
              a vision, a line of success, a group of hungry people, a simple and clear system, and programs 
              at every level to support growth.
            </p>
            
            <p>
              I've never seen WFG like it is today—stock options, world-class scripts, excellent conventions 
              and training. Conventions every three months give you constant opportunities to grow. Whatever 
              you're not good at, someone at the convention excels in it.
            </p>

            <p>
              You don't have to be good at everything, but you must be good at bringing people to conventions 
              and letting experts develop them:
            </p>
            
            <ul>
              <li>Not good at connecting spirituality? Bring your people to those who can.</li>
              <li>Not good with systems? Our experts will teach your people.</li>
              <li>Not good at licensing? Someone at convention will show them how.</li>
              <li>Not good at mindset or mental toughness? Our leaders will help with that.</li>
            </ul>
            
            <p>
              Stop focusing on what you're not good at. Instead, leverage your strengths and connect with others 
              who excel where you don't. That's what our business is about.
            </p>
            
            <blockquote className="border-l-4 border-accent pl-4 italic">
              "This is a magnificent time in our business. Recognize challenges and have fun with them. Seek the calm in the storm. Without the right mindset, no system matters."
            </blockquote>
          </div>
          
          <div className="text-center mt-8">
            <Button className="bg-accent hover:bg-accent-dark text-white font-semibold px-6 py-3 rounded-md transition-colors duration-300">
              Join Our Growth Journey
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}