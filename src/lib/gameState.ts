import { newRandomDeck } from "./deck"
import { newGameGrid, type GridOfTiles, type GridCell, emptyTile, emptyGridCell, type Tile } from "./grid"

type GameState = {
  grid: GridOfTiles
  activeCell: GridCell | null
  tileDeck: Array<Tile>
}

export function newGame(): GameState{
  const gameState = {
    grid: newGameGrid(),
    activeCell: null,
    tileDeck: newRandomDeck()
  }
  return gameState;
}

export function getNextTile(tileDeck:Array<Tile>): Tile |null {
  const e = tileDeck.pop();
  if(!e){
    return null
  }{
    return e
  }
}
