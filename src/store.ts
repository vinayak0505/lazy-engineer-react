import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./redux/reducer/auth.reducer";
import { toastMiddleware } from "./redux/middleware/toast.middleware";
import { helperReducer } from "./redux/reducer/helper.reducer";
import { useDispatch } from "react-redux";
import { tokenMiddleware } from "./redux/middleware/token.middleware";

const store = configureStore({
    reducer: { authReducer, helperReducer },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(tokenMiddleware,toastMiddleware)
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;