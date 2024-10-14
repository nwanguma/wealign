"use client";

import { useState } from "react";
import AppModal from "@/components/ui/Modal";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

import FilterComponent from "@/components/ui/Filter";
import AddItemButton from "@/components/ui/AddItemButton";
import DashboardPageHeader from "@/components/ui/DashboardPageHeader";
import AddArticleForm from "@/components/forms/CreateArticleForm";
import { ArticleCardPreview } from "@/components/ui/ArticleCard";
import { Article } from "@/common/constants";
import axiosInstance from "@/lib/axiosInstance";
import ContentWrapper from "@/components/ui/ContentWrapper";
import { ArticlesWithPagination } from "@/common/constants";

import { IPagination } from "../events/page";
import { IFilters } from "../events/page";
import PaginationComponent from "@/components/ui/PaginationComponent";

const fetchArticles = async (
  pagination: IPagination,
  filters: IFilters
): Promise<ArticlesWithPagination> => {
  try {
    const response = await axiosInstance.get("/api/proxy/articles", {
      params: {
        contentType: "all",
        ...pagination,
        ...filters,
      },
    });

    return response.data.data;
  } catch (error: any) {
    throw error;
  }
};

export default function Articles() {
  const [pagination, setPagination] = useState({ page: 1, limit: 5 });
  const [filters, setFilters] = useState({
    keyword: "",
    createdAt: "",
    order: "DESC",
    sortBy: "",
  });

  const {
    data: articlesData,
    error,
    isLoading,
    refetch,
  } = useQuery<ArticlesWithPagination, Error>({
    queryKey: ["articles", pagination],
    queryFn: () => fetchArticles(pagination, filters),
    placeholderData: keepPreviousData,
  });

  let articles;
  let total = 0;

  if (articlesData) {
    const { page, perPage, total: pageTotal, totalPages, data } = articlesData;
    articles = articlesData.data;
    total = pageTotal;
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
            <FilterComponent
              filters={filters}
              setFilters={setFilters}
              triggerRefetch={refetch}
              options={{
                sortByOptions: [
                  {
                    value: "created_at",
                    label: "Date Created",
                  },
                  { value: "views", label: "Views" },
                ],
              }}
            />{" "}
            <ContentWrapper data={articles as Article[]}>
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
                      createdAt={article.created_at}
                      owner={article.owner}
                      body={article.body}
                      comment_count={article.comments?.length}
                      like_count={article.reactions?.length}
                    />
                  </div>
                ))}
            </ContentWrapper>
            {articlesData && articles && (
              <PaginationComponent
                data={articles}
                total={total}
                setPagination={setPagination}
                limit={pagination.limit}
              />
            )}
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
