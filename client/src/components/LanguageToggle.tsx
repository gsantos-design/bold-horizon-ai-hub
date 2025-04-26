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
      variant="secondary"
      size="sm"
      className="bg-blue-500/30 hover:bg-blue-500/50 text-white border border-blue-400/50 flex items-center gap-1.5 font-medium"
    >
      <Globe className="h-4 w-4" />
      <span>{t('language.toggle')}</span>
    </Button>
  );
};

export default LanguageToggle;