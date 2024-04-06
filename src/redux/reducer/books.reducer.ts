import { ActionReducerMapBuilder, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../../store"
import ContentService, { BaseResponse, FAVORITEENUM } from "../service/content.service"

export type BookDataType = {
    _id: string,
    userId: string,
    title: string,
    about: string,
    semester: string,
    tags: string[],
    writer: string[],
    pages: number,
    bookEdition: number,
    price: number,
    image: string,
    link: string,
    mediaLink: string,
    imageLink: string,
    isFavorited?: boolean
}
type InitialStateType = {
    loading: boolean,
    data: BookDataType[],
    error: string | null,
    pagination: {
        canGetMore: boolean
        limit: number
        totalCount: number
        skip: number
    },
}
const initialState: InitialStateType = {
    loading: true,
    data: [],
    error: null,
    pagination: {
        canGetMore: false,
        limit: 10,
        totalCount: 0,
        skip: 0
    },
}

export type ResponseType = {
    result: BookDataType[],
    totalCount: number,
    skip: number,
    limit: number
}

export const getBooks = createAsyncThunk<BaseResponse<ResponseType>, { refresh?: boolean }, { state: RootState }>("books/getBooks", async ({ refresh = false }, thunkApi) => {
    const { skip, limit } = thunkApi.getState().booksReducer.pagination;
    const data = await ContentService.getBooks(refresh ? 0 : skip, limit);
    if (data.status !== "success") throw new Error(data.message ?? "Something went wrong");
    return data;
})

export const setBookFav = createAsyncThunk<BaseResponse<string>, { id: string, isFavorited: boolean }, { state: RootState }>("books/setFavorite", async ({ id, isFavorited }, thunkApi) => {
    const { user, error } = thunkApi.getState().authReducer;
    if (user == null) throw new Error(error ?? "User not Logined");
    const data = await ContentService.setFavorite(id, isFavorited, FAVORITEENUM.BOOK);
    if (data.status !== "success") throw new Error(data.message ?? "Something went wrong");
    return data;
})

const booksSlice = createSlice({
    name: "books",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder: ActionReducerMapBuilder<InitialStateType>): void => {
        builder
            .addCase(getBooks.pending, (state) => {
                state.loading = true
            })
            .addCase(getBooks.rejected, (state, action) => {
                state.loading = false
                state.error = action?.error?.message ?? null;
            })
            .addCase(getBooks.fulfilled, (state, action) => {
                const data = action?.payload?.data?.result ?? [];
                state.loading = false
                state.data = action.meta.arg.refresh ? data : state.data.concat(action?.payload?.data?.result ?? [])
                state.error = null
                state.pagination = {
                    canGetMore: (action?.payload?.data?.totalCount ?? 0) > (action?.payload?.data?.skip ?? 0),
                    limit: action?.payload?.data?.limit ?? 10,
                    totalCount: action?.payload?.data?.totalCount ?? 0,
                    skip: action?.payload?.data?.totalCount ?? 0,
                }
            })
            .addCase(setBookFav.fulfilled, (state, action) => {
                state.data = state.data.map((book) => {
                    if (book._id === action?.meta.arg.id) book.isFavorited = action?.meta.arg.isFavorited
                    return book
                })
            })
            .addCase(setBookFav.rejected, (state, action) => {
                state.error = action?.error?.message ?? null
            })
    }
})

export const booksAction = booksSlice.actions
export const booksReducer = booksSlice.reducer
export const booksSelector = (root: RootState) => root.booksReducer;