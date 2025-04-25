import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertInquirySchema, 
  quizResultsSchema, 
  insertCareerQuizResultSchema,
  type QuizResults 
} from "@shared/schema";
import { generateCareerRecommendation } from "./openai";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // API route for handling contact form submissions
  app.post("/api/inquiries", async (req, res) => {
    try {
      // Validate the request body using the schema
      const validatedData = insertInquirySchema.parse(req.body);
      
      // Store the inquiry (in-memory storage for this implementation)
      const inquiry = await storage.createInquiry(validatedData);
      
      // Return success response
      res.status(201).json({ 
        message: "Inquiry submitted successfully", 
        inquiryId: inquiry.id 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          message: "Invalid form data", 
          errors: error.errors 
        });
      } else {
        console.error("Error submitting inquiry:", error);
        res.status(500).json({ 
          message: "Failed to submit inquiry. Please try again." 
        });
      }
    }
  });

  // API route for career path quiz submissions
  app.post("/api/career-quiz", async (req, res) => {
    try {
      console.log("Received career quiz submission");
      
      // Validate quiz data
      const validatedQuizData = quizResultsSchema.parse(req.body);
      
      let recommendation;
      try {
        // Try to generate AI recommendation
        recommendation = await generateCareerRecommendation(validatedQuizData);
      } catch (aiError) {
        console.warn("OpenAI API error, using fallback recommendation:", aiError);
        
        // Fallback recommendation for development/demo purposes
        recommendation = generateFallbackRecommendation(validatedQuizData);
      }
      
      // Combine quiz data and recommendation
      const quizResultData = {
        ...validatedQuizData,
        ...recommendation
      };
      
      // Store the result
      await storage.createCareerQuizResult(quizResultData);
      
      console.log("Career path recommendation generated and stored");
      
      // Return the recommendation to the client
      res.status(200).json({
        success: true,
        recommendation
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          message: "Invalid quiz data", 
          errors: error.errors 
        });
      } else {
        console.error("Error processing career quiz:", error);
        res.status(500).json({ 
          message: "Failed to process career quiz. Please try again." 
        });
      }
    }
  });
  
  // Fallback recommendation function when OpenAI API is unavailable
  function generateFallbackRecommendation(quizData: QuizResults) {
    // Simple logic to determine a career path based on the quiz data
    const hasLeadership = quizData.skills.includes("leadership") || 
                         quizData.workStyle.includes("leader");
    const hasSales = quizData.skills.includes("sales") || 
                    quizData.skills.includes("communication");
    const hasFinancialKnowledge = quizData.skills.includes("financial-knowledge");
    const wantsIndependence = quizData.workStyle.includes("independent");
    const wantsTeam = quizData.workStyle.includes("team-player");
    const hasHighFinancialGoals = quizData.financialGoals === "financial-freedom" || 
                                 quizData.financialGoals === "build-wealth" ||
                                 quizData.financialGoals === "create-legacy";
    
    let recommendedPath: string;
    let explanation: string;
    let strengths: string[] = [];
    let developmentAreas: string[] = [];
    let nextSteps: string[] = [];
    let estimatedTimeframe: string;
    
    if (hasLeadership && hasHighFinancialGoals && hasSales) {
      recommendedPath = "Senior Marketing Director";
      explanation = "Your leadership skills, sales experience, and ambitious financial goals align perfectly with the Senior Marketing Director role. This position allows you to build and lead multiple teams while maximizing your earning potential.";
      strengths = [
        "Proven leadership abilities",
        "Strong sales and communication skills",
        "Goal-oriented mindset",
        "Ability to motivate and inspire others"
      ];
      developmentAreas = [
        "Advanced team management strategies", 
        "Recruiting and retention techniques",
        "Systems thinking for organizational growth"
      ];
      nextSteps = [
        "Schedule a meeting with a current Senior Marketing Director",
        "Review the WFG compensation structure for leadership positions",
        "Develop a 90-day plan for building your initial team"
      ];
      estimatedTimeframe = "2-3 years to reach Senior Marketing Director level with dedicated effort";
    } else if (hasLeadership && wantsTeam) {
      recommendedPath = "Marketing Director";
      explanation = "Your leadership capabilities and team-oriented approach make you an excellent fit for the Marketing Director role. This position lets you build and lead your own team while developing your management skills.";
      strengths = [
        "Team leadership abilities",
        "Collaborative work style",
        "Strong interpersonal skills",
        "Ability to coordinate group efforts"
      ];
      developmentAreas = [
        "Team recruitment strategies", 
        "Performance management techniques",
        "Developing training systems"
      ];
      nextSteps = [
        "Attend a team building workshop",
        "Create your personal recruitment strategy",
        "Meet with successful Marketing Directors to learn their best practices"
      ];
      estimatedTimeframe = "12-18 months to develop a solid team with consistent effort";
    } else if (hasSales && hasFinancialKnowledge) {
      recommendedPath = "Financial Advisor";
      explanation = "Your combination of sales aptitude and financial knowledge makes you ideally suited for the Financial Advisor role. This position allows you to directly help clients while building a solid income stream.";
      strengths = [
        "Strong product knowledge",
        "Client-focused approach",
        "Communication and persuasion skills",
        "Problem-solving abilities"
      ];
      developmentAreas = [
        "Advanced financial planning strategies", 
        "Client relationship management",
        "Needs-based selling techniques"
      ];
      nextSteps = [
        "Complete product training courses",
        "Shadow experienced advisors on client meetings",
        "Develop your unique value proposition for clients"
      ];
      estimatedTimeframe = "6-12 months to become a productive Financial Advisor";
    } else if (wantsIndependence) {
      recommendedPath = "Financial Services Associate";
      explanation = "Your preference for independent work makes the Financial Services Associate role a good starting point. This entry-level position will give you the fundamentals while allowing you to work at your own pace.";
      strengths = [
        "Self-motivated approach",
        "Ability to work independently",
        "Eagerness to learn",
        "Attention to detail"
      ];
      developmentAreas = [
        "Financial services fundamentals", 
        "Time management and productivity",
        "Client prospecting techniques"
      ];
      nextSteps = [
        "Complete the basic training program",
        "Obtain necessary licenses",
        "Begin building your prospect list"
      ];
      estimatedTimeframe = "3-6 months to get established and begin producing regularly";
    } else {
      recommendedPath = "Financial Services Associate";
      explanation = "Based on your profile, starting as a Financial Services Associate would provide you with the foundation needed to explore different career paths within WFG while learning the business fundamentals.";
      strengths = [
        "Willingness to learn new skills",
        "Adaptable work approach",
        "Growth mindset",
        "Interest in financial services"
      ];
      developmentAreas = [
        "Financial industry knowledge", 
        "Sales and communication skills",
        "Professional network development"
      ];
      nextSteps = [
        "Complete WFG's new associate training program",
        "Identify a mentor within the organization",
        "Set specific 90-day learning goals"
      ];
      estimatedTimeframe = "3-6 months to establish your foundation in the business";
    }
    
    return {
      recommendedPath,
      explanation,
      strengths,
      developmentAreas,
      nextSteps,
      estimatedTimeframe
    };
  }
  
  // API route for retrieving resources
  app.get("/api/resources", (req, res) => {
    // This would typically fetch from a database, but for this implementation
    // we'll return mock data representing the resources
    const resources = [
      {
        id: 1,
        title: "Compensation Guide",
        description: "Complete breakdown of the WFG compensation structure and bonus programs.",
        fileType: "PDF",
        downloadUrl: "/resources/compensation-guide.pdf"
      },
      {
        id: 2,
        title: "Commission Spreadsheet",
        description: "Advanced Excel tool for tracking your sales, commissions, and team overrides.",
        fileType: "Excel",
        downloadUrl: "/resources/commission-tracker.xlsx"
      },
      {
        id: 3,
        title: "Recruitment Kit",
        description: "Templates and scripts to help you build your team more effectively.",
        fileType: "ZIP",
        downloadUrl: "/resources/recruitment-kit.zip"
      },
      {
        id: 4,
        title: "Training Videos",
        description: "Comprehensive video library covering sales techniques, product knowledge, and team building.",
        fileType: "Video",
        url: "/resources/training-videos"
      },
      {
        id: 5,
        title: "Event Calendar",
        description: "Stay updated on upcoming training sessions, webinars, and recognition events.",
        fileType: "Calendar",
        url: "/resources/calendar"
      },
      {
        id: 6,
        title: "Support Resources",
        description: "Contact information for various departments and technical support.",
        fileType: "Directory",
        url: "/resources/support"
      }
    ];
    
    res.json(resources);
  });

  const httpServer = createServer(app);

  return httpServer;
}
