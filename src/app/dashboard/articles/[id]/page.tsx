"use client";

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

import axiosInstance from "@/lib/axiosInstance";
import { Article } from "@/common/constants";
import {
  ArticleCardMain,
  ArticleCardPreview,
} from "@/components/ui/ArticleCard";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { Profile } from "@/common/constants";

const fetchArticle = async (id: string): Promise<Article> => {
  try {
    const response = await axiosInstance.get(`/api/proxy/articles/${id}`);

    return response.data.data;
  } catch (error: any) {
    throw error;
  }
};

export default function Dashboard() {
  const { articles: articleRecommendations } = useSelector(
    (state: RootState) => state.recommendations
  );
  const params = useParams();
  const id = params?.id;

  const {
    data: article,
    error,
    isLoading,
  } = useQuery<Article, Error>({
    queryKey: ["articles", id],
    queryFn: () => fetchArticle(id as string),
  });

  console.log(article);

  return (
    <div className="min-h-screen w-full bg-white">
      <div className="flex space-x-5 p-6">
        <div className="flex-1 p-4 flex flex-col space-y-5 w-full border border-gray-300 rounded-lg">
          <div className="w-full">
            {article && <ArticleCardMain article={article} />}
          </div>
        </div>
        <aside className="w-1/3 space-y-5">
          <div className="p-4 bg-white rounded-lg border border-gray-300">
            <h3 className="font-app-medium mb-3 text-gray-700">
              Upcoming articles
            </h3>
            <div className="space-y-4">
              {articleRecommendations &&
                articleRecommendations.slice(0, 4).map((article) => {
                  return (
                    <div
                      key={article.id}
                      className="border-b border-b-gray-200 py-3"
                    >
                      <ArticleCardPreview
                        id={article.id}
                        banner={article.banner}
                        title={article.title}
                        created_at={article.created_at}
                        body={article.body}
                        isPreview
                      />
                    </div>
                  );
                })}
              <div className="space-x-4">
                <div className="flex items-center space-x-5">
                  <div className="max-w-20">
                    <div className="flex flex-col justify-center items-center">
                      <span className="text-xs text-custom-gray-paragraph">
                        Mon
                      </span>
                      <span className="text-lg font-bold text-gray-900">4</span>
                      <span className="text-xs text-custom-gray-paragraph">
                        April
                      </span>
                    </div>
                  </div>
                  <div className="w-1/3 h-20 relative rounded-lg">
                    <Image
                      src="/images/test-article-3.jpg"
                      alt="avatar"
                      className="rounded-lg"
                      layout="fill"
                    />
                  </div>
                  <div className="flex flex-col flex-1">
                    <span className="font-medium">
                      A futuristic tech article
                    </span>
                    <span className="text-xs text-custom-gray-paragraph">
                      London, England
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
