"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { signIn } from "next-auth/react";

import AuthSocialsButton from "@/components/ui/AuthSocialsButton";
import AuthButton from "@/components/ui/Button";
import Input from "@/components/forms/Input";

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

type FormValues = {
  email: string;
  password: string;
};

const LoginPage: React.FC = () => {
  const methods = useForm({
    resolver: yupResolver(schema),
  });

  const {
    control,
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
  } = methods;

  const [error, setError] = useState<string | null>(null);

  console.log(errors);

  const handleSignIn = async (provider: string) => {
    const res = await signIn(provider, { callbackUrl: "/" });
    if (res?.error) {
      setError("Failed to sign in with " + provider);
    }
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    console.log("data", data);
    const res = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
      callbackUrl: "/",
    });

    if (res?.error) {
      console.log(res.error, "error");
      setError(res.error);
    }
  };

  return (
    <div className="w-full">
      <div className="space-y-3 p-4 text-center">
        <div className="font-sans-heading text-5xl font-bold text-black">
          Welcome back!
        </div>
        <p className="text-gray-400">
          Welcome to Talent Hunt. Community Dashboard
        </p>
      </div>
      <div className="p-4 space-y-4">
        <AuthSocialsButton
          text="Continue with Linkedin"
          logoUrl="/icons/linkedin.svg"
          onClick={() => handleSignIn("linkedin")}
        />
        <AuthSocialsButton
          text="Continue with Google"
          logoUrl="/icons/google.svg"
          onClick={() => handleSignIn("google")}
        />
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <div className="flex flex-row items-center justify-center space-x-3">
        <span className="border-b border-b-3 border-gray-300 w-1/3"></span>
        <span className="-mt-1">or</span>
        <span className="border-b border-b-3 border-gray-300 w-1/3"></span>
      </div>
      <div className="p-4">
        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div>
              <Input
                id="email"
                label="Email"
                value={watch("email")}
                onChange={(e) => setValue("email", e.target.value)}
                error={errors.email?.message as string}
                otherClasses={methods.register("email")}
              />
            </div>
            <div>
              <Input
                id="password"
                type="password"
                label="Password"
                value={watch("password")}
                onChange={(e) => setValue("password", e.target.value)}
                error={errors.password?.message as string}
                otherClasses={methods.register("password")}
              />
            </div>
          </div>
          <div className="mt-10">
            <AuthButton
              text="Log In"
              style="bg-blue-500 text-white w-full"
              type="submit"
            />
          </div>
        </form>
      </div>
      <div className="flex justify-center space-x-1">
        <span className="inline-block">Don't have an account?</span>
        <span className="inline-block text-blue-600">
          <Link href="/auth/register">Create account</Link>
        </span>
      </div>
    </div>
  );
};

export default LoginPage;
