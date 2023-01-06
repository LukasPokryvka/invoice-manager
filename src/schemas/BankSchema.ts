import * as z from "zod";

export const bankInput = z.object({
  userId: z.string().optional(),
  bankName: z.string().optional(),
  swift: z.string().optional(),
  iban: z.string().optional(),
});

export type BankSchema = z.infer<typeof bankInput>;
