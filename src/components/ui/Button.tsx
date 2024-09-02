import React from "react";
import Image from "next/image";

interface IAuthSocialButtonProps {
  text: string;
  style: string;
  onclick: () => void;
}

const AuthButton: React.FC<IAuthSocialButtonProps> = ({
  text,
  style,
  onclick,
}) => {
  return (
    <button
      onClick={onclick}
      className={`rounded-3xl flex justify-center items-center py-4 ${style}`}
    >
      {text}
    </button>
  );
};

export default AuthButton;
