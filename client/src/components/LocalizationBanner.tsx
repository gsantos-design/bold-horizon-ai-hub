import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Languages, X, Zap, CheckCircle } from 'lucide-react';
import { useLanguage, translations } from '@/lib/LanguageContext';
import { Link } from 'wouter';

export default function LocalizationBanner() {
  const { language } = useLanguage();
  const [isVisible, setIsVisible] = useState(true);
  
  if (!isVisible) return null;

  // Calculate completion stats
  const englishKeys = Object.keys(translations.en);
  const spanishKeys = Object.keys(translations.es);
  const totalKeys = englishKeys.length;
  const completedKeys = englishKeys.filter(key => translations.es[key] && translations.es[key] !== translations.en[key]).length;
  const completionRate = Math.round((completedKeys / totalKeys) * 100);

  // Don't show if completion is high
  if (completionRate > 90) return null;

  return (
    <Card className="mx-4 mt-4 border-purple-200 bg-white">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Languages className="h-5 w-5 text-purple-600" />
              <h3 className="font-semibold text-gray-900">Spanish Localization Progress</h3>
            </div>
            
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="bg-white">
                <Zap className="h-3 w-3 mr-1" />
                {completionRate}% Complete
              </Badge>
              
              <div className="hidden md:flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>{completedKeys} of {totalKeys} translations</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link href="/localization-wizard">
              <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                <Languages className="h-3 w-3 mr-1" />
                Manage Translations
              </Button>
            </Link>
            
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setIsVisible(false)}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-3">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-500"
              style={{ width: `${completionRate}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-600 mt-1">
            Help improve the Spanish experience for Santiago Team visitors
          </p>
        </div>
      </CardContent>
    </Card>
  );
}