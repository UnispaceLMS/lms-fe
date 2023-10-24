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

const saveProfile = createAsyncThunk(
  "save-student-profile",
  async (payload, { fulfillWithValue, rejectWithValue }) => {
    try {
      if (payload) {
        const res = await axiosInstance.post(urls.studentCreateUpdate, payload);

        return fulfillWithValue(res?.data);
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
      state.loading = false;
      state.profile = payload;
      state.error = initialState.error;
    });

    builder.addCase(getStudentProfile.rejected, (state, { error }) => {
      state.error = error;
      state.loading = false;
      state.profile = initialState.profile;
    });
  },
});

export const { clearStudentData } = studentSlice.actions;
export default studentSlice.reducer;
