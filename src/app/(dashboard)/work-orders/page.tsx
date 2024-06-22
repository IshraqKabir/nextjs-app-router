import { getQueryClient } from "@/app/getQuerClient";
import WorkOrderPaginatedList from "./WorkOrderPaginatedList";
import { requireAuth } from "@/modules/auth/utils/requireAuth";
import { getListOptions } from "@/modules/workOrders/queries/getList";
import { cookies } from "next/headers";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export default async function WorkOrdersPage() {
  const queryClient = getQueryClient();
  const user = await requireAuth(queryClient);
  await queryClient.prefetchQuery(
    getListOptions(user.orgId || "", 1, cookies().get("token")?.value)
  );
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <WorkOrderPaginatedList />
    </HydrationBoundary>
  );
}
