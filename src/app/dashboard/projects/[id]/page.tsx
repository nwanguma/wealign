"use client";

import { useCallback, useMemo, useState } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { useParams, useRouter } from "next/navigation";
import { useQuery, useMutation } from "@tanstack/react-query";

import { ProjectCard } from "@/components/ui/ProjectCard";
import { ProjectCardMain } from "@/components/ui/ProjectCardMain";
import { RootState } from "@/store";
import AppModal from "@/components/ui/Modal";
import ProjectForm from "@/components/forms/ProjectForm";
import { fetchProject, deleteProject, deleteProjectFeedback } from "@/api";
import { Project } from "@/common/constants";
import PageWrapperWithError from "@/components/ui/PageWrapper";
import PageMainContent from "@/components/ui/MainContentWrapper";
import RecommendationsComponent from "@/components/ui/RecommendationsComponent";
import { errorToastWithCustomError, successToast } from "@/lib/helpers/toast";
import { CustomError } from "@/lib/helpers/class";
import { feedbackTextMapper } from "@/lib/helpers/constants";
import FeedbackForm from "@/components/forms/FeedbackForm";
import {
  selectCurrentUser,
  selectIsRecommendationsLoading,
  selectProjectRecommendations,
} from "@/lib/selectors";

export default function ProjectPage() {
  const router = useRouter();
  const { isRecommendationsLoading, projectRecommendations, user } =
    useSelector(
      (state: RootState) => ({
        isRecommendationsLoading: selectIsRecommendationsLoading(state),
        projectRecommendations: selectProjectRecommendations(state),
        user: selectCurrentUser(state),
      }),
      shallowEqual
    );
  const params = useParams();
  const id = params?.id;
  const [addProjectModalIsOpen, setAddProjectModalIsOpen] =
    useState<boolean>(false);
  const [addFeedbackModalIsOpen, setAddFeedbackModalIsOpen] =
    useState<boolean>(false);
  const [editFeedbackModalIsOpen, setEditFeedbackModalIsOpen] =
    useState<string>("");

  const {
    refetch,
    data: project,
    error,
    isLoading,
  } = useQuery<Project, Error>({
    queryKey: ["projects", id],
    queryFn: () => (id ? fetchProject(id as string) : Promise.reject("No ID")),
    enabled: !!id,
  });

  const isOwner = user?.profile?.id === project?.owner?.id;
  const deleteMutation = useMutation({
    mutationFn: (projectId: string) => deleteProject(projectId),
    onSuccess: () => {
      successToast(feedbackTextMapper.delete("Project"));
      router.push("/dashboard/jobs");
    },
    onError: (error: CustomError) => {
      errorToastWithCustomError(error);
    },
  });
  const deleteFeedbackMutation = useMutation({
    mutationFn: ({
      projectId,
      feedbackId,
    }: {
      projectId: string;
      feedbackId: string;
    }) => deleteProjectFeedback(projectId, feedbackId),
    onSuccess: () => {
      successToast(feedbackTextMapper.delete("Feedback"));
      refetch();
    },
    onError: (error: CustomError) => {
      errorToastWithCustomError(error);
    },
  });

  const handleDelete = useCallback(
    (projectId: string) => {
      deleteMutation.mutate(projectId);
    },
    [deleteMutation]
  );
  const handleDeleteFeedback = useCallback(
    (projectId: string, feedbackId: string) => {
      deleteFeedbackMutation.mutate({ projectId, feedbackId });
    },
    [deleteFeedbackMutation]
  );
  const handleToggleAddProjectModal = useCallback(() => {
    setAddProjectModalIsOpen((prevState) => !prevState);
  }, []);
  const handleToggleAddFeedbackModal = useCallback(() => {
    setAddFeedbackModalIsOpen((prevState) => !prevState);
  }, []);
  const handleToggleEditFeedbackModal = useCallback((id?: string) => {
    setEditFeedbackModalIsOpen(id || "");
  }, []);
  const MemoizedRecommendations = useMemo(
    () => (
      <RecommendationsComponent
        resourceId={params?.id as string}
        recommendations={projectRecommendations}
        isLoading={isRecommendationsLoading}
        render={(project) => (
          <div className="border-b border-gray-200 last:border-0">
            <ProjectCard project={project as Project} />
          </div>
        )}
        title="Projects for you"
      />
    ),
    [projectRecommendations, isRecommendationsLoading]
  );

  return (
    <PageWrapperWithError error={error}>
      <PageMainContent
        isLoading={isLoading}
        contentData={project!}
        handleDelete={handleDelete}
        isOwner={isOwner}
        mainContent={(project, isOwner) => (
          <ProjectCardMain
            currentUserProfileId={user.profile?.id}
            isOwner={isOwner}
            project={project as Project}
            toggleModal={handleToggleAddProjectModal}
            toggleFeedbackModal={handleToggleAddFeedbackModal}
            toggleEditFeedbackModal={handleToggleEditFeedbackModal}
            handleDeleteFeedback={handleDeleteFeedback}
            triggerRefetch={refetch}
          />
        )}
        asideContent={() => MemoizedRecommendations}
      />
      <AppModal
        title="Update Project"
        isOpen={addProjectModalIsOpen}
        onClose={() => {
          handleToggleAddProjectModal();
        }}
      >
        <ProjectForm
          data={project as Project}
          handleModalClose={handleToggleAddProjectModal}
          triggerRefetch={refetch}
        />
      </AppModal>
      <AppModal
        title="Share feedback"
        isOpen={addFeedbackModalIsOpen}
        onClose={() => {
          handleToggleAddFeedbackModal();
        }}
      >
        <FeedbackForm
          projectData={project as Project}
          handleModalClose={handleToggleAddFeedbackModal}
          triggerRefetch={refetch}
        />
      </AppModal>
      <AppModal
        title="Edit feedback"
        isOpen={!!editFeedbackModalIsOpen}
        onClose={() => {
          handleToggleEditFeedbackModal();
        }}
      >
        <FeedbackForm
          projectData={project as Project}
          feedbackData={project?.feedbacks?.find(
            (f) => f.id === editFeedbackModalIsOpen
          )}
          handleModalClose={handleToggleEditFeedbackModal}
          triggerRefetch={refetch}
        />
      </AppModal>
    </PageWrapperWithError>
  );
}
