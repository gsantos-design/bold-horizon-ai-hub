import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Languages, 
  CheckCircle, 
  AlertTriangle, 
  Search, 
  Download, 
  Upload, 
  Copy, 
  Save, 
  RefreshCw,
  Globe,
  FileText,
  Zap,
  Settings
} from 'lucide-react';
import { useLanguage, translations } from '@/lib/LanguageContext';

interface TranslationItem {
  key: string;
  english: string;
  spanish: string;
  status: 'complete' | 'missing' | 'needs_review';
  category: string;
  component?: string;
}

interface TranslationStats {
  total: number;
  completed: number;
  missing: number;
  needsReview: number;
  completionRate: number;
}

export default function LocalizationWizard() {
  const { language, setLanguage, t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [translationItems, setTranslationItems] = useState<TranslationItem[]>([]);
  const [stats, setStats] = useState<TranslationStats>({
    total: 0,
    completed: 0,
    missing: 0,
    needsReview: 0,
    completionRate: 0
  });
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');

  useEffect(() => {
    generateTranslationItems();
  }, []);

  const generateTranslationItems = () => {
    const items: TranslationItem[] = [];
    const englishKeys = Object.keys(translations.en);
    const spanishKeys = Object.keys(translations.es);

    englishKeys.forEach(key => {
      const category = key.split('.')[0];
      const englishText = translations.en[key];
      const spanishText = translations.es[key];
      
      let status: 'complete' | 'missing' | 'needs_review' = 'complete';
      
      if (!spanishText) {
        status = 'missing';
      } else if (spanishText === englishText) {
        status = 'needs_review';
      }

      items.push({
        key,
        english: englishText,
        spanish: spanishText || '',
        status,
        category,
        component: getComponentForKey(key)
      });
    });

    // Add missing Spanish keys that don't exist in English
    spanishKeys.forEach(key => {
      if (!englishKeys.includes(key)) {
        items.push({
          key,
          english: '',
          spanish: translations.es[key],
          status: 'needs_review',
          category: key.split('.')[0],
          component: getComponentForKey(key)
        });
      }
    });

    setTranslationItems(items);
    calculateStats(items);
  };

  const getComponentForKey = (key: string): string => {
    const prefix = key.split('.')[0];
    const componentMap: Record<string, string> = {
      'nav': 'Header Navigation',
      'hero': 'Landing Hero',
      'calc': 'Commission Calculator',
      'quiz': 'Career Quiz',
      'about': 'About Section',
      'team': 'Team Profiles',
      'constellation': 'Career Constellation',
      'contact': 'Contact Forms',
      'footer': 'Footer',
      'events': 'Events Page',
      'ai': 'AI Features',
      'leads': 'Lead Engine'
    };
    return componentMap[prefix] || 'General';
  };

  const calculateStats = (items: TranslationItem[]) => {
    const total = items.length;
    const completed = items.filter(item => item.status === 'complete').length;
    const missing = items.filter(item => item.status === 'missing').length;
    const needsReview = items.filter(item => item.status === 'needs_review').length;
    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

    setStats({ total, completed, missing, needsReview, completionRate });
  };

  const filteredItems = translationItems.filter(item => {
    const matchesSearch = item.key.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.english.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.spanish.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['all', ...Array.from(new Set(translationItems.map(item => item.category)))];

  const handleEdit = (key: string, currentValue: string) => {
    setEditingKey(key);
    setEditValue(currentValue);
  };

  const handleSave = (key: string) => {
    // In a real implementation, this would save to the translation files
    console.log(`Saving translation for ${key}: ${editValue}`);
    setEditingKey(null);
    setEditValue('');
    // Update local state
    setTranslationItems(prev => 
      prev.map(item => 
        item.key === key 
          ? { ...item, spanish: editValue, status: editValue ? 'complete' : 'missing' }
          : item
      )
    );
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'complete':
        return <Badge className="bg-green-100 text-green-800"><CheckCircle className="h-3 w-3 mr-1" />Complete</Badge>;
      case 'missing':
        return <Badge variant="destructive"><AlertTriangle className="h-3 w-3 mr-1" />Missing</Badge>;
      case 'needs_review':
        return <Badge className="bg-yellow-100 text-yellow-800"><AlertTriangle className="h-3 w-3 mr-1" />Review</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const exportTranslations = () => {
    const exportData = {
      english: translations.en,
      spanish: translations.es,
      exportDate: new Date().toISOString(),
      stats
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'santiago-translations.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Languages className="h-8 w-8 text-blue-600" />
              <h1 className="text-3xl font-bold text-gray-900">Spanish Localization Wizard</h1>
            </div>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={exportTranslations}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button onClick={generateTranslationItems}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Translations</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
                </div>
                <Globe className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Completed</p>
                  <p className="text-3xl font-bold text-green-600">{stats.completed}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Missing</p>
                  <p className="text-3xl font-bold text-red-600">{stats.missing}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Completion Rate</p>
                  <p className="text-3xl font-bold text-blue-600">{stats.completionRate}%</p>
                </div>
                <Zap className="h-8 w-8 text-blue-600" />
              </div>
              <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${stats.completionRate}%` }}
                ></div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search translations by key, English text, or Spanish text..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="md:w-48">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category.toUpperCase()}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Translation Items */}
        <div className="space-y-4">
          {filteredItems.map((item) => (
            <Card key={item.key} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">
                        {item.key}
                      </code>
                      {getStatusBadge(item.status)}
                      <Badge variant="outline" className="text-xs">
                        {item.component}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* English */}
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      English (Original)
                    </label>
                    <div className="p-3 bg-gray-50 rounded-lg border">
                      <p className="text-gray-800">{item.english || 'No English text'}</p>
                    </div>
                  </div>

                  {/* Spanish */}
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Spanish (Español)
                    </label>
                    {editingKey === item.key ? (
                      <div className="space-y-2">
                        <Textarea
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          placeholder="Enter Spanish translation..."
                          className="min-h-[100px]"
                        />
                        <div className="flex gap-2">
                          <Button size="sm" onClick={() => handleSave(item.key)}>
                            <Save className="h-3 w-3 mr-1" />
                            Save
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => setEditingKey(null)}>
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <p className="text-gray-800 mb-2">
                          {item.spanish || 'No Spanish translation available'}
                        </p>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleEdit(item.key, item.spanish)}
                        >
                          <Settings className="h-3 w-3 mr-1" />
                          Edit
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <Languages className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No translations found</h3>
              <p className="text-gray-600">
                {searchTerm ? 'Try adjusting your search terms or filters.' : 'No translation items available.'}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}