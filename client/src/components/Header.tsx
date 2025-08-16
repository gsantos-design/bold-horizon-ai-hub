import { useState } from "react";
import { Menu, X, BarChart3, Users, Settings, Star, Trophy, Bot, Target, Languages, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/LanguageContext";
import { Link } from "wouter";

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
            {/* Core Navigation */}
            <Link href="/empower360">
              <Button variant="ghost" size="sm" className="text-purple-600 hover:text-purple-700 hover:bg-purple-50">
                <Star className="h-4 w-4 mr-1" />
                <span>{t('nav.empower360')}</span>
              </Button>
            </Link>
            
            <Link href="/team-santiago">
              <Button variant="ghost" size="sm" className="text-orange-600 hover:text-orange-700 hover:bg-orange-50">
                <Users className="h-4 w-4 mr-1" />
                <span>{t('nav.team')}</span>
              </Button>
            </Link>
            
            <Link href="/why-join-our-team">
              <Button variant="ghost" size="sm" className="text-green-600 hover:text-green-700 hover:bg-green-50">
                <Users className="h-4 w-4 mr-1" />
                <span>{t('nav.join_us')}</span>
              </Button>
            </Link>
            
            <Link href="/ai-automation">
              <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                <Bot className="h-4 w-4 mr-1" />
                <span>{t('nav.ai_tools')}</span>
              </Button>
            </Link>
            
            <Link href="/lead-engine">
              <Button variant="ghost" size="sm">
                <BarChart3 className="h-4 w-4 mr-1" />
                <span>{t('nav.leads')}</span>
              </Button>
            </Link>
            
            <Link href="/localization-wizard">
              <Button variant="ghost" size="sm" className="text-purple-600 hover:text-purple-700 hover:bg-purple-50">
                <Languages className="h-4 w-4 mr-1" />
                <span>{t('nav.translations')}</span>
              </Button>
            </Link>
            
            <Link href="/registro-espanol">
              <Button variant="ghost" size="sm" className="text-amber-600 hover:text-amber-700 hover:bg-amber-50">
                <Calendar className="h-4 w-4 mr-1" />
                <span>{t('nav.spanish_registration')}</span>
              </Button>
            </Link>
            
            {/* Language Toggle - More Prominent */}
            <div className="border-l border-gray-200 pl-4 ml-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={toggleLanguage}
                className="border-blue-600 text-blue-600 hover:bg-blue-50 font-medium px-4"
              >
                {language === 'en' ? 'Español' : 'English'}
              </Button>
            </div>
          </nav>

          {/* Medium Screen Navigation */}
          <nav className="hidden md:flex lg:hidden items-center space-x-2">
            <Link href="/empower360">
              <Button variant="ghost" size="sm" className="text-purple-600" title={t('nav.empower360')}>
                <Star className="h-4 w-4" />
              </Button>
            </Link>
            
            <Link href="/team-santiago">
              <Button variant="ghost" size="sm" className="text-orange-600" title={t('nav.team')}>
                <Users className="h-4 w-4" />
              </Button>
            </Link>
            
            <Link href="/lead-engine">
              <Button variant="ghost" size="sm" title={t('nav.leads')}>
                <BarChart3 className="h-4 w-4" />
              </Button>
            </Link>
            
            {/* Language Toggle for Medium Screens */}
            <Button 
              variant="outline" 
              size="sm"
              onClick={toggleLanguage}
              className="border-blue-600 text-blue-600 hover:bg-blue-50 ml-2"
            >
              {language === 'en' ? 'ES' : 'EN'}
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={toggleLanguage}
              className="border-blue-600 text-blue-600 hover:bg-blue-50 text-xs px-2 py-1"
            >
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
              <Link href="/empower360">
                <Button variant="ghost" size="sm" className="w-full justify-start text-purple-600">
                  <Star className="h-4 w-4 mr-2" />
                  {t('nav.empower360')}
                </Button>
              </Link>
              
              <Link href="/events">
                <Button variant="ghost" size="sm" className="w-full justify-start text-indigo-600">
                  <Trophy className="h-4 w-4 mr-2" />
                  {t('nav.events')}
                </Button>
              </Link>
              
              <Link href="/why-join-our-team">
                <Button variant="ghost" size="sm" className="w-full justify-start text-green-600">
                  <Users className="h-4 w-4 mr-2" />
                  {t('nav.join_us')}
                </Button>
              </Link>
              
              <Link href="/lead-engine">
                <Button variant="ghost" size="sm" className="w-full justify-start">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  {t('nav.leads')}
                </Button>
              </Link>
              
              <Link href="/lead-engine/board">
                <Button variant="ghost" size="sm" className="w-full justify-start">
                  <Users className="h-4 w-4 mr-2" />
                  {t('nav.board_view')}
                </Button>
              </Link>
              
              <Link href="/admin/owners">
                <Button variant="ghost" size="sm" className="w-full justify-start">
                  <Settings className="h-4 w-4 mr-2" />
                  {t('nav.admin')}
                </Button>
              </Link>
              
              <Link href="/localization-wizard">
                <Button variant="ghost" size="sm" className="w-full justify-start text-purple-600">
                  <Languages className="h-4 w-4 mr-2" />
                  {t('nav.translations')}
                </Button>
              </Link>
              
              <Link href="/registro-espanol">
                <Button variant="ghost" size="sm" className="w-full justify-start text-amber-600">
                  <Calendar className="h-4 w-4 mr-2" />
                  {t('nav.spanish_registration')}
                </Button>
              </Link>
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
