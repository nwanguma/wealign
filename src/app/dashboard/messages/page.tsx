"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";

import { ProfilePreviewCard } from "@/components/ui/ProfileCardPreview";
import { RootState } from "@/store";
import AppModal from "@/components/ui/Modal";
import { Conversation, Message, User } from "@/common/constants";
import { getTime, isWithinLast10Minutes, timeAgo } from "@/lib/helpers";
import { IMessageFilters } from "@/common/constants";
import { fetchMessages, sendMessage } from "@/api";

export default function MessagesPage() {
  const {
    user,
    profiles: profilesRecommendations,
    conversations,
    latestConversation,
  } = useSelector((state: RootState) => ({
    user: state.user,
    profiles: state.recommendations?.profiles,
    conversations: state.conversations.data,
    latestConversation: state.conversations.latestConversation,
  }));
  const [messagesFilters, setMessagesFilters] = useState<IMessageFilters>({
    limit: 20,
    page: 1,
  });
  const [activeConversation, setActiveConversation] = useState<
    Conversation | any
  >(
    latestConversation && conversations?.length > 0
      ? conversations.filter(
          (conversation) => conversation.id == latestConversation
        )[0]
      : conversations?.length > 0
      ? conversations[0]
      : null
  );
  const { data: activeConversationMessagesData, refetch } = useQuery({
    queryKey: activeConversation?.id
      ? ["messages", activeConversation?.id]
      : ["messages"],
    queryFn: () =>
      activeConversation.id &&
      fetchMessages(activeConversation.id, messagesFilters),
  });
  const [followingModalIsOpen, setFollowingModalIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  const sendMessageMutation = useMutation({
    mutationFn: (message: any) => sendMessage(message),
    onSuccess: () => {
      refetch();
    },
  });

  const handleSendMessage = () => {
    if (inputMessage.trim() && activeConversation) {
      const message = {
        text: inputMessage,
        user_id: user.id,
        receiver_id: activeConversation.participants?.participant.id,
        conversation_id: activeConversation.id,
      };

      sendMessageMutation.mutate(message);
      setInputMessage("");
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleToggleFollowingModal = () => {
    setFollowingModalIsOpen((o) => !o);
  };

  let activeConversationMessages = [];

  if (activeConversationMessagesData?.data?.length > 0) {
    activeConversationMessages = activeConversationMessagesData.data;
  }

  return (
    <div className="min-h-screen w-full bg-white p-6">
      <div className="flex space-x-5">
        <div className="flex-1  flex flex-col space-y-4">
          <div className="flex min-h-screen border border-gray-300 rounded-lg ">
            <div className="w-[30%] min-w-80 border-r border-gray-200 pr-3 p-2 pt-5">
              <div className="sticky top-0 h-full overflow-y-auto max-h-[calc(100vh-100px)] px-3">
                <div className="flex items-center space-x-1 mb-4">
                  <h2 className="text-base font-app-medium">Messages</h2>
                  <span
                    className="flex bg-blue-600 text-white rounded-full text-xs items-center justify-center"
                    style={{
                      width: "17px",
                      height: "17px",
                    }}
                  >
                    {conversations?.length}
                  </span>
                </div>
                <div className="mb-2 relative">
                  <input
                    type="text"
                    placeholder="Search conversations..."
                    className="w-full pl-3 pr-3 font-app-light py-2 border rounded-lg placeholder:text-xs-sm focus:outline-none focus:border-none focus:ring-1 focus:ring-blue-400"
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <div className="space-y-1">
                  {conversations
                    ?.filter((conversation) => {
                      return (
                        conversation.participants.participant?.profile
                          .first_name +
                        " " +
                        conversation.participants.participant?.profile.last_name
                      )
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase());
                    })
                    .map((conversation) => (
                      <div
                        key={conversation.id}
                        className={`flex flex-col space-y-2 p-3 rounded-lg cursor-pointer ${
                          activeConversation?.id === conversation.id
                            ? "bg-blue-50"
                            : "hover:bg-blue-50"
                        }`}
                        onClick={() => setActiveConversation(conversation)}
                      >
                        <div className="flex items-center space-x-3 relative">
                          <div className="relative">
                            <Image
                              src={
                                conversation.participants?.participant.profile
                                  .avatar as string
                              }
                              width={45}
                              height={45}
                              alt="avatar"
                              className="rounded-full"
                            />
                            {isWithinLast10Minutes(
                              conversation.participants?.participant
                                .last_seen as Date
                            ) && (
                              <span
                                className="absolute bottom-1 right-0 flex bg-green-600 text-white rounded-full text-xs items-center justify-center"
                                style={{
                                  width: "10px",
                                  height: "10px",
                                }}
                              ></span>
                            )}
                          </div>
                          <div className="flex flex-col space-y-1">
                            <span className="font-app-medium text-sm">
                              {conversation.participants?.participant.profile
                                .first_name +
                                " " +
                                conversation.participants?.participant.profile
                                  .last_name}
                            </span>
                            {conversation.messages?.length > 0 && (
                              <span className="text-xs-sm text-gray-700">
                                {conversation?.messages[0]?.text}
                              </span>
                            )}
                          </div>
                          {conversation?.messages &&
                            conversation?.messages[0]?.created_at && (
                              <div
                                className="absolute top-1 text-gray-500 right-0"
                                style={{
                                  fontSize: "12px",
                                }}
                              >
                                {getTime(
                                  conversation?.messages[0]?.created_at as Date
                                )}
                              </div>
                            )}
                        </div>
                      </div>
                    ))}

                  {!conversations?.length && (
                    <div className="bg-slate-50 mt-5 rounded-lg h-14 p-2 flex flex-col justify-center items-center space-y-3 text-custom-gray-paragraph">
                      <span className="text-xs-sm font-medium">
                        Hmmm, there is nothing here!
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="flex-1 flex flex-col">
              {activeConversation && (
                <div className="flex flex-col h-full bg-gray-50 rounded-lg p-2 relative">
                  <div className="sticky top-0 bg-gray-50 z-10 p-4">
                    <div className="flex items-center space-x-3">
                      <div className="border border-gray-300 p-1 rounded-full">
                        <Image
                          src={
                            activeConversation.participants.participant.profile
                              .avatar
                          }
                          width={50}
                          height={50}
                          alt="avatar"
                          className="rounded-full"
                        />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-app-medium">
                          {activeConversation.participants?.participant.profile
                            .first_name +
                            " " +
                            activeConversation.participants?.participant.profile
                              .last_name}
                        </span>
                        <span className="text-xs-sm text-gray-600">
                          {
                            activeConversation.participants?.participant.profile
                              .title
                          }
                        </span>
                        {activeConversation.participants?.participant
                          ?.last_seen && (
                          <span className="text-xs text-gray-500 mt-2">
                            {timeAgo(
                              activeConversation.participants?.participant
                                .last_seen
                            )}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 overflow-y-auto space-y-4 p-4 bg-white rounded-lg shadow-sm">
                    {activeConversationMessages.length > 0 &&
                      activeConversationMessages.map((msg, index) => {
                        return (
                          <div
                            key={index}
                            className={`flex space-x-3 ${
                              msg.sender?.uuid === user.id
                                ? "justify-end"
                                : "justify-start"
                            }`}
                          >
                            <div
                              style={{
                                width: "40px",
                              }}
                            >
                              <Image
                                src={
                                  msg.sender?.uuid === user.id
                                    ? activeConversation.participants?.user
                                        .profile.avatar
                                    : activeConversation.participants
                                        ?.participant.profile.avatar
                                }
                                width={40}
                                height={40}
                                alt="avatar"
                                className="rounded-full justify-self-end"
                              />
                            </div>
                            <div
                              className={`max-w-[66%] p-3 rounded-xl ${
                                msg.sender.uuid === user.id
                                  ? "bg-blue-500 text-white font-app-normal"
                                  : "bg-slate-100 text-gray-800"
                              }`}
                            >
                              <p className="text-sm">{msg.text}</p>
                            </div>
                          </div>
                        );
                      })}
                    <div ref={chatEndRef} />
                  </div>
                  <div className="sticky bottom-0 left-0 right-0 bg-gray-100 px-4 py-3 flex items-center space-x-3">
                    <input
                      type="text"
                      placeholder="Type a message..."
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg placeholder:text-sm"
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                    />
                    <button
                      className="bg-blue-700 text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-600"
                      onClick={handleSendMessage}
                    >
                      <svg
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M22 2L2 8.66667L11.5833 12.4167M22 2L15.3333 22L11.5833 12.4167M22 2L11.5833 12.4167"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              )}
              {!activeConversation && (
                <div className="flex h-1/2 w-full justify-center font-light">
                  <div className="w-96 bg-slate-50 mt-10 rounded-xl h-64 px-4 py-8 text-center flex flex-col justify-center items-center space-y-6 text-custom-gray-paragraph">
                    <div>
                      <p className="text font-app-medium mb-3">
                        Start a conversation
                      </p>
                      <p className="text-sm leading-snug">
                        Message your friends and colleagues to find out what is
                        new with them.
                      </p>
                    </div>
                    <div
                      onClick={handleToggleFollowingModal}
                      className="cursor-pointer flex space-x-2 items-center bg-blue-600 text-white text-xs-sm px-3 py-2 rounded-lg"
                    >
                      <span>Send a message</span>
                      <svg
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8.5 19H8C4 19 2 18 2 13V8C2 4 4 2 8 2H16C20 2 22 4 22 8V13C22 17 20 19 16 19H15.5C15.19 19 14.89 19.15 14.7 19.4L13.2 21.4C12.54 22.28 11.46 22.28 10.8 21.4L9.3 19.4C9.14 19.18 8.77 19 8.5 19Z"
                          stroke="#ffffff"
                          strokeWidth="1.5"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M7 8H17"
                          stroke="#ffffff"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M7 13H13"
                          stroke="#ffffff"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* <aside className="w-1/4 space-y-5">
          <div className="p-4 bg-white rounded-lg border border-gray-300">
            <h3 className="font-app-medium mb-3 text-gray-700 text-base">
              Profiles for you
            </h3>
            <div className="space-y-4">
              {profilesRecommendations &&
                profilesRecommendations.map((profile) => {
                  let hasFollowed = false;

                  if (user)
                    hasFollowed = (user.profile.following || [])
                      .map((following) => {
                        return following.profile_id as string;
                      })
                      .includes(profile.id);

                  return (
                    <div
                      key={profile.id}
                      className="border-b border-b-gray-200 pb-4 last:border-0"
                    >
                      <ProfilePreviewCard
                        currentUserProfileId={user?.profile?.id}
                        name={profile.first_name + " " + profile.last_name}
                        title={profile.title}
                        profile_id={profile.id}
                        user_id={profile.user_id}
                        avatar={profile.avatar || "/images/test-avatar-3.jpg"}
                        hasFollowed={hasFollowed}
                      />
                    </div>
                  );
                })}
            </div>
          </div>
        </aside> */}
      </div>
      <AppModal
        title="Connections"
        isOpen={followingModalIsOpen}
        onClose={() => handleToggleFollowingModal()}
        width="w-1/3"
      >
        <div className="p-4">
          <div className="space-y-4">
            {user?.profile?.followers &&
              user?.profile?.followers.map((profile) => {
                let hasFollowed = false;

                if (user)
                  hasFollowed = (user.profile?.following || [])
                    .map((following) => following.profile_id)
                    .includes(profile.profile_id);
                return (
                  <div
                    key={profile.profile_id}
                    className="border-b border-b-gray-200 pb-4 last:border-0"
                  >
                    <ProfilePreviewCard
                      currentUserProfileId={user?.profile?.id}
                      name={profile.first_name + " " + profile.last_name}
                      title={profile.title || ""}
                      profile_id={profile.profile_id}
                      user_id={profile.user_id}
                      avatar={profile.avatar || "/images/test-avatar-3.jpg"}
                      hasFollowed={hasFollowed}
                    />
                  </div>
                );
              })}
          </div>
        </div>
      </AppModal>
    </div>
  );
}
