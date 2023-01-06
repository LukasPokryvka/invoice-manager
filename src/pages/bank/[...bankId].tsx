import { NextPage } from "next";
import withAuth from "../../components/withAuth";

const BankPreview: NextPage = () => {
  return <div>Bank Preview</div>;
};

export default withAuth(BankPreview);
