<script>
    import { colorsList } from "../../stores/colorsStore.js";
</script>

{#each $colorsList as colorsListItem}
    <h4 style="background-color: {colorsListItem.color};">{colorsListItem.name}</h4>
{/each}