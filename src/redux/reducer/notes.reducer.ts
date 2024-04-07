import { ActionReducerMapBuilder, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../../store"
import ContentService, { BaseResponse, FAVORITEENUM } from "../service/content.service"
import { UserType } from "./auth.reducer"

export type NotesDataType = {
    _id: string,
    userId: string | UserType,
    title: string,
    about: string,
    semester: string,
    subject: string,
    unit: string,
    chapter: string,
    topic: string,
    mediaLink: string,
    imageLink: string,
    isFavorited: boolean,
    tags: string[],
}
type InitialStateType = {
    loading: boolean,
    data: NotesDataType[],
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
    result: NotesDataType[],
    totalCount: number,
    skip: number,
    limit: number
}

export const getNotes = createAsyncThunk<BaseResponse<ResponseType>, { refresh?: boolean }, { state: RootState }>("notes/getNotes", async ({ refresh = false }, thunkApi) => {
    const { skip, limit } = thunkApi.getState().notesReducer.pagination;
    const data = await ContentService.getNotes(refresh ? 0 : skip, limit);
    if (data.status !== "success") throw new Error(data.message ?? "Something went wrong");
    return data;
})

export const setNotesFav = createAsyncThunk<BaseResponse<string>, { id: string, isFavorited: boolean }, { state: RootState }>("notes/setFavorite", async ({ id, isFavorited }, thunkApi) => {
    const { user, error } = thunkApi.getState().authReducer;
    if (user == null) throw new Error(error ?? "User not Logined");
    const data = await ContentService.setFavorite(id, isFavorited, FAVORITEENUM.NOTE);
    if (data.status !== "success") throw new Error(data.message ?? "Something went wrong");
    return data;
})

const notesSlice = createSlice({
    name: "notes",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder: ActionReducerMapBuilder<InitialStateType>): void => {
        builder
            .addCase(getNotes.pending, (state) => {
                state.loading = true
            })
            .addCase(getNotes.rejected, (state, action) => {
                state.loading = false
                state.error = action?.error?.message ?? null;
            })
            .addCase(getNotes.fulfilled, (state, action) => {
                const data = action?.payload?.data?.result ?? [];
                state.loading = false
                state.data = action.meta.arg.refresh ? data : state.data.concat(data)
                state.error = null
                state.pagination = {
                    canGetMore: (action?.payload?.data?.totalCount ?? 0) > (action?.payload?.data?.skip ?? 0),
                    limit: action?.payload?.data?.limit ?? 10,
                    totalCount: action?.payload?.data?.totalCount ?? 0,
                    skip: action?.payload?.data?.totalCount ?? 0,
                }
            })
            .addCase(setNotesFav.fulfilled, (state, action) => {
                state.data = state.data.map(note => {
                    if (note._id === action.meta.arg.id) {
                        return {
                            ...note,
                            isFavorited: action.meta.arg.isFavorited
                        }
                    } else {
                        return note
                    }
                })
            })
            .addCase(setNotesFav.rejected, (state, action) => {
                state.error = action?.error?.message ?? null;
            })
    }
})

export const notesAction = notesSlice.actions
export const notesReducer = notesSlice.reducer
export const notesSelector = (root: RootState) => root.notesReducer;