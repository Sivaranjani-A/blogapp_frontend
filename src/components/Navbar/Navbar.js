import { Avatar, Dropdown, Navbar, Button } from "flowbite-react";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Navbar.css"
import { useSelector, useDispatch } from "react-redux";
import { LogOut } from "../../redux/actions/UserAction";

const Navibar = () => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.user);
  const navigate = useNavigate();
  return (
    <Navbar className="navBar" fluid={true} rounded={true}>
      <Navbar.Brand href="/">
        <img
          src="https://i.pinimg.com/564x/24/4c/b3/244cb39ec1794bf7afc76acb0c4429c7.jpg"
          className="mr-3 h-6 sm:h-9"
          alt="Blog Logo"
        />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Blog App
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        {user ? (
          <Dropdown
            arrowIcon={false}
            inline={true}
            label={
              <Avatar
                alt="User settings"
                img={user?.profilePicture}
                rounded={true}
              />
            }
          >
            <Dropdown.Item>
              <Link
                className="userNav"
                style={{ textDecoration: "none" }}
                to="/user"
              >
                <span className="block text-sm">{user.name}</span>
              </Link>
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => {
                dispatch(LogOut());
                navigate("/");
              }}
            >
              Sign out
            </Dropdown.Item>
          </Dropdown>
        ) : (
          <Button onClick={() => navigate("/auth")}>Get started</Button>
        )}
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Link to="/">Home</Link>

        <Link to={`${user ? `/my-blogs/${user._id}` : "/auth"}`}>My Blogs</Link>

        <Link to="/blog/add">Add Blog</Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navibar;
