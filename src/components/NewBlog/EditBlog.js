import axios from "../../api";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import BlogForm from "./BlogForm";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Spinner } from "flowbite-react";

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const [blogDetails, setBlogDetails] = useState({
    title: "",
    content: "",
    imageURL: "",
  });

  useEffect(() => {
    if (!user) navigate("/auth");
    else {
      axios
        .get(`/blog/${id}`)
        .then((response) => {
          const { data } = response;
          setBlogDetails({
            title: data.title,
            content: data.content,
            imageURL: data.imageURL,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [id]);

  const EditBlog = (data) => {
    const token = `Bearer ${localStorage.getItem("blog-access-token")}`;
    axios
      .patch(
        `/blog/${id}`,
        {
          title: data.title,
          content: data.content,
          imageURL: data.imageURL,
          user: user,
        },
        {
          headers: { Authorization: token },
        }
      )
      .then((response) => {
        navigate("/");
        toast.success("Blog edited successfully");
      })
      .catch((error) => {
        toast.error("Please try after sometime");
      });
  };

  if (blogDetails.title !== "") {
    return (
      <Container className="auth_container" fluid>
        <BlogForm blogDetails={blogDetails} onSubmit={EditBlog} type="Edit" />
      </Container>
    );
  } else {
    return (
      <div className="text-center">
        <Spinner aria-label="Center-aligned spinner example" />
      </div>
    );
  }
};

export default EditBlog;
