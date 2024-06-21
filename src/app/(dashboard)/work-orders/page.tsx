"use client";

import { useAuth } from "@/modules/auth/hooks/useAuth";
import { getOptions } from "@/modules/workOrders/queries/get";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function WorkOrdersPage() {
  const { user } = useAuth();
  const [page, setPage] = useState(1);
  const { data, status, isFetching } = useQuery(
    getOptions(user.data?.data?.orgId || "", page)
  );
  return (
    <div>
      Hello Work Orders
      <br />
      {status === "pending" ? (
        "Loading"
      ) : data?.error || !data ? (
        <div>Error occured: {data?.error.message}</div>
      ) : (
        <ul>
          {data.data.items.map((item, idx) => (
            <div key={item.id}>
              {idx + 1}. {item.data.title}
            </div>
          ))}
        </ul>
      )}
      <br />
      <div>
        <button disabled={page <= 1} onClick={() => setPage(1)}>
          First
        </button>
        <br />
        <button
          disabled={page <= 1}
          onClick={() => setPage((page) => page - 1)}
        >
          Prev
        </button>
        <br />
        <div>
          {Array.from({ length: 5 }, (_, i) => Math.max(1, page - 3) + i)
            .filter(
              (num) => num > 0 && num <= (data?.data?.meta.totalPages || 5)
            )
            .map((num) => (
              <button key={num} onClick={() => setPage(num)}>
                {num}
              </button>
            ))}
        </div>
        <button
          disabled={!data?.data || page >= data.data.meta.totalPages}
          onClick={() => setPage((page) => page + 1)}
        >
          Next
        </button>
        <br />
        <button
          disabled={!data?.data || page >= data.data.meta.totalPages}
          onClick={() => data?.data && setPage(data.data.meta.totalPages)}
        >
          Last
        </button>
      </div>
      {isFetching ? "Loading" : null}
    </div>
  );
}
