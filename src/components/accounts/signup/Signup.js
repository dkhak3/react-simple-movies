import React, { Fragment, useState } from "react";
import Input from "../../form/Input";
import { Formik, Form, useField } from "formik";
import * as yup from "yup";

const Signup = () => {
  return (
    <Formik
      initialValues={{
        username: "",
        email: "",
        password: "",
        favourite_movie: [],
        sign_in: false,
      }}
      validationSchema={yup.object({
        username: yup
          .string()
          .min(4, "Your password must be at least 4 character or greater")
          .required("Please enter your username"),
        email: yup
          .string()
          .email("Please enter valid email address")
          .required("Please enter your email"),
        password: yup
          .string()
          .min(8, "Your password must be at least 8 character or greater")
          .required("Please enter your password"),
      })}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        console.log(JSON.stringify(values, null, 2));
        localStorage.setItem("account", JSON.stringify(values, null, 2));
        setSubmitting(false);
        resetForm();
      }}
    >
      {(formik) => {
        return (
          <div className="page-container">
            <div className="max-w-2xl py-10 mx-auto rounded-lg border-slate-800">
              <form onSubmit={formik.handleSubmit} autoComplete="one">
                <Input
                  type="text"
                  name="username"
                  id="username"
                  lable="Username"
                  placeholder="Enter your username"
                ></Input>

                <Input
                  type="email"
                  name="email"
                  id="email"
                  lable="Email"
                  placeholder="Enter your email"
                ></Input>

                <Input
                  name="password"
                  id="password"
                  lable="Password"
                  placeholder="Enter your password"
                ></Input>

                <button
                  type="submit"
                  disabled={formik.isSubmitting}
                  className={`inline-flex items-center justify-center px-8 py-4 font-sans font-semibold tracking-wide text-white bg-third rounded-lg h-[55px] disabled:cursor-not-allowed w-full text-lg bg-gradient-primary button-effect ${
                    formik.isSubmitting ? "opacity-50" : ""
                  }`}
                >
                  {formik.isSubmitting ? (
                    <div className="w-5 h-5 rounded-full border-t-2 border-t-transparent border-2 border-white animate-spin mx-auto"></div>
                  ) : (
                    "Sign up"
                  )}
                </button>
              </form>
            </div>
          </div>
        );
      }}
    </Formik>
  );
};

export default Signup;
