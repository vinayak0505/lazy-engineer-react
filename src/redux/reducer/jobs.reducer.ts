import { ActionReducerMapBuilder, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../../store"
import ContentService, { BaseResponse } from "../service/content.service"

type JobDataType = {
    _id: string
    userId: string
    title: string
    profile: string
    company: string
    aboutCompany: string
    location: string
    jobType: string
    experienceLevel: string
    datePosted: string
    skillsNeeded: string[]
    expectedSalary: number
    mediaLink: string
    imageLink: string
    __v: number
}
type InitialStateType = {
    loading: boolean,
    data: JobDataType[],
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
    result: JobDataType[],
    totalCount: number,
    skip: number,
    limit: number
}

export const getJobs = createAsyncThunk<BaseResponse<ResponseType>, void, { state: RootState }>("notes/getJobs", async (_, thunkApi) => {
    const { skip, limit } = thunkApi.getState().jobsReducer.pagination;
    const data = await ContentService.getJobs(skip, limit);
    if (data.status !== "success") throw new Error(data.message ?? "Jobs went wrong");
    return data;
})

const jobsSlice = createSlice({
    name: "jobs",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder: ActionReducerMapBuilder<InitialStateType>): void => {
        builder
            .addCase(getJobs.pending, (state) => {
                state.loading = true
            })
            .addCase(getJobs.rejected, (state, action) => {
                state.loading = false
                state.error = action?.error?.message ?? null;
            })
            .addCase(getJobs.fulfilled, (state, action) => {
                state.loading = false
                state.data.concat(action?.payload?.data?.result ?? [])
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

export const jobsAction = jobsSlice.actions
export const jobsReducer = jobsSlice.reducer
export const jobsSelector = (root: RootState) => root.jobsReducer;