import React from "react";
import { Card } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";

// "https://flowbite.com/docs/images/blog/image-1.jpg"

const PostCard = ({ blog }) => {
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.user);
  return (
    <div className="max-w-sm allPost">
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
          <div className="blog_author">Blog By : {blog.user.name}</div>
        </Card>
      </motion.div>
    </div>
  );
};

export default PostCard;
