import { useQueryClient } from "@tanstack/react-query";
import { NextPage } from "next";
import BasicInfoForm from "../../components/forms/BasicInfoForm";
import RegisterForm from "../../components/forms/RegisterForm";
import withAuth from "../../components/withAuth";
import { useUser } from "../../hooks/userQueries";

const Profile: NextPage = () => {
  const { data } = useUser();
  const queryClient = useQueryClient();

  return (
    <div className="flex flex-col gap-5">
      <section>
        <div className="card bg-neutral shadow-xl w-3/5">
          <div className="card-body">
            <h2 className="card-title">Basic information</h2>
            <BasicInfoForm userData={data} queryClient={queryClient} />
          </div>
        </div>
      </section>
      <section>
        <div className="card bg-neutral shadow-xl w-3/5">
          <div className="card-body">
            <h2 className="card-title">Additional information</h2>
            <RegisterForm userData={data} queryClient={queryClient} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default withAuth(Profile);
