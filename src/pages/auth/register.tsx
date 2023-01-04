import { NextPage } from "next";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  createUserInput,
  CreateUserSchema,
} from "../../schemas/CreateUserSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import InputError from "../../components/InputError";
import { createUser } from "../../hooks/userQueries";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";

const Register: NextPage = () => {
  const [name, setName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUserSchema>({
    defaultValues: {
      name: "",
      username: "",
      password: "",
      passwordConfirm: "",
    },
    resolver: zodResolver(createUserInput),
    mode: "onSubmit",
  });

  const { mutate, isLoading } = useMutation(createUser, {
    onSuccess: () => {
      router.push("/auth/login");
    },
    onError: (e) => {
      console.log(e);
    },
  });

  return (
    <div className="flex flex-col justify-center items-center h-full">
      <h1 className="text-4xl mb-4">Register</h1>
      <form onSubmit={handleSubmit((data) => mutate(data))} className="w-72">
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">What is your name?</span>
          </label>
          <input
            type="text"
            className="input input-bordered w-full max-w-xs"
            {...register("name")}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name?.message && <InputError message={errors.name.message} />}
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Username</span>
          </label>
          <input
            type="text"
            className="input input-bordered w-full max-w-xs"
            {...register("username")}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {errors.username?.message && (
            <InputError message={errors.username.message} />
          )}
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            type="password"
            className="input input-bordered w-full max-w-xs"
            {...register("password")}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password?.message && (
            <InputError message={errors.password.message} />
          )}
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Confirm password</span>
          </label>
          <input
            type="password"
            className="input input-bordered w-full max-w-xs"
            {...register("passwordConfirm")}
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
          {errors.passwordConfirm?.message && (
            <InputError message={errors.passwordConfirm.message} />
          )}
        </div>
        <div className="text-center">
          <span className="text-xs">
            Already have an account?{" "}
            <Link href="/auth/login" className="underline">
              Log In
            </Link>
          </span>
        </div>
        <div className="mt-4 flex justify-center">
          <button type="submit" className="btn btn-primary ">
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
