import { zodResolver } from "@hookform/resolvers/zod";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import InputError from "../../components/InputError";
import { updateClient, useClient } from "../../hooks/clientQueries";
import { clientInput, ClientSchema } from "../../schemas/ClientSchema";

interface IProps {
  clientId: string;
  queryClient: QueryClient;
}

const ClientForm: React.FunctionComponent<IProps> = ({
  clientId,
  queryClient,
}) => {
  const router = useRouter();
  const { data, isLoading } = useClient(clientId);
  const { mutate } = useMutation(updateClient, {
    onSuccess: () => {
      toast.success("Client updated successfuly");
      queryClient.invalidateQueries({ queryKey: ["client", clientId] });
      queryClient.invalidateQueries({ queryKey: ["clients"] });
      router.push("/clients");
    },
    onError: (e) => {
      console.log(e);
    },
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ClientSchema>({
    defaultValues: {
      city: "",
      companyName: "",
      country: "",
      dic: "",
      icdph: "",
      ico: "",
      streetAndNumber: "",
      zip: "",
    },
    resolver: zodResolver(clientInput),
    values: data as ClientSchema,
  });

  if (isLoading) {
    return <div>Loading</div>;
  }

  return (
    <form
      onSubmit={handleSubmit((data) =>
        mutate({
          clientId: clientId,
          clientData: data,
        })
      )}
    >
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

export default ClientForm;
