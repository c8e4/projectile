type TileConnector = string | null

type TileConnectorList = Array<TileConnector>

type FieldTile = {
  coord: string
  tile: {
    name: string
    deg: number
    connectors: TileConnectorList
    center: string | null
  }
  x: number
  y: number
  locked: boolean
}

type GameState = {
  tiles: Array<FieldTile>
}

export const GRID_SIZE = 81;
export const GRID_CENTER = 40;

export const gameState:GameState = {
  //tiles
  //
  //players
  //  
  tiles: []
} 