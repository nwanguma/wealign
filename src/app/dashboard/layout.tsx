"use client";

import { ReactNode } from "react";
import { Provider } from "react-redux";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "../../lib/react-query-client";

import { store } from "@/store";
import DashboadHeader from "@/components/layout/DashboardHeader";
import DashboardFooter from "@/components/layout/DashboardFooter";
import DashboardNav from "@/components/layout/DashboardNav";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <div className="w-full h-screen bg-[#f7f7f7]">
        <DashboadHeader>
          <DashboardNav />
        </DashboadHeader>
        <main className="min-h-screen">
          <div>
            <QueryClientProvider client={queryClient}>
              {children}
            </QueryClientProvider>
          </div>
        </main>
        <DashboardFooter />
      </div>
    </Provider>
  );
}
