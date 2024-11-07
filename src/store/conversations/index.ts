import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import { Conversation } from "@/common/constants";
import axiosInstance from "@/lib/axiosInstance";

export interface ConversationsSlice {
  data: Conversation[];
  latestConversation: string;
  isLoading: boolean;
  error: string | null;
  hasFetched: boolean;
}

const initialState: ConversationsSlice = {
  data: [],
  latestConversation: "",
  hasFetched: false,
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
    setLatestConversation: (state, action: PayloadAction<string>) => {
      state.latestConversation = action.payload;
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
      state.hasFetched = true;
    });
    builder.addCase(fetchConversations.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error?.message || "Failed to fetch conversations";
    });
  },
});

export const { addToConversations, setLatestConversation } =
  conversationsSlice.actions;
export default conversationsSlice.reducer;
