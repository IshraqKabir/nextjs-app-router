import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const requireAuth = () => {
  if (!cookies().get("token")?.value) {
    redirect("/login");
  }
};
