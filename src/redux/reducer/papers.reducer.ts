import { ActionReducerMapBuilder, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../../store"
import ContentService, { BaseResponse } from "../service/content.service"

type PapersDataType = {
    _id: string
    userId: string
    title: string
    about: string
    semester: string
    subject: string
    unit: string
    chapter: string
    topic: string
    tags: string[]
    mediaLink: string
    imageLink: string
    __v: number
}
type InitialStateType = {
    loading: boolean,
    data: PapersDataType[],
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
    result: PapersDataType[],
    totalCount: number,
    skip: number,
    limit: number
}

export const getPaper = createAsyncThunk<BaseResponse<ResponseType>, void, { state: RootState }>("papers/getPaper", async (_, thunkApi) => {
    const { skip, limit } = thunkApi.getState().papersReducer.pagination;
    const data = await ContentService.getPapers(skip, limit);
    if (data.status !== "success") throw new Error(data.message ?? "Something went wrong");
    return data;
})

const papersSlice = createSlice({
    name: "papers",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder: ActionReducerMapBuilder<InitialStateType>): void => {
        builder
            .addCase(getPaper.pending, (state) => {
                state.loading = true
            })
            .addCase(getPaper.rejected, (state, action) => {
                state.loading = false
                state.error = action?.error?.message ?? null;
            })
            .addCase(getPaper.fulfilled, (state, action) => {
                state.loading = false
                state.data = state.data.concat(action?.payload?.data?.result ?? []);
                state.error = null
                state.pagination = {
                    canGetMore: (action?.payload?.data?.totalCount ?? 0) > (action?.payload?.data?.skip ?? 0),
                    limit: action?.payload?.data?.limit ?? 10,
                    totalCount: action?.payload?.data?.totalCount ?? 0,
                    skip: action?.payload?.data?.totalCount ?? 0,
                }
            })
    }
})

export const papersAction = papersSlice.actions
export const papersReducer = papersSlice.reducer
export const papersSelector = (root: RootState) => root.papersReducer;