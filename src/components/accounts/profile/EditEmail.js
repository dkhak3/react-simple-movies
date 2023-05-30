import React, { Fragment, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Input from "../../form/Input";
import { Formik, Form, useField } from "formik";
import * as yup from "yup";
import { routes } from "../../../config";

const EditEmail = (props) => {
  const [email, setEmail] = useState(props.value);
  console.log(email);
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
      onChange={(values, { setSubmitting, resetForm }) => {
        console.log(values);
        // setEmail(values.email);
      }}
    >
      {(formik) => {
        return (
          <div className="w-full border-slate-800">
            <form onChange={formik.handleChange} autoComplete="one">
              <Input
                type="email"
                name="email"
                id="email"
                lable="Email"
                value={email}
                onChange={() => formik.handleChange}
                // placeholder="Enter your email"
              ></Input>

              {/* <div className="flex items-center justify-end mt-5 gap-x-5">
                <button
                  type="submit"
                  onClick={formik.handleSubmit}
                  // disabled={formik.isSubmitting}
                  className={`inline-flex items-center justify-center px-8 py-4 font-sans font-semibold tracking-wide text-white bg-third rounded-lg h-[55px] disabled:cursor-not-allowed text-lg bg-gradient-primary button-effect`}
                >
                  Save Changes
                </button>
              </div> */}
              <ToastContainer />
            </form>
          </div>
        );
      }}
    </Formik>
  );
};

export default EditEmail;
