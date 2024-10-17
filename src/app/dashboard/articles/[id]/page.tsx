"use client";

import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";

import { Article } from "@/common/constants";
import { ArticleCardPreview } from "@/components/ui/ArticleCard";
import { RootState } from "@/store";
import AddArticleForm from "@/components/forms/CreateArticleForm";
import AppModal from "@/components/ui/Modal";
import {
  SkeletonCard,
  SkeletonLoaderPage,
} from "@/components/ui/SkeletonLoader";
import { ArticleCardMain } from "@/components/ui/ArticleCardMain";
import { fetchArticle, deleteArticle } from "@/api";

export default function ArticlePage() {
  const { recommendations, user } = useSelector((state: RootState) => ({
    recommendations: state.recommendations,
    user: state.user,
  }));
  const {
    isLoading: isRecommendationsLoading,
    articles: articleRecommendations,
  } = recommendations;
  const params = useParams();
  const id = params?.id;
  const {
    refetch,
    data: article,
    error,
    isLoading,
  } = useQuery<Article, Error>({
    queryKey: ["articles", id],
    queryFn: () => fetchArticle(id as string),
  });
  const isOwner = user?.profile?.id === article?.owner?.id;
  const deleteMutation = useMutation({
    mutationFn: (articleId: string) => deleteArticle(articleId),
    onSuccess: () => {},
    onError: (error: any) => {},
  });
  const [updateArticleModalIsOpen, setUpdateArticleModalIsOpen] =
    useState<boolean>(false);
  const handleToggleUpdateArticleModal = () => {
    setUpdateArticleModalIsOpen(!updateArticleModalIsOpen);
  };
  const handleDelete = (articleId: string) => {
    deleteMutation.mutate(articleId);
  };

  return (
    <div className="min-h-screen w-full bg-white">
      <div className="flex space-x-5 p-6">
        <div className="flex-1 p-4 flex flex-col space-y-5 w-full border border-gray-300 rounded-lg relative">
          {isLoading && <SkeletonLoaderPage />}
          {!isLoading && article && (
            <div className="w-full">
              <ArticleCardMain
                article={article}
                isOwner={isOwner}
                toggleModal={handleToggleUpdateArticleModal}
                triggerRefetch={refetch}
              />
              {isOwner && (
                <div
                  className="w-full text-center cursor-pointer"
                  onClick={() => handleDelete(article.id as string)}
                >
                  <span className="inline-block rounded text-xs text-red-500 bg-red-50 px-3 py-2">
                    Delete this article
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
        <aside className="w-1/3 space-y-5">
          {isRecommendationsLoading && <SkeletonCard />}
          {!isRecommendationsLoading && (
            <div className="p-4 bg-white rounded-lg border border-gray-300">
              <h3 className="font-app-medium mb-3 text-gray-700">
                More articles
              </h3>
              <div className="space-y-4">
                {articleRecommendations &&
                  articleRecommendations.length > 0 &&
                  [...articleRecommendations].slice(0, 4).map((article) => {
                    return (
                      <div
                        key={article.id}
                        className="border-b border-b-gray-200 py-3"
                      >
                        <ArticleCardPreview
                          article={article}
                          descriptionLimit={40}
                        />
                      </div>
                    );
                  })}
                {articleRecommendations.length == 0 && (
                  <div className="text-sm text-gray-600 pt-2">
                    There are no articles yet
                  </div>
                )}
              </div>
            </div>
          )}
        </aside>
      </div>
      <AppModal
        title="Update article"
        isOpen={updateArticleModalIsOpen}
        onClose={() => handleToggleUpdateArticleModal()}
        width="w-5/12"
      >
        <AddArticleForm
          triggerRefetch={refetch}
          data={article}
          handleModalClose={handleToggleUpdateArticleModal}
        />
      </AppModal>
    </div>
  );
}
