import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import recommendProfiles from "@/lib/recommendations/profileRecommendations";
import recommendEvents from "@/lib/recommendations/eventRecommendations";
import recommendProjects from "@/lib/recommendations/projectRecommendations";
import recommendJobs from "@/lib/recommendations/jobRecommendations";
import { RootState } from "..";
import { Profile, Project, Event, Job, Article } from "@/common/constants";
import axiosInstance from "@/lib/axiosInstance";

interface RecommendationsState {
  profiles: Profile[];
  events: Event[];
  projects: Project[];
  jobs: Job[];
  articles: Article[];
  upcomingEvents: Event[];
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
  isLoading: false,
  error: null,
};

export const fetchProfiles = createAsyncThunk(
  "recommendations/fetchProfiles",
  async (_, { getState }) => {
    const response = await axiosInstance.get("/api/proxy/profiles", {
      params: {
        limit: 1000,
        page: 1,
        // contentType: "all"
      },
    });

    const state = getState() as RootState;

    return {
      currentUser: state.user,
      profiles: response.data?.data?.data as Profile[],
    };
  }
);

export const fetchEvents = createAsyncThunk(
  "recommendations/fetchEvents",
  async (_, { getState }) => {
    const response = await axiosInstance.get("/api/proxy/events", {
      params: {
        limit: 1000,
        page: 1,
        contentType: "all",
      },
    });

    const state = getState() as RootState;

    return {
      currentUser: state.user,
      events: response.data?.data?.data as Event[],
    };
  }
);

export const fetchProjects = createAsyncThunk(
  "recommendations/fetchProjects",
  async (_, { getState }) => {
    const response = await axiosInstance.get("/api/proxy/projects", {
      params: {
        limit: 1000,
        page: 1,
        contentType: "all",
      },
    });

    const state = getState() as RootState;

    return {
      currentUser: state.user,
      projects: response.data?.data?.data as Project[],
    };
  }
);

export const fetchJobs = createAsyncThunk(
  "recommendations/fetchJobs",
  async (_, { getState }) => {
    const response = await axiosInstance.get("/api/proxy/jobs", {
      params: {
        limit: 1000,
        page: 1,
        contentType: "all",
      },
    });

    const state = getState() as RootState;

    return {
      currentUser: state.user,
      jobs: response.data?.data?.data as Job[],
    };
  }
);

export const fetchArticles = createAsyncThunk(
  "recommendations/fetchArticles",
  async (_, { getState }) => {
    const response = await axiosInstance.get("/api/proxy/articles", {
      params: {
        limit: 1000,
        page: 1,
        contentType: "all",
      },
    });

    const state = getState() as RootState;

    return {
      currentUser: state.user,
      jobs: response.data?.data?.data as Article[],
    };
  }
);

const recommendationsSlice = createSlice({
  name: "recommendations",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Profiles
    builder.addCase(fetchProfiles.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchProfiles.fulfilled, (state, action) => {
      state.isLoading = false;

      state.profiles = recommendProfiles(action.payload as any);
    });
    builder.addCase(fetchProfiles.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || "Failed to fetch profiles";
    });

    // Events
    builder.addCase(fetchEvents.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchEvents.fulfilled, (state, action) => {
      state.isLoading = false;

      state.events = recommendEvents(action.payload as any);
    });
    builder.addCase(fetchEvents.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || "Failed to fetch events";
    });

    // Projects
    builder.addCase(fetchProjects.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchProjects.fulfilled, (state, action) => {
      state.isLoading = false;

      state.projects = recommendProjects(action.payload as any);
    });
    builder.addCase(fetchProjects.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || "Failed to fetch projects";
    });

    // Jobs
    builder.addCase(fetchJobs.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchJobs.fulfilled, (state, action) => {
      state.isLoading = false;
      state.jobs = recommendJobs(action.payload as any);
    });
    builder.addCase(fetchJobs.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || "Failed to fetch jobs";
    });

    // Articles
    builder.addCase(fetchArticles.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchArticles.fulfilled, (state, action) => {
      state.isLoading = false;
      state.jobs = recommendJobs(action.payload as any);
    });
    builder.addCase(fetchArticles.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || "Failed to fetch articles";
    });
  },
});

export default recommendationsSlice.reducer;