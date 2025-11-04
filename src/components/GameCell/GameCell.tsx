import "./gameCell.scss"
import { useState, type FC, useEffect } from "react"

export type TVariantCell = "red" | "blue" | "green" | "violet"

type TGameCell = {
  variant: TVariantCell
  isWinningCell?: boolean
}

const GameCell: FC<TGameCell> = ({ variant, isWinningCell = false }) => {
  const [stone, setStone] = useState<string>("")

  const getStone = async (variant: TVariantCell) => {
    switch (variant) {
      case "red":
        return (await import("../../assets/images/t1.png")).default
      case "blue":
        return (await import("../../assets/images/t2.png")).default
      case "green":
        return (await import("../../assets/images/t3.png")).default
      case "violet":
        return (await import("../../assets/images/t4.png")).default
      default:
        throw new Error("Unknown variant")
    }
  }

  useEffect(() => {
    ;(async () => setStone(await getStone(variant)))()
  }, [variant])

  return (
    <div className="game-cell">
      <span className={`game-cell__flare ${isWinningCell ? "active" : ""}`}></span>
      <img className="game-cell__img" src={stone} />
    </div>
  )
}

export default GameCell
