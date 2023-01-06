import { useQuery } from "@tanstack/react-query";
import { ClientResponseError } from "pocketbase";
import { client } from "../backend/apiClient";
import { BankSchema } from "../schemas/BankSchema";

export const createBank = async () => {
  const userId = client.authStore.model?.id;

  if (!userId) {
    throw new Error("No active userId found!");
  }

  try {
    const result = await client.collection("bank").create({
      userId,
      bankName: "",
      swift: "",
      iban: "",
    });

    return result;
  } catch (e: unknown) {
    console.log(e as ClientResponseError);
  }
};

export const updateBank = async ({
  bankId,
  bankData,
}: {
  bankId: string;
  bankData: BankSchema;
}) => await client.collection("bank").update(bankId, bankData);

export const deleteBank = async (bankId: string) =>
  await client.collection("bank").delete(bankId);

export const getBanks = async () =>
  await client.collection("bank").getFullList(50, {
    sort: "-created",
  });

export const useClients = () =>
  useQuery({
    queryKey: ["banks"],
    queryFn: getBanks,
  });

export const getBank = async (bankId: string) =>
  await client.collection("bank").getOne(bankId);

export const useClient = (bankId: string) =>
  useQuery({
    queryKey: ["client", bankId],
    queryFn: () => getBank(bankId),
    enabled: !!bankId,
  });
