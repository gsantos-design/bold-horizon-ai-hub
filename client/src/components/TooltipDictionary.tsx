import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  BookOpen, 
  Globe, 
  Lightbulb, 
  Star,
  X,
  Volume2,
  Heart,
  Users,
  Sparkles
} from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';

interface TooltipTerm {
  id: string;
  term: string;
  definition: string;
  culturalInsight: string;
  pronunciation?: string;
  category: 'financial' | 'cultural' | 'business';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  examples: string[];
  relatedTerms: string[];
}

interface TooltipDictionaryProps {
  trigger: React.ReactNode;
  termId: string;
  className?: string;
}

const financialTerms: Record<string, TooltipTerm> = {
  'seguro_vida': {
    id: 'seguro_vida',
    term: 'Seguro de Vida',
    definition: 'Un contrato que proporciona protección financiera a los beneficiarios cuando fallece el asegurado.',
    culturalInsight: 'En la cultura latina, el seguro de vida es visto como un acto de amor y responsabilidad hacia la familia. Es común que las familias multigeneracionales consideren esto como una forma de asegurar el futuro de todos.',
    pronunciation: 'se-GU-ro de VI-da',
    category: 'financial',
    difficulty: 'beginner',
    examples: [
      'Mi padre compró un seguro de vida para proteger a nuestra familia.',
      'El seguro de vida nos dio paz mental durante tiempos difíciles.'
    ],
    relatedTerms: ['beneficiario', 'prima', 'póliza']
  },
  'anualidad': {
    id: 'anualidad',
    term: 'Anualidad',
    definition: 'Un producto financiero que proporciona pagos regulares durante un período específico o de por vida.',
    culturalInsight: 'Las anualidades son especialmente valoradas en comunidades que priorizan la seguridad financiera a largo plazo y el cuidado de los ancianos.',
    pronunciation: 'a-nua-li-DAD',
    category: 'financial',
    difficulty: 'intermediate',
    examples: [
      'La anualidad le asegura ingresos mensuales después de jubilarse.',
      'Invertimos en una anualidad para complementar el seguro social.'
    ],
    relatedTerms: ['jubilación', 'inversión', 'ingresos_fijos']
  },
  'prosperidad': {
    id: 'prosperidad',
    term: 'Prosperidad',
    definition: 'El estado de éxito financiero y bienestar económico sostenible.',
    culturalInsight: 'En la cultura hispana, la prosperidad se ve como un logro comunitario que se comparte con la familia extendida y se construye generacionalmente.',
    pronunciation: 'pros-pe-ri-DAD',
    category: 'cultural',
    difficulty: 'beginner',
    examples: [
      'Trabajamos juntos hacia la prosperidad familiar.',
      'La prosperidad verdadera incluye salud, familia y estabilidad financiera.'
    ],
    relatedTerms: ['éxito', 'abundancia', 'crecimiento']
  },
  'educacion_financiera': {
    id: 'educacion_financiera',
    term: 'Educación Financiera',
    definition: 'El proceso de desarrollar conocimientos y habilidades para tomar decisiones informadas sobre el dinero.',
    culturalInsight: 'En muchas familias latinas, la educación financiera se transmite oralmente a través de generaciones, combinando sabiduría tradicional con conceptos modernos.',
    pronunciation: 'e-du-ca-CIÓN fi-nan-CIE-ra',
    category: 'business',
    difficulty: 'beginner',
    examples: [
      'La educación financiera nos ayuda a tomar mejores decisiones.',
      'Enseñamos educación financiera a nuestros hijos desde pequeños.'
    ],
    relatedTerms: ['presupuesto', 'ahorro', 'inversión']
  }
};

export function TooltipDictionary({ trigger, termId, className = '' }: TooltipDictionaryProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTerm, setSelectedTerm] = useState<TooltipTerm | null>(null);
  const { t, language } = useLanguage();
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (termId && financialTerms[termId]) {
      setSelectedTerm(financialTerms[termId]);
    }
  }, [termId]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  const handleTriggerClick = () => {
    setIsOpen(!isOpen);
  };

  const playPronunciation = () => {
    if (selectedTerm?.pronunciation && 'speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(selectedTerm.term);
      utterance.lang = 'es-ES';
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'financial': return <Star className="w-4 h-4" />;
      case 'cultural': return <Heart className="w-4 h-4" />;
      case 'business': return <Users className="w-4 h-4" />;
      default: return <BookOpen className="w-4 h-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'financial': return 'bg-blue-100 text-blue-800';
      case 'cultural': return 'bg-red-100 text-red-800';
      case 'business': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (!selectedTerm) return null;

  return (
    <div className={`relative inline-block ${className}`} ref={tooltipRef}>
      <div 
        className="cursor-pointer inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 underline decoration-dotted transition-colors"
        onClick={handleTriggerClick}
      >
        {trigger}
        <Sparkles className="w-3 h-3 opacity-70" />
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-50 top-full left-0 mt-2 w-96 max-w-sm"
          >
            <Card className="bg-white shadow-xl border-2 border-purple-200 overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5" />
                    <span className="font-semibold text-sm">Diccionario Cultural</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-white hover:bg-white/20 h-6 w-6 p-0"
                    onClick={() => setIsOpen(false)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="flex items-center gap-3">
                  <h3 className="text-lg font-bold">{selectedTerm.term}</h3>
                  {selectedTerm.pronunciation && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-white hover:bg-white/20 h-8 px-2"
                      onClick={playPronunciation}
                    >
                      <Volume2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
                
                {selectedTerm.pronunciation && (
                  <p className="text-purple-100 text-sm italic">
                    /{selectedTerm.pronunciation}/
                  </p>
                )}
              </div>

              <CardContent className="p-4 space-y-4">
                {/* Category and Difficulty Badges */}
                <div className="flex items-center gap-2">
                  <Badge className={`flex items-center gap-1 ${getCategoryColor(selectedTerm.category)}`}>
                    {getCategoryIcon(selectedTerm.category)}
                    <span className="capitalize">{selectedTerm.category}</span>
                  </Badge>
                  <Badge className={getDifficultyColor(selectedTerm.difficulty)}>
                    <span className="capitalize">{selectedTerm.difficulty}</span>
                  </Badge>
                </div>

                {/* Definition */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-blue-600" />
                    Definición
                  </h4>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {selectedTerm.definition}
                  </p>
                </div>

                {/* Cultural Insight */}
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                  <h4 className="font-semibold text-orange-800 mb-2 flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    Perspectiva Cultural
                  </h4>
                  <p className="text-orange-700 text-sm leading-relaxed">
                    {selectedTerm.culturalInsight}
                  </p>
                </div>

                {/* Examples */}
                {selectedTerm.examples.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <Lightbulb className="w-4 h-4 text-yellow-600" />
                      Ejemplos
                    </h4>
                    <ul className="space-y-1">
                      {selectedTerm.examples.map((example, index) => (
                        <li key={index} className="text-sm text-gray-600 italic">
                          "• {example}"
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Related Terms */}
                {selectedTerm.relatedTerms.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Términos Relacionados
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {selectedTerm.relatedTerms.map((term, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {term.replace('_', ' ')}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Footer */}
                <div className="pt-2 border-t border-gray-200">
                  <p className="text-xs text-gray-500 text-center">
                    💡 Tap en términos destacados para más información
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Helper component for easy integration
export function DictionaryTerm({ 
  children, 
  termId, 
  className = '' 
}: { 
  children: React.ReactNode; 
  termId: string; 
  className?: string; 
}) {
  return (
    <TooltipDictionary
      trigger={children}
      termId={termId}
      className={className}
    />
  );
}

export default TooltipDictionary;