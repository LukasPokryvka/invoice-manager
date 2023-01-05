import { zodResolver } from "@hookform/resolvers/zod";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { updateUser } from "../../hooks/userQueries";
import {
  userBasicInformationInput,
  UserBasicInformationSchema,
} from "../../schemas/UserProfileInformation";

interface IProps {
  userData: any;
  queryClient: QueryClient;
}

const RegisterForm: React.FunctionComponent<IProps> = ({
  userData,
  queryClient,
}) => {
  const { mutate } = useMutation(updateUser, {
    onSuccess: () => {
      toast.success("Register information saved.");
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
      payerType: "",
      register: "",
    },
    values: userData?.profile,
    resolver: zodResolver(userBasicInformationInput),
  });
  return (
    <form onSubmit={handleSubmit((data) => mutate(data))}>
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text">Type of payer</span>
        </label>
        <select
          className="select select-info w-full max-w-xl"
          {...register("payerType")}
        >
          <option value="Non-payer of VAT">Non-payer of VAT</option>
          <option value="VAT payer">VAT payer</option>
        </select>
      </div>
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text">Register</span>
        </label>
        <textarea
          className="textarea textarea-info h-8 w-full max-w-xl"
          {...register("register")}
        ></textarea>
      </div>
      <div className="mt-4">
        <button className="btn btn-primary">Save</button>
      </div>
    </form>
  );
};

export default RegisterForm;
