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
    
    // Team Santiago Page Content
    'team.about_title': 'About the Santiago Team',
    'team.about_subtitle': 'Four generations united by service, driven by mission',
    'team.our_story': 'Our Story',
    'team.story_text': 'The Santiago family story begins with service and sacrifice. Pablo\'s 30+ years protecting communities as NYPD and Orange County law enforcement, combined with Nolly\'s two decades serving businesses in telecommunications, created a foundation of dedication to others.',
    'team.our_transformation': 'Our Transformation',
    'team.transformation_text': 'After Pablo survived a major heart attack and realized the financial vulnerabilities that even dedicated servants face, our family discovered World Financial Group. For the first time, we learned how money really works and how to protect families from life\'s uncertainties.',
    'team.our_mission_today': 'Our Mission Today',
    'team.mission_today_text': 'Now, with Joseph\'s investment expertise and Christian\'s passion for educating young people, we\'re four family members strong, united in helping families break free from financial uncertainty and build lasting generational wealth.',
    'team.our_impact': 'Our Impact with WFG',
    'team.families_served': 'Families Served',
    'team.years_experience': 'Years Experience',
    'team.financial_plans': 'Financial Plans',
    'team.family_commitment': 'Family Commitment',
    'team.ready_secure': 'Ready to Secure Your Family\'s Future?',
    'team.join_thousands': 'Join thousands of families who\'ve transformed their financial future with the Santiago Team.',
    'team.start_journey': 'Start Your Journey Today',
    'team.how_we_serve': 'How We Serve You',
    
    // Services Section
    'services.financial_protection': 'Financial Protection',
    'services.financial_protection_desc': 'Comprehensive strategies to protect your income and build tax-free wealth for your family\'s future.',
    'services.business_building': 'Business Building',
    'services.business_building_desc': 'Entrepreneurial opportunities and multiple income streams to create lasting financial independence.',
    'services.family_legacy': 'Family Legacy',
    'services.family_legacy_desc': 'Generational wealth strategies that ensure your family\'s security for decades to come.',
    'services.meet_family': 'Meet the Santiago Family',
    'services.meet_family_desc': 'Four generations united in transforming lives through financial education',
    
    // AI Career Mentor Section
    'ai.badge': '🤖 NEW: AI Career Mentor',
    'ai.title': 'AI Career Mentor with Emotional Intelligence',
    'ai.description': 'Get personalized career guidance powered by the Santiago Team\'s expertise. Our AI mentor understands your emotions and provides tailored advice for your WFG journey.',
    'ai.start_chat': 'Start Career Chat',
    'ai.schedule_call': 'Schedule 1-on-1 Call',
    
    // Team Leaders Section
    'leaders.title': 'THE SANTIAGO TEAM',
    'leaders.subtitle': 'Pablo & Nolly Santiago - Team Leaders',
    'leaders.mission': 'Empowering Families Through The New Art of Living',
    
    // Contact Information
    'contact.call_team': 'Call The Santiago Team',
    'contact.schedule_consultation': 'Schedule Your Consultation',
    'contact.email_me': 'Email Me',
    'contact.location': 'Location',
    'contact.office_hours': 'Office Hours',
    'contact.languages': 'Languages',
    'contact.spanish_english': 'Spanish/English',
    
    // New Art of Living Section
    'living.title': 'The New Art of Living: Empowering Families',
    'living.multi_income': 'Multi-Handed Income',
    'living.multi_income_desc': 'Create multiple streams of income to build lasting wealth',
    'living.financial_education': 'Financial Education',
    'living.financial_education_desc': 'Learn the strategies that truly build generational wealth',
    'living.self_improvement': 'Self Improvement',
    'living.self_improvement_desc': 'Develop the mindset and skills for lasting success',
    
    // Building Entrepreneurs Section
    'entrepreneurs.title': 'Building Entrepreneurs',
    'entrepreneurs.subtitle': 'Master The New Art of Living',
    'entrepreneurs.join_team': 'Join the Santiago Team',
    'entrepreneurs.description': 'Ready to transform your life and help others do the same? Our proven system combines multi-handed income strategies, comprehensive financial education, and personal development to create extraordinary results.',
    'entrepreneurs.community': 'Join the Santiago team and become part of a community dedicated to empowering families across Florida and New York. Learn the new art of living while building a business that makes a real difference.',
    'entrepreneurs.start_journey': 'Start Your Journey',
    'entrepreneurs.call_pablo_nolly': 'Call Pablo & Nolly',
    
    // Form Labels
    'form.your_name': 'Your Name',
    'form.email_address': 'Email Address',
    'form.first_name': 'First Name',
    'form.last_name': 'Last Name',
    'form.mobile': 'Mobile',
    'form.download_now': 'Download Now',
    'form.schedule_appointment': 'Schedule Appointment',
    
    // Office Information
    'office.about_office': 'About Pablo & Nolly\'s Office',
    'office.office_location': 'Office Location',
    'office.office_hours': 'Office Hours',
    'office.click_office_hours': 'Click to See Office Hours',
    'office.monday': 'Monday',
    'office.tuesday': 'Tuesday',
    'office.wednesday': 'Wednesday',
    'office.thursday': 'Thursday',
    'office.friday': 'Friday',
    'office.saturday': 'Saturday',
    'office.sunday': 'Sunday',
    'office.closed': 'Closed',
    
    // Team Member Profiles
    'team.nolly_bio_1': 'I\'ve spent over two decades in telecommunications, working as an account executive and serving small and medium-sized businesses. Those businesses have always reminded me of my parents — hardworking, dedicated, and doing whatever it takes to provide for their families.',
    'team.nolly_bio_2': 'Both of my parents passed away far too early. I\'m deeply grateful for the sacrifices they made, but they never had the chance to teach me about financial education. The truth is, they didn\'t know much about it themselves — and like many families, we were never shown how to build real financial security.',
    'team.nolly_bio_3': 'That changed when I came to WFG. For the first time, I learned how money really works — and more importantly, how to protect families from the uncertainties life throws our way.',
    'team.nolly_bio_4': 'Now, my mission is simple: to educate and empower others so they can create financial freedom, build multiple streams of income, and protect what matters most. Because every family deserves the knowledge and tools to secure their future — before it\'s too late.',
    
    'team.pablo_bio_title': 'My Story, My Mission',
    'team.pablo_bio_1': 'For over 30 years, I served with the NYPD and Orange County law enforcement. I stood side by side with my brothers and sisters — protecting strangers, running toward danger, and sacrificing time with my family because that\'s what the job demands.',
    'team.pablo_bio_2': 'The day I survived a major heart attack, I saw a truth I wish I\'d known earlier: if I couldn\'t go back to work, my family would be left struggling. My pension wouldn\'t have been enough. My 401(k) was filled with hidden taxes and restrictions.',
    'team.pablo_bio_3': 'Now, my mission is clear: to protect the protectors. I educate and empower first responders to safeguard their income and build tax-free wealth using strategies the job never told us about.',
    'team.pablo_bio_4': 'We\'ve spent our careers protecting the public. It\'s time to protect our own.',
    
    // Additional Team Members
    'team.princhesca_title': 'Licensed Life Insurance Agent',
    'team.princhesca_company': 'Owner, Rainier Tax Services LLC',
    'team.princhesca_bio_1': 'Princhesca Rainier Turner is a Licensed Life Insurance Agent and the owner of Rainier Tax Services LLC. With more than 10 years of experience in financial services, she specializes in life insurance and annuities, personal and business tax planning and preparation, bookkeeping, and LLC formation.',
    'team.princhesca_bio_2': 'Her mission is to empower families, small business owners, and young professionals through financial education and customized solutions. Before entering the financial industry, Princhesca built a strong foundation in telecommunications, excelling in customer service, project management, and sales leadership.',
    'team.princhesca_bio_3': 'Rainier Tax Services was originally founded by her father in the 1990s. After his passing in 2018, Princhesca proudly took over the business to continue his legacy of service and integrity.',
    'team.princhesca_service_1': 'Life Insurance & Annuities',
    'team.princhesca_service_2': 'Tax Preparation',
    'team.princhesca_service_3': 'Business Formation',
    'team.princhesca_service_4': 'Bookkeeping Services',
    
    'team.joseph_title': 'Associate – World Financial Group',
    'team.joseph_bio_1': 'I\'m excited to join the WFG team — a team that\'s also my family. I earned my investment license right out of high school, and later graduated with a degree in Finance. From day one, I knew I wanted to use my skills to help people take control of their money and their future.',
    'team.joseph_bio_2': 'I grew up watching my parents work incredibly hard, sacrificing countless holidays and summers in service to others. That dedication taught me discipline and commitment, but it also showed me a hard truth: without financial education, even the most dedicated people can be left unprotected.',
    'team.joseph_bio_3': 'My mission is to build lasting financial wealth, gain true freedom, and create a legacy that lasts for generations. If you have the heart of an entrepreneur and want to build real wealth, let\'s connect. I\'ve got you, brother.',
    'team.joseph_skill_1': 'Investment License',
    'team.joseph_skill_2': 'Finance Degree',
    'team.joseph_skill_3': 'Wealth Building',
    
    'team.christian_title': 'Associate – World Financial Group',
    'team.christian_bio_1': 'I\'m Christian Santiago. I recently graduated and, like my twin brother Joseph, I\'ve chosen to join my family\'s mission at WFG. I\'ve always been a bit of an introvert, keeping my circle small, but I\'m deeply loyal to the people I care about. Numbers have always been my strength — I\'ve loved math for as long as I can remember — but what truly grabbed my attention was learning about the power of compound interest.',
    'team.christian_bio_2': 'It wasn\'t something I was ever taught in school, and my first reaction was: Why isn\'t this in schools? Everyone should know this. That moment sparked a passion in me to share this knowledge with others — especially with the younger generation.',
    'team.christian_bio_3': 'I believe in empowering people to dream again, to rebuild self-belief, and to gain the confidence to create their own financial future. I see this as a new art of living — one where we use knowledge, entrepreneurship, and discipline to build not just wealth, but a lasting legacy.',
    'team.christian_bio_4': 'My mission is to help young people understand that they have the power to take control of their money, their choices, and their future — starting today.',
    'team.christian_skill_1': 'Mathematics & Analytics',
    'team.christian_skill_2': 'Compound Interest Expert',
    'team.christian_skill_3': 'Youth Financial Education',
    
    // Educational Content
    'education.philosophy_title': 'Financial Education Philosophy',
    'education.philosophy_subtitle': 'Empowering families through financial education and opportunity awareness',
    'education.multi_income_title': 'Multi-Handed Income Education',
    'education.multi_income_desc': 'Learn about creating multiple streams of income through financial education and opportunity. Our educational approach helps you understand strategies to diversify income sources and build lasting financial security through comprehensive learning programs.',
    'education.literacy_title': 'Financial Education & Literacy',
    'education.literacy_desc': 'Access financial education that covers fundamental money concepts and wealth-building strategies. We provide educational resources that help you understand financial principles and make informed decisions about your family\'s financial future.',
    'education.development_title': 'Personal Development & Leadership',
    'education.development_desc': 'Focus on personal growth and leadership development through our educational system. Learn the skills needed to succeed in life and business while developing the ability to help others in your community through financial education opportunities.',
    
    // Living Approach Content
    'living.approach_desc': 'Our approach goes beyond traditional financial planning. We empower families through comprehensive financial education, multiple income strategies, and personal development that creates lasting transformation.',
    'living.join_desc': 'Join the Santiago team and discover how the New Art of Living can transform your family\'s financial future through our proven system of building wealth, gaining knowledge, and developing yourself into the person you were meant to be.',
    
    // Brochure Section
    'brochure.title': 'Money Matters Brochure',
    'brochure.subtitle': 'Download Money Matters',
    'brochure.description': 'An introduction to WFGIA and the key concepts that can help you build a solid financial foundation. Learn how WFG can help you and anticipate and overcome the challenges in saving for your future.',
    
    // Appointment Section
    'appointment.title': 'Schedule a Complimentary, No-Obligation Appointment with Pablo & Nolly',
    
    // Platform Section
    'platform.title': 'A Platform as Diverse as Those We Serve',
    'platform.description': 'No matter your life story, WFG has the technology and experience to make your financial dreams a reality. Our video showcases our business platform and what makes us unique in an industry that is not known for its diversity.',
    
    // Additional Localization Keys
    
    // Building section
    'building.title': 'Building Entrepreneurs',
    'building.subtitle': 'Master The New Art of Living',
    'building.join_title': 'Join the Santiago Team',
    'building.description': 'Ready to transform your life and help others do the same? Our proven system combines multi-handed income strategies, comprehensive financial education, and personal development to create extraordinary results.',
    'building.description_2': 'Join the Santiago team and become part of a community dedicated to empowering families across Florida and New York. Learn the new art of living while building a business that makes a real difference.',
    'building.start_journey': 'Start Your Journey',
    'building.call_team': 'Call Pablo & Nolly',
    
    // Philosophy sections
    'philosophy.empowering_title': 'The New Art of Living: Empowering Families',
    'philosophy.multi_income_title': 'Multi-Handed Income',
    'philosophy.multi_income_desc': 'Create multiple streams of income to build lasting wealth',
    'philosophy.financial_education_title': 'Financial Education',
    'philosophy.financial_education_desc': 'Learn the strategies that truly build generational wealth',
    'philosophy.self_improvement_title': 'Self Improvement',
    'philosophy.self_improvement_desc': 'Develop the mindset and skills for lasting success',
    
    // Spanish Meeting Links
    'meeting.spanish_title': 'New Art of Living - Spanish Session',
    'meeting.spanish_description': 'Join our Spanish-language presentation about the New Art of Living',
    'meeting.register_spanish': 'Register for Spanish Session',
    'meeting.spanish_zoom_link': 'https://us06web.zoom.us/meeting/register/nPW12W6nQp6TDcOL6vob1A#/registration',
    
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
    
    // Team Santiago Page Content - Spanish
    'team.about_title': 'Acerca del Equipo Santiago',
    'team.about_subtitle': 'Cuatro generaciones unidas por el servicio, impulsadas por la misión',
    'team.our_story': 'Nuestra Historia',
    'team.story_text': 'La historia de la familia Santiago comienza con servicio y sacrificio. Los más de 30 años de Pablo protegiendo comunidades como NYPD y Orange County law enforcement, combinados con las dos décadas de Nolly sirviendo empresas en telecomunicaciones, crearon una base de dedicación hacia otros.',
    'team.our_transformation': 'Nuestra Transformación',
    'team.transformation_text': 'Después de que Pablo sobrevivió a un infarto mayor y se dio cuenta de las vulnerabilidades financieras que enfrentan incluso los servidores dedicados, nuestra familia descubrió World Financial Group. Por primera vez, aprendimos cómo funciona realmente el dinero y cómo proteger a las familias de las incertidumbres de la vida.',
    'team.our_mission_today': 'Nuestra Misión Hoy',
    'team.mission_today_text': 'Ahora, con la experiencia en inversiones de Joseph y la pasión de Christian por educar a los jóvenes, somos cuatro miembros familiares fuertes, unidos en ayudar a las familias a liberarse de la incertidumbre financiera y construir riqueza generacional duradera.',
    'team.our_impact': 'Nuestro Impacto con WFG',
    'team.families_served': 'Familias Servidas',
    'team.years_experience': 'Años de Experiencia',
    'team.financial_plans': 'Planes Financieros',
    'team.family_commitment': 'Compromiso Familiar',
    'team.ready_secure': '¿Listo para Asegurar el Futuro de Tu Familia?',
    'team.join_thousands': 'Únete a miles de familias que han transformado su futuro financiero con el Equipo Santiago.',
    'team.start_journey': 'Comienza Tu Jornada Hoy',
    'team.how_we_serve': 'Cómo Te Servimos',
    
    // Services Section - Spanish
    'services.financial_protection': 'Protección Financiera',
    'services.financial_protection_desc': 'Estrategias integrales para proteger tus ingresos y construir riqueza libre de impuestos para el futuro de tu familia.',
    'services.business_building': 'Construcción de Negocios',
    'services.business_building_desc': 'Oportunidades empresariales y múltiples fuentes de ingresos para crear independencia financiera duradera.',
    'services.family_legacy': 'Legado Familiar',
    'services.family_legacy_desc': 'Estrategias de riqueza generacional que aseguran la seguridad de tu familia por décadas.',
    'services.meet_family': 'Conoce a la Familia Santiago',
    'services.meet_family_desc': 'Cuatro generaciones unidas en transformar vidas a través de la educación financiera',
    
    // AI Career Mentor Section - Spanish
    'ai.badge': '🤖 NUEVO: Mentor de Carrera IA',
    'ai.title': 'Mentor de Carrera IA con Inteligencia Emocional',
    'ai.description': 'Obtén orientación profesional personalizada impulsada por la experiencia del Equipo Santiago. Nuestro mentor IA entiende tus emociones y proporciona consejos personalizados para tu viaje en WFG.',
    'ai.start_chat': 'Iniciar Chat de Carrera',
    'ai.schedule_call': 'Programar Llamada 1-a-1',
    
    // Team Leaders Section - Spanish
    'leaders.title': 'EL EQUIPO SANTIAGO',
    'leaders.subtitle': 'Pablo y Nolly Santiago - Líderes del Equipo',
    'leaders.mission': 'Empoderando Familias a Través del Nuevo Arte de Vivir',
    
    // Contact Information - Spanish
    'contact.call_team': 'Llama al Equipo Santiago',
    'contact.schedule_consultation': 'Programa Tu Consulta',
    'contact.email_me': 'Envíame un Email',
    'contact.location': 'Ubicación',
    'contact.office_hours': 'Horario de Oficina',
    'contact.languages': 'Idiomas',
    'contact.spanish_english': 'Español/Inglés',
    
    // New Art of Living Section - Spanish
    'living.title': 'El Nuevo Arte de Vivir: Empoderando Familias',
    'living.multi_income': 'Ingresos Multi-Facéticos',
    'living.multi_income_desc': 'Crea múltiples fuentes de ingresos para construir riqueza duradera',
    'living.financial_education': 'Educación Financiera',
    'living.financial_education_desc': 'Aprende las estrategias que verdaderamente construyen riqueza generacional',
    'living.self_improvement': 'Automejoramiento',
    'living.self_improvement_desc': 'Desarrolla la mentalidad y habilidades para el éxito duradero',
    
    // Building Entrepreneurs Section - Spanish
    'entrepreneurs.title': 'Construyendo Empresarios',
    'entrepreneurs.subtitle': 'Domina el Nuevo Arte de Vivir',
    'entrepreneurs.join_team': 'Únete al Equipo Santiago',
    'entrepreneurs.description': '¿Listo para transformar tu vida y ayudar a otros a hacer lo mismo? Nuestro sistema probado combina estrategias de ingresos multi-facéticos, educación financiera integral y desarrollo personal para crear resultados extraordinarios.',
    'entrepreneurs.community': 'Únete al equipo Santiago y conviértete en parte de una comunidad dedicada a empoderar familias en Florida y Nueva York. Aprende el nuevo arte de vivir mientras construyes un negocio que hace una diferencia real.',
    'entrepreneurs.start_journey': 'Comienza Tu Jornada',
    'entrepreneurs.call_pablo_nolly': 'Llama a Pablo y Nolly',
    
    // Form Labels - Spanish
    'form.your_name': 'Tu Nombre',
    'form.email_address': 'Dirección de Email',
    'form.first_name': 'Nombre',
    'form.last_name': 'Apellido',
    'form.mobile': 'Móvil',
    'form.download_now': 'Descargar Ahora',
    'form.schedule_appointment': 'Programar Cita',
    
    // Office Information - Spanish
    'office.about_office': 'Acerca de la Oficina de Pablo y Nolly',
    'office.office_location': 'Ubicación de la Oficina',
    'office.office_hours': 'Horario de Oficina',
    'office.click_office_hours': 'Haz Clic para Ver Horarios de Oficina',
    'office.monday': 'Lunes',
    'office.tuesday': 'Martes',
    'office.wednesday': 'Miércoles',
    'office.thursday': 'Jueves',
    'office.friday': 'Viernes',
    'office.saturday': 'Sábado',
    'office.sunday': 'Domingo',
    'office.closed': 'Cerrado',
    
    // Team Member Profiles - Spanish
    'team.nolly_bio_1': 'He pasado más de dos décadas en telecomunicaciones, trabajando como ejecutiva de cuentas y sirviendo a pequeñas y medianas empresas. Esas empresas siempre me han recordado a mis padres: trabajadores, dedicados, y haciendo todo lo necesario para proveer para sus familias.',
    'team.nolly_bio_2': 'Ambos padres fallecieron demasiado temprano. Estoy profundamente agradecida por los sacrificios que hicieron, pero nunca tuvieron la oportunidad de enseñarme sobre educación financiera. La verdad es que no sabían mucho al respecto — y como muchas familias, nunca nos mostraron cómo construir verdadera seguridad financiera.',
    'team.nolly_bio_3': 'Eso cambió cuando llegué a WFG. Por primera vez, aprendí cómo realmente funciona el dinero — y más importante, cómo proteger a las familias de las incertidumbres que la vida nos presenta.',
    'team.nolly_bio_4': 'Ahora, mi misión es simple: educar y empoderar a otros para que puedan crear libertad financiera, construir múltiples fuentes de ingresos, y proteger lo que más importa. Porque cada familia merece el conocimiento y las herramientas para asegurar su futuro — antes de que sea demasiado tarde.',
    
    'team.pablo_bio_title': 'Mi Historia, Mi Misión',
    'team.pablo_bio_1': 'Durante más de 30 años, serví con NYPD y las fuerzas del orden del Condado de Orange. Estuve lado a lado con mis hermanos y hermanas — protegiendo extraños, corriendo hacia el peligro, y sacrificando tiempo con mi familia porque eso es lo que el trabajo demanda.',
    'team.pablo_bio_2': 'El día que sobreviví a un infarto grave, vi una verdad que ojalá hubiera conocido antes: si no podía regresar al trabajo, mi familia habría quedado luchando. Mi pensión no habría sido suficiente. Mi 401(k) estaba lleno de impuestos ocultos y restricciones.',
    'team.pablo_bio_3': 'Ahora, mi misión es clara: proteger a los protectores. Educo y empodero a los primeros respondedores para salvaguardar sus ingresos y construir riqueza libre de impuestos usando estrategias que el trabajo nunca nos enseñó.',
    'team.pablo_bio_4': 'Hemos pasado nuestras carreras protegiendo al público. Es hora de proteger a los nuestros.',
    
    // Additional Team Members - Spanish
    'team.princhesca_title': 'Agente de Seguros de Vida Licenciada',
    'team.princhesca_company': 'Propietaria, Rainier Tax Services LLC',
    'team.princhesca_bio_1': 'Princhesca Rainier Turner es una Agente de Seguros de Vida Licenciada y propietaria de Rainier Tax Services LLC. Con más de 10 años de experiencia en servicios financieros, se especializa en seguros de vida y anualidades, planificación y preparación de impuestos personales y comerciales, contabilidad, y formación de LLC.',
    'team.princhesca_bio_2': 'Su misión es empoderar a familias, pequeños empresarios, y jóvenes profesionales a través de educación financiera y soluciones personalizadas. Antes de ingresar a la industria financiera, Princhesca construyó una base sólida en telecomunicaciones, destacándose en servicio al cliente, gestión de proyectos, y liderazgo en ventas.',
    'team.princhesca_bio_3': 'Rainier Tax Services fue originalmente fundada por su padre en los años 1990. Después de su fallecimiento en 2018, Princhesca orgullosamente se hizo cargo del negocio para continuar su legado de servicio e integridad.',
    'team.princhesca_service_1': 'Seguros de Vida y Anualidades',
    'team.princhesca_service_2': 'Preparación de Impuestos',
    'team.princhesca_service_3': 'Formación de Negocios',
    'team.princhesca_service_4': 'Servicios de Contabilidad',
    
    'team.joseph_title': 'Asociado – World Financial Group',
    'team.joseph_bio_1': 'Estoy emocionado de unirme al equipo de WFG — un equipo que también es mi familia. Obtuve mi licencia de inversiones recién salido de la secundaria, y luego me gradué con un título en Finanzas. Desde el primer día, sabía que quería usar mis habilidades para ayudar a las personas a tomar control de su dinero y su futuro.',
    'team.joseph_bio_2': 'Crecí viendo a mis padres trabajar increíblemente duro, sacrificando innumerables días festivos y veranos en servicio a otros. Esa dedicación me enseñó disciplina y compromiso, pero también me mostró una dura verdad: sin educación financiera, incluso las personas más dedicadas pueden quedar desprotegidas.',
    'team.joseph_bio_3': 'Mi misión es construir riqueza financiera duradera, ganar verdadera libertad, y crear un legado que dure por generaciones. Si tienes el corazón de un empresario y quieres construir verdadera riqueza, conectemos. Te apoyo, hermano.',
    'team.joseph_skill_1': 'Licencia de Inversiones',
    'team.joseph_skill_2': 'Título en Finanzas',
    'team.joseph_skill_3': 'Construcción de Riqueza',
    
    'team.christian_title': 'Asociado – World Financial Group',
    'team.christian_bio_1': 'Soy Christian Santiago. Me gradué recientemente y, como mi hermano gemelo Joseph, he elegido unirme a la misión de mi familia en WFG. Siempre he sido un poco introvertido, manteniendo mi círculo pequeño, pero soy profundamente leal a las personas que me importan. Los números siempre han sido mi fortaleza — he amado las matemáticas desde que puedo recordar — pero lo que realmente captó mi atención fue aprender sobre el poder del interés compuesto.',
    'team.christian_bio_2': 'No era algo que me enseñaran en la escuela, y mi primera reacción fue: ¿Por qué esto no está en las escuelas? Todos deberían saber esto. Ese momento encendió una pasión en mí para compartir este conocimiento con otros — especialmente con la generación más joven.',
    'team.christian_bio_3': 'Creo en empoderar a las personas para soñar de nuevo, reconstruir la autoconfianza, y ganar la confianza para crear su propio futuro financiero. Veo esto como un nuevo arte de vivir — uno donde usamos conocimiento, emprendimiento, y disciplina para construir no solo riqueza, sino un legado duradero.',
    'team.christian_bio_4': 'Mi misión es ayudar a los jóvenes a entender que tienen el poder de tomar control de su dinero, sus decisiones, y su futuro — comenzando hoy.',
    'team.christian_skill_1': 'Matemáticas y Análisis',
    'team.christian_skill_2': 'Experto en Interés Compuesto',
    'team.christian_skill_3': 'Educación Financiera Juvenil',
    
    // Educational Content - Spanish
    'education.philosophy_title': 'Filosofía de Educación Financiera',
    'education.philosophy_subtitle': 'Empoderando familias a través de educación financiera y conciencia de oportunidades',
    'education.multi_income_title': 'Educación de Ingresos Multi-Facéticos',
    'education.multi_income_desc': 'Aprende sobre crear múltiples fuentes de ingresos a través de educación financiera y oportunidad. Nuestro enfoque educativo te ayuda a entender estrategias para diversificar fuentes de ingresos y construir seguridad financiera duradera a través de programas de aprendizaje integral.',
    'education.literacy_title': 'Educación y Alfabetización Financiera',
    'education.literacy_desc': 'Accede a educación financiera que cubre conceptos fundamentales de dinero y estrategias de construcción de riqueza. Proporcionamos recursos educativos que te ayudan a entender principios financieros y tomar decisiones informadas sobre el futuro financiero de tu familia.',
    'education.development_title': 'Desarrollo Personal y Liderazgo',
    'education.development_desc': 'Enfócate en crecimiento personal y desarrollo de liderazgo a través de nuestro sistema educativo. Aprende las habilidades necesarias para tener éxito en la vida y los negocios mientras desarrollas la capacidad de ayudar a otros en tu comunidad a través de oportunidades de educación financiera.',
    
    // Living Approach Content - Spanish
    'living.approach_desc': 'Nuestro enfoque va más allá de la planificación financiera tradicional. Empoderamos familias a través de educación financiera integral, estrategias de ingresos múltiples, y desarrollo personal que crea transformación duradera.',
    'living.join_desc': 'Únete al equipo Santiago y descubre cómo el Nuevo Arte de Vivir puede transformar el futuro financiero de tu familia a través de nuestro sistema probado de construir riqueza, ganar conocimiento, y desarrollarte en la persona que estás destinado a ser.',
    
    // Brochure Section - Spanish
    'brochure.title': 'Folleto Asuntos del Dinero',
    'brochure.subtitle': 'Descargar Asuntos del Dinero',
    'brochure.description': 'Una introducción a WFGIA y los conceptos clave que pueden ayudarte a construir una base financiera sólida. Aprende cómo WFG puede ayudarte y anticipar y superar los desafíos en ahorrar para tu futuro.',
    
    // Appointment Section - Spanish
    'appointment.title': 'Programa una Cita Gratuita y Sin Obligación con Pablo y Nolly',
    
    // Platform Section - Spanish
    'platform.title': 'Una Plataforma Tan Diversa Como Aquellos A Quienes Servimos',
    'platform.description': 'Sin importar tu historia de vida, WFG tiene la tecnología y experiencia para hacer realidad tus sueños financieros. Nuestro video muestra nuestra plataforma de negocios y lo que nos hace únicos en una industria que no es conocida por su diversidad.',
    
    // Additional Localization Keys - Spanish
    
    // Building section - Spanish
    'building.title': 'Formando Empresarios',
    'building.subtitle': 'Domina el Nuevo Arte de Vivir',
    'building.join_title': 'Únete al Equipo Santiago',
    'building.description': '¿Listo para transformar tu vida y ayudar a otros a hacer lo mismo? Nuestro sistema probado combina estrategias de ingresos multi-facéticos, educación financiera integral, y desarrollo personal para crear resultados extraordinarios.',
    'building.description_2': 'Únete al equipo Santiago y conviértete en parte de una comunidad dedicada a empoderar familias en Florida y Nueva York. Aprende el nuevo arte de vivir mientras construyes un negocio que hace una diferencia real.',
    'building.start_journey': 'Comienza Tu Viaje',
    'building.call_team': 'Llama a Pablo y Nolly',
    
    // Philosophy sections - Spanish
    'philosophy.empowering_title': 'El Nuevo Arte de Vivir: Empoderando Familias',
    'philosophy.multi_income_title': 'Ingresos Multi-Facéticos',
    'philosophy.multi_income_desc': 'Crea múltiples fuentes de ingresos para construir riqueza duradera',
    'philosophy.financial_education_title': 'Educación Financiera',
    'philosophy.financial_education_desc': 'Aprende las estrategias que realmente construyen riqueza generacional',
    'philosophy.self_improvement_title': 'Superación Personal',
    'philosophy.self_improvement_desc': 'Desarrolla la mentalidad y habilidades para el éxito duradero',
    
    // Spanish Meeting Links - Spanish
    'meeting.spanish_title': 'Nuevo Arte de Vivir - Sesión en Español',
    'meeting.spanish_description': 'Únete a nuestra presentación en español sobre el Nuevo Arte de Vivir',
    'meeting.register_spanish': 'Registrarse para Sesión en Español',
    'meeting.spanish_zoom_link': 'https://us06web.zoom.us/meeting/register/nPW12W6nQp6TDcOL6vob1A#/registration',
    
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