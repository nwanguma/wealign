"use client";
import React from "react";
import Link from "next/link";

import AuthSocialsButton from "@/components/ui/AuthSocialsButton";
import AuthButton from "@/components/ui/Button";
import Input from "@/components/forms/Input";

const LoginPage: React.FC = () => {
  return (
    <div className="w-full">
      <div className="flex flex-row justify-center items-center">
        <div className="w-1/2 px-20 py-5 flex-col space-y-4">
          <div className="space-y-3 p-4">
            <div className="text-3xl font-bold text-black">Welcome back</div>
            <p className="text-gray-400">
              Login with any of the following options
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
          <div className="text-gray-500 text-center flex flex-row space-x-3 items-center justify-center">
            <span className="border-0 w-1/3 border-1 border-orange-500"></span>
            <span>or</span>
            <span className="border-0 w-1/3 border-1 border-orange-500"></span>
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
                  text="Continue"
                  style="bg-blue-500 text-white w-full"
                  onclick={() => console.log("")}
                />
              </div>
            </form>
          </div>
          <div className="flex justify-center text-blue-600">
            <Link href="/auth/register">Create account</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
