import { zodResolver } from "@hookform/resolvers/zod";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useClients } from "../../hooks/clientQueries";
import { updateInvoice } from "../../hooks/invoiceQueries";
import { ClientSchema } from "../../schemas/ClientSchema";
import { invoiceInput, InvoiceSchema } from "../../schemas/InvoiceSchema";
import { useBanks } from "../../hooks/bankQueries";

interface IProps {
  invoiceId: string;
  queryClient: QueryClient;
}

const InvoiceForm: React.FunctionComponent<IProps> = ({
  invoiceId,
  queryClient,
}) => {
  const { mutate } = useMutation(updateInvoice, {
    onSuccess: () => {
      toast.success("Invoice updated succesfuly");
      queryClient.invalidateQueries({
        queryKey: ["invoices"],
      });
    },
    onError: (e) => {
      console.error(e);
    },
  });

  const { data: clients } = useClients();
  const { data: banks } = useBanks();

  const { handleSubmit, register } = useForm<InvoiceSchema>();

  const testSubmit = ({
    invoiceId,
    invoiceData,
  }: {
    invoiceId: string;
    invoiceData: any;
  }) => {
    let result = {};
    if (!invoiceData.client && clients && !invoiceData.bank && banks) {
      result = { ...invoiceData, client: clients[0], bank: banks[0] };
      console.log(result);
      return;
    }

    if (!invoiceData.bank && banks && invoiceData.client) {
      const parsedClient = JSON.parse(invoiceData.client);
      result = { ...invoiceData, bank: banks[0], client: parsedClient };
      console.log(result);
      return;
    }

    if (!invoiceData.client && clients && invoiceData.bank) {
      const parsedBank = JSON.parse(invoiceData.bank);
      result = { ...invoiceData, client: clients[0], bank: parsedBank };
      console.log(result);
      return;
    }

    const parsedClient = JSON.parse(invoiceData.client);
    const parsedBank = JSON.parse(invoiceData.bank);
    console.log({ ...invoiceData, client: parsedClient, bank: parsedBank });
  };

  return (
    <form
      onSubmit={handleSubmit((data) =>
        testSubmit({ invoiceId, invoiceData: data })
      )}
    >
      <div className="flex justify-between gap-4">
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Client</span>
          </label>
          <select
            className="select select-info w-full max-w-xl"
            {...register("client")}
          >
            {clients?.map((client) => (
              <option key={client.id} value={JSON.stringify(client)}>
                {client.companyName}
              </option>
            ))}
          </select>
        </div>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Invoice number</span>
          </label>
          <input
            type="text"
            className="input input-bordered input-info w-full max-w-xl"
            {...register("invoiceNumber")}
          />
        </div>
      </div>

      <div className="flex justify-between gap-4">
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Bank</span>
          </label>
          <select
            className="select select-info w-full max-w-xl"
            {...register("bank")}
          >
            {banks?.map((bank) => (
              <option key={bank.id} value={JSON.stringify(bank)}>
                {bank.bankName}
              </option>
            ))}
          </select>
        </div>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">VS</span>
          </label>
          <input
            type="text"
            className="input input-bordered input-info w-full max-w-xl"
            {...register("vs")}
          />
        </div>
      </div>

      <div className="flex justify-between gap-4">
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Creation date</span>
          </label>
          <input
            type="date"
            className="input input-bordered input-info w-full max-w-xl"
            defaultValue={new Date().toISOString().split("T")[0]}
            {...register("dateCreated")}
          />
        </div>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Delivery date</span>
          </label>
          <input
            type="date"
            className="input input-bordered input-info w-full max-w-xl"
            defaultValue={new Date().toISOString().split("T")[0]}
            {...register("dateDelivered")}
          />
        </div>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Payment due date</span>
          </label>
          <input
            type="date"
            className="input input-bordered input-info w-full max-w-xl"
            defaultValue={
              new Date(Date.now() + 3600 * 1000 * 24 * 14)
                .toISOString()
                .split("T")[0]
            }
            {...register("dateToPay")}
          />
        </div>
      </div>

      <div className="mt-4">
        <div className="mt-4"></div>
        <button className="btn btn-primary">Save</button>
      </div>
    </form>
  );
};

export default InvoiceForm;
