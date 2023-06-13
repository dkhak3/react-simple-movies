import classNames from "classnames/bind";
import style from "./Account.module.scss";
import { useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { apiKey, routes } from "../../../config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Input from "../../form/Input";
import EditPassword from "./EditPassword";
import EditProfile from "./EditProfile";

import { InputText } from "primereact/inputtext";
import avatar from "./avatar.png";
import AvatarEditor from "react-avatar-editor";

import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import EditEmail from "./EditEmail";

const cx = classNames.bind(style);

function Profile() {
  // Current Profile
  const account = JSON.parse(localStorage.getItem("account"));

  // Infomation Account
  // const [avatar, setAvatar] = useState();
  const [firstName, setFirtName] = useState(account.first_name);
  const [lastName, setLastName] = useState(account.last_name);
  const [dateOfBirth, setDateOfBirth] = useState(account.date_of_birth);
  const [gender, setGender] = useState(account.gender);
  const [address, setAddress] = useState(account.address);
  const [city, setCity] = useState(account.city);
  const [email, setEmail] = useState(account.email);
  const [contact, setContact] = useState(account.contact);

  //State
  // State handle
  const [editProfile, setEditProfile] = useState(true);
  const [changePassword, setChangePassword] = useState(false);
  const [changeEmail, setChangeEmail] = useState(false);

  const updateProfile = {
    ...account,
    first_name: firstName,
    last_name: lastName,
    contact: contact,
    date_of_birth: dateOfBirth,
    gender: gender,
    address: address,
    city: city,
    email: email,
  };
  const logout = {
    ...account,
    sign_in: false,
  };
  const showToastMessage = (type) => {
    if (type === 1) {
      toast.success("Changes success", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else if (type === 2) {
      toast.success("Logout success", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else if (type === 3) {
      toast.error("Login failed", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };
  const handleSaveChange = () => {
    localStorage.setItem(
      "account",
      JSON.stringify(updateProfile, (account.sign_in = true))
    );
    localStorage.setItem(
      "login",
      JSON.stringify(updateProfile, (account.sign_in = true))
    );
    showToastMessage(1);
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };
  const handleLogout = () => {
    localStorage.setItem("account", JSON.stringify(logout));
    localStorage.removeItem("login");
    showToastMessage(2);
    setTimeout(() => {
      window.location.reload();
      window.location = routes.home;
    }, 1000);
  };
  // HANDLE EDIT INFOMATION ACCOUNT
  // const EditAvatar = (e) => {
  //   const value = e.target.file;
  //   setAvatar(value);
  // };
  const EditFirstName = (e) => {
    const value = e.target.value;
    setFirtName(value);
  };
  const EditLastName = (e) => {
    const value = e.target.value;
    setLastName(value);
  };
  const EditDayOfBirth = (e) => {
    const value = e.target.value;
    setDateOfBirth(value);
  };
  const EditGender = (e) => {
    const value = e.target.value;
    setGender(value);
  };
  const EditCity = (e) => {
    const value = e.target.value;
    setCity(value);
  };
  const EditAddress = (e) => {
    const value = e.target.value;
    setAddress(value);
  };
  const EditContact = (e) => {
    const value = e.target.value;
    setContact(value);
  };

  // /////////////////////////

  const openEditProfile = () => {
    setEditProfile(true);
    setChangePassword(false);
    setChangeEmail(false);
  };

  const openChangePassword = () => {
    setEditProfile(false);
    setChangePassword(true);
    setChangeEmail(false);
  };
  const openChangeEmail = () => {
    setEditProfile(false);
    setChangePassword(false);
    setChangeEmail(true);
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
        <div className={cx("")}>
          <div className={cx("heading")}>
            <div className={cx("avartar")}>
              <img
                id="img"
                className={cx("avatar-img")}
                alt="avatar"
                src={
                  avatar
                    ? avatar
                    : "	https://png.pngtree.com/png-clipart/20191121/original/pngtree-user-icon-png-image_5097430.jpg"
                }
              />
            </div>
            <div className={cx("full-name")}>
              <h1 className="text-xl font-medium">
                {account.first_name} {account.last_name}
              </h1>
            </div>
          </div>

          <div className={cx("edit-profile")}>
            <div className={cx("nav-edit")}>
              <ul className={cx("nav-list")}>
                <li
                  className={cx(
                    "nav-item-edit-profile",
                    editProfile && "active"
                  )}
                  onClick={openEditProfile}
                >
                  Edit Your Profile
                </li>
                <li
                  className={cx(
                    "nav-item-change-pass-word",
                    changePassword && "active"
                  )}
                  onClick={openChangePassword}
                >
                  Change Your Password
                </li>
                <li
                  className={cx(
                    "nav-item-change-pass-word",
                    changeEmail && "active"
                  )}
                  onClick={openChangeEmail}
                >
                  Change Your Email
                </li>
              </ul>
            </div>

            {editProfile && (
              <div>
                <div className="lg:flex xl:flex justify-between mb-5 gap-x-5">
                  <div className="w-full mt-5 lg:mt-0 xl:mt-0">
                    <label
                      htmlFor="firstName"
                      className="text-base font-semibold cursor-pointer inline-block"
                    >
                      First Name
                    </label>
                    <input
                      id="firstName"
                      name="firstName"
                      className="w-full p-4 text-base text-white transition-all border rounded-lg outline-none bg-slate-900 focus:border-blue-500 border-slate-700 mt-3"
                      type="text"
                      value={firstName}
                      onChange={EditFirstName}
                    />
                  </div>
                  <div className="w-full mt-5 lg:mt-0 xl:mt-0">
                    <label
                      htmlFor="lastName"
                      className="text-base font-semibold cursor-pointer inline-block"
                    >
                      Last Name
                    </label>
                    <input
                      id="lastName"
                      name="lastName"
                      className="w-full p-4 text-base text-white transition-all border rounded-lg outline-none bg-slate-900 focus:border-blue-500 border-slate-700 mt-3"
                      type="text"
                      value={lastName}
                      onChange={EditLastName}
                    />
                  </div>
                </div>

                <div className="lg:flex xl:flex justify-between mb-5 gap-x-5">
                  <div className="w-full mt-5 lg:mt-0 xl:mt-0">
                    <label
                      htmlFor="dateOfBirth"
                      className="text-base font-semibold cursor-pointer inline-block"
                    >
                      Date of Birth
                    </label>
                    <input
                      id="dateOfBirth"
                      name="dateOfBirth"
                      className="w-full p-4 text-base text-white transition-all border rounded-lg outline-none bg-slate-900 focus:border-blue-500 border-slate-700 mt-3"
                      type="date"
                      value={dateOfBirth}
                      onChange={EditDayOfBirth}
                    />
                  </div>
                  <div className="w-full mt-5 lg:mt-0 xl:mt-0">
                    <label
                      htmlFor="Gender"
                      className="text-base font-semibold cursor-pointer inline-block"
                    >
                      Gender
                    </label>
                    <select
                      id="gender"
                      name="gender"
                      className="w-full p-4 text-base text-white transition-all border rounded-lg outline-none bg-slate-900 focus:border-blue-500 border-slate-700 mt-3"
                      value={gender}
                      onChange={EditGender}
                    >
                      <option>-- Gender --</option>
                      <option>Male</option>
                      <option>FeMale</option>
                    </select>
                  </div>
                </div>

                <div className="lg:flex xl:flex justify-between mb-5 gap-x-5">
                  <div className="w-full mt-5 lg:mt-0 xl:mt-0">
                    <label
                      htmlFor="address"
                      className="text-base font-semibold cursor-pointer inline-block"
                    >
                      Address
                    </label>
                    <input
                      id="address"
                      name="address"
                      className="w-full p-4 text-base text-white transition-all border rounded-lg outline-none bg-slate-900 focus:border-blue-500 border-slate-700 mt-3"
                      type="text"
                      value={address}
                      onChange={EditAddress}
                    />
                  </div>

                  <div className="w-full mt-5 lg:mt-0 xl:mt-0">
                    <label
                      htmlFor="city"
                      className="text-base font-semibold cursor-pointer inline-block"
                    >
                      City
                    </label>
                    <input
                      id="city"
                      name="city"
                      className="w-full p-4 text-base text-white transition-all border rounded-lg outline-none bg-slate-900 focus:border-blue-500 border-slate-700 mt-3"
                      type="text"
                      value={city}
                      onChange={EditCity}
                    />
                  </div>
                </div>

                <div className="lg:flex xl:flex justify-between mb-5 gap-x-5">
                  <div className="w-full mt-5 lg:mt-0 xl:mt-0">
                    <label
                      htmlFor="email"
                      className="text-base font-semibold cursor-pointer inline-block"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      className="w-full p-4 text-base text-white transition-all border rounded-lg outline-none bg-slate-900 focus:border-blue-500 border-slate-700 mt-3 cursor-no-drop"
                      disabled
                      type="email"
                      value={email}
                    />
                  </div>

                  <div className="w-full mt-5 lg:mt-0 xl:mt-0">
                    <label
                      htmlFor="number"
                      className="text-base font-semibold cursor-pointer inline-block"
                    >
                      Contact
                    </label>
                    <input
                      id="number"
                      name="number"
                      className="w-full p-4 text-base text-white transition-all border rounded-lg outline-none bg-slate-900 focus:border-blue-500 border-slate-700 mt-3"
                      type="number"
                      value={contact}
                      onChange={EditContact}
                    />
                  </div>
                </div>
                {/* <EditProfile></EditProfile> */}
                <ToastContainer />
              </div>
            )}

            {changePassword && (
              <div className={cx("edit-password")}>
                <div className={cx("change-password")}>
                  <EditPassword></EditPassword>
                </div>
              </div>
            )}

            {changeEmail && (
              <div className={cx("edit-password")}>
                <div className={cx("change-password")}>
                  <EditEmail></EditEmail>
                </div>
              </div>
            )}
          </div>

          {editProfile && (
            <div className="flex items-center justify-end mt-5 gap-x-5">
              <button className="py-3 px-6 border rounded-lg">Cancel</button>
              <button
                className="py-3 px-6 bg-primary rounded-lg"
                onClick={handleSaveChange}
              >
                Save Changes
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
