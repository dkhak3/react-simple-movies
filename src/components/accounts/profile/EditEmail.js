import React, { Fragment, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Input from "../../form/Input";
import { Formik, Form, useField } from "formik";
import * as yup from "yup";
import { routes } from "../../../config";

const EditEmail = () => {
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
        email: "",
      }}
      validationSchema={yup.object({
        email: yup
          .string()
          .email("Please enter valid email address")
          .required("Please enter your email"),
      })}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        const updateProfile = {
          ...account,
          email: values.email,
        };
        localStorage.setItem("account", JSON.stringify(updateProfile));
        localStorage.setItem("login", JSON.stringify(updateProfile));
        showToastMessage(1);
        setSubmitting(false);
        resetForm();
        setTimeout(() => {
          window.location.reload();
        }, 1000);
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

export default EditEmail;
