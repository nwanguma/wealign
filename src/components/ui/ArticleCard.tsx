import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { Profile, Article } from "@/common/constants";
import { truncateString, formatDateLong, timeAgo } from "@/lib/helpers";

interface IArticleCardPreviewProps {
  id: string;
  title: string;
  banner: string;
  body?: string;
  createdAt: string;
  isPreview?: boolean;
  body_limit?: number;
  comment_count?: number;
  like_count?: number;
  owner?: Profile;
}

export const ArticleCardPreview: React.FC<IArticleCardPreviewProps> = ({
  id,
  banner,
  title,
  body,
  comment_count,
  like_count,
  createdAt,
  owner,
  body_limit = 140,
  isPreview,
}) => {
  return (
    <div className="space-x-4 h-full relative">
      {/* Need to save all routes in a file & export */}
      <Link href={`/dashboard/articles/${id}`}>
        <div className="h-full flex items-start space-x-5">
          <div className="max-w-20"></div>
          <div className="w-1/3 h-full min-h-20 relative rounded-lg">
            <Image
              src={banner || `/images/test-event-2.jpg`}
              alt="avatar"
              className="rounded-lg"
              layout="fill"
            />
          </div>
          <div className="flex flex-col flex-1 space-y-4">
            <div className="flex flex-col space-y-2 py-2">
              <div className="flex flex-col space-y-1">
                <span className="text-xs-sm text-gray-500">
                  <span className="font-bold">Author:</span>{" "}
                  {(owner as Profile).first_name} {(owner as Profile).last_name}
                </span>
                <span className="text-xs-sm text-gray-500">
                  <span className="font-bold">Posted:</span>{" "}
                  {timeAgo(createdAt)}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-app-medium">{title}</span>
              </div>
              {!isPreview && (
                <span className="text-sm text-custom-gray-paragraph font-light leading-snug">
                  {truncateString(body as string, body_limit)}
                </span>
              )}
            </div>
            {!isPreview && (
              <div className="absolute bottom-0 right-0 flex items-center space-x-3 text-xs text-gray-600">
                {!!comment_count && comment_count > 0 && (
                  <span className="underline">
                    <span>{comment_count} Comments</span>
                  </span>
                )}
                {!!like_count && like_count > 0 && (
                  <span className="underline">
                    <span>{like_count} Likes</span>
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

interface IArticleCardMainProps {
  article: Article;
}

export const ArticleCardMain: React.FC<IArticleCardMainProps> = ({
  article,
}) => {
  const {
    id,
    banner,
    title,
    body,
    comments: articleComments,
    reactions: articleReactions,
    created_at,
    owner,
  } = article;
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([
    { id: 1, author: "John Doe", text: "This event looks amazing!" },
    { id: 2, author: "Jane Smith", text: "Can't wait to attend!" },
    { id: 3, author: "Emily Rose", text: "What a fantastic initiative!" },
  ]);

  const handleAddComment = () => {
    if (newComment.trim()) {
      setComments([
        ...comments,
        { id: comments.length + 1, author: "You", text: newComment },
      ]);
      setNewComment("");
    }
  };

  return (
    <div className="relative space-y-5">
      <div className="flex items-center space-x-5">
        <div className="relative w-2/3 h-80">
          <Image
            src={`/images/test-event-5.png`}
            alt="event banner"
            className="rounded-lg"
            layout="fill"
          />
        </div>
        <div className="space-y-2">
          <div className="space-y-1">
            <h3 className="text-sm text-gray-600 font-bold">Author</h3>
            <div className="flex space-x-2 items-center">
              <span className="text-sm text-gray-400 font-bold">
                {(owner as Profile).first_name} {(owner as Profile).last_name}
              </span>
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="text-sm text-gray-600 font-bold">Posted</h3>
            <div className="flex space-x-2 items-center">
              <span className="text-sm text-gray-400 font-bold">
                {formatDateLong(created_at)}
              </span>
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="text-sm text-gray-600 font-bold">Share</h3>
            <div className="flex space-x-3">
              {["linkedin", "google", "facebook", "twitter"].map((platform) => (
                <Image
                  key={platform}
                  src={`/icons/${platform}-share.svg`}
                  alt=""
                  width={20}
                  height={20}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-2">
        <p className="text-gray-600 text-xl font-bold leading-relaxed">
          {title}
        </p>
      </div>
      <div className="space-y-2">
        <h3 className="text-sm font-semibold">Content</h3>
        <p className="text-gray-600 text-sm leading-relaxed">{body}</p>
      </div>
      <div className="space-y-2 w-2/3">
        <h3 className="text-sm font-semibold">Attachments</h3>
        <div className="space-y-2">
          <div className="border border-gray-300 p-3 rounded-lg text-xs bg-slate-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Image
                  src="/icons/file.svg"
                  width={20}
                  height={20}
                  alt="file icon"
                />
                <span>filename.docx</span>
              </div>
              <div className="flex items-center space-x-2">
                <Image
                  src="/icons/download.svg"
                  width={18}
                  height={18}
                  alt="file icon"
                />
                {/* <span>Download</span> */}
              </div>
            </div>
          </div>{" "}
          <div className="border border-gray-300 p-3 rounded-lg text-xs bg-slate-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Image
                  src="/icons/file.svg"
                  width={20}
                  height={20}
                  alt="file icon"
                />
                <span>filename.docx</span>
              </div>
              <div className="flex items-center space-x-2">
                <Image
                  src="/icons/download.svg"
                  width={18}
                  height={18}
                  alt="file icon"
                />
                {/* <span>Download</span> */}
              </div>
            </div>
          </div>{" "}
        </div>
      </div>
      {/* Comments Section */}
      <div className="space-y-2 p-3 rounded-lg">
        <h3 className="text-sm font-semibold underline">
          Comments ({comments.length})
        </h3>
        <div className="space-y-3 border border-gray-300 rounded-lg p-1">
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="px-3 py-2 rounded-lg flex items-center space-x-3 border-b border-gray-100  justify-between"
            >
              <div className="flex items-center space-x-2">
                <div className="border border-gray-300 p-1 rounded-full">
                  <Image
                    src="/images/test-avatar-3.jpg"
                    width={35}
                    height={35}
                    alt="avatar"
                    className="rounded-full"
                  />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <p className="text-xs text-custom-gray-paragraph font-normal">
                      {comment.author}
                    </p>
                    <span
                      className="inline-block w-0.5 h-0.5 rounded-full bg-gray-900"
                      style={{ width: "3px", height: "3px" }}
                    ></span>
                    <span
                      className="text-xs text-custom-gray-paragraph"
                      style={{ fontSize: "11px" }}
                    >
                      30th Jul 2024
                    </span>
                  </div>
                  <p
                    className="text-gray-800 text-xs"
                    style={{ fontSize: "13px" }}
                  >
                    {comment.text}
                  </p>
                </div>
              </div>
              <div className="text-xs">
                {/* <Image src="/icons/bin.svg" width={18} height={18} alt="" /> */}
                <span className="text-red-400 underline">Delete</span>
              </div>
            </div>
          ))}
          <div className="flex items-center space-x-3 px-3 pb-2 border-green-500">
            <input
              type="text"
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 placeholder:text-sm placeholder:text-custom-gray-paragraph rounded-lg focus:border-0 focus:outline-none focus:ring-1 focus:ring-blue-700"
            />
            {/* <button
              onClick={handleAddComment}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Post
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};
