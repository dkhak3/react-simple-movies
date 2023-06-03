import React, { Fragment, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Input from "../../form/Input";
import { Formik, Form, useField } from "formik";
import * as yup from "yup";
import { routes } from "../../../config";

const EditPassword = () => {
  const account = JSON.parse(localStorage.getItem("account"));

  const showToastMessage = (type) => {
    if (type === 1) {
      toast.success("Changes success", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else if (type === 2) {
      toast.error("Change failed", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  return (
    <Formik
      initialValues={{
        password: "",
        newPassword: "",
      }}
      validationSchema={yup.object({
        password: yup
          .string()
          .min(8, "Your password must be at least 8 character or greater")
          .required("Please enter your password"),
        newPassword: yup
          .string()
          .min(8, "Your password must be at least 8 character or greater")
          .required("Please enter your password"),
      })}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        if (account.password === values.password) {
          const updateProfile = {
            ...account,
            password: values.newPassword,
          };
          console.log(updateProfile);
          localStorage.setItem("account", JSON.stringify(updateProfile));
          localStorage.setItem("login", JSON.stringify(updateProfile));
          showToastMessage(1);
          //   setSubmitting(false);
          //   resetForm();
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        } else {
          showToastMessage(2);
        }
      }}
    >
      {(formik) => {
        return (
          <div className="page-container">
            <div className="max-w-2xl py-10 mx-auto rounded-lg border-slate-800">
              <form onSubmit={formik.handleSubmit} autoComplete="one">
                <Input
                  name="password"
                  id="password"
                  lable="Password"
                  placeholder="Enter your password"
                ></Input>

                <Input
                  name="newPassword"
                  id="password"
                  lable="New Password"
                  placeholder="Enter your new password"
                ></Input>

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
                <ToastContainer />
              </form>
            </div>
          </div>
        );
      }}
    </Formik>
  );
};

export default EditPassword;
