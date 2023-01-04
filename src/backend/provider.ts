import { NextApiRequest, NextApiResponse } from "next";
import PocketBase from "pocketbase";

export const initPocketBase = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const pb = new PocketBase("http://localhost:8090");

  pb.authStore.loadFromCookie(req.headers.cookie || "");

  pb.authStore.onChange(() => {
    res?.setHeader("set-cookie", pb.authStore.exportToCookie());
  });

  try {
    pb.authStore.isValid && (await pb.collection("users").authRefresh());
  } catch (_) {
    pb.authStore.clear();
  }

  return pb;
};
