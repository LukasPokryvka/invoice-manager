import { useMutation, useQueryClient } from "@tanstack/react-query";
import { NextPage } from "next";
import Link from "next/link";
import { toast } from "react-toastify";
import withAuth from "../../components/withAuth";
import { deleteClient, useClients } from "../../hooks/clientQueries";

const Clients: NextPage = () => {
  const { data } = useClients();
  const queryClient = useQueryClient();

  const { mutate } = useMutation(deleteClient, {
    onSuccess: () => {
      toast.success("Client successfuly deleted");
      queryClient.invalidateQueries({ queryKey: ["clients"] });
    },
    onError: (e) => {
      console.log(e);
    },
  });

  return (
    <section className="flex gap-4 flex-wrap">
      {data?.map((client) => (
        <div key={client.id} className="card w-96 bg-neutral shadow-xl">
          <div className="card-body">
            <h2 className="card-title">{client.companyName}</h2>
            <div className="flex justify-between">
              <div className="font-bold">
                <h3>Street and no.:</h3>
                <h3>City:</h3>
                <h3>ZIP Code:</h3>
                <h3>Country:</h3>
                <h3>ICO:</h3>
                <h3>DIC:</h3>
                <h3>IC DPH:</h3>
              </div>
              <div>
                <p>{client.streetAndNumber}</p>
                <p>{client.city}</p>
                <p>{client.zip}</p>
                <p>{client.country}</p>
                <p>{client.ico}</p>
                <p>{client.dic}</p>
                <p>{client.icdph}</p>
              </div>
            </div>
            <div className="card-actions justify-end mt-4">
              <button
                onClick={() => mutate(client.id)}
                className="btn btn-accent"
              >
                Delete
              </button>
              <Link href={`/clients/${client.id}`} className="btn btn-primary">
                Edit
              </Link>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default withAuth(Clients);
