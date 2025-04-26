import React, { createContext, useContext, useState, useEffect } from 'react';

// Define available languages
export type Language = 'en' | 'es';

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
};

// Create context with default values
const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: (key: string) => key,
});

// Dictionary of translations
export const translations: Record<Language, Record<string, string>> = {
  en: {
    // Header
    'nav.home': 'Home',
    'nav.compensation': 'Compensation',
    'nav.team_building': 'Team Building',
    'nav.resources': 'Resources',
    'nav.about_us': 'About Us',
    'nav.contact': 'Contact',
    
    // Hero
    'hero.title': 'Bold Horizons with World Financial Group',
    'hero.subtitle': 'Transform your financial future with the Santiago Team',
    'hero.cta': 'Join Our Team',
    'hero.learn_more': 'Learn More',
    
    // Calculator
    'calc.title': 'Commission Calculator',
    'calc.monthly_premium': 'Monthly Premium',
    'calc.your_rank': 'Your Rank',
    'calc.calculate': 'Calculate',
    'calc.results': 'Your Commission',
    
    // Career Quiz
    'quiz.title': 'Find Your Perfect Career Path',
    'quiz.subtitle': 'Discover your ideal role in the World Financial Group team with our personalized AI-powered career assessment.',
    'quiz.personal_info': 'Personal Info',
    'quiz.preferences': 'Preferences',
    'quiz.results': 'Results',
    'quiz.about_yourself': 'Tell us about yourself',
    'quiz.about_desc': 'We\'ll use this information to personalize your career path recommendation.',
    'quiz.fullname': 'Full Name',
    'quiz.email': 'Email Address',
    'quiz.email_desc': 'We\'ll send your personalized career path results to this email.',
    'quiz.background': 'Professional Background',
    'quiz.background_placeholder': 'Briefly describe your professional background, current situation, and why you\'re interested in a career with World Financial Group.',
    'quiz.skills': 'Your Skills',
    'quiz.skills_desc': 'Select all the skills you possess or are confident you can develop.',
    'quiz.motivations': 'Your Motivations',
    'quiz.motivations_desc': 'What drives you most in your career? Select all that apply.',
    'quiz.values': 'Your Values',
    'quiz.values_desc': 'Which values are most important to you in your work environment?',
    'quiz.work_style': 'Your Work Style',
    'quiz.work_style_desc': 'How would you describe your preferred way of working?',
    'quiz.financial_goals': 'Your Financial Goals',
    'quiz.financial_goals_desc': 'What are your primary financial objectives right now?',
    'quiz.back': 'Back',
    'quiz.next': 'Next',
    'quiz.submit': 'Submit',
    'quiz.analyzing': 'Analyzing...',
    'quiz.recommendation_title': 'Your Personalized Career Recommendation',
    'quiz.recommendation_subtitle': 'Based on your unique skills, values, and goals',
    'quiz.ai_powered': 'AI-Powered Recommendation',
    'quiz.strengths': 'Your Strengths',
    'quiz.development': 'Development Areas',
    'quiz.next_steps': 'Next Steps for Success',
    'quiz.timeframe': 'Estimated Timeframe',
    'quiz.retake': 'Retake Quiz',
    
    // About
    'about.title': 'About The Santiago Team',
    'about.mission': 'Our Mission',
    
    // Footer
    'footer.rights': 'All rights reserved',
    'footer.disclaimer': 'This website is for recruitment purposes only and is not an offer of securities or insurance products.',
    
    // Language Toggle
    'language': 'English',
    'language.toggle': 'Español',
  },
  es: {
    // Header
    'nav.home': 'Inicio',
    'nav.compensation': 'Compensación',
    'nav.team_building': 'Formación de Equipos',
    'nav.resources': 'Recursos',
    'nav.about_us': 'Sobre Nosotros',
    'nav.contact': 'Contacto',
    
    // Hero
    'hero.title': 'Horizontes Audaces con World Financial Group',
    'hero.subtitle': 'Transforma tu futuro financiero con el Equipo Santiago',
    'hero.cta': 'Únete a Nuestro Equipo',
    'hero.learn_more': 'Más Información',
    
    // Calculator
    'calc.title': 'Calculadora de Comisiones',
    'calc.monthly_premium': 'Prima Mensual',
    'calc.your_rank': 'Tu Rango',
    'calc.calculate': 'Calcular',
    'calc.results': 'Tu Comisión',
    
    // Career Quiz
    'quiz.title': 'Encuentra Tu Camino Profesional Perfecto',
    'quiz.subtitle': 'Descubre tu rol ideal en el equipo de World Financial Group con nuestra evaluación personalizada impulsada por IA.',
    'quiz.personal_info': 'Información Personal',
    'quiz.preferences': 'Preferencias',
    'quiz.results': 'Resultados',
    'quiz.about_yourself': 'Cuéntanos sobre ti',
    'quiz.about_desc': 'Utilizaremos esta información para personalizar la recomendación de tu trayectoria profesional.',
    'quiz.fullname': 'Nombre Completo',
    'quiz.email': 'Correo Electrónico',
    'quiz.email_desc': 'Enviaremos los resultados de tu trayectoria profesional personalizada a este correo.',
    'quiz.background': 'Experiencia Profesional',
    'quiz.background_placeholder': 'Describe brevemente tu experiencia profesional, situación actual y por qué estás interesado en una carrera con World Financial Group.',
    'quiz.skills': 'Tus Habilidades',
    'quiz.skills_desc': 'Selecciona todas las habilidades que posees o que confías en desarrollar.',
    'quiz.motivations': 'Tus Motivaciones',
    'quiz.motivations_desc': '¿Qué te impulsa más en tu carrera? Selecciona todo lo que aplique.',
    'quiz.values': 'Tus Valores',
    'quiz.values_desc': '¿Qué valores son más importantes para ti en tu entorno laboral?',
    'quiz.work_style': 'Tu Estilo de Trabajo',
    'quiz.work_style_desc': '¿Cómo describirías tu forma preferida de trabajar?',
    'quiz.financial_goals': 'Tus Objetivos Financieros',
    'quiz.financial_goals_desc': '¿Cuáles son tus principales objetivos financieros en este momento?',
    'quiz.back': 'Atrás',
    'quiz.next': 'Siguiente',
    'quiz.submit': 'Enviar',
    'quiz.analyzing': 'Analizando...',
    'quiz.recommendation_title': 'Tu Recomendación Profesional Personalizada',
    'quiz.recommendation_subtitle': 'Basada en tus habilidades, valores y objetivos únicos',
    'quiz.ai_powered': 'Recomendación Impulsada por IA',
    'quiz.strengths': 'Tus Fortalezas',
    'quiz.development': 'Áreas de Desarrollo',
    'quiz.next_steps': 'Próximos Pasos para el Éxito',
    'quiz.timeframe': 'Plazo Estimado',
    'quiz.retake': 'Volver a Realizar',
    
    // About
    'about.title': 'Acerca del Equipo Santiago',
    'about.mission': 'Nuestra Misión',
    
    // Footer
    'footer.rights': 'Todos los derechos reservados',
    'footer.disclaimer': 'Este sitio web es solo para fines de reclutamiento y no constituye una oferta de valores o productos de seguros.',
    
    // Language Toggle
    'language': 'Español',
    'language.toggle': 'English',
  }
};

// Spanish versions of quiz options
export const skillsOptionsEs = [
  { id: "communication", label: "Comunicación" },
  { id: "sales", label: "Ventas" },
  { id: "leadership", label: "Liderazgo" },
  { id: "financial-knowledge", label: "Conocimiento Financiero" },
  { id: "networking", label: "Networking" },
  { id: "technology", label: "Tecnología" },
  { id: "customer-service", label: "Servicio al Cliente" },
  { id: "problem-solving", label: "Resolución de Problemas" },
  { id: "organization", label: "Organización" },
  { id: "public-speaking", label: "Hablar en Público" },
];

export const motivationsOptionsEs = [
  { id: "financial-independence", label: "Independencia Financiera" },
  { id: "helping-others", label: "Ayudar a Otros" },
  { id: "career-growth", label: "Crecimiento Profesional" },
  { id: "work-life-balance", label: "Equilibrio Trabajo-Vida" },
  { id: "recognition", label: "Reconocimiento" },
  { id: "building-business", label: "Construir un Negocio" },
  { id: "personal-development", label: "Desarrollo Personal" },
  { id: "legacy", label: "Crear un Legado" },
  { id: "community-impact", label: "Impacto en la Comunidad" },
];

export const valuesOptionsEs = [
  { id: "integrity", label: "Integridad" },
  { id: "excellence", label: "Excelencia" },
  { id: "teamwork", label: "Trabajo en Equipo" },
  { id: "innovation", label: "Innovación" },
  { id: "accountability", label: "Responsabilidad" },
  { id: "service", label: "Servicio" },
  { id: "continuous-learning", label: "Aprendizaje Continuo" },
  { id: "diversity", label: "Diversidad" },
  { id: "trust", label: "Confianza" },
];

export const workStyleOptionsEs = [
  { id: "independent", label: "Trabajador Independiente" },
  { id: "team-player", label: "Jugador de Equipo" },
  { id: "leader", label: "Líder" },
  { id: "detail-oriented", label: "Orientado al Detalle" },
  { id: "big-picture", label: "Pensador de Panorama Amplio" },
  { id: "adaptable", label: "Adaptable" },
  { id: "structured", label: "Estructurado" },
  { id: "creative", label: "Creativo" },
  { id: "analytical", label: "Analítico" },
];

export const financialGoalsOptionsEs = [
  { id: "supplement-income", label: "Complementar Ingresos Actuales" },
  { id: "replace-income", label: "Reemplazar Ingresos Actuales" },
  { id: "financial-freedom", label: "Lograr Libertad Financiera" },
  { id: "build-wealth", label: "Construir Riqueza a Largo Plazo" },
  { id: "create-legacy", label: "Crear un Legado Financiero" },
];

// Provider component
export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Try to get language from local storage, default to English
  const [language, setLanguage] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem('language');
    return (savedLanguage === 'en' || savedLanguage === 'es') ? savedLanguage : 'en';
  });

  // Save language preference to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('language', language);
    // Update document language for accessibility
    document.documentElement.lang = language;
  }, [language]);

  // Translation function
  const t = (key: string): string => {
    if (translations[language] && translations[language][key]) {
      return translations[language][key];
    }
    // Fallback to English or the key itself if translation not found
    return translations['en'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use the language context
export const useLanguage = () => useContext(LanguageContext);