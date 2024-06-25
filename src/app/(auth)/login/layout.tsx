import { requireAnonymous } from "@/modules/auth/utils/requireAnonymous";
import { ReactNode } from "react";

export default async function Layout({ children }: { children: ReactNode }) {
  requireAnonymous();
  return (
    <main className="min-h-dvh flex justify-center items-center">
      {children}
    </main>
  );
}
