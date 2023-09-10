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

export type GridOfTiles = Array<Array<FieldTile>>

export const GRID_SIZE = 81;
export const GRID_CENTER = 40;

function toVisualGridCoordinates(x: number, y: number): string {
    return `${x},${y}`; //`${y - GRID_CENTER}, ${(x - GRID_CENTER) * -1}`;
}

function createEmptyGrid():GridOfTiles {
    const grid = new Array(GRID_SIZE)
        .fill(null)
        .map((x) => new Array(GRID_SIZE).fill(null));

    for (let i = 0; i < GRID_SIZE; i++) {
        for (let j = 0; j < GRID_SIZE; j++) {
            grid[i][j] = {
                coord: toVisualGridCoordinates(i, j),
                tile: {
                    name: "",
                    deg: 0,
                    connector: [],
                },
                x: i,
                y: j,
                locked: false,
            };
        }
    }
    return grid;
}

export function newGameGrid():GridOfTiles{
    const grid = createEmptyGrid();
    // TODO take actual D tile
    grid[GRID_CENTER][GRID_CENTER].tile = {
        name: "D",
        deg: 0,
        center: null,
        connectors: []
    };
    grid[GRID_CENTER][GRID_CENTER].locked = true;
    return grid;
}

