import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axiosInstance from "@/lib/axiosInstance";
import { fetchConversations } from "../conversations";

export const fetchNotifications = createAsyncThunk(
  "notifications/fetchNotifications",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const response = await axiosInstance.get(
        "/api/proxy/notifications/long-poll"
      );

      if (response.data.messages.length > 0) {
        dispatch(fetchConversations());
      }

      return response.data;
    } catch (error) {
      return rejectWithValue("Failed to fetch notifications");
    }
  }
);

interface NotificationState {
  data: string[];
  messages: string[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: NotificationState = {
  data: [],
  messages: [],
  status: "idle",
  error: null,
};

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    resetNotifications: (state) => {
      state.data = [];
      state.messages = [];
    },
    markAsRead: (state, action) => {
      state.data = state.data.filter((data) => data !== action.payload.data);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = Array.from(
          new Set([...state.data, ...action.payload.data])
        );
        state.messages = Array.from(
          new Set([...state.messages, ...action.payload.messages])
        );
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export const { resetNotifications, markAsRead } = notificationsSlice.actions;
export default notificationsSlice.reducer;
