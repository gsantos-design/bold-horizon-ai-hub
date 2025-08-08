import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").unique(),
  role: text("role").notNull().default("team"), // "team" or "founder"
  isOwner: boolean("is_owner").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const inquiries = pgTable("inquiries", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  interest: text("interest").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const careerQuizResults = pgTable("career_quiz_results", {
  id: serial("id").primaryKey(),
  email: text("email").notNull(),
  name: text("name").notNull(),
  background: text("background").notNull(),
  skills: text("skills").array(),
  motivations: text("motivations").array(),
  values: text("values").array(),
  workStyle: text("work_style").array(),
  financialGoals: text("financial_goals").notNull(),
  recommendedPath: text("recommended_path"),
  explanation: text("explanation"),
  strengths: text("strengths").array(),
  developmentAreas: text("development_areas").array(),
  nextSteps: text("next_steps").array(),
  estimatedTimeframe: text("estimated_timeframe"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const leads = pgTable("leads", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  status: text("status").notNull().default("new"), // "new", "contacted", "meeting_booked", "closed", "lost"
  source: text("source").notNull().default("website"), // "website", "referral", "event", etc.
  ownerEmail: text("owner_email"),
  notes: text("notes"),
  calendlyLink: text("calendly_link"),
  lastContactDate: timestamp("last_contact_date"),
  nextFollowUp: timestamp("next_follow_up"),
  // v12 NEW FIELDS: Deal Amount Estimator
  company: text("company"),
  title: text("title"),
  industry: text("industry"),
  companySize: text("company_size"),
  location: text("location"),
  aiScore: integer("ai_score"),
  linkedinUrl: text("linkedin_url"),
  estimatedDealAmount: integer("estimated_deal_amount"), // v12 NEW
  dealProbability: integer("deal_probability"), // v12 NEW (stored as percentage 0-100)
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// AI Career Mentor Chatbot Schema
export const chatSessions = pgTable("chat_sessions", {
  id: serial("id").primaryKey(),
  sessionId: text("session_id").notNull().unique(),
  userEmail: text("user_email"),
  userName: text("user_name"),
  currentTopic: text("current_topic"),
  emotionalState: text("emotional_state"),
  userProfile: jsonb("user_profile"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const chatMessages = pgTable("chat_messages", {
  id: serial("id").primaryKey(),
  sessionId: text("session_id").notNull(),
  role: text("role").notNull(),
  content: text("content").notNull(),
  emotionalTone: text("emotional_tone"),
  followUpActions: text("follow_up_actions").array(),
  mentorPersonality: text("mentor_personality"),
  metadata: jsonb("metadata"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const roundRobinConfig = pgTable("round_robin_config", {
  id: serial("id").primaryKey(),
  ownerEmails: text("owner_emails").array().notNull().default([]),
  currentIndex: integer("current_index").notNull().default(0),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  email: true,
  role: true,
  isOwner: true,
});

export const insertLeadSchema = createInsertSchema(leads).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const updateLeadSchema = insertLeadSchema.partial();

export const roundRobinConfigSchema = createInsertSchema(roundRobinConfig).omit({
  id: true,
  updatedAt: true,
});

export const insertInquirySchema = createInsertSchema(inquiries);

// Schema for career quiz submission
export const quizResultsSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2),
  background: z.string(),
  skills: z.array(z.string()),
  motivations: z.array(z.string()),
  values: z.array(z.string()),
  workStyle: z.array(z.string()),
  financialGoals: z.string(),
});

export const careerRecommendationSchema = z.object({
  recommendedPath: z.string(),
  explanation: z.string(),
  strengths: z.array(z.string()),
  developmentAreas: z.array(z.string()),
  nextSteps: z.array(z.string()),
  estimatedTimeframe: z.string(),
});

export const insertCareerQuizResultSchema = createInsertSchema(careerQuizResults);

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertInquiry = z.infer<typeof insertInquirySchema>;
export type Inquiry = typeof inquiries.$inferSelect;

export type QuizResults = z.infer<typeof quizResultsSchema>;
export type CareerRecommendation = z.infer<typeof careerRecommendationSchema>;
export type CareerQuizResult = typeof careerQuizResults.$inferSelect;
export type InsertCareerQuizResult = z.infer<typeof insertCareerQuizResultSchema>;

export type Lead = typeof leads.$inferSelect;
export type InsertLead = z.infer<typeof insertLeadSchema>;
export type UpdateLead = z.infer<typeof updateLeadSchema>;
export type RoundRobinConfig = typeof roundRobinConfig.$inferSelect;
export type InsertRoundRobinConfig = z.infer<typeof roundRobinConfigSchema>;

// AI Career Mentor Types
export type ChatSession = typeof chatSessions.$inferSelect;
export type InsertChatSession = typeof chatSessions.$inferInsert;
export type ChatMessage = typeof chatMessages.$inferSelect;
export type InsertChatMessage = typeof chatMessages.$inferInsert;

// AI Career Mentor Validation Schemas
export const chatMessageSchema = z.object({
  sessionId: z.string(),
  content: z.string().min(1),
  userProfile: z.object({
    name: z.string().optional(),
    email: z.string().email().optional(),
    careerStage: z.string().optional(),
    goals: z.array(z.string()).optional(),
  }).optional(),
});

export type ChatMessageInput = z.infer<typeof chatMessageSchema>;
