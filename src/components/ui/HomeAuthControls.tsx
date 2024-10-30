"use client";

import { useState } from "react";
import AppModal from "./Modal";

import LoginPage from "../forms/LoginForm";
import RegisterPage from "../forms/RegisterForm";
// import { useSearchParams } from "next/navigation";

const AuthButton = ({
  text,
  variant,
  className = "",
  onClick,
}: {
  text: string;
  variant?: string;
  className?: string;
  onClick?: () => void;
}) => {
  return (
    <button
      style={{ fontSize: "16px" }}
      onClick={onClick}
      className={`${className} text-sm px-3 lg:px-6 py-2 lg:py-3 rounded ${
        variant !== "filled"
          ? "border border-blue-700 text-gray-700 hover:bg-slate-50"
          : "bg-blue-600 text-white hover:bg-blue-700"
      }`}
    >
      {text}
    </button>
  );
};

const HomeAuthControls = ({
  main,
  action,
}: {
  main?: boolean;
  action?: string;
}) => {
  // const searchParams = useSearchParams();
  const [loginModalIsOpen, setLoginModalIsOpen] = useState(
    action === "login" || false
  );
  const [registerModalIsOpen, setRegisterModalIsOpen] = useState(false);

  return (
    <div>
      {main && (
        <div className="space-x-3 lg:space-x-5">
          <AuthButton
            text="Login"
            onClick={() => setLoginModalIsOpen((o) => !o)}
          />
          <AuthButton
            text="Register"
            variant="filled"
            onClick={() => setRegisterModalIsOpen((o) => !o)}
          />
        </div>
      )}
      {!main && (
        <AuthButton
          text="Kickstart Your Next Big Project"
          variant="filled"
          onClick={() => setRegisterModalIsOpen((o) => !o)}
        />
      )}
      <AppModal
        isOpen={loginModalIsOpen}
        onClose={() => {
          setLoginModalIsOpen(false);
        }}
      >
        <div>
          <LoginPage />
          <div className="flex justify-center space-x-1 pb-5 font-light">
            <span className="inline-block">Don't have an account?</span>
            <span className="inline-block text-blue-600 cursor-pointer font-normal">
              <span
                onClick={() => {
                  setRegisterModalIsOpen((o) => !o);
                  setLoginModalIsOpen((o) => !o);
                }}
              >
                Create account
              </span>
            </span>
          </div>
        </div>
      </AppModal>
      <AppModal
        isOpen={registerModalIsOpen}
        onClose={() => {
          setRegisterModalIsOpen(false);
        }}
      >
        <div>
          <RegisterPage />
          <div className="flex justify-center space-x-1 pb-5 font-light">
            <span className="inline-block">Already have an account?</span>
            <span className="inline-block text-blue-600 cursor-pointer font-normal">
              <span
                onClick={() => {
                  setLoginModalIsOpen((o) => !o);
                  setRegisterModalIsOpen((o) => !o);
                }}
              >
                Login
              </span>
            </span>
          </div>
        </div>
      </AppModal>
    </div>
  );
};

export default HomeAuthControls;
