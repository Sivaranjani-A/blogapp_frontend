import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import PostCard from "./PostCard";
import "./post.css";
import { motion } from "framer-motion";
import { getAllBlogs, getBlogByUserId } from "../../redux/actions/BlogsAction";
import { useDispatch, useSelector } from "react-redux";

const AllPost = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(getAllBlogs());
    if (user) dispatch(getBlogByUserId(user._id));
  }, [dispatch]);
  const { blogs, loading } = useSelector((state) => state.blogs);
  return (
    <Container fluid>
      <h1 className="allPostHeader">All Blogs</h1>
      {!loading && (
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
                  <PostCard blog={blog} />
                </motion.div>
              </Col>
            );
          })}
        </Row>
      )}
    </Container>
  );
};

export default AllPost;
