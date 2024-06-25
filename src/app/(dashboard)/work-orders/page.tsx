import WorkOrderPaginatedList from "./WorkOrderPaginatedList";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { requireAuth } from "@/modules/auth/utils/requireAuth";
import { getQueryClient } from "@/app/getQuerClient";

export default async function WorkOrdersPage() {
  requireAuth();
  const queryClient = getQueryClient();
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <WorkOrderPaginatedList />
    </HydrationBoundary>
  );
}
