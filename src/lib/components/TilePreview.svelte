<script lang="ts">
    import SmallTile from "$lib/components/SmallTile.svelte";
    import { tiles } from "$lib/game/tiles";
    let myTiles = tiles 
    
    function rotateTile(tile){
        for (let i = 0 ; i<3 ; i++ ) {
            tile.connectors.unshift(tile.connectors[tile.connectors.length-1]);
            tile.connectors.pop();
        }
        myTiles=myTiles
    }

</script>

<div class="flex flex-wrap gap-4">
{#each myTiles as tile}
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
        <div class="tile-center bg-gray-200 flex items-center justify-center text-3xl font-bold" on:click={()=>rotateTile(tile)}>
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
{/each}
</div>

<style>
    .tile-center{
        width: 150px;
        height:150px;
        border: 1px solid gray;
    }
</style>