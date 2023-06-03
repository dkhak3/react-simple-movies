import axios from "axios";
import classNames from "classnames/bind";
import { useContext, useEffect, useRef, useState } from "react";
import style from "./Favourite.module.scss";
import { NavLink } from "react-router-dom";
import { routes } from "../../../config";
import MovieCard, { MovieCardSkeleton } from "../../movie/MovieCard";
import Button from "../../button/Button";
import TooltipAdvanced from "../../tooltip/TooltipAdvanced";
import { v4 } from "uuid";
import { toast, ToastContainer } from "react-toastify";
import { ScrollToTop } from "../../scrollToTop/ScrollToTop";

const cx = classNames.bind(style);

const itemsPerPage = 20;

function Favourite() {
  const account = JSON.parse(localStorage.getItem("account"));
  const favourite = account.favourite_movie;

  const isLoading = !favourite;

  const showToastMessage = (type) => {
    if (type === 1) {
      toast.success("Delete to Favourite success", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else if (type === 2) {
      toast.error("Delete to Favourite failed", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
    if (type === 3) {
      toast.success("Logout success", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const [currentFavourite, setCurrentFavourite] = useState(favourite);

  const handleDelete = async (id) => {
    const remove = await currentFavourite.filter((item) => item.id !== id);
    setCurrentFavourite(remove);
    showToastMessage(1);
    const update = {
      ...account,
      favourite_movie: remove,
    };

    return localStorage.setItem("account", JSON.stringify(update));
  };

  const handleLogout = () => {
    localStorage.removeItem("login");
    showToastMessage(3);
    setTimeout(() => {
      window.location = routes.home;
    }, 1000);
  };

  return (
    <div className="min-h-screen block lg:grid lg:grid-cols-[300px,minmax(0,1fr),300px]">
      <div
        className="relative p-5 border-r border-slate-800 block nav-left"
        aria-label="sidebar"
      >
        <ul className="flex flex-col gap-y-2">
          <li>
            <NavLink
              to="/profile"
              className={({ isActive }) => (isActive ? "text-primary" : "")}
            >
              <div className="flex items-center px-4 py-3 rounded-lg gap-x-3 hover:bg-gray-800 bg-gray-800">
                <span className="w-5">
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fas"
                    data-icon="user"
                    className="svg-inline--fa fa-user "
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                  >
                    <path
                      fill="currentColor"
                      d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0S96 57.3 96 128s57.3 128 128 128zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"
                    ></path>
                  </svg>
                </span>
                <span>Account</span>
              </div>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/favourite"
              className={({ isActive }) => (isActive ? "text-primary" : "")}
            >
              <div className="flex items-center px-4 py-3 rounded-lg gap-x-3 hover:bg-gray-800 bg-gray-800">
                <span className="w-5">
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="far"
                    data-icon="heart"
                    className="svg-inline--fa fa-heart "
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path
                      fill="currentColor"
                      d="M244 84L255.1 96L267.1 84.02C300.6 51.37 347 36.51 392.6 44.1C461.5 55.58 512 115.2 512 185.1V190.9C512 232.4 494.8 272.1 464.4 300.4L283.7 469.1C276.2 476.1 266.3 480 256 480C245.7 480 235.8 476.1 228.3 469.1L47.59 300.4C17.23 272.1 0 232.4 0 190.9V185.1C0 115.2 50.52 55.58 119.4 44.1C164.1 36.51 211.4 51.37 244 84C243.1 84 244 84.01 244 84L244 84zM255.1 163.9L210.1 117.1C188.4 96.28 157.6 86.4 127.3 91.44C81.55 99.07 48 138.7 48 185.1V190.9C48 219.1 59.71 246.1 80.34 265.3L256 429.3L431.7 265.3C452.3 246.1 464 219.1 464 190.9V185.1C464 138.7 430.4 99.07 384.7 91.44C354.4 86.4 323.6 96.28 301.9 117.1L255.1 163.9z"
                    ></path>
                  </svg>
                </span>
                <span>Favourite</span>
              </div>
            </NavLink>
          </li>

          <li>
            <button
              onClick={handleLogout}
              className="flex items-center px-4 py-3 bg-gray-800 rounded-lg gap-x-3 font-secondary"
            >
              <span className="w-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  ></path>
                </svg>
              </span>
              <span>Logout</span>
            </button>
          </li>
        </ul>
      </div>

      <div className="relative p-5 content">
        <div className={cx("wrapper")}>
          <div className={cx("title")}>
            <h1>Your Favourite</h1>
          </div>

          {/* {isLoading && (
            <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 xl:gap-10 md:gap-5">
              {new Array(itemsPerPage).fill(0).map(() => (
                <MovieCardSkeleton key={v4()}></MovieCardSkeleton>
              ))}
            </div>
          )} */}

          <ul className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 xl:gap-10 md:gap-5">
            {!currentFavourite
              ? "ADD SOME YOUR FAVOURITE MOVIE LIST"
              : currentFavourite.map((item, index) => (
                  <div className="relative" key={index}>
                    <div
                      className="absolute right-5 top-5 rounded-lg bg-[rgba(0,0,0,0.5)] text-white mx-auto z-10 cursor-pointer"
                      onClick={() => handleDelete(item.id)}
                    >
                      <TooltipAdvanced options="0">
                        Delete Favorite
                      </TooltipAdvanced>
                    </div>

                    <MovieCard item={item} options="0" />
                  </div>
                ))}
          </ul>
        </div>
      </div>

      <ToastContainer />
      <ScrollToTop></ScrollToTop>
    </div>
  );
}

export default Favourite;
