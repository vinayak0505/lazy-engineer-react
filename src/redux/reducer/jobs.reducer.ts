import { ActionReducerMapBuilder, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../../store"
import ContentService, { BaseResponse, FAVORITEENUM } from "../service/content.service"

export type JobDataType = {
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
    isFavorited?: boolean
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

export const getJobs = createAsyncThunk<BaseResponse<ResponseType>, void, { state: RootState }>("jobs/getJobs", async (_, thunkApi) => {
    const { skip, limit } = thunkApi.getState().jobsReducer.pagination;
    const data = await ContentService.getJobs(skip, limit);
    if (data.status !== "success") throw new Error(data.message ?? "Jobs went wrong");
    return data;
})

export const setJobFav = createAsyncThunk<BaseResponse<string>, { id: string, isFavorited: boolean }, { state: RootState }>("jobs/setFavorite", async ({ id, isFavorited }, thunkApi) => {
    const { user, error } = thunkApi.getState().authReducer;
    if (user == null) throw new Error(error ?? "User not Logined");
    const data = await ContentService.setFavorite(id, isFavorited, FAVORITEENUM.JOB);
    if (data.status !== "success") throw new Error(data.message ?? "Something went wrong");
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
                state.data = state.data.concat(action?.payload?.data?.result ?? [])
                state.error = null
                state.pagination = {
                    canGetMore: (action?.payload?.data?.totalCount ?? 0) > (action?.payload?.data?.skip ?? 0),
                    limit: action?.payload?.data?.limit ?? 10,
                    totalCount: action?.payload?.data?.totalCount ?? 0,
                    skip: action?.payload?.data?.totalCount ?? 0,
                }
            })
            .addCase(setJobFav.fulfilled, (state, action) => {
                state.data = state.data.map((job) => {
                    if (job._id === action?.meta.arg.id) {
                        job.isFavorited = action?.meta.arg.isFavorited
                    }
                    return job
                })
            })
            .addCase(setJobFav.rejected, (state, action) => {
                state.error = action?.error?.message ?? null
            })
    }
})

export const jobsAction = jobsSlice.actions
export const jobsReducer = jobsSlice.reducer
export const jobsSelector = (root: RootState) => root.jobsReducer;