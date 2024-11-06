"use client";
import { RootState } from "@/store";
import { shallowEqual, useSelector } from "react-redux";
import Link from "next/link";

import {
  selectConversationsError,
  selectCurrentUser,
  selectCurrentUserError,
  selectCurrentUserProfileUpdateStatus,
  selectRecommendationsError,
} from "@/lib/selectors";
import PageReload from "../ui/PageReload";

interface IMainProps {
  children: React.ReactNode;
}

const Main: React.FC<IMainProps> = ({ children }) => {
  const {
    requiresUpdate,
    userError,
    conversationsError,
    recommendationsError,
  } = useSelector(
    (state: RootState) => ({
      requiresUpdate: selectCurrentUserProfileUpdateStatus(state),
      userError: selectCurrentUserError(state),
      conversationsError: selectConversationsError(state),
      recommendationsError: selectRecommendationsError(state),
    }),
    shallowEqual
  );

  return (
    <>
      {requiresUpdate && (
        <div className="bg-blue-100 px-2 py-2 text-sm text-center text-gray-700">
          You are almost there! Update your{" "}
          <Link href="/dashboard/me" className="text-blue-700">
            profile
          </Link>{" "}
          to unlock full access!
        </div>
      )}
      <main className="min-h-screen">
        {!userError && !conversationsError && !recommendationsError && (
          <>{children}</>
        )}
        {(userError || conversationsError || recommendationsError) && (
          <PageReload
            userError={userError}
            conversationsError={conversationsError}
            recommendationsError={recommendationsError}
          />
        )}
      </main>
    </>
  );
};

export default Main;
