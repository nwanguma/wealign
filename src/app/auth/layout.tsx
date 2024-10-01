import React from "react";

import AuthSideColumn from "@/components/ui/AuthSideColumn";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full h-screen bg-white">
      <main className="w-full flex">
        <div className="flex-1 flex justify-center items-center">
          <div className="w-2/3">{children}</div>
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
