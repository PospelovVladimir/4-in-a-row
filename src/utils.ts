import type { TVariantCell } from "./components/GameCell/GameCell"

export const chooseChipExcludingSelected = (arr: TVariantCell[], selectedVariant: TVariantCell) => {
    const partColors = arr.filter((el) => el !== selectedVariant)
    return partColors[Math.floor(Math.random() * partColors.length)]
}

export const checkBoardFull = (grid: (TVariantCell | null)[][]): boolean => {
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[r].length; c++) {
      if (grid[r][c] === null) {
        return false;
      }
    }
  }
  return true;
};