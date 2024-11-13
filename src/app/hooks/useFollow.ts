import { useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

import { AppDispatch, RootState } from "@/store";
import {
  addToConversations,
  setLatestConversation,
} from "@/store/conversations";
import { initiateConversation, followUser, unfollowUser } from "@/api";
import { fetchConnections } from "@/store/connections";
import { CustomError } from "@/lib/helpers/class";
import { errorToastWithCustomError } from "@/lib/helpers/toast";
import { selectConversationsData } from "@/lib/selectors";

interface JustFollowed {
  [key: string]: boolean;
}

export const useFollow = (handleCloseModal?: () => void) => {
  const router = useRouter();
  const { conversations } = useSelector((state: RootState) => ({
    conversations: selectConversationsData(state),
  }));
  const dispatch = useDispatch<AppDispatch>();
  const [justFollowed, setJustFollowed] = useState<JustFollowed>({});
  const followMutation = useMutation({
    mutationFn: (profileId: string) => followUser(profileId),
    onSuccess: (data, profileId) => {
      setJustFollowed((prevState) => ({
        ...prevState,
        [profileId]: true,
      }));

      dispatch(fetchConnections());
    },
    onError: (error: CustomError) => {
      errorToastWithCustomError(error);
    },
  });
  const unfollowMutation = useMutation({
    mutationFn: (profileId: string) => unfollowUser(profileId),
    onSuccess: (data, profileId) => {
      setJustFollowed((prevState) => ({
        ...prevState,
        [profileId]: false,
      }));

      dispatch(fetchConnections());
    },
    onError: (error: CustomError) => {
      errorToastWithCustomError(error);
    },
  });
  const initiateConversationsMutation = useMutation({
    mutationFn: (recipientId: string) => initiateConversation(recipientId),
    onSuccess: (data) => {
      const isExistingConversation = conversations.find((conversation) => {
        return conversation.id === data.id;
      });

      if (isExistingConversation) {
        dispatch(setLatestConversation(data.id));
      } else {
        dispatch(addToConversations(data));
      }

      setTimeout(() => {
        router.push("/dashboard/messages");
      }, 2000);
    },
    onError: (error: CustomError) => {
      errorToastWithCustomError(error);
    },
    onSettled: () => {
      handleCloseModal && handleCloseModal();
    },
  });

  const handleFollow = (profileId: string) => {
    followMutation.mutate(profileId);
  };

  const handleUnfollow = (profileId: string) => {
    unfollowMutation.mutate(profileId);
  };

  const handleInitiateConversations = (recipientId: string) => {
    initiateConversationsMutation.mutate(recipientId);
  };

  return {
    handleInitiateConversations,
    handleFollow,
    handleUnfollow,
    justFollowed,
  };
};
