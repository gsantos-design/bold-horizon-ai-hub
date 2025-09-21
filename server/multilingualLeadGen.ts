import { GoogleGenAI } from "@google/genai";

// Google Gemini AI for Multilingual Lead Generation
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export type SupportedLanguage = 'en' | 'es' | 'pt' | 'fr' | 'it';

export interface MultilingualLead {
  firstName: string;
  lastName?: string;
  email: string;
  phone?: string;
  preferredLanguage: SupportedLanguage;
  preferredAgent: 'pablo' | 'nolly';
  industry?: string;
  jobTitle?: string;
  company?: string;
  interestedService?: string;
}

export interface CulturalContext {
  language: SupportedLanguage;
  familyValues: string;
  businessEtiquette: string;
  trustBuilding: string;
  financialConcerns: string;
}

class MultilingualLeadGenerator {
  private culturalContexts: Record<SupportedLanguage, CulturalContext> = {
    'en': {
      language: 'en',
      familyValues: 'Individual achievement, retirement planning, financial independence',
      businessEtiquette: 'Direct communication, professional efficiency, results-focused',
      trustBuilding: 'Credentials, testimonials, proven track record',
      financialConcerns: 'Tax optimization, retirement security, wealth building'
    },
    'es': {
      language: 'es',
      familyValues: 'Familia extendida, legado generacional, protección de seres queridos',
      businessEtiquette: 'Relaciones personales, respeto, confianza a largo plazo',
      trustBuilding: 'Referencias comunitarias, experiencia familiar, valores compartidos',
      financialConcerns: 'Seguridad familiar, educación de hijos, estabilidad económica'
    },
    'pt': {
      language: 'pt',
      familyValues: 'Unidade familiar, crescimento conjunto, proteção das gerações futuras',
      businessEtiquette: 'Relacionamentos pessoais, cortesia, construção de confiança',
      trustBuilding: 'Recomendações da comunidade, histórico familiar, valores compartilhados',
      financialConcerns: 'Estabilidade familiar, educação dos filhos, crescimento econômico'
    },
    'fr': {
      language: 'fr',
      familyValues: 'Patrimoine familial, éducation des enfants, sécurité à long terme',
      businessEtiquette: 'Politesse, professionnalisme, relations durables',
      trustBuilding: 'Références professionnelles, expertise reconnue, transparence',
      financialConcerns: 'Optimisation fiscale, sécurité retraite, croissance patrimoniale'
    },
    'it': {
      language: 'it',
      familyValues: 'Tradizione familiare, eredità generazionale, protezione dei cari',
      businessEtiquette: 'Relazioni personali, rispetto, fiducia reciproca',
      trustBuilding: 'Referenze comunitarie, esperienza familiare, valori condivisi',
      financialConcerns: 'Sicurezza familiare, educazione figli, stabilità economica'
    }
  };

  // Generate culturally-adapted email campaigns using Google Gemini
  async generateMultilingualEmailCampaign(
    lead: MultilingualLead, 
    campaignType: '401k' | 'high-yield' | 'entrepreneur'
  ): Promise<{subject: string, body: string, language: SupportedLanguage}> {
    const context = this.culturalContexts[lead.preferredLanguage];
    const agentName = lead.preferredAgent === 'pablo' ? 'Pablo' : 'Nolly';
    
    const campaignPrompts = {
      '401k': `Create a professional email for ${agentName} Santiago from World Financial Group targeting 401k rollover opportunities. The email should emphasize tax-free retirement strategies and potential savings.`,
      'high-yield': `Create a professional email for ${agentName} Santiago promoting high-yield alternatives (4.5%-6.8%) compared to traditional bank savings (0.5%-1%). Emphasize principal protection and guaranteed growth.`,
      'entrepreneur': `Create a professional email for ${agentName} Santiago targeting successful entrepreneurs about our multi-income system that can add $100k-$250k annually to existing income.`
    };

    const systemPrompt = `You are ${agentName} Santiago, a World Financial Group professional specializing in financial education for families across the United States. Create a culturally-appropriate email campaign in ${this.getLanguageName(lead.preferredLanguage)}.

    Cultural Context for ${lead.preferredLanguage.toUpperCase()}:
    - Family Values: ${context.familyValues}
    - Business Etiquette: ${context.businessEtiquette}  
    - Trust Building: ${context.trustBuilding}
    - Financial Concerns: ${context.financialConcerns}

    Lead Information:
    - Name: ${lead.firstName} ${lead.lastName || ''}
    - Industry: ${lead.industry || 'Professional'}
    - Job Title: ${lead.jobTitle || 'Professional'}
    - Company: ${lead.company || 'their company'}

    Requirements:
    1. Write ENTIRELY in ${this.getLanguageName(lead.preferredLanguage)} (no English mixed in)
    2. Adapt cultural references appropriately
    3. Include Santiago Team contact: (407) 777-1087
    4. Maintain professional WFG compliance
    5. Create both subject line and email body
    6. Use appropriate cultural greeting/closing
    7. Reference specific benefits relevant to the cultural context

    Respond with JSON format:
    {
      "subject": "Email subject line",
      "body": "Complete email body with proper formatting"
    }`;

    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-pro",
        contents: [
          { role: "system", parts: [{ text: systemPrompt }] },
          { role: "user", parts: [{ text: campaignPrompts[campaignType] + "\n\nReturn ONLY valid JSON with 'subject' and 'body' fields." }] }
        ]
      });

      const responseText = response.text;
      const result = JSON.parse(responseText || '{}');
      return {
        subject: result.subject || `${campaignType} Campaign - ${agentName} Santiago`,
        body: result.body || 'Email generation failed',
        language: lead.preferredLanguage
      };

    } catch (error: any) {
      console.error('Multilingual email generation error:', error);
      // Fallback to basic template
      return this.getFallbackEmailTemplate(lead, campaignType);
    }
  }

  // Generate culturally-adapted LinkedIn scripts
  async generateMultilingualLinkedInScript(
    lead: MultilingualLead,
    scriptType: 'connection' | 'followup'
  ): Promise<{script: string, language: SupportedLanguage}> {
    const context = this.culturalContexts[lead.preferredLanguage];
    const agentName = lead.preferredAgent === 'pablo' ? 'Pablo' : 'Nolly';

    const systemPrompt = `You are ${agentName} Santiago from the Santiago Team at World Financial Group. Create a LinkedIn ${scriptType} message in ${this.getLanguageName(lead.preferredLanguage)}.

    Cultural Context for ${lead.preferredLanguage.toUpperCase()}:
    - Business Etiquette: ${context.businessEtiquette}
    - Trust Building: ${context.trustBuilding}
    - Professional Values: ${context.familyValues}

    Lead Information:
    - Name: ${lead.firstName}
    - Job Title: ${lead.jobTitle || 'Professional'}
    - Industry: ${lead.industry || 'their industry'}
    - Company: ${lead.company || 'their company'}

    Requirements:
    1. Write ENTIRELY in ${this.getLanguageName(lead.preferredLanguage)}
    2. Keep under 300 characters for connection requests, 500 for follow-ups
    3. Professional but warm tone appropriate for the culture
    4. Mention Santiago Team specialization in financial education
    5. Be respectful and non-pushy
    6. Focus on mutual benefit and value creation

    Create a single message that's culturally appropriate and professional.`;

    const promptText = scriptType === 'connection' 
      ? `Write a LinkedIn connection request message.`
      : `Write a LinkedIn follow-up message mentioning our success in helping similar professionals in their industry.`;

    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [
          { role: "system", parts: [{ text: systemPrompt }] },
          { role: "user", parts: [{ text: promptText }] }
        ]
      });

      const responseText = response.text;
      return {
        script: responseText || `Hello ${lead.firstName}, I'm ${agentName} Santiago from the Santiago Team at World Financial Group. I'd love to connect!`,
        language: lead.preferredLanguage
      };

    } catch (error: any) {
      console.error('LinkedIn script generation error:', error);
      return {
        script: `Hello ${lead.firstName}, I'm ${agentName} Santiago from the Santiago Team. Let's connect!`,
        language: lead.preferredLanguage
      };
    }
  }

  // Generate phone scripts for AI voice calls
  async generateMultilingualPhoneScript(
    lead: MultilingualLead,
    campaignType: '401k' | 'high-yield' | 'entrepreneur'
  ): Promise<{script: string, language: SupportedLanguage}> {
    const context = this.culturalContexts[lead.preferredLanguage];
    const agentName = lead.preferredAgent === 'pablo' ? 'Pablo' : 'Nolly';

    const systemPrompt = `You are ${agentName} Santiago making a professional phone call for World Financial Group. Create a phone script in ${this.getLanguageName(lead.preferredLanguage)} for a ${campaignType} campaign.

    Cultural Context for ${lead.preferredLanguage.toUpperCase()}:
    - Business Etiquette: ${context.businessEtiquette}
    - Trust Building: ${context.trustBuilding}
    - Financial Concerns: ${context.financialConcerns}
    - Family Values: ${context.familyValues}

    Lead Information:
    - Name: ${lead.firstName}
    - Industry: ${lead.industry || 'their industry'}
    - Service Interest: ${lead.interestedService || campaignType + ' services'}

    Requirements:
    1. Write ENTIRELY in ${this.getLanguageName(lead.preferredLanguage)}
    2. 30-45 second speaking duration
    3. Professional introduction with Santiago Team
    4. Cultural appropriate greeting
    5. Clear value proposition for ${campaignType}
    6. Respectful call-to-action
    7. Include phone number (407) 777-1087 for callbacks

    Create a natural, conversational phone script.`;

    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash", 
        contents: [
          { role: "system", parts: [{ text: systemPrompt }] },
          { role: "user", parts: [{ text: `Generate a phone script for ${campaignType} campaign.` }] }
        ]
      });

      const responseText = response.text;
      return {
        script: responseText || `Hello ${lead.firstName}, this is ${agentName} Santiago from the Santiago Team at World Financial Group...`,
        language: lead.preferredLanguage
      };

    } catch (error: any) {
      console.error('Phone script generation error:', error);
      return {
        script: `Hello ${lead.firstName}, this is ${agentName} Santiago from the Santiago Team...`,
        language: lead.preferredLanguage
      };
    }
  }

  // Batch process multiple leads for multilingual campaigns
  async generateBatchMultilingualCampaign(
    leads: MultilingualLead[],
    campaignType: '401k' | 'high-yield' | 'entrepreneur'
  ): Promise<Array<{
    leadId: string,
    email: {subject: string, body: string},
    linkedin: {script: string},
    phone: {script: string},
    language: SupportedLanguage
  }>> {
    const results = [];

    for (const lead of leads) {
      try {
        const [emailCampaign, linkedinScript, phoneScript] = await Promise.all([
          this.generateMultilingualEmailCampaign(lead, campaignType),
          this.generateMultilingualLinkedInScript(lead, 'connection'),
          this.generateMultilingualPhoneScript(lead, campaignType)
        ]);

        results.push({
          leadId: lead.email, // Using email as ID
          email: {
            subject: emailCampaign.subject,
            body: emailCampaign.body
          },
          linkedin: {
            script: linkedinScript.script
          },
          phone: {
            script: phoneScript.script
          },
          language: lead.preferredLanguage
        });

        // Rate limiting to respect Google API limits
        await new Promise(resolve => setTimeout(resolve, 1000));

      } catch (error: any) {
        console.error(`Failed to generate campaign for ${lead.email}:`, error);
        results.push({
          leadId: lead.email,
          email: { subject: 'Campaign Generation Failed', body: 'Please retry' },
          linkedin: { script: 'Connection request failed to generate' },
          phone: { script: 'Phone script failed to generate' },
          language: lead.preferredLanguage
        });
      }
    }

    return results;
  }

  private getLanguageName(code: SupportedLanguage): string {
    const names: Record<SupportedLanguage, string> = {
      'en': 'English',
      'es': 'Spanish',
      'pt': 'Portuguese', 
      'fr': 'French',
      'it': 'Italian'
    };
    return names[code];
  }

  private getFallbackEmailTemplate(lead: MultilingualLead, campaignType: string) {
    // Basic fallback templates by language
    const fallbacks: Record<SupportedLanguage, any> = {
      'en': {
        subject: `Financial Opportunity - ${lead.preferredAgent === 'pablo' ? 'Pablo' : 'Nolly'} Santiago`,
        body: `Dear ${lead.firstName},\n\nI'm ${lead.preferredAgent === 'pablo' ? 'Pablo' : 'Nolly'} Santiago from the Santiago Team at World Financial Group...\n\nBest regards,\n${lead.preferredAgent === 'pablo' ? 'Pablo' : 'Nolly'} Santiago\n(407) 777-1087`
      },
      'es': {
        subject: `Oportunidad Financiera - ${lead.preferredAgent === 'pablo' ? 'Pablo' : 'Nolly'} Santiago`,
        body: `Estimado/a ${lead.firstName},\n\nSoy ${lead.preferredAgent === 'pablo' ? 'Pablo' : 'Nolly'} Santiago del Equipo Santiago en World Financial Group...\n\nSaludos cordiales,\n${lead.preferredAgent === 'pablo' ? 'Pablo' : 'Nolly'} Santiago\n(407) 777-1087`
      },
      'pt': {
        subject: `Oportunidade Financeira - ${lead.preferredAgent === 'pablo' ? 'Pablo' : 'Nolly'} Santiago`,
        body: `Caro/a ${lead.firstName},\n\nSou ${lead.preferredAgent === 'pablo' ? 'Pablo' : 'Nolly'} Santiago da Equipe Santiago na World Financial Group...\n\nCordialmente,\n${lead.preferredAgent === 'pablo' ? 'Pablo' : 'Nolly'} Santiago\n(407) 777-1087`
      },
      'fr': {
        subject: `Opportunité Financière - ${lead.preferredAgent === 'pablo' ? 'Pablo' : 'Nolly'} Santiago`,
        body: `Cher/Chère ${lead.firstName},\n\nJe suis ${lead.preferredAgent === 'pablo' ? 'Pablo' : 'Nolly'} Santiago de l'Équipe Santiago chez World Financial Group...\n\nCordialement,\n${lead.preferredAgent === 'pablo' ? 'Pablo' : 'Nolly'} Santiago\n(407) 777-1087`
      },
      'it': {
        subject: `Opportunità Finanziaria - ${lead.preferredAgent === 'pablo' ? 'Pablo' : 'Nolly'} Santiago`,
        body: `Gentile ${lead.firstName},\n\nSono ${lead.preferredAgent === 'pablo' ? 'Pablo' : 'Nolly'} Santiago del Team Santiago presso World Financial Group...\n\nCordiali saluti,\n${lead.preferredAgent === 'pablo' ? 'Pablo' : 'Nolly'} Santiago\n(407) 777-1087`
      }
    };

    return {
      ...fallbacks[lead.preferredLanguage],
      language: lead.preferredLanguage
    };
  }
}

export { MultilingualLeadGenerator };