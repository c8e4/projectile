<script lang="ts">
    import DebugTile from "$lib/components/DebugTile.svelte";
    import type { GridCell, Tile } from "$lib/grid";
    import type { Port } from "$lib/landscape";
    import Tile from "./Tile.svelte";
    
    export let cell:GridCell;
    export let ports:Array<Port>

    function getLandscapeIndex(cell:GridCell, ports:Array<Port>, connectorIndex:number):number|null{
        const lId = ports.find(p => p.x==cell.x && p.y == cell.y && p.index == connectorIndex)?.landscapeId;
        if(lId){
            return ports.findIndex(p => p.landscapeId == lId);
        }
        return null;
    }
</script>   
<div>
    <div class="flex">
        <DebugTile ></DebugTile>
        <DebugTile val={getLandscapeIndex(cell,ports,11)}></DebugTile>
        <DebugTile val={getLandscapeIndex(cell,ports,0)}></DebugTile>
        <DebugTile val={getLandscapeIndex(cell,ports,1)}></DebugTile>
        <DebugTile></DebugTile>
    </div>
    <div class="flex">
        <div class="">
            <DebugTile val={getLandscapeIndex(cell,ports,10)}></DebugTile>
            <DebugTile val={getLandscapeIndex(cell,ports,9)}></DebugTile>
            <DebugTile val={getLandscapeIndex(cell,ports,8)}></DebugTile>
        </div>
        <div class="tile-center flex items-center justify-center text-3xl font-bold">
            <!-- {tile.name} -->
        </div>
        <div class="">
            <DebugTile val={getLandscapeIndex(cell,ports,2)}></DebugTile>
            <DebugTile val={getLandscapeIndex(cell,ports,3)}></DebugTile>
            <DebugTile val={getLandscapeIndex(cell,ports,4)}></DebugTile>
        </div>
    </div>
    <div class="flex">
        <DebugTile></DebugTile>
        <DebugTile val={getLandscapeIndex(cell,ports,7)}></DebugTile>
        <DebugTile val={getLandscapeIndex(cell,ports,6)}></DebugTile>
        <DebugTile val={getLandscapeIndex(cell,ports,5)}></DebugTile>
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