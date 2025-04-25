import { 
  users, 
  type User, 
  type InsertUser, 
  inquiries, 
  type Inquiry, 
  type InsertInquiry,
  careerQuizResults,
  type CareerQuizResult,
  type InsertCareerQuizResult 
} from "@shared/schema";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createInquiry(inquiry: InsertInquiry): Promise<Inquiry>;
  createCareerQuizResult(quizResult: InsertCareerQuizResult): Promise<CareerQuizResult>;
  getCareerQuizResultByEmail(email: string): Promise<CareerQuizResult | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private inquiries: Map<number, Inquiry>;
  private careerQuizResults: Map<number, CareerQuizResult>;
  userCurrentId: number;
  inquiryCurrentId: number;
  quizResultCurrentId: number;

  constructor() {
    this.users = new Map();
    this.inquiries = new Map();
    this.careerQuizResults = new Map();
    this.userCurrentId = 1;
    this.inquiryCurrentId = 1;
    this.quizResultCurrentId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createInquiry(inquiry: InsertInquiry): Promise<Inquiry> {
    const id = this.inquiryCurrentId++;
    const newInquiry = {
      id,
      name: inquiry.name,
      email: inquiry.email,
      phone: inquiry.phone,
      interest: inquiry.interest,
      message: inquiry.message,
      createdAt: new Date()
    };
    this.inquiries.set(id, newInquiry as Inquiry);
    return newInquiry as Inquiry;
  }

  async createCareerQuizResult(quizResult: InsertCareerQuizResult): Promise<CareerQuizResult> {
    const id = this.quizResultCurrentId++;
    
    const newQuizResult = {
      id,
      email: quizResult.email,
      name: quizResult.name,
      background: quizResult.background,
      skills: quizResult.skills || [],
      motivations: quizResult.motivations || [],
      values: quizResult.values || [],
      workStyle: quizResult.workStyle || [],
      financialGoals: quizResult.financialGoals,
      recommendedPath: quizResult.recommendedPath || null,
      explanation: quizResult.explanation || null,
      strengths: quizResult.strengths || [],
      developmentAreas: quizResult.developmentAreas || [],
      nextSteps: quizResult.nextSteps || [],
      estimatedTimeframe: quizResult.estimatedTimeframe || null,
      createdAt: new Date()
    };
    
    this.careerQuizResults.set(id, newQuizResult as CareerQuizResult);
    return newQuizResult as CareerQuizResult;
  }

  async getCareerQuizResultByEmail(email: string): Promise<CareerQuizResult | undefined> {
    return Array.from(this.careerQuizResults.values()).find(
      (result) => result.email === email,
    );
  }
}

export const storage = new MemStorage();
