import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

const helperSlice = createSlice({
    name: "helper",
    initialState: {},
    reducers: {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        customToast: (state, action) => state,
    },
});

export const helperReducer = helperSlice.reducer;
export const helperAction = helperSlice.actions;
export const helperSelector = (state: RootState) => state.helperReducer;