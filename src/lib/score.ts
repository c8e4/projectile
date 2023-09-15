import type { GridOfTiles, ZamokPoleLink } from "./grid"
import { meepleIdToPlayerId, type LandscapeOwner, type Port, meepleIdListToOwnerList } from "./landscape"
import type { Player } from "./player"

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

export function endGamePoleScore(ports: Array<Port>, grid: GridOfTiles, players: Array<Player>): Array<Port> {
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
            meepleIdList: ports.filter(p => p.landscapeId == uniquePole.landscapeId).filter(p => p.meepleId != null).map(p => p.meepleId).filter(p => p != null),
        }
    })

    uniquePolesWithMeepleIds.forEach(u => {
        // @ts-ignore
        const winners = calculatePoleWinners(players,  u.meepleIdList);

        ports.filter(port => port.landscapeId == u.landscapeId).forEach((port)=>{
            port.conquerers = winners.map(w=>w.playerId);
            port.score = u.score;
        })
    })

    return ports
}

export function calculatePoleWinners(players: Array<Player>, meepleIdList: Array<number>):Array<LandscapeOwner> {
    const owners = meepleIdListToOwnerList(meepleIdList, players)
    return owners.filter(o => o.meepleCount == Math.max(...owners.map(o=> o.meepleCount)));
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