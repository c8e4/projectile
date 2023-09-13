<script lang="ts">
    import { tiles } from "$lib/game/tiles";
    import { onMount } from "svelte";
    import { getNextTile, newGame } from "../gameState";
    import {
        rotateActiveCell,
        type GridCell,
        confirmTilePlacement,
        removeAndPlaceActiveCell,
        hasNeighbours,
        hasGoodConnections,
        emptyGridCell,
        type TileName,
    } from "$lib/grid";
    import Tile from "./Tile.svelte";
    import {
        addMeepleToPort,
        addMeepleToTile,
        deleteOccupiedDropZoneFromTile,
        getClosedLandscapes,
        mergeLandscapes,
    } from "$lib/landscape";
    import MeepleDropzone from "./MeepleDropzone.svelte";
    import { getFreeMeeple, getNextPlayer } from "$lib/player";
    import {
        startRecording,
        type Replay,
        recordAction,
        FunctionName,
        type ReplayAction,
    } from "$lib/replay";

    let recordReplay: boolean = true;
    let replay: null | Replay = null;

    let game = newGame(3);
    startGame(3);

    onMount(() => {
        (window as any).game = game;
        (window as any).replay = replay;
        window.scrollTo(4000 - 100 * 5, 4000 - 100 * 4);
    });

    let showConnectors = false;

    function getNextCell() {
        const tile = getNextTile(game.tileDeck);
        if (tile) {
            game.activeCell = emptyGridCell(0, 0);
            game.activeCell.tile = tile;
        } else {
            game.activeCell = null;
            // game is over no more tiles left
            console.log("Game over!");
        }
    }

    function onKeyDown(e: any) {
        if (e.key == "l") {
            loadReplayFromLocalStorage(e);
            playReplay();
        }
        if (e.key == "i") {
            saveReplayToLocalStorage(e)
        }
        if (e.key == "p") {
            playReplay();
        }

        if (e.key == "r") {
            pressRotateActiveCell(e);
        }
        if (e.key == " ") {
            pressLockTile(e);
        }
        if (e.key == "x") {
            showConnectors = !showConnectors;
            if (e) e.preventDefault();
        }
        if (e.key == "e") {
            pressEndTurn(e);
        }
        if (e.key == "q") {
            pressGetFreeMepple(e);
        }
    }

    function previewActiveCell(cell: GridCell) {
        if (game.activeCell?.locked) {
            return;
        }
        game.grid = removeAndPlaceActiveCell(game.grid, game.activeCell, cell);
        if (game.activeCell && hasNeighbours(game.grid, cell)) {
            game.activeCell.x = cell.x;
            game.activeCell.y = cell.y;
        }
    }

    function updatePos(pos: number) {
        console.log(pos);
        if (game.activeMeeple && game.activeCell) {
            game.activeMeeple.at = {
                x: game.activeCell.x,
                y: game.activeCell.y,
                connectorIndex: pos, // need FIX
            };
        }
    }

    export function endTurn() {
        // - если там не занято
        //Активного мипла если есть вписать в порт туда куда его поставили
        //записывает данного мипла в meepleId в таблице портс
        game.portList = addMeepleToPort(game.activeMeeple, game.portList);
        game.grid = addMeepleToTile(
            game.activeMeeple,
            game.activeCell,
            game.grid
        );
        game.activeCell.tile.meeple = game.activeMeeple;
        //console.table(game.activeMeeple);
        //console.table(game.portList);
        //записываем в tile
        getClosedLandscapes(game.portList);
        //----------
        game.activeCell = null;
        game.activeMeeple = null;
        game.activePlayer = getNextPlayer(game.activePlayer, game.players);

        getNextCell();
    }

    function runSimulation() {
        //------------- ---------------//
        startGame(3);
        let x = 41;
        let y = 40;
        clickAt(x, y);
        //previewActiveCell(cell)
        //------------- ---------------//
    }

    function clickAt(x: number, y: number) {
        previewActiveCell(game.grid[x][y]);
        if (recordReplay) {
            replay = recordAction(replay, FunctionName.clickAt, [x, y]);
        }
    }

    function pressLockTile(e: any) {
        if (game.activeCell?.locked) {
            if (e) e.preventDefault();
            return;
        }
        if (hasGoodConnections(game.grid, game.activeCell)) {
            game.grid = confirmTilePlacement(game.grid, game.activeCell);
            game.portList = mergeLandscapes(game.activeCell, game.portList);
            game.activeCell = deleteOccupiedDropZoneFromTile(
                game.activeCell,
                game.portList
            );
            game.grid[game.activeCell?.x][game.activeCell.y].tile.dropZone =
                game.activeCell?.tile.dropZone;
            if (game.activeCell) {
                game.activeCell.locked = true;
            }
        }
        if (e) e.preventDefault();
        if (recordReplay) {
            replay = recordAction(replay, FunctionName.pressLockTile, []);
        }
    }

    function pressEndTurn(e: any) {
        endTurn();
        if (e) e.preventDefault();
        if (recordReplay) {
            replay = recordAction(replay, FunctionName.pressEndTurn, []);
        }
    }

    function pressGetFreeMepple(e: any) {
        game.activeMeeple = getFreeMeeple(game.activePlayer);
        console.log("active meeple =", game.activeMeeple);
        if (e) e.preventDefault();
        if (recordReplay) {
            replay = recordAction(replay, FunctionName.pressGetFreeMepple, []);
        }
    }

    function pressRotateActiveCell(e: any) {
        if (game.activeCell?.locked) {
            if (e) e.preventDefault();
            return;
        }
        game.activeCell = rotateActiveCell(game.activeCell);
        game.grid = game.grid;
        if (e) e.preventDefault();
        if(recordReplay){
            replay = recordAction(replay, FunctionName.pressRotateActiveCell, [])
        }
    }

    function startGame(playerCount:number, tileNames: Array<TileName>|null = null) {
        console.log("startGame")
        game = newGame(playerCount, tileNames);
        if (recordReplay) {
            replay = startRecording(
                game.playerCount,
                game.tileDeck.map(t => t.name)
            );
        }
        game.portList = mergeLandscapes(game.grid[40][40], game.portList);
        getNextCell();
    }

    async function playReplay(){
        if(!replay){
            return
        }
        recordReplay = false;
        startGame(replay.playerCount, replay.tileNames);
        const startTime = replay.actions
        const STATIC_DELAY = 100
        if(startTime){
            for(let i=0; i < replay.actions.length; i++){
                const action  = replay.actions[i]
                await new Promise((resolve,reject)=>{
                    setTimeout(()=>{resolve(true); executeReplayAction(action);}, STATIC_DELAY)
                })
            }
        }
    }
    function executeReplayAction(action: ReplayAction){
        if(action.fn == FunctionName.clickAt){
            clickAt(action.params[0],action.params[1])
        }
        if(action.fn == FunctionName.pressLockTile){
            pressLockTile(null)
        }
        if(action.fn == FunctionName.pressEndTurn){
            pressEndTurn(null)
        }
        if(action.fn == FunctionName.pressGetFreeMepple){
            pressGetFreeMepple(null)
        }
        if(action.fn == FunctionName.pressRotateActiveCell){
            pressRotateActiveCell(null)
        }
    }
    function loadReplayFromLocalStorage(e:any){
        const item = localStorage.getItem("replay");
        if(item){
            replay = JSON.parse(item)
        }
        console.log("replay loaded")
    }
    function saveReplayToLocalStorage(e:any){
        if(!replay){
            return
        }
        const replayString = JSON.stringify(replay)
        localStorage.setItem("replay", replayString);
        console.log("replay saved")
    }
</script>

<div class="board flex">
    {#each game.grid as row}
        <div class="flex flex-col-reverse">
            {#each row as cell}
                {#if cell.tile?.name}
                    <div class="relative" style="width:100px;height:100px">
                        <div class="absolute" style="z-index:4;">
                            {#if cell.locked}
                                <MeepleDropzone
                                    tile={cell.tile}
                                    {updatePos}
                                    activeMeeple={game.activeMeeple}
                                    isInteractive={game.activeCell?.x ==
                                        cell.x && game.activeCell?.y == cell.y}
                                />
                            {/if}
                        </div>
                        {#if showConnectors}
                            <Tile tile={cell.tile} />
                        {:else}
                            <!-- TODO: add clip-path: inset(0px -7px 1px 0px); -->
                            <!-- TODO: https://www.kevinleary.net/blog/remove-box-shadows-one-side-css/ -->
                            <!-- TODO: add static properties: hasLeftNeighbour, haBotNeighbouth, ... -->
                            <!-- TODO: only render a subframe of the board, no need to iterate over all tiles -->
                            <img
                                style="z-index:1;transform: rotate({cell.tile
                                    ?.deg ?? 0}deg); scale: {cell.locked
                                    ? 1
                                    : 1.1}; z-index:{cell.locked ? 1 : 2};"
                                src="tiles/{cell.tile?.name}.png"
                                class="absolute tile"
                                alt=""
                            />
                        {/if}
                    </div>
                {:else}
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <!-- svelte-ignore a11y-no-static-element-interactions -->
                    <div class="cell" on:click={() => clickAt(cell.x, cell.y)}>
                        <!-- {cell.coord} -->
                    </div>
                {/if}
            {/each}
        </div>
    {/each}
</div>

<svelte:window on:keydown={onKeyDown} />

<style>
    .board {
        background-image: url("gray_tile.png");
        background-repeat: repeat;
        backdrop-filter: grayscale(1);
        width: 8000px;
        height: 8000px;
    }
    .cell {
        width: 100px;
        height: 100px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .tile {
        width: 100px;
        height: 100px;
        /* box-shadow: -4px 6px 13px 2px rgba(0,0,0,0.7); */
    }
</style>
