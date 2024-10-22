import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axiosInstance from "@/lib/axiosInstance";

export const fetchNotifications = createAsyncThunk(
  "notifications/fetchNotifications",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        "/api/proxy/notifications/long-poll"
      );

      return response.data.data;
    } catch (error) {
      return rejectWithValue("Failed to fetch notifications");
    }
  }
);

interface NotificationState {
  data: string[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: NotificationState = {
  data: [],
  status: "idle",
  error: null,
};

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    resetNotifications: (state) => {
      state.data = [];
    },
    markAsRead: (state, action) => {
      state.data = state.data.filter((data) => data !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = Array.from(new Set([...state.data, ...action.payload]));
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export const { resetNotifications, markAsRead } = notificationsSlice.actions;
export default notificationsSlice.reducer;
