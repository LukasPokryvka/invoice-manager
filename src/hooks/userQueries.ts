import { CreateUserSchema } from "../schemas/CreateUserSchema";
import { client } from "../backend/apiClient";
import { LoginUserSchema } from "../schemas/LoginUserSchema";

export const createUser = async (userData: CreateUserSchema) =>
  await client.collection("users").create(userData);

export const loginUser = async (loginData: LoginUserSchema) =>
  await client
    .collection("users")
    .authWithPassword(loginData.username, loginData.password);
