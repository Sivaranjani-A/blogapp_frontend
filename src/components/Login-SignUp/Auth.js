import React, { useEffect, useState } from "react";
import { Card, Label, TextInput, Button } from "flowbite-react";
import * as yup from "yup";
import { useFormik } from "formik";
import { Container } from "react-bootstrap";
import "./Auth.css";
import { useDispatch, useSelector } from "react-redux";
import { LoginUser, RegisterUser } from "../../redux/actions/UserAction";
import { useNavigate } from "react-router-dom";
import { getBlogByUserId } from "../../redux/actions/BlogsAction";


const formValidationSchema = yup.object({
    name: yup.string(),
    email: yup.string().required("Please enter a email Id"),
    profilePicture: yup.string(),
    password: yup
        .string()
        .required("Please provide a valid password")
        .min(8)
        .max(12),
});

const Auth = () => {
    const [newUser, setNewUser] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, loading } = useSelector((state) => state.user);
    useEffect(() => {
        if (!loading && user) {
            navigate("/");
            dispatch(getBlogByUserId(user._id));
        }
    }, [user, loading]);
    if (!newUser) {
        var initialValues = {
            name: "",
            email: "",
            profilePicture: "",
            password: "",
        };
    } else {
        initialValues = {
            email: "",
            password: "",
        };
    }

    const { handleSubmit, handleChange, errors, handleBlur, touched, values } =
        useFormik({
            initialValues,
            validationSchema: formValidationSchema,
            onSubmit: (values) => {
                if (!newUser) {
                    dispatch(LoginUser(values));
                }
                if (newUser) {
                    dispatch(RegisterUser(values));
                }
            },
        });
    return (
        <Container className="auth_container" fluid>
            <Card>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    {newUser && (
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="username2" value="Enter a Username" />
                            </div>
                            <TextInput
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.name}
                                id="name"
                                type="text"
                                required={true}
                                shadow={true}
                            />
                        </div>
                    )}
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="email2" value="Your email" />
                        </div>
                        <TextInput
                            helperText={
                                <>{errors.email && touched.email ? errors.email : ""}</>
                            }
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.email}
                            id="email"
                            type="email"
                            required={true}
                            shadow={true}
                        />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="password2" value="Your password" />
                        </div>
                        <TextInput
                            onBlur={handleBlur}
                            helperText={
                                <>
                                    {errors.password && touched.password ? errors.password : ""}
                                </>
                            }
                            onChange={handleChange}
                            value={values.password}
                            id="password"
                            type="password"
                            required={true}
                            shadow={true}
                        />
                    </div>
                    {newUser && (
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="profile-picture" value="Profile Picture Link" />
                            </div>
                            <TextInput
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.profilePicture}
                                id="profilePicture"
                                type="text"
                                required={true}
                                shadow={true}
                            />
                        </div>
                    )}
                    <p onClick={() => setNewUser(!newUser)} className="loginText">
                        {newUser
                            ? "Already have an account? Please click here"
                            : "Don't have an account yet?"}
                    </p>
                    <Button type="submit">
                        {newUser ? "Register new account" : "Login"}
                    </Button>
                </form>
            </Card>
        </Container>
    );
};

export default Auth;
