"use client";

import { useState } from "react";
import AppModal from "@/components/ui/Modal";
import { useQuery } from "@tanstack/react-query";

import FilterComponent from "@/components/ui/Filter";
import AddItemButton from "@/components/ui/AddItemButton";
import DashboardPageHeader from "@/components/ui/DashboardPageHeader";
import AddArticleForm from "@/components/forms/CreateArticleForm";
import { ArticleCardPreview } from "@/components/ui/ArticleCard";
import { Article } from "@/common/constants";
import axiosInstance from "@/lib/axiosInstance";

import { ArticlesWithPagination } from "@/common/constants";

const fetchArticles = async (): Promise<ArticlesWithPagination> => {
  try {
    const response = await axiosInstance.get("/api/proxy/articles", {
      params: {
        contentType: "all",
      },
    });

    return response.data.data;
  } catch (error: any) {
    throw error;
  }
};

export default function Articles() {
  const {
    data: articlesData,
    error,
    isLoading,
  } = useQuery<ArticlesWithPagination, Error>({
    queryKey: ["articles"],
    queryFn: fetchArticles,
  });

  let articles;

  if (articlesData) {
    const { page, perPage, total, totalPages, data } = articlesData;
    articles = articlesData.data;
  }

  const [addArticleModalIsOpen, setAddArticleModalIsOpen] =
    useState<boolean>(false);

  const handleToggleAddArticleModal = () => {
    setAddArticleModalIsOpen(!addArticleModalIsOpen);
  };

  return (
    <div className="min-h-screen w-full bg-white p-6">
      <div className="flex space-x-5">
        <div className="min-h-screen px-5 md:px-10 lg:px-20">
          <DashboardPageHeader
            title="Discover Articles to Connect and Collaborate with Top Talent"
            description="Explore articles where innovators, creators, and skilled professionals come together. Whether you're seeking collaboration opportunities or looking to grow your network, find the perfect article to connect with individuals who share your vision and expertise."
          />

          <div className="py-5 flex flex-col space-y-5 w-full">
            <FilterComponent />
            <div className="w-full grid grid-cols-2 gap-5">
              {articlesData &&
                articles?.map((article: Article) => (
                  <div
                    key={article.id}
                    className="w-full border border-gray-300 rounded-lg p-4 h-48"
                  >
                    <ArticleCardPreview
                      id={article.id}
                      banner={article.banner}
                      title={article.title}
                      created_at={article.created_at}
                      body={article.body}
                      comment_count={article.comments?.length}
                      like_count={article.reactions?.length}
                    />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
      <AppModal
        title="Create article"
        isOpen={addArticleModalIsOpen}
        onClose={() => handleToggleAddArticleModal()}
        width="w-5/12"
      >
        <AddArticleForm />
      </AppModal>
    </div>
  );
}
