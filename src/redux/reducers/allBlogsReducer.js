const initialState = {
    blogs: [],
    loading: false,
};

export const allBlogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case "GET_BLOGS_REQUEST":
            return { ...state, loading: true };
        case "GET_BLOGS_SUCCESS":
            return { ...state, loading: false, blogs: action.payload };
        case "GET_BLOGS_FAIL":
            return { ...state, loading: false, blogs: [], error: action.payload };
        default:
            return state;
    }
};