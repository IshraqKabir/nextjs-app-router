import { getQueryClient } from "@/app/get-query-client";
import { getFetchUserInfoOptions } from "@/hooks/useAuth";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { cookies } from "next/headers";
import { ReactNode } from "react";

export default async function Layout({ children }: { children: ReactNode }) {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(
    getFetchUserInfoOptions(cookies().get("token")?.value)
  );
  return (
    <main>
      <HydrationBoundary state={dehydrate(queryClient)}>
        {children}
      </HydrationBoundary>
    </main>
  );
}
