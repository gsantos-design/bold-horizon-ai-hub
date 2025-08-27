import React from 'react';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';
import { useLanguage, Language } from '@/lib/LanguageContext';
import { motion } from 'framer-motion';

export const LanguageToggle: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'es' : 'en');
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="relative cosmic-3d"
    >
      {/* Stronger glow effect */}
      <div className="absolute inset-0 bg-primary/40 blur-md rounded-lg opacity-80"></div>
      <div className="absolute inset-0 bg-secondary/30 animate-pulse rounded-lg"></div>
      
      <Button 
        onClick={toggleLanguage}
        variant="secondary"
        size="sm"
        className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white py-2 px-4 rounded-lg border-2 border-primary/50 shadow-lg flex items-center gap-2 relative z-10"
      >
        <Globe className="h-4 w-4 text-white" />
        <span className="font-semibold text-white">{t('language.toggle')}</span>
        
        {/* Language indicator */}
        <div className="absolute -top-2 -right-2 bg-white text-primary text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-primary shadow-md">
          {language.toUpperCase()}
        </div>
      </Button>
    </motion.div>
  );
};

export default LanguageToggle;