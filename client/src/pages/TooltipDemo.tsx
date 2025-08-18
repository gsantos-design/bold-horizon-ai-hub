import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DictionaryTerm } from '@/components/TooltipDictionary';
import Header from '@/components/Header';
import { useLanguage } from '@/lib/LanguageContext';
import { 
  BookOpen, 
  Sparkles, 
  Globe, 
  Heart,
  Users,
  Star,
  Lightbulb
} from 'lucide-react';

export default function TooltipDemo() {
  const { t, language } = useLanguage();

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 text-white py-16">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center max-w-4xl mx-auto"
            {...fadeInUp}
          >
            <Badge className="mb-4 bg-white/20 text-white px-4 py-2">
              <Sparkles className="w-4 h-4 mr-2" />
              Interactive Learning Tool
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Diccionario Cultural Interactivo
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-purple-100">
              Explora términos financieros con perspectivas culturales profundas
            </p>
            <div className="flex items-center justify-center gap-2 text-purple-100">
              <BookOpen className="w-5 h-5" />
              <span>Toca cualquier término destacado para aprender más</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* Introduction Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
                <CardTitle className="text-2xl flex items-center gap-3">
                  <Globe className="w-6 h-6" />
                  Bienvenido al Diccionario Cultural
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Este diccionario interactivo te ayuda a comprender conceptos financieros 
                  importantes con una perspectiva cultural. Cada término incluye definiciones 
                  claras, ejemplos prácticos, y perspectivas culturales relevantes para la 
                  comunidad hispana.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
                    <Star className="w-5 h-5 text-blue-600" />
                    <div>
                      <h4 className="font-semibold text-blue-900">Términos Financieros</h4>
                      <p className="text-sm text-blue-700">Conceptos clave explicados</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-red-50 rounded-lg">
                    <Heart className="w-5 h-5 text-red-600" />
                    <div>
                      <h4 className="font-semibold text-red-900">Perspectiva Cultural</h4>
                      <p className="text-sm text-red-700">Contexto cultural relevante</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
                    <Users className="w-5 h-5 text-green-600" />
                    <div>
                      <h4 className="font-semibold text-green-900">Aplicación Práctica</h4>
                      <p className="text-sm text-green-700">Ejemplos de la vida real</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Example Content with Tooltips */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-3">
                  <Lightbulb className="w-6 h-6 text-yellow-600" />
                  Conceptos Fundamentales de WFG
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8 space-y-6">
                
                <div className="prose max-w-none">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Protección Financiera para tu Familia
                  </h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    En World Financial Group, creemos que la <DictionaryTerm termId="educacion_financiera">
                      educación financiera
                    </DictionaryTerm> es la base para construir un futuro próspero. 
                    Nuestros productos principales incluyen el <DictionaryTerm termId="seguro_vida">
                      seguro de vida
                    </DictionaryTerm>, que protege a tu familia cuando más lo necesita.
                  </p>
                  
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Para quienes planifican su jubilación, ofrecemos <DictionaryTerm termId="anualidad">
                      anualidades
                    </DictionaryTerm> que proporcionan ingresos estables y predecibles. 
                    Nuestro objetivo es ayudar a cada familia a alcanzar la verdadera <DictionaryTerm termId="prosperidad">
                      prosperidad
                    </DictionaryTerm> a través de estrategias financieras sólidas.
                  </p>

                  <div className="bg-gradient-to-r from-emerald-50 to-blue-50 border border-emerald-200 rounded-lg p-6 mt-6">
                    <h4 className="text-lg font-semibold text-emerald-800 mb-3">
                      La Filosofía del Equipo Santiago
                    </h4>
                    <p className="text-emerald-700 leading-relaxed">
                      Creemos que la <DictionaryTerm termId="educacion_financiera">
                        educación financiera
                      </DictionaryTerm> no es solo aprender sobre dinero, sino comprender cómo 
                      nuestras decisiones financieras afectan a toda la familia. Cada póliza de 
                      <DictionaryTerm termId="seguro_vida">seguro de vida</DictionaryTerm> representa 
                      un acto de amor, y cada <DictionaryTerm termId="anualidad">anualidad</DictionaryTerm> 
                      es una inversión en tranquilidad para el futuro.
                    </p>
                  </div>
                </div>

                {/* Interactive Learning Section */}
                <div className="border-t pt-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-purple-600" />
                    Aprende Interactivamente
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                      <h5 className="font-semibold text-purple-900 mb-2">
                        🔍 Términos Destacados
                      </h5>
                      <p className="text-sm text-purple-700">
                        Los términos con líneas punteadas son interactivos. 
                        Haz clic para ver definiciones detalladas.
                      </p>
                    </div>
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <h5 className="font-semibold text-blue-900 mb-2">
                        🌎 Perspectiva Cultural
                      </h5>
                      <p className="text-sm text-blue-700">
                        Cada término incluye contexto cultural específico 
                        para la comunidad hispana.
                      </p>
                    </div>
                  </div>
                </div>

              </CardContent>
            </Card>
          </motion.div>

          {/* How to Use Guide */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-0">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <BookOpen className="w-6 h-6" />
                  Cómo Usar el Diccionario
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="bg-white/20 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                      <span className="text-xl font-bold">1</span>
                    </div>
                    <h4 className="font-semibold mb-2">Busca términos destacados</h4>
                    <p className="text-indigo-100 text-sm">
                      Los términos interactivos aparecen con líneas punteadas y una pequeña estrella
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="bg-white/20 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                      <span className="text-xl font-bold">2</span>
                    </div>
                    <h4 className="font-semibold mb-2">Haz clic para explorar</h4>
                    <p className="text-indigo-100 text-sm">
                      Toca cualquier término para ver su definición, pronunciación y contexto cultural
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="bg-white/20 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                      <span className="text-xl font-bold">3</span>
                    </div>
                    <h4 className="font-semibold mb-2">Aprende y aplica</h4>
                    <p className="text-indigo-100 text-sm">
                      Usa los ejemplos y perspectivas culturales para aplicar el conocimiento
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

        </div>
      </main>
    </div>
  );
}