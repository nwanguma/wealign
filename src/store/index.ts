import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user";
import uiReducer from "./ui";
import recommedationsReducer from "./recommendations";

export const store = configureStore({
  reducer: {
    user: userReducer,
    ui: uiReducer,
    recommendations: recommedationsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
