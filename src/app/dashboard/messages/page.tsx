"use client";

import { useEffect, useState, useRef } from "react";
import io, { Socket } from "socket.io-client";
import Image from "next/image";

import { ProfilePreviewCard } from "../page";

import DashboardPageHeader from "@/components/ui/DashboardPageHeader";

interface Message {
  content: string;
  sender: string;
}

interface Conversation {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  messages: Message[];
}

let socket: Socket;

export default function MessagesPage() {
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: 1,
      name: "Jane Doe",
      avatar: "/images/test-avatar.jpg",
      lastMessage: "Hey, are you free tomorrow?",
      messages: [
        { content: "Hey, how are you?", sender: "Jane Doe" },
        { content: "I'm doing well, thanks! How about you?", sender: "You" },
        {
          content: "All good here, just working on a project.",
          sender: "Jane Doe",
        },
        {
          content: "Sounds interesting! Tell me more about it.",
          sender: "You",
        },
        ...Array(30).fill({
          content: "Long conversation message",
          sender: "Jane Doe",
        }),
      ],
    },
    {
      id: 2,
      name: "John Smith",
      avatar: "/images/test-avatar-2.jpg",
      lastMessage: "Let's catch up later!",
      messages: [
        { content: "Hi John, what's up?", sender: "You" },
        {
          content: "Not much, just working on some code.",
          sender: "John Smith",
        },
        ...Array(25).fill({
          content: "Random conversation filler",
          sender: "John Smith",
        }),
      ],
    },
    {
      id: 3,
      name: "Sarah Brown",
      avatar: "/images/test-avatar-3.jpg",
      lastMessage: "Are we still on for today?",
      messages: [
        { content: "Hey Sarah, yes we're still on.", sender: "You" },
        { content: "Great, see you soon!", sender: "Sarah Brown" },
      ],
    },
    {
      id: 4,
      name: "Emily White",
      avatar: "/images/test-avatar.jpg",
      lastMessage: "Can you review the document?",
      messages: [
        { content: "Sure, I'll take a look at it.", sender: "You" },
        { content: "Thanks, appreciate it!", sender: "Emily White" },
      ],
    },
    {
      id: 5,
      name: "Mike Johnson",
      avatar: "/images/test-avatar-3.jpg",
      lastMessage: "Ping me when you're free.",
      messages: [
        { content: "I will, might be busy this afternoon.", sender: "You" },
        { content: "No worries, whenever works.", sender: "Mike Johnson" },
      ],
    },
    {
      id: 5,
      name: "Mike Johnson",
      avatar: "/images/test-avatar-3.jpg",
      lastMessage: "Ping me when you're free.",
      messages: [
        { content: "I will, might be busy this afternoon.", sender: "You" },
        { content: "No worries, whenever works.", sender: "Mike Johnson" },
      ],
    },
    {
      id: 5,
      name: "Mike Johnson",
      avatar: "/images/test-avatar-3.jpg",
      lastMessage: "Ping me when you're free.",
      messages: [
        { content: "I will, might be busy this afternoon.", sender: "You" },
        { content: "No worries, whenever works.", sender: "Mike Johnson" },
      ],
    },
    {
      id: 5,
      name: "Mike Johnson",
      avatar: "/images/test-avatar-3.jpg",
      lastMessage: "Ping me when you're free.",
      messages: [
        { content: "I will, might be busy this afternoon.", sender: "You" },
        { content: "No worries, whenever works.", sender: "Mike Johnson" },
      ],
    },
    {
      id: 5,
      name: "Mike Johnson",
      avatar: "/images/test-avatar-3.jpg",
      lastMessage: "Ping me when you're free.",
      messages: [
        { content: "I will, might be busy this afternoon.", sender: "You" },
        { content: "No worries, whenever works.", sender: "Mike Johnson" },
      ],
    },
    {
      id: 5,
      name: "Mike Johnson",
      avatar: "/images/test-avatar-3.jpg",
      lastMessage: "Ping me when you're free.",
      messages: [
        { content: "I will, might be busy this afternoon.", sender: "You" },
        { content: "No worries, whenever works.", sender: "Mike Johnson" },
      ],
    },
    {
      id: 5,
      name: "Mike Johnson",
      avatar: "/images/test-avatar-3.jpg",
      lastMessage: "Ping me when you're free.",
      messages: [
        { content: "I will, might be busy this afternoon.", sender: "You" },
        { content: "No worries, whenever works.", sender: "Mike Johnson" },
      ],
    },
    {
      id: 5,
      name: "Mike Johnson",
      avatar: "/images/test-avatar-3.jpg",
      lastMessage: "Ping me when you're free.",
      messages: [
        { content: "I will, might be busy this afternoon.", sender: "You" },
        { content: "No worries, whenever works.", sender: "Mike Johnson" },
      ],
    },
  ]);

  const [activeConversation, setActiveConversation] =
    useState<Conversation | null>(conversations[0]);
  const [inputMessage, setInputMessage] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    socket = io({
      path: "/api/socket",
    });

    socket.on("receiveMessage", (message: Message) => {
      if (activeConversation) {
        setActiveConversation((prev) => ({
          ...prev!,
          messages: [...prev!.messages, message],
        }));
      }
    });

    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });

    return () => {
      socket.disconnect();
    };
  }, [activeConversation]);

  const sendMessage = () => {
    if (inputMessage.trim() && activeConversation) {
      const message: Message = { content: inputMessage, sender: "You" };

      socket.emit("sendMessage", message);

      setActiveConversation((prev) => ({
        ...prev!,
        messages: [...prev!.messages, message],
      }));

      setInputMessage("");

      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen w-full bg-white p-6">
      <div className="flex space-x-5">
        <div className="flex-1  flex flex-col space-y-4">
          <div className="flex p-2 border border-gray-300 rounded-lg">
            <div className="w-1/4 border-r border-gray-200 pr-4">
              <div className="sticky top-0 h-full overflow-y-auto max-h-[calc(100vh-100px)]">
                <h2 className="text font-semibold mb-4">Messages</h2>

                <div className="mb-2">
                  <input
                    type="text"
                    placeholder="Search conversations..."
                    className="w-full px-3 py-2 border rounded-lg placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  {conversations
                    .filter((conversation) =>
                      conversation.name
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())
                    )
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
                          src={conversation.avatar}
                          width={50}
                          height={50}
                          alt="avatar"
                          className="rounded-full"
                        />
                        <div className="flex flex-col">
                          <span className="font-medium text-sm">
                            {conversation.name}
                          </span>
                          <span className="text-xs text-gray-500">
                            {conversation.lastMessage}
                          </span>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            {/* Conversation Area */}
            <div className="flex-1 flex flex-col">
              {activeConversation && (
                <div className="flex flex-col h-full bg-gray-50 rounded-lg p-6 relative">
                  {/* Chat Header */}
                  <div className="sticky top-0 bg-gray-50 z-10 p-4">
                    <div className="flex items-center space-x-3">
                      <Image
                        src={activeConversation.avatar}
                        width={50}
                        height={50}
                        alt="avatar"
                        className="rounded-full"
                      />
                      <div className="flex flex-col">
                        <span className="font-medium text-lg">
                          {activeConversation.name}
                        </span>
                        <span className="text-sm text-gray-500">
                          Last seen recently
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Chat Body (Scrollable Area) */}
                  <div className="flex-1 overflow-y-auto space-y-4 p-3 bg-white rounded-lg shadow">
                    {activeConversation.messages.map((msg, index) => (
                      <div
                        key={index}
                        className={`flex space-x-3 ${
                          msg.sender === "You" ? "justify-end" : "justify-start"
                        }`}
                      >
                        <Image
                          src={
                            msg.sender === "You"
                              ? "/images/test-avatar-2.jpg"
                              : activeConversation.avatar
                          }
                          width={40}
                          height={40}
                          alt="avatar"
                          className="rounded-full"
                        />
                        <div
                          className={`p-3 rounded-lg ${
                            msg.sender === "You"
                              ? "bg-green-100"
                              : "bg-blue-100"
                          }`}
                        >
                          <p className="text-sm text-gray-800">{msg.content}</p>
                        </div>
                      </div>
                    ))}
                    {/* Ref to keep track of the last message */}
                    <div ref={chatEndRef} />
                  </div>

                  {/* Chat Input (Sticky within conversation area) */}
                  <div className="sticky bottom-0 left-0 right-0 bg-gray-100 px-4 py-3 flex items-center space-x-3 border-t border-gray-300">
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
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </button>
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
              <div className="border-b border-b-gray-200 pb-3">
                <ProfilePreviewCard
                  name="Hauwa Halima"
                  title="Project Manager"
                  id="4"
                />
              </div>
              <div className="border-b border-b-gray-200 pb-3">
                <ProfilePreviewCard
                  name="Hauwa Halima"
                  title="Project Manager"
                  id="4"
                />
              </div>

              <div className="border-b border-b-gray-200 pb-3">
                <ProfilePreviewCard
                  name="Hauwa Halima"
                  title="Project Manager"
                  id="4"
                />
              </div>
              <div className="pb-2">
                <ProfilePreviewCard
                  name="Hauwa Halima"
                  title="Project Manager"
                  id="4"
                />
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
