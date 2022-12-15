import React from "react";
import "./Textarea.scss";
import cn from "classnames";

interface ITextarea {
  label: string;
  id: string;
  formik: any;
}

export const Textarea: React.FC<ITextarea> = ({ label, id, formik }) => {
  const error = formik.errors[id] && (
    <div className={"error"}>{formik.errors[id]}</div>
  );
  return (
    <>
      <div
        className={cn("fieldTextarea", formik.errors[id] ? "fieldError" : "")}
      >
        <label htmlFor={id}>{label}</label>
        <textarea
          id={id}
          onChange={formik.handleChange}
          value={formik.values[id]}
        ></textarea>
      </div>
      {error}
    </>
  );
};
