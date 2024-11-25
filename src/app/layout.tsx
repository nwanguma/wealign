import React from "react";
import type { Metadata } from "next";
// import wdyr from "@welldone-software/why-did-you-render";
import Script from "next/script";

import "./globals.css";

export const metadata: Metadata = {
  title: "WeAlign | Connect, Collaborate, Build",
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
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/favicon-32x32.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://cloud.umami.is/script.js"
          data-website-id="b5c445b7-e2a9-465f-a10d-290c42bebb2e"
          strategy="lazyOnload"
        />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="icon" href="/favicon-16x16.png" sizes="16x16" />
        <link rel="icon" href="/favicon-32x32.png" sizes="32x32" />
        <link rel="apple-touch-icon" href="/favicon-32x32.png" />
      </head>
      <body>{children}</body>
    </html>
  );
}
