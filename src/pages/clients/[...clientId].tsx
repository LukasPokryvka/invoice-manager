import { useQueryClient } from "@tanstack/react-query";
import { NextPage } from "next";
import { useRouter } from "next/router";
import ClientForm from "../../components/forms/ClientForm";
import withAuth from "../../components/withAuth";

const ClientPreview: NextPage = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const clientId = router.query["clientId"] as string;

  return (
    <section className="flex justify-center">
      <div className="card bg-neutral shadow-xl w-1/3">
        <div className="card-body">
          <h2 className="card-title">Client</h2>
          <ClientForm clientId={clientId} queryClient={queryClient} />
        </div>
      </div>
    </section>
  );
};

export default withAuth(ClientPreview);
