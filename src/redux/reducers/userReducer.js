const initialState = {
    user: localStorage.getItem("blog-user")
        ? JSON.parse(localStorage.getItem("blog-user"))
        : null,

    loading: false,
};

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case "LOGIN_REQUEST_INIT":
            return { ...state, loading: true };
        case "LOGIN_REQUEST_SUCCESS":
            return { ...state, loading: false, user: action.payload };
        case "LOGIN_REQUEST_FAILED":
            return { ...state, loading: false, user: null, error: action.payload };
        case "REGISTER_REQUEST_SUCCESS":
            return { ...state, loading: false, user: action.payload };
        case "LOGOUT_REQUEST":
            return { ...state, loading: false, user: null };

        default:
            return state;
    }
};