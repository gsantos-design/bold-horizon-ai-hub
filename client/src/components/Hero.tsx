import { Button } from "@/components/ui/button";

export default function Hero() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 100,
        behavior: "smooth",
      });
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
          Transform Your Financial Future
        </h1>
        <p className="text-xl mb-6 max-w-3xl mx-auto">
          Join thousands of successful associates who have changed their lives with WFG's 
          industry-leading compensation structure. From part-time income to life-changing wealth.
        </p>
        <div className="bg-white/10 p-4 rounded-lg mb-8 max-w-2xl mx-auto">
          <p className="text-lg font-semibold">
            "I went from making $3,600 monthly to over $15,000 in just one year by building my team." 
            <span className="block text-sm mt-1">- Nolly Santiago, Marketing Director</span>
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          <Button 
            className="bg-accent hover:bg-accent-dark text-white font-semibold px-6 py-3 rounded-md transition-colors duration-300"
            onClick={() => scrollToSection("calculator")}
          >
            Calculate Your Potential
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
