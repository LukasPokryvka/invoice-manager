import * as z from "zod";

export const clientInput = z.object({
  companyName: z.string().optional(),
  streetAndNumber: z.string().optional(),
  zip: z
    .string()
    .length(5, {
      message: "ZIP must be 5 characters long",
    })
    .optional(),
  city: z.string().optional(),
  country: z.string().optional(),
  ico: z
    .string()
    .length(8, {
      message: "ICO must be 8 characters long",
    })
    .optional(),
  dic: z
    .string()
    .length(10, {
      message: "DIC must be 8 characters long",
    })
    .optional(),
  icdph: z
    .string()
    .length(12, {
      message: "ICDPH must be 8 characters long",
    })
    .optional(),
  userId: z.string().optional(),
});

export type ClientSchema = z.infer<typeof clientInput>;
