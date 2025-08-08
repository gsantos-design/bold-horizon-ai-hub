import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertInquirySchema, 
  quizResultsSchema, 
  insertCareerQuizResultSchema,
  insertLeadSchema,
  updateLeadSchema,
  roundRobinConfigSchema,
  type QuizResults 
} from "@shared/schema";
import { generateCareerRecommendation } from "./openai";
import { z } from "zod";

// Simple authentication middleware for demo purposes
// In production, you would use proper authentication
const authenticateUser = async (req: any, res: any, next: any) => {
  const userEmail = req.headers['x-user-email'] as string;
  const userRole = req.headers['x-user-role'] as string || 'team';
  
  if (!userEmail) {
    return res.status(401).json({ message: 'Authentication required' });
  }
  
  req.user = { email: userEmail, role: userRole };
  next();
};

// Check if user is founder
const requireFounder = (req: any, res: any, next: any) => {
  if (req.user?.role !== 'founder') {
    return res.status(403).json({ message: 'Founder access required' });
  }
  next();
};

export async function registerRoutes(app: Express): Promise<Server> {
  // Convert inquiries to leads
  app.post("/api/inquiries/convert/:id", authenticateUser, async (req: any, res) => {
    try {
      const inquiryId = parseInt(req.params.id);
      // In a real implementation, you'd fetch the inquiry and convert it
      // For now, we'll just acknowledge the conversion
      res.json({ message: "Inquiry converted to lead successfully" });
    } catch (error) {
      console.error("Error converting inquiry:", error);
      res.status(500).json({ message: "Failed to convert inquiry" });
    }
  });
  
  // API route for handling contact form submissions (now creates leads)
  app.post("/api/inquiries", async (req, res) => {
    try {
      // Validate the request body using the schema
      const validatedData = insertInquirySchema.parse(req.body);
      
      // Store the inquiry
      const inquiry = await storage.createInquiry(validatedData);
      
      // Also create a lead from the inquiry
      const leadData = {
        firstName: validatedData.name.split(' ')[0] || validatedData.name,
        lastName: validatedData.name.split(' ').slice(1).join(' ') || '',
        email: validatedData.email,
        phone: validatedData.phone,
        status: 'new' as const,
        source: 'website' as const,
        notes: `Interest: ${validatedData.interest}. Message: ${validatedData.message}`,
        ownerEmail: await storage.getNextOwner() || undefined
      };
      
      await storage.createLead(leadData);
      
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
  
  // Lead Management APIs
  
  // Create a new lead
  app.post("/api/leads", async (req, res) => {
    try {
      const validatedData = insertLeadSchema.parse(req.body);
      
      // Auto-assign owner if not specified using round-robin
      if (!validatedData.ownerEmail) {
        const nextOwner = await storage.getNextOwner();
        if (nextOwner) {
          validatedData.ownerEmail = nextOwner;
        }
      }
      
      const lead = await storage.createLead(validatedData);
      res.status(201).json(lead);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid lead data", errors: error.errors });
      } else {
        console.error("Error creating lead:", error);
        res.status(500).json({ message: "Failed to create lead" });
      }
    }
  });
  
  // Get leads (respects permissions)
  app.get("/api/leads", authenticateUser, async (req: any, res) => {
    try {
      const leads = await storage.getLeads(req.user.email, req.user.role);
      res.json(leads);
    } catch (error) {
      console.error("Error fetching leads:", error);
      res.status(500).json({ message: "Failed to fetch leads" });
    }
  });
  
  // Get single lead
  app.get("/api/leads/:id", authenticateUser, async (req: any, res) => {
    try {
      const id = parseInt(req.params.id);
      const lead = await storage.getLeadById(id);
      
      if (!lead) {
        return res.status(404).json({ message: "Lead not found" });
      }
      
      // Check permissions - team members can only access their own leads
      if (req.user.role !== 'founder' && lead.ownerEmail !== req.user.email) {
        return res.status(403).json({ message: "Access denied" });
      }
      
      res.json(lead);
    } catch (error) {
      console.error("Error fetching lead:", error);
      res.status(500).json({ message: "Failed to fetch lead" });
    }
  });
  
  // Update lead
  app.patch("/api/leads/:id", authenticateUser, async (req: any, res) => {
    try {
      const id = parseInt(req.params.id);
      const validatedData = updateLeadSchema.parse(req.body);
      
      // Check if lead exists and user has permission
      const existingLead = await storage.getLeadById(id);
      if (!existingLead) {
        return res.status(404).json({ message: "Lead not found" });
      }
      
      if (req.user.role !== 'founder' && existingLead.ownerEmail !== req.user.email) {
        return res.status(403).json({ message: "Access denied" });
      }
      
      const updatedLead = await storage.updateLead(id, validatedData);
      res.json(updatedLead);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid update data", errors: error.errors });
      } else {
        console.error("Error updating lead:", error);
        res.status(500).json({ message: "Failed to update lead" });
      }
    }
  });
  
  // Delete lead (founders only)
  app.delete("/api/leads/:id", authenticateUser, requireFounder, async (req: any, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteLead(id);
      
      if (!success) {
        return res.status(404).json({ message: "Lead not found" });
      }
      
      res.json({ message: "Lead deleted successfully" });
    } catch (error) {
      console.error("Error deleting lead:", error);
      res.status(500).json({ message: "Failed to delete lead" });
    }
  });
  
  // CSV Export (respects permissions)
  app.get("/api/leads/export", authenticateUser, async (req: any, res) => {
    try {
      const leads = await storage.getLeads(req.user.email, req.user.role);
      
      // Create CSV content
      const csvHeaders = [
        'ID', 'First Name', 'Last Name', 'Email', 'Phone', 
        'Status', 'Source', 'Owner Email', 'Notes', 
        'Last Contact Date', 'Next Follow Up', 'Created At', 'Updated At'
      ];
      
      const csvRows = leads.map(lead => [
        lead.id,
        lead.firstName || '',
        lead.lastName || '',
        lead.email || '',
        lead.phone || '',
        lead.status || '',
        lead.source || '',
        lead.ownerEmail || '',
        (lead.notes || '').replace(/["\r\n]/g, ' '), // Clean notes for CSV
        lead.lastContactDate ? lead.lastContactDate.toISOString() : '',
        lead.nextFollowUp ? lead.nextFollowUp.toISOString() : '',
        lead.createdAt ? lead.createdAt.toISOString() : '',
        lead.updatedAt ? lead.updatedAt.toISOString() : ''
      ]);
      
      const csvContent = [csvHeaders, ...csvRows]
        .map(row => row.map(field => `"${field}"`).join(','))
        .join('\n');
      
      const timestamp = new Date().toISOString().split('T')[0];
      const filename = `leads-export-${timestamp}.csv`;
      
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
      res.send(csvContent);
    } catch (error) {
      console.error("Error exporting leads:", error);
      res.status(500).json({ message: "Failed to export leads" });
    }
  });
  
  // Round Robin Admin APIs (founders only)
  
  // Get current round robin configuration
  app.get("/api/admin/round-robin", authenticateUser, requireFounder, async (req: any, res) => {
    try {
      const config = await storage.getRoundRobinConfig();
      res.json(config || { ownerEmails: [], currentIndex: 0 });
    } catch (error) {
      console.error("Error fetching round robin config:", error);
      res.status(500).json({ message: "Failed to fetch configuration" });
    }
  });
  
  // Update round robin configuration
  app.post("/api/admin/round-robin", authenticateUser, requireFounder, async (req: any, res) => {
    try {
      const validatedData = roundRobinConfigSchema.parse(req.body);
      const config = await storage.updateRoundRobinConfig(validatedData);
      res.json(config);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid configuration data", errors: error.errors });
      } else {
        console.error("Error updating round robin config:", error);
        res.status(500).json({ message: "Failed to update configuration" });
      }
    }
  });
  
  // Get next owner in round robin
  app.get("/api/admin/next-owner", authenticateUser, requireFounder, async (req: any, res) => {
    try {
      const nextOwner = await storage.getNextOwner();
      res.json({ nextOwner });
    } catch (error) {
      console.error("Error getting next owner:", error);
      res.status(500).json({ message: "Failed to get next owner" });
    }
  });
  
  // Development endpoint to initialize sample data
  app.post("/api/dev/init-data", async (req, res) => {
    try {
      // Initialize round robin config
      await storage.updateRoundRobinConfig({
        ownerEmails: ['nolly@santiago-team.com', 'paul@santiago-team.com'],
        currentIndex: 0
      });
      
      // Create sample leads
      const sampleLeads = [
        {
          firstName: 'John',
          lastName: 'Doe', 
          email: 'john.doe@example.com',
          phone: '+1-555-0101',
          status: 'new' as const,
          source: 'website' as const,
          ownerEmail: 'nolly@santiago-team.com',
          notes: 'Interested in financial planning from career quiz'
        },
        {
          firstName: 'Maria',
          lastName: 'Garcia',
          email: 'maria.garcia@example.com', 
          phone: '+1-555-0102',
          status: 'contacted' as const,
          source: 'referral' as const,
          ownerEmail: 'paul@santiago-team.com',
          notes: 'Referred by existing client, interested in team opportunity'
        },
        {
          firstName: 'David',
          lastName: 'Smith',
          email: 'david.smith@example.com',
          phone: '+1-555-0103', 
          status: 'meeting_booked' as const,
          source: 'website' as const,
          ownerEmail: 'nolly@santiago-team.com',
          notes: 'Scheduled initial consultation for next week'
        },
        {
          firstName: 'Sarah',
          lastName: 'Johnson',
          email: 'sarah.johnson@example.com',
          phone: '+1-555-0104',
          status: 'new' as const,
          source: 'website' as const, 
          ownerEmail: 'paul@santiago-team.com',
          notes: 'Submitted contact form, interested in The New Art of Living'
        }
      ];
      
      for (const leadData of sampleLeads) {
        try {
          await storage.createLead(leadData);
        } catch (error) {
          // Lead might already exist, continue
          console.log(`Lead ${leadData.email} might already exist`);
        }
      }
      
      res.json({ message: 'Sample data initialized successfully', leadsCreated: sampleLeads.length });
    } catch (error) {
      console.error('Error initializing sample data:', error);
      res.status(500).json({ message: 'Failed to initialize sample data' });
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
