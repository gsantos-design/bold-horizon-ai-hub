import { useState } from "react";
import { Menu, X, BarChart3, Users, Settings, Star, Trophy, Bot, Target, Languages, Calendar, Thermometer, BookOpen, Sparkles } from "lucide-react";
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

          {/* Language Toggle - Prominently Displayed */}
          <Button 
            variant="outline" 
            size="sm"
            onClick={toggleLanguage}
            className="bg-blue-600 text-white hover:bg-blue-700 border-blue-600 font-bold px-4 py-2 shadow-sm"
          >
            <Languages className="h-4 w-4 mr-2" />
            {language === 'en' ? 'Español' : 'English'}
          </Button>

          {/* Mobile Menu Button with Language Toggle */}
          <div className="md:hidden flex items-center space-x-2">
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
              
              <Link href="/tutorial-espanol">
                <Button variant="ghost" size="sm" className="w-full justify-start text-blue-600">
                  <BookOpen className="h-4 w-4 mr-2" />
                  {t('nav.spanish_tutorial')}
                </Button>
              </Link>
              
              <Link href="/language-heatmap">
                <Button variant="ghost" size="sm" className="w-full justify-start text-pink-600">
                  <Thermometer className="h-4 w-4 mr-2" />
                  {t('nav.language_heatmap')}
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
