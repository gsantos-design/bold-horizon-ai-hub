import React from 'react';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';
import { useLanguage, Language } from '@/lib/LanguageContext';

export const LanguageToggle: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'es' : 'en');
  };

  return (
    <Button 
      onClick={toggleLanguage} 
      variant="ghost" 
      size="sm" 
      className="text-white hover:bg-white/10 flex items-center gap-1.5"
    >
      <Globe className="h-4 w-4" />
      <span>{t('language.toggle')}</span>
    </Button>
  );
};

export default LanguageToggle;