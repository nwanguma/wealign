import { createSelector } from "reselect";

import { RootState } from "../../store";

const selectRecommendations = (state: RootState) => state.recommendations;
const selectUser = (state: RootState) => state.user;
const selectConnections = (state: RootState) => state.connections;
const selectConversations = (state: RootState) => state.conversations;

export const selectProfilesRecommendations = createSelector(
  selectRecommendations,
  (recommendations) => [...recommendations.profiles]
);

export const selectProjectRecommendations = createSelector(
  selectRecommendations,
  (recommendations) => [...recommendations.projects]
);

export const selectUpcomingEventsRecommendations = createSelector(
  selectRecommendations,
  (recommendations) => [...recommendations.upcomingEvents]
);

export const selectLiveEventsRecommendations = createSelector(
  selectRecommendations,
  (recommendations) => [...recommendations.liveEvents]
);

export const selectEventsRecommendations = createSelector(
  selectRecommendations,
  (recommendations) => [...recommendations.events]
);

export const selectArticleRecommendations = createSelector(
  selectRecommendations,
  (recommendations) => [...recommendations.articles]
);

export const selectJobRecommendations = createSelector(
  selectRecommendations,
  (recommendations) => [...recommendations.jobs]
);

export const selectIsRecommendationsLoading = createSelector(
  selectRecommendations,
  (recommendations) => !!recommendations.isLoading
);

export const selectRecommendationsHasFetched = createSelector(
  selectRecommendations,
  (recommendations) => !!recommendations.hasFetched
);

export const selectCurrentUser = createSelector(selectUser, (user) => user);

export const selectConnectionsData = createSelector(
  selectConnections,
  (connections) => Object.assign({}, connections.data)
);

export const selectConversationsData = createSelector(
  selectConversations,
  (conversations) => [...conversations.data]
);

export const selectLatestConversation = createSelector(
  selectConversations,
  (conversations) => conversations.latestConversation
);
