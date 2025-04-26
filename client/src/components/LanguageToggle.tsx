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
      {/* Glow effect */}
      <div className="absolute inset-0 bg-blue-500/20 blur-md rounded-lg opacity-60"></div>
      
      <Button 
        onClick={toggleLanguage}
        variant="secondary"
        size="sm"
        className="cosmic-language-toggle relative z-10"
      >
        <Globe className="h-4 w-4" />
        <span className="font-medium cosmic-glow-blue">{t('language.toggle')}</span>
        
        {/* Language indicator */}
        <div className="absolute -top-1 -right-1 bg-white text-blue-700 text-[10px] font-bold px-1.5 py-0.5 rounded-full">
          {language.toUpperCase()}
        </div>
      </Button>
    </motion.div>
  );
};

export default LanguageToggle;