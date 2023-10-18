import { combineReducers } from "@reduxjs/toolkit";

import authSlice from "./authSlice";
import rosterSlice from "./rosterSlice";
import sidebarSlice from "./sidebarSlice";

const rootReducer = combineReducers({
  auth: authSlice,
  roster: rosterSlice,
  sidebar: sidebarSlice,
});

export default rootReducer;
