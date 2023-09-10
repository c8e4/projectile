<script lang="ts">
    import SmallTile from "$lib/components/SmallTile.svelte";
    import { tiles } from "$lib/game/tiles";
    import Tile from "$lib/components/Tile.svelte";

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
<Tile tile={tile}> </Tile>
{/each}
</div>