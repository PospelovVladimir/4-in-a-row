import React, { useEffect } from "react";
import "./popup.scss";
import { Button } from "../Button/Button";

export const Popup = ({ children, isPopupActive, closeHandler }) => {
  const clickInEmptyHandler = (e) => !e.target.closest(".popup__wrapper") && closeHandler(false);
  const keyPressEscHandler = (e) => e.code === "Escape" && closeHandler(false);

  useEffect(() => {
    if (isPopupActive) {
      document.addEventListener("mousedown", clickInEmptyHandler);
      document.addEventListener("keydown", keyPressEscHandler);
    }

    return () => {
      document.removeEventListener("mousedown", clickInEmptyHandler);
      document.removeEventListener("keydown", keyPressEscHandler);
    };
  }, [isPopupActive]);

  return (
    isPopupActive && (
      <div className="popup">
        <div className="popup__wrapper">
          <div className="popup__content">{children}</div>
          <div className="popup__btn">
            <Button variant={"primary"} handler={() => closeHandler(false)}>
              X
            </Button>
          </div>
        </div>
      </div>
    )
  );
};
