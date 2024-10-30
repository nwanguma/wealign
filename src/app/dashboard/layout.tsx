"use client";

import { ReactNode } from "react";
import { Provider } from "react-redux";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

import { store, persistor } from "@/store";
import queryClient from "../../lib/react-query-client";
import { PersistGate } from "redux-persist/integration/react";
import DashboadHeader from "@/components/layout/DashboardHeader";
import DashboardNav from "@/components/layout/DashboardNav";
import NotificationsPollingComponent from "@/components/ui/NotificationsPolling";
import PageLoadingComponent from "@/components/ui/PageLoading";
import Main from "@/components/layout/Main";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <PersistGate loading={<PageLoadingComponent />} persistor={persistor}>
        <div
          className={`w-full h-screen bg-[#f7f7f7] text-custom-gray font-app-normal`}
        >
          <DashboadHeader>
            <DashboardNav />
          </DashboadHeader>
          <NotificationsPollingComponent />
          <Main>
            <QueryClientProvider client={queryClient}>
              {children}
            </QueryClientProvider>
          </Main>
        </div>
        <Toaster />
      </PersistGate>
    </Provider>
  );
}
