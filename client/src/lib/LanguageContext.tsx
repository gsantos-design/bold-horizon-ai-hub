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
    'nav.promotions': 'Promotions',
    'nav.growth_mindset': 'Growth Mindset',
    'nav.recruitment_journey': 'Recruitment Journey',
    'nav.career_quiz': 'Career Quiz',
    'nav.join_santiago_team': 'Come be part of the Santiago team at WFG',
    'nav.empower360': 'Empower360',
    'nav.team': 'Team',
    'nav.join_us': 'Join Us',
    'nav.ai_tools': 'AI Tools',
    'nav.leads': 'Leads',
    'nav.events': 'Events',
    'nav.board_view': 'Board View',
    'nav.admin': 'Admin',
    
    // Hero
    'hero.badge': 'Santiago Team - World Financial Group',
    'hero.title_part1': 'Protecting Those Who',
    'hero.title_part2': 'Protect Others',
    'hero.subtitle': 'From 30+ years in law enforcement to telecommunications expertise, the Santiago family transforms lives through financial education, building generational wealth, and protecting what matters most.',
    'hero.call_now': 'Call Now: (407) 777-1087',
    'hero.discover_mission': 'Discover Our Mission',
    'hero.protect_protectors': 'Protect the Protectors',
    'hero.protect_protectors_desc': "Pablo's 30+ years in law enforcement drives our mission to protect first responders and their families.",
    'hero.family_legacy': 'Family Legacy',
    'hero.family_legacy_desc': "Nolly's mission ensures every family has financial education to secure their future before it's too late.",
    'hero.entrepreneurial_wealth': 'Entrepreneurial Wealth',
    'hero.entrepreneurial_wealth_desc': 'Joseph empowers entrepreneurs to build real wealth through investment strategies and compound interest.',
    'hero.youth_education': 'Youth Education',
    'hero.youth_education_desc': 'Christian empowers young people to take control of their financial future through the new art of living.',
    
    // Calculator
    'calc.title': 'Commission Calculator',
    'calc.monthly_premium': 'Monthly Premium',
    'calc.your_rank': 'Your Rank',
    'calc.calculate': 'Calculate',
    'calc.results': 'Your Commission',
    'calc.annual_premium': 'Annual Premium',
    'calc.commission_amount': 'Commission Amount',
    'calc.points': 'Points',
    'calc.future': 'Calculate Your New Future',
    'calc.transform': 'Enter your current income to see how the Santiago Team system can transform your financial reality:',
    'calc.current_income': 'Your current monthly income',
    'calc.reveal': 'Reveal My Potential',
    'calc.real_results': 'Based on real results from our associates in your region',
    'calc.preview': 'Your Transformation Preview',
    'calc.current_monthly': 'Current Monthly',
    'calc.potential': 'Santiago Team Potential',
    'calc.increase': 'increase',
    'calc.with_income': 'With this income, you could:',
    'calc.pay_debt': 'Pay off all debt in',
    'calc.months': 'months',
    'calc.afford': 'Afford a',
    'calc.monthly_mortgage': 'monthly mortgage',
    'calc.build_savings': 'Build',
    'calc.in_savings': 'in savings over 5 years',
    'calc.see_projection': 'See detailed projection',
    'calc.recalculate': 'Recalculate',
    'calc.rat_race': 'Stuck in the rat race',
    
    // Career Quiz
    'quiz.title': 'Find Your Perfect Career Path',
    'quiz.subtitle': 'Discover your ideal role in the Bold Horizons with World Financial Group team with our personalized AI-powered career assessment.',
    'quiz.personal_info': 'Personal Info',
    'quiz.preferences': 'Preferences',
    'quiz.results': 'Results',
    'quiz.about_yourself': 'Tell us about yourself',
    'quiz.about_desc': 'We\'ll use this information to personalize your career path recommendation.',
    'quiz.fullname': 'Full Name',
    'quiz.email': 'Email Address',
    'quiz.email_desc': 'We\'ll send your personalized career path results to this email.',
    'quiz.background': 'Professional Background',
    'quiz.background_placeholder': 'Briefly describe your professional background, current situation, and why you\'re interested in a career with Bold Horizons with World Financial Group.',
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
    'about.team': 'Our Team',
    'about.values': 'Our Values',
    'about.success': 'Our Success Stories',
    
    // Team Building
    'team.title': 'Team Building',
    'team.subtitle': 'Build a successful team with our proven strategies',
    'team.leadership': 'Leadership',
    'team.recruitment': 'Recruitment',
    'team.mentorship': 'Mentorship',
    'team.retention': 'Retention',
    
    // Growth Mindset
    'growth.title': 'Growth Mindset',
    'growth.subtitle': 'Embracing challenges and continuous improvement',
    'growth.personal': 'Personal Development',
    'growth.professional': 'Professional Growth',
    'growth.mindset': 'Mindset Transformation',
    
    // Contact Form
    'contact.title': 'Contact Us',
    'contact.name': 'Your Name',
    'contact.email': 'Email Address',
    'contact.phone': 'Phone Number',
    'contact.message': 'Message',
    'contact.interest': 'Interest',
    'contact.submit': 'Submit',
    'contact.success': 'Message sent successfully!',
    
    // Footer
    'footer.rights': 'All rights reserved',
    'footer.disclaimer': 'This website is for recruitment purposes only and is not an offer of securities or insurance products.',
    
    // Language Toggle
    'language': 'English',
    'language.toggle': 'Español',
    'language.select': 'Select Language',
    
    // Career Constellation
    'constellation.eyebrow': 'Career Path Visualization',
    'constellation.title': 'Your Journey Through The Stars',
    'constellation.subtitle': 'Explore the Bold Horizons with World Financial Group career path represented as a cosmic constellation. Each point represents a professional milestone in your journey.',
    'constellation.stop_rotation': 'Stop Rotation',
    'constellation.auto_rotate': 'Auto Rotate',
    'constellation.zoom_in': 'Zoom In',
    'constellation.zoom_out': 'Zoom Out',
    'constellation.help_text': 'Click and drag to rotate • Click a point to explore',
    'constellation.progression_path': 'Progression Path',
    'constellation.cta': 'Find Your Place In The Constellation',
    
    // Constellation Points
    'constellation.associate.title': 'Associate',
    'constellation.associate.subtitle': 'Beginning of your journey',
    'constellation.associate.description': 'The entry point into the Bold Horizons with World Financial Group business, where you start learning the basics and building your foundation.',
    'constellation.associate.req1': 'Join the team',
    'constellation.associate.req2': 'Complete basic training',
    'constellation.associate.req3': 'Obtain required licenses',
    'constellation.associate.benefit1': 'Access to product training',
    'constellation.associate.benefit2': 'Mentorship from experienced leaders',
    'constellation.associate.benefit3': 'Foundation for building your business',
    
    'constellation.md.title': 'Marketing Director',
    'constellation.md.subtitle': 'Building your team',
    'constellation.md.description': 'At this level, you begin to build your team while continuing to expand your client base and increasing your product knowledge.',
    'constellation.md.req1': 'Recruit team members',
    'constellation.md.req2': 'Meet monthly production goals',
    'constellation.md.req3': 'Complete advanced training',
    'constellation.md.benefit1': 'Increased commission rates',
    'constellation.md.benefit2': 'Leadership development',
    'constellation.md.benefit3': 'Team override commissions',
    
    'constellation.smd.title': 'Senior Marketing Director',
    'constellation.smd.subtitle': 'Expanding your influence',
    'constellation.smd.description': 'A key leadership position where you begin developing leaders within your organization and creating significant impact.',
    'constellation.smd.req1': 'Develop multiple Marketing Directors',
    'constellation.smd.req2': 'Achieve consistent team production',
    'constellation.smd.req3': 'Demonstrate leadership excellence',
    'constellation.smd.benefit1': 'Higher commission structure',
    'constellation.smd.benefit2': 'Multiple levels of overrides',
    'constellation.smd.benefit3': 'Leadership bonus pools',
    
    'constellation.emd.title': 'Executive Marketing Director',
    'constellation.emd.subtitle': 'Creating a powerful organization',
    'constellation.emd.description': 'At this advanced level, you lead multiple teams and develop a strong organization structure with proven systems.',
    'constellation.emd.req1': 'Develop multiple SMDs',
    'constellation.emd.req2': 'Build a sustainable organization',
    'constellation.emd.req3': 'Create effective business systems',
    'constellation.emd.benefit1': 'Executive-level compensation',
    'constellation.emd.benefit2': 'Deep organization overrides',
    'constellation.emd.benefit3': 'Enhanced business support',
    
    'constellation.semd.title': 'Senior Executive Marketing Director',
    'constellation.semd.subtitle': 'Leadership excellence',
    'constellation.semd.description': 'A rare achievement representing extraordinary leadership and business development success.',
    'constellation.semd.req1': 'Develop multiple EMDs',
    'constellation.semd.req2': 'Achieve major organization milestones',
    'constellation.semd.req3': 'Demonstrate consistent excellence',
    'constellation.semd.benefit1': 'Premier commission structure',
    'constellation.semd.benefit2': 'Executive leadership bonuses',
    'constellation.semd.benefit3': 'Legacy building opportunities',
    
    'constellation.ceomd.title': 'CEO Marketing Director',
    'constellation.ceomd.subtitle': 'Pinnacle of success',
    'constellation.ceomd.description': 'The pinnacle achievement in the Bold Horizons with World Financial Group business, representing extraordinary impact and organizational success.',
    'constellation.ceomd.req1': 'Build a massive organization',
    'constellation.ceomd.req2': 'Develop multiple SEMDs',
    'constellation.ceomd.req3': 'Create a lasting business legacy',
    'constellation.ceomd.benefit1': 'Maximum commission structure',
    'constellation.ceomd.benefit2': 'Multiple executive bonus pools',
    'constellation.ceomd.benefit3': 'Transformational impact potential',
  },
  es: {
    // Header
    'nav.home': 'Inicio',
    'nav.compensation': 'Compensación',
    'nav.team_building': 'Formación de Equipos',
    'nav.resources': 'Recursos',
    'nav.about_us': 'Sobre Nosotros',
    'nav.contact': 'Contacto',
    'nav.promotions': 'Promociones',
    'nav.growth_mindset': 'Mentalidad de Crecimiento',
    'nav.recruitment_journey': 'Proceso de Reclutamiento',
    'nav.career_quiz': 'Test de Carrera',
    'nav.join_santiago_team': 'Ven a ser parte del equipo Santiago en WFG',
    'nav.empower360': 'Empower360',
    'nav.team': 'Equipo',
    'nav.join_us': 'Únete',
    'nav.ai_tools': 'Herramientas IA',
    'nav.leads': 'Contactos',
    'nav.events': 'Eventos',
    'nav.board_view': 'Vista Tablero',
    'nav.admin': 'Administración',
    
    // Hero
    'hero.badge': 'Equipo Santiago - World Financial Group',
    'hero.title_part1': 'Protegiendo a Quienes',
    'hero.title_part2': 'Protegen a Otros',
    'hero.subtitle': 'Desde más de 30 años en aplicación de la ley hasta experiencia en telecomunicaciones, la familia Santiago transforma vidas a través de educación financiera, construyendo riqueza generacional y protegiendo lo que más importa.',
    'hero.call_now': 'Llama Ahora: (407) 777-1087',
    'hero.discover_mission': 'Descubre Nuestra Misión',
    'hero.protect_protectors': 'Proteger a los Protectores',
    'hero.protect_protectors_desc': 'Los más de 30 años de Pablo en aplicación de la ley impulsan nuestra misión de proteger a los socorristas y sus familias.',
    'hero.family_legacy': 'Legado Familiar',
    'hero.family_legacy_desc': 'La misión de Nolly asegura que cada familia tenga educación financiera para asegurar su futuro antes de que sea demasiado tarde.',
    'hero.entrepreneurial_wealth': 'Riqueza Empresarial',
    'hero.entrepreneurial_wealth_desc': 'Joseph capacita a empresarios para construir riqueza real a través de estrategias de inversión e interés compuesto.',
    'hero.youth_education': 'Educación Juvenil',
    'hero.youth_education_desc': 'Christian capacita a los jóvenes para tomar control de su futuro financiero a través del nuevo arte de vivir.',
    'hero.join_team': 'Únete al Equipo Santiago y escapa de lo ordinario. Descubre cómo nuestros asociados están construyendo riqueza transformadora en el Caribe, Florida y Nueva York.',
    'hero.featured': 'Como se destaca en:',
    'hero.followers': '25K+ Seguidores',
    'hero.associates': '5000+ Asociados',
    
    // Calculator
    'calc.title': 'Calculadora de Comisiones',
    'calc.monthly_premium': 'Prima Mensual',
    'calc.your_rank': 'Tu Rango',
    'calc.calculate': 'Calcular',
    'calc.results': 'Tu Comisión',
    'calc.annual_premium': 'Prima Anual',
    'calc.commission_amount': 'Monto de Comisión',
    'calc.points': 'Puntos',
    'calc.future': 'Calcula Tu Nuevo Futuro',
    'calc.transform': 'Ingresa tus ingresos actuales para ver cómo el sistema del Equipo Santiago puede transformar tu realidad financiera:',
    'calc.current_income': 'Tu ingreso mensual actual',
    'calc.reveal': 'Revela Mi Potencial',
    'calc.real_results': 'Basado en resultados reales de nuestros asociados en tu región',
    'calc.preview': 'Vista Previa de Tu Transformación',
    'calc.current_monthly': 'Mensual Actual',
    'calc.potential': 'Potencial con Equipo Santiago',
    'calc.increase': 'incremento',
    'calc.with_income': 'Con estos ingresos, podrías:',
    'calc.pay_debt': 'Pagar todas tus deudas en',
    'calc.months': 'meses',
    'calc.afford': 'Permitirte una hipoteca de',
    'calc.monthly_mortgage': 'mensuales',
    'calc.build_savings': 'Acumular',
    'calc.in_savings': 'en ahorros durante 5 años',
    'calc.see_projection': 'Ver proyección detallada',
    'calc.recalculate': 'Recalcular',
    'calc.rat_race': 'Atrapado en la rutina diaria',
    
    // Career Quiz
    'quiz.title': 'Encuentra Tu Camino Profesional Perfecto',
    'quiz.subtitle': 'Descubre tu rol ideal en el equipo de Horizontes Audaces con World Financial Group con nuestra evaluación personalizada impulsada por IA.',
    'quiz.personal_info': 'Información Personal',
    'quiz.preferences': 'Preferencias',
    'quiz.results': 'Resultados',
    'quiz.about_yourself': 'Cuéntanos sobre ti',
    'quiz.about_desc': 'Utilizaremos esta información para personalizar la recomendación de tu trayectoria profesional.',
    'quiz.fullname': 'Nombre Completo',
    'quiz.email': 'Correo Electrónico',
    'quiz.email_desc': 'Enviaremos los resultados de tu trayectoria profesional personalizada a este correo.',
    'quiz.background': 'Experiencia Profesional',
    'quiz.background_placeholder': 'Describe brevemente tu experiencia profesional, situación actual y por qué estás interesado en una carrera con Horizontes Audaces con World Financial Group.',
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
    'about.team': 'Nuestro Equipo',
    'about.values': 'Nuestros Valores',
    'about.success': 'Nuestras Historias de Éxito',
    
    // Team Building
    'team.title': 'Formación de Equipos',
    'team.subtitle': 'Construye un equipo exitoso con nuestras estrategias probadas',
    'team.leadership': 'Liderazgo',
    'team.recruitment': 'Reclutamiento',
    'team.mentorship': 'Mentoría',
    'team.retention': 'Retención',
    
    // Growth Mindset
    'growth.title': 'Mentalidad de Crecimiento',
    'growth.subtitle': 'Aceptando desafíos y mejora continua',
    'growth.personal': 'Desarrollo Personal',
    'growth.professional': 'Crecimiento Profesional',
    'growth.mindset': 'Transformación de Mentalidad',
    
    // Contact Form
    'contact.title': 'Contáctanos',
    'contact.name': 'Tu Nombre',
    'contact.email': 'Correo Electrónico',
    'contact.phone': 'Número de Teléfono',
    'contact.message': 'Mensaje',
    'contact.interest': 'Interés',
    'contact.submit': 'Enviar',
    'contact.success': '¡Mensaje enviado con éxito!',
    
    // Footer
    'footer.rights': 'Todos los derechos reservados',
    'footer.disclaimer': 'Este sitio web es solo para fines de reclutamiento y no constituye una oferta de valores o productos de seguros.',
    
    // Language Toggle
    'language': 'Español',
    'language.toggle': 'English',
    'language.select': 'Seleccionar Idioma',
    
    // Career Constellation
    'constellation.eyebrow': 'Visualización de Carrera Profesional',
    'constellation.title': 'Tu Viaje A Través De Las Estrellas',
    'constellation.subtitle': 'Explora el camino profesional de Horizontes Audaces con World Financial Group representado como una constelación cósmica. Cada punto representa un hito profesional en tu viaje.',
    'constellation.stop_rotation': 'Detener Rotación',
    'constellation.auto_rotate': 'Rotación Automática',
    'constellation.zoom_in': 'Acercar',
    'constellation.zoom_out': 'Alejar',
    'constellation.help_text': 'Haz clic y arrastra para rotar • Haz clic en un punto para explorar',
    'constellation.progression_path': 'Camino de Progresión',
    'constellation.cta': 'Encuentra Tu Lugar En La Constelación',
    
    // Constellation Points
    'constellation.associate.title': 'Asociado',
    'constellation.associate.subtitle': 'Comienzo de tu viaje',
    'constellation.associate.description': 'El punto de entrada al negocio de Horizontes Audaces con World Financial Group, donde comienzas a aprender lo básico y construir tu base.',
    'constellation.associate.req1': 'Únete al equipo',
    'constellation.associate.req2': 'Completa el entrenamiento básico',
    'constellation.associate.req3': 'Obtén las licencias requeridas',
    'constellation.associate.benefit1': 'Acceso a capacitación de productos',
    'constellation.associate.benefit2': 'Mentoría de líderes experimentados',
    'constellation.associate.benefit3': 'Base para construir tu negocio',
    
    'constellation.md.title': 'Director de Marketing',
    'constellation.md.subtitle': 'Construyendo tu equipo',
    'constellation.md.description': 'En este nivel, comienzas a construir tu equipo mientras continúas expandiendo tu base de clientes y aumentando tu conocimiento del producto.',
    'constellation.md.req1': 'Reclutar miembros del equipo',
    'constellation.md.req2': 'Cumplir con los objetivos de producción mensuales',
    'constellation.md.req3': 'Completar capacitación avanzada',
    'constellation.md.benefit1': 'Tasas de comisión aumentadas',
    'constellation.md.benefit2': 'Desarrollo de liderazgo',
    'constellation.md.benefit3': 'Comisiones por ventas de equipo',
    
    'constellation.smd.title': 'Director Senior de Marketing',
    'constellation.smd.subtitle': 'Expandiendo tu influencia',
    'constellation.smd.description': 'Una posición clave de liderazgo donde comienzas a desarrollar líderes dentro de tu organización y crear un impacto significativo.',
    'constellation.smd.req1': 'Desarrollar múltiples Directores de Marketing',
    'constellation.smd.req2': 'Lograr producción constante del equipo',
    'constellation.smd.req3': 'Demostrar excelencia en liderazgo',
    'constellation.smd.benefit1': 'Estructura de comisiones más alta',
    'constellation.smd.benefit2': 'Múltiples niveles de comisiones',
    'constellation.smd.benefit3': 'Bonos de liderazgo',
    
    'constellation.emd.title': 'Director Ejecutivo de Marketing',
    'constellation.emd.subtitle': 'Creando una organización poderosa',
    'constellation.emd.description': 'En este nivel avanzado, lideras múltiples equipos y desarrollas una estructura organizativa sólida con sistemas probados.',
    'constellation.emd.req1': 'Desarrollar múltiples SMDs',
    'constellation.emd.req2': 'Construir una organización sostenible',
    'constellation.emd.req3': 'Crear sistemas de negocio efectivos',
    'constellation.emd.benefit1': 'Compensación de nivel ejecutivo',
    'constellation.emd.benefit2': 'Comisiones de organización profunda',
    'constellation.emd.benefit3': 'Soporte empresarial mejorado',
    
    'constellation.semd.title': 'Director Ejecutivo Senior de Marketing',
    'constellation.semd.subtitle': 'Excelencia en liderazgo',
    'constellation.semd.description': 'Un logro excepcional que representa un liderazgo extraordinario y éxito en el desarrollo empresarial.',
    'constellation.semd.req1': 'Desarrollar múltiples EMDs',
    'constellation.semd.req2': 'Alcanzar hitos organizacionales importantes',
    'constellation.semd.req3': 'Demostrar excelencia consistente',
    'constellation.semd.benefit1': 'Estructura de comisiones premium',
    'constellation.semd.benefit2': 'Bonos de liderazgo ejecutivo',
    'constellation.semd.benefit3': 'Oportunidades para construir legado',
    
    'constellation.ceomd.title': 'Director de Marketing CEO',
    'constellation.ceomd.subtitle': 'Cúspide del éxito',
    'constellation.ceomd.description': 'El logro máximo en el negocio de Horizontes Audaces con World Financial Group, representando un impacto extraordinario y éxito organizacional.',
    'constellation.ceomd.req1': 'Construir una organización masiva',
    'constellation.ceomd.req2': 'Desarrollar múltiples SEMDs',
    'constellation.ceomd.req3': 'Crear un legado empresarial duradero',
    'constellation.ceomd.benefit1': 'Estructura de comisiones máxima',
    'constellation.ceomd.benefit2': 'Múltiples bonos ejecutivos',
    'constellation.ceomd.benefit3': 'Potencial de impacto transformador',
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