<script lang="ts">
    import DebugTile from "$lib/components/DebugTile.svelte";
    import type { Tile } from "$lib/grid";
    
    export let tile:Tile;
</script>   
<div>
    <div class="flex">
        <DebugTile ></DebugTile>
        <DebugTile val={tile.connectors[11]}></DebugTile>
        <DebugTile val={tile.connectors[0]}></DebugTile>
        <DebugTile val={tile.connectors[1]}></DebugTile>
        <DebugTile></DebugTile>
    </div>
    <div class="flex">
        <div class="">
            <DebugTile val={tile.connectors[10]}></DebugTile>
            <DebugTile val={tile.connectors[9]}></DebugTile>
            <DebugTile val={tile.connectors[8]}></DebugTile>
        </div>
        <div class="tile-center flex items-center justify-center text-3xl font-bold">
            <!-- {tile.name} -->
        </div>
        <div class="">
            <DebugTile val={tile.connectors[2]}></DebugTile>
            <DebugTile val={tile.connectors[3]}></DebugTile>
            <DebugTile val={tile.connectors[4]}></DebugTile>
        </div>
    </div>
    <div class="flex">
        <DebugTile></DebugTile>
        <DebugTile val={tile.connectors[7]}></DebugTile>
        <DebugTile val={tile.connectors[6]}></DebugTile>
        <DebugTile val={tile.connectors[5]}></DebugTile>
        <DebugTile></DebugTile>
    </div>
</div>

<style>
    .tile-center{
        width: 60px;
        height:60px;
        border: 1px solid gray;
    }
</style>