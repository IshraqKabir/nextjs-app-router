import { QueryClient } from "@tanstack/react-query";
import { UserInfo } from "../schemas/userInfoSchema";
import { getUserInfo, getUserInfoOptions } from "../queries/getUserInfo";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const requireAuthWithUser = async (
  queryClient: QueryClient
): Promise<UserInfo> => {
  await queryClient.prefetchQuery(
    getUserInfoOptions(cookies().get("token")?.value)
  );
  const { data, error } = await getUserInfo(cookies().get("token")?.value);
  if (error) {
    redirect("/login");
  }
  return data;
};
