import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const inquiries = pgTable("inquiries", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  interest: text("interest").notNull(),
  message: text("message").notNull(),
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

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
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
