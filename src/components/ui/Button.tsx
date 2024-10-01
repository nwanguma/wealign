import React from "react";
import Image from "next/image";

interface IAuthSocialButtonProps {
  type?: "button" | "submit" | "reset" | undefined;
  text: string;
  style: string;
  onclick?: () => void;
}

const AuthButton: React.FC<IAuthSocialButtonProps> = ({
  type = "submit",
  text,
  style,
  onclick,
}) => {
  return (
    <button
      type={type}
      onClick={onclick}
      className={`rounded-xl flex justify-center items-center py-4 ${style}`}
    >
      {text}
    </button>
  );
};

export default AuthButton;
