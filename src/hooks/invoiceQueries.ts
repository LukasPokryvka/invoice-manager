import { useQuery } from "@tanstack/react-query";
import { client } from "../backend/apiClient";
import { CreateInvoiceSchema } from "../schemas/CreateInvoice";

export const createInvoice = async () => {
  const userId = await client.authStore.model?.id;

  return await client.collection("invoices").create({
    invoiceId: "",
    userId: userId,
  } as CreateInvoiceSchema);
};

const getInvoices = async () =>
  await client.collection("invoices").getFullList(20, {
    sort: "-created",
  });

export const useInvoices = () =>
  useQuery({
    queryKey: ["invoices"],
    queryFn: getInvoices,
  });
