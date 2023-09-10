import { tiles } from "./game/tiles";
import type { Tile } from "./grid";

export function newRandomDeck(): Array<Tile>{
    const deck = tiles.flatMap(tile => {
        const temp = []
        for(let i=0; i < tile.amount; i++){
            temp.push({
                name: tile.name,
                center: tile.center,
                deg: 0,
                connectors: JSON.parse(JSON.stringify(tile.connectors))
            })
        }
        return temp;
    })
    return deck.map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}