import { zodResolver } from "@hookform/resolvers/zod";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { updateBank, useBank } from "../../hooks/bankQueries";
import { bankInput, BankSchema } from "../../schemas/BankSchema";

interface IProps {
  bankId: string;
  queryClient: QueryClient;
}

const BankForm: React.FunctionComponent<IProps> = ({ bankId, queryClient }) => {
  const router = useRouter();
  const { data, isLoading } = useBank(bankId);
  const { mutate } = useMutation(updateBank, {
    onSuccess: () => {
      toast.success("Bank updated successfuly");
      queryClient.invalidateQueries({ queryKey: ["bank", bankId] });
      queryClient.invalidateQueries({ queryKey: ["banks"] });
      router.push("/bank");
    },
    onError: (e) => {
      console.log(e);
    },
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<BankSchema>({
    defaultValues: {
      bankName: "",
      iban: "",
      swift: "",
    },
    resolver: zodResolver(bankInput),
    values: data as BankSchema,
  });

  if (isLoading) {
    return <div>Loading</div>;
  }

  return (
    <form
      onSubmit={handleSubmit((data) =>
        mutate({
          bankId,
          bankData: data,
        })
      )}
    >
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text">Bank name</span>
        </label>
        <input
          type="text"
          className="input input-bordered input-info w-full max-w-xl"
          {...register("bankName")}
        />
      </div>
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text">IBAN</span>
        </label>
        <input
          type="text"
          className="input input-bordered input-info w-full max-w-xl"
          {...register("iban")}
        />
      </div>
      <div className="form-control w-full max-w-xl">
        <label className="label">
          <span className="label-text">SWIFT</span>
        </label>
        <input
          type="text"
          className="input input-bordered input-info w-full max-w-xl"
          {...register("swift")}
        />
      </div>

      <div className="mt-4">
        <button className="btn btn-primary">Save</button>
      </div>
    </form>
  );
};

export default BankForm;
