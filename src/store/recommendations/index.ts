import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import axiosInstance from "@/lib/axiosInstance";
import { RootState } from "..";
import { Profile, Project, Event, Job, Article } from "@/common/constants";

interface RecommendationsState {
  profiles: Profile[];
  profilesToFollow: Profile[];
  events: Event[];
  projects: Project[];
  jobs: Job[];
  articles: Article[];
  upcomingEvents: Event[];
  liveEvents: Event[];
  isLoading: boolean;
  error: string | null;
}

const initialState: RecommendationsState = {
  profiles: [],
  events: [],
  projects: [],
  jobs: [],
  articles: [],
  upcomingEvents: [],
  liveEvents: [],
  profilesToFollow: [],
  isLoading: false,
  error: null,
};

export const fetchRecommendations = createAsyncThunk(
  "recommendations/fetchRecommendations",
  async (_, { getState, rejectWithValue }) => {
    // const state = getState() as RootState;

    // if (Object.keys(state.recommendations).length > 0) {
    //   return rejectWithValue("Recommendations already fetched");
    // }

    const response = await axiosInstance.get("/api/proxy/recommendations");
    return response.data.data;
  }
);

const recommendationsSlice = createSlice({
  name: "recommendations",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchRecommendations.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchRecommendations.fulfilled, (state, action: any) => {
      state.isLoading = false;
      const {
        profiles,
        events,
        projects,
        jobs,
        articles,
        upcomingEvents,
        liveEvents,
        profilesToFollow,
      } = action.payload;
      state.profiles = profiles || [];
      state.events = events || [];
      state.projects = projects || [];
      state.jobs = jobs || [];
      state.articles = articles || [];
      state.upcomingEvents = upcomingEvents || [];
      state.liveEvents = liveEvents || [];
      state.profilesToFollow = profilesToFollow || [];
    });
    builder.addCase(fetchRecommendations.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || "Failed to fetch recommendations";
    });
  },
});

export default recommendationsSlice.reducer;
