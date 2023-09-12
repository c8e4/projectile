import type { Meeple } from "./player"

export type TileConnector = string | null


export type TileConnectorList = Array<TileConnector>

export type Tile = {
    name: string
    deg: number
    connectors: TileConnectorList
    center: TileConnector 
    dropZone: TileConnectorList
    dropZoneCenter: TileConnector 
    meeple: Meeple | null
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
        center: null,
        dropZone: [],
        dropZoneCenter: null,
        meeple: null,
    }
}

export function emptyGridCell(i: number, j: number): GridCell {
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
            grid[i][j] = emptyGridCell(i, convertJ(j));
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
        connectors: [
            'z0', null, 'p1',
            'd0', 'p0', null,
            'p0', null, 'p0',
            'd0', 'p1', null
        ],
        dropZone: [
            'z0', null, 'p1',
            null, null, null,
            'p0', null, null,
            null, null, null
        ],
        dropZoneCenter: 'd0',
        meeple: null,
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
    cell.tile = rotateTile(cell.tile)
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

export function removeAndPlaceActiveCell(grid: GridOfTiles, activeCell: GridCell | null, cell: GridCell) {
    if (!activeCell || !hasNeighbours(grid, cell)) {
        return grid;
    }
    grid = removeActiveCellFromGrid(grid, activeCell);
    grid = placeActiveCellOnGrid(grid, cell, activeCell);
    return grid;
}

export function confirmTilePlacement(grid: GridOfTiles, activeCell: GridCell | null): GridOfTiles {
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

export function hasGoodConnections(grid: GridOfTiles, activeCell: GridCell | null): boolean {
    if (!activeCell) {
        return false
    }

    const x = activeCell.x;
    const y = activeCell.y;
    //neighbours
    let topClear = true
    let botClear = true
    let leftClear = true
    let rightClear = true
    if (x + 1 < GRID_SIZE) {
        rightClear = validCellConnection(activeCell, grid[x + 1][y])
    }
    if (y + 1 < GRID_SIZE) {
        topClear = validCellConnection(activeCell, grid[x][y + 1])
    }
    if (x - 1 >= 0) {
        leftClear = validCellConnection(activeCell, grid[x - 1][y])
    }
    if (y - 1 >= 0) {
        botClear = validCellConnection(activeCell, grid[x][y - 1])
    }
    return rightClear && topClear && botClear && leftClear;
}

export function validCellConnection(activeCell: GridCell, cell2: GridCell): boolean {
    if (!cell2.locked) {
        return true
    }
    const cell1 = activeCell
    const x1 = cell1.x;
    const y1 = cell1.y;
    const x2 = cell2.x;
    const y2 = cell2.y;

    if (x1 == x2) {
        if (y1 > y2) {
            //cell1 - 3 bottom connectors
            //cell2 - 3 top connectors

            return canConnect([cell1.tile.connectors[7], cell1.tile.connectors[6], cell1.tile.connectors[5]], [cell2.tile.connectors[11], cell2.tile.connectors[0], cell2.tile.connectors[1]])

        }
        else {
            //cell2 - 3 bottom connectors
            //cell1 - 3 top connectors
            return canConnect([cell2.tile.connectors[7], cell2.tile.connectors[6], cell2.tile.connectors[5]], [cell1.tile.connectors[11], cell1.tile.connectors[0], cell1.tile.connectors[1]])
        }
    }
    else {
        if (x1 > x2) {
            // cell2 - 3 right connectors      cells1 - 3 left connectors
            return canConnect([cell2.tile.connectors[2], cell2.tile.connectors[3], cell2.tile.connectors[4]], [cell1.tile.connectors[10], cell1.tile.connectors[9], cell1.tile.connectors[8]])

        }
        else {
            // cell1 - 3 right connectors      cells2 - 3 left connectors
            return canConnect([cell1.tile.connectors[2], cell1.tile.connectors[3], cell1.tile.connectors[4]], [cell2.tile.connectors[10], cell2.tile.connectors[9], cell2.tile.connectors[8]])
        }
    }
}

export function canConnect(list1: Array<string | null>, list2: Array<string | null>): boolean {
    return list1[0]?.charAt(0) == list2[0]?.charAt(0) && list1[1]?.charAt(0) == list2[1]?.charAt(0) && list1[2]?.charAt(0) == list2[2]?.charAt(0)
}

export function rotateTile(tile: Tile): Tile {
    //tile.connectors.pop(); //delete central from connectors
    //tile.dropZone.pop(); // delete central from dropZones
    for (let i = 0; i < 3; i++) {   //rotate x3 

        tile.connectors.unshift(tile.connectors[tile.connectors.length - 1]);
        tile.connectors.pop();

        tile.dropZone.unshift(tile.dropZone[tile.dropZone.length - 1]);
        tile.dropZone.pop();
    }
    //tile.connectors.push(tile.center) //add central from connectors
    //tile.connectors.push(tile.dropZoneCenter) // add central from dropZones
    return tile
}

export function convertJ(j: number): number {
    return j
}
