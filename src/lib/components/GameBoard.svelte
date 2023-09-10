<script lang="ts">
    import { tiles } from "$lib/game/tiles";
    import { onMount } from "svelte";
    import { GRID_CENTER, GRID_SIZE } from "../gameState";


    let grid = new Array(GRID_SIZE)
        .fill(null)
        .map((x) => new Array(GRID_SIZE).fill(null));

    for (let i = 0; i < GRID_SIZE; i++) {
        for (let j = 0; j < GRID_SIZE; j++) {
            grid[i][j] = {
                coord: toVisualGridCoordinates(i, j),
                tile: {
                    name: "",
                    deg: 0,
                },
                x: i,
                y: j,
                locked: false,
            };
        }
    }
    grid[GRID_CENTER][GRID_CENTER].tile = {
        name: "D",
        deg: 0,
    };
    grid[GRID_CENTER][GRID_CENTER].locked = true;


    let activeCell = null;

    onMount(() => {
        window.scrollTo(4000 - 100 * 5, 4000 - 100 * 4);
    });

    function toVisualGridCoordinates(x, y) {
        return `${x},${y}`; //`${y - GRID_CENTER}, ${(x - GRID_CENTER) * -1}`;
    }

    function landTileAtCell(cell) {
        if (!hasNeighbours(cell)) {
            return;
        }
        if (activeCell) {
            grid[activeCell.x][activeCell.y].tile = {
                name: "",
                deg: 0,
            };
            activeCell = null;
        }

        console.log("old cell", activeCell);
        activeCell = cell;
        console.log("New", activeCell);
        cell.tile = {
            name: "B",
        };
        grid = grid;
        //activeCell = activeCell;
    }

    function hasNeighbours(cell) {
        const x = cell.x;
        const y = cell.y;
        //neighbours
        if (x + 1 < GRID_SIZE) {
            if (grid[x + 1][y].locked) {
                return true;
            }
        }
        if (y + 1 < GRID_SIZE) {
            if (grid[x][y + 1].locked) {
                return true;
            }
        }
        if (x - 1 >= 0) {
            if (grid[x - 1][y].locked) {
                return true;
            }
        }
        if (y - 1 >= 0) {
            if (grid[x][y - 1].locked) {
                return true;
            }
        }
        return false;
    }

    function onKeyDown(e) {
        console.log(e.key);
        if (e.key == "r") {
            //
            rotateActiveCell(activeCell);
            grid = grid;
        }
        if (e.key == " ") {
            confirmTilePlacement(activeCell);
            console.log("this is probel");
        }
    }

    function rotateActiveCell(cell) {
        if (!cell) {
            return;
        }
        if (!cell.tile.deg) {
            cell.tile.deg = 90;
        } else {
            cell.tile.deg = (cell.tile.deg + 90) % 360;
        }
        grid = grid;
    }

    function confirmTilePlacement() {
        if (!activeCell) {
            return;
        }
        // 1 Check Connectors
        activeCell.locked = true;
        activeCell = null;
        // 3 Next Step "BadBoyPlacement"
        // 4 Calculate if Castle/Road/Church completed?
    }

    function getNextTile() {
        // 1 Not enough tiles ?
        // 2 Calculate winner
        // 3 New Random Tile
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
