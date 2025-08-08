import { 
  users, 
  type User, 
  type InsertUser, 
  inquiries, 
  type Inquiry, 
  type InsertInquiry,
  careerQuizResults,
  type CareerQuizResult,
  type InsertCareerQuizResult,
  leads,
  type Lead,
  type InsertLead,
  type UpdateLead,
  roundRobinConfig,
  type RoundRobinConfig,
  type InsertRoundRobinConfig
} from "@shared/schema";
import { db } from "./db";
import { eq, and, desc } from "drizzle-orm";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Inquiry operations
  createInquiry(inquiry: InsertInquiry): Promise<Inquiry>;
  
  // Career quiz operations
  createCareerQuizResult(quizResult: InsertCareerQuizResult): Promise<CareerQuizResult>;
  getCareerQuizResultByEmail(email: string): Promise<CareerQuizResult | undefined>;
  
  // Lead operations
  createLead(lead: InsertLead): Promise<Lead>;
  getLeads(userEmail?: string, userRole?: string): Promise<Lead[]>;
  getLeadById(id: number): Promise<Lead | undefined>;
  updateLead(id: number, updates: UpdateLead): Promise<Lead | undefined>;
  deleteLead(id: number): Promise<boolean>;
  
  // Round robin operations
  getRoundRobinConfig(): Promise<RoundRobinConfig | undefined>;
  updateRoundRobinConfig(config: InsertRoundRobinConfig): Promise<RoundRobinConfig>;
  getNextOwner(): Promise<string | undefined>;
}

export class DatabaseStorage implements IStorage {
  constructor() {}

  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async createInquiry(inquiry: InsertInquiry): Promise<Inquiry> {
    const [newInquiry] = await db.insert(inquiries).values(inquiry).returning();
    return newInquiry;
  }

  async createCareerQuizResult(quizResult: InsertCareerQuizResult): Promise<CareerQuizResult> {
    const [newQuizResult] = await db.insert(careerQuizResults).values(quizResult).returning();
    return newQuizResult;
  }

  async getCareerQuizResultByEmail(email: string): Promise<CareerQuizResult | undefined> {
    const [result] = await db.select().from(careerQuizResults).where(eq(careerQuizResults.email, email));
    return result;
  }

  // Lead operations
  async createLead(lead: InsertLead): Promise<Lead> {
    const [newLead] = await db.insert(leads).values(lead).returning();
    return newLead;
  }

  async getLeads(userEmail?: string, userRole?: string): Promise<Lead[]> {
    if (userRole === "founder") {
      // Founders can see all leads
      return await db.select().from(leads).orderBy(desc(leads.createdAt));
    } else if (userEmail) {
      // Team members can only see their own leads
      return await db.select().from(leads)
        .where(eq(leads.ownerEmail, userEmail))
        .orderBy(desc(leads.createdAt));
    } else {
      return [];
    }
  }

  async getLeadById(id: number): Promise<Lead | undefined> {
    const [lead] = await db.select().from(leads).where(eq(leads.id, id));
    return lead;
  }

  async updateLead(id: number, updates: UpdateLead): Promise<Lead | undefined> {
    const updateData = {
      ...updates,
      updatedAt: new Date()
    };
    const [updatedLead] = await db.update(leads)
      .set(updateData)
      .where(eq(leads.id, id))
      .returning();
    return updatedLead;
  }

  async deleteLead(id: number): Promise<boolean> {
    const result = await db.delete(leads).where(eq(leads.id, id));
    return (result.rowCount ?? 0) > 0;
  }

  // Round robin operations
  async getRoundRobinConfig(): Promise<RoundRobinConfig | undefined> {
    const [config] = await db.select().from(roundRobinConfig).limit(1);
    return config;
  }

  async updateRoundRobinConfig(configData: InsertRoundRobinConfig): Promise<RoundRobinConfig> {
    const existing = await this.getRoundRobinConfig();
    
    if (existing) {
      const [updated] = await db.update(roundRobinConfig)
        .set({ ...configData, updatedAt: new Date() })
        .where(eq(roundRobinConfig.id, existing.id))
        .returning();
      return updated;
    } else {
      const [created] = await db.insert(roundRobinConfig)
        .values(configData)
        .returning();
      return created;
    }
  }

  async getNextOwner(): Promise<string | undefined> {
    const config = await this.getRoundRobinConfig();
    
    if (!config || !config.ownerEmails || config.ownerEmails.length === 0) {
      return undefined;
    }

    const currentOwner = config.ownerEmails[config.currentIndex];
    const nextIndex = (config.currentIndex + 1) % config.ownerEmails.length;
    
    // Update the index for next time
    await this.updateRoundRobinConfig({
      ownerEmails: config.ownerEmails,
      currentIndex: nextIndex
    });

    return currentOwner;
  }
}

export const storage = new DatabaseStorage();
