import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./redux/reducer/auth.reducer";
import { toastMiddleware } from "./redux/middleware/toast.middleware";
import { helperReducer } from "./redux/reducer/helper.reducer";
import { useDispatch } from "react-redux";
import { tokenMiddleware } from "./redux/middleware/token.middleware";
import { notesReducer } from "./redux/reducer/notes.reducer";
import { booksReducer } from "./redux/reducer/books.reducer";
import { jobsReducer } from "./redux/reducer/jobs.reducer";
import { filesReducer } from "./redux/reducer/files.reducer";

const store = configureStore({
    reducer: { authReducer, helperReducer, notesReducer, booksReducer, jobsReducer, filesReducer },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(tokenMiddleware, toastMiddleware)
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>
export const useAppDispatch = () => useDispatch<AppDispatch>();
export type AppThunkDispatch = typeof store.dispatch;

export default store;