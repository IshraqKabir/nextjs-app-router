import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const requireAnonymous = () => {
  if ((cookies().get("token")?.value.length || 0) > 0) {
    redirect("/");
  }
};
