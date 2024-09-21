import type { Metadata } from "next";
import { Nunito } from "next/font/google";

import "./globals.css";

const nunito = Nunito({ subsets: ["latin-ext"] });

export const metadata: Metadata = {
  title: "Talent Hunt",
  description: "Find, hire or collaborate with 10x developers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${nunito.className} font-light`}>{children}</body>
    </html>
  );
}
