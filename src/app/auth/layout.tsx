import React from "react";

import AuthSideColumn from "@/components/ui/AuthSideColumn";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full h-screen bg-[#f7f7f7]">
      <main className="w-full flex">
        <div className="flex-1 flex justify-center items-center px-14">
          {children}
        </div>
        <div className="w-1/2">
          <AuthSideColumn
            imageSrc="/images/auth-illustration.jpg"
            altText="Illustration"
          />
        </div>
      </main>
    </div>
  );
}
