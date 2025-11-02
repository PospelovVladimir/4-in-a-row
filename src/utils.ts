import type { TVariantCell } from "./components/GameCell/GameCell"

export const chooseChipExcludingSelected = (arr: TVariantCell[], selectedVariant: TVariantCell) => {
    const partColors = arr.filter((el) => el !== selectedVariant)
    return partColors[Math.floor(Math.random() * partColors.length)]
}