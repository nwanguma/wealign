import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

import { Conversation } from "@/common/constants";
import axiosInstance from "@/lib/axiosInstance";

export interface ConversationsSlice {
  data: Conversation[];
  isLoading: boolean;
  error: string | null;
}

const initialState: ConversationsSlice = {
  data: [],
  isLoading: false,
  error: null,
};

export const fetchConversations = createAsyncThunk(
  "conversations/fetchConversations",
  async () => {
    const response = await axiosInstance.get("/api/proxy/conversations", {
      params: {
        limit: 1000,
        page: 1,
      },
    });

    return response.data?.data;
  }
);

const conversationsSlice = createSlice({
  name: "conversations",
  initialState,
  reducers: {
    addToConversations: (state, action: PayloadAction<Conversation>) => {
      state.data = [action.payload, ...state.data];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchConversations.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchConversations.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchConversations.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error?.message || "Failed to fetch conversations";
    });
  },
});

export const { addToConversations } = conversationsSlice.actions;
export default conversationsSlice.reducer;