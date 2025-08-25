import { useState } from "react";
import { Menu, X, BarChart3, Users, Settings, Star, Trophy, Bot, Target, Languages, Calendar, Thermometer, BookOpen, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/LanguageContext";
import { SafeLink } from "@/components/SafeLink";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'es' : 'en');
  };

  return (
    <header className="bg-white shadow-md border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          {/* WFG Logo and Branding */}
          <div className="flex items-center space-x-4">
            <img 
              src="https://assets.worldfinancialgroup.com/assets/images/WFG_Logo.svg" 
              alt="WFG Logo" 
              className="h-8" 
            />
            <div className="hidden md:flex items-center text-sm text-gray-600">
              <a href="https://www.worldfinancialgroup.com/" className="hover:text-blue-600 transition-colors">
                WorldFinancialGroup.com
              </a>
              <span className="mx-2 text-gray-400">|</span>
              <span className="text-blue-600 font-medium">{t('nav.join_santiago_team')}</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-2">
            <SafeLink href="/empower360">
              <Button variant="ghost" size="sm" className="text-purple-600 hover:text-purple-700 hover:bg-purple-50">
                <Star className="h-4 w-4 mr-1" />
                <span>{t('nav.empower360')}</span>
              </Button>
            </SafeLink>
            
            <SafeLink href="/team-santiago">
              <Button variant="ghost" size="sm" className="text-orange-600 hover:text-orange-700 hover:bg-orange-50">
                <Users className="h-4 w-4 mr-1" />
                <span>{t('nav.team')}</span>
              </Button>
            </SafeLink>
            
            <SafeLink href="/ai-automation">
              <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                <Bot className="h-4 w-4 mr-1" />
                <span>{t('nav.ai_tools')}</span>
              </Button>
            </SafeLink>
            
            <SafeLink href="/lead-engine">
              <Button variant="ghost" size="sm">
                <BarChart3 className="h-4 w-4 mr-1" />
                <span>{t('nav.leads')}</span>
              </Button>
            </SafeLink>
            
            <SafeLink href="/tutorial-espanol">
              <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                <BookOpen className="h-4 w-4 mr-1" />
                <span>{t('nav.spanish_tutorial')}</span>
              </Button>
            </SafeLink>
            
            {/* Language Toggle */}
            <Button 
              variant="outline" 
              size="sm"
              onClick={toggleLanguage}
              className="bg-blue-600 text-white hover:bg-blue-700 border-blue-600 font-bold px-3 py-2 ml-2"
            >
              <Languages className="h-4 w-4 mr-1" />
              {language === 'en' ? 'ES' : 'EN'}
            </Button>
          </nav>

          {/* Medium Screen Navigation */}
          <nav className="hidden md:flex lg:hidden items-center space-x-2">
            <SafeLink href="/empower360">
              <Button variant="ghost" size="sm" className="text-purple-600" title={t('nav.empower360')}>
                <Star className="h-4 w-4" />
              </Button>
            </SafeLink>
            
            <SafeLink href="/team-santiago">
              <Button variant="ghost" size="sm" className="text-orange-600" title={t('nav.team')}>
                <Users className="h-4 w-4" />
              </Button>
            </SafeLink>
            
            <SafeLink href="/ai-automation">
              <Button variant="ghost" size="sm" className="text-red-600" title={t('nav.ai_tools')}>
                <Bot className="h-4 w-4" />
              </Button>
            </SafeLink>
            
            <SafeLink href="/lead-engine">
              <Button variant="ghost" size="sm" title={t('nav.leads')}>
                <BarChart3 className="h-4 w-4" />
              </Button>
            </SafeLink>
            
            {/* Language Toggle */}
            <Button 
              variant="outline" 
              size="sm"
              onClick={toggleLanguage}
              className="bg-blue-600 text-white hover:bg-blue-700 border-blue-600 font-bold px-2 py-1 ml-2"
            >
              <Languages className="h-4 w-4 mr-1" />
              {language === 'en' ? 'ES' : 'EN'}
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={toggleLanguage}
              className="bg-blue-600 text-white hover:bg-blue-700 border-blue-600 font-bold px-2 py-1 text-xs"
            >
              <Languages className="h-3 w-3 mr-1" />
              {language === 'en' ? 'ES' : 'EN'}
            </Button>
            
            <Button 
              variant="outline" 
              size="icon" 
              onClick={toggleMobileMenu}
              className="border-gray-300"
            >
              {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="mt-4 md:hidden border-t pt-4 space-y-3">
            <div className="flex flex-col space-y-2">
              <SafeLink href="/empower360">
                <Button variant="ghost" size="sm" className="w-full justify-start text-purple-600">
                  <Star className="h-4 w-4 mr-2" />
                  {t('nav.empower360')}
                </Button>
              </SafeLink>
              
              <SafeLink href="/events">
                <Button variant="ghost" size="sm" className="w-full justify-start text-indigo-600">
                  <Trophy className="h-4 w-4 mr-2" />
                  {t('nav.events')}
                </Button>
              </SafeLink>
              
              <SafeLink href="/why-join-our-team">
                <Button variant="ghost" size="sm" className="w-full justify-start text-green-600">
                  <Users className="h-4 w-4 mr-2" />
                  {t('nav.join_us')}
                </Button>
              </SafeLink>
              
              <SafeLink href="/lead-engine">
                <Button variant="ghost" size="sm" className="w-full justify-start">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  {t('nav.leads')}
                </Button>
              </SafeLink>
              
              <SafeLink href="/lead-engine/board">
                <Button variant="ghost" size="sm" className="w-full justify-start">
                  <Users className="h-4 w-4 mr-2" />
                  {t('nav.board_view')}
                </Button>
              </SafeLink>
              
              <SafeLink href="/admin/owners">
                <Button variant="ghost" size="sm" className="w-full justify-start">
                  <Settings className="h-4 w-4 mr-2" />
                  {t('nav.admin')}
                </Button>
              </SafeLink>
              
              <SafeLink href="/localization-wizard">
                <Button variant="ghost" size="sm" className="w-full justify-start text-purple-600">
                  <Languages className="h-4 w-4 mr-2" />
                  {t('nav.translations')}
                </Button>
              </SafeLink>
              
              <SafeLink href="/registro-espanol">
                <Button variant="ghost" size="sm" className="w-full justify-start text-amber-600">
                  <Calendar className="h-4 w-4 mr-2" />
                  {t('nav.spanish_registration')}
                </Button>
              </SafeLink>
              
              <SafeLink href="/tutorial-espanol">
                <Button variant="ghost" size="sm" className="w-full justify-start text-blue-600">
                  <BookOpen className="h-4 w-4 mr-2" />
                  {t('nav.spanish_tutorial')}
                </Button>
              </SafeLink>
              
              <SafeLink href="/language-heatmap">
                <Button variant="ghost" size="sm" className="w-full justify-start text-pink-600">
                  <Thermometer className="h-4 w-4 mr-2" />
                  {t('nav.language_heatmap')}
                </Button>
              </SafeLink>
            </div>
            
            <div className="text-center border-t pt-3">
              <a href="https://www.worldfinancialgroup.com/" className="text-sm text-gray-600 hover:text-blue-600">
                WorldFinancialGroup.com
              </a>
              <span className="mx-2 text-gray-400">|</span>
              <span className="text-sm text-blue-600 font-medium">{t('nav.join_santiago_team')}</span>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
