"use client";

import { useSearchParams, usePathname } from "next/navigation";
import { QueryClientProvider } from "@tanstack/react-query";

import queryClient from "../../lib/react-query-client";
import HomeNav from "@/components/ui/HomeNav";

export default function ArticlesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const clientSearchParams = useSearchParams();
  const clientPathname = usePathname();

  const actionParam = clientSearchParams.get("action");

  return (
    <div className="w-full min-h-screen bg-white text-custom-gray">
      <QueryClientProvider client={queryClient}>
        <header className="w-full border-b border-b-gray-200 py-4 bg-white">
          <HomeNav actionParam={actionParam!} pathname={clientPathname} />
        </header>
        <div className="font-app-normal">{children}</div>
      </QueryClientProvider>
    </div>
  );
}
