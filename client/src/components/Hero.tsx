import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Check, DollarSign } from "lucide-react";

export default function Hero() {
  const [currentIncome, setCurrentIncome] = useState("");
  const [showComparison, setShowComparison] = useState(false);
  const [potentialIncome, setPotentialIncome] = useState(0);

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

  return (
    <section className="bg-gradient-to-r from-primary to-primary-dark text-white py-16">
      <div className="container mx-auto px-4 text-center">
        <div className="mb-2">
          <span className="bg-accent text-white text-sm font-semibold px-3 py-1 rounded-full">
            Serving the Caribbean, Florida & New York
          </span>
        </div>
        <h1 className="font-heading font-bold text-4xl md:text-5xl mb-4">
          Transform Your Financial Future <span className="text-accent">Today</span>
        </h1>
        <p className="text-xl mb-6 max-w-3xl mx-auto">
          Join thousands of successful associates who escaped the daily grind and built lasting wealth with WFG. 
          What could your future look like a year from now?
        </p>
        
        {!showComparison ? (
          <div className="bg-white/10 p-6 rounded-lg mb-8 max-w-xl mx-auto">
            <p className="font-semibold mb-3">See your potential in seconds:</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <div className="relative flex-grow">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Your current monthly income"
                  value={currentIncome}
                  onChange={(e) => setCurrentIncome(e.target.value)}
                  className="pl-10 py-6 w-full text-primary font-medium"
                />
              </div>
              <Button 
                className="bg-accent hover:bg-accent-dark text-white font-bold py-6 px-6"
                onClick={handleQuickCalculate}
              >
                See Potential <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        ) : (
          <div className="bg-white/10 p-6 rounded-lg mb-8 max-w-xl mx-auto animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-white/10 rounded-md">
                <p className="text-sm opacity-80">Your Current Monthly Income</p>
                <p className="text-2xl font-bold">${currentIncome}</p>
              </div>
              <div className="p-4 bg-accent/30 rounded-md">
                <p className="text-sm opacity-80">Your Potential with WFG</p>
                <p className="text-2xl font-bold">${potentialIncome.toLocaleString()}</p>
                <p className="text-xs mt-1">Based on our associates' average results</p>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm italic">
                "I went from making $3,600 monthly to over $15,000 in just one year by building my team." 
                <span className="block">- Paul Santiago, Marketing Director</span>
              </p>
              <div className="flex justify-center mt-3">
                <Button 
                  className="bg-accent hover:bg-accent-dark text-white text-sm"
                  onClick={() => scrollToSection("calculator")}
                >
                  See detailed calculation
                </Button>
              </div>
            </div>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto mb-8">
          <div className="bg-white/5 rounded-lg p-4 backdrop-blur-sm">
            <div className="bg-accent rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-2">
              <Check className="h-4 w-4"/>
            </div>
            <h3 className="font-semibold mb-1">Financial Freedom</h3>
            <p className="text-sm opacity-80">Break free from the paycheck-to-paycheck cycle</p>
          </div>
          <div className="bg-white/5 rounded-lg p-4 backdrop-blur-sm">
            <div className="bg-accent rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-2">
              <Check className="h-4 w-4"/>
            </div>
            <h3 className="font-semibold mb-1">Unlimited Potential</h3>
            <p className="text-sm opacity-80">Your income is determined by your effort, not a salary cap</p>
          </div>
          <div className="bg-white/5 rounded-lg p-4 backdrop-blur-sm">
            <div className="bg-accent rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-2">
              <Check className="h-4 w-4"/>
            </div>
            <h3 className="font-semibold mb-1">Life On Your Terms</h3>
            <p className="text-sm opacity-80">Be your own boss and design the lifestyle you deserve</p>
          </div>
        </div>
        
        <div className="flex flex-wrap justify-center gap-4">
          <Button 
            className="bg-accent hover:bg-accent-dark text-white font-semibold px-6 py-3 rounded-md transition-colors duration-300"
            onClick={() => scrollToSection("calculator")}
          >
            Calculate Full Potential
          </Button>
          <Button 
            variant="outline"
            className="bg-white hover:bg-neutral-200 text-primary font-semibold px-6 py-3 rounded-md transition-colors duration-300"
            onClick={() => scrollToSection("contact")}
          >
            Get Started Today
          </Button>
        </div>
      </div>
    </section>
  );
}
