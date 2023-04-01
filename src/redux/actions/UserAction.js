import axios from "../../api";
import { toast } from "react-toastify";

export const LoginUser = (values) => async (dispatch) => {
    try {
        dispatch({ type: "LOGIN_REQUEST_INIT" });
        const { email, password } = values;
        const response = await axios.post("/users/login", { email, password });

        if (response.status === 200) {
            localStorage.setItem("blog-access-token", response.data.token);
            localStorage.setItem("blog-user", JSON.stringify(response.data));
            toast.success("Login Successfull");
            dispatch({ type: "LOGIN_REQUEST_SUCCESS", payload: response.data });
        } else {
            dispatch({ type: "LOGIN_REQUEST_FAILED", payload: response.data });
            toast.error("Invalid Credentials");
        }
    } catch (error) {
        toast.error("Invalid Credentials");
        dispatch({ type: "LOGIN_REQUEST_FAILED", payload: error });
    }
};

export const RegisterUser = (values) => async (dispatch) => {
    try {
        dispatch({ type: "LOGIN_REQUEST_INIT" });
        const { email, password, name, profilePicture } = values;
        const { data } = await axios.post("/users/register", {
            email,
            password,
            name,
            profilePicture,
        });

        localStorage.setItem("blog-access-token", data.token);
        localStorage.setItem("blog-user", JSON.stringify(data));
        toast.success("Welcome!!!");

        dispatch({ type: "REGISTER_REQUEST_SUCCESS", payload: data });
    } catch (error) {
        dispatch({ type: "LOGIN_REQUEST_FAILED", payload: error });
    }
};

export const LogOut = () => async (dispatch) => {
    try {
        dispatch({ type: "LOGOUT_REQUEST" });
        localStorage.clear();
    } catch (error) {
        console.log(error);
    }
};
