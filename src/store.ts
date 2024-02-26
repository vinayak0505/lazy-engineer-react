import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./redux/reducer/auth.reducer";
import { toastMiddleware } from "./redux/middleware/toast.middleware";
import { helperReducer } from "./redux/reducer/helper.reducer";

const store = configureStore({
    reducer: { authReducer, helperReducer },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(toastMiddleware)
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>

export default store;