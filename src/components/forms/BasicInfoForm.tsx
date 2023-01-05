import { zodResolver } from "@hookform/resolvers/zod";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { updateUser } from "../../hooks/userQueries";
import {
  userBasicInformationInput,
  UserBasicInformationSchema,
} from "../../schemas/UserProfileInformation";
import InputError from "../InputError";

interface IProps {
  userData: any;
  queryClient: QueryClient;
}

const BasicInfoForm: React.FunctionComponent<IProps> = ({
  userData,
  queryClient,
}) => {
  const { mutate } = useMutation(updateUser, {
    onSuccess: () => {
      toast.success("Basic information saved successfuly");
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
    onError: (e) => {
      console.log(e);
    },
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<UserBasicInformationSchema>({
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
    values: userData?.profile,
  });
  return (
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
          {errors.zip?.message && <InputError message={errors.zip.message} />}
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
  );
};

export default BasicInfoForm;
