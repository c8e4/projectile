import type { GridOfTiles, ZamokPoleLink } from "./grid"
import type { Port } from "./landscape"

export type ZamokAndPoleNeighbours = {
    zamokPort: Port
    uniqueNeighbourPoles: Array<Port>
}

export function endGameZamokScore(ports: Array<Port>): Array<Port> {
    ports.filter(p => p.name?.charAt(0) == "z").map(p => {
        p.score = p.score ? p.score * 1.5 : null
        return p
    })
    return ports
}

export function endGamePoleScore(ports: Array<Port>, grid: GridOfTiles): Array<Port> {


    // check All Completed Castle -> take all connected Pole tiles 
    let completedCastles = ports.filter(p => p.completed == true).filter(p => p.name.charAt(0) == "z")
    let uniqueCastles = completedCastles.filter((p, i, a) => i == a.findIndex(u => u.landscapeId == p.landscapeId))

    let neighboursOfZamok: Array<ZamokAndPoleNeighbours> = uniqueCastles.map(uniqueCP => {
        let castlePorts = completedCastles.filter(completedCP => completedCP.landscapeId == uniqueCP.landscapeId)

        let neighbourPoles = castlePorts.flatMap(pc =>
            getNeighbourPoles(ports, pc, grid[pc.x][pc.y].tile.zamokPoleLinks))

        let uniqueNeighbourPoles = neighbourPoles.filter((p, i, a) => i == a.findIndex(u => u.landscapeId == p.landscapeId))

        return {
            zamokPort: uniqueCP,
            uniqueNeighbourPoles: uniqueNeighbourPoles
        }
    })

    let uniquePoles = neighboursOfZamok.flatMap(n => n.uniqueNeighbourPoles).filter((p, i, a) => i == a.findIndex(u => u.landscapeId == p.landscapeId))

    let uniquePolesWithMeepleIds = uniquePoles.map(uniquePole => {
        const castleCount = neighboursOfZamok.filter(z => z.uniqueNeighbourPoles.some(p => p.landscapeId == uniquePole.landscapeId)).length
        return {
            landscapeId: uniquePole.landscapeId,
            score: castleCount * 3,
            meepleIdList: ports.filter(p => p.landscapeId == uniquePole.landscapeId).filter(p => p.meepleId != null).map(p => p.meepleId).map(p=>p),
        }
    })

    uniquePolesWithMeepleIds.forEach(u=>{
        calculatePoleWinner(u.landscapeId,u.score,u.meepleIdList)
    })
}
export function calculatePoleWinner(landscapeId:string,score:number,meepleIdList:Array<number|null>){
    if (!meepleIdList)
    {
        return 
    }
    
    
}

export function getNeighbourPoles(ports: Array<Port>, targetZamok: Port, links: Array<ZamokPoleLink> | null): Array<Port> {
    if (!links) {
        return []
    }
    let poleIds = links.filter(l => l.zamok == targetZamok.name).map(l => {
        return "x" + targetZamok.x + "y" + targetZamok.y + l.pole
    })
    let neighbourPoles = ports.filter(port => poleIds.some(pId => pId == port.id))
    return neighbourPoles
}