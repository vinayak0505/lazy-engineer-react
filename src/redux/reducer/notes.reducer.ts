import { ActionReducerMapBuilder, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../../store"
import ContentService, { BaseResponse } from "../service/content.service"

type NotesDataType = {
    _id: string,
    userId: string,
    title: string,
    about: string,
    semester: string,
    subject: string,
    unit: string,
    chapter: string,
    mediaLink: string,
    imageLink: string,
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

export const getNotes = createAsyncThunk<BaseResponse<ResponseType>, void, { state: RootState }>("notes/getNotes", async (_, thunkApi) => {
    const { skip, limit } = thunkApi.getState().notesReducer.pagination;
    const data = await ContentService.getNotes(skip, limit);
    if (data.status !== "success") throw new Error(data.message ?? "Notes went wrong");
    return data;
})

const notesSlice = createSlice({
    name: "notes",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder: ActionReducerMapBuilder<InitialStateType>): void => {
        builder.addCase(getNotes.pending, (state) => {
            state.loading = true
        })
            .addCase(getNotes.rejected, (state, action) => {
                state.loading = false
                state.error = action?.error?.message ?? null;
            })
            .addCase(getNotes.fulfilled, (state, action) => {
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
    }
})

export const notesAction = notesSlice.actions
export const notesReducer = notesSlice.reducer
export const notesSelector = (root: RootState) => root.notesReducer;
// get type from notes

const paper = {
    "status": "success",
    "data": {
        "result": [
            {
                "_id": "63cc9e2ef399ca6752697a01",
                "userId": "63cc8c771d7dbcaf86d2dfbe",
                "title": "Wireless Communication End Term Examination",
                "about": "This file contains the questions that came in 7th Semester End Term Examination of Wireless Communication in December 2019 which comprises topics of all four units.",
                "semester": "7",
                "subject": "Wireless Communication",
                "unit": "3",
                "chapter": "2G, 2.5G and 3G Networks and Mobile Services",
                "topic": "PCS, GSM, CDMA, IMT 2000, WLL, and IRIDIUM System",
                "tags": [
                    "Unsolved",
                    "End-Term"
                ],
                "mediaLink": "https://storage.googleapis.com/download/storage/v1/b/lazy-eng1neer.appspot.com/o/1674354220097End%20Term%202019%20WC.pdf?generation=1674354221883483&alt=media",
                "imageLink": "https://storage.googleapis.com/download/storage/v1/b/lazy-eng1neer.appspot.com/o/1674354222015End%20Term%202019%20WC.pdf_image.png?generation=1674354222860356&alt=media",
                "__v": 0
            },
            {
                "_id": "63cca058f399ca6752697a13",
                "userId": "63cc8c771d7dbcaf86d2dfbe",
                "title": "Wireless Communication Mid Term Examination",
                "about": "This file contains the questions which came in Wireless Communication Mid Term Examination happened in March 2020 which comprises of first two units.",
                "semester": "7",
                "subject": "Wireless Communication",
                "unit": "2",
                "chapter": "2G Networks and Introduction to Wireless Communication, PCS & Wireless Channels",
                "topic": "PCS, FDMA, TDMA, CDMA, Fading, GSM and PN Sequence",
                "tags": [
                    "Unsolved",
                    "Mid-Term"
                ],
                "mediaLink": "https://storage.googleapis.com/download/storage/v1/b/lazy-eng1neer.appspot.com/o/1674354772321Mid%20Term%202020%20WC.pdf?generation=1674354774414110&alt=media",
                "imageLink": "https://storage.googleapis.com/download/storage/v1/b/lazy-eng1neer.appspot.com/o/1674354774541Mid%20Term%202020%20WC.pdf_image.png?generation=1674354775981253&alt=media",
                "__v": 0
            },
            {
                "_id": "63cca1d3f399ca6752697a1c",
                "userId": "63cc8c771d7dbcaf86d2dfbe",
                "title": "Database Management System Mid Term Examination",
                "about": "This file contains the questions of Mid Term Examination happened in March 2020 comprises of first two units.",
                "semester": "4",
                "subject": "Database Management System",
                "unit": "1",
                "chapter": "Introductory Concepts of DBMS and Relational Model",
                "topic": "DCL, DML, PL/SQL, E-R Diagram, Relational Algebra Operations",
                "tags": [
                    "Unsolved",
                    "Mid-Term"
                ],
                "mediaLink": "https://storage.googleapis.com/download/storage/v1/b/lazy-eng1neer.appspot.com/o/1674355152050DBMS%2020%20MId%20Term.pdf?generation=1674355154180892&alt=media",
                "imageLink": "https://storage.googleapis.com/download/storage/v1/b/lazy-eng1neer.appspot.com/o/1674355154314DBMS%2020%20MId%20Term.pdf_image.png?generation=1674355155138779&alt=media",
                "__v": 0
            }
        ],
        "totalCount": 3,
        "skip": 0,
        "limit": 10
    }
}

export const PaperData = paper.data;