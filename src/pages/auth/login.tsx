import { NextPage } from "next";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputError from "../../components/InputError";
import { loginUser } from "../../hooks/userQueries";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { loginUserInput, LoginUserSchema } from "../../schemas/LoginUserSchema";

const Login: NextPage = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const router = useRouter();
  const notify = (text: string) => toast(text);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginUserSchema>({
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: zodResolver(loginUserInput),
    mode: "onSubmit",
  });

  const { mutate, isLoading } = useMutation(loginUser, {
    onSuccess: (data: any) => {
      console.log(data);
      router.push("/dashboard");
    },
    onError: (e) => {
      console.log(e);
    },
  });

  return (
    <div className="flex flex-col justify-center items-center h-full">
      <h1 className="text-4xl mb-4">Login</h1>
      <form onSubmit={handleSubmit((data) => mutate(data))} className="w-72">
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
        <div className="mt-4 flex justify-between">
          <button type="submit" className="btn btn-primary ">
            Login
          </button>
          <Link href="/auth/register" className="btn btn-secondary">
            Register
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
