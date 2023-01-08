import { useMutation, useQueryClient } from "@tanstack/react-query";
import { NextPage } from "next";
import Link from "next/link";
import { toast } from "react-toastify";
import withAuth from "../../components/withAuth";
import { deleteBank, useBanks } from "../../hooks/bankQueries";

const Bank: NextPage = () => {
  const { data } = useBanks();
  const queryClient = useQueryClient();

  const { mutate } = useMutation(deleteBank, {
    onSuccess: () => {
      toast.success("Bank record successfuly deleted");
      queryClient.invalidateQueries({ queryKey: ["banks"] });
    },
    onError: (e) => {
      console.log(e);
    },
  });

  return (
    <section className="flex gap-4 flex-wrap">
      {data?.map((bank) => (
        <div key={bank.id} className="card w-96 bg-neutral shadow-xl">
          <div className="card-body">
            <h2 className="card-title">{bank.bankName}</h2>
            <div className="flex justify-between">
              <div className="font-bold">
                <h3>IBAN:</h3>
                <h3>SWIFT:</h3>
              </div>
              <div>
                <p>{bank.iban}</p>
                <p>{bank.swift}</p>
              </div>
            </div>
            <div className="card-actions justify-end mt-4">
              <button
                onClick={() => mutate(bank.id)}
                className="btn btn-accent"
              >
                Delete
              </button>
              <Link href={`/bank/${bank.id}`} className="btn btn-primary">
                Edit
              </Link>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default withAuth(Bank);
