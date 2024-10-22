import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

import { AppDispatch, RootState } from "@/store";
import {
  addToConversations,
  setLatestConversation,
} from "@/store/conversations";
import { initiateConversation, followUser, unfollowUser } from "@/api";
import { fetchFollowing } from "@/store/user";

interface JustFollowed {
  [key: string]: boolean;
}

export const useFollow = () => {
  const router = useRouter();
  const { conversations } = useSelector((state: RootState) => ({
    conversations: state.conversations.data,
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

      dispatch(fetchFollowing());
    },
    onError: (error: any) => {},
  });
  const unfollowMutation = useMutation({
    mutationFn: (profileId: string) => unfollowUser(profileId),
    onSuccess: (data, profileId) => {
      setJustFollowed((prevState) => ({
        ...prevState,
        [profileId]: false,
      }));

      dispatch(fetchFollowing());
    },
    onError: (error: any) => {},
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

        setTimeout(() => {
          router.push("/dashboard/messages");
        }, 2000);
      }
    },
    onError: () => {},
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
