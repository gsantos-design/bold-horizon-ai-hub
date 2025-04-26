import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import CosmicBackground from "@/components/CosmicBackground";
import { LanguageProvider, useLanguage } from "@/lib/LanguageContext";
import { LoadingProvider, useLoading } from "@/lib/LoadingContext";
import LoadingTransition from "@/components/LoadingTransition";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

// Floating language toggle component for high visibility
function FloatingLanguageToggle() {
  const { language, setLanguage, t } = useLanguage();
  const [expanded, setExpanded] = useState(false);

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'es' : 'en');
    setExpanded(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {expanded ? (
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-xl shadow-xl border-2 border-white/30 flex flex-col gap-2 animate-in fade-in">
          <div className="text-center font-bold text-white mb-2">{t('language.select')}:</div>
          <Button 
            variant={language === 'en' ? "default" : "secondary"}
            className={`${language === 'en' ? 'bg-blue-800 text-white' : 'bg-black/40 text-white/70'}`}
            onClick={() => setLanguage('en')}
          >
            English
          </Button>
          <Button 
            variant={language === 'es' ? "default" : "secondary"}
            className={`${language === 'es' ? 'bg-blue-800 text-white' : 'bg-black/40 text-white/70'}`}
            onClick={() => setLanguage('es')}
          >
            Español
          </Button>
          <Button 
            variant="outline"
            size="sm"
            className="mt-2 bg-white/30 text-white border-white"
            onClick={() => setExpanded(false)}
          >
            Close
          </Button>
        </div>
      ) : (
        <Button 
          className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold py-4 px-6 rounded-full shadow-xl border-4 border-white/50 hover:scale-105 transition-all"
          onClick={() => setExpanded(true)}
        >
          <Globe className="h-6 w-6 mr-2" />
          {language === 'en' ? 'Español' : 'English'}
          <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
            {language.toUpperCase()}
          </div>
        </Button>
      )}
    </div>
  );
}

function AppContent() {
  const { isLoading } = useLoading();
  const [initialLoad, setInitialLoad] = useState(true);
  
  // Initial load animation when the app first renders
  useEffect(() => {
    // Show initial loading animation for 2 seconds
    const timer = setTimeout(() => {
      setInitialLoad(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <>
      {/* 3D/4D Cosmic Background for entire site */}
      <CosmicBackground intensity="high" primaryColor="blue" />
      <Toaster />
      <Router />
      <FloatingLanguageToggle />
      
      {/* Initial app load transition */}
      <LoadingTransition isLoading={initialLoad} stars={80} />
      
      {/* Transitions between sections/pages */}
      <LoadingTransition isLoading={isLoading} stars={50} />
    </>
  );
}

function App() {
  return (
    <LanguageProvider>
      <LoadingProvider>
        <TooltipProvider>
          <AppContent />
        </TooltipProvider>
      </LoadingProvider>
    </LanguageProvider>
  );
}

export default App;
