import { useState } from "react";
import { Menu, X, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import LanguageToggle from "@/components/LanguageToggle";
import { useLanguage } from "@/lib/LanguageContext";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t } = useLanguage();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const navItems = [
    { name: t('nav.about_us'), href: "#about" },
    { name: t('nav.compensation'), href: "#compensation" },
    { name: t('calc.title'), href: "#calculator" },
    { name: t('nav.promotions'), href: "#promotion" },
    { name: t('nav.team_building'), href: "#team-building" },
    { name: t('nav.growth_mindset'), href: "#growth-mindset" },
    { name: t('nav.recruitment_journey'), href: "#recruitment-journey" },
    { name: t('nav.career_quiz'), href: "#career-quiz" },
    { name: t('nav.resources'), href: "#resources" },
    { name: t('nav.contact'), href: "#contact" },
  ];

  return (
    <header className="bg-primary/80 text-white shadow-lg backdrop-blur-lg sticky top-0 z-50 border-b border-white/10">
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center relative group">
            {/* Glowing logo effect */}
            <div className="absolute -inset-2 bg-blue-500 rounded-full opacity-30 blur-md group-hover:opacity-50 transition-opacity duration-500"></div>
            <Building2 className="h-8 w-8 mr-3 relative z-10" />
            <div className="relative z-10">
              <h1 className="font-heading font-bold text-2xl text-white">{t('hero.title').split(' with ')[0]}</h1>
              <p className="text-sm text-blue-100">{t('hero.title').includes(' with ') ? t('hero.title').split(' with ')[1] : 'with World Financial Group'} | Caribbean, Florida & NY</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center">
            <ul className="flex space-x-3 mr-4">
              {navItems.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="px-3 py-2 rounded-full hover:bg-white/10 hover:text-blue-200 transition-all duration-300 flex items-center relative overflow-hidden group"
                    onClick={(e) => {
                      e.preventDefault();
                      const element = document.querySelector(item.href);
                      if (element) {
                        window.scrollTo({
                          top: element.getBoundingClientRect().top + window.pageYOffset - 100,
                          behavior: "smooth",
                        });
                      }
                    }}
                  >
                    {/* Cosmic nav hover effect */}
                    <span className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/20 transition-colors duration-300"></span>
                    <span className="relative z-10">{item.name}</span>
                    
                    {/* Star accent on hover */}
                    <span className="absolute top-1/2 left-0 w-0 h-0 bg-blue-400 rounded-full opacity-0 group-hover:opacity-30 group-hover:w-full group-hover:h-full transition-all duration-500 group-hover:-translate-y-1/2 ease-out"></span>
                  </a>
                </li>
              ))}
            </ul>
            <LanguageToggle />
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleMobileMenu}
              className="text-white relative overflow-hidden group"
            >
              <span className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/30 rounded-full transition-colors duration-300"></span>
              <span className="relative z-10">
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </span>
              
              {/* Button glow effect */}
              <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="absolute inset-0 rounded-full bg-blue-400/20 blur-md"></span>
              </span>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="mt-4 md:hidden">
            <ul className="flex flex-col space-y-2 pb-4">
              {navItems.map((item, index) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="block py-2 px-3 rounded-lg bg-blue-600/10 backdrop-blur-md hover:bg-blue-600/20 transition-all duration-300 relative overflow-hidden"
                    onClick={(e) => {
                      e.preventDefault();
                      const element = document.querySelector(item.href);
                      if (element) {
                        window.scrollTo({
                          top: element.getBoundingClientRect().top + window.pageYOffset - 100,
                          behavior: "smooth",
                        });
                        setMobileMenuOpen(false);
                      }
                    }}
                  >
                    {/* Animated star background on mobile nav */}
                    {index % 3 === 0 && (
                      <span className="absolute h-1 w-1 rounded-full bg-white/30 right-3 top-3 animate-pulse"></span>
                    )}
                    {index % 4 === 0 && (
                      <span className="absolute h-1 w-1 rounded-full bg-white/20 right-6 bottom-3 animate-pulse" 
                            style={{animationDelay: '0.5s'}}></span>
                    )}
                    <span className="relative z-10">{item.name}</span>
                  </a>
                </li>
              ))}
              <li className="pt-4 mt-3 border-t border-white/10">
                <div className="flex justify-center">
                  <LanguageToggle />
                </div>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}
