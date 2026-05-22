import { pgTable, text, serial, timestamp, boolean, real, integer, pgEnum } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const serviceTypeEnum = pgEnum("service_type", [
  "electrician",
  "plumber",
  "carpenter",
  "ac_repair",
  "tutor",
  "mechanic",
  "beautician",
  "delivery",
  "freelancer",
]);

export const providersTable = pgTable("providers", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  name: text("name").notNull(),
  photo: text("photo"),
  serviceType: serviceTypeEnum("service_type").notNull(),
  description: text("description").notNull(),
  skills: text("skills").array().notNull().default([]),
  rating: real("rating").notNull().default(0),
  totalReviews: integer("total_reviews").notNull().default(0),
  available: boolean("available").notNull().default(true),
  city: text("city").notNull().default("Delhi"),
  distanceKm: real("distance_km"),
  pricePerHour: real("price_per_hour").notNull(),
  earningsTotal: real("earnings_total").notNull().default(0),
  verified: boolean("verified").notNull().default(false),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertProviderSchema = createInsertSchema(providersTable).omit({ id: true, createdAt: true });
export type InsertProvider = z.infer<typeof insertProviderSchema>;
export type Provider = typeof providersTable.$inferSelect;
