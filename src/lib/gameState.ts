import { newGameGrid, type GridOfTiles } from "./grid"

type GameState = {
  grid: GridOfTiles
}

export function newGame(): GameState{
  const gameState = {
    grid: newGameGrid()
  }
  return gameState;
}