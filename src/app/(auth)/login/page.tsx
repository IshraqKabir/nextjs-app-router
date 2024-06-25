"use client";

import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitHandler, useForm } from "react-hook-form";
import { loginSchema, LoginSchema } from "@/modules/auth/schemas/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/modules/auth/hooks/useAuth";
import { useRouter } from "next/navigation";

export default function Page() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm<LoginSchema>({ resolver: zodResolver(loginSchema) });
  const { login } = useAuth();
  const router = useRouter();
  const onSubmit: SubmitHandler<LoginSchema> = async (formData) => {
    const { error } = await login.mutateAsync(formData);
    if (error) {
      setError("root", { message: error.message });
      return;
    }
    clearErrors("root");
    router.push("/dashboard");
  };
  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to login to your account
            </p>
          </div>
          <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="m@example.com"
                {...register("email")}
              />
              {errors.email?.message && (
                <ErrorMessage message={errors.email.message} />
              )}
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="/forgot-password"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <Input id="password" type="password" {...register("password")} />
              {errors.password?.message && (
                <ErrorMessage message={errors.password.message} />
              )}
            </div>
            {errors.root?.message && (
              <ErrorMessage message={errors.root.message} />
            )}
            <Button type="submit" className="w-full" loading={login.isPending}>
              Login
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="#" className="underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <Image
          src="/placeholder.svg"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}

function ErrorMessage({ message }: { message: string }) {
  return <p className="text-red-700 text-sm">{message}</p>;
}

// import { useAuth } from "@/modules/auth/hooks/useAuth";
// import { loginSchema, LoginSchema } from "@/modules/auth/schemas/loginSchema";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useRouter } from "next/navigation";
// import { useForm, SubmitHandler } from "react-hook-form";

// type Inputs = {
//   email: string;
//   password: string;
// };

// export default function LoginPage() {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     setError,
//     clearErrors,
//   } = useForm<LoginSchema>({ resolver: zodResolver(loginSchema) });
//   const { login } = useAuth();
//   const router = useRouter();
//   const onSubmit: SubmitHandler<Inputs> = async (formData) => {
//     const { error } = await login.mutateAsync(formData);
//     if (error) {
//       setError("root", { message: error.message });
//       return;
//     }
//     clearErrors("root");
//     router.push("/");
//   };
//   return (
//     <div>
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <input defaultValue="" {...register("email")} />
//         {errors.email && <span>{errors.email.message}</span>}
//         <br />
//         <input type="password" defaultValue="" {...register("password")} />
//         {errors.password && <span>{errors.password.message}</span>}
//         <br />
//         {errors.root && <span>{errors.root.message}</span>}
//         <input type="submit" disabled={login.status === "pending"} />
//       </form>
//     </div>
//   );
// }
