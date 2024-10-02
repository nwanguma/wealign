import React from "react";

interface IAuthSocialButtonProps {
  type?: "button" | "submit" | "reset" | undefined;
  text: string;
  style: string;
  onclick?: () => void;
  loading?: boolean;
}

const AuthButton: React.FC<IAuthSocialButtonProps> = ({
  type = "submit",
  text,
  style,
  onclick,
  loading,
}) => {
  return (
    <button
      type={type}
      onClick={onclick}
      className={`rounded-xl flex justify-center items-center py-4 ${style}`}
    >
      {loading ? "Loading..." : text}
    </button>
  );
};

export default AuthButton;
