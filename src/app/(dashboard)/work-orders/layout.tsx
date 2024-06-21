import { getQueryClient } from "@/app/getQuerClient";
import { requireAuth } from "@/modules/auth/utils/requireAuth";
import { getListOptions } from "@/modules/workOrders/queries/getList";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { cookies } from "next/headers";
import { ReactNode } from "react";

export default async function Layout({ children }: { children: ReactNode }) {
  const queryClient = getQueryClient();
  const user = await requireAuth(queryClient);
  await queryClient.prefetchQuery(
    getListOptions(user.orgId || "", 1, cookies().get("token")?.value)
  );
  return (
    <main>
      <HydrationBoundary state={dehydrate(queryClient)}>
        {children}
      </HydrationBoundary>
    </main>
  );
}
