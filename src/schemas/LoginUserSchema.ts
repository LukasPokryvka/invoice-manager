import * as z from "zod";

export const loginUserInput = z.object({
  username: z
    .string({
      required_error: "Username is required",
    })
    .min(3, {
      message: "Name must be at least 3 characters long",
    }),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(5, {
      message: "Password must be at least 5 characters long.",
    }),
});

export type LoginUserSchema = z.TypeOf<typeof loginUserInput>;
