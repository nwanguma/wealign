"use client";

import { Nunito } from "next/font/google";

import { ReactNode } from "react";
import { Provider, useSelector } from "react-redux";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "../../lib/react-query-client";
import { PersistGate } from "redux-persist/integration/react";
import Image from "next/image";

import { store, persistor, RootState } from "@/store";
import DashboadHeader from "@/components/layout/DashboardHeader";
import DashboardFooter from "@/components/layout/DashboardFooter";
import DashboardNav from "@/components/layout/DashboardNav";

const nunito = Nunito({ subsets: ["latin-ext"] });

const Loading = () => {
  return (
    <div className="w-full h-dvh flex justify-center bg-white">
      <div className="mt-40 h-20 flex space-x-3 items-center">
        <Image src="/icons/page-loader.gif" alt="" width={40} height={40} />
        <p style={{ fontSize: "15px" }}>
          Making things cool behind the scenes...{" "}
          <span className="ml-1">😉</span>
        </p>
      </div>
    </div>
  );
};

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <PersistGate loading={<Loading />} persistor={persistor}>
        <div className={`w-full h-screen bg-[#f7f7f7] ${nunito.className}`}>
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
      </PersistGate>
    </Provider>
  );
}
