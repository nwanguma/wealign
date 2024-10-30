"use client";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import Link from "next/link";

interface IMainProps {
  children: React.ReactNode;
}

const Main: React.FC<IMainProps> = ({ children }) => {
  const user = useSelector((state: RootState) => state.user);
  const requiresProfileUpdate = user?.profile?.requires_update;

  return (
    <>
      {requiresProfileUpdate && (
        <div className="bg-blue-100 px-2 py-2 text-sm text-center text-gray-700">
          You're almost there! Update your{" "}
          <Link href="/dashboard/me" className="text-blue-700">
            profile
          </Link>{" "}
          to unlock full access!
        </div>
      )}
      <main className="min-h-screen">{children}</main>
    </>
  );
};

export default Main;
