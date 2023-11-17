import { combineReducers } from "@reduxjs/toolkit";

import authSlice from "./authSlice";
import sidebarSlice from "./sidebarSlice";
import studentSlice from "./studentSlice";

const rootReducer = combineReducers({
  auth: authSlice,
  sidebar: sidebarSlice,
  student: studentSlice,
});

export default rootReducer;
