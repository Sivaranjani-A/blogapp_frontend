const initialState = {
    viewBlog: null,
    loading: false,
};

export const viewBlogReducer = (state = initialState, action) => {
    switch (action.type) {
        case "VIEW_BLOG_REQUEST":
            return { ...state, loading: true };
        case "VIEW_BLOG_SUCCESS":
            return { ...state, loading: false, viewBlog: action.payload };
        case "VIEW_BLOG_FAIL":
            return {
                ...state,
                loading: false,
                viewBlog: null,
                error: action.payload,
            };
        default:
            return state;
    }
};