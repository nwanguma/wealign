import Image from "next/image";
import Link from "next/link";

import { Profile, Article } from "@/common/constants";
import { truncateString, timeAgo, stripHtml } from "@/lib/helpers";

interface IArticleCardPreviewProps {
  article: Partial<Article>;
  isPreview?: boolean;
  descriptionLimit?: number;
}

export const ArticleCardPreview: React.FC<IArticleCardPreviewProps> = ({
  article,
  isPreview,
  descriptionLimit,
}) => {
  const { id, banner, title, body, comments, reactions, created_at, owner } =
    article;
  return (
    <div className="space-x-4 h-full relative">
      <Link href={`/dashboard/articles/${id}`}>
        <div className="h-full flex items-center space-x-5">
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
                {owner && (
                  <span className="text-xs-sm text-gray-500">
                    <span className="font-bold">Author:</span>{" "}
                    {(owner as Profile).first_name}{" "}
                    {(owner as Profile).last_name}
                  </span>
                )}
                <span className="text-xs-sm text-gray-500">
                  <span className="font-bold">Posted:</span>{" "}
                  {timeAgo(created_at as string)}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-app-medium">
                  {truncateString(title as string, 25)}
                </span>
              </div>
              {!isPreview && (
                <span className="text-sm text-custom-gray-paragraph font-light leading-snug">
                  {truncateString(
                    stripHtml(body as string),
                    descriptionLimit || 80
                  )}
                </span>
              )}
            </div>
            {!isPreview && (
              <div className="absolute bottom-0 right-0 flex items-center space-x-3 text-xs text-gray-600">
                {comments?.length > 0 && (
                  <span className="underline">
                    <span>{comments?.length} Comments</span>
                  </span>
                )}
                {reactions?.length > 0 && (
                  <span className="underline">
                    <span>{reactions?.length} Likes</span>
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
