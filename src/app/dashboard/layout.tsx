"use client";

import { ReactNode } from "react";
import { Provider } from "react-redux";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import Link from "next/link";

import { store, persistor } from "@/store";
import queryClient from "../../lib/react-query-client";
import { PersistGate } from "redux-persist/integration/react";
import DashboadHeader from "@/components/layout/DashboardHeader";
// import DashboardFooter from "@/components/layout/DashboardFooter";
import DashboardNav from "@/components/layout/DashboardNav";
import NotificationsPollingComponent from "@/components/ui/NotificationsPolling";
import PageLoadingComponent from "@/components/ui/PageLoading";

export default function AuthLayout({ children }: { children: ReactNode }) {
  const requiresProfileUpdate = store.getState().user?.profile?.requires_update;

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
              {requiresProfileUpdate && (
                <div className="bg-blue-100 px-2 py-2 text-sm text-center text-gray-700">
                  You're almost there! Update your{" "}
                  <Link href="/dashboard/me" className="text-blue-700">
                    profile
                  </Link>{" "}
                  to unlock full access!
                </div>
              )}
              <NotificationsPollingComponent />
              <QueryClientProvider client={queryClient}>
                {children}
              </QueryClientProvider>
            </div>
          </main>
          {/* <DashboardFooter /> */}
        </div>
        <Toaster />
      </PersistGate>
    </Provider>
  );
}
