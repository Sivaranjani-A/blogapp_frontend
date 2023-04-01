import React, { useEffect } from "react";
import { Card } from "flowbite-react";
import { motion } from "framer-motion";
import "./DashBoard.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getBlogByUserId } from "../../redux/actions/BlogsAction";

const DashBoard = () => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const { blogs } = useSelector((state) => state.userBlog);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!user) navigate("/auth");
    else dispatch(getBlogByUserId(user._id));
  }, [user]);
  return (
    <div className="dashboard">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.8,
          delay: 0.5,
          ease: [0, 0.71, 0.2, 1.01],
        }}
      >
        <div className="max-w-sm">
          <Card>
            <div className="flex flex-col items-center pb-10">
              <img
                className="mb-3 h-27 w-27 rounded-full shadow-lg"
                src={user.profilePicture}
                alt={user.name}
              />
              <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                {user.name}
              </h5>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {user.email}
              </span>
              <div className="mt-4 flex space-x-3 lg:mt-6">
                <p className="inline-flex items-center rounded-lg bg-blue-700 py-2 px-4 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  Blogs Posted : {blogs.length}
                </p>
              </div>
            </div>
          </Card>
        </div>
      </motion.div>
    </div>
  );
};

export default DashBoard;
