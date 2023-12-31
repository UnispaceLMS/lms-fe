import Cookies from "universal-cookie";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import urls from "@urls";
import axiosInstance, { tokenKey } from "@axiosInstance";

const cookies = new Cookies();

const initialState = {
  user: null,
  error: null,
  loading: false,
};

export const login = createAsyncThunk(
  "login",
  async (payload, { fulfillWithValue, rejectWithValue }) => {
    try {
      const res = await axiosInstance.post(urls.login, payload);

      window.location.href = "/roster";
      return fulfillWithValue(res?.data);
    } catch (error) {
      console.log(error, "Error in login");
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);

export const validateToken = createAsyncThunk(
  "validate-token",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(urls.validateToken);

      return fulfillWithValue(res?.data);
    } catch (error) {
      console.log(error, "Error validating token");
      logout();
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearErrors: state => {
      state.error = initialState.error;
    },
    setAuthLoading: (state, { payload }) => {
      state.loading = payload;
    },
    setUserData: (state, { payload }) => {
      state.user = payload;
    },
    logout: state => {
      state.user = initialState.user;
      state.error = initialState.error;
      state.loading = initialState.loading;

      localStorage.clear();
      cookies.remove("access-token");
      window.location.href = "/login";
    },
  },
  extraReducers: builder => {
    builder.addCase(login.pending, state => {
      state.loading = true;
    });

    builder.addCase(login.fulfilled, (state, { payload }) => {
      if (payload) state.user = payload;

      state.error = initialState.error;
      state.loading = initialState.loading;
    });

    builder.addCase(login.rejected, (state, { error }) => {
      if (error) state.error = error;
      state.loading = initialState.loading;
    });

    builder.addCase(validateToken.pending, state => {
      state.loading = true;
    });

    builder.addCase(validateToken.fulfilled, (state, { payload }) => {
      if (payload) {
        state.user = payload;
        state.loading = false;
      }
    });

    builder.addCase(validateToken.rejected, (state, { error }) => {
      state.error = error;
      state.loading = false;
    });
  },
});

export const { clearErrors, setAuthLoading, setUserData, logout } =
  authSlice.actions;
export default authSlice.reducer;
