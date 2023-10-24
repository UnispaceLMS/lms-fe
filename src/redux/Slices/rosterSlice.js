import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import urls from "@/urls";
import axiosInstance from "@/axiosInstance";

const initialState = { list: null, error: null, loading: false };

export const fetchRoster = createAsyncThunk(
  "student-roster",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(urls.roster);

      return fulfillWithValue(res?.data);
    } catch (error) {
      console.log(error, "Error in fetching student roster");
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);

const rosterSlice = createSlice({
  name: "roster",
  initialState,
  reducers: {
    clearRoster: state => {
      state.list = initialState.list;
      state.error = initialState.error;
      state.loading = initialState.loading;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchRoster.pending, state => {
      state.loading = true;
    });

    builder.addCase(fetchRoster.fulfilled, (state, { payload }) => {
      if (payload) state.list = payload;
      state.loading = false;
      state.error = initialState.error;
    });

    builder.addCase(fetchRoster.rejected, (state, { error }) => {
      state.error = error;
      state.loading = false;
      state.list = initialState.list;
    });
  },
});

export const { clearRoster } = rosterSlice.actions;
export default rosterSlice.reducer;
