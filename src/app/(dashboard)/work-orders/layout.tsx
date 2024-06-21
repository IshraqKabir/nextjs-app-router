import { getQueryClient } from "@/app/get-query-client";
import { requireAuth } from "@/modules/auth/utils/requireAuth";
import { getOptions } from "@/modules/workOrders/queries/get";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { cookies } from "next/headers";
import { ReactNode } from "react";

export default async function Layout({ children }: { children: ReactNode }) {
  const queryClient = getQueryClient();
  const user = await requireAuth(queryClient);
  await queryClient.prefetchQuery(
    getOptions(user.orgId || "", 1, cookies().get("token")?.value)
  );
  return (
    <main>
      <HydrationBoundary state={dehydrate(queryClient)}>
        {children}
      </HydrationBoundary>
    </main>
  );
}
