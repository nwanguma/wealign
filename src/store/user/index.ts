import axiosInstance from "@/lib/axiosInstance";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Profile, User } from "@/common/constants";

const initialState: User = {
  id: "",
  email: "",
  created_at: "",
  status: "",
  last_seen: new Date(),
  profile: {
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
    const response = await axiosInstance.get(`/api/proxy/users/${userId}`);
    return response.data.data;
  }
);

export const fetchCurrentUser = createAsyncThunk(
  "user/fetchCurrentUser",
  async () => {
    const response = await axiosInstance.get(`/api/proxy/users/me`);

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
    // updateFollowers: (state, action: PayloadAction<Profile>) => {
    //   state.profile.followers = [
    //     ...state.profile.followers,
    //     action.payload.followers,
    //   ];
    // },
    // updateFollowing: (state, action: PayloadAction<Profile>) => {
    //   state.profile.following = [
    //     ...state.profile.following,
    //     action.payload.followers,
    //   ];
    // },
    updateProfile: (state, action: PayloadAction<Profile>) => {
      state.profile = action.payload;
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

export const {
  setUser,
  updateProfile,
  // updateFollowers,
  // updateFollowing
} = userSlice.actions;
export default userSlice.reducer;
