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
      
      // Generate AI recommendation
      const aiRecommendation = await generateCareerRecommendation(validatedQuizData);
      
      // In a production app, we would save this to the database
      // const quizResultData = {
      //   ...validatedQuizData,
      //   ...aiRecommendation
      // };
      
      console.log("Career path recommendation generated");
      
      // Return the recommendation to the client
      res.status(200).json({
        success: true,
        recommendation: aiRecommendation
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
