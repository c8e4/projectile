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
    } from "$lib/grid";
    import Tile from "./Tile.svelte";
    import {processCurrentCellPorts } from "$lib/landscape";
    import MeepleDropzone from "./MeepleDropzone.svelte";
    import { getFreeMeeple, getNextPlayer } from "$lib/player";

    const game = newGame(3);
    game.portList=processCurrentCellPorts(game.grid[40][40], game.portList)
    console.table(game.portList)
    getNextCell();

    onMount(() => {
        (window as any).game = game;
        window.scrollTo(4000 - 100 * 5, 4000 - 100 * 4);
    });

    let showConnectors=false

    function getNextCell() {
        const tile = getNextTile(game.tileDeck);
        if (tile) {
            game.activeCell = {
                coord: `0,0`,
                tile,
                x: 0,
                y: 0,
                locked: false,
            };
        } else {
            game.activeCell = null;
            // game is over no more tiles left
            console.log("Game over!");
        }
    }

    function onKeyDown(e:any) {
        if (e.key == "r") {
            if (game.activeCell?.locked){
                e.preventDefault();
                return 
            }
            game.activeCell = rotateActiveCell(game.activeCell);
            game.grid = game.grid;
            e.preventDefault();
        }
        if (e.key == " ") {
            if (game.activeCell?.locked){
                e.preventDefault();
                return 
            }
            if (hasGoodConnections(game.grid,game.activeCell)){
            game.grid = confirmTilePlacement(game.grid, game.activeCell);
            game.portList = processCurrentCellPorts(game.activeCell,game.portList)
            if(game.activeCell){game.activeCell.locked=true}
            console.table(game.portList)
            console.log("---------")
            console.table(game.activeCell?.tile.dropZone)
            console.table(game.activeCell?.tile.dropZoneCenter)
            //getNextCell();
            }
            e.preventDefault();
        }
        if (e.key == "x") {
            showConnectors=!showConnectors
            e.preventDefault();
        }
        if (e.key == "e") {
            endTurn()
            //SKIP MEEPLE PLACEMENT // END TURN
            e.preventDefault();
        }
        if (e.key == "q") {
            //TAKE FREE MEEPLE
            //если это выдает позицию мипла - тогда мы можем по аналогии с тайлом. 
            //перемещать 1-го свободного мипла на эту позицию и снимать его с другой 
            
            //Сначала просто берем первого мипла и его ставим
            //console.log(game.players[game.activePlayerId].meeples[0])
            //console.log("active meeple =",game.activeMeeple)
            game.activeMeeple=getFreeMeeple(game.activePlayer)
            console.log("active meeple =",game.activeMeeple)
            e.preventDefault();
        }
    }

    function previewActiveCell(cell: GridCell) {
        if(game.activeCell?.locked)
        {
            return
        }
        game.grid = removeAndPlaceActiveCell(game.grid, game.activeCell, cell);
        if (game.activeCell && hasNeighbours(game.grid, cell)) {
            game.activeCell.x = cell.x;
            game.activeCell.y = cell.y;
        }
    }

    function updatePos(pos:number){
        console.log(pos)
        if(game.activeMeeple&&game.activeCell){
            game.activeMeeple.at = {
                x:game.activeCell.x,
                y:game.activeCell.y,
                connectorIndex:pos, // need FIX
            }
        }
    }

    export function endTurn (){
    game.activeCell=null;
    game.activeMeeple=null
    game.activePlayer=getNextPlayer(game.activePlayer,game.players)
    getNextCell()
    }


</script>

<div class="board flex">
    {#each game.grid as row}
        <div class="flex flex-col-reverse">
            {#each row as cell}
                {#if cell.tile?.name}
                    <div class="relative" style="width:100px;height:100px">
                        {#if game.activeCell?.x==cell.x&&game.activeCell?.y==cell.y}
                        <MeepleDropzone tile={cell.tile} updatePos={updatePos}></MeepleDropzone>
                        {/if}
                        {#if showConnectors}
                        <Tile tile={cell.tile}></Tile> 
                        {:else}
                        <!-- TODO: add clip-path: inset(0px -7px 1px 0px); -->
                        <!-- TODO: https://www.kevinleary.net/blog/remove-box-shadows-one-side-css/ -->
                        <!-- TODO: add static properties: hasLeftNeighbour, haBotNeighbouth, ... -->
                        <!-- TODO: only render a subframe of the board, no need to iterate over all tiles -->
                        <img
                        
                            style="z-index:1;transform: rotate({cell.tile?.deg ??
                                0}deg); scale: {cell.locked
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
                    <div
                        class="cell"
                        on:click={() => previewActiveCell(cell)}
                    >
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
        background-image: url('gray_tile.png');
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
