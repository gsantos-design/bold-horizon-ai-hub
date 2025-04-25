import OpenAI from "openai";
import { type QuizResults } from "@shared/schema";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function generateCareerRecommendation(quizResults: QuizResults): Promise<{
  recommendedPath: string;
  explanation: string;
  strengths: string[];
  developmentAreas: string[];
  nextSteps: string[];
  estimatedTimeframe: string;
}> {
  // Construct the prompt with the quiz results
  const prompt = `
    As a World Financial Group career advisor specializing in financial services recruitment, analyze these quiz results to recommend a career path. 
    
    The person has provided the following information:
    - Background: ${quizResults.background}
    - Skills: ${quizResults.skills.join(", ")}
    - Motivations: ${quizResults.motivations.join(", ")}
    - Values: ${quizResults.values.join(", ")}
    - Work Style: ${quizResults.workStyle.join(", ")}
    - Financial Goals: ${quizResults.financialGoals}

    Based on this information, recommend ONE specific career path within the World Financial Group (WFG) Santiago Team. 
    
    Provide your response as JSON with the following structure:
    {
      "recommendedPath": "Name of recommended career path/position",
      "explanation": "A personalized explanation of why this path is a good fit (3-4 sentences)",
      "strengths": ["3-4 strengths they have that align with this path"],
      "developmentAreas": ["2-3 skills they should develop to excel"],
      "nextSteps": ["3 specific action items they should take to start in this role"],
      "estimatedTimeframe": "Estimated timeframe to reach success in this role"
    }
    
    Ensure your recommended path is one of: 
    - "Financial Services Associate" (entry-level, learn the basics, support senior advisors)
    - "Financial Advisor" (work with clients to provide financial solutions)
    - "Marketing Director" (build and lead a small team of associates)
    - "Senior Marketing Director" (build and lead multiple teams)
    - "Executive Marketing Director" (strategic leadership for large organizations)
  `;

  try {
    // Call the OpenAI API with the latest GPT model
    const response = await openai.chat.completions.create({
      model: "gpt-4o", // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
      messages: [
        { role: "system", content: "You are a specialized career advisor for World Financial Group's Santiago Team. You provide specific, personalized advice based on quiz results." },
        { role: "user", content: prompt }
      ],
      response_format: { type: "json_object" },
      temperature: 0.7,
      max_tokens: 1000,
    });

    const resultContent = response.choices[0].message.content;
    if (!resultContent) {
      throw new Error("Received empty response from OpenAI");
    }

    // Parse the JSON response
    const parsedResult = JSON.parse(resultContent);
    return {
      recommendedPath: parsedResult.recommendedPath,
      explanation: parsedResult.explanation,
      strengths: parsedResult.strengths,
      developmentAreas: parsedResult.developmentAreas,
      nextSteps: parsedResult.nextSteps,
      estimatedTimeframe: parsedResult.estimatedTimeframe,
    };
  } catch (error: any) {
    console.error("Error generating career recommendation:", error);
    throw new Error(`Failed to generate career recommendation: ${error.message || 'Unknown error'}`);
  }
}