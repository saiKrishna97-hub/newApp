import { combineReducers } from "@reduxjs/toolkit";
import posts from "./posts.js";

export default combineReducers({
  posts: posts,
});
