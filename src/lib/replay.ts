import type { TileName } from "./grid"

export enum FunctionName {
    clickAt, 
    pressLockTile, // " "
    pressEndTurn,  // "e"
    pressGetFreeMepple, // "q"
    pressRotateActiveCell, // "r"
    updatePos, //"click meeple"
    pressCalculateFinalScore
}

export type ReplayAction = {
    time: number
    fn: FunctionName
    params: Array<any>
}

export type Replay = {
    playerCount: number
    tileNames: Array<TileName>
    actions: Array<ReplayAction>
}

export function startRecording(playerCount: number, tileNames: Array<TileName>): Replay {
    return {
        playerCount,
        tileNames,
        actions: []
    }
}

export function recordAction(replay: Replay|null, fn: FunctionName, params: Array<any>): Replay {
    if(!replay){
        return replay
    }
    replay.actions.push({
        time: Date.now(),
        fn,
        params,
    })
    return replay;
}