import React from "react";

const Profile = () => {
  return (
    <div className="min-h-screen block lg:grid lg:grid-cols-[300px,minmax(0,1fr)]">
      <div
        className="relative hidden p-5 border-r border-slate-800 sm:block"
        aria-label="sidebar"
      >
        <a
          href="/"
          className="flex items-center justify-start px-4 mt-5 mb-10 text-sm font-bold gap-x-3"
        >
          <span>First movie</span>
        </a>
        <ul className="flex flex-col gap-y-2">
          <li>
            <a
              href="/"
              className="flex items-center px-4 py-3 rounded-lg gap-x-3 hover:bg-gray-800 bg-gray-800"
            >
              <span className="w-5">
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="user"
                  class="svg-inline--fa fa-user "
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
            </a>
          </li>
          <li>
            <a
              href="/profile/bookmarks"
              className="flex items-center px-4 py-3 rounded-lg gap-x-3 hover:bg-gray-800 bg-gray-800"
            >
              <span className="w-5">
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="far"
                  data-icon="heart"
                  class="svg-inline--fa fa-heart "
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
            </a>
          </li>

          <li>
            <button className="flex items-center px-4 py-3 bg-gray-800 rounded-lg gap-x-3 font-secondary">
              <span className="w-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  ></path>
                </svg>
              </span>
              <span>Logout</span>
            </button>
          </li>
        </ul>
      </div>
      <div className="relative p-5 lg:p-10">
        <div className="flex flex-col items-start gap-5">
          <h1 className="inline-flex items-center text-3xl font-bold text-white gap-x-3">
            <span>Account</span>
          </h1>
        </div>
        <div>
          <div className="mt-10">
            <div className="accout-heading flex py-5 border-b border-slate-800 mb-10">
              <img
                src="https://avatars.githubusercontent.com/u/94631848?v=4"
                alt=""
                className="w-24 h-24 object-cover rounded-full"
              />
              <h1 className="ml-10 inline-flex items-center text-3xl font-bold text-white gap-x-3">
                <span>duykhadev</span>
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
