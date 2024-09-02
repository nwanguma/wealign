import React from "react";
import Image from "next/image";

interface IAuthSocialButtonProps {
  logoUrl: string;
  text: string;
}

const AuthSocialsButton: React.FC<IAuthSocialButtonProps> = ({
  logoUrl,
  text,
}) => {
  return (
    <div className="bg-white rounded-3xl flex justify-center items-center text-black py-4 space-x-2">
      <div>
        <Image src={logoUrl} alt="logo" width={28} height={28} />
      </div>
      <div className="text-center mt-1">{text}</div>
    </div>
  );
};

export default AuthSocialsButton;
