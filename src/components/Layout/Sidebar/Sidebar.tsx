import { useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { createBank, useBanks } from "../../../hooks/bankQueries";
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
      toast.success("Invoice created successfuly");
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

  const { mutate: newBank } = useMutation(createBank, {
    onSuccess: (data) => {
      if (data) {
        router.push(`/bank/${data.id}`);
      }
      toast.success("Bank record created successfuly");
      queryClient.invalidateQueries({ queryKey: ["banks"] });
    },
    onError: (e) => {
      console.log(e);
    },
  });

  const { data: invoices, error, isLoading } = useInvoices();
  const { data: clients } = useClients();
  const { data: banks } = useBanks();

  const renderSidebarButton = () => {
    if (pathname.includes("/clients")) {
      return (
        <button onClick={() => newClient()} className="btn btn-primary w-full">
          New client
        </button>
      );
    }

    if (pathname.includes("/bank")) {
      return (
        <button onClick={() => newBank()} className="btn btn-primary w-full">
          New bank record
        </button>
      );
    }

    return (
      <button onClick={() => newInvoice()} className="btn btn-primary w-full">
        New invoice
      </button>
    );
  };

  const renderSidebarContent = () => {
    if (pathname.includes("/clients")) {
      return clients?.map((client) => (
        <div key={client.id}>
          <Link
            className="btn btn-secondary btn-outline btn-wide"
            href={`/clients/${client.id}`}
          >
            <div>{client.companyName}</div>
          </Link>
        </div>
      ));
    }

    if (pathname.includes("/bank")) {
      return banks?.map((bank) => (
        <div key={bank.id}>
          <Link
            className="btn btn-secondary btn-outline btn-wide"
            href={`/bank/${bank.id}`}
          >
            <div>{bank.bankName}</div>
          </Link>
        </div>
      ));
    }

    return invoices?.map((invoice) => (
      <div key={invoice.id}>
        <Link
          className="btn btn-secondary btn-outline btn-wide"
          href={`/invoices/${invoice.id}`}
        >
          <div>{invoice.id}</div>
        </Link>
      </div>
    ));
  };

  return (
    <aside className="h-screen bg-base-200 w-72 border-r-2 border-secondary-focus border-dashed p-4">
      <section className="flex justify-center">{renderSidebarButton()}</section>
      <section className="flex flex-col gap-2 mt-4">
        {renderSidebarContent()}
      </section>
    </aside>
  );
};

export default Sidebar;
