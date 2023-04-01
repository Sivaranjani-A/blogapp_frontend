const initialState = {
    blogs: [],
    loading: false,
};

export const userBlogReducer = (state = initialState, action) => {
    switch (action.type) {
        case "USER_BLOG_REQUEST":
            return { ...state, loading: true };
        case "USER_BLOG_SUCCESS":
            return { ...state, loading: false, blogs: action.payload };
        case "USER_BLOG_FAIL":
            return { ...state, loading: false, blogs: [], error: action.payload };
        default:
            return state;
    }
};