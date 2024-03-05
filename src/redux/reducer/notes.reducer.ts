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


const file = {
    "status": "success",
    "data": {
        "result": [
            {
                "_id": "63cc4e11ed29c4d66974920e",
                "userId": "63cc47aced29c4d6697491d8",
                "title": "Data Structures Practical File",
                "about": "This file covered several experiments under the guidance of Dr Poonam Narang during 3rd Semester in Batch 2019.                                                Experiments covered are:- 1. To insert an element at user defined position in a linear array.   2. To delete an element from user defined from a linear array.   3. To search an element from linear array using linear array.   4. To search an element from linear array using linear array.    5. To sort linear array using bubble sort algorithm.    6. To create singly linked list with nodes having information about student and perform Insertion, Deletion and Reversal.    7. To create doubly linked list with nodes having information about the employee and perform Insertion, Deletion in list.  8. To create circular linked list with nodes having information about student and perform Insertion, Deletion in circular linked list.    9. To implement sparse matrix using array and store it in the sparse matrix form.    10. To create a stack and perform Pop and Push operations on the stack using array  and many more ......",
                "subject": "Data Structures",
                "college": "Guru Tegh Bahadur Institute of Technology",
                "semester": "3",
                "mediaLink": "https://storage.googleapis.com/download/storage/v1/b/lazy-eng1neer.appspot.com/o/1674333709005DS%20prac%20file%201%20TO%2025.pdf?generation=1674333710941041&alt=media",
                "imageLink": "https://storage.googleapis.com/download/storage/v1/b/lazy-eng1neer.appspot.com/o/1674333711086DS%20prac%20file%201%20TO%2025.pdf_image.png?generation=1674333713186083&alt=media",
                "tags": [
                    "Handwritten",
                    "Printed",
                    "Computer Science"
                ],
                "__v": 0
            },
            {
                "_id": "63cc5200ed29c4d66974921d",
                "userId": "63cc47aced29c4d6697491d8",
                "title": "Data Mining and Business Intelligence Practical File",
                "about": "This practical file contains eight experiments under the guidance of Dr Divya Mam during 7th Semester in 2019 Batch. List of experiments are given below:-  1. Introduction to WEKA ;  2. To study about ETL process & its tools ; 3. To create an .arff file ; 4. Implementation of Classification technique on ARFF files using WEKA ; 5. Implementation of Clustering technique on ARFF files using WEKA ; 6. Implementation of Association Rule technique on ARFF files using WEKA; 7. To explore 2 graphs, view their ARFF files and apply an algorithm on them ; 8. To use Numeric Transform filter and floor function to obtain the precision up to same value.",
                "subject": "Data Mining and Business Intelligence",
                "college": "Guru Tegh Bahadur Institute of Technology",
                "semester": "7",
                "mediaLink": "https://storage.googleapis.com/download/storage/v1/b/lazy-eng1neer.appspot.com/o/1674334716142DMBI%20Harshit%20Arora%20Practical%20File.pdf?generation=1674334718518233&alt=media",
                "imageLink": "https://storage.googleapis.com/download/storage/v1/b/lazy-eng1neer.appspot.com/o/1674334718646DMBI%20Harshit%20Arora%20Practical%20File.pdf_image.png?generation=1674334720799192&alt=media",
                "tags": [
                    "Printed",
                    "Computer Science"
                ],
                "__v": 0
            },
            {
                "_id": "63cc5518ed29c4d669749229",
                "userId": "63cc47aced29c4d6697491d8",
                "title": "Information Security Practical File",
                "about": "This practical file contains eight experiments under the guidance of Dr Divya Mam during the 7th Semester in 2019 Batch. List of experiments are given below:- 1. Make an experiment to implement WEP/WPA 2 PSK, 802.1x EAP Security Protocol ; 2. To implement Windows Firewall to login into bank site ; 3. Implement RSA Algorithm ; 4. Implement DES Algorithm ; 5. Implement Diffie-Hellman Algorithm ; 6. Make a study of anyone simulation tool based on parameters of information security ; 7. Implement VPN through Packet Tracer or any other network simulator tool ; 8. Write a program to perform Encryption/Decryption using Hill Cipher techniques.",
                "subject": "Information Security",
                "college": "Guru Tegh Bahadur Institute of Technology",
                "semester": "7",
                "mediaLink": "https://storage.googleapis.com/download/storage/v1/b/lazy-eng1neer.appspot.com/o/1674335509263is%20file%20harshit.pdf?generation=1674335511074401&alt=media",
                "imageLink": "https://storage.googleapis.com/download/storage/v1/b/lazy-eng1neer.appspot.com/o/1674335511204is%20file%20harshit.pdf_image.png?generation=1674335511975543&alt=media",
                "tags": [
                    "Printed",
                    "Computer Science"
                ],
                "__v": 0
            }
        ],
        "totalCount": 3,
        "skip": 0,
        "limit": 10
    }
}

export const PaperData = paper.data;
export const PracticalData = file.data;