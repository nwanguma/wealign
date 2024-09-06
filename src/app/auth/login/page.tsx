"use client";

import React from "react";
import Link from "next/link";

import AuthSocialsButton from "@/components/ui/AuthSocialsButton";
import AuthButton from "@/components/ui/Button";
import Input from "@/components/forms/Input";

const LoginPage: React.FC = () => {
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
        />
        <AuthSocialsButton
          text="Continue with Google"
          logoUrl="/icons/google.svg"
        />
        <AuthSocialsButton
          text="Continue with Facebook"
          logoUrl="/icons/facebook.svg"
        />
      </div>
      <div className="flex flex-row items-center justify-center space-x-3">
        <span className="border-b border-b-3 border-gray-300 w-1/3"></span>
        <span className="-mt-1">or</span>
        <span className="border-b border-b-3 border-gray-300 w-1/3"></span>
      </div>
      <div className="p-4">
        <form className="w-full">
          <div>
            <Input
              id="placeholder"
              label="Email"
              type="text"
              value={""}
              onChange={() => console.log("")}
            />
          </div>
          <div>
            <Input
              id="placeholder"
              label="Password"
              type="text"
              value={""}
              onChange={() => console.log("")}
            />
          </div>
          <div className="mt-10">
            <AuthButton
              text="Log In"
              style="bg-blue-500 text-white w-full"
              onclick={() => console.log("")}
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
