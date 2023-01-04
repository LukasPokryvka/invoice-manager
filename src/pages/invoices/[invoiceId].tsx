import { NextPage } from "next";
import withAuth from "../../components/withAuth";

const Invoice: NextPage = () => {
  return <div>New invoice</div>;
};

export default withAuth(Invoice);
