import OpenAI from "openai";
import type { ChatMessage, ChatSession, InsertChatMessage, InsertChatSession } from "@shared/schema";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Define mentor personalities based on Nolly and Paul Santiago
const MENTOR_PERSONALITIES = {
  nolly: {
    name: "Nolly Santiago",
    style: "empathetic, detail-oriented, systematic",
    expertise: "financial education, career development, professional growth strategies",
    tone: "warm, encouraging, practical",
    greeting: "Hi! I'm Nolly Santiago, Licensed WFG Associate. I'm here to help you explore career opportunities and financial education. What questions can I help you with today?"
  },
  paul: {
    name: "Paul Santiago",
    style: "visionary, strategic, inspirational",
    expertise: "leadership development, career planning, personal development",
    tone: "confident, motivating, forward-thinking",
    greeting: "Hello! I'm Paul Santiago, Licensed WFG Associate. I'm excited to help you unlock your potential and explore career opportunities. What can we discuss together?"
  },
  santiago_team: {
    name: "Nolly & Paul's Office AI Mentor",
    style: "balanced approach combining both Nolly and Paul Santiago's educational expertise",
    expertise: "career exploration, educational resources, professional development from Nolly & Paul's office",
    tone: "professional, supportive, adaptable",
    greeting: "Welcome to Nolly & Paul's Office! I'm your AI Career Mentor, combining the educational expertise of both Nolly and Paul Santiago, Licensed WFG Associates. I'm here to provide educational guidance for your career exploration. How can I help you today?"
  }
};

// Emotional intelligence detection
async function detectEmotionalState(message: string): Promise<{
  emotion: string;
  confidence: number;
  supportLevel: string;
}> {
  const prompt = `
    Analyze the emotional state in this message and provide support guidance:
    "${message}"
    
    Respond with JSON in this format:
    {
      "emotion": "primary emotion (confident, anxious, excited, frustrated, uncertain, overwhelmed, motivated, etc.)",
      "confidence": confidence score 0-1,
      "supportLevel": "type of support needed (encouragement, practical_advice, emotional_support, clarification, motivation)"
    }
  `;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: "You are an emotional intelligence expert specializing in career coaching." },
        { role: "user", content: prompt }
      ],
      response_format: { type: "json_object" },
      max_tokens: 200
    });

    return JSON.parse(response.choices[0].message.content || '{"emotion": "neutral", "confidence": 0.5, "supportLevel": "practical_advice"}');
  } catch (error) {
    console.warn("Emotion detection failed, using default:", error);
    return { emotion: "neutral", confidence: 0.5, supportLevel: "practical_advice" };
  }
}

// Generate contextual career guidance
export async function generateMentorResponse(
  userMessage: string,
  chatHistory: ChatMessage[],
  userProfile: any = {},
  mentorPersonality: keyof typeof MENTOR_PERSONALITIES = "santiago_team"
): Promise<{
  content: string;
  emotionalTone: string;
  followUpActions: string[];
  mentorPersonality: string;
  metadata: any;
}> {
  // Detect emotional state
  const emotionalAnalysis = await detectEmotionalState(userMessage);
  
  const mentor = MENTOR_PERSONALITIES[mentorPersonality];
  
  // Build conversation context
  const recentHistory = chatHistory.slice(-10).map(msg => 
    `${msg.role}: ${msg.content}`
  ).join('\n');

  const systemPrompt = `
    You are ${mentor.name}, an AI career mentor with the Santiago Team at World Financial Group.
    
    Your personality: ${mentor.style}
    Your expertise: ${mentor.expertise}
    Your tone: ${mentor.tone}
    
    User's emotional state: ${emotionalAnalysis.emotion} (${emotionalAnalysis.supportLevel} needed)
    User profile: ${JSON.stringify(userProfile)}
    
    Guidelines:
    1. Provide empathetic, personalized career guidance
    2. Reference WFG opportunities and the Santiago Team when relevant
    3. Address the user's emotional state with appropriate support
    4. Offer specific, actionable advice
    5. Maintain a ${mentor.tone} tone throughout
    6. Keep responses conversational but professional (2-3 paragraphs max)
    7. End with a supportive question to continue the conversation
    
    Recent conversation:
    ${recentHistory}
  `;

  const userPrompt = `
    User says: "${userMessage}"
    
    Please respond as ${mentor.name} with empathy and practical guidance. Also suggest 3 specific follow-up actions the user could take.
    
    Format your response as JSON:
    {
      "content": "Your empathetic and helpful response",
      "followUpActions": ["action 1", "action 2", "action 3"],
      "careerInsights": "brief insight about their career path",
      "nextSteps": "suggested next conversation topic"
    }
  `;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      response_format: { type: "json_object" },
      max_tokens: 800
    });

    const result = JSON.parse(response.choices[0].message.content || '{}');
    
    return {
      content: result.content || "I'm here to help you with your career journey. Could you tell me more about what you're looking for?",
      emotionalTone: emotionalAnalysis.emotion,
      followUpActions: result.followUpActions || [],
      mentorPersonality,
      metadata: {
        emotionalAnalysis,
        careerInsights: result.careerInsights,
        nextSteps: result.nextSteps,
        timestamp: new Date().toISOString()
      }
    };
  } catch (error) {
    console.error("AI mentor response generation failed:", error);
    
    // Fallback response with emotional awareness
    const fallbackContent = emotionalAnalysis.emotion === "anxious" || emotionalAnalysis.emotion === "overwhelmed"
      ? "I understand this can feel overwhelming. Let's take it one step at a time. Nolly & Paul's office is here to support you through your career journey. What's the most important thing you'd like to focus on right now?"
      : emotionalAnalysis.emotion === "excited" || emotionalAnalysis.emotion === "motivated"
      ? "I love your enthusiasm! That energy will serve you well in building your career. Let's channel that motivation into a clear action plan. What specific area would you like to explore first?"
      : "I'm here to help guide you through your career journey from Nolly & Paul's office. Every successful person started exactly where you are now. What would you like to discuss about your future?";

    return {
      content: fallbackContent,
      emotionalTone: emotionalAnalysis.emotion,
      followUpActions: [
        "Schedule a one-on-one consultation",
        "Take our comprehensive career assessment",
        "Join our next team introduction session"
      ],
      mentorPersonality,
      metadata: {
        emotionalAnalysis,
        fallbackUsed: true,
        timestamp: new Date().toISOString()
      }
    };
  }
}

// Generate welcome message based on user context
export function generateWelcomeMessage(
  userProfile: any = {},
  mentorPersonality: keyof typeof MENTOR_PERSONALITIES = "santiago_team"
): string {
  const mentor = MENTOR_PERSONALITIES[mentorPersonality];
  
  if (userProfile.name) {
    return `${mentor.greeting.replace("Hi!", `Hi ${userProfile.name}!`)} I'm excited to learn about your career goals and help you create a path to success. What brought you to our office today?`;
  }
  
  return `${mentor.greeting} I'm excited to learn about your career goals and help you create a path to success. What brought you to our office today?`;
}

// Suggest mentor personality based on user input
export function suggestMentorPersonality(userMessage: string, userProfile: any = {}): keyof typeof MENTOR_PERSONALITIES {
  const message = userMessage.toLowerCase();
  
  // Look for keywords that suggest which mentor would be best
  if (message.includes("planning") || message.includes("systematic") || message.includes("organize") || message.includes("step by step")) {
    return "nolly";
  }
  
  if (message.includes("leadership") || message.includes("vision") || message.includes("team") || message.includes("inspire") || message.includes("growth")) {
    return "paul";
  }
  
  // Check user profile for preferences
  if (userProfile.careerStage === "management" || userProfile.goals?.includes("leadership")) {
    return "paul";
  }
  
  if (userProfile.careerStage === "planning" || userProfile.goals?.includes("financial_planning")) {
    return "nolly";
  }
  
  return "santiago_team";
}