import { Paginate } from "@/types/Paginate";
import { httpClient } from "@/utils/httpClient";
import { WorkOrder } from "../models/workOrder";
import { Result } from "@/types/Result";
import { keepPreviousData, queryOptions } from "@tanstack/react-query";

export const get = async (
  orgId: string,
  page: number = 1,
  token?: string
): Promise<Result<Paginate<WorkOrder>>> =>
  await httpClient.get<Paginate<WorkOrder>>(
    `/api/organizations/${orgId}/work-orders?page=${page}`,
    { token }
  );

export const getOptions = (orgId: string, page: number, token?: string) =>
  queryOptions({
    queryKey: ["work-orders", orgId, page],
    queryFn: () => get(orgId, page, token),
    enabled: !!orgId,
    placeholderData: keepPreviousData,
  });
