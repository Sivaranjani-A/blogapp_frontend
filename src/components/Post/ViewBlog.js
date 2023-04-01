import { Card, Spinner } from "flowbite-react";
import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBlogById } from "../../redux/actions/BlogsAction";

const ViewBlog = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBlogById(id));
  }, [id, dispatch]);
  const { viewBlog, loading } = useSelector((state) => state.viewBlog);

  const createdAt = (date) => {
    // Helper function for formatting the date
    const newDate = new Date(date).toLocaleString();
    return newDate;
  };

  if (loading)
    return (
      <div className="text-center">
        <Spinner aria-label="Center-aligned spinner example" />
      </div>
    );
  else
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.8,
          delay: 0.5,
          ease: [0, 0.71, 0.2, 1.01],
        }}
      >
        <Container className="viewBlog" fluid>
          {!loading && viewBlog && (
            <div className="viewCard">
              <Card imgSrc={viewBlog.imageURL}>
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {viewBlog.title}
                </h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                  {viewBlog.content}
                </p>
                <div className="myBlog_card_footer">
                  <div className="blog_author">
                    Blog By : {viewBlog.user.name}
                  </div>
                  <div className="blog_author">
                    Created At : {createdAt(viewBlog.created_at)}
                  </div>
                </div>
              </Card>
            </div>
          )}
        </Container>
      </motion.div>
    );
};

export default ViewBlog;
