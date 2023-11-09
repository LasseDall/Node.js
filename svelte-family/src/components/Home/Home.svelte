<script>
    import { fridgeMessages } from "../../store/fridgeMessages";
</script>

<h2>--------------------------------</h2>
{#each $fridgeMessages as fridgeMessage}
    <p>{fridgeMessage}</p>
{/each}
<h2>--------------------------------</h2>

<p>--------------------------------------------</p>
<h3>Svelte Family Home</h3>
<slot></slot>

<p>--------------------------------------------</p>