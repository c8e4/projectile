type TileConnector = string | null

type TileConnectorList = Array<TileConnector>

type Tile = {
    name: string
    deg: number
    connectors: TileConnectorList
    center: string | null
}

export type GridCell = {
    coord: string
    tile: Tile
    x: number
    y: number
    locked: boolean
}

export type GridOfTiles = Array<Array<GridCell>>

export const GRID_SIZE = 81;
export const GRID_CENTER = 40;

export function emptyTile(): Tile {
    return {
        name: "",
        deg: 0,
        connectors: [],
        center: null
    }
}

export function emptyGridCell(i:number,j:number):GridCell{
    return {
        coord: toVisualGridCoordinates(i, j),
        tile: emptyTile(),
        x: i,
        y: j,
        locked: false,
    }
}

function toVisualGridCoordinates(x: number, y: number): string {
    return `${x},${y}`; //`${y - GRID_CENTER}, ${(x - GRID_CENTER) * -1}`;
}

function createEmptyGrid(gridSize: number): GridOfTiles {
    const grid = new Array(gridSize)
        .fill(null)
        .map((x) => new Array(gridSize).fill(null));

    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            grid[i][j] = emptyGridCell(i,j);
        }
    }
    return grid;
}

export function newGameGrid(): GridOfTiles {
    const grid = createEmptyGrid(GRID_SIZE);
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

export function rotateActiveCell(cell: GridCell | null): GridCell | null {
    if (!cell) {
        return null;
    }
    if (!cell.tile.deg) {
        cell.tile.deg = 90;
    } else {
        cell.tile.deg = (cell.tile.deg + 90) % 360;
    }
    return cell;
}

function removeActiveCellFromGrid(grid: GridOfTiles, cell: GridCell | null): GridOfTiles {
    if (cell && !cell?.locked) {
        grid[cell.x][cell.y].tile = emptyTile();
    }
    return grid;
}

function placeActiveCellOnGrid(grid: GridOfTiles, targetCell: GridCell, activeCell: GridCell | null): GridOfTiles {
    if (activeCell) {
        grid[targetCell.x][targetCell.y].tile = emptyTile();
        grid[targetCell.x][targetCell.y].tile = activeCell.tile;
        return grid
    }
    return grid;
}

export function removeAndPlaceActiveCell(grid: GridOfTiles, activeCell: GridCell | null, cell: GridCell){
    if (!activeCell || !hasNeighbours(grid, cell)) {
        return grid;
    }
    grid = removeActiveCellFromGrid(grid, activeCell);
    grid = placeActiveCellOnGrid(grid, cell, activeCell);
    return grid;
}

export function confirmTilePlacement(grid: GridOfTiles, activeCell:GridCell|null): GridOfTiles {
    if (!activeCell) {
        return grid;
    }
    grid[activeCell.x][activeCell.y].locked = true;
    return grid;
}

export function hasNeighbours(grid: GridOfTiles, cell: GridCell): boolean {
    const x = cell.x;
    const y = cell.y;
    //neighbours
    if (x + 1 < GRID_SIZE) {
        if (grid[x + 1][y].locked) {
            return true;
        }
    }
    if (y + 1 < GRID_SIZE) {
        if (grid[x][y + 1].locked) {
            return true;
        }
    }
    if (x - 1 >= 0) {
        if (grid[x - 1][y].locked) {
            return true;
        }
    }
    if (y - 1 >= 0) {
        if (grid[x][y - 1].locked) {
            return true;
        }
    }
    return false;
}

