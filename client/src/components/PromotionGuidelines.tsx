import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function PromotionGuidelines() {
  return (
    <section id="promotion" className="mb-16">
      <div className="text-center mb-10">
        <h2 className="font-heading font-bold text-3xl text-primary mb-2">
          Promotion Guidelines
        </h2>
        <p className="text-neutral-600 max-w-3xl mx-auto">
          Clear pathways to advance your career at WFG.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="shadow-lg">
          <CardHeader className="bg-primary text-white p-4">
            <CardTitle className="font-heading font-semibold text-xl">
              Fast-Track Promotions
            </CardTitle>
            <CardDescription className="text-sm opacity-80">
              Accelerated advancement path
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-6">
              <div className="relative pl-8 pb-6 border-l-2 border-accent">
                <div className="absolute -left-2 top-0 w-6 h-6 rounded-full bg-accent flex items-center justify-center text-white">1</div>
                <h4 className="font-heading font-semibold text-lg">Associate</h4>
                <div className="mt-2 space-y-1">
                  <p><span className="font-semibold">Requirements:</span> 3 sales, 3 recruits</p>
                  <p><span className="font-semibold">Timeframe:</span> 30 days</p>
                  <p><span className="font-semibold">Commission Level:</span> 45%</p>
                </div>
              </div>
              
              <div className="relative pl-8 pb-6 border-l-2 border-accent">
                <div className="absolute -left-2 top-0 w-6 h-6 rounded-full bg-accent flex items-center justify-center text-white">2</div>
                <h4 className="font-heading font-semibold text-lg">Senior Associate</h4>
                <div className="mt-2 space-y-1">
                  <p><span className="font-semibold">Requirements:</span> 10 sales, 10 recruits</p>
                  <p><span className="font-semibold">Timeframe:</span> 30 days</p>
                  <p><span className="font-semibold">Commission Level:</span> 55%</p>
                </div>
              </div>
              
              <div className="relative pl-8">
                <div className="absolute -left-2 top-0 w-6 h-6 rounded-full bg-accent flex items-center justify-center text-white">3</div>
                <h4 className="font-heading font-semibold text-lg">Marketing Director</h4>
                <div className="mt-2 space-y-1">
                  <p><span className="font-semibold">Requirements:</span> 25 sales, 25 recruits</p>
                  <p><span className="font-semibold">Timeframe:</span> 30 days</p>
                  <p><span className="font-semibold">Commission Level:</span> 62%</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-lg">
          <CardHeader className="bg-primary text-white p-4">
            <CardTitle className="font-heading font-semibold text-xl">
              Traditional Promotions
            </CardTitle>
            <CardDescription className="text-sm opacity-80">
              Standard advancement path
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-6">
              <div className="relative pl-8 pb-6 border-l-2 border-primary">
                <div className="absolute -left-2 top-0 w-6 h-6 rounded-full bg-primary flex items-center justify-center text-white">1</div>
                <h4 className="font-heading font-semibold text-lg">Associate</h4>
                <div className="mt-2 space-y-1">
                  <p><span className="font-semibold">Requirements:</span> 20,000 points</p>
                  <p><span className="font-semibold">Timeframe:</span> 90 days</p>
                  <p><span className="font-semibold">Commission Level:</span> 45%</p>
                </div>
              </div>
              
              <div className="relative pl-8 pb-6 border-l-2 border-primary">
                <div className="absolute -left-2 top-0 w-6 h-6 rounded-full bg-primary flex items-center justify-center text-white">2</div>
                <h4 className="font-heading font-semibold text-lg">Senior Associate</h4>
                <div className="mt-2 space-y-1">
                  <p><span className="font-semibold">Requirements:</span> 4 licensed agents, 30,000 base shop points</p>
                  <p><span className="font-semibold">Timeframe:</span> 3 months</p>
                  <p><span className="font-semibold">Commission Level:</span> 55%</p>
                </div>
              </div>
              
              <div className="relative pl-8 pb-6 border-l-2 border-primary">
                <div className="absolute -left-2 top-0 w-6 h-6 rounded-full bg-primary flex items-center justify-center text-white">3</div>
                <h4 className="font-heading font-semibold text-lg">Marketing Director</h4>
                <div className="mt-2 space-y-1">
                  <p><span className="font-semibold">Requirements:</span> 5 licensed agents, 40,000 net points</p>
                  <p><span className="font-semibold">Timeframe:</span> 3 months</p>
                  <p><span className="font-semibold">Commission Level:</span> 62%</p>
                </div>
              </div>
              
              <div className="relative pl-8">
                <div className="absolute -left-2 top-0 w-6 h-6 rounded-full bg-primary flex items-center justify-center text-white">4</div>
                <h4 className="font-heading font-semibold text-lg">Senior Marketing Director</h4>
                <div className="mt-2 space-y-1">
                  <p><span className="font-semibold">Requirements:</span> 10 licensed agents, 3 direct legs, 75,000 base net points, $35,000+</p>
                  <p><span className="font-semibold">Timeframe:</span> 12 months</p>
                  <p><span className="font-semibold">Commission Level:</span> 80%</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
