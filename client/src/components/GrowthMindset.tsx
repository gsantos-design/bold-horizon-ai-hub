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
  ChevronUp,
  Shield,
  Shuffle,
  Heart
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
            Finding Character in Imperfection
          </h2>
          <p className="text-neutral-600 max-w-3xl mx-auto">
            Character is revealed by how you respond in imperfect conditions, not perfect ones.
            Discover how embracing challenges can transform your life and build a thriving WFG business.
          </p>
        </div>

        <Tabs defaultValue="character" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="character">Character Development</TabsTrigger>
            <TabsTrigger value="growth">Growth Mindset</TabsTrigger>
          </TabsList>
          
          <TabsContent value="character">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <Card className="shadow-md bg-white border-0 overflow-hidden">
                <CardHeader className="bg-gradient-to-br from-primary to-primary-dark text-white p-6">
                  <CardTitle className="font-heading text-2xl">The Character Difference</CardTitle>
                  <CardDescription className="text-white opacity-90">
                    Understanding what truly reveals your character
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    <div className="prose prose-neutral max-w-none">
                      <p>
                        Character is revealed by how you respond in imperfect conditions, not perfect ones.
                        True growth and human perfection emerge during challenging moments when things aren't going your way.
                      </p>
                      <p>
                        Many associates stall their growth waiting for the "perfect moment." Here's what 
                        you need to understand: Your Senior Marketing Director protected you, making conditions 
                        appear perfect while they shouldered the pain for your growth.
                      </p>
                      <p>
                        When you become an SMD, you aren't weak—you're now the parent. Just as parents shield 
                        children from life's hardships until they're ready, SMDs must be the Superman for their 
                        base shop. Unfortunately, many shy away from this responsibility.
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
                  <CardTitle className="font-heading text-2xl">The Cost of Passivity</CardTitle>
                  <CardDescription className="text-white opacity-90">
                    Why waiting for "next time" keeps you stagnant
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    <div className="prose prose-neutral max-w-none">
                      <p>
                        A passive life yields passive results. Too many people fold at the first challenge, 
                        adopting the "mañana syndrome"—if it doesn't happen now, there's always next time. 
                        But next time brings the same problems because your mindset hasn't changed.
                      </p>
                      <p>
                        Think about people who constantly rearrange furniture believing it will change their 
                        home's energy. They forget it's not about the couch placement—it's the person who brings 
                        energy into that space. Your spirit and presence determine the atmosphere.
                      </p>
                      <p>
                        Similarly in business, believing "next month will be different" is futile if you remain 
                        unchanged. The calendar changing doesn't automatically improve your situation—YOU must 
                        change with it. How will you be different tomorrow?
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="bg-primary/5 p-8 rounded-lg mb-8">
              <div className="text-center mb-6">
                <h3 className="font-heading font-bold text-2xl text-primary mb-2">
                  Transform Your Inner Dialogue
                </h3>
                <p className="text-neutral-600">
                  "As a man thinketh, so is he." What you think about yourself becomes your reality.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-white shadow-sm border-0">
                  <CardContent className="p-5">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                        <Shuffle className="h-6 w-6 text-primary" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-neutral-400 line-through">This is hard</p>
                        <p className="text-primary font-semibold">This is simple, but not easy</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-white shadow-sm border-0">
                  <CardContent className="p-5">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                        <Shuffle className="h-6 w-6 text-primary" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-neutral-400 line-through">I don't know how</p>
                        <p className="text-primary font-semibold">I'll find a way</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-white shadow-sm border-0">
                  <CardContent className="p-5">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                        <Shuffle className="h-6 w-6 text-primary" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-neutral-400 line-through">I'm not good enough</p>
                        <p className="text-primary font-semibold">I'm getting better every day</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="mt-6 text-center">
                <p className="text-neutral-600 italic max-w-2xl mx-auto">
                  "The day you stop having fun with this business is the day you're done. Just like in life, 
                  when you stop having fun or being active, you start dying."
                </p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="growth">
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
          </TabsContent>
        </Tabs>

        <div className="mt-12">
          <h3 className="font-heading font-bold text-2xl text-primary mb-8 text-center">
            Five Keys to Success at Any Level
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
                    <h4 className="font-heading font-semibold text-lg">1. Remain Coachable</h4>
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
                      Every great leader is first a great follower. Coachability is the ability to follow. There's 
                      nothing wrong with being a follower when necessary, and you learn to be a good 
                      leader by following good leaders. Let go of your ego and be willing to learn from 
                      those who have blazed the trail before you.
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
                    <h4 className="font-heading font-semibold text-lg">2. Stay Teachable</h4>
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
                      Be a perpetual student of the business no matter your position. The moment you think you 
                      know everything is when growth stops blessing you with learning. As long as you remain a student, 
                      you'll continue to learn. Those struggles and setbacks aren't failures—they're learning opportunities 
                      that contribute to your success story.
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
                    <h4 className="font-heading font-semibold text-lg">3. Maintain Hunger</h4>
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
                    <p className="mt-2 text-neutral-600">
                      The most successful associates maintain their hunger even after achieving financial success 
                      by finding deeper meaning in helping others transform their lives.
                    </p>
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
                    <h4 className="font-heading font-semibold text-lg">4. Think Big, Talk Big, Do Big</h4>
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
                    <p className="mt-2 text-neutral-600">
                      The most successful people in WFG didn't start with all the answers—they started with big dreams 
                      and learned what they needed along the way. Don't let uncertainty limit the size of your vision.
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
                    <h4 className="font-heading font-semibold text-lg">5. Align With Success</h4>
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
                      Your environment shapes you. Show me your mentors and associates, I'll show you your future. 
                      When surrounded by casual conversation and average thinking, you become small. When connected 
                      with ambitious colleagues, you become energized.
                    </p>
                    <p className="mt-2 text-neutral-600">
                      This is why WFG conventions, team calls, and leadership meetings are so valuable—they 
                      immerse you in an environment of success that elevates your thinking and performance.
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
              Our Unprecedented Opportunity
            </h3>
            <p className="text-neutral-600 max-w-3xl mx-auto">
              Success is the result of small discipline practiced every day—not sometimes, but every day.
            </p>
          </div>
          
          <div className="prose prose-neutral max-w-none">
            <p>
              In 19 years, I've never seen our position like it is today. The momentum in our company and between 
              teams is unprecedented. We have a clear vision, hungry people, a simple system, and support programs at every level.
            </p>
            
            <p>
              WFG today offers unprecedented resources—stock options, world-class scripts, excellent conventions every three months. 
              The beauty of life lies in discovery—that butterfly feeling, that productive struggle. Change your 
              perspective on challenges. Without walls to hit and occasional frustration, you're not growing.
            </p>

            <p>
              You don't have to excel at everything; you must excel at bringing people to conventions where experts can develop them.
              Focus on your strengths and connect with others who excel where you don't:
            </p>
            
            <ul>
              <li>Not spiritual enough? Others can connect spirituality.</li>
              <li>Not systematic? The Santiago team will teach systems.</li>
              <li>Struggling with licensing or mindset? Convention experts will help.</li>
              <li>Not good at mindset or mental toughness? Our leaders will help with that.</li>
            </ul>
            
            <blockquote className="border-l-4 border-accent pl-4 italic">
              "This is a magnificent time in our business. Recognize challenges and have fun with them. Seek the calm in the storm. Without the right mindset, no system matters."
            </blockquote>
          </div>
          
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-3">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h4 className="font-semibold text-lg mb-2">Challenges Reveal Character</h4>
              <p className="text-sm text-neutral-600">
                Embrace imperfect conditions as opportunities to show your strength, not reasons to retreat.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-3">
                <PenTool className="h-6 w-6 text-primary" />
              </div>
              <h4 className="font-semibold text-lg mb-2">Daily Disciplines</h4>
              <p className="text-sm text-neutral-600">
                Success isn't built on occasional heroic efforts but on consistent, daily actions repeated over time.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-3">
                <Heart className="h-6 w-6 text-primary" />
              </div>
              <h4 className="font-semibold text-lg mb-2">Keep The Joy</h4>
              <p className="text-sm text-neutral-600">
                Maintain your enthusiasm and find fun in the journey, even through challenges. When you enjoy the process, success follows.
              </p>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <Button 
              className="bg-accent hover:bg-accent-dark text-white font-semibold px-6 py-3 rounded-md transition-colors duration-300"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
            >
              Begin Your Transformation Today
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}