import { z } from "zod";
import { bankInput } from "./BankSchema";
import { clientInput } from "./ClientSchema";

export const baseInvoiceInput = z
  .object({
    invoiceNumber: z.string(),
    userId: z.string(),
    dateCreated: z.date(),
    dateDelivered: z.date(),
    dateToPay: z.date(),
    vs: z.string(),
    // items: z
    //   .object({
    //     name: z.string(),
    //     type: z.string().optional(),
    //     amount: z.string(),
    //     price: z.string(),
    //     description: z.string().optional(),
    //   })
    //   .array(),
  })
  .partial();

// const bankToMerge = bankInput.omit({ userId: true });
// const clientToMerge = clientInput.omit({ userId: true });

const invoiceAndBankInput = baseInvoiceInput.merge(
  z.object({
    bank: bankInput.optional(),
  })
);

export const invoiceInput = invoiceAndBankInput.merge(
  z.object({
    client: clientInput.optional(),
  })
);

export type InvoiceSchema = z.infer<typeof invoiceInput>;
