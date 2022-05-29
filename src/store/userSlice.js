import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ENP_LOGIN, ENP_UPDATE_USER_INFO } from "api/EndPoint";
import { axios } from "lib/axios/Interceptor";
import LocalStorageService from "services/LocalStorage";

export const login = createAsyncThunk(
    "auth/login",
    async (data, thunkParam) => {
        const response = await axios.post(ENP_LOGIN, data);

        LocalStorageService.setAuthToken(response.data.accessToken);
        LocalStorageService.setRefreshToken(response.data.refreshToken);

        return response.data;
    }
)

export const updateInfo = createAsyncThunk(
    "user/updateInfo",
    async (data, thunkParam) => {
        const response = await axios.put(ENP_UPDATE_USER_INFO, data);

        return response.data;
    }
)



export const userSlice = createSlice({
    name: "user",
    initialState: {
        curUser: null,
        isLoading: false,
    },
    reducers: {
        logout: (state) => {
            LocalStorageService.clearToken("auth");
            LocalStorageService.clearToken("refresh")
            state.curUser = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(login.pending, (state) => {
            state.isLoading = true;
        })

        builder.addCase(login.fulfilled, (state, action) => {
            state.curUser = action.payload.user;
            state.isLoading = false;
            console.log(state.curUser);
        })

        builder.addCase(login.rejected, (state) => {
            state.isLoading = false;
        })

        builder.addCase(updateInfo.pending, (state) => {
            state.isLoading = true;
        })

        builder.addCase(updateInfo.fulfilled, (state, action) => {
            state.curUser = action.payload.user;
            state.isLoading = false;
            console.log(state.curUser);
        })

        builder.addCase(updateInfo.rejected, (state) => {
            state.isLoading = false;
        })
    }
})

export const selectUser = (state) => state.user.curUser;
export const selectLoading = (state) => state.user.isLoading;

export const { logout } = userSlice.actions;

export default userSlice.reducer;