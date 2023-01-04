import { NextPage } from "next";
import withAuth from "../../components/withAuth";

const Dashboard: NextPage = () => {
  return (
    <div>
      Yes sir, i am protected <button className="btn btn-primary">ASD</button>
    </div>
  );
};

export default withAuth(Dashboard);
