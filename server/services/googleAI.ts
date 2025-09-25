import { GoogleGenAI } from "@google/genai";

// Google AI service for Santiago Team AI Automation
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export class GoogleAIService {
  async generateVoiceScript(scenario: string, teamMember: string): Promise<string> {
    const prompt = `Generate a professional phone script for ${teamMember} Santiago from the Santiago Team at World Financial Group. 

Scenario: ${scenario}

The script should be:
- Professional and warm
- Include Santiago Team branding
- Mention World Financial Group
- Focus on financial education and opportunity
- Be 30-60 seconds when spoken
- Include natural conversation flow

Format as a natural phone conversation.`;

    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      });

      return response.text || "Hello, this is the Santiago Team at World Financial Group. We're excited to share an incredible opportunity with you.";
    } catch (error) {
      console.error("Google AI error:", error);
      return `Hi, this is ${teamMember} Santiago from the Santiago Team at World Financial Group. I wanted to personally reach out about an exciting opportunity that could transform your financial future.`;
    }
  }

  async generateVideoScript(prospect: string, scenario: string): Promise<string> {
    const prompt = `Generate a personalized video script for the Santiago Team at World Financial Group.

Target: ${prospect}
Scenario: ${scenario}

The script should:
- Be personal and engaging
- Mention the prospect by name if provided
- Highlight Santiago Team expertise
- Focus on financial education and growth
- Be 60-90 seconds when spoken
- Include a clear call to action

Format as a video monologue.`;

    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      });

      return response.text || `Hi ${prospect}, this is the Santiago Team at World Financial Group. We've been helping families build wealth for over 30 years, and I believe we can help you achieve your financial goals too.`;
    } catch (error) {
      console.error("Google AI error:", error);
      return `Hi ${prospect}, this is the Santiago Team at World Financial Group. We've been helping families build wealth nationwide, and I wanted to personally share how we can help you achieve your financial dreams.`;
    }
  }

  async analyzeLead(leadInfo: string): Promise<{score: number, recommendations: string[]}> {
    const prompt = `Analyze this lead for the Santiago Team at World Financial Group and provide a qualification score and recommendations.

Lead Information: ${leadInfo}

Provide:
1. A qualification score from 1-10 (10 being highest priority)
2. 3-5 specific recommendations for engagement
3. Suggested approach strategy

Respond in JSON format:
{
  "score": number,
  "recommendations": ["rec1", "rec2", "rec3"],
  "approach": "strategy description"
}`;

    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-pro",
        config: {
          responseMimeType: "application/json"
        },
        contents: prompt,
      });

      const result = JSON.parse(response.text || '{"score": 7, "recommendations": ["Schedule discovery call", "Send financial assessment", "Follow up within 24 hours"], "approach": "Professional financial consultation approach"}');
      return {
        score: result.score || 7,
        recommendations: result.recommendations || ["Schedule discovery call", "Send educational materials", "Follow up within 24 hours"]
      };
    } catch (error) {
      console.error("Google AI error:", error);
      return {
        score: 7,
        recommendations: ["Schedule discovery call", "Send financial education materials", "Follow up within 24 hours", "Assess current financial situation"]
      };
    }
  }

  async testConnection(): Promise<{success: boolean, message: string}> {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: "Generate a simple test message confirming Google AI is working for the Santiago Team.",
      });

      return {
        success: true,
        message: response.text || "Google AI is connected and ready for the Santiago Team!"
      };
    } catch (error) {
      return {
        success: false,
        message: `Google AI connection failed: ${error}`
      };
    }
  }
}

export const googleAI = new GoogleAIService();