import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./redux/reducer/auth.reducer";
// import { toastMiddleware } from "./redux/middleware/toast.middleware";

const store = configureStore({
    reducer: { authReducer },
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(toastMiddleware, tokenMiddleware)
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>

export default store;