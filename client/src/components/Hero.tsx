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
        <h1 className="font-heading font-bold text-4xl md:text-5xl mb-4">
          Build Your Future with WFG
        </h1>
        <p className="text-xl mb-8 max-w-3xl mx-auto">
          Discover our industry-leading compensation structure and team building opportunities for 2025.
        </p>
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
