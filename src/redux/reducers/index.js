import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { allBlogsReducer } from "./allBlogsReducer";
import { viewBlogReducer } from "./viewBlogReducer";
import { userBlogReducer } from "./userBlogReducer";

export default combineReducers({
    user: userReducer,
    blogs: allBlogsReducer,
    viewBlog: viewBlogReducer,
    userBlog: userBlogReducer,
})