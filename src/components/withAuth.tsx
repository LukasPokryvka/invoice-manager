import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { client } from "../backend/apiClient";

const withAuth = (Component: NextPage) => (props: Record<string, unknown>) => {
  const router = useRouter();

  const isLoggedIn = client.authStore.isValid;

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/auth/login");
    }
  }, [isLoggedIn]);

  return <Component {...props} />;
};

export default withAuth;
