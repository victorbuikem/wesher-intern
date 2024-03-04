import { createId } from "@paralleldrive/cuid2";
import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const author = pgTable("author", {
  id: text("id").$defaultFn(createId).notNull().primaryKey(),
  name: text("name"),
  email: text("email").notNull(),
  //   password: text("password")
  //   image: text("image"),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow(),
});

export const category = pgTable("category", {
  id: text("id").$defaultFn(createId).notNull().primaryKey(),
  name: text("category").notNull(),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow(),
});

export const book = pgTable("book", {
  id: text("id").$defaultFn(createId).notNull().primaryKey(),
  title: text("title").notNull().unique(),
  author: text("author")
    .notNull()
    .references(() => author.id),
  category: text("category").notNull(),
  // .references(() => category.name),
  isbn: text("isbn").notNull(),
  publicationYear: integer("publication_year").notNull(),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow(),
});
