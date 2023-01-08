import { useMutation, useQueryClient } from "@tanstack/react-query";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import InvoiceForm from "../../components/forms/InvoiceForm";
import withAuth from "../../components/withAuth";
import { updateInvoice } from "../../hooks/invoiceQueries";

const InvoicePreview: NextPage = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { invoiceId } = router.query;
  const { mutate } = useMutation(updateInvoice, {
    onSuccess: () => {
      toast.success("Invoice updated succesfuly");
    },
  });
  return (
    <section className="flex justify-center">
      <div className="card bg-neutral shadow-xl w-2/3">
        <div className="card-body">
          <h2 className="card-title">Invoice</h2>
          <InvoiceForm
            invoiceId={invoiceId as string}
            queryClient={queryClient}
          />
        </div>
      </div>
    </section>
  );
};

export default withAuth(InvoicePreview);
