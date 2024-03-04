import z from "zod";

export const bookSchema = z.object({
  title: z.string().min(2, "The title has a minimum length of 2"),
  author: z.string(),
  category: z.string(),
  publicationYear: z.number(),
  ISBN: z.string(),
});

export const bookSchemaUpdate = z.object({
  title: z.string().min(2, "The title has a minimum length of 2").optional(),
  author: z.string().optional(),
  category: z.string().optional(),
  publicationYear: z.number().optional(),
  ISBN: z.string().optional(),
});

export const authorSchema = z.object({
  name: z.string(),
  email: z.string().email(),
});

export const authorSchemaUpdate = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
});

export const categorySchema = z.object({
  name: z.string(),
});

export const categorySchemaUpdate = z.object({
  name: z.string(),
});
