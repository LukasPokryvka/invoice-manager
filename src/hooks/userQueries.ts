import { CreateUserSchema } from "../schemas/CreateUserSchema";
import { client } from "../backend/apiClient";
import { LoginUserSchema } from "../schemas/LoginUserSchema";
import { UserBasicInformationSchema } from "../schemas/UserProfileInformation";
import { useQuery } from "@tanstack/react-query";

export const createUser = async (userData: CreateUserSchema) =>
  await client.collection("users").create(userData);

export const loginUser = async (loginData: LoginUserSchema) =>
  await client
    .collection("users")
    .authWithPassword(loginData.username, loginData.password);

export const updateUser = async (profileData: UserBasicInformationSchema) => {
  const userId = await client.authStore.model?.id;

  if (userId) {
    return await client.collection("users").update(userId, {
      profile: profileData,
    });
  }
};

const getUser = async () => {
  const userId = await client.authStore.model?.id;
  if (userId) {
    return await client.collection("users").getOne(userId);
  }
};

export const useUser = () =>
  useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });
