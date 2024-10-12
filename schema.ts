import * as z from "zod";

export const deckFormSchema = z.object({
  name: z
    .string({ message: "Deck name must be string" })
    .min(3, { message: "Deck name must be at least 3 characters" })
    .max(50, { message: "Deck name must be less than 50 characters" }),
  tags: z
    .string({ message: "Tags must be string" })
    .min(3, { message: "Tags must be at least 3 characters" })
    .max(20, { message: "Tags must be less than 20 characters" })
    .optional(),
});

export const cardFormSchema = z.object({
  front: z
    .string({ message: "Card's front must be string" })
    .min(3, { message: "Card's front must be at least 3 characters" })
    .max(50, { message: "Card's front must be less than 50 characters" }),
  back: z
    .string({ message: "Card's back must be string" })
    .min(3, { message: "Card's back must be at least 3 characters" })
    .max(200, { message: "Card's back must be less than 200 characters" }),
  tag: z.string({ message: "Tag must be string" }).optional(),
  deckId: z.string(),
});
