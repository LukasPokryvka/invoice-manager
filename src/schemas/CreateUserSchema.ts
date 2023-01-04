import * as z from "zod";

export const createUserInput = z
  .object({
    name: z
      .string({
        required_error: "Name is required",
      })
      .min(3, {
        message: "Name must be at least 3 characters long",
      }),
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
    passwordConfirm: z
      .string({
        required_error: "Confirm password is required",
      })
      .min(5, {
        message: "Confirm password must be at least 5 characters long",
      }),
  })
  .superRefine(({ password, passwordConfirm }, ctx) => {
    if (password !== passwordConfirm) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
        path: ["passwordConfirm"],
      });
    }
  });

export type CreateUserSchema = z.TypeOf<typeof createUserInput>;
