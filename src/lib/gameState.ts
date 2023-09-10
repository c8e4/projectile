import { newGameGrid, type GridOfTiles, type GridCell, emptyTile, emptyGridCell } from "./grid"

type GameState = {
  grid: GridOfTiles
  activeCell: GridCell | null
}

export function newGame(): GameState{
  const gameState = {
    grid: newGameGrid(),
    activeCell: getNextGridCell(),
  }
  return gameState;
}

function getNextGridCell(): GridCell {
  const cell = emptyGridCell(0,0);
  cell.tile.name = "B";
  return cell;
  // 1 Not enough tiles ?
  // 2 Calculate winner
  // 3 New Random Tile
}
