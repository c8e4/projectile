<script lang="ts">
    import SmallTile from "$lib/components/SmallTile.svelte";
    import type { Tile } from "$lib/grid";
    
    export let tile:Tile;
</script>   
<div>
    <div class="flex">
        <SmallTile></SmallTile>
        <SmallTile val={tile.connectors[11]}></SmallTile>
        <SmallTile val={tile.connectors[0]}></SmallTile>
        <SmallTile val={tile.connectors[1]}></SmallTile>
        <SmallTile></SmallTile>
    </div>
    <div class="flex">
        <div class="">
            <SmallTile val={tile.connectors[10]}></SmallTile>
            <SmallTile val={tile.connectors[9]}></SmallTile>
            <SmallTile val={tile.connectors[8]}></SmallTile>
        </div>
        <div class="tile-center bg-gray-200 flex items-center justify-center text-3xl font-bold">
            {tile.name}
        </div>
        <div class="">
            <SmallTile val={tile.connectors[2]}></SmallTile>
            <SmallTile val={tile.connectors[3]}></SmallTile>
            <SmallTile val={tile.connectors[4]}></SmallTile>
        </div>
    </div>
    <div class="flex">
        <SmallTile></SmallTile>
        <SmallTile val={tile.connectors[7]}></SmallTile>
        <SmallTile val={tile.connectors[6]}></SmallTile>
        <SmallTile val={tile.connectors[5]}></SmallTile>
        <SmallTile></SmallTile>
    </div>
</div>

<style>
    .tile-center{
        width: 60px;
        height:60px;
        border: 1px solid gray;
    }
</style>