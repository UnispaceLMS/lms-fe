import { createSlice } from "@reduxjs/toolkit";

const initialState = { list: [] };

const rosterSlice = createSlice({ name: "roster", initialState, reducers: {} });

export default rosterSlice.reducer;
