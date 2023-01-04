import { NextPage } from "next";
import withAuth from "../../components/withAuth";

const Profile: NextPage = () => {
  return <div>User profile</div>;
};

export default withAuth(Profile);
