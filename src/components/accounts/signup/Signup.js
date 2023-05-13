import React, { Fragment, useState } from "react";
import Input from "../../form/Input";
import { Formik, Form, useField } from "formik";
import * as yup from "yup";

const Signup = () => {
  // const [showPassword, setShowPassword] = useState(true);
  // console.log(showPassword);

  return (
    <Formik
      initialValues={{
        username: "",
        email: "",
        password: "",
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
        // setTimeout(() => {}, 5000);
        console.log(JSON.stringify(values, null, 2));
        const setjson = JSON.stringify(values, null, 2);
        localStorage.setItem("account", setjson);
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
                  type="password"
                  name="password"
                  id="password"
                  lable="Password"
                  placeholder="Enter your password"
                ></Input>
                {/* <div className="flex flex-col items-start flex-1 mb-10 gap-y-3">
            <label
              htmlFor=""
              className="text-base font-semibold cursor-pointer inline-block"
            >
              Password
            </label>
            <div className="relative w-full">
              <input
                type={showPassword === true ? "text" : "password"}
                autoComplete="off"
                name=""
                id=""
                className="w-full p-4 text-base text-white transition-all border rounded-lg outline-none bg-slate-900 focus:border-blue-500 border-slate-700"
                placeholder="Enter your password"
                required
              />

              <svg
                onClick={() => setShowPassword(!showPassword)}
                xmlns="http://www.w3.org/2000/svg"
                className="absolute w-6 h-6 text-gray-400 transform cursor-pointer right-4 top-2/4 -translate-y-2/4 hover:text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {showPassword && (
                  <>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    ></path>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    ></path>
                  </>
                )}
                {!showPassword && (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                  ></path>
                )}
              </svg>
            </div>
          </div> */}
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
