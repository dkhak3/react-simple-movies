import { useField } from "formik";
import React from "react";

const Input = ({ lable, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className="flex flex-col items-start flex-1 mb-10 gap-y-3">
      <label
        htmlFor={props.id || props.name}
        className="text-base font-semibold cursor-pointer inline-block"
      >
        {lable}
      </label>
      <div className="relative w-full">
        <input
          className="w-full p-4 text-base text-white transition-all border rounded-lg outline-none bg-slate-900 focus:border-blue-500 border-slate-700"
          {...props}
          {...field}
        />
        {meta.touched && meta.error ? (
          <p className="text-red-500 text-sm">{meta.error}</p>
        ) : null}
      </div>
    </div>
  );
};

export default Input;
