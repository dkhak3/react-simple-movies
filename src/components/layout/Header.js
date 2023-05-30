import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  const login = JSON.parse(localStorage.getItem("login"))
    ? JSON.parse(localStorage.getItem("login"))
    : "";

  return (
    <div className="page-container">
      <div className="py-5 border-b border-slate-800 mb-10">
        <div className="flex items-center justify-between ">
          <NavLink
            to="/"
            className="items-center font-bold gap-x-3 hidden xl:block lg:block md:block"
          >
            <div className="relative"></div>
            <span className="xl:text-2xl lg:text-2xl">Fast Movie</span>
          </NavLink>
          <div className="flex items-center gap-x-3">
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "text-primary" : "")}
            >
              Home
            </NavLink>

            <NavLink
              to="movies"
              className={({ isActive }) => (isActive ? "text-primary" : "")}
            >
              Movies
            </NavLink>
          </div>
          <div className="flex items-center gap-x-3">
            {login === "" && (
              <>
                <NavLink
                  to="/signup"
                  className={({ isActive }) => (isActive ? "text-primary" : "")}
                >
                  <p className="flex items-center px-6 py-3 font-medium  rounded-lg text-xs xl:text-sm lg:text-sm">
                    Sign up
                  </p>
                </NavLink>
                <NavLink
                  to="/login"
                  className={({ isActive }) => (isActive ? "text-white" : "")}
                >
                  <p className="flex items-center px-6 py-3 font-medium rounded-lg bg-gradient-secondary button-effect text-xs xl:text-sm lg:text-sm">
                    Login
                  </p>
                </NavLink>
              </>
            )}

            {/* <NavLink
              to="/signup"
              className={({ isActive }) => (isActive ? "text-primary" : "")}
            >
              <p className="flex items-center px-6 py-3 text-sm font-medium  rounded-lg">
                Sign up
              </p>
            </NavLink>
            <NavLink
              to="/login"
              className={({ isActive }) => (isActive ? "text-white" : "")}
            >
              <p className="flex items-center px-6 py-3 text-sm font-medium rounded-lg bg-gradient-secondary button-effect">
                Login
              </p>
            </NavLink> */}

            {login.username && (
              <NavLink to="/profile" className={``}>
                <p>
                  <span>Hello, </span>
                  <strong className="ml-1 font-bold text-transparent font-secondary bg-clip-text bg-gradient-primary">
                    {login.username}
                  </strong>
                </p>
              </NavLink>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
