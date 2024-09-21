import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

import { Profile, User } from "@/common/constants";

const initialState: User = {
  id: "",
  email: "",
  created_at: "",
  status: "",
  profile: {
    uuid: "",
    id: "",
    first_name: "",
    views: 0,
    last_name: "",
    avatar: "",
    bio: "",
    location: "",
    phone: "",
    website: "",
    linkedin: "",
    github: "",
    resume: "",
    languages: [],
    heading: "",
    title: "",
    skills: [],
    followers: [],
    following: [],
  },
};

export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (userId: string) => {
    const response = await axios.get(`/api/users/${userId}`);
    return response.data.data;
  }
);

export const fetchCurrentUser = createAsyncThunk(
  "user/fetchCurrentUser",
  async () => {
    const response = await axios.get(`/api/users/me`);

    return response.data.data;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      return action.payload;
    },
    updateFollowers: (state, action: PayloadAction<Profile>) => {
      state.profile.followers = [...state.profile.followers, action.payload];
    },
    updateFollowing: (state, action: PayloadAction<Profile>) => {
      state.profile.following = [...state.profile.following, action.payload];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchUser.fulfilled,
      (state, action: PayloadAction<User>) => {
        return action.payload;
      }
    );
    builder.addCase(
      fetchCurrentUser.fulfilled,
      (state, action: PayloadAction<User>) => {
        return action.payload;
      }
    );
  },
});

export const { setUser, updateFollowers, updateFollowing } = userSlice.actions;
export default userSlice.reducer;
