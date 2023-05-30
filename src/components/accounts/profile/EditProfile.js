import classNames from "classnames/bind";
import style from "./Account.module.scss";
import React, { Fragment, useState } from "react";
import Input from "../../form/Input";
import { Formik, Form, useField } from "formik";
import * as yup from "yup";
import Input2 from "../../form/Input2";
import Dropdown from "../../form/Dropdown";

const cx = classNames.bind(style);

const dropdownData = [
  {
    id: 1,
    value: "Male",
    text: "Male",
  },
  {
    id: 2,
    value: "FaMale",
    text: "FaMale",
  },
];

const EditProfile = () => {
  const account = JSON.parse(localStorage.getItem("account"));

  // Infomation Account
  const [firstName, setFirtName] = useState(account.first_name);
  const EditFirstName = (e) => {
    const value = e.target.file;
    console.log(value);
    setFirtName(value);
  };
  return (
    <Formik
      initialValues={{
        email: "",
      }}
      validationSchema={yup.object({
        email: yup.string().email("Please enter valid email address"),
        // .required("Please enter your email"),
      })}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        console.log(JSON.stringify(values, null, 2));
        // localStorage.setItem("account", JSON.stringify(values, null, 2));
        // setSubmitting(false);
        // resetForm();
        const updateProfile = {
          ...account,
          first_name: values.firstName,
        };
        console.log(updateProfile);
        localStorage.setItem("account", JSON.stringify(updateProfile));
        localStorage.setItem("login", JSON.stringify(updateProfile));
        // showToastMessage(1);
        //   setSubmitting(false);
        //   resetForm();
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }}
    >
      {(formik) => {
        return (
          <form onSubmit={formik.handleSubmit} autoComplete="one">
            <div className="lg:flex xl:flex justify-between mb-5 gap-x-5">
              <Input2
                type="text"
                name="firstName"
                id="firstName"
                lable="First Name"
                placeholder="Enter your First Name"
                // value={firstName}
                onChange={EditFirstName}
              ></Input2>
              <Input2
                type="text"
                name="lastName"
                id="lastName"
                lable="Last Name"
                placeholder="Enter your Last Name"
                value={account.last_name}
              ></Input2>
            </div>
            <div className="lg:flex xl:flex justify-between mb-5 gap-x-5">
              <Input2
                type="date"
                name="dateOfBirth"
                id="dateOfBirth"
                lable="Last Name"
                placeholder="Date of Birth"
              ></Input2>

              <Dropdown
                name="gender"
                data={dropdownData}
                labelText="You are"
                dropdownLabel="Select your Gender"
                setValue={formik.setFieldValue}
              ></Dropdown>
            </div>

            <div className="lg:flex xl:flex justify-between mb-5 gap-x-5">
              <Input2
                type="address"
                name="address"
                id="address"
                lable="Address"
                placeholder="Enter your Address"
              ></Input2>

              <Input2
                type="text"
                name="city"
                id="city"
                lable="City"
                placeholder="Enter your City"
              ></Input2>
            </div>

            <div className="lg:flex xl:flex justify-between mb-5 gap-x-5">
              <Input2
                type="email"
                name="email"
                id="email"
                lable="Email"
                placeholder="Enter your Email"
              ></Input2>

              <Input2
                type="number"
                name="number"
                id="number"
                lable="Contact"
                placeholder="Enter your Contact"
              ></Input2>
            </div>

            <div className="flex items-center justify-end mt-5 gap-x-5">
              <button
                type="submit"
                onClick={formik.handleSubmit}
                // disabled={formik.isSubmitting}
                className={`inline-flex items-center justify-center px-8 py-4 font-sans font-semibold tracking-wide text-white bg-third rounded-lg h-[55px] disabled:cursor-not-allowed text-lg bg-gradient-primary button-effect`}
              >
                Save Changes
              </button>
            </div>
          </form>
        );
      }}
    </Formik>
  );
};

export default EditProfile;
