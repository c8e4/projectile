import { tiles } from "./game/tiles";
import { rotateTile, type Tile } from "./grid";

export function newRandomDeck(): Array<Tile>{
    const deck = tiles.flatMap(tile => {
        const temp = []
        for(let i=0; i < tile.amount; i++){
            let tileTemp = JSON.parse(JSON.stringify(tile))
            temp.push(tileTemp)
        }
        return temp;
    })
    return deck.map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}