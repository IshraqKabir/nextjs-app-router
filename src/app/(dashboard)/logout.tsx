"use client";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { logout } from "@/modules/auth/mutations/logout";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const Logout = () => {
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
  return <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>;
};
