import z from "zod";

export const bookSchema = z.object({
  title: z.string().min(2, "The title has a minimum length of 2"),
  author: z.string(),
  category: z.string(),
  publicationYear: z.number(),
  ISBN: z.string(),
});

export const authorSchema = z.object({
  name: z.string(),
  email: z.string().email(),
});

export const categorySchema = z.object({
  name: z.string(),
});
