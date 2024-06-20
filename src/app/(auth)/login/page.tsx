"use client";

import { getQueryClient } from "@/app/get-query-client";
import { useAuth } from "@/hooks/useAuth";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      email: "sys_admin@corsphere.com",
      password: "asdf1234",
    },
  });
  const { login, user } = useAuth();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await login.mutateAsync(data);
  };
  return (
    <div>
      user: {JSON.stringify(user.data)}
      Hello Login Page
      <form onSubmit={handleSubmit(onSubmit)}>
        <input defaultValue="" {...register("email")} />
        {errors.email && <span>{errors.email.message}</span>}
        <br />
        <input type="password" defaultValue="" {...register("password")} />
        {errors.password && <span>{errors.password.message}</span>}
        <br />

        <input type="submit" />
      </form>
    </div>
  );
}
