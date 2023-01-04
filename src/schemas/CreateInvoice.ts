import * as z from "zod";

export const createInvoiceInput = z.object({
  invoiceId: z.string(),
  userId: z.string(),
});

export type CreateInvoiceSchema = z.TypeOf<typeof createInvoiceInput>;
