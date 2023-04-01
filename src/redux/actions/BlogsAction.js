import axios from "../../api";

export const getAllBlogs = () => async (dispatch) => {
    try {
        dispatch({ type: "GET_BLOGS_REQUEST" });
        const { data } = await axios.get("/blog");
        dispatch({ type: "GET_BLOGS_SUCCESS", payload: data });
    } catch (error) {
        dispatch({ type: "GET_BLOGS_FAIL", payload: error });
    }
};

export const getBlogById = (id) => async (dispatch) => {
    try {
        dispatch({ type: "VIEW_BLOG_REQUEST" });
        const { data } = await axios.get(`/blog/${id}`);
        dispatch({ type: "VIEW_BLOG_SUCCESS", payload: data });
    } catch (error) {
        dispatch({ type: "VIEW_BLOG_FAIL", payload: error });
    }
};

export const getBlogByUserId = (id) => async (dispatch) => {
    try {
        dispatch({ type: "USER_BLOG_REQUEST" });
        const { data } = await axios.get(`/blog/user/${id}`);
        dispatch({ type: "USER_BLOG_SUCCESS", payload: data });
    } catch (error) {
        dispatch({ type: "USER_BLOG_FAIL", payload: error });
    }
};
