<script lang="ts">
    export let val:null|string=null;
</script>
<div
    class="small-tile"
    style="border: {val?'1px solid black':'none'}; background:{val?'#0000005c':''};"
>
</div>

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
