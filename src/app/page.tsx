"use client";

import { logout } from "@/modules/auth/mutations/logout";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const logoutMutation = useMutation({
    mutationFn: logout,
    retry: 3,
  });
  async function handleLogout() {
    const { error } = await logoutMutation.mutateAsync();
    if (error) return;
    router.push("/login");
  }
  return (
    <div>
      <button
        onClick={handleLogout}
        disabled={logoutMutation.status === "pending"}
      >
        logout
      </button>
    </div>
  );
}
