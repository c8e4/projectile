<script lang="ts">
    import SmallTile from "$lib/SmallTile.svelte";
    import { tiles } from "$lib/game/tiles";
    import { onMount } from "svelte";

    let GRID_SIZE = 81;
    let GRID_CENTER = 40;
    let grid = new Array(GRID_SIZE)
        .fill(null)
        .map((x) => new Array(GRID_SIZE).fill(null));

    for (let i = 0; i < GRID_SIZE; i++) {
        for (let j = 0; j < GRID_SIZE; j++) {
            grid[i][j] = {
                coord: toVisualGridCoordinates(i, j),
                tile: {
                    name: "",
                },
            };
        }
    }
    grid[40][40].tile = {
        name: "D",
        deg: 0,
    };
    grid[40][41].tile = {
        name: "A",
    };

    onMount(() => {
        window.scrollTo(4000 - 100 * 5, 4000 - 100 * 4);
    });

    function toVisualGridCoordinates(x, y) {
        return `${y - GRID_CENTER}, ${(x - GRID_CENTER) * -1}`;
    }

    function landTileAtCell(cell) {
        cell.tile = {
            name: "B",
        };
        grid = grid;
    }
</script>

<div class="board bg-green-100">
    {#each grid as row}
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
                    <div
                        class="cell bg-red-100"
                        on:click={() => landTileAtCell(cell)}
                    >
                        {cell.coord}
                    </div>
                {/if}
            {/each}
        </div>
    {/each}
</div>

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
