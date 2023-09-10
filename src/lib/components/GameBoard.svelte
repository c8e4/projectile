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
    import { addLocations } from "$lib/landscape";

    const game = newGame();
    getNextCell();
    addLocations(game.grid[40][40]);

    onMount(() => {
        window.game = game;
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

    function onKeyDown(e) {
        if (e.key == "r") {
            game.activeCell = rotateActiveCell(game.activeCell);
            game.grid = game.grid;
            e.preventDefault();
        }
        if (e.key == " ") {
            if (hasGoodConnections(game.grid,game.activeCell)){
            game.grid = confirmTilePlacement(game.grid, game.activeCell);
            getNextCell();
            }
            e.preventDefault();
        }
        if (e.key == "x") {
            showConnectors=!showConnectors
            e.preventDefault();
        }
    }

    function previewActiveCell(cell: GridCell) {
        game.grid = removeAndPlaceActiveCell(game.grid, game.activeCell, cell);
        if (game.activeCell && hasNeighbours(game.grid, cell)) {
            game.activeCell.x = cell.x;
            game.activeCell.y = cell.y;
        }
    }


</script>

<div class="board flex">
    {#each game.grid as row}
        <div class="flex flex-col-reverse">
            {#each row as cell}
                {#if cell.tile?.name}
                    {#if showConnectors}
                    <Tile tile={cell.tile}></Tile> 
                    {:else}
                    <!-- TODO: add clip-path: inset(0px -7px 1px 0px); -->
                    <!-- TODO: https://www.kevinleary.net/blog/remove-box-shadows-one-side-css/ -->
                    <!-- TODO: add static properties: hasLeftNeighbour, haBotNeighbouth, ... -->
                    <!-- TODO: only render a subframe of the board, no need to iterate over all tiles -->
                    <img
                    
                        style="transform: rotate({cell.tile?.deg ??
                            0}deg); scale: {cell.locked
                            ? 1
                            : 1.1}; z-index:{cell.locked ? 1 : 2};"
                        src="tiles/{cell.tile?.name}.png"
                        class="tile"
                        alt=""
                    />
                    {/if}
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
        box-shadow: -4px 6px 13px 2px rgba(0,0,0,0.7);
    }
</style>
