
export type Player = {
    id: number
    meeples: Array<Meeple>
}

export type Meeple = {
    id: number
    playerId: number
    at: ConnectorLocation|null //x,y,connectorIndex   
}

export type ConnectorLocation = {
    x: number
    y: number
    connectorIndex: number
}

export const MEEPLE_PER_PLAYER = 7;

export function initPlayers(playerCount:number):Array<Player>{
    const players:Array<Player> = []
    for (let i=0;i<playerCount;i++)
    {   
        let tempPlayer ={
            id:i+1,
            meeples: initMeeples(i),
        }
        players.push(tempPlayer)
    }
    return players
}

function initMeeples(playerId:number):Array<Meeple>{
    const meeples:Array<Meeple> = []
    for (let i=0;i<MEEPLE_PER_PLAYER;i++)
    {
        let tempMeeple={
            id:playerId*100+i,
            playerId:playerId,
            at:null,
        }
        meeples.push(tempMeeple)
    }
    return meeples
}

