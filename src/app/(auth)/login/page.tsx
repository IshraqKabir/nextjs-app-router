"use client";

import { useAuth } from "@/modules/auth/hooks/useAuth";
import { loginSchema, LoginSchema } from "@/modules/auth/schemas/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm<LoginSchema>({ resolver: zodResolver(loginSchema) });
  const { login } = useAuth();
  const router = useRouter();
  const onSubmit: SubmitHandler<Inputs> = async (formData) => {
    const { error } = await login.mutateAsync(formData);
    if (error) {
      setError("root", { message: error.message });
      return;
    }
    clearErrors("root");
    router.push("/");
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input defaultValue="" {...register("email")} />
        {errors.email && <span>{errors.email.message}</span>}
        <br />
        <input type="password" defaultValue="" {...register("password")} />
        {errors.password && <span>{errors.password.message}</span>}
        <br />
        {errors.root && <span>{errors.root.message}</span>}
        <input type="submit" />
      </form>
    </div>
  );
}
