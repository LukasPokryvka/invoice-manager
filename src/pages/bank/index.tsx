import { NextPage } from "next";
import withAuth from "../../components/withAuth";

const Bank: NextPage = () => {
  return <div>Bank</div>;
};

export default withAuth(Bank);
