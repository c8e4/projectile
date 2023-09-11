
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
