import { ActionReducerMapBuilder, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../../store"
import ContentService, { BaseResponse, FAVOURITETYPE } from "../service/content.service"

type FileDataType = {
    _id: string
    userId: string
    title: string
    about: string
    subject: string
    college: string
    semester: string
    mediaLink: string
    imageLink: string
    tags: string[]
    isFavorited?: boolean
}
type InitialStateType = {
    loading: boolean,
    data: FileDataType[],
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
    result: FileDataType[],
    totalCount: number,
    skip: number,
    limit: number
}

export const getFiles = createAsyncThunk<BaseResponse<ResponseType>, void, { state: RootState }>("files/getFiles", async (_, thunkApi) => {
    const { skip, limit } = thunkApi.getState().filesReducer.pagination;
    const data = await ContentService.getFiles(skip, limit);
    if (data.status !== "success") throw new Error(data.message ?? "Something went wrong");
    return data;
})

export const setFileFav = createAsyncThunk<BaseResponse<string>, { id: string, isFavorited: boolean }, { state: RootState }>("files/setFavorite", async ({ id, isFavorited }, thunkApi) => {
    const { user, error } = thunkApi.getState().authReducer;
    if (user == null) throw new Error(error ?? "User not Logined");
    const data = await ContentService.setFavorite(id, isFavorited, FAVOURITETYPE.FILE);
    if (data.status !== "success") throw new Error(data.message ?? "Something went wrong");
    return data;
})

const filesSlice = createSlice({
    name: "files",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder: ActionReducerMapBuilder<InitialStateType>): void => {
        builder
            .addCase(getFiles.pending, (state) => {
                state.loading = true
            })
            .addCase(getFiles.rejected, (state, action) => {
                state.loading = false
                state.error = action?.error?.message ?? null;
            })
            .addCase(getFiles.fulfilled, (state, action) => {
                state.loading = false
                state.data = state.data.concat(action?.payload?.data?.result ?? [])
                state.error = null
                state.pagination = {
                    canGetMore: (action?.payload?.data?.totalCount ?? 0) > (action?.payload?.data?.skip ?? 0),
                    limit: action?.payload?.data?.limit ?? 10,
                    totalCount: action?.payload?.data?.totalCount ?? 0,
                    skip: action?.payload?.data?.totalCount ?? 0,
                }
            })
            .addCase(setFileFav.fulfilled, (state, action) => {
                state.data = state.data.map((file) => {
                    if (file._id === action?.meta.arg.id) file.isFavorited = action?.meta.arg.isFavorited
                    return file
                })
            })
            .addCase(setFileFav.rejected, (state, action) => {
                state.error = action?.error?.message ?? null
            })
    }
})

export const filesAction = filesSlice.actions
export const filesReducer = filesSlice.reducer
export const filesSelector = (root: RootState) => root.filesReducer;