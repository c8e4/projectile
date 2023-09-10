<script lang="ts">
    export let val:null|string=null;
</script>
<div
    class="small-tile"
>
    {val ?? ""}
</div>

<style>
    .small-tile {
        width: 20px;
        height: 20px;
        border: 1px solid gray;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>
