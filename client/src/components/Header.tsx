import { useState } from "react";
import { Menu, X, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import LanguageToggle from "@/components/LanguageToggle";
import { useLanguage } from "@/lib/LanguageContext";
import { useLoading } from "@/lib/LoadingContext";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t } = useLanguage();
  const { transitionToSection } = useLoading();

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
          <div className="flex items-center relative group cosmic-3d">
            {/* Enhanced Glowing logo effect */}
            <div className="absolute -inset-3 bg-blue-500 rounded-full opacity-30 blur-md group-hover:opacity-60 transition-all duration-500 
                           group-hover:scale-110"></div>
            <div className="cosmic-3d-element">
              <Building2 className="h-8 w-8 mr-3 relative z-10 text-white cosmic-glow-blue" />
            </div>
            <div className="relative z-10 ml-1">
              <h1 className="font-heading font-bold text-2xl cosmic-text-title cosmic-glow-blue">{t('hero.title').split(' with ')[0]}</h1>
              <p className="text-sm cosmic-text cosmic-glow">{t('hero.title').includes(' with ') ? t('hero.title').split(' with ')[1] : 'with Bold Horizons with World Financial Group'} | Caribbean, Florida & NY</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center">
            <ul className="flex space-x-3 mr-4">
              {navItems.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="px-3 py-2 rounded-full hover:bg-blue-700/30 hover:text-white transition-all duration-300 flex items-center relative overflow-hidden group cosmic-3d"
                    onClick={(e) => {
                      e.preventDefault();
                      // Use the loading transition when navigating between sections
                      transitionToSection(item.href, 100);
                    }}
                  >
                    {/* Enhanced Cosmic nav hover effect */}
                    <span className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/30 transition-all duration-300 
                                    group-hover:backdrop-blur-sm group-hover:border border-blue-400/30"></span>
                    
                    {/* 3D Text effect on hover */}
                    <span className="relative z-10 font-medium cosmic-glow group-hover:cosmic-glow-blue transform 
                                   group-hover:scale-105 transition-all duration-300">{item.name}</span>
                    
                    {/* Star accent on hover */}
                    <span className="absolute top-1/2 left-0 w-0 h-0 bg-blue-400 rounded-full opacity-0 
                                    group-hover:opacity-40 group-hover:w-full group-hover:h-full 
                                    transition-all duration-500 group-hover:-translate-y-1/2 ease-out"></span>
                    
                    {/* Twinkling star on hover */}
                    <span className="absolute top-1 right-1 h-0 w-0 opacity-0 group-hover:opacity-100 
                                    group-hover:h-1 group-hover:w-1 rounded-full bg-white 
                                    transition-all duration-300 delay-100 animate-pulse"></span>
                  </a>
                </li>
              ))}
            </ul>
            
            {/* Language toggle with enhanced visibility */}
            <div className="relative">
              {/* Animated attention-grabbing pulsing ring */}
              <div className="absolute -inset-2 bg-yellow-400/30 rounded-full animate-pulse"></div>
              <div className="absolute -inset-4 bg-blue-500/20 rounded-full animate-ping"></div>
              
              {/* Language toggle with extra highlight */}
              <div className="relative z-10 bg-gradient-to-r from-blue-600 to-purple-600 p-1 rounded-lg shadow-lg border-2 border-white/30">
                <LanguageToggle />
              </div>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button 
              variant="secondary" 
              size="icon" 
              onClick={toggleMobileMenu}
              className="relative overflow-hidden group bg-blue-600/60 border border-blue-400/50"
            >
              <span className="absolute inset-0 bg-blue-600/40 group-hover:bg-blue-600/70 rounded-full transition-colors duration-300"></span>
              <span className="relative z-10 text-white">
                {mobileMenuOpen ? <X className="h-6 w-6 drop-shadow-md" /> : <Menu className="h-6 w-6 drop-shadow-md" />}
              </span>
              
              {/* Button glow effect */}
              <span className="absolute inset-0 rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-300">
                <span className="absolute inset-0 rounded-full bg-blue-400/30 blur-md"></span>
              </span>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="mt-4 md:hidden">
            <ul className="flex flex-col space-y-2 pb-4">
              {navItems.map((item, index) => (
                <li key={item.name} className="cosmic-3d">
                  <a
                    href={item.href}
                    className="block py-3 px-4 rounded-lg bg-blue-700/20 backdrop-blur-md hover:bg-blue-700/30 
                             border border-blue-400/20 hover:border-blue-400/40
                             transition-all duration-300 relative overflow-hidden shadow-md hover:shadow-lg"
                    onClick={(e) => {
                      e.preventDefault();
                      // Use the loading transition when navigating between sections in mobile view
                      transitionToSection(item.href, 100);
                      setMobileMenuOpen(false);
                    }}
                  >
                    {/* Enhanced animated cosmic effects on mobile nav */}
                    <span className="absolute h-20 w-20 -right-10 -top-10 bg-blue-500/10 rounded-full blur-xl"></span>
                    
                    {/* Animated stars background on mobile nav */}
                    {index % 3 === 0 && (
                      <span className="absolute h-1.5 w-1.5 rounded-full bg-white/40 right-3 top-3 animate-pulse cosmic-star"></span>
                    )}
                    {index % 4 === 0 && (
                      <span className="absolute h-1 w-1 rounded-full bg-white/30 right-8 bottom-3 animate-pulse cosmic-star"
                            style={{animationDelay: '0.5s'}}></span>
                    )}
                    {index % 2 === 0 && (
                      <span className="absolute h-2 w-2 rounded-full bg-blue-300/20 left-3 top-4 animate-pulse cosmic-star"
                            style={{animationDelay: '1.2s'}}></span>
                    )}
                    
                    <span className="relative z-10 cosmic-text">{item.name}</span>
                  </a>
                </li>
              ))}
              <li className="pt-4 mt-3 border-t border-white/10">
                <div className="flex justify-center relative">
                  {/* Mobile attention-grabbing pulsing effect */}
                  <div className="absolute -inset-2 bg-yellow-400/30 rounded-full animate-pulse"></div>
                  
                  {/* Enhanced mobile language toggle */}
                  <div className="relative z-10 bg-gradient-to-r from-blue-600 to-purple-600 p-1 rounded-lg shadow-lg border-2 border-white/30">
                    <LanguageToggle />
                  </div>
                </div>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}
