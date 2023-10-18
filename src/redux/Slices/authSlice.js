import Cookies from "universal-cookie";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import urls from "@urls";
import axiosInstance from "@axiosInstance";

const cookies = new Cookies();

const initialState = {
  user: null,
  error: null,
  loading: false,
};

export const login = createAsyncThunk("login", async payload => {
  try {
    const res = await axiosInstance.post(urls.login, payload);

    return res?.data;
  } catch (error) {
    console.log(error, "Error in login");
  }
});

export const validateToken = createAsyncThunk("validate-token", async () => {
  try {
    const res = await axiosInstance.get(urls.validateToken);

    return res?.data;
  } catch (error) {
    console.log(error, "Error validating token");
  }
});

export const logout = createAsyncThunk("logout", async () => {
  try {
    // TODO add api
    localStorage.clear();
    cookies.remove("access-tokens");
  } catch (error) {
    console.log(error, "Error in logging out");
  }
});

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
  },
  extraReducers: builder => {
    builder.addCase(login.pending, state => {
      state.loading = true;
    });

    builder.addCase(login.fulfilled, (state, { payload }) => {
      if (payload) {
        state.user = payload;
        state.loading = false;
      }

      window.location.href = "/";
    });

    builder.addCase(login.rejected, (state, { error }) => {
      state.error = error;
      state.loading = false;
    });

    builder.addCase(validateToken.pending, state => {
      state.loading = true;
    });

    builder.addCase(validateToken.fulfilled, (state, { payload }) => {
      console.log(payload, "validate");
      if (payload) {
        state.user = payload;
        state.loading = false;
      }
    });

    builder.addCase(validateToken.rejected, (state, { error }) => {
      state.error = error;
      state.loading = false;
    });

    builder.addCase(logout.pending, state => {
      state.loading = true;
    });

    builder.addCase(logout.fulfilled, (state, { payload }) => {
      console.log(payload, "pay");
      state.user = payload;
      state.loading = false;

      window.location.href = "/";
    });

    builder.addCase(logout.rejected, (state, { error }) => {
      state.error = error;
      state.loading = false;
    });
  },
});

export const { clearErrors, setAuthLoading } = authSlice.actions;
export default authSlice.reducer;
