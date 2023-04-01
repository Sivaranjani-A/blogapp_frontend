import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import MyBlogCard from "./MyBlogCard";
import "./MyBlog.css";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBlogByUserId } from "../../redux/actions/BlogsAction";
import { Spinner } from "flowbite-react";

const MyBlogs = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { userId } = useParams();

  useEffect(() => {
    if (!user) navigate("/auth");
    else {
      dispatch(getBlogByUserId(userId));
    }
  }, [userId, dispatch]);

  const { blogs, loading } = useSelector((state) => state.userBlog);

  if (!loading && !blogs) {
    return (
      <div className="text-center">
        <Spinner aria-label="Center-aligned spinner example" />
      </div>
    );
  }

  return (
    <Container fluid>
      <h1 className="allPostHeader">List of your Blogs</h1>
      {!loading && blogs.length > 0 ? (
        <Row>
          {blogs.map((blog) => {
            return (
              <Col key={blog._id} className="postCard" lg={4} md={6} sm={12}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.5,
                    ease: [0, 0.71, 0.2, 1.01],
                  }}
                >
                  <MyBlogCard blog={blog} />
                </motion.div>
              </Col>
            );
          })}
        </Row>
      ) : (
        <h1>No Blogs Added yet</h1>
      )}
    </Container>
  );
};

export default MyBlogs;
