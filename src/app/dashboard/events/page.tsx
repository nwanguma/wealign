// app/page.tsx

import React from "react";
import Head from "next/head";
import { Inter } from "next/font/google";
import { useRouter } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

const Page: React.FC = () => {
  const router = useRouter();

  // Handler for a sample button click
  const handleClick = () => {
    router.push("/another-page"); // Navigate to another page
  };

  return (
    <>
      <Head>
        <title>Page Title</title>
        <meta name="description" content="Page description goes here." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <main className={`min-h-screen p-6 ${inter.className}`}>
        <h1 className="text-3xl font-bold mb-4">Welcome to the Page</h1>
        <p className="text-lg mb-6">
          This is a boilerplate page. Customize this content to fit your needs.
        </p>
        <button
          onClick={handleClick}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Go to Another Page
        </button>
      </main>
    </>
  );
};

export default Page;
