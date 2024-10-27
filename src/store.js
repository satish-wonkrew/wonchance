import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import authReducer from "@/redux/slices/authSlice";
import talentReducer from "@/redux/slices/talentSlice"; // Import your talent slice
import companyReducer from "@/redux/slices/companySlice";
import projectReducer from '@/redux/slices/projectSlice';
import userReducer from '@/redux/slices/userSlice';
import viewReducer from '@/redux/slices/viewSlice';
import roleReducer from '@/redux/slices/roleSlice';
import castingReducer from '@/redux/slices/castingSlice';
import bookmarksReducer from '@/redux/slices/bookmarksSlice';
import uploadReducer from '@/redux/slices/uploadSlice';
import { applicationsReducer } from "./redux/slices/applicationsSlice";

// Check if we're on the client side
const isClient = typeof window !== "undefined";

// Redux Persist Configuration
const persistConfig = {
  key: "root",
  storage, // Only use storage in the browser (will not affect SSR)
};

// Persisted Auth Reducer
const persistedAuthReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
  reducer: {
    auth: isClient ? persistedAuthReducer : authReducer, // Only use persisted reducer in the browser
    talent: talentReducer,
    company: companyReducer,
    projects: projectReducer,
    user: userReducer,
    view: viewReducer,
    roles: roleReducer,
    castings: castingReducer,
    bookmarks: bookmarksReducer,
    applications: applicationsReducer,
    upload: uploadReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER], // Ignore Redux Persist actions
      },
    }),
  devTools: process.env.NODE_ENV !== "production", // Enable Redux DevTools only in development
});

// Export persistor only on client-side to avoid SSR issues
export const persistor = isClient ? persistStore(store) : null;
