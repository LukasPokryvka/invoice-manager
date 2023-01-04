import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { NextPage } from "next";
import { useForm } from "react-hook-form";
import withAuth from "../../components/withAuth";
import { updateUser, useUser } from "../../hooks/userQueries";
import {
  userBasicInformationInput,
  UserBasicInformationSchema,
} from "../../schemas/UserBasicInformation";

const Profile: NextPage = () => {
  const { data } = useUser();
  console.log("data", data);
  const queryClient = useQueryClient();
  const { mutate } = useMutation(updateUser, {
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
    onError: (e) => {
      console.log(e);
    },
  });
  const { handleSubmit, register } = useForm<UserBasicInformationSchema>({
    defaultValues: {
      companyName: "",
      streetAndNumber: "",
      zip: "",
      city: "",
      country: "",
      ico: "",
      dic: "",
      icdph: "",
    },
    resolver: zodResolver(userBasicInformationInput),
    values: data?.profile,
  });
  return (
    <div>
      <section>
        <div className="card bg-neutral shadow-xl w-3/5">
          <div className="card-body">
            <h2 className="card-title">Basic information</h2>
            <form onSubmit={handleSubmit((data) => mutate(data))}>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Company name</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered input-info w-full max-w-xl"
                  {...register("companyName")}
                />
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Street and no.</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered input-info w-full max-w-xl"
                  {...register("streetAndNumber")}
                />
              </div>
              <div className="flex gap-4">
                <div className="form-control w-28">
                  <label className="label">
                    <span className="label-text">ZIP</span>
                  </label>
                  <input
                    type="text"
                    className="input input-bordered input-info w-full max-w-xs"
                    {...register("zip")}
                  />
                </div>
                <div className="form-control w-full max-w-md">
                  <label className="label">
                    <span className="label-text">City</span>
                  </label>
                  <input
                    type="text"
                    className="input input-bordered input-info w-full max-w-md"
                    {...register("city")}
                  />
                </div>
              </div>
              <div className="form-control w-full max-w-xl">
                <label className="label">
                  <span className="label-text">Country</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered input-info w-full max-w-xl"
                  {...register("country")}
                />
              </div>
              <div className="flex gap-4 max-w-xl">
                <div className="form-control w-1/2">
                  <label className="label">
                    <span className="label-text">ICO</span>
                  </label>
                  <input
                    type="text"
                    className="input input-bordered input-info w-full"
                    {...register("ico")}
                  />
                </div>
                <div className="form-control w-1/2">
                  <label className="label">
                    <span className="label-text">DIC</span>
                  </label>
                  <input
                    type="text"
                    className="input input-bordered input-info w-full"
                    {...register("dic")}
                  />
                </div>
              </div>
              <div className="form-control w-full max-w-xl">
                <label className="label">
                  <span className="label-text">IC DPH</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered input-info w-full max-w-xl"
                  {...register("icdph")}
                />
              </div>
              <div className="mt-4">
                <button className="btn btn-primary">Save</button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default withAuth(Profile);
