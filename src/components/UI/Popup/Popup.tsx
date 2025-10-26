import type { FC, ReactNode } from "react"
import { useEffect } from "react"
import "./popup.scss"
import { Button } from "../Button/Button"

type TPopup = {
  children: ReactNode
  isActive: boolean
  closeHandler: () => void
}

export const Popup: FC<TPopup> = ({ children, isActive, closeHandler }) => {
  const clickInEmptyHandler = (e: MouseEvent) => {
    const target = e.target as HTMLElement

    if (!target.closest(".popup__wrapper")) {
      closeHandler()
    }
  }
  const keyPressEscHandler = (e: KeyboardEvent) => e.code === "Escape" && closeHandler()

  useEffect(() => {
    if (isActive) {
      document.addEventListener("mousedown", clickInEmptyHandler)
      document.addEventListener("keydown", keyPressEscHandler)
    }

    return () => {
      document.removeEventListener("mousedown", clickInEmptyHandler)
      document.removeEventListener("keydown", keyPressEscHandler)
    }
  }, [isActive])

  return (
    isActive && (
      <div className="popup">
        <div className="popup__wrapper">
          <div className="popup__content">{children}</div>
          <div className="popup__btn">
            <Button variant="primary" handler={() => closeHandler()}>
              X
            </Button>
          </div>
        </div>
      </div>
    )
  )
}
