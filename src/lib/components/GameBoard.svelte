<script lang="ts">
    import { tiles } from "$lib/game/tiles";
    import { onMount } from "svelte";
    import { newGame } from "../gameState";
    import { placeActiveCellOnGrid, rotateActiveCell, type GridCell, removeActiveCellFromGrid, confirmTilePlacement, hasNeighbours } from "$lib/grid";

    const game = newGame();

    onMount(() => {
        window.game = game;
        window.scrollTo(4000 - 100 * 5, 4000 - 100 * 4);
    });

    function onKeyDown(e) {
        if (e.key == "r") {
            game.activeCell = rotateActiveCell(game.activeCell);
            game.grid = game.grid;
        }
        if (e.key == " ") {
            game.grid = confirmTilePlacement(game.grid, game.activeCell);
            game.activeCell = null;
            console.log("this is probel");
        }
    }

    function previewActiveCell(cell: GridCell){
        if (!game.activeCell || !hasNeighbours(game.grid, cell)) {
            return;
        }
        game.grid = removeActiveCellFromGrid(game.grid, game.activeCell);
        game.grid = placeActiveCellOnGrid(game.grid, cell, game.activeCell);
        game.activeCell.x = cell.x;
        game.activeCell.y = cell.y;
    }
</script>

<div class="board bg-green-100">
    {#each game.grid as row}
        <div class="flex">
            {#each row as cell}
                {#if cell.tile?.name}
                    <img
                        style="transform: rotate({cell.tile?.deg ?? 0}deg);"
                        src="tiles/{cell.tile?.name}.png"
                        class="tile"
                        alt=""
                    />
                {:else}
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <!-- svelte-ignore a11y-no-static-element-interactions -->
                    <div
                        class="cell bg-red-100"
                        on:click={() => previewActiveCell(cell)}
                    >
                        {cell.coord}
                    </div>
                {/if}
            {/each}
        </div>
    {/each}
</div>

<svelte:window on:keydown|preventDefault={onKeyDown} />

<style>
    .board {
        width: 8000px;
        height: 8000px;
    }
    .cell {
        width: 100px;
        height: 100px;
        border: 1px solid gray;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .tile {
        width: 99px;
        height: 100px;
    }
</style>
