"use client";

import { ReactNode } from "react";
import { Provider } from "react-redux";
import { QueryClientProvider } from "@tanstack/react-query";

import { store, persistor } from "@/store";
import queryClient from "../../lib/react-query-client";
import { PersistGate } from "redux-persist/integration/react";
import DashboadHeader from "@/components/layout/DashboardHeader";
import DashboardFooter from "@/components/layout/DashboardFooter";
import DashboardNav from "@/components/layout/DashboardNav";
import NotificationsPollingComponent from "@/components/ui/NotificationsPolling";
import PageLoadingComponent from "@/components/ui/PageLoading";

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
          <main className="min-h-screen">
            <div>
              <NotificationsPollingComponent />
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
