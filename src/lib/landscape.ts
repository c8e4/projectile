import type { C, as } from "vitest/dist/reporters-cb94c88b"
import type { GridCell, GridOfTiles, Tile, TileConnector } from "./grid"
import type { Meeple, Player, PlayerId, PlayerIdMeeple } from "./player"
import type { List } from "postcss/lib/list"
import { tiles } from "./game/tiles"

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

export type ClosedLandscape = {
    landscapeId: string
    type: LandType | null
    meepleIds: Array<number>
    tileCount: number
    pennantCount: number
    //pennants: ports.filter(x=>x.landscapeId==p.landscapeId&&x.hasPennant).map(x=>x.id).filter((x,i,a)=>a.indexOf(x)==i).length
}

export type LandscapeOwner = {
    playerId: number,
    meepleCount: number
}

export type ClosedLandscapeOwners = {
    landscapeId: string
    type: LandType | null
    meepleIds: Array<number>
    tileCount: number
    pennantCount: number
    owners: Array<LandscapeOwner>
}


export type Port = {
    name: TileConnector
    x: number
    y: number
    index: ConnectorIndex
    closed: boolean
    id: string
    landscapeId: string
    meepleId: number | null
    dropZone: boolean
    completed: boolean
    score: number | null
    conquerers: Array<PlayerId>  // playerId
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
                meepleId: null,
                dropZone: cell.tile.dropZone[i] ? true : false,
                completed: false,
                score: null,
                conquerers: [],
                hasPennant: !!cell.tile.pennant
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
        meepleId: null,
        dropZone: cell.tile.dropZoneCenter ? true : false,
        completed: false,
        score: null,
        conquerers: [],
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
    //@ts-ignore
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
            targetPort.closed = true
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

export function landTypeToName(landType: LandType): string {
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
                p.meepleId = activeMeeple.id
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

export function deleteOccupiedDropZoneFromTile(activeCell: GridCell | null, ports: Array<Port>): GridCell | null {
    if (!activeCell) {
        return activeCell
    }
    let x = activeCell.x
    let y = activeCell.y
    activeCell.tile.dropZone = activeCell.tile.dropZone.map((d, i) => {
        if (isOccupiedLandscapeId(findPort(ports, x, y, i), ports)) {
            return null
        }
        else {
            return d
        }
    })

    activeCell.tile.dropZoneCenter = isOccupiedLandscapeId(findPort(ports, x, y, 12), ports) ? null : activeCell.tile.dropZoneCenter
    return activeCell
}

export function isOccupiedLandscapeId(targetPort: Port | null, ports: Array<Port>): boolean | null {
    return targetPort && ports.some((p) => p.landscapeId == targetPort?.landscapeId && p.meepleId != null)
}


export function showClosedLandscapes(ports: Array<Port>, players: Array<Player>) {

    const closedLandscapes = getClosedLandscapes(ports, players)
    if (closedLandscapes) {
        // console.log("cant find closed landscapes")
    }
    else {
        // console.table(closedLandscapes)
    }

}









export function getClosedLandscapes(ports: Array<Port>, players: Array<Player>): Array<Port> {
    let uniqueLandscapeId = ports.filter(p => p.name != null).filter((p, i, a) => i == a.findIndex(z => z.landscapeId == p.landscapeId))
    
    let closedLadnscapes = uniqueLandscapeId.map(u => ports.filter(p => p.landscapeId == u.landscapeId))
        .filter(m => m.every(p => p.closed == true && p.completed == false))
    let completedLandscapes = closedLadnscapes.map(c => {
        c.map(p => {
            p.completed = true
            return p
        })
        return c
    });

    // only Zamok and Doroga
    let closedLandscapes = uniqueLandscapeId.filter(u => connectorNameToLandType(u.name) == LandType.Zamok || connectorNameToLandType(u.name) == LandType.Doroga)
        .filter(u => completedLandscapes.some(s => s[0].landscapeId == u.landscapeId)).map(p => {
            return {
                landscapeId: p.landscapeId,
                type: connectorNameToLandType(p.name),
                meepleIds: (ports.filter(x => x.landscapeId == p.landscapeId).map(x => x.meepleId).filter(x => x != null) as Array<number>),
                tileCount: ports.filter(x => x.landscapeId == p.landscapeId).map(x => x.x+"."+x.y).filter((x, i, a) => a.indexOf(x) == i).length,
                pennantCount: ports.filter(x => x.landscapeId == p.landscapeId && x.hasPennant).map(x => x.id).filter((x, i, a) => a.indexOf(x) == i).length
            }
        })
    
    let closedLandscapesOwners: Array<ClosedLandscapeOwners> = closedLandscapes.map(l =>{
        const uniquePlayerIds = l.meepleIds
            .map(mId => meepleIdToPlayerId(mId, players))
            .filter((pId,i,a) => a.indexOf(pId) == i);
        let owners:Array<LandscapeOwner> = uniquePlayerIds.map((pId)=>{
            return {
                playerId: pId,
                meepleCount: l.meepleIds.map(mId => meepleIdToPlayerId(mId, players)).filter(id =>id == pId).length
            }
        });
        owners = owners.filter(o => o.meepleCount == Math.max(...owners.map(o=> o.meepleCount)));
        (l as ClosedLandscapeOwners).owners = owners;
        return (l as ClosedLandscapeOwners)
    })

    ports = updateScore(closedLandscapesOwners, ports);

    console.log("closedLandscapesOwners")
    console.log(closedLandscapesOwners);
    (window as any).closedLandscapesOwners = closedLandscapesOwners;
    
    return ports
}

function updateScore(closedLandscapesOwners: Array<ClosedLandscapeOwners>, ports: Array<Port>):Array<Port>{
    closedLandscapesOwners.forEach(owner=>{
        ports.filter(p => p.landscapeId == owner.landscapeId).forEach(port =>{
            port.conquerers = owner.owners.map(o=>o.playerId)
            port.score = calculateLandscapeScore(owner.type, owner.tileCount, owner.pennantCount);
        })
    })
    return ports;
}

function meepleIdToPlayerId(mId: number, players: Array<Player>):number{
    //@ts-ignore
    return players.flatMap(p => p.meeples).find(m => m.id == mId)?.playerId
}


export function getTopPlayers(playerIdMeeple: LandscapeOwner) {
    let maxMeeples = Math.max(playerIdMeeple.meepleCount)
}

function calculateLandscapeScore(landType: LandType | null, tileCount:number, pennantCount:number):number{
    return tileCount * scorePerLandType(landType)+ pennantCount*2;
}

function scorePerLandType(type: LandType | null): number{
    if(type == LandType.Zamok){
        return 2;
    }
    if(type == LandType.Doroga){
        return 1;
    }
    return 0;
}

export function calculateScore(landscapes: Array<ClosedLandscape>) {

    //Дороги - |уникальные id|*1 = score 
    //Замки  - |уникальные id|*2 = score

    //Поля - ничего
    //Церковь - ничего 


}
