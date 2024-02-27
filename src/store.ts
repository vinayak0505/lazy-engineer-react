import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./redux/reducer/auth.reducer";
import { toastMiddleware } from "./redux/middleware/toast.middleware";
import { helperReducer } from "./redux/reducer/helper.reducer";
import { useDispatch } from "react-redux";

const store = configureStore({
    reducer: { authReducer, helperReducer },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(toastMiddleware)
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;