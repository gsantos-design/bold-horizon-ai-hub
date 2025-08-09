import { useState } from "react";
import { Menu, X, BarChart3, Users, Settings, Star, Trophy, Bot, Target } from "lucide-react";
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
              <span className="text-blue-600 font-medium">Join WFG</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            <Link href="/empower360">
              <Button variant="ghost" size="sm" className="flex items-center space-x-2 text-purple-600 hover:text-purple-700 hover:bg-purple-50">
                <Star className="h-4 w-4" />
                <span>Empower360</span>
              </Button>
            </Link>
            
            <Link href="/three-philosophies">
              <Button variant="ghost" size="sm" className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                <Target className="h-4 w-4" />
                <span>3 Philosophies</span>
              </Button>
            </Link>
            
            <Link href="/ai-automation">
              <Button variant="ghost" size="sm" className="flex items-center space-x-2 text-red-600 hover:text-red-700 hover:bg-red-50">
                <Bot className="h-4 w-4" />
                <span>AI Automation</span>
              </Button>
            </Link>

            <Link href="/ai-mentor">
              <Button variant="ghost" size="sm" className="flex items-center space-x-2 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50">
                <Bot className="h-4 w-4" />
                <span>AI Mentor</span>
              </Button>
            </Link>
            
            <Link href="/lead-engine">
              <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                <BarChart3 className="h-4 w-4" />
                <span>Lead Engine</span>
              </Button>
            </Link>
            
            <Link href="/lead-engine/board">
              <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                <Users className="h-4 w-4" />
                <span>Board</span>
              </Button>
            </Link>
            
            <Link href="/team/leaderboard">
              <Button variant="ghost" size="sm" className="flex items-center space-x-2 text-yellow-600 hover:text-yellow-700 hover:bg-yellow-50">
                <Trophy className="h-4 w-4" />
                <span>Leaderboard</span>
              </Button>
            </Link>
            
            <Link href="/workflow-visualization">
              <Button variant="ghost" size="sm" className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50">
                <BarChart3 className="h-4 w-4" />
                <span>Workflows</span>
              </Button>
            </Link>
            
            <Link href="/admin/owners">
              <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                <Settings className="h-4 w-4" />
                <span>Admin</span>
              </Button>
            </Link>
            
            <Button 
              variant="outline" 
              size="sm"
              onClick={toggleLanguage}
              className="border-blue-600 text-blue-600 hover:bg-blue-50"
            >
              {language === 'en' ? 'Español' : 'English'}
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
                  Empower360
                </Button>
              </Link>
              
              <Link href="/lead-engine">
                <Button variant="ghost" size="sm" className="w-full justify-start">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Lead Engine
                </Button>
              </Link>
              
              <Link href="/lead-engine/board">
                <Button variant="ghost" size="sm" className="w-full justify-start">
                  <Users className="h-4 w-4 mr-2" />
                  Board View
                </Button>
              </Link>
              
              <Link href="/admin/owners">
                <Button variant="ghost" size="sm" className="w-full justify-start">
                  <Settings className="h-4 w-4 mr-2" />
                  Admin
                </Button>
              </Link>
            </div>
            
            <div className="text-center border-t pt-3">
              <a href="https://www.worldfinancialgroup.com/" className="text-sm text-gray-600 hover:text-blue-600">
                WorldFinancialGroup.com
              </a>
              <span className="mx-2 text-gray-400">|</span>
              <span className="text-sm text-blue-600 font-medium">Join WFG</span>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
