import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "WeAlign | Connect, Collaborate, and Grow with Top Developers",
  description:
    "Join WeAlign to find collaborators, discover tech events, access valuable resources, and turn side projects into thriving businesses. Perfect for developers looking to network and accelerate project growth.",
  keywords: [
    "developer collaboration",
    "tech events",
    "developer resources",
    "side project to business",
    "find developers",
    "networking for developers",
    "developer articles",
    "project collaboration",
    "10x developers",
    "business for developers",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
