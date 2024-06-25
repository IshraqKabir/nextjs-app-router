"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAuth } from "@/modules/auth/hooks/useAuth";
import { getListOptions } from "@/modules/workOrders/queries/getList";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { WorkOrder } from "@/modules/workOrders/models/workOrder";
import { Paginate } from "@/types/Paginate";
import { Skeleton } from "@/components/ui/skeleton";
import { paginationNumbers } from "@/lib/utils/paginationNumbers";

export default function WorkOrderPaginatedList() {
  const { user } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [currentPage, setCurrentPage] = useState(
    Number(searchParams.get("page")) || 1
  );
  const { data, isPending, isFetching } = useQuery(
    getListOptions(user.data?.data?.orgId || "", currentPage)
  );
  const handlePaginationClick = (page: number) => {
    router.push(`?page=${page}`);
    setCurrentPage(page);
  };
  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Work Orders</h2>
        </div>
      </div>
      {isPending || isFetching ? (
        <ListSkeleton />
      ) : !data?.data ? (
        <div>Error</div>
      ) : (
        <List data={data.data} page={currentPage} setPage={setCurrentPage} />
      )}

      <Pagination className="flex justify-end">
        <PaginationContent>
          {currentPage > 1 && (
            <PaginationItem>
              <PaginationPrevious
                onClick={() => handlePaginationClick(currentPage - 1)}
              >
                Previous
              </PaginationPrevious>
            </PaginationItem>
          )}
          {paginationNumbers(
            currentPage,
            data?.data?.meta.totalPages || 1000,
            2
          ).map((page) => (
            <PaginationItem
              onClick={() => {
                const params = new URLSearchParams(searchParams.toString());
                params.set("page", `${page}`);
                router.push(pathname + "?" + params.toString());
              }}
            >
              <PaginationLink
                onClick={() => handlePaginationClick(page)}
                className={`${currentPage === page ? "font-bold" : ""}`}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}
          {currentPage < (data?.data?.meta.totalPages || 1000) && (
            <PaginationItem>
              <PaginationNext
                onClick={() => handlePaginationClick(currentPage + 1)}
              />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </div>
  );
}

const ListSkeleton = () => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <Skeleton className="h-5 w-[250px]" />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 10 }).map((_, i) => (
            <TableRow key={i}>
              <TableCell className="font-medium w-full">
                <Skeleton className="h-5 w-[250px]" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

const List = ({
  data,
}: {
  data: Paginate<WorkOrder>;
  page: number;
  setPage: (page: number) => void;
}) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Title</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.items.map((workOrder) => (
            <WorkOrderRow workOrder={workOrder} key={workOrder.id} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

const WorkOrderRow = ({ workOrder }: { workOrder: WorkOrder }) => {
  return (
    <TableRow>
      <TableCell className="font-medium w-full">
        {workOrder.data.title}
      </TableCell>
      <TableCell className="whitespace-nowrap">
        {workOrder.data.status}
      </TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <DotsHorizontalIcon />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
};
