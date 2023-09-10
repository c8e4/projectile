import { tiles } from "./game/tiles";
import { rotateTile, type Tile } from "./grid";

export function newRandomDeck(): Array<Tile>{
    const deck = tiles.flatMap(tile => {
        const temp = []
        for(let i=0; i < tile.amount; i++){
            let tileTemp = JSON.parse(JSON.stringify(tile))
            // let connectorTemp=[tileTemp.connectors[11],tileTemp.connectors[0],tileTemp.connectors[1]]
            // tileTemp.connectors[11]=tileTemp.connectors[7]
            // tileTemp.connectors[0]=tileTemp.connectors[6]
            // tileTemp.connectors[1]=tileTemp.connectors[5]
            // tileTemp.connectors[7]=connectorTemp[0]
            // tileTemp.connectors[6]=connectorTemp[1]
            // tileTemp.connectors[5]=connectorTemp[2]
            temp.push({
                name: tile.name,
                center: tile.center,
                deg: 0,
                connectors: tileTemp.connectors
            })
        }
        return temp;
    })
    return deck.map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}