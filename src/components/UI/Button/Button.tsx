import type { FC, ReactNode } from "react"
import "./button.scss"

type Variant = "primary" | "secondary" | "danger" | "remove"

type TButton = {
  children: ReactNode
  variant: Variant
  disabled?: boolean
  handler: () => void
}

export const Button: FC<TButton> = ({ children, variant, disabled, handler }) => {
  return (
    <button className={`btn btn_${variant}`} disabled={disabled} onClick={!disabled ? handler : undefined}>
      {children}
    </button>
  )
}
