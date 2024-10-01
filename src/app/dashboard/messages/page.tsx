"use client";

import { useEffect, useState, useRef } from "react";
import io, { Socket } from "socket.io-client";
import Image from "next/image";
import { useMutation, useQuery } from "@tanstack/react-query";

import { ProfilePreviewCard } from "@/components/ui/ProfileCard";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import axiosInstance from "@/lib/axiosInstance";
import AppModal from "@/components/ui/Modal";
import { Conversation, Message, User } from "@/common/constants";
import { Profile } from "@/common/constants";
import { timeAgo } from "@/lib/helpers";

interface IMessageFilters {
  limit: number;
  page: number;
}

const fetchMessages = async (
  conversationId: string,
  params: IMessageFilters
) => {
  const result = await axiosInstance.get(
    `/api/proxy/conversations/${conversationId}/messages`,
    {
      params,
    }
  );

  return result.data.data;
};

const socket: Socket = io("http://localhost:8000", {
  extraHeaders: {
    authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJiODlhZWJiMi1iODQyLTQ4NjYtYjVjNS1lNDE1YWI2YWVmZTciLCJlbWFpbCI6ImRvcmFvbG9sYWRlbWlAeW9wbWFpbC5jb20iLCJpYXQiOjE3MjcwODIwMzgsImV4cCI6MTcyNzA4NTYzOH0.YFT8O0mUr7ES2VcHPL3nrgvClbxf19DJGgebQvnlINs`,
  },
  reconnection: false,
});

export default function MessagesPage() {
  const {
    user,
    profiles: profilesRecommendations,
    conversations,
  } = useSelector((state: RootState) => ({
    user: state.user,
    profiles: state.recommendations?.profiles,
    conversations: state.conversations.data,
  }));
  const [messagesFilters, setMessagesFilters] = useState<IMessageFilters>({
    limit: 20,
    page: 1,
  });
  const [activeConversation, setActiveConversation] = useState<
    Conversation | any
  >(conversations?.length > 0 ? conversations[0] : []);
  const { data: activeConversationMessagesData } = useQuery({
    queryKey: ["messages", activeConversation.id],
    queryFn: () => fetchMessages(activeConversation.id, messagesFilters),
  });
  const [followingModalIsOpen, setFollowingModalIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleReceiveMessage = (message: any) => {
      console.log("yes", message);
      if (activeConversation) {
        setActiveConversation((prev: Conversation) => ({
          ...prev!,
          messages: [...prev!.messages, message],
        }));
      }
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    socket.on("connect", () => {
      if (activeConversation) {
        console.log(activeConversation, "lllll");
        const roomId = activeConversation.id;
        socket.emit("joinRoom", roomId);
      }
    });

    socket.on("receiveMessage", handleReceiveMessage);

    return () => {
      socket.off("receiveMessage", handleReceiveMessage);
      // Optionally keep socket connection alive, or manage disconnect based on your app's logic
    };
  }, [activeConversation]);

  const sendMessage = () => {
    if (inputMessage.trim() && activeConversation) {
      const message = {
        text: inputMessage,
        receiver_id: activeConversation.participants?.participant.id,
      };

      socket.emit("sendMessage", {
        user_id: user.id,
        conversation_id: activeConversation.id,
        message: message,
      });

      setActiveConversation((prev: Conversation) => ({
        ...prev!,
        messages: [...prev!.messages, message],
      }));

      setInputMessage("");

      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleToggleFollowingModal = () => {
    setFollowingModalIsOpen((o) => !o);
  };

  const activeConversationMessages: Message[] =
    activeConversationMessagesData?.length
      ? activeConversationMessagesData
      : !activeConversationMessagesData?.length &&
        activeConversation.latest_message
      ? [activeConversation.latest_message]
      : [];

  return (
    <div className="min-h-screen w-full bg-white p-6">
      <div className="flex space-x-5">
        <div className="flex-1  flex flex-col space-y-4">
          <div className="flex min-h-screen border border-gray-300 rounded-lg ">
            <div className="w-1/4 min-w-80 border-r border-gray-200 pr-3 p-2 pt-5">
              <div className="sticky top-0 h-full overflow-y-auto max-h-[calc(100vh-100px)] px-3">
                <h2 className="text font-semibold mb-4">Messages</h2>
                <div className="mb-2 relative">
                  <svg
                    className="absolute left-3 top-3 w-5 h-5 text-gray-400"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M10.5 2C5.81 2 2 5.81 2 10.5S5.81 19 10.5 19c2.45 0 4.66-.88 6.38-2.32l5.15 5.15 1.41-1.41-5.15-5.15C18.12 14.16 19 12.02 19 10.5 19 5.81 15.19 2 10.5 2zM10.5 17c-3.58 0-6.5-2.92-6.5-6.5S6.92 4 10.5 4 17 6.92 17 10.5 14.08 17 10.5 17z" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search conversations..."
                    className="w-full pl-10 pr-3 py-2 border rounded-lg placeholder:text-sm focus:outline-none focus:border-none focus:ring-1 focus:ring-blue-400"
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <div className="space-y-1">
                  {console.log(conversations, "****")}
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
                        className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer ${
                          activeConversation?.id === conversation.id
                            ? "bg-blue-200"
                            : "hover:bg-blue-100"
                        }`}
                        onClick={() => setActiveConversation(conversation)}
                      >
                        <Image
                          src={
                            conversation.participants?.participant.profile
                              .avatar as string
                          }
                          width={50}
                          height={50}
                          alt="avatar"
                          className="rounded-full"
                        />
                        <div className="flex flex-col">
                          <span className="font-medium text-sm">
                            {conversation.participants?.participant.profile
                              .first_name +
                              " " +
                              conversation.participants?.participant.profile
                                .last_name}
                          </span>
                          <span className="text-xs text-gray-500">
                            {conversation?.latest_message?.text}
                          </span>
                        </div>
                      </div>
                    ))}
                  {!conversations?.length && (
                    <div className="bg-slate-50 mt-5 rounded-lg h-14 p-2 flex flex-col justify-center items-center space-y-3 text-gray-500">
                      <span className="text-sm font-medium">
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
                      <Image
                        src={
                          activeConversation.participants?.participant.profile
                            .avatar
                        }
                        width={50}
                        height={50}
                        alt="avatar"
                        className="rounded-full"
                      />
                      <div className="flex flex-col">
                        <span className="font-medium text-lg">
                          {activeConversation.participants?.participant.profile
                            .first_name +
                            " " +
                            activeConversation.participants?.participant.profile
                              .last_name}
                        </span>
                        <span className="text-xs text-gray-500">
                          {(activeConversation.participants?.participant
                            ?.last_seen &&
                            timeAgo(
                              activeConversation.participants?.participant
                                .last_seen
                            )) ||
                            "Last seen recently"}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 overflow-y-auto space-y-4 p-4 bg-white rounded-lg shadow-sm">
                    {!activeConversationMessages?.length &&
                      activeConversation.length > 0 && (
                        <div
                          className={`flex space-x-3 ${
                            activeConversation.latest_message.sender.id ===
                            user.id
                              ? "justify-end"
                              : "justify-start"
                          }`}
                        >
                          <Image
                            src={
                              activeConversation.latestMessage.participantId ===
                              user.id
                                ? activeConversation.participants?.filter(
                                    (participant: User) =>
                                      participant.id === user.id
                                  )[0].profile.avatar
                                : activeConversation.participants?.filter(
                                    (participant: User) =>
                                      participant.id !== user.id
                                  )[0].profile.avatar
                            }
                            width={40}
                            height={40}
                            alt="avatar"
                            className="rounded-full"
                          />
                          <div
                            className={`p-3 rounded-lg ${
                              activeConversation.latestMessage.participantId ===
                              user.id
                                ? "bg-blue-100"
                                : "bg-green-100"
                            }`}
                          >
                            <p className="text-sm text-gray-800">
                              {activeConversation.latestMessage.text}
                            </p>
                          </div>
                        </div>
                      )}
                    {activeConversationMessages.length > 0 &&
                      activeConversationMessages.map((msg, index) => {
                        return (
                          <div
                            key={index}
                            className={`flex space-x-3 ${
                              msg.sender.id === user.id
                                ? "justify-end"
                                : "justify-start"
                            }`}
                          >
                            <Image
                              src={
                                msg.sender.id === user.id
                                  ? activeConversation.participants?.user
                                      .profile.avatar
                                  : activeConversation.participants?.participant
                                      .profile.avatar
                              }
                              width={40}
                              height={40}
                              alt="avatar"
                              className="rounded-full"
                            />
                            <div
                              className={`p-3 rounded-lg ${
                                msg.sender.id === user.id
                                  ? "bg-blue-100"
                                  : "bg-green-100"
                              }`}
                            >
                              <p className="text-sm text-gray-800">
                                {msg.text}
                              </p>
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
                      onClick={sendMessage}
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
                <div className="flex h-1/2 w-full justify-center ">
                  <div className="w-96 bg-slate-50 mt-10 rounded-xl h-64 px-4 py-8 text-center flex flex-col justify-center items-center space-y-6 text-gray-500">
                    <div>
                      <p className="text-xl font-bold mb-3">Say hi!</p>
                      <p
                        className="text-sm leading-snug"
                        style={{ fontSize: "15px" }}
                      >
                        Message your friends and colleagues to find out what is
                        new with them.
                      </p>
                    </div>
                    {/* <Image
                      src="/icons/no-message.svg"
                      alt=""
                      width={70}
                      height={70}
                    /> */}
                    <div
                      onClick={handleToggleFollowingModal}
                      className="cursor-pointer flex space-x-2 items-center bg-blue-600 text-white text-sm px-3 py-2 rounded-lg"
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
        <aside className="w-1/4 space-y-5">
          <div className="p-4 bg-white rounded-lg border border-gray-300">
            <h3 className="font-semibold mb-3 text-gray-700 text-base">
              Who to Follow
            </h3>
            <div className="space-y-4">
              {profilesRecommendations &&
                profilesRecommendations.map((profile) => {
                  let hasFollowed = false;

                  if (user)
                    hasFollowed = user.profile.following
                      .map((following) => following.uuid)
                      .includes(profile.id);
                  return (
                    <div
                      key={profile.id}
                      className="border-b border-b-gray-200 pb-4 last:border-0"
                    >
                      <ProfilePreviewCard
                        name={profile.first_name + " " + profile.last_name}
                        title={profile.title}
                        profile_id={profile.id}
                        user_id={profile.user_id}
                        hasFollowed={hasFollowed}
                      />
                    </div>
                  );
                })}
            </div>
          </div>
        </aside>
      </div>
      <AppModal
        title="Connections"
        isOpen={followingModalIsOpen}
        onClose={() => handleToggleFollowingModal()}
        width="w-1/3"
      >
        <div className="p-4">
          <div className="space-y-4">
            {user.profile.following &&
              user.profile.following.map((profile) => {
                let hasFollowed = false;

                if (user)
                  hasFollowed = user.profile.following
                    .map((following) => following.uuid)
                    .includes(profile.id);
                return (
                  <div
                    key={profile.id}
                    className="border-b border-b-gray-200 pb-4 last:border-0"
                  >
                    <ProfilePreviewCard
                      name={profile.first_name + " " + profile.last_name}
                      title={profile.title}
                      profile_id={profile.id}
                      user_id={profile.user_id}
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
