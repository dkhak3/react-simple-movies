import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";
import logo from "./404.png";

const PageNotFound = () => {
  return (
    <Fragment>
      <div className="flex items-center justify-center w-full h-[90vh] relative">
        <NavLink
          to="/"
          className="absolute z-10 flex items-center justify-center px-4 py-3 text-sm text-white rounded-lg cursor-pointer bg-slate-600 top-5 left-5 gap-x-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
          Go back
        </NavLink>
        <img src={logo} className="page-not-found" alt="404" />
      </div>
    </Fragment>
  );
};

export default PageNotFound;
