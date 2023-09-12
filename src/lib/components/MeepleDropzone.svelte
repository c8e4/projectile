<script lang="ts">
    import SmallTile from "$lib/components/SmallTile.svelte";
    import type { Tile } from "$lib/grid";

    export let tile: Tile;
    export let updatePos: any;
    function placeMeeple(position: number) {
        console.log("place meeple");
        updatePos(position)
    }
</script>

<div class="absolute" style="z-index:2;">
    <div class="flex">
        <SmallTile />
        <button on:click={() => placeMeeple(11)}>
            <SmallTile val={tile.dropZone[11]} />
        </button>
        <button on:click={() => placeMeeple(0)}>
            <SmallTile val={tile.dropZone[0]} />
        </button>
        <button on:click={() => placeMeeple(1)}>
            <SmallTile val={tile.dropZone[1]} />
        </button>
        <SmallTile />
    </div>
    <div class="flex" style="height:60px;">
        <div class="">
            <button on:click={() => placeMeeple(10)}>
                <SmallTile val={tile.dropZone[10]} />
            </button>
            <button on:click={() => placeMeeple(9)}>
                <SmallTile val={tile.dropZone[9]} />
            </button>
            <button on:click={() => placeMeeple(8)}>
                <SmallTile val={tile.dropZone[8]} />
            </button>
        </div>
        <div class="tile-center flex items-center justify-center">
            <button on:click={() => placeMeeple(12)}>
                <SmallTile val={tile.dropZoneCenter} />
            </button>
        </div>
        <div class="">
            <button on:click={() => placeMeeple(2)}>
                <SmallTile val={tile.dropZone[2]} />
            </button>
            <button on:click={() => placeMeeple(3)}>
                <SmallTile val={tile.dropZone[3]} />
            </button>
            <button on:click={() => placeMeeple(4)}>
                <SmallTile val={tile.dropZone[4]} />
            </button>
        </div>
    </div>
    <div class="flex">
        <SmallTile />
        <button on:click={() => placeMeeple(7)}>
            <SmallTile val={tile.dropZone[7]} />
        </button>
        <button on:click={() => placeMeeple(6)}>
            <SmallTile val={tile.dropZone[6]} />
        </button>
        <button on:click={() => placeMeeple(5)}>
            <SmallTile val={tile.dropZone[5]} />
        </button>
        <SmallTile />
    </div>
</div>

<style>
    .tile-center {
        width: 60px;
        height: 60px;
    }
    button{
        z-index: 3;
    }
</style>
