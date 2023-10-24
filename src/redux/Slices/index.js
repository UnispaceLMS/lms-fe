import { combineReducers } from "@reduxjs/toolkit";

import authSlice from "./authSlice";
import rosterSlice from "./rosterSlice";
import sidebarSlice from "./sidebarSlice";
import studentSlice from "./studentSlice";

const rootReducer = combineReducers({
  auth: authSlice,
  roster: rosterSlice,
  sidebar: sidebarSlice,
  student: studentSlice,
});

export default rootReducer;
