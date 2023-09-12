import type { C } from "vitest/dist/reporters-cb94c88b"
import type { GridCell, GridOfTiles, Tile, TileConnector } from "./grid"
import type { Meeple } from "./player"

export type Landscape = {
    name: string
    type: LandType
    locations: Array<Port>
}
enum LandType {
    Pole,
    Zamok,
    Doroga,
    Cerkov,
}

export type Port = {
    name: TileConnector
    x: number
    y: number
    index: ConnectorIndex
    closed: boolean
    id: string
    landscapeId: string
    figureId: number | null
    dropZone: boolean
}

export type ConnectorIndex = number // 0..11


export function addLocations(cell: GridCell): Array<Port> {
    let localPorts: Array<Port> = []
    cell.tile.connectors.forEach((p, i) => {
        if (p) {
            let tempPort = {
                x: cell.x,
                y: cell.y,
                name: p,
                index: i,
                closed: false,
                id: `x${cell.x}y${cell.y}${p}`,
                landscapeId: `x${cell.x}y${cell.y}${p}`,
                figureId: null,
                dropZone: cell.tile.dropZone[i] ? true : false
            }
            localPorts.push(tempPort)
        }
    })
    let tempPort = {
        x: cell.x,
        y: cell.y,
        name: cell.tile.center,
        index: 12,
        closed: true,
        id: `x${cell.x}y${cell.y}${cell.tile.center}`,
        landscapeId: `x${cell.x}y${cell.y}${cell.tile.center}`,
        figureId: null,
        dropZone: cell.tile.dropZoneCenter ? true : false
    }
    localPorts.push(tempPort)


    //console.log(localPorts)
    const localPortNames = cell.tile.connectors.filter((c, i, a) => c && a.indexOf(c) == i)
    return localPorts;
    // Landscape name = port name [0]
    //console.log(localLandscapes)
    //let localPorts = cell.tile.connectors 
}

const PORT_MAP = [
    [11, 0, 1, 7],
    [0, 0, 1, 6],
    [1, 0, 1, 5],
    [2, 1, 0, 10],
    [3, 1, 0, 9],
    [4, 1, 0, 8],
    [5, 0, -1, 1],
    [6, 0, -1, 0],
    [7, 0, -1, 11],
    [8, -1, 0, 4],
    [9, -1, 0, 3],
    [10, -1, 0, 2],
    //[12, 0, 0, 12] //central port/central dropZone
]

export function mergeLandscapes(activeCell: GridCell | null, portList: Array<Port>): Array<Port> {
    let localPorts: Array<Port> = addLocations(activeCell)
    portList.push(...localPorts)
    localPorts.forEach((p) => {
        if (p.index == 12) {
        }
        else {
            let [index, dX, dY, targetIndex] = getCorrespondingPortParametrs(p.index)
            let targetPort = findPort(portList, p.x + dX, p.y + dY, targetIndex)
            portList = renameLandscapeId(p, targetPort, portList)
        }
    })
    return portList
}

function renameLandscapeId(sourcePort: Port, targetPort: Port | null, portList: Array<Port>): Array<Port> {
    if (!targetPort) {
        return portList
    }
    const tempLandscapeId = targetPort.landscapeId
    return portList.map((p) => {
        if (p.index == sourcePort.index && p.id == sourcePort.id) {
            sourcePort.closed = true
        }
        if (p.landscapeId == tempLandscapeId) {
            p.landscapeId = sourcePort.landscapeId
        }
        return p
    })
    // Есил мы наступили на target port - то берем все такие же landscapeId как у таргет порта и их перезаписываем на source Landscape
}


function getCorrespondingPortParametrs(portIndex: number): Array<number> {
    // @ts-ignore
    return PORT_MAP.find((p) => p[0] == portIndex)
}

function addCurrentCellPorts(cell: GridCell, portList: Array<Port>): Array<Port> {
    let localPorts: Array<Port> = addLocations(cell)
    portList.push(...localPorts)
    return portList
}


function visitPorts(x: number, y: number) {
    PORT_MAP.forEach(row => {
        doSomething(x, y, row[0], x + row[1], y + row[2], row[3])
    })
}

function doSomething(x1: number, y1: number, i1: number, x2: number, y2: number, i2: number) {
    //1 check odinakovie? 
}

function findPort(portList: Array<Port>, x: number, y: number, index: number): Port | null {
    return portList.find((p) => {
        return (p.x == x) && (p.y == y) && (p.index == index)
    }) ?? null
}

function landTypeToName(landType: LandType): string {
    if (LandType.Pole == landType) { return "Pole" }
    if (LandType.Zamok == landType) { return "Zamok" }
    if (LandType.Doroga == landType) { return "Doroga" }
    return "Cerkov"
}
function connectorNameToLandType(connectorName: string | null): LandType | null {
    if (!connectorName) {
        return null
    }
    if (connectorName.charAt(0) == 'z') {
        return LandType.Zamok
    }
    if (connectorName.charAt(0) == 'p') {
        return LandType.Pole
    }
    if (connectorName.charAt(0) == 'd') {
        return LandType.Doroga
    }
    return null
}

export function addMeepleToPort(activeMeeple: Meeple | null, ports: Array<Port>): Array<Port> {
    if (activeMeeple?.at) {
        return ports.map((p) => {
            if ((activeMeeple.at?.x == p.x) && (activeMeeple.at?.y == p.y) && (activeMeeple.at?.connectorIndex == p.index)) {
                p.figureId = activeMeeple.id
            }
            return p
        })
    }
    else {
        return ports
    }
}

export function addMeepleToTile(activeMeeple: Meeple | null, cell: GridCell | null, grid: GridOfTiles): GridOfTiles {
    if (activeMeeple && cell) {
        const gridCell = grid.find(row => row.some(c => c.x == cell.x))?.find(c => c.x == cell.x)
        if (gridCell) {
            gridCell.tile.meeple = activeMeeple;
        }
    }
    return grid;
}

export function deleteOccupiedDropZoneFromTile(activeCell: GridCell|null, ports: Array<Port>):GridCell|null {
    if (!activeCell){
        return activeCell
    }
    let x = activeCell.x
    let y = activeCell.y
    console.log ("ActiveCell DZ=",activeCell.tile.dropZone)

    activeCell.tile.dropZone.forEach((d, i) => {
        let tempPort: Port | null
        if (!d) {
            tempPort = findPort(ports, x, y, i)
            
            if (tempPort) {
                if(ports.some((p) => p.landscapeId == tempPort?.landscapeId && p.figureId != null))
                {   
                    console.log ("index=",i,activeCell.tile.dropZone[i])
                    activeCell.tile.dropZone[i]=null
                    console.log ("after",activeCell.tile.dropZone[i])
                }   
            }

        }
    })
    return activeCell
}

