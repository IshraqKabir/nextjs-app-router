"use client";

import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { getTodos } from "./page";

export default function TodosList() {
  const { data, status } = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
  });

  if (status === "error") return <div>Error occured</div>;

  return (
    <div>
      {data?.map((todo) => (
        <div key={todo.id}>{todo.title}</div>
      ))}
    </div>
  );
}
