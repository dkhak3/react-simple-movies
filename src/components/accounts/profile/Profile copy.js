import React from "react";
import Home from "../../../pages/Home";
import EditProfile from "./EditProfile";

const Profile = () => {
  return (
    <div className="min-h-screen block lg:grid lg:grid-cols-[300px,minmax(0,1fr),300px]">
      <div
        className="relative p-5 border-r border-slate-800 block nav-left"
        aria-label="sidebar"
      >
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
            </a>
          </li>

          <li>
            <button className="flex items-center px-4 py-3 bg-gray-800 rounded-lg gap-x-3 font-secondary">
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
        <div className="flex flex-col items-start gap-5">
          <h1 className="inline-flex items-center text-3xl font-bold text-white gap-x-3">
            <span>Account</span>
          </h1>
        </div>
        <div>
          <div className="mt-5 accout-heading flex py-5 border-b border-slate-800 mb-5">
            <img
              src="https://avatars.githubusercontent.com/u/94631848?v=4"
              alt=""
              className="w-24 h-24 object-cover rounded-full"
            />
            <h1 className="ml-10 inline-flex items-center text-3xl font-bold text-white gap-x-3">
              <span>duykhadev</span>
            </h1>
          </div>

          <ul className="flex gap-x-5 edit-list">
            <li className="text-xl cursor-pointer edit-item active">
              Edit Your Profile
            </li>
            <li className="text-xl cursor-pointer edit-item">
              Change Your Password
            </li>
          </ul>

          {/* Form edit */}
          {/* <div className="mt-1 edit-name flex gap-x-10">
            <div className="mt-5"></div>
            <div className="flex flex-col items-start flex-1 mb-5 gap-y-3 mt-5">
              <label
                htmlFor="firstname"
                className="text-base font-semibold cursor-pointer inline-block"
              >
                First name
              </label>
              <div className="relative w-full">
                <input
                  type="text"
                  id="firstname"
                  name="firstname"
                  className="w-full p-4 text-base text-white transition-all border rounded-lg outline-none bg-slate-900 focus:border-blue-500 border-slate-700"
                />
              </div>
            </div>
            <div className="flex flex-col items-start flex-1 mb-5 gap-y-3 mt-5">
              <label
                htmlFor="lastname"
                className="text-base font-semibold cursor-pointer inline-block"
              >
                Last name
              </label>
              <div className="relative w-full">
                <input
                  type="text"
                  id="lastname"
                  name="lastname"
                  className="w-full p-4 text-base text-white transition-all border rounded-lg outline-none bg-slate-900 focus:border-blue-500 border-slate-700"
                />
              </div>
            </div>
          </div>

          <div className="mt-1 edit-age-and-gender flex gap-x-10">
            <div className="mt-5"></div>
            <div className="flex flex-col items-start flex-1 mb-5 gap-y-3">
              <label
                htmlFor="date"
                className="text-base font-semibold cursor-pointer inline-block"
              >
                Date of Birth
              </label>
              <div className="relative w-full">
                <input
                  type="date"
                  id="date"
                  name="date"
                  className="w-full p-4 text-base text-white transition-all border rounded-lg outline-none bg-slate-900 focus:border-blue-500 border-slate-700"
                />
              </div>
            </div>
            <div className="flex flex-col items-start flex-1 mb-5 gap-y-3">
              <label
                htmlFor="gender"
                className="text-base font-semibold cursor-pointer inline-block"
              >
                Gender
              </label>
              <div className="relative w-full">
                <select
                  id="gender"
                  class="w-full p-4 text-base text-white transition-all border rounded-lg outline-none bg-slate-900 focus:border-blue-500 border-slate-700"
                >
                  <option selected>Choose your gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
            </div>
          </div>

          <div className="mt-1 edit-info flex gap-x-10">
            <div className="mt-5"></div>
            <div className="flex flex-col items-start flex-1 mb-5 gap-y-3">
              <label
                htmlFor="address"
                className="text-base font-semibold cursor-pointer inline-block"
              >
                Address
              </label>
              <div className="relative w-full">
                <input
                  type="text"
                  id="address"
                  name="address"
                  className="w-full p-4 text-base text-white transition-all border rounded-lg outline-none bg-slate-900 focus:border-blue-500 border-slate-700"
                />
              </div>
            </div>
            <div className="flex flex-col items-start flex-1 mb-5 gap-y-3">
              <label
                htmlFor="city"
                className="text-base font-semibold cursor-pointer inline-block"
              >
                City
              </label>
              <div className="relative w-full">
                <input
                  type="text"
                  id="city"
                  name="city"
                  className="w-full p-4 text-base text-white transition-all border rounded-lg outline-none bg-slate-900 focus:border-blue-500 border-slate-700"
                />
              </div>
            </div>
          </div>

          <div className="mt-1 edit-contact flex gap-x-10">
            <div className="mt-5"></div>
            <div className="flex flex-col items-start flex-1 mb-5 gap-y-3">
              <label
                htmlFor="email"
                className="text-base font-semibold cursor-pointer inline-block"
              >
                Email
              </label>
              <div className="relative w-full">
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full p-4 text-base text-white transition-all border rounded-lg outline-none bg-slate-900 focus:border-blue-500 border-slate-700"
                />
              </div>
            </div>
            <div className="flex flex-col items-start flex-1 mb-5 gap-y-3">
              <label
                htmlFor="phone"
                className="text-base font-semibold cursor-pointer inline-block"
              >
                Phone
              </label>
              <div className="relative w-full">
                <input
                  type="number"
                  id="phone"
                  name="phone"
                  className="w-full p-4 text-base text-white transition-all border rounded-lg outline-none bg-slate-900 focus:border-blue-500 border-slate-700"
                />
              </div>
            </div>
          </div> */}
          <EditProfile></EditProfile>

          {/* <div className="mt-1 flex gap-x-5 ml-10">
            <button className="px-10 py-3 border rounded-lg">Cancel</button>
            <button className="px-10 py-3 rounded-lg bg-primary">Save</button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Profile;
