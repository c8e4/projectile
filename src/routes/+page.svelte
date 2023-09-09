<script lang="ts">
    import { tiles } from "$lib/game/tiles";
</script>

{#each tiles as tile}
    <div>{tile.name}</div>
{/each}