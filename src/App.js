import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect, useState, lazy, Suspense } from "react";
import axios from "./api";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Spinner } from "flowbite-react";
import { LogOut } from "./redux/actions/UserAction";
// import Navibar from "./components/Navbar/Navbar";
// import AllPost from "./components/Post/AllPost";
// import MyBlogs from "./components/MyBlogs/MyBlogs";
// import Auth from "./components/Login-SignUp/Auth";
// import EditBlog from "./components/NewBlog/EditBlog";
// import AddBlog from "./components/NewBlog/AddBlog";
// import ViewBlog from "./components/Post/ViewBlog";
// import DashBoard from "./components/DashBoard/DashBoard";
// import NotFound from "./components/404/NotFound";

const Navibar = lazy(() => import("./components/Navbar/Navbar"));
const AllPost = lazy(() => import("./components/Post/AllPost"));
const MyBlogs = lazy(() => import("./components/MyBlogs/MyBlogs"));
const Auth = lazy(() => import("./components/Login-SignUp/Auth"));
const EditBlog = lazy(() => import("./components/NewBlog/EditBlog"));
const AddBlog = lazy(() => import("./components/NewBlog/AddBlog"));
const ViewBlog = lazy(() => import("./components/Post/ViewBlog"));
const DashBoard = lazy(() => import("./components/DashBoard/DashBoard"));
const NotFound = lazy(() => import("./components/404/NotFound"));

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const tokenStr = localStorage.getItem("blog-access-token");
  useEffect(() => {
    if (tokenStr) {
      const token = `Bearer ${localStorage.getItem("blog-access-token")}`;
      axios
        .post(
          "/users/auto-login",
          {},
          {
            headers: {
              Authorization: token,
            },
          }
        )
        .then((response) => {
          setLoading(true);
          if (response.status === 200) {
            localStorage.setItem("blog-user", JSON.stringify(response.data));
          } else {
            dispatch(LogOut());
          }
          setLoading(false);
        })
        .catch((error) => console.log(error));
    }
  }, [loading, dispatch]);
  if (loading) {
    return (
      <div className="text-center">
        <Spinner aria-label="Center-aligned spinner example" />
      </div>
    );
  } else
    return (
      <div className="App">
        <Navibar />
        <ToastContainer />
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<AllPost />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/my-blogs/:userId" element={<MyBlogs />} />
            <Route path="/blog/edit/:id" element={<EditBlog />} />
            <Route path="/blog/add" element={<AddBlog />} />
            <Route path="/blog/view/:id" element={<ViewBlog />} />
            <Route path="/user" element={<DashBoard />} />
            <Route path="*" element={<Navigate to="/404" />} />
            <Route path="/404" element={<NotFound />} />
          </Routes>
        </Suspense>
      </div>
    );
}

export default App;
