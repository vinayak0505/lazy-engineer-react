import { ActionReducerMapBuilder, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { BookDataType } from "./books.reducer"
import { FileDataType } from "./files.reducer"
import { JobDataType } from "./jobs.reducer"
import { NotesDataType } from "./notes.reducer"
import { PapersDataType } from "./papers.reducer"
import { RootState } from "../../store"
import ContentService, { BaseResponse } from "../service/content.service"

export type FavoriteDataType = {
    note?: NotesDataType[]
    job?: JobDataType[]
    question_paper?: PapersDataType[]
    books?: BookDataType[]
    practicleFile?: FileDataType[]
}

type InitialStateType = {
    loading: boolean
    data: FavoriteDataType | null
    error: string | undefined | null
}

const initialState: InitialStateType = {
    loading: true,
    data: null,
    error: null
}

export const getFavorite = createAsyncThunk<BaseResponse<FavoriteDataType>, void, { state: RootState }>("favorite/getFavorite", async (_, thunkApi) => {
    const { user, error } = thunkApi.getState().authReducer;
    if (user == null) throw new Error(error ?? "User not Logined");
    const data = await ContentService.getFavorite();
    if (data.status !== "success") throw new Error(data.message ?? "Something went wrong");
    return data;

})

const favoriteSlice = createSlice({
    name: "favorite",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder: ActionReducerMapBuilder<InitialStateType>): void => {

        builder.addCase(getFavorite.pending, (state: InitialStateType) => {
            state.loading = true
        })
        builder.addCase(getFavorite.fulfilled, (state, action) => {
            state.data = action.payload.data
            state.loading = false
        })
        builder.addCase(getFavorite.rejected, (state, action) => {
            state.error = action.error.message
            state.loading = false
        })
    }
})

export const favoriteAction = favoriteSlice.actions
export const favoriteReducer = favoriteSlice.reducer
export const favoriteSelector = (root: RootState) => root.favoriteReducer