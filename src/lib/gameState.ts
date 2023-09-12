import { newRandomDeck } from "./deck"
import { newGameGrid, type GridOfTiles, type GridCell, emptyTile, emptyGridCell, type Tile } from "./grid"
import type { Port } from "./landscape"
import { initPlayers, type Meeple, type Player } from "./player"

type GameState = {
  grid: GridOfTiles
  activeCell: GridCell | null
  activePlayer: Player | null
  activeMeeple: Meeple|null
  playerCount: number
  tileDeck: Array<Tile>
  portList: Array<Port>
  players: Array<Player> 
}


export function newGame(playerCount:number): GameState{
  const players = initPlayers(playerCount)
    const gameState = {
    grid: newGameGrid(),
    activeCell: null,
    tileDeck: newRandomDeck(),
    portList:[],
    playerCount,
    activePlayer: players[0],
    activeMeeple: null,
    players,
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