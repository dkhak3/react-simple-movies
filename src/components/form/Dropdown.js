import { useField } from "formik";
import React, { useEffect, useState } from "react";
import useClickOutSide from "../../hooks/useClickOutSide";

const Dropdown = ({
  labelText,
  name,
  data,
  dropdownLabel = "Select your Gender",
  setValue,
}) => {
  const { show, setShow, nodeRef } = useClickOutSide();
  const [label, setLabel] = useState(dropdownLabel);

  const handleClickDropdownItem = (e) => {
    setValue(name, e.target.dataset.value);
    setShow(false);
    setLabel(e.target.textContent);
  };

  const [field, meta] = useField({ name });
  useEffect(() => {
    if (field.value === "") setLabel(dropdownLabel);
  }, [field.value]);
  return (
    <div className="flex flex-col gap-3 mb-5 w-full">
      <label className="cursor-pointer">{labelText}</label>
      <div className="relative" ref={nodeRef}>
        <div
          className="w-full p-4 text-base text-white transition-all border rounded-lg outline-none bg-slate-900 focus:border-blue-500 border-slate-700"
          onClick={() => setShow(!show)}
        >
          <span>{label}</span>
        </div>
        <div
          className={`absolute top-full left-0 w-full rounded-lg border bg-slate-900 ${
            show ? "" : "opacity-0 invisible"
          }`}
        >
          {data &&
            data.length > 0 &&
            data.map((item) => (
              <div
                className="p-5 cursor-pointer hover:bg-blue-500"
                onClick={handleClickDropdownItem}
                data-value={item.value}
                key={item.id}
              >
                {item.text}
              </div>
            ))}
        </div>
      </div>
      {meta.touched && meta.error && (
        <p className="text-sm text-red-500">{meta.error}</p>
      )}
    </div>
  );
};

export default Dropdown;
