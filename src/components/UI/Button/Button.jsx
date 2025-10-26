import React from "react";
import "./button.scss";

export const Button = ({ children, variant, disabled, handler }) => {
  return (
    <button className={`btn btn_${variant}`} disabled={disabled} onClick={handler}>
      {children}
    </button>
  );
};
