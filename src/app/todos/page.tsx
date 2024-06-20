import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient } from "../get-query-client";
import TodosList from "./todos-list";
import { fetchUserInfoOptions } from "@/hooks/useAuth";

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export async function getTodos(): Promise<Todo[]> {
  const result = (await fetch(
    "https://jsonplaceholder.typicode.com/todos"
  ).then((response) => response.json())) as Todo[];
  return result;
}

export default async function TodosPage() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["todos"],
    queryFn: () => getTodos(),
  });

  return (
    <main>
      <h1>Todos List</h1>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <TodosList />
      </HydrationBoundary>
    </main>
  );
}
