<script lang="ts">
    export let val:null|string=null;
</script>
<div
    class="small-tile"
    class:bg-green-200={val?.startsWith("p")}
    class:bg-slate-300={val?.startsWith("d")}
    class:bg-yellow-300={val?.startsWith("z")}
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
