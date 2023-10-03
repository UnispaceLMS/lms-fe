import { combineReducers } from "@reduxjs/toolkit";

import rosterSlice from "./rosterSlice";
import sidebarSlice from "./sidebarSlice";

const rootReducer = combineReducers({
  roster: rosterSlice,
  sidebar: sidebarSlice,
});

export default rootReducer;
