import { useQuery } from "@tanstack/react-query";
import { client } from "../backend/apiClient";
import { CreateInvoiceSchema } from "../schemas/CreateInvoice";
import { InvoiceSchema } from "../schemas/InvoiceSchema";

export const createInvoice = async () => {
  const userId = await client.authStore.model?.id;

  return await client.collection("invoices").create({
    invoiceNumber: "",
    userId: userId,
    bank: {},
    client: {},
    items: [],
    vs: "",
    dateCreated: new Date(),
    dateDelivered: new Date(),
    dateToPay: new Date(),
  } as InvoiceSchema);
};

export const updateInvoice = async ({
  invoiceId,
  invoiceData,
}: {
  invoiceId: string;
  invoiceData: InvoiceSchema;
}) => await client.collection("invoices").update(invoiceId, invoiceData);

const getInvoices = async () =>
  await client.collection("invoices").getFullList(20, {
    sort: "-created",
  });

export const useInvoices = () =>
  useQuery({
    queryKey: ["invoices"],
    queryFn: getInvoices,
  });
