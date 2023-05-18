import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  const login = JSON.parse(localStorage.getItem("login"));

  const value = {
    ...login,
  };
  return (
    // <header className="header flex items-center justify-center gap-x-5 text-white py-10 mb-5">
    //   <NavLink
    //     to="/"
    //     className={({ isActive }) => (isActive ? "text-primary" : "")}
    //   >
    //     Home
    //   </NavLink>
    //   <NavLink
    //     to="movies"
    //     className={({ isActive }) => (isActive ? "text-primary" : "")}
    //   >
    //     Movies
    //   </NavLink>
    // </header>

    <div className="page-container">
      <div className="py-5 border-b border-slate-800 mb-10">
        <div className="flex items-center justify-between">
          <NavLink
            to="/"
            className="inline-flex items-center font-bold gap-x-3"
          >
            <div className="relative"></div>
            <span>Fast Movie</span>
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
            {/* {login !== "null" && (
              <>
                <NavLink
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
                </NavLink>
              </>
            )} */}

            <NavLink
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
            </NavLink>

            {/* {login.username && (
              <NavLink to="/profile" className={``}>
                <p>
                  <span>Hello, </span>
                  <strong className="ml-1 font-bold text-transparent font-secondary bg-clip-text bg-gradient-primary">
                    {login.username}
                  </strong>
                </p>
              </NavLink>
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
