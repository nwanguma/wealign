import Image from "next/image";
import Link from "next/link";
import DOMPurify from "dompurify";

import { Article, Profile } from "@/common/constants";
import { formatDateLong } from "@/lib/helpers";
import { ViewsComponent } from "./ViewsComponent";
import { WithTooltip } from "./WithTooltip";
import { Comments } from "./Comments";
import TopIconBar from "./TopIconBar";

import "../../app/globals.css";

interface IArticleCardMainProps {
  article: Article;
  isOwner?: boolean;
  toggleModal?: () => void;
  triggerRefetch?: () => void;
}

export const ArticleCardMain: React.FC<IArticleCardMainProps> = ({
  article,
  isOwner,
  toggleModal,
  triggerRefetch,
}) => {
  const {
    id,
    banner,
    title,
    body,
    comments,
    reactions,
    created_at,
    owner,
    views,
  } = article;

  return (
    <>
      <TopIconBar>
        <div className="flex space-x-2">
          <ViewsComponent views={views as number} />
          {isOwner &&
            WithTooltip(
              "Edit article",
              <div onClick={() => toggleModal && toggleModal()}>
                <Image src="/icons/edit.svg" alt="" width={20} height={20} />
              </div>
            )}
        </div>
      </TopIconBar>
      <div className="relative space-y-5">
        <div className="flex flex-col xs:flex-row items-center xs:space-x-5">
          <div className="relative w-full md:w-2/3 h-40 md:h-80">
            <Image
              src={banner || `/images/test-event-5.png`}
              alt="event banner"
              className="rounded-lg"
              layout="fill"
            />
          </div>
          <div className="space-y-4">
            <div className="space-y-1">
              <h3 className="text-sm text-gray-400">Author</h3>
              <div className="flex space-x-2 items-center">
                <Link
                  href={`/dashboard/profiles/${owner.id}`}
                  className="text-sm text-gray-600"
                >
                  {(owner as Profile).first_name} {(owner as Profile).last_name}
                </Link>
              </div>
            </div>
            <div className="space-y-1">
              <h3 className="text-sm text-gray-400">Posted</h3>
              <div className="flex space-x-2 items-center">
                <span className="text-sm text-gray-600">
                  {formatDateLong(created_at)}
                </span>
              </div>
            </div>
            <div className="space-y-1">
              <h3 className="text-sm text-gray-400">Share</h3>
              <div className="flex space-x-3">
                {["linkedin", "google", "facebook", "twitter"].map(
                  (platform) => (
                    <Image
                      key={platform}
                      src={`/icons/${platform}-share.svg`}
                      alt=""
                      width={20}
                      height={20}
                    />
                  )
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-gray-800 text-xl font-app-medium leading-relaxed">
            {title}
          </p>
        </div>
        <div>
          <p
            className="text-gray-600 text-sm leading-relaxed article-content"
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(body) }}
          />
        </div>
        <Comments
          isOwner={isOwner!}
          resource="articles"
          resourceId={id}
          triggerRefetch={triggerRefetch}
          comments={comments}
          reactions={reactions}
        />
      </div>
    </>
  );
};
