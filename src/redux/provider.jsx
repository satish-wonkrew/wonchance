"use client";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "@/store"; // Ensure correct path

export function Providers({ children }) {
  return (
    <Provider store={store}>
      {/* Only wrap in PersistGate if persistor is available (i.e., client-side) */}
      {persistor ? (
        <PersistGate loading={null} persistor={persistor}>
          {children}
        </PersistGate>
      ) : (
        children
      )}
    </Provider>
  );
}
