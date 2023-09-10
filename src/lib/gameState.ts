import { newGameGrid, type GridOfTiles, type GridCell } from "./grid"

type GameState = {
  grid: GridOfTiles
  activeCell: GridCell | null
}

export function newGame(): GameState{
  const gameState = {
    grid: newGameGrid(),
    activeCell: null,
  }
  return gameState;
}