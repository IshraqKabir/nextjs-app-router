import { getQueryClient } from "@/app/get-query-client";
import {
  getUserInfo,
  getUserInfoOptions,
} from "@/modules/auth/queries/getUserInfo";
import { getOptions } from "@/modules/workOrders/queries/get";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { cookies } from "next/headers";
import { ReactNode } from "react";

export default async function Layout({ children }: { children: ReactNode }) {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(
    getUserInfoOptions(cookies().get("token")?.value)
  );
  const { data } = await getUserInfo(cookies().get("token")?.value);
  await queryClient.prefetchQuery(
    getOptions(data?.orgId || "", 1, cookies().get("token")?.value)
  );
  return (
    <main>
      <HydrationBoundary state={dehydrate(queryClient)}>
        {children}
      </HydrationBoundary>
    </main>
  );
}
