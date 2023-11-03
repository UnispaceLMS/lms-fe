import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import urls from "@/urls";
import axiosInstance from "@/axiosInstance";

const initialState = {
  error: null,
  profile: null,
  loading: false,
};

export const getStudentProfile = createAsyncThunk(
  "student-profile",
  async (payload, { fulfillWithValue, rejectWithValue }) => {
    try {
      if (payload) {
        const params = { id: payload };

        const res = await axiosInstance.get(urls.studentDetails, { params });

        return fulfillWithValue(res?.data);
      }
      // else {
      //   throw new Error("No student ID provided");
      // }
    } catch (error) {
      console.log(error, "Error in fetching student profile");
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);

export const saveUpdateProfile = createAsyncThunk(
  "save-student-profile",
  async (payload, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data, nextLink } = payload || {};

      if (data) {
        const res = await axiosInstance.post(urls.studentCreateUpdate, data);
        const profile = res?.data;

        return fulfillWithValue({ profile, nextLink });
      }
    } catch (error) {
      console.log(error, "Error in saving student profile");
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);

const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    setStudentData: (state, payload) => {
      state.profile = payload;
    },
    clearStudentData: state => {
      state.error = initialState.error;
      state.profile = initialState.profile;
      state.loading = initialState.loading;
    },
  },
  extraReducers: builder => {
    builder.addCase(getStudentProfile.pending, state => {
      state.loading = true;
    });

    builder.addCase(getStudentProfile.fulfilled, (state, { payload }) => {
      if (payload) state.profile = payload;
      state.loading = false;
      state.error = initialState.error;
    });

    builder.addCase(getStudentProfile.rejected, (state, { error }) => {
      state.error = error;
      state.loading = false;
      state.profile = initialState.profile;
    });

    builder.addCase(saveUpdateProfile.pending, state => {
      state.loading = true;
    });

    builder.addCase(saveUpdateProfile.fulfilled, (state, { payload }) => {
      const { profile, nextLink } = payload || {};

      if (profile) state.profile = profile;
      state.loading = false;
      state.error = initialState.error;

      if (nextLink) window.location.href = nextLink;
    });

    builder.addCase(saveUpdateProfile.rejected, (state, { error }) => {
      state.error = error;
      state.loading = false;
      state.profile = initialState.profile;
    });
  },
});

export const { clearStudentData } = studentSlice.actions;
export default studentSlice.reducer;
