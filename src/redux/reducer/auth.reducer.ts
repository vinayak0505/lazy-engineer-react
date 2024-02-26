import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AuthService from "../service/auth.service";
import { RootState } from "../../store";

type initialStateType = {
    user: any;
    loading: boolean;
    error: string | null;
};

const initialState: initialStateType = { user: null, loading: true, error: null };

export const loginUser = createAsyncThunk("auth/loginUser", async (arg: any, thunkApi) => {
    thunkApi.dispatch(authAction.loading());
    const data = await AuthService.loginUser(arg.email, arg.password);
    console.log("data", data);
    if (data.status !== "success") throw new Error(data.message);
    return data;
});

/**
 * Logout the user by signing them out
 */
export const logoutUser = createAsyncThunk("auth/logoutUser", async (_, thunkApi) => {
    thunkApi.dispatch(authAction.loading());
    const token = localStorage.getItem("token");
    if (token) {
        const data = await AuthService.logoutUser(token);
        console.log("data", data);
        if (data.status !== "success") throw new Error(data.message);
        return data;
    }
    return { status: "success" };
});

export const signUpUser = createAsyncThunk("auth/signUpUser", async (arg: any, thunkApi) => {
    thunkApi.dispatch(authAction.loading());
    const data = await AuthService.signUpUser(arg.email, arg.password, arg.name);
    console.log("data", data);
    if (data.status !== "success") throw new Error(data.message);
    return data;
});

export const verifyToken = createAsyncThunk("auth/verifyToken", async (_, thunkApi) => {
    thunkApi.dispatch(authAction.loading());
    const token = localStorage.getItem("token");
    if (token === undefined || token === null) throw new Error("Token not found in cookie");
    const data = await AuthService.verifyToken(token);
    console.log("data", data);
    if (data.status !== "success") throw new Error(data.message);
    return data;
})

const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        error: (state, action) => {
            state.user = null;
            state.loading = false;
            state.error = action.payload;
        },
        loading: (state) => {
            state.user = null;
            state.loading = true;
            state.error = null;
        }
    },
    /**
     * Generates extra reducers for the given builder.
     *
     * @param {object} builder - The builder object.
     * @return {void}
     */
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.fulfilled, (state, action: any) => {
                state.user = action?.payload?.data?.userDetail;
                state.loading = false;
                state.error = null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.error = action?.error?.message ?? null;
                state.user = null;
                state.loading = false;
            })
            .addCase(signUpUser.fulfilled, (state, action: any) => {
                state.user = action?.payload?.data?.userDetail;
                state.loading = false;
                state.error = null;
            })
            .addCase(signUpUser.rejected, (state, action) => {
                state.user = null;
                state.loading = false;
                state.error = action?.error?.message ?? null;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.user = null;
                state.loading = false;
                state.error = null;
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.user = null;
                state.loading = false;
                state.error = action?.error?.message ?? null;
            })
            .addCase(verifyToken.fulfilled, (state, action: any) => {
                state.user = action?.payload?.data?.userDetail;
                state.loading = false;
                state.error = null;
            })
            .addCase(verifyToken.rejected, (state, action) => {
                console.log("rejected", action.error);

                state.error = action?.error?.message ?? null;
                state.user = null;
                state.loading = false;
            });
    },
});

export const authReducer = authSlice.reducer;
export const authAction = authSlice.actions;
export const authSelector = (state: RootState) => state.authReducer;