import React, { Fragment, useState } from "react";
import Input from "../../form/Input";
import { Formik, Form, useField } from "formik";
import * as yup from "yup";

const SignIn = () => {
  const [value, setValue] = useState("");
  // Info SignIn
  const account = JSON.parse(localStorage.getItem("account"));

  const login = {
    ...account,
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
          alert("Logged in successfully");
          setSubmitting(false);
          resetForm();
        } else {
          alert("Login failed");
        }
      }}
    >
      {(formik) => {
        return (
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
                  disabled={formik.isSubmitting}
                  className={`inline-flex items-center justify-center px-8 py-4 font-sans font-semibold tracking-wide text-white bg-third rounded-lg h-[55px] disabled:cursor-not-allowed w-full text-lg bg-gradient-primary button-effect ${
                    formik.isSubmitting ? "opacity-50" : ""
                  }`}
                >
                  {formik.isSubmitting ? (
                    <div className="w-5 h-5 rounded-full border-t-2 border-t-transparent border-2 border-white animate-spin mx-auto"></div>
                  ) : (
                    "Login"
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

export default SignIn;
