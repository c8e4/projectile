<script lang="ts">
    import type { Meeple } from "$lib/player";

    export let val:null|string=null;
    export let isInteractive:boolean=false;
    export let meeple:Meeple|null=null;
    export let activeMeeple:Meeple|null=null;
    export let index = 0;
</script>
{#if activeMeeple && isInteractive && activeMeeple.at?.connectorIndex == index}
    {activeMeeple.playerId}
{:else if meeple && meeple.at?.connectorIndex == index}
    {meeple.playerId}
{:else}
<div
    class="small-tile"
    style="border: {isInteractive&&val?'1px solid black':'none'}; background:{isInteractive&&val?'#0000005c':''};"
>
</div>
{/if}

<style>
    .small-tile {
        width: 20px;
        height: 20px;
        display: flex;
        border-radius: 50%;
        justify-content: center;
        align-items: center;
    }
</style>
