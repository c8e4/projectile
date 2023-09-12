<script lang="ts">
    import SmallTile from "$lib/components/SmallTile.svelte";
    import type { Tile } from "$lib/grid";
    import type { Meeple } from "$lib/player";

    export let tile: Tile;
    export let updatePos: any;
    export let isInteractive: boolean;
    export let activeMeeple: Meeple|null = null;
    function placeMeeple(position: number) {
        if(isInteractive){
            updatePos(position);
        }
    }
</script>
<div class="absolute" style="z-index:2;">
    <div class="flex">
        <SmallTile />
        <button on:click={() => placeMeeple(11)}>
            <SmallTile meeple={tile.meeple} activeMeeple={activeMeeple} {isInteractive} val={tile.dropZone[11]} index={11} />
        </button>
        <button on:click={() => placeMeeple(0)}>
            <SmallTile meeple={tile.meeple} activeMeeple={activeMeeple} {isInteractive} val={tile.dropZone[0]} index={0} />
        </button>
        <button on:click={() => placeMeeple(1)}>
            <SmallTile meeple={tile.meeple} activeMeeple={activeMeeple} {isInteractive} val={tile.dropZone[1]} index={1} />
        </button>
        <SmallTile />
    </div>
    <div class="flex" style="height:60px;">
        <div class="">
            <button on:click={() => placeMeeple(10)}>
                <SmallTile meeple={tile.meeple} activeMeeple={activeMeeple} {isInteractive} val={tile.dropZone[10]} index={10} />
            </button>
            <button on:click={() => placeMeeple(9)}>
                <SmallTile meeple={tile.meeple} activeMeeple={activeMeeple} {isInteractive} val={tile.dropZone[9]} index={9} />
            </button>
            <button on:click={() => placeMeeple(8)}>
                <SmallTile meeple={tile.meeple} activeMeeple={activeMeeple} {isInteractive} val={tile.dropZone[8]} index={8} />
            </button>
        </div>
        <div class="tile-center flex items-center justify-center">
            <button on:click={() => placeMeeple(12)}>
                <SmallTile meeple={tile.meeple} activeMeeple={activeMeeple} {isInteractive} val={tile.dropZoneCenter} index={12} />
            </button>
        </div>
        <div class="">
            <button on:click={() => placeMeeple(2)}>
                <SmallTile meeple={tile.meeple} activeMeeple={activeMeeple} {isInteractive} val={tile.dropZone[2]} index={2} />
            </button>
            <button on:click={() => placeMeeple(3)}>
                <SmallTile meeple={tile.meeple} activeMeeple={activeMeeple} {isInteractive} val={tile.dropZone[3]} index={3} />
            </button>
            <button on:click={() => placeMeeple(4)}>
                <SmallTile meeple={tile.meeple} activeMeeple={activeMeeple} {isInteractive} val={tile.dropZone[4]} index={4} />
            </button>
        </div>
    </div>
    <div class="flex">
        <SmallTile />
        <button on:click={() => placeMeeple(7)}>
            <SmallTile meeple={tile.meeple} activeMeeple={activeMeeple} {isInteractive} val={tile.dropZone[7]} index={7} />
        </button>
        <button on:click={() => placeMeeple(6)}>
            <SmallTile meeple={tile.meeple} activeMeeple={activeMeeple} {isInteractive} val={tile.dropZone[6]} index={6} />
        </button>
        <button on:click={() => placeMeeple(5)}>
            <SmallTile meeple={tile.meeple} activeMeeple={activeMeeple} {isInteractive} val={tile.dropZone[5]} index={5} />
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
