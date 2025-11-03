import type { TVariantCell } from "./components/GameCell/GameCell"

export const chooseChipExcludingSelected = (arr: TVariantCell[], selectedVariant: TVariantCell) => {
  const partColors = arr.filter((el) => el !== selectedVariant)
  return partColors[Math.floor(Math.random() * partColors.length)]
}

export const checkBoardFull = (grid: (TVariantCell | null)[][]): boolean => {
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[r].length; c++) {
      if (grid[r][c] === null) {
        return false
      }
    }
  }
  return true
}

export const findFinalRow = (grid: (TVariantCell | null)[][], column: number): number | null => {
  const rows = grid.length

  for (let row = rows - 1; row >= 0; row--) {
    // Ищем снизу вверх
    if (grid[row][column] === null) {
      return row // Находим первую свободную ячейку
    }
  }

  return null // Если столбец полон
}

type TWinInfo = {
  winnerColor: TVariantCell;
  winningPositions: { row: number; col: number }[];
};

export const checkWin = (
  currentGrid: (TVariantCell | null)[][],
  amountToWin: number,
  lastPlacedRow: number,
  lastPlacedCol: number,
  color: TVariantCell,
  rows: number,
  columns: number
): TWinInfo | null => { // Теперь возвращает TWinInfo | null
  // Если последняя фишка была не того цвета, значит, это не может быть победная комбинация
  if (currentGrid[lastPlacedRow]?.[lastPlacedCol] !== color) {
    return null;
  }

  const directions: [number, number][] = [
    [0, 1],   // Горизонталь
    [1, 0],   // Вертикаль
    [1, 1],   // Диагональ (вниз-вправо)
    [1, -1]   // Диагональ (вниз-влево)
  ];

  for (const [dr, dc] of directions) {
    let count = 1;
    const currentWinningPositions: { row: number; col: number }[] = [{ row: lastPlacedRow, col: lastPlacedCol }];

    // Проверяем в положительном направлении
    for (let i = 1; i < amountToWin; i++) {
      const r = lastPlacedRow + i * dr;
      const c = lastPlacedCol + i * dc;

      if (r >= 0 && r < rows && c >= 0 && c < columns && currentGrid[r][c] === color) {
        count++;
        currentWinningPositions.push({ row: r, col: c });
      } else {
        break;
      }
    }

    // Проверяем в отрицательном направлении
    for (let i = 1; i < amountToWin; i++) {
      const r = lastPlacedRow - i * dr;
      const c = lastPlacedCol - i * dc;

      if (r >= 0 && r < rows && c >= 0 && c < columns && currentGrid[r][c] === color) {
        count++;
        currentWinningPositions.push({ row: r, col: c });
      } else {
        break;
      }
    }

    // Если счетчик достиг amountToWin, значит, мы нашли победную комбинацию
    if (count >= amountToWin) {
      // Возвращаем информацию о победителе
      return {
        winnerColor: color,
        winningPositions: currentWinningPositions,
      };
    }
  }

  // Если ни в одном из направлений не найдено amountToWin фишки подряд, возвращаем null
  return null;
}
