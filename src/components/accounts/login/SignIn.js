import React, { Fragment, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Input from "../../form/Input";
import { Formik, Form, useField } from "formik";
import * as yup from "yup";
import { NavLink, Route, Routes } from "react-router-dom";
import Banner from "../../banner/Banner";
import HomePage from "../../../pages/HomePage";
import { ScrollToTop } from "../../scrollToTop/ScrollToTop";
import Footer from "../../layout/Footer";
import { routes } from "../../../config";

const SignIn = () => {
  const [value, setValue] = useState("");
  // Info SignIn
  const account = JSON.parse(localStorage.getItem("account"));

  const login = {
    ...account,
  };

  const showToastMessage = (type) => {
    if (type === 1) {
      toast.success("Logged in successfully !", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else if (type === 2) {
      toast.error("Login failed !", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={yup.object({
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
        // setTimeout(() => {
        //   console.log(JSON.stringify(values, null, 2));
        //   setSubmitting(false);
        //   resetForm();
        // }, 5000);
        setValue(values);

        if (
          values.email === account.email &&
          values.password === account.password
        ) {
          localStorage.setItem("login", JSON.stringify(login));
          showToastMessage(1);

          setSubmitting(false);
          resetForm();
          setTimeout(() => {
            window.location = routes.home;
          }, 1000);
        } else {
          showToastMessage(2);
        }
      }}
    >
      {(formik) => {
        return (
          <Fragment>
            <div className="page-container">
              <div className="max-w-2xl py-10 mx-auto rounded-lg border-slate-800">
                <form onSubmit={formik.handleSubmit} autoComplete="one">
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
                    onClick={formik.handleSubmit}
                    // disabled={formik.isSubmitting}
                    className={`inline-flex items-center justify-center px-8 py-4 font-sans font-semibold tracking-wide text-white bg-third rounded-lg h-[55px] disabled:cursor-not-allowed w-full text-lg bg-gradient-primary button-effect`}
                  >
                    Login
                  </button>
                  <ToastContainer />
                </form>
              </div>
            </div>
          </Fragment>
        );
      }}
    </Formik>
  );
};

export default SignIn;
