import { useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { createClient, useClients } from "../../../hooks/clientQueries";
import { createInvoice, useInvoices } from "../../../hooks/invoiceQueries";

const Sidebar: React.FunctionComponent = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const pathname = router.pathname;

  const { mutate: newInvoice } = useMutation(createInvoice, {
    onSuccess: (data) => {
      if (data) {
        router.push(`/invoices/${data.id}`);
      }
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
    },
    onError: (e) => {
      console.log(e);
    },
  });

  const { mutate: newClient } = useMutation(createClient, {
    onSuccess: (data) => {
      if (data) {
        router.push(`/clients/${data.id}`);
      }
      toast.success("Client created successfuly");
      queryClient.invalidateQueries({ queryKey: ["clients"] });
    },
    onError: (e) => {
      console.log(e);
    },
  });

  const { data: invoices, error, isLoading } = useInvoices();
  const { data: clients } = useClients();

  return (
    <aside className="h-screen bg-base-200 w-72 border-r-2 border-secondary-focus border-dashed p-4">
      <section className="flex justify-center">
        {pathname.includes("/clients") ? (
          <button
            onClick={() => newClient()}
            className="btn btn-primary w-full"
          >
            New client
          </button>
        ) : (
          <button
            onClick={() => newInvoice()}
            className="btn btn-primary w-full"
          >
            New invoice
          </button>
        )}
      </section>
      <section className="flex flex-col gap-2 mt-4">
        {pathname.includes("/clients")
          ? clients?.map((client) => (
              <div key={client.id}>
                <Link
                  className="btn btn-secondary btn-outline btn-wide"
                  href={`/clients/${client.id}`}
                >
                  <div>{client.companyName}</div>
                </Link>
              </div>
            ))
          : invoices?.map((invoice) => (
              <div key={invoice.id}>
                <Link
                  className="btn btn-secondary btn-outline btn-wide"
                  href={`/invoices/${invoice.id}`}
                >
                  <div>{invoice.id}</div>
                </Link>
              </div>
            ))}
      </section>
    </aside>
  );
};

export default Sidebar;
