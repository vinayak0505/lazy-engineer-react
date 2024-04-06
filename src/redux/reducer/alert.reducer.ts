import { ActionReducerMapBuilder, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ContentService, { BaseResponse } from "../service/content.service";
import { RootState } from "../../store";
import { delay } from "../../utility/delay";

export type AlertType = {
    imageLink: string;
    heading: string;
    message: string;
    link: string;
    tags: string[];
    startDate: Date;
    endDate: Date;
};

type InitialStateType = {
    loading: boolean;
    data: AlertType[] | null;
    error: string | undefined | null;
}

const initialState: InitialStateType = {
    loading: true,
    data: null,
    error: null
}

export const getAlerts = createAsyncThunk<BaseResponse<AlertType[]>, void, { state: RootState }>("alert/getAlerts", async () => {
    const data = await ContentService.getAlerts();
    await delay(2000);
    if (data.status !== "success") throw new Error(data.message ?? "Something went wrong");
    return data;
})

const alertsSlice = createSlice({
    name: "alerts",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder: ActionReducerMapBuilder<InitialStateType>) => {
        builder
            .addCase(getAlerts.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAlerts.fulfilled, (state, action) => {
                state.data = action.payload.data;
                state.loading = false;
            })
            .addCase(getAlerts.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            })
    }
})

export const alertsReducer = alertsSlice.reducer;
export const alertsAction = alertsSlice.actions;
export const alertSelector = (state: RootState) => state.alertsReducer;