import React from "react";
import { Inter } from "next/font/google"; // placeholder font import
import Image from "next/image";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full h-screen bg-[#f7f7f7]">
      <header className="py-2 px-6">
        <Image
          src="/icons/google.svg"
          width={40}
          height={30}
          alt="Talent hunt logo"
        />
      </header>
      <main>{children}</main>
      <footer className="py-2 px-6 text text-gray-500 bg-[#f7f7f7]">
        <Link href="/privacy">Privacy Policy</Link>
      </footer>
    </div>
  );
}
