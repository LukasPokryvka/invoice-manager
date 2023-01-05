import { useQuery } from "@tanstack/react-query";
import { client } from "../backend/apiClient";
import { ClientSchema } from "../schemas/ClientSchema";

export const createClient = async () => {
  const userId = await client.authStore.model?.id;

  return await client.collection("client").create({
    companyName: "",
    userId: userId,
    streetAndNumber: "",
    zip: "",
    city: "",
    country: "",
    ico: "",
    dic: "",
    icdph: "",
  });
};

export const updateClient = async (
  clientId: string,
  clientData: ClientSchema
) => await client.collection("client").update(clientId, clientData);

export const getClients = async () =>
  await client.collection("client").getFullList(50, {
    sort: "-created",
  });

export const useClients = () =>
  useQuery({
    queryKey: ["clients"],
    queryFn: getClients,
  });

export const getClient = async (clientId: string) =>
  await client.collection("client").getOne(clientId);

export const useClient = (clientId: string) =>
  useQuery({
    queryKey: ["client", clientId],
    queryFn: () => getClient(clientId),
  });
