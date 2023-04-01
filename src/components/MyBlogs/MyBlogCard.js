import React from "react";
import { Card } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "../../api";
import { useDispatch } from "react-redux";
import { getAllBlogs } from "../../redux/actions/BlogsAction";

const MyBlogCard = ({ blog }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem("blog-access-token");

  const handleDelete = (e) => {
    e.stopPropagation();
    axios
      .delete(`/blog/${blog._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        if (response.status === 200) {
          dispatch(getAllBlogs());
          navigate("/");
        }
      })
      .catch((error) => console.log(error));
  };
  return (
    <div className="max-w-sm">
      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300, damping: 8 }}
      >
        <Card
          onClick={() => navigate(`/blog/view/${blog._id}`)}
          imgAlt={blog.title}
          imgSrc={blog.imageURL}
        >
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {blog.title}
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            {`${blog.content.substring(0, 40)}...`}
          </p>
          <div className="myBlog_card_footer">
            <div className="blog_author">Blog By : {blog.user.name}</div>
            <div className="cardIcon">
              <i
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/blog/edit/${blog._id}`);
                }}
                className="fa-solid fa-pen"
              ></i>
              <i onClick={handleDelete} className="fa-solid fa-trash"></i>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default MyBlogCard;
