import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "./user";
import uiReducer from "./ui";
import recommendationsReducer from "./recommendations";
import conversationsReducer from "./conversations";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "recommendations", "conversations"],
};

const rootReducer = combineReducers({
  user: userReducer,
  ui: uiReducer,
  recommendations: recommendationsReducer,
  conversations: conversationsReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
export const handleSignOut = () => {
  persistor.purge();
};

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
