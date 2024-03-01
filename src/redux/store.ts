import { combineReducers, configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import { persistStore } from "redux-persist";
import { persistReducer } from "redux-persist";

import { appPersistConfig } from "./slices/app/app.storage";
import { appReducer } from "./slices/app/appSlice";

const rootReducer = combineReducers({
 app: persistReducer(appPersistConfig, appReducer),
});

export const store = configureStore({
 reducer: rootReducer,
 middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
   immutableCheck: false,
   serializableCheck: false,
  }).concat(process.env.NODE_ENV !== "production" ? [logger] : []),
});

export const persistor = persistStore(store);

export type TRootState = ReturnType<typeof store.getState>;
export type TAppDispatch = typeof store.dispatch;
