<script lang="ts">
    import SmallTile from "$lib/components/SmallTile.svelte";
    import type { Tile } from "$lib/grid";
    
    export let tile:Tile;
</script>   
<div class="absolute" style="z-index:2;">
    <div class="flex">
        <SmallTile></SmallTile>
        <SmallTile val={tile.dropZone[11]}></SmallTile>
        <SmallTile val={tile.dropZone[0]}></SmallTile>
        <SmallTile val={tile.dropZone[1]}></SmallTile>
        <SmallTile></SmallTile>
    </div>
    <div class="flex">
        <div class="">
            <SmallTile val={tile.dropZone[10]}></SmallTile>
            <SmallTile val={tile.dropZone[9]}></SmallTile>
            <SmallTile val={tile.dropZone[8]}></SmallTile>
        </div>
        <div class="tile-center flex items-center justify-center">
            <SmallTile val={tile.dropZoneCenter}></SmallTile>
        </div>
        <div class="">
            <SmallTile val={tile.dropZone[2]}></SmallTile>
            <SmallTile val={tile.dropZone[3]}></SmallTile>
            <SmallTile val={tile.dropZone[4]}></SmallTile>
        </div>
    </div>
    <div class="flex">
        <SmallTile></SmallTile>
        <SmallTile val={tile.dropZone[7]}></SmallTile>
        <SmallTile val={tile.dropZone[6]}></SmallTile>
        <SmallTile val={tile.dropZone[5]}></SmallTile>
        <SmallTile></SmallTile>
    </div>
</div>

<style>
    .tile-center{
        width: 60px;
        height:60px;
    }
</style>