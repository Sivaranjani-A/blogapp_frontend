import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import BlogForm from "./BlogForm";
import axios from "../../api";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddBlog = () => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [blogDetails, setBlogDetails] = useState({
    title: "",
    content: "",
    imageURL: "",
  });

  useEffect(() => {
    if (!user) navigate("/auth");
  }, [user]);

  const AddBlog = (data) => {
    const token = `Bearer ${localStorage.getItem("blog-access-token")}`;
    axios
      .post(
        `/blog`,
        {
          title: data.title,
          content: data.content,
          imageURL: data.imageURL,
          userId: user._id,
          user: user
        },
        {
          headers: { Authorization: token },
        }
      )
      .then((response) => {
        toast.success("Blog Added");
        navigate("/");
      })
      .catch((error) => {
        toast.error("Please try again later");
      });
  };

  return (
    <Container className="auth_container" fluid>
      <BlogForm type="Add" blogDetails={blogDetails} onSubmit={AddBlog} />
    </Container>
  );
};

export default AddBlog;
