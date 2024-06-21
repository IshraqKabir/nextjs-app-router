import { Paginate } from "@/types/Paginate";
import { httpClient } from "@/utils/httpClient";
import { WorkOrder } from "../models/workOrder";
import { Result } from "@/types/Result";
import { keepPreviousData, queryOptions } from "@tanstack/react-query";

export const getList = async (
  orgId: string,
  page: number = 1,
  token?: string
): Promise<Result<Paginate<WorkOrder>>> =>
  await httpClient.get<Paginate<WorkOrder>>(
    `/api/organizations/${orgId}/work-orders?page=${page}`,
    { token }
  );

export const getListOptions = (orgId: string, page: number, token?: string) =>
  queryOptions({
    queryKey: ["work-orders", orgId, page],
    queryFn: () => getList(orgId, page, token),
    enabled: !!orgId,
    placeholderData: keepPreviousData,
  });
