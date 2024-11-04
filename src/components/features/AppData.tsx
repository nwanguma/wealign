import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";

import { RootState, AppDispatch } from "@/store";
import { fetchCurrentUser } from "@/store/user";
import { fetchRecommendations } from "@/store/recommendations";
import { fetchConversations } from "@/store/conversations";
import {
  selectCurrentUser,
  selectRecommendationsHasFetched,
} from "@/lib/selectors";

const AppDataComponent = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [initialFetchDone, setInitialFetchDone] = useState(false);
  const { currentUser, recommendationsHasFetched, conversations } = useSelector(
    (state: RootState) => ({
      currentUser: selectCurrentUser(state),
      recommendationsHasFetched: selectRecommendationsHasFetched(state),
      conversations: state.conversations,
    }),
    shallowEqual
  );

  const fetchData = useCallback(async () => {
    if (!initialFetchDone) {
      const fetchPromises = [];

      if (!currentUser?.id) {
        fetchPromises.push(dispatch(fetchCurrentUser()));
      }
      if (!recommendationsHasFetched) {
        fetchPromises.push(dispatch(fetchRecommendations()));
      }
      if (!conversations.hasFetched) {
        fetchPromises.push(dispatch(fetchConversations()));
      }

      await Promise.all(fetchPromises);
      setInitialFetchDone(true);
    }
  }, [
    initialFetchDone,
    currentUser?.id,
    recommendationsHasFetched,
    conversations.hasFetched,
    dispatch,
  ]);

  useEffect(() => {
    fetchData();
  }, []);

  return null;
};

export default AppDataComponent;
